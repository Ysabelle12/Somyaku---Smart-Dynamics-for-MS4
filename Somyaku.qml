import MuseScore 3.0
import QtQuick 2.15
import QtQuick.Controls 2.15
import QtQuick.Layouts 1.15
import QtQuick.Window
import Muse.Ui
import Muse.UiComponents as MU
import "SomyakuEngine.js" as Engine
import "languages/en.js" as EnglishLanguage
import "languages/eu.js" as EuropeanLanguages
import "languages/ja.js" as JapaneseLanguage
import "languages/asia.js" as AsianLanguages

MuseScore {
    id: plugin

    title: "Somyaku"
    menuPath: "Plugins.Playback.Somyaku"
    description: "Interprets supported grand-staff keyboards and writes contextual dynamics, phrasing, expression, and keyboard balance."
    version: "1.0.0"
    pluginType: "dialog"
    requiresScore: true

    width: 820
    height: 720

    property string backupTag: "somyakuFinalV1StateV1"
    property string statusMessage: ""
    property string statusMessageKey: ""
    property var statusMessageValues: []
    property string statusMessageKind: ""
    property var statusMessageData: null
    property bool statusIsError: false
    property string scopeMessage: ""
    property string detectedStyleMessage: ""
    property string detectedStyleState: ""
    property string detectedCharacter: "balanced"
    property real detectedCharacterConfidence: 0
    property bool syncingPreset: false
    property bool presetModified: false
    property bool controlsAutoDetected: false
    property bool busy: false
    property bool hasBackupChanges: false
    readonly property int controlsHistoryLimit: 32
    property var shapingUndoHistory: []
    property var shapingRedoHistory: []
    property var baselineUndoHistory: []
    property var baselineRedoHistory: []
    property var shapingCurrentState: null
    property var baselineCurrentState: null
    property var shapingGestureStartState: null
    property var baselineGestureStartState: null
    property bool museScoreDefaultsActive: false
    property var museScoreDefaultsRestoreState: null
    readonly property int customPresetLimit: 6
    property string customPresetsJson: "[]"
    property int customPresetSerial: 0
    property var customPresets: []
    property int selectedCustomPresetIndex: -1
    property string confirmationAction: ""
    property string pendingPresetSwitchKind: ""
    property int pendingPresetSwitchIndex: -1
    property bool allowHostWindowClose: false
    property string lastAppliedSettingsSignature: ""
    readonly property int dynamicsGlyphPixelSize: Math.max(
            30, Math.round(ui.theme.largeBodyFont.pixelSize * 2.0))
    readonly property int dynamicsGlyphBoxWidth: 42
    readonly property int dynamicsGlyphBoxHeight: 34
    readonly property int languageSelectorWidth: 208
    readonly property int museScoreDefaultsCheckboxWidth: 440
    property int mainTabIndex: 0
    property int processingMeasureNumber: 0
    property string processingNoteLabel: ""
    property string languageMode: "auto"
    readonly property string effectiveLanguage: languageMode === "auto"
            ? normalizedLanguageCode(Qt.locale().name)
            : normalizedLanguageCode(languageMode)

    Settings {
        id: somyakuSettings
        category: "Somyaku Version 1"
        property alias languageMode: plugin.languageMode
        property alias customPresetsJson: plugin.customPresetsJson
        property alias customPresetSerial: plugin.customPresetSerial
    }

    function normalizedLanguageCode(localeName) {
        var code = String(localeName || "en")
                .replace(/-/g, "_")
                .toLowerCase();
        if (code.indexOf("zh") === 0) {
            return code.indexOf("tw") >= 0
                    || code.indexOf("hk") >= 0
                    || code.indexOf("mo") >= 0
                    || code.indexOf("hant") >= 0
                    ? "zh_TW" : "zh_CN";
        }

        var base = code.split("_")[0];
        var supported = {
            en: true, de: true, fr: true, pt: true, ja: true,
            it: true, nl: true, es: true, ko: true, pl: true,
            sv: true, ru: true
        };
        return supported[base] ? base : "en";
    }

    function translationTable(language) {
        if (language === "ja") {
            return JapaneseLanguage.TRANSLATIONS.ja;
        }
        if (language === "ko" || language === "zh_CN"
                || language === "zh_TW") {
            return AsianLanguages.TRANSLATIONS[language];
        }
        if (language === "de" || language === "fr"
                || language === "pt" || language === "it"
                || language === "es" || language === "nl"
                || language === "sv" || language === "pl"
                || language === "ru") {
            return EuropeanLanguages.TRANSLATIONS[language];
        }
        return EnglishLanguage.TRANSLATIONS.en;
    }

    function trText(key) {
        var english = EnglishLanguage.TRANSLATIONS.en;
        var table = translationTable(effectiveLanguage) || english;
        return own(table, key) ? table[key]
                               : (own(english, key) ? english[key] : key);
    }

    function trFormat(key, values) {
        var result = trText(key);
        var i;
        for (i = 0; i < values.length; ++i) {
            result = result.split("{" + i + "}").join(String(values[i]));
        }
        return result;
    }

    function characterText(character) {
        return trText("character." + String(character || "balanced"));
    }

    function languageDisplayName(mode) {
        var names = {
            ja: "日本語", en: "English", de: "Deutsch", fr: "Français",
            pt: "Português", it: "Italiano", nl: "Nederlands",
            es: "Español", ko: "한국어", pl: "Polski",
            zh_TW: "繁體中文", zh_CN: "简体中文", sv: "Svenska",
            ru: "Русский"
        };
        var selected = String(mode || languageMode);
        return selected === "auto" ? trText("language.auto")
                                     : names[selected];
    }

    function languageDropdownModel() {
        return [
            { text: trText("language.auto"), value: "auto" },
            { text: "日本語", value: "ja" },
            { text: "English", value: "en" },
            { text: "Deutsch", value: "de" },
            { text: "Français", value: "fr" },
            { text: "Português", value: "pt" },
            { text: "Italiano", value: "it" },
            { text: "Nederlands", value: "nl" },
            { text: "Español", value: "es" },
            { text: "한국어", value: "ko" },
            { text: "Polski", value: "pl" },
            { text: "繁體中文", value: "zh_TW" },
            { text: "简体中文", value: "zh_CN" },
            { text: "Svenska", value: "sv" },
            { text: "Русский", value: "ru" }
        ];
    }

    function languageDropdownIndex(mode) {
        var values = [
            "auto", "ja", "en", "de", "fr", "pt", "it",
            "nl", "es", "ko", "pl", "zh_TW", "zh_CN", "sv", "ru"
        ];
        var index = values.indexOf(String(mode || "auto"));
        return index >= 0 ? index : 0;
    }

    function setLocalizedStatus(key, values) {
        statusMessageKind = "key";
        statusMessageData = null;
        statusMessageKey = String(key || "");
        statusMessageValues = values ? values.slice(0) : [];
        renderStatusMessage();
    }

    function setApplyResultStatus(data) {
        statusMessageKind = "applyResult";
        statusMessageData = data;
        statusMessageKey = "";
        statusMessageValues = [];
        renderStatusMessage();
    }

    function setApplyErrorStatus(stageKey, error, measureNumber, noteLabel) {
        statusMessageKind = "applyError";
        statusMessageData = {
            stageKey: String(stageKey || "stage.reading"),
            errorText: String(error),
            measureNumber: Number(measureNumber) || 0,
            noteLabel: String(noteLabel || "")
        };
        statusMessageKey = "";
        statusMessageValues = [];
        renderStatusMessage();
    }

    function setResetErrorStatus(error, measureNumber, noteLabel) {
        statusMessageKind = "resetError";
        statusMessageData = {
            errorText: String(error),
            measureNumber: Number(measureNumber) || 0,
            noteLabel: String(noteLabel || "")
        };
        statusMessageKey = "";
        statusMessageValues = [];
        renderStatusMessage();
    }

    function renderStatusMessage() {
        var data = statusMessageData || {};
        if (statusMessageKind === "applyResult") {
            var inferenceKey = data.inferenceMode === "inferred"
                    ? "result.inferred"
                    : (data.inferenceMode === "sparse"
                       ? "result.sparse" : "result.written");
            statusMessage = trText(data.writeFailures > 0
                                   ? "result.warning" : "result.finished")
                    + " " + trFormat("result.summary", [
                        characterText(data.detectedCharacter),
                        data.touched,
                        data.appliedMeasureCount,
                        data.sectionCount,
                        data.phraseCount
                    ])
                    + " " + trText(inferenceKey)
                    + " " + (data.writeFailures > 0
                              ? trFormat("result.valuesWarning", [
                                  data.writeFailures
                              ]) : trText("result.verified"));
            if (data.writeFailures > 0 && data.firstFailedMeasure > 0) {
                statusMessage += errorLocationSuffix(
                            data.firstFailedMeasure,
                            data.firstFailedNoteLabel);
            }
            return;
        }
        if (statusMessageKind === "applyError") {
            statusMessage = trFormat("error.apply", [
                trText(data.stageKey), data.errorText
            ]);
            statusMessage += errorLocationSuffix(
                        data.measureNumber, data.noteLabel);
            return;
        }
        if (statusMessageKind === "resetError") {
            statusMessage = trFormat("error.reset", [data.errorText]);
            statusMessage += errorLocationSuffix(
                        data.measureNumber, data.noteLabel);
            return;
        }
        statusMessage = statusMessageKey.length > 0
                ? trFormat(statusMessageKey, statusMessageValues) : "";
    }

    function refreshDetectedStyleMessage() {
        if (detectedStyleState === "naturalDetected") {
            detectedStyleMessage = trFormat("status.naturalDetected", [
                characterText(detectedCharacter),
                Math.round(detectedCharacterConfidence * 100)
            ]);
            return;
        }
        if (detectedStyleState === "presetContext") {
            detectedStyleMessage = trFormat("status.presetContext", [
                profileBox.currentText,
                characterText(detectedCharacter)
            ]);
            return;
        }
        detectedStyleMessage = trText(
                    detectedStyleState === "presetReady"
                    ? "message.presetReady" : "message.naturalReady");
    }

    function refreshLocalizedMessages() {
        updateScopeMessage();
        refreshDetectedStyleMessage();
        renderStatusMessage();
    }

    onEffectiveLanguageChanged: refreshLocalizedMessages()

    function own(object, key) {
        return Object.prototype.hasOwnProperty.call(object, key);
    }

    function ownKeyCount(object) {
        var count = 0;
        var key;
        for (key in object) {
            if (own(object, key)) {
                ++count;
            }
        }
        return count;
    }

    function clamp(value, low, high) {
        return Math.max(low, Math.min(high, value));
    }

    function midiNoteName(pitch) {
        var number = Math.round(Number(pitch));
        if (!isFinite(number) || number < 0 || number > 127) {
            return "";
        }
        var names = [
            "C", "C♯", "D", "D♯", "E", "F",
            "F♯", "G", "G♯", "A", "A♯", "B"
        ];
        return names[number % 12] + String(Math.floor(number / 12) - 1);
    }

    function noteLabelFromMetadata(metadata) {
        if (!metadata) {
            return "";
        }
        var track = Math.max(0, Math.round(Number(metadata.track) || 0));
        var staff = isFinite(Number(metadata.staff))
                ? Math.round(Number(metadata.staff)) + 1
                : Math.floor(track / 4) + 1;
        var voice = track % 4 + 1;
        var pitchName = midiNoteName(metadata.pitch);
        return (pitchName.length > 0 ? pitchName + " · " : "")
                + "S" + staff + "/V" + voice;
    }

    function errorLocationSuffix(measureNumber, noteLabel) {
        var parts = [];
        if (Number(measureNumber) > 0) {
            parts.push("m. " + Math.round(Number(measureNumber)));
        }
        if (String(noteLabel || "").length > 0) {
            parts.push(String(noteLabel));
        }
        return parts.length > 0 ? " [" + parts.join(" · ") + "]" : "";
    }

    function logStage(stage, detail) {
        var message = "[" + trText("product.name") + " "
                + plugin.version + "] " + stage;
        if (detail) {
            message += ": " + detail;
        }
        console.log(message);
    }

    function profileName() {
        var names = [
            "natural", "subtle", "ballad", "expressive",
            "jazz", "baroque", "cinematic", "virtuosic"
        ];
        return names[clamp(profileBox.currentIndex, 0, names.length - 1)];
    }

    function scoreDynamicsFontFamily() {
        var fallback = "Leland";
        if (!curScore) {
            return fallback;
        }
        try {
            var scoreStyle = curScore.style;
            if (!scoreStyle) {
                return fallback;
            }
            var useOverride = !!scoreStyle.value("dynamicsOverrideFont");
            var selected = useOverride
                    ? scoreStyle.value("dynamicsFont")
                    : scoreStyle.value("musicalSymbolFont");
            var selectedName = String(selected || "")
                    .replace(/^\s+|\s+$/g, "");
            if (selectedName.length > 0) {
                return selectedName;
            }
            var musicalName = String(
                        scoreStyle.value("musicalSymbolFont") || "")
                    .replace(/^\s+|\s+$/g, "");
            return musicalName.length > 0 ? musicalName : fallback;
        } catch (fontError) {
            return fallback;
        }
    }

    function crossStaffStrength() {
        return Math.round(crossStaffSlider.value);
    }

    function setControlsFromModel(values, automaticResult) {
        if (!values) {
            return;
        }
        syncingPreset = true;
        strengthSlider.value = Number(values.strength);
        sectionSlider.value = Number(values.sectionSensitivity);
        melodySlider.value = Number(values.melodyEmphasis);
        crossStaffSlider.value = Number(values.crossStaffStrength);
        detailSlider.value = Number(values.humanVariation);
        if (values.baselines) {
            pppSlider.value = Number(values.baselines.ppp);
            ppSlider.value = Number(values.baselines.pp);
            pSlider.value = Number(values.baselines.p);
            mpSlider.value = Number(values.baselines.mp);
            mfSlider.value = Number(values.baselines.mf);
            fSlider.value = Number(values.baselines.f);
            ffSlider.value = Number(values.baselines.ff);
            fffSlider.value = Number(values.baselines.fff);
        }
        museScoreDefaultsActive = false;
        museScoreDefaultsRestoreState = null;
        syncingPreset = false;
        clearControlHistories();
        presetModified = false;
        controlsAutoDetected = !!automaticResult;
    }

    function applyPresetControls() {
        setControlsFromModel(Engine.presetControls(profileName()), false);
        presetModified = false;
        controlsAutoDetected = false;
        selectedCustomPresetIndex = -1;
        detectedStyleState = profileName() === "natural"
                ? "naturalReady" : "presetReady";
        refreshDetectedStyleMessage();
    }

    function markPresetModified() {
        if (!syncingPreset) {
            controlsAutoDetected = false;
            refreshPresetModifiedState();
        }
    }

    function hasUnsavedCustomPreset() {
        return selectedCustomPresetIndex >= 0
                && selectedCustomPresetIndex < customPresets.length
                && presetModified;
    }

    function shapingMatchesSelectedPreset() {
        var preset = selectedPresetControls();
        return shapingStatesEqual(shapingSnapshot(), {
            strength: preset.strength,
            sectionSensitivity: preset.sectionSensitivity,
            melodyEmphasis: preset.melodyEmphasis,
            crossStaffStrength: preset.crossStaffStrength,
            humanVariation: preset.humanVariation
        });
    }

    function baselinesMatchSelectedPreset() {
        var preset = selectedPresetControls();
        return !museScoreDefaultsActive
                && baselineCurveStatesEqual(
                    baselineCurveSnapshot(), preset.baselines);
    }

    function refreshPresetModifiedState() {
        presetModified = !shapingMatchesSelectedPreset()
                || !baselinesMatchSelectedPreset();
        controlsAutoDetected = false;
    }

    function shapingSnapshot() {
        return {
            strength: Math.round(strengthSlider.value),
            sectionSensitivity: Math.round(sectionSlider.value),
            melodyEmphasis: Math.round(melodySlider.value),
            crossStaffStrength: Math.round(crossStaffSlider.value),
            humanVariation: Math.round(detailSlider.value)
        };
    }

    function baselineCurveSnapshot() {
        return {
            ppp: Math.round(pppSlider.value),
            pp: Math.round(ppSlider.value),
            p: Math.round(pSlider.value),
            mp: Math.round(mpSlider.value),
            mf: Math.round(mfSlider.value),
            f: Math.round(fSlider.value),
            ff: Math.round(ffSlider.value),
            fff: Math.round(fffSlider.value)
        };
    }

    function copyBaselineCurve(state) {
        if (!state) {
            return null;
        }
        return {
            ppp: Number(state.ppp),
            pp: Number(state.pp),
            p: Number(state.p),
            mp: Number(state.mp),
            mf: Number(state.mf),
            f: Number(state.f),
            ff: Number(state.ff),
            fff: Number(state.fff)
        };
    }

    function baselineSnapshot() {
        var state = baselineCurveSnapshot();
        state.museScoreDefaultsActive = museScoreDefaultsActive;
        state.museScoreDefaultsRestoreState = copyBaselineCurve(
                    museScoreDefaultsRestoreState);
        return state;
    }

    function profileIndexForName(name) {
        var names = [
            "natural", "subtle", "ballad", "expressive",
            "jazz", "baroque", "cinematic", "virtuosic"
        ];
        var index = names.indexOf(String(name || "natural"));
        return index >= 0 ? index : 0;
    }

    function finiteClamped(value, fallback, minimum, maximum) {
        var number = Number(value);
        if (!isFinite(number)) {
            number = Number(fallback);
        }
        return clamp(Math.round(number), minimum, maximum);
    }

    function sanitizedCustomPreset(rawPreset, index) {
        var raw = rawPreset || {};
        var baseProfile = String(raw.baseProfile || "natural");
        var profileIndex = profileIndexForName(baseProfile);
        var profileNames = [
            "natural", "subtle", "ballad", "expressive",
            "jazz", "baroque", "cinematic", "virtuosic"
        ];
        baseProfile = profileNames[profileIndex];
        var fallback = Engine.presetControls(baseProfile);
        var shaping = raw.shaping || {};
        var baseline = raw.baselines || {};
        var baselineKeys = ["ppp", "pp", "p", "mp", "mf", "f", "ff", "fff"];
        var cleanBaselines = {};
        var previous = 1;
        var i;
        for (i = 0; i < baselineKeys.length; ++i) {
            var key = baselineKeys[i];
            var cleanValue = finiteClamped(
                        baseline[key], fallback.baselines[key], 1, 127);
            cleanValue = Math.max(previous, cleanValue);
            cleanBaselines[key] = cleanValue;
            previous = cleanValue;
        }
        var name = String(raw.name || "").replace(/^\s+|\s+$/g, "");
        if (name.length === 0) {
            name = trFormat("preset.customName", [Number(index) + 1]);
        }
        if (name.length > 48) {
            name = name.slice(0, 48);
        }
        return {
            name: name,
            baseProfile: baseProfile,
            shaping: {
                strength: finiteClamped(
                            shaping.strength, fallback.strength, 0, 100),
                sectionSensitivity: finiteClamped(
                            shaping.sectionSensitivity,
                            fallback.sectionSensitivity, 0, 100),
                melodyEmphasis: finiteClamped(
                            shaping.melodyEmphasis,
                            fallback.melodyEmphasis, 0, 100),
                crossStaffStrength: finiteClamped(
                            shaping.crossStaffStrength,
                            fallback.crossStaffStrength, 0, 135),
                humanVariation: finiteClamped(
                            shaping.humanVariation,
                            fallback.humanVariation, 0, 100)
            },
            baselines: cleanBaselines
        };
    }

    function restoreCustomPresets() {
        var parsed = [];
        try {
            var stored = JSON.parse(String(customPresetsJson || "[]"));
            if (Array.isArray(stored)) {
                parsed = stored;
            }
        } catch (parseError) {
            parsed = [];
        }
        var restored = [];
        var count = Math.min(parsed.length, customPresetLimit);
        var i;
        for (i = 0; i < count; ++i) {
            restored.push(sanitizedCustomPreset(parsed[i], i));
        }
        customPresets = restored;
        customPresetsJson = JSON.stringify(restored);
        selectedCustomPresetIndex = -1;
    }

    function customPresetDropdownModel() {
        var model = [
            { text: trText("preset.noCustom"), value: -1 }
        ];
        var i;
        for (i = 0; i < customPresets.length; ++i) {
            model.push({ text: customPresets[i].name, value: i });
        }
        return model;
    }

    function persistCustomPresets() {
        customPresetsJson = JSON.stringify(customPresets);
    }

    function saveCustomPreset() {
        statusIsError = false;
        if (customPresets.length >= customPresetLimit) {
            setLocalizedStatus("status.customPresetLimit", [customPresetLimit]);
            return;
        }
        customPresetSerial = Math.max(0, Number(customPresetSerial) || 0) + 1;
        var name = trFormat("preset.customName", [customPresetSerial]);
        var preset = sanitizedCustomPreset({
            name: name,
            baseProfile: profileName(),
            shaping: shapingSnapshot(),
            baselines: baselineCurveSnapshot()
        }, customPresets.length);
        var next = customPresets.slice(0);
        next.push(preset);
        customPresets = next;
        selectedCustomPresetIndex = next.length - 1;
        persistCustomPresets();
        presetModified = false;
        setLocalizedStatus("status.customPresetSaved", [name]);
    }

    function updateSelectedCustomPreset() {
        var selected = selectedCustomPresetIndex;
        if (selected < 0 || selected >= customPresets.length) {
            return false;
        }
        statusIsError = false;
        var current = customPresets[selected];
        var updated = sanitizedCustomPreset({
            name: current.name,
            baseProfile: profileName(),
            shaping: shapingSnapshot(),
            baselines: baselineCurveSnapshot()
        }, selected);
        var next = customPresets.slice(0);
        next[selected] = updated;
        customPresets = next;
        persistCustomPresets();
        presetModified = false;
        setLocalizedStatus("status.customPresetUpdated", [updated.name]);
        return true;
    }

    function loadCustomPreset(index) {
        var selected = Math.round(Number(index));
        if (selected < 0 || selected >= customPresets.length) {
            selectedCustomPresetIndex = -1;
            return;
        }
        var preset = sanitizedCustomPreset(customPresets[selected], selected);
        profileBox.currentIndex = profileIndexForName(preset.baseProfile);
        var values = {
            strength: preset.shaping.strength,
            sectionSensitivity: preset.shaping.sectionSensitivity,
            melodyEmphasis: preset.shaping.melodyEmphasis,
            crossStaffStrength: preset.shaping.crossStaffStrength,
            humanVariation: preset.shaping.humanVariation,
            baselines: preset.baselines
        };
        setControlsFromModel(values, false);
        selectedCustomPresetIndex = selected;
        detectedStyleState = "presetReady";
        refreshDetectedStyleMessage();
    }

    function deleteCustomPreset() {
        var selected = selectedCustomPresetIndex;
        if (selected < 0 || selected >= customPresets.length) {
            return;
        }
        statusIsError = false;
        var name = customPresets[selected].name;
        var next = customPresets.slice(0);
        next.splice(selected, 1);
        customPresets = next;
        selectedCustomPresetIndex = -1;
        persistCustomPresets();
        presetModified = false;
        setLocalizedStatus("status.customPresetDeleted", [name]);
    }

    function clearPendingPresetSwitch() {
        pendingPresetSwitchKind = "";
        pendingPresetSwitchIndex = -1;
    }

    function restorePresetSelectorIndexes() {
        if (selectedCustomPresetIndex >= 0
                && selectedCustomPresetIndex < customPresets.length) {
            profileBox.currentIndex = profileIndexForName(
                        customPresets[selectedCustomPresetIndex].baseProfile);
        }
        customPresetBox.currentIndex = selectedCustomPresetIndex + 1;
    }

    function performPendingPresetSwitch() {
        var kind = pendingPresetSwitchKind;
        var target = pendingPresetSwitchIndex;
        clearPendingPresetSwitch();
        if (kind === "profile") {
            profileBox.currentIndex = clamp(target, 0, 7);
            applyPresetControls();
            customPresetBox.currentIndex = 0;
            return;
        }
        if (kind !== "custom") {
            return;
        }
        if (target < 0) {
            selectedCustomPresetIndex = -1;
            customPresetBox.currentIndex = 0;
            refreshPresetModifiedState();
            return;
        }
        loadCustomPreset(target);
        customPresetBox.currentIndex = target + 1;
    }

    function requestProfilePreset(index) {
        var target = clamp(Math.round(Number(index)), 0, 7);
        if (hasUnsavedCustomPreset()) {
            pendingPresetSwitchKind = "profile";
            pendingPresetSwitchIndex = target;
            restorePresetSelectorIndexes();
            requestConfirmation("discardPresetSwitch");
            return;
        }
        profileBox.currentIndex = target;
        applyPresetControls();
        customPresetBox.currentIndex = 0;
    }

    function requestCustomPreset(index) {
        var target = Math.round(Number(index));
        if (target === selectedCustomPresetIndex) {
            restorePresetSelectorIndexes();
            return;
        }
        if (hasUnsavedCustomPreset()) {
            pendingPresetSwitchKind = "custom";
            pendingPresetSwitchIndex = target;
            restorePresetSelectorIndexes();
            requestConfirmation("discardPresetSwitch");
            return;
        }
        if (target < 0) {
            selectedCustomPresetIndex = -1;
            customPresetBox.currentIndex = 0;
            refreshPresetModifiedState();
            return;
        }
        loadCustomPreset(target);
        customPresetBox.currentIndex = target + 1;
    }

    function confirmationTitleKey() {
        if (confirmationAction === "discardPresetSwitch") {
            return "dialog.unsavedPresetTitle";
        }
        if (confirmationAction === "deletePreset") {
            return "dialog.deletePresetTitle";
        }
        if (confirmationAction === "overwritePreset") {
            return "dialog.overwritePresetTitle";
        }
        if (confirmationAction === "restorePerformance") {
            return "dialog.restorePerformanceTitle";
        }
        if (confirmationAction === "restoreBaselines") {
            return "dialog.restoreBaselinesTitle";
        }
        if (confirmationAction === "revertScore") {
            return "dialog.revertTitle";
        }
        return "dialog.quitTitle";
    }

    function confirmationMessageKey() {
        if (confirmationAction === "discardPresetSwitch") {
            return "dialog.unsavedPresetWarning";
        }
        if (confirmationAction === "deletePreset") {
            return "dialog.deletePresetWarning";
        }
        if (confirmationAction === "overwritePreset") {
            return "dialog.overwritePresetWarning";
        }
        if (confirmationAction === "restorePerformance") {
            return "dialog.restorePerformanceWarning";
        }
        if (confirmationAction === "restoreBaselines") {
            return "dialog.restoreBaselinesWarning";
        }
        if (confirmationAction === "revertScore") {
            return "dialog.revertWarning";
        }
        if (hasUnappliedSettingsChanges() && hasUnsavedCustomPreset()) {
            return "dialog.quitChangedSettingsAndUnsavedWarning";
        }
        return hasUnsavedCustomPreset()
                ? "dialog.quitUnsavedPresetWarning"
                : "dialog.quitChangedSettingsWarning";
    }

    function confirmationConfirmKey() {
        if (confirmationAction === "discardPresetSwitch") {
            return "button.discardAndSwitch";
        }
        if (confirmationAction === "deletePreset") {
            return "button.deleteConfirm";
        }
        if (confirmationAction === "overwritePreset") {
            return "button.overwriteConfirm";
        }
        if (confirmationAction === "restorePerformance"
                || confirmationAction === "restoreBaselines") {
            return "button.restoreConfirm";
        }
        if (confirmationAction === "revertScore") {
            return "button.revertConfirm";
        }
        return hasUnsavedCustomPreset()
                ? "button.quitWithoutSaving" : "button.quitConfirm";
    }

    function requestConfirmation(action) {
        confirmationAction = String(action || "");
        confirmationDialog.open();
    }

    function cancelConfirmation() {
        if (confirmationAction === "discardPresetSwitch") {
            restorePresetSelectorIndexes();
            clearPendingPresetSwitch();
        }
        confirmationAction = "";
        confirmationDialog.close();
    }

    function confirmRequestedAction() {
        var action = confirmationAction;
        confirmationAction = "";
        confirmationDialog.close();
        if (action === "discardPresetSwitch") {
            presetModified = false;
            performPendingPresetSwitch();
        } else if (action === "deletePreset") {
            deleteCustomPreset();
        } else if (action === "overwritePreset") {
            updateSelectedCustomPreset();
        } else if (action === "restorePerformance") {
            resetShapingToPreset();
        } else if (action === "restoreBaselines") {
            resetBaselinesToPreset();
        } else if (action === "revertScore") {
            revertSomyakuChanges();
        } else if (action === "quit") {
            closePlugin();
        }
    }

    function saveAndContinueConfirmation() {
        var action = confirmationAction;
        if (!updateSelectedCustomPreset()) {
            return;
        }
        confirmationAction = "";
        confirmationDialog.close();
        if (action === "discardPresetSwitch") {
            performPendingPresetSwitch();
        } else if (action === "quit") {
            closePlugin();
        }
    }

    function closePlugin() {
        allowHostWindowClose = true;
        quit();
    }

    function requestQuit() {
        if (hasUnappliedSettingsChanges() || hasUnsavedCustomPreset()) {
            requestConfirmation("quit");
            return;
        }
        closePlugin();
    }

    function controlStatesEqual(first, second, keys) {
        if (!first || !second) {
            return false;
        }
        var i;
        for (i = 0; i < keys.length; ++i) {
            if (Number(first[keys[i]]) !== Number(second[keys[i]])) {
                return false;
            }
        }
        return true;
    }

    function boundedHistoryWith(history, state) {
        var next = history ? history.slice(0) : [];
        next.push(state);
        if (next.length > controlsHistoryLimit) {
            next.splice(0, next.length - controlsHistoryLimit);
        }
        return next;
    }

    function shapingStatesEqual(first, second) {
        return controlStatesEqual(first, second, [
            "strength", "sectionSensitivity", "melodyEmphasis",
            "crossStaffStrength", "humanVariation"
        ]);
    }

    function baselineCurveStatesEqual(first, second) {
        return controlStatesEqual(first, second, [
            "ppp", "pp", "p", "mp", "mf", "f", "ff", "fff"
        ]);
    }

    function baselineStatesEqual(first, second) {
        if (!baselineCurveStatesEqual(first, second)
                || !!first.museScoreDefaultsActive
                !== !!second.museScoreDefaultsActive) {
            return false;
        }
        var firstRestore = first.museScoreDefaultsRestoreState;
        var secondRestore = second.museScoreDefaultsRestoreState;
        if (!firstRestore || !secondRestore) {
            return !firstRestore && !secondRestore;
        }
        return baselineCurveStatesEqual(firstRestore, secondRestore);
    }

    function clearControlHistories() {
        shapingUndoHistory = [];
        shapingRedoHistory = [];
        baselineUndoHistory = [];
        baselineRedoHistory = [];
        shapingGestureStartState = null;
        baselineGestureStartState = null;
        shapingCurrentState = shapingSnapshot();
        baselineCurrentState = baselineSnapshot();
    }

    function applyShapingState(state) {
        if (!state) {
            return;
        }
        syncingPreset = true;
        strengthSlider.value = Number(state.strength);
        sectionSlider.value = Number(state.sectionSensitivity);
        melodySlider.value = Number(state.melodyEmphasis);
        crossStaffSlider.value = Number(state.crossStaffStrength);
        detailSlider.value = Number(state.humanVariation);
        syncingPreset = false;
        shapingCurrentState = shapingSnapshot();
    }

    function applyBaselineCurve(state) {
        if (!state) {
            return;
        }
        syncingPreset = true;
        pppSlider.value = Number(state.ppp);
        ppSlider.value = Number(state.pp);
        pSlider.value = Number(state.p);
        mpSlider.value = Number(state.mp);
        mfSlider.value = Number(state.mf);
        fSlider.value = Number(state.f);
        ffSlider.value = Number(state.ff);
        fffSlider.value = Number(state.fff);
        syncingPreset = false;
    }

    function applyBaselineState(state) {
        if (!state) {
            return;
        }
        applyBaselineCurve(state);
        museScoreDefaultsActive = !!state.museScoreDefaultsActive;
        museScoreDefaultsRestoreState = copyBaselineCurve(
                    state.museScoreDefaultsRestoreState);
        baselineCurrentState = baselineSnapshot();
    }

    function recordShapingEdit() {
        if (syncingPreset) {
            return;
        }
        var next = shapingSnapshot();
        if (!shapingCurrentState) {
            shapingCurrentState = next;
            return;
        }
        if (shapingStatesEqual(shapingCurrentState, next)) {
            return;
        }
        shapingUndoHistory = boundedHistoryWith(
                    shapingUndoHistory, shapingCurrentState);
        shapingRedoHistory = [];
        shapingCurrentState = next;
        markPresetModified();
    }

    function recordBaselineEdit(keepMuseScoreDefaultsState) {
        if (syncingPreset) {
            return;
        }
        if (museScoreDefaultsActive && !keepMuseScoreDefaultsState) {
            museScoreDefaultsActive = false;
            museScoreDefaultsRestoreState = null;
        }
        var next = baselineSnapshot();
        if (!baselineCurrentState) {
            baselineCurrentState = next;
            return;
        }
        if (baselineStatesEqual(baselineCurrentState, next)) {
            return;
        }
        baselineUndoHistory = boundedHistoryWith(
                    baselineUndoHistory, baselineCurrentState);
        baselineRedoHistory = [];
        baselineCurrentState = next;
        markPresetModified();
    }

    function beginShapingSliderGesture() {
        if (!syncingPreset && !shapingGestureStartState) {
            shapingGestureStartState = shapingCurrentState
                    ? shapingCurrentState : shapingSnapshot();
        }
    }

    function finishShapingSliderGesture() {
        var start = shapingGestureStartState;
        shapingGestureStartState = null;
        if (syncingPreset || !start) {
            return;
        }
        var next = shapingSnapshot();
        if (shapingStatesEqual(start, next)) {
            shapingCurrentState = next;
            return;
        }
        shapingUndoHistory = boundedHistoryWith(shapingUndoHistory, start);
        shapingRedoHistory = [];
        shapingCurrentState = next;
        markPresetModified();
    }

    function handleShapingSliderMoved(slider) {
        if (!slider.pressed) {
            recordShapingEdit();
        }
    }

    function beginBaselineSliderGesture() {
        if (!syncingPreset && !baselineGestureStartState) {
            baselineGestureStartState = baselineCurrentState
                    ? baselineCurrentState : baselineSnapshot();
        }
    }

    function finishBaselineSliderGesture() {
        var start = baselineGestureStartState;
        baselineGestureStartState = null;
        if (syncingPreset || !start) {
            return;
        }
        var current = baselineSnapshot();
        if (baselineCurveStatesEqual(start, current)) {
            baselineCurrentState = current;
            return;
        }
        if (museScoreDefaultsActive) {
            museScoreDefaultsActive = false;
            museScoreDefaultsRestoreState = null;
        }
        var next = baselineSnapshot();
        if (baselineStatesEqual(start, next)) {
            baselineCurrentState = next;
            return;
        }
        baselineUndoHistory = boundedHistoryWith(baselineUndoHistory, start);
        baselineRedoHistory = [];
        baselineCurrentState = next;
        markPresetModified();
    }

    function handleBaselineSliderMoved(slider, anchorIndex) {
        normalizeDynamicSliders(anchorIndex);
        if (!slider.pressed) {
            recordBaselineEdit();
        }
    }

    function undoShapingControls() {
        if (shapingUndoHistory.length < 1) {
            return;
        }
        var undo = shapingUndoHistory.slice(0);
        var previous = undo.pop();
        shapingUndoHistory = undo;
        shapingRedoHistory = boundedHistoryWith(
                    shapingRedoHistory, shapingSnapshot());
        applyShapingState(previous);
        markPresetModified();
    }

    function redoShapingControls() {
        if (shapingRedoHistory.length < 1) {
            return;
        }
        var redo = shapingRedoHistory.slice(0);
        var next = redo.pop();
        shapingRedoHistory = redo;
        shapingUndoHistory = boundedHistoryWith(
                    shapingUndoHistory, shapingSnapshot());
        applyShapingState(next);
        markPresetModified();
    }

    function selectedPresetControls() {
        var selected = selectedCustomPresetIndex;
        if (selected >= 0 && selected < customPresets.length) {
            var custom = sanitizedCustomPreset(
                        customPresets[selected], selected);
            return {
                strength: custom.shaping.strength,
                sectionSensitivity: custom.shaping.sectionSensitivity,
                melodyEmphasis: custom.shaping.melodyEmphasis,
                crossStaffStrength: custom.shaping.crossStaffStrength,
                humanVariation: custom.shaping.humanVariation,
                baselines: copyBaselineCurve(custom.baselines)
            };
        }
        return Engine.presetControls(profileName());
    }

    function resetShapingToPreset() {
        var preset = selectedPresetControls();
        var target = {
            strength: preset.strength,
            sectionSensitivity: preset.sectionSensitivity,
            melodyEmphasis: preset.melodyEmphasis,
            crossStaffStrength: preset.crossStaffStrength,
            humanVariation: preset.humanVariation
        };
        var current = shapingSnapshot();
        if (shapingStatesEqual(current, target)) {
            return;
        }
        shapingUndoHistory = boundedHistoryWith(
                    shapingUndoHistory, current);
        shapingRedoHistory = [];
        applyShapingState(target);
        refreshPresetModifiedState();
    }

    function undoBaselineControls() {
        if (baselineUndoHistory.length < 1) {
            return;
        }
        var undo = baselineUndoHistory.slice(0);
        var previous = undo.pop();
        baselineUndoHistory = undo;
        baselineRedoHistory = boundedHistoryWith(
                    baselineRedoHistory, baselineSnapshot());
        applyBaselineState(previous);
        markPresetModified();
    }

    function redoBaselineControls() {
        if (baselineRedoHistory.length < 1) {
            return;
        }
        var redo = baselineRedoHistory.slice(0);
        var next = redo.pop();
        baselineRedoHistory = redo;
        baselineUndoHistory = boundedHistoryWith(
                    baselineUndoHistory, baselineSnapshot());
        applyBaselineState(next);
        markPresetModified();
    }

    function resetBaselinesToPreset() {
        var preset = selectedPresetControls();
        var target = copyBaselineCurve(preset.baselines);
        target.museScoreDefaultsActive = false;
        target.museScoreDefaultsRestoreState = null;
        var current = baselineSnapshot();
        if (baselineStatesEqual(current, target)) {
            return;
        }
        baselineUndoHistory = boundedHistoryWith(
                    baselineUndoHistory, current);
        baselineRedoHistory = [];
        applyBaselineState(target);
        refreshPresetModifiedState();
    }

    function toggleMuseScoreDefaultBaselines() {
        if (museScoreDefaultsActive) {
            var restore = copyBaselineCurve(
                        museScoreDefaultsRestoreState);
            museScoreDefaultsActive = false;
            museScoreDefaultsRestoreState = null;
            if (restore) {
                applyBaselineCurve(restore);
            }
        } else {
            museScoreDefaultsRestoreState = baselineCurveSnapshot();
            museScoreDefaultsActive = true;
            applyBaselineCurve(Engine.museScoreDefaultBaselines());
        }
        recordBaselineEdit(true);
    }

    function normalizeDynamicSliders(anchorIndex) {
        var sliders = [
            pppSlider, ppSlider, pSlider, mpSlider,
            mfSlider, fSlider, ffSlider, fffSlider
        ];
        var index = clamp(Math.round(anchorIndex), 0, sliders.length - 1);
        syncingPreset = true;
        sliders[index].value = clamp(
                    Math.round(sliders[index].value), 1, 127);
        var i;
        for (i = index - 1; i >= 0; --i) {
            sliders[i].value = Math.min(
                        Math.round(sliders[i].value),
                        Math.round(sliders[i + 1].value));
        }
        for (i = index + 1; i < sliders.length; ++i) {
            sliders[i].value = Math.max(
                        Math.round(sliders[i].value),
                        Math.round(sliders[i - 1].value));
        }
        syncingPreset = false;
    }

    function updateDynamicBaselineFromEditor(slider, rawValue, anchorIndex) {
        var number = Number(rawValue);
        if (!isFinite(number)) {
            number = slider.value;
        }

        slider.value = clamp(Math.round(number), 1, 127);
        normalizeDynamicSliders(anchorIndex);
        recordBaselineEdit();
    }

    function updatePerformanceControlFromEditor(slider, rawValue,
                                                minimum, maximum) {
        var number = Number(rawValue);
        if (!isFinite(number)) {
            number = slider.value;
        }
        slider.value = clamp(Math.round(number), minimum, maximum);
        recordShapingEdit();
    }

    function settingsObject() {
        return {
            profile: profileName(),
            naturalAutoDetect: selectedCustomPresetIndex < 0,
            strength: strengthSlider.value,
            sectionSensitivity: sectionSlider.value,
            melodyEmphasis: melodySlider.value,
            crossStaffStrength: crossStaffStrength(),
            humanVariation: detailSlider.value,
            phraseMeasures: 0,
            baselines: {
                ppp: pppSlider.value,
                pp: ppSlider.value,
                p: pSlider.value,
                mp: mpSlider.value,
                mf: mfSlider.value,
                f: fSlider.value,
                ff: ffSlider.value,
                fff: fffSlider.value
            },
            shapePhrases: phraseCheck.checked,
            meterAccents: meterCheck.checked,
            adaptTexture: textureCheck.checked,
            dynamicHeadroom: headroomCheck.checked,
            preserveExistingVelocity: preserveVelocityCheck.checked
        };
    }

    function currentSettingsSignature() {
        return JSON.stringify({
            settings: settingsObject(),
            selectedCustomPresetIndex: selectedCustomPresetIndex,
            museScoreDefaultsActive: museScoreDefaultsActive
        });
    }

    function hasUnappliedSettingsChanges() {
        return lastAppliedSettingsSignature.length > 0
                && currentSettingsSignature() !== lastAppliedSettingsSignature;
    }

    function rememberAppliedSettings() {
        lastAppliedSettingsSignature = currentSettingsSignature();
    }

    function currentScope() {
        return {
            startTick: 0,
            endTick: 2147483647,
            startStaff: 0,
            endStaff: curScore ? curScore.nstaves : 0,
            usingSelection: false
        };
    }

    function normalizedInstrumentIdentifier(value) {
        return String(value || "")
                .replace(/^\s+|\s+$/g, "")
                .toLowerCase();
    }

    function supportedKeyboardIdentity(museScoreId, musicXmlId) {
        var first = normalizedInstrumentIdentifier(museScoreId);
        var second = normalizedInstrumentIdentifier(musicXmlId);
        var templateIds = {
            piano: true,
            "grand-piano": true,
            "upright-piano": true,
            "electric-piano": true,
            "honky-tonk-piano": true,
            "toy-piano": true,
            celesta: true,
            clavichord: true,
            clavinet: true
        };
        if (Object.prototype.hasOwnProperty.call(templateIds, first)
                || Object.prototype.hasOwnProperty.call(templateIds, second)) {
            return true;
        }

        function supportedMusicXml(value) {
            return value === "keyboard.piano"
                    || value.indexOf("keyboard.piano.") === 0
                    || value === "keyboard.celesta"
                    || value === "keyboard.clavichord"
                    || value === "keyboard.clavichord.synth";
        }
        return supportedMusicXml(first) || supportedMusicXml(second);
    }

    function partStaffCount(part) {
        if (!part) {
            return 0;
        }
        try {
            var startTrack = Number(part.startTrack);
            var endTrack = Number(part.endTrack);
            if (isFinite(startTrack) && isFinite(endTrack)
                    && endTrack > startTrack) {
                return Math.ceil((endTrack - startTrack) / 4);
            }
        } catch (error1) {
        }
        try {
            return part.staves ? Number(part.staves.length) : 0;
        } catch (error2) {
        }
        return 0;
    }

    function partSupportsKeyboardStructure(part) {
        if (!part || partStaffCount(part) < 2) {
            return false;
        }
        try {
            return !!part.hasPitchedStaff
                    && !part.hasTabStaff
                    && !part.hasDrumStaff;
        } catch (error) {
        }
        return false;
    }

    function instrumentIdentityAtTick(part, tick) {
        var instrument = null;
        var instrumentCount = -1;
        try {
            instrumentCount = part.instruments
                    ? Number(part.instruments.length) : -1;
        } catch (countError) {
        }
        try {
            if (typeof part.instrumentAtTick === "function") {
                instrument = part.instrumentAtTick(Math.round(Number(tick) || 0));
            }
        } catch (tickError) {
        }
        if (!instrument && instrumentCount === 1) {
            try {
                instrument = part.instruments[0];
            } catch (instrumentError) {
            }
        }

        var museScoreId = "";
        var musicXmlId = "";
        if (instrument) {
            try {
                museScoreId = String(instrument.instrumentId || "");
            } catch (idError1) {
            }
            try {
                musicXmlId = String(instrument.musicXmlId || "");
            } catch (idError2) {
            }
        }
        if (!instrument && instrumentCount > 1) {
            return { museScoreId: "", musicXmlId: "" };
        }
        if (!museScoreId) {
            try {
                museScoreId = String(part.instrumentId || "");
            } catch (idError3) {
            }
        }
        if (!musicXmlId) {
            try {
                musicXmlId = String(part.musicXmlId || "");
            } catch (idError4) {
            }
        }
        return {
            museScoreId: museScoreId,
            musicXmlId: musicXmlId
        };
    }

    function partIsSupportedKeyboardAtTick(part, tick) {
        if (!partSupportsKeyboardStructure(part)) {
            return false;
        }
        var identity = instrumentIdentityAtTick(part, tick);
        return supportedKeyboardIdentity(identity.museScoreId,
                                         identity.musicXmlId);
    }

    function scorePartDescriptors() {
        var result = [];
        if (!curScore) {
            return result;
        }
        try {
            var parts = curScore.parts;
            var i;
            for (i = 0; parts && i < parts.length; ++i) {
                var part = parts[i];
                var startTrack = Number(part.startTrack);
                var endTrack = Number(part.endTrack);
                if (!isFinite(startTrack) || !isFinite(endTrack)
                        || endTrack <= startTrack) {
                    continue;
                }
                result.push({
                    key: "score-part:" + String(i),
                    part: part,
                    startTrack: Math.max(0, Math.round(startTrack)),
                    endTrack: Math.min(curScore.ntracks,
                                       Math.round(endTrack)),
                    startStaff: Math.floor(startTrack / 4),
                    staffCount: partStaffCount(part),
                    structureSupported: partSupportsKeyboardStructure(part),
                    supportedByTick: {}
                });
            }
        } catch (error) {
        }
        return result;
    }

    function partDescriptorForTrack(descriptors, track) {
        var value = Number(track);
        var i;
        for (i = 0; descriptors && i < descriptors.length; ++i) {
            if (value >= descriptors[i].startTrack
                    && value < descriptors[i].endTrack) {
                return descriptors[i];
            }
        }
        return null;
    }

    function descriptorIsSupportedAtTick(descriptor, tick) {
        if (!descriptor || !descriptor.structureSupported) {
            return false;
        }
        var cacheKey = String(Math.round(Number(tick) || 0));
        if (own(descriptor.supportedByTick, cacheKey)) {
            return descriptor.supportedByTick[cacheKey];
        }
        var supported = partIsSupportedKeyboardAtTick(
                    descriptor.part, tick);
        descriptor.supportedByTick[cacheKey] = supported;
        return supported;
    }

    function isSupportedKeyboardTrackAtTick(descriptors, track, tick) {
        return descriptorIsSupportedAtTick(
                    partDescriptorForTrack(descriptors, track), tick);
    }

    function isSupportedKeyboardStaffAtTick(descriptors, staff, tick) {
        return isSupportedKeyboardTrackAtTick(
                    descriptors, Math.round(Number(staff)) * 4, tick);
    }

    function supportedKeyboardStavesAtTick(descriptors, tick) {
        var result = [];
        var descriptorIndex;
        for (descriptorIndex = 0;
                descriptors && descriptorIndex < descriptors.length;
                ++descriptorIndex) {
            var descriptor = descriptors[descriptorIndex];
            if (!descriptorIsSupportedAtTick(descriptor, tick)) {
                continue;
            }
            var staffOffset;
            for (staffOffset = 0;
                    staffOffset < descriptor.staffCount;
                    ++staffOffset) {
                var staff = descriptor.startStaff + staffOffset;
                if (staff >= 0 && staff < curScore.nstaves
                        && result.indexOf(staff) < 0) {
                    result.push(staff);
                }
            }
        }
        return result;
    }

    function requestApply(writeMode) {
        if (busy) {
            return;
        }
        busy = true;
        statusIsError = false;
        setLocalizedStatus("status.analyzingComplete", []);
        mainTabIndex = 2;
        Qt.callLater(function() {
            try {
                applySomyaku(writeMode);
            } finally {
                busy = false;
            }
        });
    }

    function updateScopeMessage() {
        if (!curScore) {
            scopeMessage = trText("status.noScoreScope");
            return;
        }
        scopeMessage = trFormat("status.scope", [
            curScore.nmeasures,
            curScore.nstaves
        ]);
    }

    function fractionTicks(value) {
        if (!value) {
            return 0;
        }
        if (typeof value === "number") {
            return Number(value);
        }
        try {
            if (typeof value.ticks !== "undefined") {
                return Number(value.ticks);
            }
        } catch (error1) {
        }
        try {
            if (value.denominator) {
                return division * 4 * Number(value.numerator) / Number(value.denominator);
            }
        } catch (error2) {
        }
        return 0;
    }

    function selectionWriteScope() {
        if (!curScore || !curScore.selection) {
            return null;
        }

        var selection = curScore.selection;
        try {
            if (selection.isRange && selection.startSegment) {
                var startTick = Number(selection.startSegment.tick);
                var endTick = 2147483647;
                if (selection.endSegment) {
                    endTick = Number(selection.endSegment.tick);
                } else if (curScore.lastSegment) {
                    endTick = Number(curScore.lastSegment.tick) + 1;
                }
                var startStaff = clamp(Number(selection.startStaff),
                                       0, curScore.nstaves - 1);
                // selection.endStaff は最後の譜表を含まない
                var endStaff = clamp(Number(selection.endStaff),
                                     startStaff + 1, curScore.nstaves);
                if (isFinite(startTick) && isFinite(endTick)
                        && endTick > startTick) {
                    return {
                        usingSelection: true,
                        kind: "range",
                        startTick: startTick,
                        endTick: endTick,
                        startStaff: startStaff,
                        endStaff: endStaff,
                        selectedElements: []
                    };
                }
            }
        } catch (rangeError) {
        }

        var elements = [];
        try {
            var i;
            for (i = 0; selection.elements && i < selection.elements.length; ++i) {
                elements.push(selection.elements[i]);
            }
        } catch (listError) {
        }
        if (elements.length > 0) {
            return {
                usingSelection: true,
                kind: "list",
                startTick: 0,
                endTick: 2147483647,
                startStaff: 0,
                endStaff: curScore.nstaves,
                selectedElements: elements
            };
        }
        return null;
    }

    function noteMatchesWriteScope(scope, metadata) {
        if (!metadata || metadata.supportedKeyboard !== true) {
            return false;
        }
        if (!scope || !scope.usingSelection) {
            return true;
        }
        if (scope.kind === "range") {
            return metadata.tick >= scope.startTick
                    && metadata.tick < scope.endTick
                    && metadata.staff >= scope.startStaff
                    && metadata.staff < scope.endStaff;
        }

        var i;
        for (i = 0; i < scope.selectedElements.length; ++i) {
            var selected = scope.selectedElements[i];
            if (sameScoreObject(selected, metadata.note)
                    || sameScoreObject(selected, metadata.chord)) {
                return true;
            }
            try {
                if (sameScoreObject(selected.parent, metadata.chord)) {
                    return true;
                }
            } catch (parentError) {
            }
        }
        return false;
    }

    function chordDurationTicks(chord) {
        var ticks = 0;
        try {
            ticks = fractionTicks(chord.actualDuration);
        } catch (error1) {
        }
        if (ticks <= 0) {
            try {
                ticks = fractionTicks(chord.duration);
            } catch (error2) {
            }
        }
        return Math.max(1, ticks);
    }

    function collectMeasures(scope) {
        var all = [];
        var cursor = curScore.newCursor();
        cursor.rewind(Cursor.SCORE_START);
        var guard = 0;

        while (cursor.measure && guard < 100000) {
            var measure = cursor.measure;
            var startTick = cursor.tick;
            try {
                if (measure.firstSegment) {
                    startTick = measure.firstSegment.tick;
                }
            } catch (error1) {
            }

            var numerator = 4;
            var denominator = 4;
            try {
                numerator = Number(measure.timesigActual.numerator);
                denominator = Number(measure.timesigActual.denominator);
            } catch (error2) {
            }

            var tempoBpm = 120;
            try {
                var beatsPerSecond = Number(cursor.tempo);
                if (isFinite(beatsPerSecond) && beatsPerSecond > 0) {
                    tempoBpm = beatsPerSecond * 60;
                }
            } catch (tempoError) {
            }

            all.push({
                originalIndex: all.length,
                startTick: startTick,
                endTick: startTick + division * 4 * numerator / denominator,
                numerator: numerator,
                denominator: denominator,
                explicitBoundary: false,
                dynamicJump: 0,
                tempoBpm: tempoBpm,
                tempoMark: false
            });

            ++guard;
            if (!cursor.nextMeasure()) {
                break;
            }
        }

        var i;
        for (i = 0; i + 1 < all.length; ++i) {
            all[i].endTick = all[i + 1].startTick;
        }
        if (all.length > 0 && curScore.lastSegment) {
            all[all.length - 1].endTick = Math.max(
                        all[all.length - 1].endTick,
                        curScore.lastSegment.tick + 1);
        }

        var selected = [];
        for (i = 0; i < all.length; ++i) {
            if (all[i].endTick > scope.startTick && all[i].startTick < scope.endTick) {
                all[i].index = selected.length;
                selected.push(all[i]);
            }
        }
        return selected;
    }

    function measureIndexAtTick(measures, tick) {
        var low = 0;
        var high = measures.length - 1;
        while (low <= high) {
            var middle = Math.floor((low + high) / 2);
            var measure = measures[middle];
            if (tick < measure.startTick) {
                high = middle - 1;
            } else if (tick >= measure.endTick) {
                low = middle + 1;
            } else {
                return measure.index;
            }
        }
        return -1;
    }

    function sameScoreObject(first, second) {
        if (!first || !second) {
            return false;
        }
        try {
            return first.is(second);
        } catch (error1) {
        }
        try {
            return second.is(first);
        } catch (error2) {
        }
        return first === second;
    }

    function staffIndexForElement(element) {
        if (!element) {
            return -1;
        }
        try {
            if (typeof element.track !== "undefined" && Number(element.track) >= 0) {
                return Math.floor(Number(element.track) / 4);
            }
        } catch (error1) {
        }
        try {
            if (element.staff && curScore.staves) {
                var i;
                for (i = 0; i < curScore.staves.length; ++i) {
                    if (sameScoreObject(element.staff, curScore.staves[i])) {
                        return i;
                    }
                }
            }
        } catch (error2) {
        }
        return -1;
    }

    function scorePartGroups(partDescriptors) {
        var fallback = [];
        var staffIndex;
        for (staffIndex = 0; curScore && staffIndex < curScore.nstaves;
                ++staffIndex) {
            fallback.push({
                key: "score-staff:" + String(staffIndex),
                staffIndex: 0,
                staffCount: 1
            });
        }
        var result = fallback.slice(0);
        var descriptorIndex;
        for (descriptorIndex = 0;
                partDescriptors && descriptorIndex < partDescriptors.length;
                ++descriptorIndex) {
            var descriptor = partDescriptors[descriptorIndex];
            var position;
            for (position = 0; position < descriptor.staffCount; ++position) {
                staffIndex = descriptor.startStaff + position;
                if (staffIndex < 0 || staffIndex >= result.length) {
                    continue;
                }
                result[staffIndex] = {
                    key: descriptor.key,
                    staffIndex: position,
                    staffCount: descriptor.staffCount
                };
            }
        }
        return result;
    }

    function chordStaffMove(chord) {
        try {
            var move = Number(chord.staffMove);
            if (isFinite(move)) {
                return Math.round(move);
            }
        } catch (error) {
        }
        return 0;
    }

    function dynamicScopeForElement(element, partDescriptors, tick) {
        var ownStaff = staffIndexForElement(element);
        var range = -1;
        try {
            range = Number(element.dynamicRange);
        } catch (error) {
        }

        var allSupported = supportedKeyboardStavesAtTick(
                    partDescriptors, tick);
        if (range === 2) {
            return {
                staves: allSupported,
                kind: "system",
                partGroupKey: ""
            };
        }
        if (range === 0 && ownStaff >= 0) {
            var ownSupported = isSupportedKeyboardStaffAtTick(
                        partDescriptors, ownStaff, tick);
            return {
                staves: ownSupported ? [ownStaff] : [],
                kind: "staff",
                partGroupKey: ""
            };
        }
        var descriptor = partDescriptorForTrack(
                    partDescriptors, ownStaff * 4);
        if (ownStaff >= 0
                && descriptorIsSupportedAtTick(descriptor, tick)) {
            var partStaves = [];
            var offset;
            for (offset = 0; offset < descriptor.staffCount; ++offset) {
                var staff = descriptor.startStaff + offset;
                if (staff >= 0 && staff < curScore.nstaves) {
                    partStaves.push(staff);
                }
            }
            return {
                staves: partStaves,
                kind: "part",
                partGroupKey: descriptor.key
            };
        }
        if (ownStaff < 0) {
            return {
                staves: allSupported,
                kind: "system",
                partGroupKey: ""
            };
        }
        return {
            staves: [],
            kind: "staff",
            partGroupKey: ""
        };
    }

    function dynamicDescriptorForElement(element) {
        var candidates = [];
        var velocity = null;
        try {
            var candidateVelocity = Number(element.velocity);
            if (isFinite(candidateVelocity)
                    && candidateVelocity >= 1
                    && candidateVelocity <= 127) {
                velocity = Math.round(candidateVelocity);
            }
        } catch (velocityError) {
        }

        try {
            candidates.push(element.subtypeName());
        } catch (error1) {
        }
        try {
            candidates.push(element.text);
        } catch (error2) {
        }
        try {
            candidates.push(element.xmlText);
        } catch (error3) {
        }
        try {
            candidates.push(element.plainText);
        } catch (error4) {
        }

        var i;
        for (i = 0; i < candidates.length; ++i) {
            var code = Engine.normalizeDynamicCode(candidates[i]);
            if (code !== "custom") {
                return {
                    code: code,
                    // 画面に出ている強弱記号を優先
                    velocity: null
                };
            }
        }

        try {
            var subtypeCode = Engine.dynamicCodeFromSubtype(element.subtype);
            if (subtypeCode !== "custom") {
                return {
                    code: subtypeCode,
                    velocity: null
                };
            }
        } catch (subtypeError) {
        }
        return {
            code: "custom",
            velocity: velocity
        };
    }

    function sectionText(element) {
        var text = "";
        try {
            text = String(element.text || "");
        } catch (error) {
        }
        text = text.replace(/<[^>]*>/g, " ").toLowerCase();
        return /\b(intro|verse|chorus|refrain|bridge|interlude|outro|coda)\b/.test(text)
                || text.indexOf("サビ") >= 0
                || text.indexOf("メロ") >= 0;
    }

    function performanceTextForElement(element) {
        var candidates = [];
        try {
            candidates.push(element.plainText);
        } catch (error1) {
        }
        try {
            candidates.push(element.text);
        } catch (error2) {
        }
        try {
            candidates.push(element.xmlText);
        } catch (error3) {
        }
        try {
            candidates.push(element.subtypeName());
        } catch (error4) {
        }

        var i;
        for (i = 0; i < candidates.length; ++i) {
            var text = String(candidates[i] || "")
                    .replace(/<[^>]*>/g, " ")
                    .replace(/&[^;]+;/g, " ")
                    .replace(/\s+/g, " ")
                    .replace(/^\s+|\s+$/g, "");
            if (text.length > 0) {
                return text;
            }
        }
        return "";
    }

    function performanceTextSourceKind(element) {
        if (element.type === Element.EXPRESSION) {
            return "expression";
        }
        if (element.type === Element.PLAYTECH_ANNOTATION) {
            return "playing technique";
        }
        if (element.type === Element.SYSTEM_TEXT) {
            return "system text";
        }
        if (element.type === Element.STAFF_TEXT) {
            return "staff text";
        }
        if (element.type === Element.TEMPO_TEXT) {
            return "tempo text";
        }
        return "regular text";
    }

    function isPerformanceTextAnnotation(element) {
        return element.type === Element.EXPRESSION
                || element.type === Element.STAFF_TEXT
                || element.type === Element.SYSTEM_TEXT
                || element.type === Element.PLAYTECH_ANNOTATION
                || element.type === Element.TEMPO_TEXT
                || element.type === Element.TEXT;
    }

    function performanceTextIsGlobal(element) {
        if (element.type === Element.SYSTEM_TEXT
                || element.type === Element.TEMPO_TEXT) {
            return true;
        }
        try {
            return !!element.systemFlag;
        } catch (error) {
        }
        return false;
    }

    function elementIsHidden(element) {
        try {
            return element.visible === false;
        } catch (error) {
        }
        return false;
    }

    function tempoPlaybackIsDisabled(element) {
        try {
            if (typeof element.playbackEnabled !== "undefined") {
                return element.playbackEnabled === false;
            }
        } catch (error1) {
        }
        try {
            if (typeof element.play !== "undefined") {
                return element.play === false;
            }
        } catch (error2) {
        }
        return false;
    }

    function tempoDescriptorForElement(element) {
        var candidates = [];
        try {
            candidates.push(element.xmlText);
        } catch (error1) {
        }
        try {
            candidates.push(element.text);
        } catch (error2) {
        }
        try {
            candidates.push(element.plainText);
        } catch (error3) {
        }

        var i;
        for (i = 0; i < candidates.length; ++i) {
            var raw = String(candidates[i] || "").toLowerCase()
                    .replace(/,/g, ".");
            var match = raw.match(/(?:=|≈|≒)\s*([0-9]+(?:\.[0-9]+)?)/);
            if (!match) {
                match = raw.match(/([0-9]+(?:\.[0-9]+)?)\s*bpm\b/);
            }
            if (!match) {
                match = raw.match(/\btempo\s*:?\s*([0-9]+(?:\.[0-9]+)?)/);
            }
            if (!match) {
                continue;
            }

            var displayedBpm = Number(match[1]);
            var beatFactor = 1;
            if (raw.indexOf("metnotebreve") >= 0
                    || raw.indexOf("breve") >= 0) {
                beatFactor = 8;
            } else if (raw.indexOf("metnotewhole") >= 0
                       || raw.indexOf("whole note") >= 0
                       || raw.indexOf("semibreve") >= 0) {
                beatFactor = 4;
            } else if (raw.indexOf("metnotehalf") >= 0
                    || raw.indexOf("half note") >= 0
                    || raw.indexOf("minim") >= 0) {
                beatFactor = 2;
            } else if (raw.indexOf("metnote32nd") >= 0
                       || raw.indexOf("metnotethirtysecond") >= 0
                       || raw.indexOf("thirty second note") >= 0
                       || raw.indexOf("demisemiquaver") >= 0) {
                beatFactor = 0.125;
            } else if (raw.indexOf("metnote16th") >= 0
                       || raw.indexOf("metnotesixteenth") >= 0
                       || raw.indexOf("sixteenth note") >= 0
                       || raw.indexOf("semiquaver") >= 0) {
                beatFactor = 0.25;
            } else if (raw.indexOf("metnote8th") >= 0
                       || raw.indexOf("metnoteeighth") >= 0
                       || raw.indexOf("eighth note") >= 0
                       || raw.indexOf("quaver") >= 0) {
                beatFactor = 0.5;
            }
            if (raw.indexOf("metaugmentationdot") >= 0
                    || raw.indexOf("dotted") >= 0) {
                beatFactor *= 1.5;
            }

            var writtenBpm = displayedBpm * beatFactor;
            if (isFinite(writtenBpm) && writtenBpm >= 20 && writtenBpm <= 400) {
                return {
                    bpm: writtenBpm,
                    readFromText: true,
                    inferredFromTerm: false
                };
            }
        }

        try {
            var propertyBpm = Number(element.tempo) * 60;
            if (isFinite(propertyBpm) && propertyBpm >= 20 && propertyBpm <= 400) {
                return {
                    bpm: propertyBpm,
                    readFromText: false,
                    inferredFromTerm: false
                };
            }
        } catch (tempoError) {
        }

        for (i = 0; i < candidates.length; ++i) {
            var namedText = String(candidates[i] || "").toLowerCase()
                    .replace(/<[^>]*>/g, " ")
                    .replace(/&[^;]+;/g, " ")
                    .replace(/[.,;:!?()\[\]{}\/\\_-]+/g, " ")
                    .replace(/\s+/g, " ")
                    .replace(/^\s+|\s+$/g, "");
            if (namedText.length === 0
                    || namedText.split(" ").length > 6) {
                continue;
            }

            var namedBpm = null;
            if (/\bprestissimo\b/.test(namedText)) {
                namedBpm = 200;
            } else if (/\bpresto\b/.test(namedText)) {
                namedBpm = 176;
            } else if (/\bvivacissimo\b/.test(namedText)) {
                namedBpm = 168;
            } else if (/\bvivace\b/.test(namedText)) {
                namedBpm = 152;
            } else if (/\ballegro\b/.test(namedText)) {
                namedBpm = /\bmoderato\b/.test(namedText) ? 120 : 136;
            } else if (/\ballegretto\b/.test(namedText)) {
                namedBpm = 116;
            } else if (/\bmoderato\b/.test(namedText)) {
                namedBpm = 108;
            } else if (/\bandantino\b/.test(namedText)) {
                namedBpm = 92;
            } else if (/\bandante\b/.test(namedText)) {
                namedBpm = /\bcon moto\b/.test(namedText) ? 96 : 84;
            } else if (/\badagietto\b/.test(namedText)) {
                namedBpm = 72;
            } else if (/\badagio\b/.test(namedText)) {
                namedBpm = 66;
            } else if (/\blarghetto\b/.test(namedText)) {
                namedBpm = 60;
            } else if (/\blento\b/.test(namedText)) {
                namedBpm = 52;
            } else if (/\blargo\b/.test(namedText)) {
                namedBpm = 48;
            } else if (/\bgrave\b/.test(namedText)) {
                namedBpm = 40;
            } else if (/\blarghissimo\b/.test(namedText)) {
                namedBpm = 28;
            }
            if (namedBpm !== null) {
                if (/\bmolto\b/.test(namedText)) {
                    namedBpm *= namedBpm >= 108 ? 1.08 : 0.92;
                }
                if (/\bma non troppo\b/.test(namedText)) {
                    namedBpm += (108 - namedBpm) * 0.24;
                }
                if (/\bcon brio\b/.test(namedText) && namedBpm >= 108) {
                    namedBpm *= 1.05;
                }
                return {
                    bpm: Math.round(Math.max(20, Math.min(240, namedBpm))),
                    readFromText: true,
                    inferredFromTerm: true
                };
            }
        }
        return {
            bpm: null,
            readFromText: false,
            inferredFromTerm: false
        };
    }

    function collectAnnotations(scope, measures, partDescriptors) {
        var dynamicEvents = [];
        var expressionEvents = [];
        var tempoEvents = [];
        var previousLevelByStaff = {};
        var dynamicMarkCount = 0;
        var expressionMarkCount = 0;
        var regularTextExpressionCount = 0;
        var tempoMarkCount = 0;
        var hiddenMarkCount = 0;
        var hiddenDynamicMarkCount = 0;
        var hiddenExpressionMarkCount = 0;
        var hiddenTempoMarkCount = 0;
        var hiddenBoundaryMarkCount = 0;
        var playbackDisabledTempoCount = 0;
        var plainTextTempoCount = 0;
        var namedTextTempoCount = 0;
        var unreadableDynamicCount = 0;
        var dynamicCounts = {};
        var order = 0;
        var segment = curScore.firstSegment();

        while (segment && segment.tick < scope.endTick) {
            var annotations = segment.annotations;
            var i;
            for (i = 0; annotations && i < annotations.length; ++i) {
                var annotation = annotations[i];
                var annotationHidden = elementIsHidden(annotation);

                if (annotation.type === Element.DYNAMIC) {
                    var dynamicScope = dynamicScopeForElement(
                                annotation, partDescriptors, segment.tick);
                    var staves = dynamicScope.staves;
                    if (staves.length === 0) {
                        continue;
                    }
                    var dynamic = dynamicDescriptorForElement(annotation);
                    var sourceIndex = dynamicMarkCount;
                    ++dynamicMarkCount;
                    if (annotationHidden) {
                        ++hiddenMarkCount;
                        ++hiddenDynamicMarkCount;
                    }
                    dynamicCounts[dynamic.code] = (dynamicCounts[dynamic.code] || 0) + 1;
                    if (dynamic.code === "custom" && dynamic.velocity === null) {
                        ++unreadableDynamicCount;
                    }
                    var s;
                    for (s = 0; s < staves.length; ++s) {
                        dynamicEvents.push({
                            tick: segment.tick,
                            staff: staves[s],
                            code: dynamic.code,
                            velocity: dynamic.velocity,
                            sourceIndex: sourceIndex,
                            scopeKind: dynamicScope.kind,
                            partGroupKey: dynamicScope.partGroupKey,
                            order: order++
                        });

                        var mapKey = String(staves[s]);
                        var level = Engine.dynamicLevel(
                                    dynamic.code,
                                    dynamic.velocity);
                        if (own(previousLevelByStaff, mapKey)) {
                            var measureIndex = measureIndexAtTick(measures, segment.tick);
                            if (measureIndex >= 0) {
                                measures[measureIndex].dynamicJump = Math.max(
                                            measures[measureIndex].dynamicJump,
                                            Math.abs(level - previousLevelByStaff[mapKey]) * 8);
                            }
                        }
                        previousLevelByStaff[mapKey] = level;
                    }
                } else if (segment.tick >= scope.startTick) {
                    var annotationGlobal = performanceTextIsGlobal(annotation);
                    var annotationStaff = annotationGlobal
                            ? -1 : staffIndexForElement(annotation);
                    var annotationSupported = annotationGlobal
                            || (annotationStaff >= 0
                                && isSupportedKeyboardStaffAtTick(
                                    partDescriptors,
                                    annotationStaff,
                                    segment.tick));
                    var retainedAnnotation = false;
                    var tempoDescriptor = {
                        bpm: null,
                        readFromText: false,
                        inferredFromTerm: false
                    };
                    if (isPerformanceTextAnnotation(annotation)) {
                        tempoDescriptor = tempoDescriptorForElement(annotation);
                    }
                    var isTempoInstruction = annotation.type === Element.TEMPO_TEXT
                            || tempoDescriptor.bpm !== null;
                    if (isTempoInstruction && annotationSupported) {
                        retainedAnnotation = true;
                        ++tempoMarkCount;
                        if (annotationHidden) {
                            ++hiddenTempoMarkCount;
                        }
                        if (annotation.type === Element.TEMPO_TEXT
                                && tempoPlaybackIsDisabled(annotation)) {
                            ++playbackDisabledTempoCount;
                        }
                        if (annotation.type !== Element.TEMPO_TEXT
                                && tempoDescriptor.bpm !== null) {
                            ++plainTextTempoCount;
                        }
                        if (annotation.type !== Element.TEMPO_TEXT
                                && tempoDescriptor.inferredFromTerm) {
                            ++namedTextTempoCount;
                        }
                        var tempoMeasure = measureIndexAtTick(measures, segment.tick);
                        if (tempoMeasure >= 0) {
                            measures[tempoMeasure].tempoMark = true;
                        }
                        if (tempoDescriptor.bpm !== null) {
                            tempoEvents.push({
                                tick: segment.tick,
                                bpm: tempoDescriptor.bpm
                            });
                            if (tempoMeasure >= 0) {
                                measures[tempoMeasure].tempoBpm = tempoDescriptor.bpm;
                            }
                        }
                    }

                    var expressionText = "";
                    var expressionDescriptor = Engine.expressionInfo("");
                    if (isPerformanceTextAnnotation(annotation)) {
                        expressionText = performanceTextForElement(annotation);
                        expressionDescriptor = Engine.expressionInfo(expressionText);
                    }
                    if (expressionDescriptor.recognized
                            && annotationSupported) {
                        retainedAnnotation = true;
                        var sourceKind = performanceTextSourceKind(annotation);
                        expressionEvents.push({
                            tick: segment.tick,
                            staff: annotationStaff,
                            text: expressionText,
                            sourceKind: sourceKind,
                            sourceIndex: expressionMarkCount,
                            order: order++
                        });
                        ++expressionMarkCount;
                        if (annotationHidden) {
                            ++hiddenExpressionMarkCount;
                        }
                        if (sourceKind !== "expression"
                                && sourceKind !== "playing technique") {
                            ++regularTextExpressionCount;
                        }
                    }

                    var isBoundary = annotation.type === Element.REHEARSAL_MARK
                            || annotation.type === Element.MARKER
                            || annotation.type === Element.JUMP
                            || ((annotation.type === Element.STAFF_TEXT
                                 || annotation.type === Element.SYSTEM_TEXT)
                                && sectionText(annotation));
                    var boundaryGlobal = annotation.type === Element.REHEARSAL_MARK
                            || annotation.type === Element.MARKER
                            || annotation.type === Element.JUMP
                            || annotation.type === Element.SYSTEM_TEXT
                            || annotationGlobal;
                    if (isBoundary
                            && (boundaryGlobal || annotationSupported)) {
                        retainedAnnotation = true;
                        if (annotationHidden) {
                            ++hiddenBoundaryMarkCount;
                        }
                        var boundaryMeasure = measureIndexAtTick(measures, segment.tick);
                        if (boundaryMeasure >= 0) {
                            measures[boundaryMeasure].explicitBoundary = true;
                        }
                    }
                    if (annotationHidden && retainedAnnotation) {
                        ++hiddenMarkCount;
                    }
                }
            }
            segment = segment.next;
        }

        dynamicEvents.sort(function(first, second) {
            if (first.tick !== second.tick) {
                return first.tick - second.tick;
            }
            if (first.staff !== second.staff) {
                return first.staff - second.staff;
            }
            return first.order - second.order;
        });
        return {
            events: dynamicEvents,
            expressionEvents: expressionEvents,
            tempoEvents: tempoEvents,
            markCount: dynamicMarkCount,
            expandedEventCount: dynamicEvents.length,
            counts: dynamicCounts,
            unreadableCount: unreadableDynamicCount,
            expressionMarkCount: expressionMarkCount,
            regularTextExpressionCount: regularTextExpressionCount,
            tempoMarkCount: tempoMarkCount,
            hiddenMarkCount: hiddenMarkCount,
            hiddenDynamicMarkCount: hiddenDynamicMarkCount,
            hiddenExpressionMarkCount: hiddenExpressionMarkCount,
            hiddenTempoMarkCount: hiddenTempoMarkCount,
            hiddenBoundaryMarkCount: hiddenBoundaryMarkCount,
            playbackDisabledTempoCount: playbackDisabledTempoCount,
            plainTextTempoCount: plainTextTempoCount,
            namedTextTempoCount: namedTextTempoCount
        };
    }

    function noteKey(tick, track, pitch, noteIndex) {
        return String(tick) + ":" + String(track) + ":"
                + String(pitch) + ":" + String(noteIndex);
    }

    function collectSpannerContext(measures) {
        // MuseScore 4.7.4 ではネイティブのスパナー列挙を使わない
        return {
            slurs: [],
            hairpins: [],
            gradualTempoCount: 0,
            totalSpannerCount: 0,
            skippedSpannerCount: 0,
            scanAvailable: false,
            compatibilityMode: true
        };
    }

    function appendPerformanceName(names, element) {
        if (!element) {
            return;
        }
        var text = performanceTextForElement(element);
        if (text.length > 0 && names.indexOf(text) < 0) {
            names.push(text);
        }
    }

    function articulationNamesForChord(chord, segment) {
        var names = [];
        var i;
        try {
            for (i = 0; chord.articulations && i < chord.articulations.length; ++i) {
                appendPerformanceName(names, chord.articulations[i]);
            }
        } catch (articulationError) {
        }
        try {
            for (i = 0; chord.elements && i < chord.elements.length; ++i) {
                var attached = chord.elements[i];
                if (attached.type === Element.ARTICULATION
                        || attached.type === Element.FERMATA
                        || attached.type === Element.ORNAMENT
                        || attached.type === Element.BREATH) {
                    appendPerformanceName(names, attached);
                }
            }
        } catch (elementError) {
        }
        try {
            if (chord.arpeggio || chord.spanArpeggio) {
                names.push("arpeggio");
            }
            if (chord.tremoloSingleChord || chord.tremoloTwoChord) {
                names.push("tremolo");
            }
        } catch (chordPropertyError) {
        }
        try {
            for (i = 0; segment.annotations && i < segment.annotations.length; ++i) {
                var annotation = segment.annotations[i];
                if ((annotation.type === Element.BREATH
                     || annotation.type === Element.FERMATA)
                        && (staffIndexForElement(annotation) < 0
                            || staffIndexForElement(annotation)
                               === staffIndexForElement(chord))) {
                    appendPerformanceName(names, annotation);
                }
            }
        } catch (annotationError) {
        }
        return names;
    }

    function advanceTempoCursor(cursor, state, tick, fallback) {
        var guard = 0;
        try {
            while (cursor.segment && Number(cursor.tick) <= Number(tick)
                    && guard < 1000000) {
                var beatsPerSecond = Number(cursor.tempo);
                if (isFinite(beatsPerSecond) && beatsPerSecond > 0) {
                    state.bpm = clamp(beatsPerSecond * 60, 20, 400);
                }
                if (Number(cursor.tick) === Number(tick)) {
                    break;
                }
                cursor.next();
                ++guard;
            }
        } catch (tempoError) {
        }
        if (!isFinite(state.bpm) || state.bpm <= 0) {
            state.bpm = clamp(Number(fallback) || 120, 20, 400);
        }
        return state.bpm;
    }

    function gatherEvents(scope, measures, tempoEvents, partDescriptors) {
        var events = [];
        var noteReferences = {};
        var noteMetadata = {};
        var segment = curScore.firstSegment();
        var tempoCursor = curScore.newCursor();
        tempoCursor.rewind(Cursor.SCORE_START);
        var tempoState = {
            bpm: measures.length > 0 ? measures[0].tempoBpm : 120
        };
        var tempoCache = {};
        var lastTempoBpm = 120;
        var tempoScale = 1;
        var tempoEventIndex = 0;
        var orderedTempoEvents = (tempoEvents || []).slice(0);
        var partGroups = scorePartGroups(partDescriptors);
        orderedTempoEvents.sort(function(first, second) {
            return Number(first.tick) - Number(second.tick);
        });

        while (segment && segment.tick < scope.startTick) {
            segment = segment.next;
        }

        while (segment && segment.tick < scope.endTick) {
            var measureIndex = measureIndexAtTick(measures, segment.tick);
            if (measureIndex >= 0) {
                processingMeasureNumber = Number(
                            measures[measureIndex].originalIndex) + 1;
                while (tempoEventIndex < orderedTempoEvents.length
                        && Number(orderedTempoEvents[tempoEventIndex].tick)
                           <= segment.tick) {
                    var tempoEvent = orderedTempoEvents[tempoEventIndex];
                    var actualAtMark = advanceTempoCursor(
                                tempoCursor, tempoState,
                                tempoEvent.tick, tempoEvent.bpm);
                    tempoScale = clamp(Number(tempoEvent.bpm) / actualAtMark,
                                       0.25, 4);
                    ++tempoEventIndex;
                }
                var tempoKey = String(segment.tick);
                if (own(tempoCache, tempoKey)) {
                    lastTempoBpm = tempoCache[tempoKey];
                } else {
                    lastTempoBpm = advanceTempoCursor(
                                tempoCursor, tempoState,
                                segment.tick,
                                measures[measureIndex].tempoBpm) * tempoScale;
                    lastTempoBpm = clamp(lastTempoBpm, 20, 400);
                    tempoCache[tempoKey] = lastTempoBpm;
                }
                var track;
                for (track = scope.startStaff * 4; track < scope.endStaff * 4; ++track) {
                    if (!isSupportedKeyboardTrackAtTick(
                                partDescriptors, track, segment.tick)) {
                        continue;
                    }
                    var element = segment.elementAt(track);
                    if (!element || element.type !== Element.CHORD) {
                        continue;
                    }

                    var notes = [];
                    var staffIndex = Math.floor(track / 4);
                    var partGroup = staffIndex >= 0
                            && staffIndex < partGroups.length
                            ? partGroups[staffIndex]
                            : {
                                key: "score-staff:" + String(staffIndex),
                                staffIndex: 0,
                                staffCount: 1
                            };
                    var staffMove = chordStaffMove(element);
                    var displayStaff = clamp(staffIndex + staffMove,
                                             0, curScore.nstaves - 1);
                    var i;
                    for (i = 0; i < element.notes.length; ++i) {
                        var note = element.notes[i];
                        processingNoteLabel = midiNoteName(note.pitch)
                                + " · S" + (staffIndex + 1)
                                + "/V" + (track % 4 + 1);
                        var key = noteKey(segment.tick, track, note.pitch, i);
                        notes.push({
                            key: key,
                            pitch: Number(note.pitch),
                            tied: !!note.tieBack
                        });
                        noteReferences[key] = note;
                        noteMetadata[key] = {
                            tick: segment.tick,
                            track: track,
                            staff: staffIndex,
                            pitch: Number(note.pitch),
                            displayStaff: displayStaff,
                            staffMove: staffMove,
                            scorePartGroupKey: partGroup.key,
                            scorePartStaffIndex: partGroup.staffIndex,
                            scorePartStaffCount: partGroup.staffCount,
                            supportedKeyboard: true,
                            measureIndex: measureIndex,
                            noteIndex: i,
                            note: note,
                            chord: element
                        };
                    }

                    events.push({
                        tick: segment.tick,
                        track: track,
                        staff: staffIndex,
                        displayStaff: displayStaff,
                        staffMove: staffMove,
                        scorePartGroupKey: partGroup.key,
                        scorePartStaffIndex: partGroup.staffIndex,
                        scorePartStaffCount: partGroup.staffCount,
                        supportedKeyboard: true,
                        voice: track % 4,
                        measureIndex: measureIndex,
                        durationTicks: chordDurationTicks(element),
                        tempoBpm: lastTempoBpm,
                        articulations: articulationNamesForChord(element, segment),
                        notes: notes,
                        dynamicCode: "mf",
                        dynamicVelocity: 80
                    });
                }
            }
            segment = segment.next;
        }

        return {
            events: events,
            noteReferences: noteReferences,
            noteMetadata: noteMetadata
        };
    }

    function gatherScoreData(scope, partDescriptors) {
        logStage("scan", "measures and meter");
        var measures = collectMeasures(scope);
        logStage("scan", "visible and hidden dynamics, expressions, and tempo text");
        var annotationData = collectAnnotations(
                    scope, measures, partDescriptors);
        if (annotationData.hiddenMarkCount > 0
                || annotationData.playbackDisabledTempoCount > 0
                || annotationData.plainTextTempoCount > 0) {
            logStage("hidden markings",
                     annotationData.hiddenDynamicMarkCount + " dynamics, "
                     + annotationData.hiddenExpressionMarkCount
                     + " performance-text instructions, "
                     + annotationData.hiddenTempoMarkCount + " tempo marks, "
                     + annotationData.hiddenBoundaryMarkCount
                     + " section boundaries, "
                     + annotationData.playbackDisabledTempoCount
                     + " tempo marks disabled for playback, "
                     + annotationData.plainTextTempoCount
                     + " tempo marks in ordinary text ("
                     + annotationData.namedTextTempoCount
                     + " inferred from conventional tempo words)");
        }
        logStage("scan", "MuseScore 4.7.4 spanner-safe compatibility mode");
        var spannerData = collectSpannerContext(measures);
        logStage("scan", "notes, articulations, texture, and performed tempo");
        var gathered = gatherEvents(
                    scope, measures, annotationData.tempoEvents,
                    partDescriptors);
        processingMeasureNumber = 0;
        processingNoteLabel = "";
        logStage("scan", "dynamic assignment");
        var assignment = Engine.assignDynamics(
                    gathered.events,
                    annotationData.events);
        return {
            division: division,
            measures: measures,
            events: gathered.events,
            noteReferences: gathered.noteReferences,
            noteMetadata: gathered.noteMetadata,
            dynamicEvents: annotationData.events,
            expressionEvents: annotationData.expressionEvents,
            slurs: spannerData.slurs,
            hairpins: spannerData.hairpins,
            dynamicMarkCount: annotationData.markCount,
            dynamicEventCount: annotationData.expandedEventCount,
            dynamicMarkCounts: annotationData.counts,
            unreadableDynamicCount: annotationData.unreadableCount,
            transitionAttackCount: assignment.transitionAttackCount,
            expressionMarkCount: annotationData.expressionMarkCount,
            regularTextExpressionCount: annotationData.regularTextExpressionCount,
            tempoMarkCount: annotationData.tempoMarkCount,
            hiddenMarkCount: annotationData.hiddenMarkCount,
            hiddenDynamicMarkCount: annotationData.hiddenDynamicMarkCount,
            hiddenExpressionMarkCount: annotationData.hiddenExpressionMarkCount,
            hiddenTempoMarkCount: annotationData.hiddenTempoMarkCount,
            hiddenBoundaryMarkCount: annotationData.hiddenBoundaryMarkCount,
            playbackDisabledTempoCount: annotationData.playbackDisabledTempoCount,
            plainTextTempoCount: annotationData.plainTextTempoCount,
            namedTextTempoCount: annotationData.namedTextTempoCount,
            slurCount: spannerData.slurs.length,
            hairpinCount: spannerData.hairpins.length,
            gradualTempoCount: spannerData.gradualTempoCount,
            skippedSpannerCount: spannerData.skippedSpannerCount,
            spannerScanAvailable: spannerData.scanAvailable,
            spannerCompatibilityMode: spannerData.compatibilityMode
        };
    }

    function emptyBackupState() {
        return {
            version: 1,
            pluginVersion: plugin.version,
            notes: {}
        };
    }

    function loadBackupState() {
        var raw = "";
        var parsed = null;
        try {
            raw = curScore.metaTag(backupTag);
        } catch (error1) {
        }
        if (raw) {
            try {
                parsed = JSON.parse(raw);
                if (parsed && parsed.notes) {
                    parsed.version = 1;
                    return parsed;
                }
            } catch (currentError) {
            }
        }

        return emptyBackupState();
    }

    function retainSupportedBackupState(state, noteMetadata) {
        var retained = {};
        var key;
        for (key in state.notes) {
            if (own(state.notes, key)
                    && own(noteMetadata, key)
                    && noteMetadata[key].supportedKeyboard === true) {
                retained[key] = state.notes[key];
            }
        }
        state.notes = retained;
        return state;
    }

    function velocityTypeNumber(note) {
        try {
            var value = Number(note.veloType);
            if (isFinite(value)) {
                return value;
            }
        } catch (error) {
        }
        return userVelocityTypeNumber();
    }

    // 古い環境では OFFSET_VAL=0、USER_VAL=1
    function isAbsoluteVelocityType(value) {
        try {
            return Number(value) === Number(NoteValueType.USER_VAL);
        } catch (error) {
            return Number(value) === 1;
        }
    }

    function userVelocityTypeNumber() {
        try {
            return Number(NoteValueType.USER_VAL);
        } catch (error) {
            return 1;
        }
    }

    function finitePropertyValue(value) {
        var number = Number(value);
        return isFinite(number) ? number : null;
    }

    function detectVelocityApi(note) {
        try {
            if (finitePropertyValue(note.userVelocity) !== null) {
                return "userVelocity";
            }
        } catch (error1) {
        }
        try {
            if (finitePropertyValue(note.veloOffset) !== null) {
                return "veloOffset";
            }
        } catch (error2) {
        }
        return "";
    }

    function readVelocityValue(note, apiName) {
        try {
            if (apiName === "userVelocity") {
                return finitePropertyValue(note.userVelocity);
            }
            if (apiName === "veloOffset") {
                return finitePropertyValue(note.veloOffset);
            }
        } catch (error) {
        }
        return null;
    }

    function writeVelocityValue(note, apiName, value) {
        if (apiName === "userVelocity") {
            note.userVelocity = value;
            return;
        }
        if (apiName === "veloOffset") {
            note.veloOffset = value;
            return;
        }
        throw new Error("No writable note-velocity property is available.");
    }

    function captureVelocityState(note, apiName) {
        var value = readVelocityValue(note, apiName);
        if (value === null) {
            return null;
        }
        return [apiName, velocityTypeNumber(note), value];
    }

    function applyTargetVelocity(note, apiName, targetValue) {
        var targetType = userVelocityTypeNumber();
        targetValue = clamp(Math.round(Number(targetValue)), 1, 127);

        note.veloType = targetType;
        writeVelocityValue(note, apiName, targetValue);
        return {
            api: apiName,
            type: targetType,
            value: targetValue
        };
    }

    function verifyVelocityWrites(expectedWrites, noteMetadata) {
        var expectedCount = 0;
        var expectedKey;
        for (expectedKey in expectedWrites) {
            if (own(expectedWrites, expectedKey)) {
                ++expectedCount;
            }
        }

        var checkedCount = 0;
        var failedCount = 0;
        var firstFailedMeasure = 0;
        var firstFailedNoteLabel = "";
        var checkedKeys = {};
        var minimum = 127;
        var maximum = 1;
        var segment = curScore.firstSegment();

        while (segment) {
            var track;
            for (track = 0; track < curScore.ntracks; ++track) {
                var element = segment.elementAt(track);
                if (!element || element.type !== Element.CHORD) {
                    continue;
                }
                var i;
                for (i = 0; i < element.notes.length; ++i) {
                    var note = element.notes[i];
                    var key = noteKey(segment.tick, track, note.pitch, i);
                    if (!own(expectedWrites, key)) {
                        continue;
                    }

                    var metadata = noteMetadata && noteMetadata[key];
                    if (metadata) {
                        processingMeasureNumber = Number(metadata.measureIndex) + 1;
                        processingNoteLabel = noteLabelFromMetadata(metadata);
                    }
                    var expected = expectedWrites[key];
                    var actualType = velocityTypeNumber(note);
                    var actualValue = readVelocityValue(note, expected[0]);
                    ++checkedCount;
                    checkedKeys[key] = true;
                    if (actualValue !== null) {
                        minimum = Math.min(minimum, actualValue);
                        maximum = Math.max(maximum, actualValue);
                    }
                    if (actualValue === null
                            || actualType !== Number(expected[1])
                            || actualValue !== Number(expected[2])) {
                        ++failedCount;
                        if (firstFailedMeasure === 0 && metadata) {
                            firstFailedMeasure = Number(metadata.measureIndex) + 1;
                            firstFailedNoteLabel = noteLabelFromMetadata(metadata);
                        }
                    }
                }
            }
            segment = segment.next;
        }

        failedCount += Math.max(0, expectedCount - checkedCount);
        if (firstFailedMeasure === 0 && checkedCount < expectedCount) {
            for (expectedKey in expectedWrites) {
                if (own(expectedWrites, expectedKey)
                        && !own(checkedKeys, expectedKey)
                        && noteMetadata && noteMetadata[expectedKey]) {
                    firstFailedMeasure = Number(
                                noteMetadata[expectedKey].measureIndex) + 1;
                    firstFailedNoteLabel = noteLabelFromMetadata(
                                noteMetadata[expectedKey]);
                    break;
                }
            }
        }
        processingMeasureNumber = firstFailedMeasure;
        processingNoteLabel = firstFailedNoteLabel;
        return {
            expectedCount: expectedCount,
            checkedCount: checkedCount,
            failedCount: failedCount,
            firstFailedMeasure: firstFailedMeasure,
            firstFailedNoteLabel: firstFailedNoteLabel,
            minimum: minimum <= maximum ? minimum : null,
            maximum: minimum <= maximum ? maximum : null
        };
    }

    function applySomyaku(writeMode) {
        mainTabIndex = 2;
        processingMeasureNumber = 0;
        processingNoteLabel = "";
        if (!curScore) {
            statusIsError = true;
            setLocalizedStatus("status.noScore", []);
            return;
        }

        var writeScope = null;
        if (writeMode === "selection") {
            writeScope = selectionWriteScope();
            if (!writeScope) {
                statusIsError = true;
                setLocalizedStatus("status.selectFirst", []);
                return;
            }
        } else {
            writeScope = currentScope();
        }

        updateScopeMessage();
        statusIsError = false;
        setLocalizedStatus("status.building", []);
        logStage("apply start", writeMode === "selection"
                 ? "selection write with complete-song analysis"
                 : "whole song");

        var analysisStageKey = "stage.reading";
        try {
            // 選択適用でも解析はスコア全体
            var scope = currentScope();
            var partDescriptors = scorePartDescriptors();
            var data = gatherScoreData(scope, partDescriptors);
            if (data.events.length === 0) {
                statusIsError = true;
                setLocalizedStatus("status.noSupportedKeyboardScope", []);
                return;
            }
            if (writeMode === "selection") {
                var selectedSupportedNote = false;
                var metadataKey;
                for (metadataKey in data.noteMetadata) {
                    if (own(data.noteMetadata, metadataKey)
                            && noteMatchesWriteScope(
                                writeScope,
                                data.noteMetadata[metadataKey])) {
                        selectedSupportedNote = true;
                        break;
                    }
                }
                if (!selectedSupportedNote) {
                    statusIsError = true;
                    setLocalizedStatus("status.noSupportedKeyboardScope", []);
                    return;
                }
            }

            analysisStageKey = "stage.model";
            processingMeasureNumber = 0;
            processingNoteLabel = "";
            logStage("analysis", data.measures.length + " measures, "
                     + data.events.length + " chord attacks");
            var result = Engine.analyze(data, settingsObject());
            if (profileName() === "natural") {
                if (selectedCustomPresetIndex < 0) {
                    setControlsFromModel(result.suggestedControls, true);
                }
                detectedStyleState = "naturalDetected";
            } else {
                detectedStyleState = "presetContext";
            }
            detectedCharacter = result.detectedCharacter;
            detectedCharacterConfidence = result.detectedCharacterConfidence;
            refreshDetectedStyleMessage();
            logStage("dynamic transitions",
                     result.smoothedDynamicTransitionCount + "/"
                     + result.contextualDynamicTransitionCount
                     + " context-smoothed across "
                     + result.rampedDynamicAttackCount + " note attacks; "
                     + result.coordinatedMultistaffTransitionCount
                     + " coordinated across multi-staff parts; "
                     + result.preservedDynamicStepCount
                     + " context-justified immediate");
            logStage("cross-staff roles",
                     result.crossStaffComparedMeasureCount + " measures in "
                     + result.crossStaffComparedPartCount
                     + " multi-staff parts; upper lead "
                     + result.upperLeadMeasureCount + ", lower lead "
                     + result.lowerLeadMeasureCount + ", balanced "
                     + result.balancedCrossStaffMeasureCount + "; "
                     + result.crossedRegisterMeasureCount
                     + " register/staff crossings and "
                     + result.crossStaffLeadHandoffCount + " smooth handoffs");
            var state = retainSupportedBackupState(
                        loadBackupState(), data.noteMetadata);
            var key;
            var touched = 0;
            var appliedMeasures = {};
            var expectedWrites = {};
            var velocityApi = "";
            var writeKeys = [];

            for (key in result.deltas) {
                if (own(result.deltas, key)
                        && own(data.noteReferences, key)
                        && own(data.noteMetadata, key)
                        && noteMatchesWriteScope(writeScope,
                                                 data.noteMetadata[key])) {
                    writeKeys.push(key);
                }
            }
            if (writeKeys.length === 0) {
                statusIsError = true;
                setLocalizedStatus("status.noSupportedKeyboardScope", []);
                return;
            }

            for (var writeIndex = 0; writeIndex < writeKeys.length; ++writeIndex) {
                key = writeKeys[writeIndex];
                if (own(data.noteReferences, key)) {
                    velocityApi = detectVelocityApi(data.noteReferences[key]);
                    break;
                }
            }
            if (!velocityApi) {
                statusIsError = true;
                setLocalizedStatus("status.noWritableVelocity", []);
                return;
            }

            analysisStageKey = "stage.writing";
            logStage("write start", writeKeys.length + " note attacks");
            curScore.startCmd();
            try {
                for (writeIndex = 0; writeIndex < writeKeys.length; ++writeIndex) {
                    key = writeKeys[writeIndex];
                    var metadata = data.noteMetadata[key];
                    processingMeasureNumber = Number(metadata.measureIndex) + 1;
                    processingNoteLabel = noteLabelFromMetadata(metadata);
                    var note = data.noteReferences[key];
                    var delta = Number(result.deltas[key]);
                    var alreadyBackedUp = own(state.notes, key);

                    if (!alreadyBackedUp) {
                        state.notes[key] = captureVelocityState(note, velocityApi);
                        if (!state.notes[key]) {
                            throw new Error("Could not read the original velocity for note " + key);
                        }
                    }

                    var original = state.notes[key];
                    var dynamicBase = Number(result.baseVelocities[key]);
                    // 保存値は復元用。上級設定がオンのときだけ解析にも使う
                    var targetValue = preserveVelocityCheck.checked
                            ? Engine.noteVelocityTarget(
                                  isAbsoluteVelocityType(original[1]),
                                  original[2],
                                  dynamicBase,
                                  delta,
                                  true)
                            : clamp(Math.round(dynamicBase + delta), 1, 127);
                    var expected = applyTargetVelocity(
                                note,
                                velocityApi,
                                targetValue);
                    expectedWrites[key] = [
                        expected.api,
                        expected.type,
                        expected.value
                    ];
                    ++touched;
                    var appliedMeasureKey = String(metadata.measureIndex);
                    appliedMeasures[appliedMeasureKey] = true;
                    if (writeIndex > 0 && writeIndex % 500 === 0) {
                        logStage("write progress", writeIndex + "/"
                                 + writeKeys.length);
                    }
                }

                state.pluginVersion = plugin.version;
                state.lastProfile = profileName();
                state.lastScope = writeMode === "selection" ? "selection" : "whole-song";
                state.velocityApi = velocityApi;
                curScore.setMetaTag(backupTag, JSON.stringify(state));
                curScore.endCmd();
                hasBackupChanges = true;
                rememberAppliedSettings();
                logStage("write complete", touched + " note attacks");
            } catch (writeError) {
                curScore.endCmd(true);
                throw writeError;
            }

            // endCmd() の後で音符を取り直して、書き込み結果をチェック
            analysisStageKey = "stage.verifying";
            logStage("verification", "post-command velocity read-back");
            var verification = verifyVelocityWrites(
                        expectedWrites, data.noteMetadata);
            var writeFailures = verification.failedCount;

            statusIsError = writeFailures > 0;
            var appliedMeasureCount = ownKeyCount(appliedMeasures);
            logStage("apply complete", verification.checkedCount
                     + " velocities verified");
            setApplyResultStatus({
                writeFailures: writeFailures,
                detectedCharacter: result.detectedCharacter,
                touched: touched,
                appliedMeasureCount: appliedMeasureCount,
                sectionCount: result.sectionCount,
                phraseCount: result.phraseCount,
                inferenceMode: result.dynamicInferenceMode,
                firstFailedMeasure: verification.firstFailedMeasure,
                firstFailedNoteLabel: verification.firstFailedNoteLabel
            });
            processingMeasureNumber = verification.firstFailedMeasure;
            processingNoteLabel = verification.firstFailedNoteLabel;
        } catch (error) {
            statusIsError = true;
            setApplyErrorStatus(analysisStageKey, error,
                                processingMeasureNumber,
                                processingNoteLabel);
            console.log(statusMessage);
        }
    }

    function revertSomyakuChanges() {
        mainTabIndex = 2;
        processingMeasureNumber = 0;
        processingNoteLabel = "";
        if (!curScore) {
            statusIsError = true;
            setLocalizedStatus("status.noScore", []);
            return;
        }

        var state = loadBackupState();
        var backupCount = 0;
        var backupKey;
        for (backupKey in state.notes) {
            if (own(state.notes, backupKey)) {
                ++backupCount;
            }
        }
        if (backupCount === 0) {
            statusIsError = false;
            setLocalizedStatus("status.noReset", []);
            return;
        }

        var restored = 0;
        try {
            var resetMeasures = collectMeasures(currentScope());
            var partDescriptors = scorePartDescriptors();
            var resetTargets = [];
            var supportedAttackCount = 0;
            var segment = curScore.firstSegment();
            while (segment) {
                var resetMeasureIndex = measureIndexAtTick(
                            resetMeasures, segment.tick);
                var resetMeasureNumber = resetMeasureIndex >= 0
                        ? Number(resetMeasures[resetMeasureIndex].originalIndex) + 1
                        : 0;
                var track;
                for (track = 0; track < curScore.ntracks; ++track) {
                    if (!isSupportedKeyboardTrackAtTick(
                                partDescriptors, track, segment.tick)) {
                        continue;
                    }
                    var element = segment.elementAt(track);
                    if (!element || element.type !== Element.CHORD) {
                        continue;
                    }
                    ++supportedAttackCount;
                    var i;
                    for (i = 0; i < element.notes.length; ++i) {
                        var note = element.notes[i];
                        var key = noteKey(segment.tick, track, note.pitch, i);
                        if (own(state.notes, key)) {
                            resetTargets.push({
                                note: note,
                                original: state.notes[key],
                                measureNumber: resetMeasureNumber,
                                noteLabel: midiNoteName(note.pitch)
                                        + " · S" + (Math.floor(track / 4) + 1)
                                        + "/V" + (track % 4 + 1)
                            });
                        }
                    }
                }
                segment = segment.next;
            }
            if (resetTargets.length === 0) {
                statusIsError = supportedAttackCount === 0;
                setLocalizedStatus(supportedAttackCount === 0
                                   ? "status.noSupportedKeyboardScope"
                                   : "status.noReset", []);
                return;
            }

            curScore.startCmd();
            try {
                var targetIndex;
                for (targetIndex = 0;
                        targetIndex < resetTargets.length;
                        ++targetIndex) {
                    var target = resetTargets[targetIndex];
                    processingMeasureNumber = target.measureNumber;
                    processingNoteLabel = target.noteLabel;
                    target.note.veloType = Number(target.original[1]);
                    writeVelocityValue(
                                target.note,
                                String(target.original[0]),
                                Number(target.original[2]));
                    ++restored;
                }
                curScore.setMetaTag(backupTag, "");
                curScore.endCmd();
                hasBackupChanges = false;
            } catch (writeError) {
                curScore.endCmd(true);
                throw writeError;
            }

            statusIsError = false;
            setLocalizedStatus("status.reset", [restored]);
            processingMeasureNumber = 0;
            processingNoteLabel = "";
        } catch (error) {
            statusIsError = true;
            setResetErrorStatus(error, processingMeasureNumber,
                                processingNoteLabel);
            console.log(statusMessage);
        }
    }

    onRun: {
        restoreCustomPresets();
        applyPresetControls();
        updateScopeMessage();
        hasBackupChanges = ownKeyCount(loadBackupState().notes) > 0;
        statusIsError = false;
        setLocalizedStatus("status.ready", []);
        rememberAppliedSettings();
    }

    Connections {
        id: hostWindowCloseConnection
        target: versionOneUi.Window.window
        ignoreUnknownSignals: true

        function onClosing(close) {
            if (allowHostWindowClose) {
                return;
            }
            close.accepted = false;
            requestQuit();
        }
    }

    Rectangle {
        id: versionOneUi
        anchors.fill: parent
        color: ui.theme.backgroundPrimaryColor

        ColumnLayout {
            anchors.fill: parent
            spacing: 0

            Item {
                Layout.fillWidth: true
                Layout.preferredHeight: 68

                RowLayout {
                    anchors.fill: parent
                    anchors.leftMargin: 16
                    anchors.rightMargin: 16
                    spacing: 12

                    ColumnLayout {
                        Layout.fillWidth: true
                        Layout.alignment: Qt.AlignVCenter
                        spacing: 0

                        MU.StyledTextLabel {
                            text: trText("product.name")
                            font: ui.theme.headerBoldFont
                            horizontalAlignment: Text.AlignLeft
                            Layout.fillWidth: true
                        }
                    }

                    ColumnLayout {
                        Layout.minimumWidth: languageSelectorWidth
                        Layout.preferredWidth: languageSelectorWidth
                        Layout.maximumWidth: languageSelectorWidth
                        Layout.alignment: Qt.AlignVCenter
                        spacing: 4

                        MU.StyledTextLabel {
                            text: trText("label.language")
                            font: ui.theme.bodyBoldFont
                            horizontalAlignment: Text.AlignLeft
                            Layout.fillWidth: true
                        }

                        MU.StyledDropdown {
                            id: languageDropdown
                            Layout.fillWidth: true
                            Layout.preferredHeight: 30
                            Accessible.name: trText("label.language")
                            model: languageDropdownModel()
                            currentIndex: languageDropdownIndex(languageMode)
                            popupItemsCount: 11
                            onActivated: function(index, value) {
                                languageMode = String(value);
                            }
                        }
                    }
                }
            }

            MU.SeparatorLine {
                Layout.fillWidth: true
            }

            ColumnLayout {
                Layout.fillWidth: true
                Layout.fillHeight: true
                Layout.leftMargin: 16
                Layout.rightMargin: 16
                Layout.topMargin: 12
                Layout.bottomMargin: 12
                spacing: 12

                ButtonGroup {
                    id: mainTabGroup
                }

                Row {
                    id: mainTabs
                    Layout.fillWidth: true
                    Layout.preferredHeight: 36
                    spacing: 0

                    MU.PageTabButton {
                        title: trText("tab.performance")
                        spacing: 0
                        leftPadding: 12
                        normalStateFont: checked
                                         ? ui.theme.largeBodyBoldFont
                                         : ui.theme.largeBodyFont
                        ButtonGroup.group: mainTabGroup
                        checked: mainTabIndex === 0
                        onToggled: {
                            if (checked) {
                                mainTabIndex = 0;
                            }
                        }
                    }

                    MU.PageTabButton {
                        title: trText("tab.dynamics")
                        spacing: 0
                        leftPadding: 12
                        normalStateFont: checked
                                         ? ui.theme.largeBodyBoldFont
                                         : ui.theme.largeBodyFont
                        ButtonGroup.group: mainTabGroup
                        checked: mainTabIndex === 1
                        onToggled: {
                            if (checked) {
                                mainTabIndex = 1;
                            }
                        }
                    }

                    MU.PageTabButton {
                        title: trText("tab.analysis")
                        spacing: 0
                        leftPadding: 12
                        normalStateFont: checked
                                         ? ui.theme.largeBodyBoldFont
                                         : ui.theme.largeBodyFont
                        ButtonGroup.group: mainTabGroup
                        checked: mainTabIndex === 2
                        onToggled: {
                            if (checked) {
                                mainTabIndex = 2;
                            }
                        }
                    }
                }

                StackLayout {
                    id: pageStack
                    currentIndex: mainTabIndex
                    Layout.fillWidth: true
                    Layout.fillHeight: true

                    Item {
                        id: performancePage

                        MU.StyledFlickable {
                            id: performanceFlickable
                            anchors.fill: parent
                            contentWidth: width
                            contentHeight: performanceLayout.implicitHeight

                            ColumnLayout {
                                id: performanceLayout
                                width: performanceFlickable.width
                                spacing: 12

                                MU.StyledGroupBox {
                                    title: trText("group.interpretation")
                                    Layout.fillWidth: true

                                    ColumnLayout {
                                        width: parent.width
                                        spacing: 12

                                        RowLayout {
                                            Layout.fillWidth: true
                                            spacing: 12

                                            MU.StyledTextLabel {
                                                text: trText("label.preset")
                                                horizontalAlignment: Text.AlignLeft
                                                Layout.preferredWidth: 148
                                            }

                                            MU.StyledDropdown {
                                                id: profileBox
                                                Accessible.name: trText("label.preset")
                                                Layout.fillWidth: true
                                                model: [
                                                    { text: trText("preset.natural"), value: "natural" },
                                                    { text: trText("preset.subtle"), value: "subtle" },
                                                    { text: trText("preset.ballad"), value: "ballad" },
                                                    { text: trText("preset.expressive"), value: "expressive" },
                                                    { text: trText("preset.jazz"), value: "jazz" },
                                                    { text: trText("preset.baroque"), value: "baroque" },
                                                    { text: trText("preset.cinematic"), value: "cinematic" },
                                                    { text: trText("preset.virtuosic"), value: "virtuosic" }
                                                ]
                                                currentIndex: 0
                                                onActivated: function(index, value) {
                                                    requestProfilePreset(index);
                                                }
                                            }

                                            MU.StyledTextLabel {
                                                text: controlsAutoDetected
                                                      ? trText("state.detected")
                                                      : (presetModified
                                                         ? trText("state.adjusted")
                                                         : trText("state.preset"))
                                                opacity: 0.64
                                                Layout.preferredWidth: 64
                                            }
                                        }

                                        MU.StyledTextLabel {
                                            text: detectedStyleMessage
                                            horizontalAlignment: Text.AlignLeft
                                            wrapMode: Text.WordWrap
                                            opacity: 0.76
                                            Layout.fillWidth: true
                                        }

                                        MU.StyledTextLabel {
                                            text: trText("help.workflow")
                                            horizontalAlignment: Text.AlignLeft
                                            wrapMode: Text.WordWrap
                                            opacity: 0.68
                                            Layout.fillWidth: true
                                        }

                                        MU.StyledTextLabel {
                                            text: trText("help.phraseAutomatic")
                                            horizontalAlignment: Text.AlignLeft
                                            wrapMode: Text.WordWrap
                                            opacity: 0.68
                                            Layout.fillWidth: true
                                        }
                                    }
                                }

                                MU.StyledGroupBox {
                                    title: trText("group.customPresets")
                                    Layout.fillWidth: true

                                    ColumnLayout {
                                        width: parent.width
                                        spacing: 8

                                        RowLayout {
                                            Layout.fillWidth: true
                                            spacing: 8

                                            MU.StyledTextLabel {
                                                text: trText("label.savedPreset")
                                                horizontalAlignment: Text.AlignLeft
                                                Layout.preferredWidth: 148
                                            }

                                            MU.StyledDropdown {
                                                id: customPresetBox
                                                Accessible.name: trText("label.savedPreset")
                                                Layout.fillWidth: true
                                                model: customPresetDropdownModel()
                                                currentIndex: selectedCustomPresetIndex + 1
                                                onActivated: function(index, value) {
                                                    requestCustomPreset(Number(value));
                                                }
                                            }

                                            MU.FlatButton {
                                                id: updateCustomPresetButton
                                                text: trText("button.updatePreset")
                                                toolTipTitle: trText("button.updatePreset")
                                                Accessible.name: trText("button.updatePreset")
                                                enabled: !busy
                                                         && hasUnsavedCustomPreset()
                                                onClicked: requestConfirmation(
                                                                   "overwritePreset")
                                            }

                                            MU.FlatButton {
                                                id: saveCustomPresetButton
                                                icon: IconCode.PLUS
                                                Layout.preferredHeight: 30
                                                Layout.preferredWidth: height
                                                toolTipTitle: trText("button.savePreset")
                                                Accessible.name: trText("button.savePreset")
                                                transparent: true
                                                enabled: !busy
                                                onClicked: saveCustomPreset()
                                            }

                                            MU.FlatButton {
                                                id: deleteCustomPresetButton
                                                icon: IconCode.DELETE_TANK
                                                Layout.preferredHeight: 30
                                                Layout.preferredWidth: height
                                                toolTipTitle: trText("button.deletePreset")
                                                Accessible.name: trText("button.deletePreset")
                                                transparent: true
                                                enabled: selectedCustomPresetIndex >= 0
                                                 && selectedCustomPresetIndex
                                                         < customPresets.length
                                                onClicked: requestConfirmation("deletePreset")
                                            }
                                        }

                                        MU.StyledTextLabel {
                                            id: customPresetSaveState
                                            visible: selectedCustomPresetIndex >= 0
                                                     && selectedCustomPresetIndex
                                                     < customPresets.length
                                            text: hasUnsavedCustomPreset()
                                                  ? trText("status.customPresetUnsaved")
                                                  : trText("status.customPresetSavedState")
                                            horizontalAlignment: Text.AlignLeft
                                            opacity: hasUnsavedCustomPreset() ? 1.0 : 0.68
                                            Layout.fillWidth: true
                                        }

                                        MU.StyledTextLabel {
                                            text: trText("help.customPresets")
                                            horizontalAlignment: Text.AlignLeft
                                            wrapMode: Text.WordWrap
                                            opacity: 0.68
                                            Layout.fillWidth: true
                                        }
                                    }
                                }

                                MU.StyledGroupBox {
                                    title: trText("group.performanceControls")
                                    Layout.fillWidth: true

                                    GridLayout {
                                        width: parent.width
                                        columns: 3
                                        columnSpacing: 12
                                        rowSpacing: 10

                                        MU.StyledTextLabel {
                                            text: trText("label.overallStrength")
                                            horizontalAlignment: Text.AlignLeft
                                            Layout.preferredWidth: 148
                                        }
                                        MU.StyledSlider {
                                            id: strengthSlider
                                            Accessible.name: trText("label.overallStrength")
                                            from: 0
                                            to: 100
                                            stepSize: 1
                                            value: 72
                                            Layout.fillWidth: true
                                            onPressedChanged: {
                                                if (pressed) {
                                                    beginShapingSliderGesture();
                                                } else {
                                                    finishShapingSliderGesture();
                                                }
                                            }
                                            onMoved: handleShapingSliderMoved(
                                                         strengthSlider)
                                        }
                                        MU.IncrementalPropertyControl {
                                            id: strengthEditor
                                            Layout.preferredWidth: 64
                                            Layout.maximumWidth: 64
                                            currentValue: strengthSlider.value
                                            minValue: 0
                                            maxValue: 100
                                            step: 1
                                            decimals: 0
                                            navigation.accessible.name: trText("label.overallStrength")
                                            onValueEdited: function(newValue) {
                                                updatePerformanceControlFromEditor(
                                                            strengthSlider,
                                                            newValue, 0, 100);
                                            }
                                            onValueEditingFinished: function(newValue) {
                                                updatePerformanceControlFromEditor(
                                                            strengthSlider,
                                                            newValue, 0, 100);
                                            }
                                        }

                                        MU.StyledTextLabel {
                                            text: trText("label.sectionContrast")
                                            horizontalAlignment: Text.AlignLeft
                                        }
                                        MU.StyledSlider {
                                            id: sectionSlider
                                            Accessible.name: trText("label.sectionContrast")
                                            from: 0
                                            to: 100
                                            stepSize: 1
                                            value: 60
                                            Layout.fillWidth: true
                                            onPressedChanged: {
                                                if (pressed) {
                                                    beginShapingSliderGesture();
                                                } else {
                                                    finishShapingSliderGesture();
                                                }
                                            }
                                            onMoved: handleShapingSliderMoved(
                                                         sectionSlider)
                                        }
                                        MU.IncrementalPropertyControl {
                                            id: sectionEditor
                                            Layout.preferredWidth: 64
                                            Layout.maximumWidth: 64
                                            currentValue: sectionSlider.value
                                            minValue: 0
                                            maxValue: 100
                                            step: 1
                                            decimals: 0
                                            navigation.accessible.name: trText("label.sectionContrast")
                                            onValueEdited: function(newValue) {
                                                updatePerformanceControlFromEditor(
                                                            sectionSlider,
                                                            newValue, 0, 100);
                                            }
                                            onValueEditingFinished: function(newValue) {
                                                updatePerformanceControlFromEditor(
                                                            sectionSlider,
                                                            newValue, 0, 100);
                                            }
                                        }

                                        MU.StyledTextLabel {
                                            text: trText("label.melodyFocus")
                                            horizontalAlignment: Text.AlignLeft
                                        }
                                        MU.StyledSlider {
                                            id: melodySlider
                                            Accessible.name: trText("label.melodyFocus")
                                            from: 0
                                            to: 100
                                            stepSize: 1
                                            value: 58
                                            Layout.fillWidth: true
                                            onPressedChanged: {
                                                if (pressed) {
                                                    beginShapingSliderGesture();
                                                } else {
                                                    finishShapingSliderGesture();
                                                }
                                            }
                                            onMoved: handleShapingSliderMoved(
                                                         melodySlider)
                                        }
                                        MU.IncrementalPropertyControl {
                                            id: melodyEditor
                                            Layout.preferredWidth: 64
                                            Layout.maximumWidth: 64
                                            currentValue: melodySlider.value
                                            minValue: 0
                                            maxValue: 100
                                            step: 1
                                            decimals: 0
                                            navigation.accessible.name: trText("label.melodyFocus")
                                            onValueEdited: function(newValue) {
                                                updatePerformanceControlFromEditor(
                                                            melodySlider,
                                                            newValue, 0, 100);
                                            }
                                            onValueEditingFinished: function(newValue) {
                                                updatePerformanceControlFromEditor(
                                                            melodySlider,
                                                            newValue, 0, 100);
                                            }
                                        }

                                        MU.StyledTextLabel {
                                            text: trText("label.pianoBalance")
                                            horizontalAlignment: Text.AlignLeft
                                        }
                                        MU.StyledSlider {
                                            id: crossStaffSlider
                                            Accessible.name: trText("label.pianoBalance")
                                            from: 0
                                            to: 135
                                            stepSize: 1
                                            value: 100
                                            Layout.fillWidth: true
                                            onPressedChanged: {
                                                if (pressed) {
                                                    beginShapingSliderGesture();
                                                } else {
                                                    finishShapingSliderGesture();
                                                }
                                            }
                                            onMoved: handleShapingSliderMoved(
                                                         crossStaffSlider)
                                        }
                                        MU.IncrementalPropertyControl {
                                            id: crossStaffEditor
                                            Layout.preferredWidth: 64
                                            Layout.maximumWidth: 64
                                            currentValue: crossStaffSlider.value
                                            minValue: 0
                                            maxValue: 135
                                            step: 1
                                            decimals: 0
                                            navigation.accessible.name: trText("label.pianoBalance")
                                            onValueEdited: function(newValue) {
                                                updatePerformanceControlFromEditor(
                                                            crossStaffSlider,
                                                            newValue, 0, 135);
                                            }
                                            onValueEditingFinished: function(newValue) {
                                                updatePerformanceControlFromEditor(
                                                            crossStaffSlider,
                                                            newValue, 0, 135);
                                            }
                                        }

                                        MU.StyledTextLabel {
                                            text: trText("label.contextDetail")
                                            horizontalAlignment: Text.AlignLeft
                                        }
                                        MU.StyledSlider {
                                            id: detailSlider
                                            Accessible.name: trText("label.contextDetail")
                                            from: 0
                                            to: 100
                                            stepSize: 1
                                            value: 38
                                            Layout.fillWidth: true
                                            onPressedChanged: {
                                                if (pressed) {
                                                    beginShapingSliderGesture();
                                                } else {
                                                    finishShapingSliderGesture();
                                                }
                                            }
                                            onMoved: handleShapingSliderMoved(
                                                         detailSlider)
                                        }
                                        MU.IncrementalPropertyControl {
                                            id: detailEditor
                                            Layout.preferredWidth: 64
                                            Layout.maximumWidth: 64
                                            currentValue: detailSlider.value
                                            minValue: 0
                                            maxValue: 100
                                            step: 1
                                            decimals: 0
                                            navigation.accessible.name: trText("label.contextDetail")
                                            onValueEdited: function(newValue) {
                                                updatePerformanceControlFromEditor(
                                                            detailSlider,
                                                            newValue, 0, 100);
                                            }
                                            onValueEditingFinished: function(newValue) {
                                                updatePerformanceControlFromEditor(
                                                            detailSlider,
                                                            newValue, 0, 100);
                                            }
                                        }

                                        RowLayout {
                                            Layout.columnSpan: 3
                                            Layout.fillWidth: true
                                            spacing: 8

                                            Item {
                                                Layout.fillWidth: true
                                            }

                                            Item {
                                                Layout.preferredHeight: 22
                                                Layout.preferredWidth: 1

                                                MU.SeparatorLine {
                                                    anchors.fill: parent
                                                    orientation: Qt.Vertical
                                                    opacity: 0.58
                                                }
                                            }

                                            MU.FlatButton {
                                                id: shapingUndoButton
                                                Layout.preferredHeight: 30
                                                Layout.preferredWidth: height
                                                icon: IconCode.UNDO
                                                toolTipTitle: trText("button.controlsUndo")
                                                Accessible.name: trText("button.controlsUndo")
                                                transparent: true
                                                enabled: shapingUndoHistory.length > 0
                                                onClicked: undoShapingControls()
                                            }

                                            MU.FlatButton {
                                                id: shapingRedoButton
                                                Layout.preferredHeight: 30
                                                Layout.preferredWidth: height
                                                icon: IconCode.REDO
                                                toolTipTitle: trText("button.controlsRedo")
                                                Accessible.name: trText("button.controlsRedo")
                                                transparent: true
                                                enabled: shapingRedoHistory.length > 0
                                                onClicked: redoShapingControls()
                                            }

                                            Item {
                                                Layout.preferredHeight: 22
                                                Layout.preferredWidth: 1

                                                MU.SeparatorLine {
                                                    anchors.fill: parent
                                                    orientation: Qt.Vertical
                                                    opacity: 0.58
                                                }
                                            }

                                            MU.FlatButton {
                                                id: restorePerformanceButton
                                                text: trText("button.controlsReset")
                                                transparent: true
                                                toolTipTitle: trText(
                                                                      "dialog.restorePerformanceWarning")
                                                Accessible.name: trText(
                                                                     "button.controlsReset")
                                                onClicked: requestConfirmation(
                                                                   "restorePerformance")
                                            }
                                        }
                                    }
                                }

                                MU.StyledTextLabel {
                                    text: trText("help.pianoDetail")
                                    horizontalAlignment: Text.AlignLeft
                                    wrapMode: Text.WordWrap
                                    opacity: 0.68
                                    Layout.fillWidth: true
                                }

                                MU.StyledGroupBox {
                                    title: trText("group.scope")
                                    Layout.fillWidth: true

                                    MU.StyledTextLabel {
                                        width: parent.width
                                        text: scopeMessage
                                        horizontalAlignment: Text.AlignLeft
                                        wrapMode: Text.WordWrap
                                        opacity: 0.76
                                    }
                                }
                            }
                        }
                    }

                    Item {
                        id: dynamicsPage

                        MU.StyledFlickable {
                            id: dynamicsFlickable
                            anchors.fill: parent
                            contentWidth: width
                            contentHeight: dynamicsLayout.implicitHeight

                            ColumnLayout {
                                id: dynamicsLayout
                                width: dynamicsFlickable.width
                                spacing: 12

                                MU.StyledTextLabel {
                                    text: trText("notice.writtenSymbols")
                                    horizontalAlignment: Text.AlignLeft
                                    wrapMode: Text.WordWrap
                                    Layout.fillWidth: true
                                }

                                MU.CheckBox {
                                    id: preserveVelocityCheck
                                    text: trText("option.manualVelocity")
                                    checked: false
                                    onClicked: {
                                        checked = !checked;
                                    }
                                }

                                MU.StyledTextLabel {
                                    text: preserveVelocityCheck.checked
                                            ? trText("help.manualOn")
                                            : trText("help.manualOff")
                                    horizontalAlignment: Text.AlignLeft
                                    wrapMode: Text.WordWrap
                                    opacity: 0.68
                                    Layout.fillWidth: true
                                }

                                MU.StyledGroupBox {
                                    title: trText("group.baselines")
                                    Layout.fillWidth: true
                                    Layout.fillHeight: false

                                    Item {
                                        width: parent.width
                                        implicitHeight: baselineGrid.implicitHeight

                                        GridLayout {
                                            id: baselineGrid
                                            anchors.left: parent.left
                                            anchors.right: parent.right
                                            anchors.top: parent.top
                                            height: implicitHeight
                                            columns: 6
                                            columnSpacing: 6
                                            rowSpacing: 6

                                        MU.StyledTextLabel {
                                            text: "\uE52A"
                                            font.family: scoreDynamicsFontFamily()
                                            font.pixelSize: dynamicsGlyphPixelSize
                                            horizontalAlignment: Text.AlignRight
                                            verticalAlignment: Text.AlignVCenter
                                            Layout.preferredWidth: dynamicsGlyphBoxWidth
                                            Layout.maximumWidth: dynamicsGlyphBoxWidth
                                            Layout.preferredHeight: dynamicsGlyphBoxHeight
                                            Layout.maximumHeight: dynamicsGlyphBoxHeight
                                            clip: true
                                            Layout.alignment: Qt.AlignRight | Qt.AlignVCenter
                                            Accessible.name: "ppp"
                                        }
                                        MU.StyledSlider {
                                            id: pppSlider
                                            Accessible.name: trText("group.baselines") + " · ppp"
                                            from: 1; to: 127; stepSize: 1; value: 19
                                            Layout.fillWidth: true
                                            onPressedChanged: {
                                                if (pressed) {
                                                    beginBaselineSliderGesture();
                                                } else {
                                                    finishBaselineSliderGesture();
                                                }
                                            }
                                            onMoved: handleBaselineSliderMoved(
                                                         pppSlider, 0)
                                        }
                                        MU.IncrementalPropertyControl {
                                            id: pppEditor
                                            Layout.preferredWidth: 64
                                            Layout.maximumWidth: 64
                                            currentValue: pppSlider.value
                                            minValue: 1
                                            maxValue: 999
                                            step: 1
                                            decimals: 0
                                            navigation.accessible.name: trText("group.baselines") + " · ppp"
                                            onValueEdited: function(newValue) {
                                                updateDynamicBaselineFromEditor(pppSlider, newValue, 0);
                                            }
                                            onValueEditingFinished: function(newValue) {
                                                updateDynamicBaselineFromEditor(pppSlider, newValue, 0);
                                            }
                                        }
                                        MU.StyledTextLabel {
                                            text: "\uE52D"
                                            font.family: scoreDynamicsFontFamily()
                                            font.pixelSize: dynamicsGlyphPixelSize
                                            horizontalAlignment: Text.AlignRight
                                            verticalAlignment: Text.AlignVCenter
                                            Layout.preferredWidth: dynamicsGlyphBoxWidth
                                            Layout.maximumWidth: dynamicsGlyphBoxWidth
                                            Layout.preferredHeight: dynamicsGlyphBoxHeight
                                            Layout.maximumHeight: dynamicsGlyphBoxHeight
                                            clip: true
                                            Layout.alignment: Qt.AlignRight | Qt.AlignVCenter
                                            Accessible.name: "mf"
                                        }
                                        MU.StyledSlider {
                                            id: mfSlider
                                            Accessible.name: trText("group.baselines") + " · mf"
                                            from: 1; to: 127; stepSize: 1; value: 71
                                            Layout.fillWidth: true
                                            onPressedChanged: {
                                                if (pressed) {
                                                    beginBaselineSliderGesture();
                                                } else {
                                                    finishBaselineSliderGesture();
                                                }
                                            }
                                            onMoved: handleBaselineSliderMoved(
                                                         mfSlider, 4)
                                        }
                                        MU.IncrementalPropertyControl {
                                            id: mfEditor
                                            Layout.preferredWidth: 64
                                            Layout.maximumWidth: 64
                                            currentValue: mfSlider.value
                                            minValue: 1
                                            maxValue: 999
                                            step: 1
                                            decimals: 0
                                            navigation.accessible.name: trText("group.baselines") + " · mf"
                                            onValueEdited: function(newValue) {
                                                updateDynamicBaselineFromEditor(mfSlider, newValue, 4);
                                            }
                                            onValueEditingFinished: function(newValue) {
                                                updateDynamicBaselineFromEditor(mfSlider, newValue, 4);
                                            }
                                        }

                                        MU.StyledTextLabel {
                                            text: "\uE52B"
                                            font.family: scoreDynamicsFontFamily()
                                            font.pixelSize: dynamicsGlyphPixelSize
                                            horizontalAlignment: Text.AlignRight
                                            verticalAlignment: Text.AlignVCenter
                                            Layout.preferredWidth: dynamicsGlyphBoxWidth
                                            Layout.maximumWidth: dynamicsGlyphBoxWidth
                                            Layout.preferredHeight: dynamicsGlyphBoxHeight
                                            Layout.maximumHeight: dynamicsGlyphBoxHeight
                                            clip: true
                                            Layout.alignment: Qt.AlignRight | Qt.AlignVCenter
                                            Accessible.name: "pp"
                                        }
                                        MU.StyledSlider {
                                            id: ppSlider
                                            Accessible.name: trText("group.baselines") + " · pp"
                                            from: 1; to: 127; stepSize: 1; value: 32
                                            Layout.fillWidth: true
                                            onPressedChanged: {
                                                if (pressed) {
                                                    beginBaselineSliderGesture();
                                                } else {
                                                    finishBaselineSliderGesture();
                                                }
                                            }
                                            onMoved: handleBaselineSliderMoved(
                                                         ppSlider, 1)
                                        }
                                        MU.IncrementalPropertyControl {
                                            id: ppEditor
                                            Layout.preferredWidth: 64
                                            Layout.maximumWidth: 64
                                            currentValue: ppSlider.value
                                            minValue: 1
                                            maxValue: 999
                                            step: 1
                                            decimals: 0
                                            navigation.accessible.name: trText("group.baselines") + " · pp"
                                            onValueEdited: function(newValue) {
                                                updateDynamicBaselineFromEditor(ppSlider, newValue, 1);
                                            }
                                            onValueEditingFinished: function(newValue) {
                                                updateDynamicBaselineFromEditor(ppSlider, newValue, 1);
                                            }
                                        }
                                        MU.StyledTextLabel {
                                            text: "\uE522"
                                            font.family: scoreDynamicsFontFamily()
                                            font.pixelSize: dynamicsGlyphPixelSize
                                            horizontalAlignment: Text.AlignRight
                                            verticalAlignment: Text.AlignVCenter
                                            Layout.preferredWidth: dynamicsGlyphBoxWidth
                                            Layout.maximumWidth: dynamicsGlyphBoxWidth
                                            Layout.preferredHeight: dynamicsGlyphBoxHeight
                                            Layout.maximumHeight: dynamicsGlyphBoxHeight
                                            clip: true
                                            Layout.alignment: Qt.AlignRight | Qt.AlignVCenter
                                            Accessible.name: "f"
                                        }
                                        MU.StyledSlider {
                                            id: fSlider
                                            Accessible.name: trText("group.baselines") + " · f"
                                            from: 1; to: 127; stepSize: 1; value: 88
                                            Layout.fillWidth: true
                                            onPressedChanged: {
                                                if (pressed) {
                                                    beginBaselineSliderGesture();
                                                } else {
                                                    finishBaselineSliderGesture();
                                                }
                                            }
                                            onMoved: handleBaselineSliderMoved(
                                                         fSlider, 5)
                                        }
                                        MU.IncrementalPropertyControl {
                                            id: fEditor
                                            Layout.preferredWidth: 64
                                            Layout.maximumWidth: 64
                                            currentValue: fSlider.value
                                            minValue: 1
                                            maxValue: 999
                                            step: 1
                                            decimals: 0
                                            navigation.accessible.name: trText("group.baselines") + " · f"
                                            onValueEdited: function(newValue) {
                                                updateDynamicBaselineFromEditor(fSlider, newValue, 5);
                                            }
                                            onValueEditingFinished: function(newValue) {
                                                updateDynamicBaselineFromEditor(fSlider, newValue, 5);
                                            }
                                        }

                                        MU.StyledTextLabel {
                                            text: "\uE520"
                                            font.family: scoreDynamicsFontFamily()
                                            font.pixelSize: dynamicsGlyphPixelSize
                                            horizontalAlignment: Text.AlignRight
                                            verticalAlignment: Text.AlignVCenter
                                            Layout.preferredWidth: dynamicsGlyphBoxWidth
                                            Layout.maximumWidth: dynamicsGlyphBoxWidth
                                            Layout.preferredHeight: dynamicsGlyphBoxHeight
                                            Layout.maximumHeight: dynamicsGlyphBoxHeight
                                            clip: true
                                            Layout.alignment: Qt.AlignRight | Qt.AlignVCenter
                                            Accessible.name: "p"
                                        }
                                        MU.StyledSlider {
                                            id: pSlider
                                            Accessible.name: trText("group.baselines") + " · p"
                                            from: 1; to: 127; stepSize: 1; value: 47
                                            Layout.fillWidth: true
                                            onPressedChanged: {
                                                if (pressed) {
                                                    beginBaselineSliderGesture();
                                                } else {
                                                    finishBaselineSliderGesture();
                                                }
                                            }
                                            onMoved: handleBaselineSliderMoved(
                                                         pSlider, 2)
                                        }
                                        MU.IncrementalPropertyControl {
                                            id: pEditor
                                            Layout.preferredWidth: 64
                                            Layout.maximumWidth: 64
                                            currentValue: pSlider.value
                                            minValue: 1
                                            maxValue: 999
                                            step: 1
                                            decimals: 0
                                            navigation.accessible.name: trText("group.baselines") + " · p"
                                            onValueEdited: function(newValue) {
                                                updateDynamicBaselineFromEditor(pSlider, newValue, 2);
                                            }
                                            onValueEditingFinished: function(newValue) {
                                                updateDynamicBaselineFromEditor(pSlider, newValue, 2);
                                            }
                                        }
                                        MU.StyledTextLabel {
                                            text: "\uE52F"
                                            font.family: scoreDynamicsFontFamily()
                                            font.pixelSize: dynamicsGlyphPixelSize
                                            horizontalAlignment: Text.AlignRight
                                            verticalAlignment: Text.AlignVCenter
                                            Layout.preferredWidth: dynamicsGlyphBoxWidth
                                            Layout.maximumWidth: dynamicsGlyphBoxWidth
                                            Layout.preferredHeight: dynamicsGlyphBoxHeight
                                            Layout.maximumHeight: dynamicsGlyphBoxHeight
                                            clip: true
                                            Layout.alignment: Qt.AlignRight | Qt.AlignVCenter
                                            Accessible.name: "ff"
                                        }
                                        MU.StyledSlider {
                                            id: ffSlider
                                            Accessible.name: trText("group.baselines") + " · ff"
                                            from: 1; to: 127; stepSize: 1; value: 104
                                            Layout.fillWidth: true
                                            onPressedChanged: {
                                                if (pressed) {
                                                    beginBaselineSliderGesture();
                                                } else {
                                                    finishBaselineSliderGesture();
                                                }
                                            }
                                            onMoved: handleBaselineSliderMoved(
                                                         ffSlider, 6)
                                        }
                                        MU.IncrementalPropertyControl {
                                            id: ffEditor
                                            Layout.preferredWidth: 64
                                            Layout.maximumWidth: 64
                                            currentValue: ffSlider.value
                                            minValue: 1
                                            maxValue: 999
                                            step: 1
                                            decimals: 0
                                            navigation.accessible.name: trText("group.baselines") + " · ff"
                                            onValueEdited: function(newValue) {
                                                updateDynamicBaselineFromEditor(ffSlider, newValue, 6);
                                            }
                                            onValueEditingFinished: function(newValue) {
                                                updateDynamicBaselineFromEditor(ffSlider, newValue, 6);
                                            }
                                        }

                                        MU.StyledTextLabel {
                                            text: "\uE52C"
                                            font.family: scoreDynamicsFontFamily()
                                            font.pixelSize: dynamicsGlyphPixelSize
                                            horizontalAlignment: Text.AlignRight
                                            verticalAlignment: Text.AlignVCenter
                                            Layout.preferredWidth: dynamicsGlyphBoxWidth
                                            Layout.maximumWidth: dynamicsGlyphBoxWidth
                                            Layout.preferredHeight: dynamicsGlyphBoxHeight
                                            Layout.maximumHeight: dynamicsGlyphBoxHeight
                                            clip: true
                                            Layout.alignment: Qt.AlignRight | Qt.AlignVCenter
                                            Accessible.name: "mp"
                                        }
                                        MU.StyledSlider {
                                            id: mpSlider
                                            Accessible.name: trText("group.baselines") + " · mp"
                                            from: 1; to: 127; stepSize: 1; value: 56
                                            Layout.fillWidth: true
                                            onPressedChanged: {
                                                if (pressed) {
                                                    beginBaselineSliderGesture();
                                                } else {
                                                    finishBaselineSliderGesture();
                                                }
                                            }
                                            onMoved: handleBaselineSliderMoved(
                                                         mpSlider, 3)
                                        }
                                        MU.IncrementalPropertyControl {
                                            id: mpEditor
                                            Layout.preferredWidth: 64
                                            Layout.maximumWidth: 64
                                            currentValue: mpSlider.value
                                            minValue: 1
                                            maxValue: 999
                                            step: 1
                                            decimals: 0
                                            navigation.accessible.name: trText("group.baselines") + " · mp"
                                            onValueEdited: function(newValue) {
                                                updateDynamicBaselineFromEditor(mpSlider, newValue, 3);
                                            }
                                            onValueEditingFinished: function(newValue) {
                                                updateDynamicBaselineFromEditor(mpSlider, newValue, 3);
                                            }
                                        }
                                        MU.StyledTextLabel {
                                            text: "\uE530"
                                            font.family: scoreDynamicsFontFamily()
                                            font.pixelSize: dynamicsGlyphPixelSize
                                            horizontalAlignment: Text.AlignRight
                                            verticalAlignment: Text.AlignVCenter
                                            Layout.preferredWidth: dynamicsGlyphBoxWidth
                                            Layout.maximumWidth: dynamicsGlyphBoxWidth
                                            Layout.preferredHeight: dynamicsGlyphBoxHeight
                                            Layout.maximumHeight: dynamicsGlyphBoxHeight
                                            clip: true
                                            Layout.alignment: Qt.AlignRight | Qt.AlignVCenter
                                            Accessible.name: "fff"
                                        }
                                        MU.StyledSlider {
                                            id: fffSlider
                                            Accessible.name: trText("group.baselines") + " · fff"
                                            from: 1; to: 127; stepSize: 1; value: 120
                                            Layout.fillWidth: true
                                            onPressedChanged: {
                                                if (pressed) {
                                                    beginBaselineSliderGesture();
                                                } else {
                                                    finishBaselineSliderGesture();
                                                }
                                            }
                                            onMoved: handleBaselineSliderMoved(
                                                         fffSlider, 7)
                                        }
                                        MU.IncrementalPropertyControl {
                                            id: fffEditor
                                            Layout.preferredWidth: 64
                                            Layout.maximumWidth: 64
                                            currentValue: fffSlider.value
                                            minValue: 1
                                            maxValue: 999
                                            step: 1
                                            decimals: 0
                                            navigation.accessible.name: trText("group.baselines") + " · fff"
                                            onValueEdited: function(newValue) {
                                                updateDynamicBaselineFromEditor(fffSlider, newValue, 7);
                                            }
                                            onValueEditingFinished: function(newValue) {
                                                updateDynamicBaselineFromEditor(fffSlider, newValue, 7);
                                            }
                                        }

                                        RowLayout {
                                            Layout.columnSpan: 6
                                            Layout.fillWidth: true
                                            spacing: 8

                                            MU.CheckBox {
                                                id: museScoreDefaultsCheck
                                                text: trText("option.museScoreDefaults")
                                                checked: museScoreDefaultsActive
                                                Layout.minimumWidth: museScoreDefaultsCheckboxWidth
                                                Layout.preferredWidth: museScoreDefaultsCheckboxWidth
                                                Layout.maximumWidth: museScoreDefaultsCheckboxWidth
                                                onClicked: toggleMuseScoreDefaultBaselines()
                                            }

                                            Item {
                                                Layout.fillWidth: true
                                            }

                                            Item {
                                                Layout.preferredHeight: 22
                                                Layout.preferredWidth: 1

                                                MU.SeparatorLine {
                                                    anchors.fill: parent
                                                    orientation: Qt.Vertical
                                                    opacity: 0.58
                                                }
                                            }

                                            MU.FlatButton {
                                                id: baselineUndoButton
                                                Layout.preferredHeight: 30
                                                Layout.preferredWidth: height
                                                icon: IconCode.UNDO
                                                toolTipTitle: trText("button.controlsUndo")
                                                Accessible.name: trText("button.controlsUndo")
                                                transparent: true
                                                enabled: baselineUndoHistory.length > 0
                                                onClicked: undoBaselineControls()
                                            }

                                            MU.FlatButton {
                                                id: baselineRedoButton
                                                Layout.preferredHeight: 30
                                                Layout.preferredWidth: height
                                                icon: IconCode.REDO
                                                toolTipTitle: trText("button.controlsRedo")
                                                Accessible.name: trText("button.controlsRedo")
                                                transparent: true
                                                enabled: baselineRedoHistory.length > 0
                                                onClicked: redoBaselineControls()
                                            }

                                            Item {
                                                Layout.preferredHeight: 22
                                                Layout.preferredWidth: 1

                                                MU.SeparatorLine {
                                                    anchors.fill: parent
                                                    orientation: Qt.Vertical
                                                    opacity: 0.58
                                                }
                                            }

                                            MU.FlatButton {
                                                id: restoreBaselinesButton
                                                text: trText("button.controlsReset")
                                                transparent: true
                                                toolTipTitle: trText(
                                                                      "dialog.restoreBaselinesWarning")
                                                Accessible.name: trText(
                                                                     "button.controlsReset")
                                                onClicked: requestConfirmation(
                                                                   "restoreBaselines")
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    }

                    Item {
                        id: analysisPage

                        ColumnLayout {
                            anchors.fill: parent
                            spacing: 12

                            MU.StyledGroupBox {
                                title: trText("group.advanced")
                                Layout.fillWidth: true

                                GridLayout {
                                    width: parent.width
                                    columns: 2
                                    columnSpacing: 24
                                    rowSpacing: 10

                                    MU.CheckBox {
                                        id: phraseCheck
                                        text: trText("option.phrases")
                                        checked: true
                                        onClicked: {
                                            checked = !checked;
                                        }
                                    }
                                    MU.CheckBox {
                                        id: meterCheck
                                        text: trText("option.meter")
                                        checked: true
                                        onClicked: {
                                            checked = !checked;
                                        }
                                    }
                                    MU.CheckBox {
                                        id: textureCheck
                                        text: trText("option.texture")
                                        checked: true
                                        onClicked: {
                                            checked = !checked;
                                        }
                                    }
                                    MU.CheckBox {
                                        id: headroomCheck
                                        text: trText("option.headroom")
                                        checked: true
                                        onClicked: {
                                            checked = !checked;
                                        }
                                    }
                                }
                            }

                            MU.StyledGroupBox {
                                title: statusIsError
                                       ? trText("title.error")
                                       : trText("title.result")
                                Layout.fillWidth: true
                                Layout.fillHeight: true

                                MU.StyledFlickable {
                                    id: resultFlickable
                                    width: parent.width
                                    height: parent.height
                                    contentWidth: width
                                    contentHeight: resultText.implicitHeight

                                    MU.StyledTextLabel {
                                        id: resultText
                                        width: resultFlickable.width
                                        text: statusMessage
                                        horizontalAlignment: Text.AlignLeft
                                        verticalAlignment: Text.AlignTop
                                        wrapMode: Text.WordWrap
                                        font: statusIsError
                                              ? ui.theme.bodyBoldFont
                                              : ui.theme.bodyFont
                                    }
                                }
                            }
                        }
                    }
                }
            }

            MU.SeparatorLine {
                Layout.fillWidth: true
            }

            Item {
                Layout.fillWidth: true
                Layout.preferredHeight: 82

                ColumnLayout {
                    anchors.fill: parent
                    anchors.leftMargin: 16
                    anchors.rightMargin: 16
                    anchors.topMargin: 6
                    anchors.bottomMargin: 6
                    spacing: 2

                    MU.StyledTextLabel {
                        text: "v1.0 · © 2026 花火 ch. / Pandas213"
                        font: ui.theme.bodyFont
                        opacity: 0.58
                        horizontalAlignment: Text.AlignLeft
                        Layout.fillWidth: true
                    }

                    RowLayout {
                        Layout.fillWidth: true
                        spacing: 12

                        MU.FlatButton {
                            id: revertSomyakuButton
                            text: trText("button.revertSomyaku")
                            toolTipTitle: trText("help.revertSomyaku")
                            Accessible.name: trText("help.revertSomyaku")
                            transparent: false
                            enabled: !busy && hasBackupChanges
                            onClicked: requestConfirmation("revertScore")
                        }

                        MU.FlatButton {
                            id: quitSibeliusButton
                            text: trText("button.quitSibelius")
                            toolTipTitle: trText("help.quitSibelius")
                            Accessible.name: trText("help.quitSibelius")
                            transparent: false
                            enabled: !busy
                            onClicked: requestQuit()
                        }

                        Item {
                            Layout.fillWidth: true
                        }

                        MU.FlatButton {
                            text: trText("button.applySelection")
                            enabled: !busy
                            onClicked: requestApply("selection")
                        }

                        MU.FlatButton {
                            text: busy
                                  ? trText("state.analyzing")
                                  : trText("button.applyScore")
                            accentButton: true
                            enabled: !busy
                            onClicked: requestApply("whole")
                        }
                    }
                }
            }
            }

        Dialog {
            id: confirmationDialog
            parent: Overlay.overlay
            modal: true
            focus: true
            dim: true
            closePolicy: Popup.CloseOnEscape
            padding: 20
            width: Math.min(620, parent ? parent.width - 32 : 620)
            height: implicitHeight
            x: parent ? Math.round((parent.width - width) / 2) : 0
            y: parent ? Math.round((parent.height - height) / 2) : 0
            implicitHeight: confirmationContent.implicitHeight
                            + topPadding + bottomPadding

            onClosed: {
                if (confirmationAction.length > 0) {
                    if (confirmationAction === "discardPresetSwitch") {
                        restorePresetSelectorIndexes();
                        clearPendingPresetSwitch();
                    }
                    confirmationAction = "";
                }
            }

            background: Rectangle {
                color: ui.theme.backgroundPrimaryColor
                border.width: ui.theme.borderWidth
                border.color: ui.theme.strokeColor
                radius: 4
            }

            contentItem: ColumnLayout {
                id: confirmationContent
                spacing: 16

                MU.StyledTextLabel {
                    text: trText(confirmationTitleKey())
                    font: ui.theme.largeBodyBoldFont
                    horizontalAlignment: Text.AlignLeft
                    wrapMode: Text.WordWrap
                    Layout.fillWidth: true
                }

                MU.StyledTextLabel {
                    text: trText(confirmationMessageKey())
                    horizontalAlignment: Text.AlignLeft
                    wrapMode: Text.WordWrap
                    Layout.fillWidth: true
                }

                RowLayout {
                    Layout.fillWidth: true
                    spacing: 8

                    Item {
                        Layout.fillWidth: true
                    }

                    MU.FlatButton {
                        text: trText("button.cancel")
                        onClicked: cancelConfirmation()
                    }

                    MU.FlatButton {
                        text: trText(confirmationConfirmKey())
                        accentButton: !saveAndContinueButton.visible
                        onClicked: confirmRequestedAction()
                    }

                    MU.FlatButton {
                        id: saveAndContinueButton
                        visible: confirmationAction === "discardPresetSwitch"
                                 || (confirmationAction === "quit"
                                     && hasUnsavedCustomPreset())
                        text: confirmationAction === "quit"
                              ? trText("button.saveAndQuit")
                              : trText("button.saveAndSwitch")
                        accentButton: true
                        onClicked: saveAndContinueConfirmation()
                    }
                }
            }
        }
    }
}
