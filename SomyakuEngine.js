.pragma library

var ENGINE_VERSION = "1.0.0";

var PROFILE_ORDER = [
    "natural", "subtle", "ballad", "expressive",
    "jazz", "baroque", "cinematic", "virtuosic"
];

var PROFILES = {
    subtle: {
        phrase: 1.45,
        section: 0.82,
        structure: 1.05,
        climax: 1.15,
        ending: 1.10,
        meter: 0.86,
        texture: 0.64,
        chordContext: 0.72,
        contour: 0.72,
        voicing: 0.8,
        human: 0.58,
        tempo: 0.65,
        expression: 0.72,
        articulation: 0.72,
        pattern: 0.58,
        slur: 0.70,
        crossStaff: 0.78,
        gain: 1.75,
        maxUp: 8,
        maxDown: 10
    },
    ballad: {
        phrase: 3.35,
        section: 1.35,
        structure: 1.65,
        climax: 1.55,
        ending: 2.55,
        meter: 0.72,
        texture: 0.78,
        chordContext: 0.92,
        contour: 1.28,
        voicing: 1.42,
        human: 0.82,
        tempo: 0.72,
        expression: 1.18,
        articulation: 0.82,
        pattern: 0.72,
        slur: 1.24,
        crossStaff: 1.08,
        gain: 2.42,
        maxUp: 10,
        maxDown: 15
    },
    natural: {
        phrase: 2.35,
        section: 1.55,
        structure: 1.75,
        climax: 2.05,
        ending: 1.75,
        meter: 1.35,
        texture: 1.05,
        chordContext: 1.0,
        contour: 1.15,
        voicing: 1.10,
        human: 0.82,
        tempo: 1.0,
        expression: 1.0,
        articulation: 1.0,
        pattern: 1.0,
        slur: 1.0,
        crossStaff: 1.0,
        gain: 2.35,
        maxUp: 12,
        maxDown: 14
    },
    expressive: {
        phrase: 4.65,
        section: 3.15,
        structure: 3.55,
        climax: 4.35,
        ending: 3.50,
        meter: 2.2,
        texture: 1.55,
        chordContext: 1.38,
        contour: 2.05,
        voicing: 1.72,
        human: 1.05,
        tempo: 1.15,
        expression: 1.34,
        articulation: 1.28,
        pattern: 1.12,
        slur: 1.12,
        crossStaff: 1.24,
        gain: 2.62,
        maxUp: 22,
        maxDown: 23
    },
    jazz: {
        phrase: 2.20,
        section: 1.80,
        structure: 2.05,
        climax: 2.75,
        ending: 1.65,
        meter: 3.20,
        texture: 1.05,
        chordContext: 1.42,
        contour: 1.35,
        voicing: 1.82,
        human: 1.28,
        tempo: 1.08,
        expression: 1.10,
        articulation: 1.58,
        pattern: 1.62,
        slur: 0.82,
        crossStaff: 1.12,
        gain: 2.72,
        maxUp: 20,
        maxDown: 20
    },
    baroque: {
        phrase: 1.28,
        section: 1.38,
        structure: 1.78,
        climax: 1.62,
        ending: 1.30,
        meter: 2.28,
        texture: 1.42,
        chordContext: 1.18,
        contour: 1.08,
        voicing: 1.58,
        human: 0.38,
        tempo: 0.92,
        expression: 0.88,
        articulation: 1.88,
        pattern: 1.48,
        slur: 0.64,
        crossStaff: 1.04,
        gain: 2.42,
        maxUp: 13,
        maxDown: 15
    },
    cinematic: {
        phrase: 5.45,
        section: 4.55,
        structure: 5.15,
        climax: 6.20,
        ending: 4.65,
        meter: 1.85,
        texture: 2.15,
        chordContext: 1.72,
        contour: 1.72,
        voicing: 1.62,
        human: 0.72,
        tempo: 1.28,
        expression: 1.52,
        articulation: 1.38,
        pattern: 1.55,
        slur: 1.0,
        crossStaff: 1.12,
        gain: 2.65,
        maxUp: 28,
        maxDown: 29
    },
    virtuosic: {
        phrase: 4.15,
        section: 3.75,
        structure: 4.45,
        climax: 5.25,
        ending: 3.75,
        meter: 2.68,
        texture: 1.52,
        chordContext: 1.38,
        contour: 2.52,
        voicing: 1.82,
        human: 0.92,
        tempo: 1.42,
        expression: 1.38,
        articulation: 1.68,
        pattern: 1.48,
        slur: 1.02,
        crossStaff: 1.28,
        gain: 2.82,
        maxUp: 27,
        maxDown: 30
    }
};

var PRESET_CONTROLS = {
    natural: {
        strength: 72,
        sectionSensitivity: 60,
        melodyEmphasis: 58,
        crossStaffStrength: 100,
        humanVariation: 38,
        phraseMeasures: 0,
        baselines: {
            ppp: 19, pp: 32, p: 47, mp: 56,
            mf: 71, f: 88, ff: 104, fff: 120
        }
    },
    subtle: {
        strength: 48,
        sectionSensitivity: 42,
        melodyEmphasis: 44,
        crossStaffStrength: 70,
        humanVariation: 22,
        phraseMeasures: 0,
        baselines: {
            ppp: 21, pp: 34, p: 47, mp: 57,
            mf: 72, f: 87, ff: 102, fff: 116
        }
    },
    ballad: {
        strength: 60,
        sectionSensitivity: 48,
        melodyEmphasis: 72,
        crossStaffStrength: 96,
        humanVariation: 44,
        phraseMeasures: 0,
        baselines: {
            ppp: 10, pp: 22, p: 35, mp: 47,
            mf: 62, f: 78, ff: 94, fff: 108
        }
    },
    expressive: {
        strength: 86,
        sectionSensitivity: 70,
        melodyEmphasis: 78,
        crossStaffStrength: 115,
        humanVariation: 56,
        phraseMeasures: 0,
        baselines: {
            ppp: 15, pp: 29, p: 44, mp: 56,
            mf: 75, f: 95, ff: 113, fff: 125
        }
    },
    jazz: {
        strength: 80,
        sectionSensitivity: 58,
        melodyEmphasis: 68,
        crossStaffStrength: 105,
        humanVariation: 64,
        phraseMeasures: 0,
        baselines: {
            ppp: 18, pp: 31, p: 45, mp: 57,
            mf: 75, f: 94, ff: 110, fff: 123
        }
    },
    baroque: {
        strength: 68,
        sectionSensitivity: 50,
        melodyEmphasis: 72,
        crossStaffStrength: 96,
        humanVariation: 22,
        phraseMeasures: 0,
        baselines: {
            ppp: 17, pp: 30, p: 44, mp: 56,
            mf: 72, f: 89, ff: 104, fff: 117
        }
    },
    cinematic: {
        strength: 94,
        sectionSensitivity: 82,
        melodyEmphasis: 66,
        crossStaffStrength: 105,
        humanVariation: 42,
        phraseMeasures: 0,
        baselines: {
            ppp: 12, pp: 26, p: 42, mp: 56,
            mf: 76, f: 98, ff: 116, fff: 126
        }
    },
    virtuosic: {
        strength: 96,
        sectionSensitivity: 76,
        melodyEmphasis: 76,
        crossStaffStrength: 115,
        humanVariation: 48,
        phraseMeasures: 0,
        baselines: {
            ppp: 16, pp: 30, p: 45, mp: 58,
            mf: 78, f: 99, ff: 116, fff: 127
        }
    }
};

function clamp(value, low, high) {
    return Math.max(low, Math.min(high, value));
}

function numberOr(value, fallback) {
    var number = Number(value);
    return isFinite(number) ? number : fallback;
}

function boolOr(value, fallback) {
    return typeof value === "boolean" ? value : fallback;
}

function own(object, key) {
    return Object.prototype.hasOwnProperty.call(object, key);
}

function copyObject(source) {
    var result = {};
    var key;
    source = source || {};
    for (key in source) {
        if (own(source, key)) {
            if (source[key] && typeof source[key] === "object"
                    && !(source[key] instanceof Array)) {
                result[key] = copyObject(source[key]);
            } else {
                result[key] = source[key];
            }
        }
    }
    return result;
}

function presetControls(name) {
    name = String(name || "natural").toLowerCase();
    return copyObject(own(PRESET_CONTROLS, name)
                      ? PRESET_CONTROLS[name]
                      : PRESET_CONTROLS.natural);
}

function museScoreDefaultBaselines() {
    return {
        ppp: defaultVelocityForCode("ppp"),
        pp: defaultVelocityForCode("pp"),
        p: defaultVelocityForCode("p"),
        mp: defaultVelocityForCode("mp"),
        mf: defaultVelocityForCode("mf"),
        f: defaultVelocityForCode("f"),
        ff: defaultVelocityForCode("ff"),
        fff: defaultVelocityForCode("fff")
    };
}

function normalizedBaselines(source, fallback) {
    source = source || {};
    fallback = fallback || PRESET_CONTROLS.natural.baselines;
    var order = ["ppp", "pp", "p", "mp", "mf", "f", "ff", "fff"];
    var result = {};
    var previous = 1;
    var i;
    for (i = 0; i < order.length; ++i) {
        var key = order[i];
        var value = clamp(Math.round(numberOr(source[key], fallback[key])),
                          1, 127);
        value = Math.max(previous, value);
        result[key] = value;
        previous = value;
    }
    return result;
}

function noteVelocityBase(originalIsUserVelocity, originalValue,
                          dynamicVelocity, preserveExistingVelocity) {
    var dynamicBase = clamp(Math.round(numberOr(dynamicVelocity, 80)),
                            1, 127);
    if (!preserveExistingVelocity) {
        return dynamicBase;
    }

    var value = Math.round(numberOr(originalValue, 0));
    if (originalIsUserVelocity) {
        return value >= 1 && value <= 127
                ? value
                : dynamicBase;
    }

    // 既定の OFFSET_VAL=64 は +64% ではない
    if (value === 0 || value === 64) {
        return dynamicBase;
    }
    if (value >= -100 && value <= 100) {
        return clamp(dynamicBase + Math.round(dynamicBase * value / 100),
                     1, 127);
    }
    return dynamicBase;
}

function noteVelocityTarget(originalIsUserVelocity, originalValue,
                            dynamicVelocity, delta,
                            preserveExistingVelocity) {
    return clamp(
                noteVelocityBase(
                    originalIsUserVelocity,
                    originalValue,
                    dynamicVelocity,
                    preserveExistingVelocity)
                    + Math.round(numberOr(delta, 0)),
                1,
                127);
}

function copyProfile(name) {
    var source = own(PROFILES, name) ? PROFILES[name] : PROFILES.natural;
    var result = {};
    var key;
    for (key in source) {
        if (own(source, key)) {
            result[key] = source[key];
        }
    }
    return result;
}

function normalizedOptions(options) {
    options = options || {};
    var profileName = String(options.profile || "natural").toLowerCase();
    if (!own(PROFILES, profileName)) {
        profileName = "natural";
    }

    var defaults = presetControls(profileName);
    return {
        profileName: profileName,
        profile: copyProfile(profileName),
        strength: clamp(numberOr(options.strength, defaults.strength), 0, 100),
        sectionSensitivity: clamp(numberOr(
                    options.sectionSensitivity,
                    defaults.sectionSensitivity), 0, 100),
        melodyEmphasis: clamp(numberOr(
                    options.melodyEmphasis,
                    defaults.melodyEmphasis), 0, 100),
        crossStaffStrength: clamp(numberOr(
                    options.crossStaffStrength,
                    defaults.crossStaffStrength),
                                  0, 150),
        humanVariation: clamp(numberOr(
                    options.humanVariation,
                    defaults.humanVariation), 0, 100),
        phraseMeasures: 0,
        baselines: normalizedBaselines(
                    options.baselines,
                    defaults.baselines),
        shapePhrases: boolOr(options.shapePhrases, true),
        meterAccents: boolOr(options.meterAccents, true),
        adaptTexture: boolOr(options.adaptTexture, true),
        dynamicHeadroom: boolOr(options.dynamicHeadroom, true),
        naturalAutoDetect: boolOr(options.naturalAutoDetect, true),
        preserveExistingVelocity: boolOr(
                    options.preserveExistingVelocity, false)
    };
}

function replaceAll(source, find, replacement) {
    return source.split(find).join(replacement);
}

function normalizeDynamicCode(value) {
    var source = String(value || "").toLowerCase();

    source = source.replace(/<[^>]*>/g, "");
    source = source.replace(/&[^;]+;/g, "");
    source = replaceAll(source, "dynamic", "");
    source = replaceAll(source, "rinforzando", "rfz");
    source = replaceAll(source, "rinforzato", "rfz");
    source = replaceAll(source, "sforzando", "sfz");
    source = replaceAll(source, "sforzato", "sfz");
    source = replaceAll(source, "forzando", "fz");
    source = replaceAll(source, "forzato", "fz");
    source = replaceAll(source, "fortissimo", "ff");
    source = replaceAll(source, "pianissimo", "pp");
    source = replaceAll(source, "mezzo", "m");
    source = replaceAll(source, "forte", "f");
    source = replaceAll(source, "piano", "p");
    source = replaceAll(source, "niente", "n");
    source = source.replace(/[^a-z]/g, "");

    var known = [
        "ffffff", "pppppp", "fffff", "ppppp", "sfffz", "sffz",
        "sfpp", "ffff", "pppp", "sfff", "sfp", "sfz", "rfz",
        "fff", "ppp", "sff", "fp", "pf", "sf", "rf", "fz",
        "ff", "pp", "mf", "mp", "f", "p", "n", "m", "r", "s", "z"
    ];

    var i;
    for (i = 0; i < known.length; ++i) {
        if (source === known[i]) {
            return known[i];
        }
    }

    return "custom";
}

function dynamicCodeFromSubtype(value) {
    // 文字列が取れない強弱記号用の Dynamic::Type 対応表
    var codes = [
        "custom", "pppppp", "ppppp", "pppp", "ppp", "pp", "p",
        "mp", "mf", "f", "ff", "fff", "ffff", "fffff", "ffffff",
        "fp", "pf", "sf", "sfz", "sff", "sffz", "sfff", "sfffz",
        "sfp", "sfpp", "rfz", "rf", "fz", "m", "r", "s", "z", "n"
    ];
    var subtype = Number(value);
    if (!isFinite(subtype) || Math.round(subtype) !== subtype
            || subtype < 0 || subtype >= codes.length) {
        return "custom";
    }
    return codes[subtype];
}

function repeatedLetterCount(code, letter) {
    var count = 0;
    var i;
    for (i = 0; i < code.length; ++i) {
        if (code.charAt(i) === letter) {
            ++count;
        }
    }
    return count;
}

function normalizedVelocity(value) {
    var velocity = Number(value);
    if (!isFinite(velocity) || velocity < 1 || velocity > 127) {
        return null;
    }
    return clamp(Math.round(velocity), 1, 127);
}

function defaultVelocityForCode(code) {
    var velocities = {
        pppppp: 1,
        ppppp: 5,
        pppp: 10,
        ppp: 16,
        pp: 33,
        p: 49,
        mp: 64,
        m: 96,
        mf: 80,
        f: 96,
        ff: 112,
        fff: 126,
        ffff: 127,
        fffff: 127,
        ffffff: 127,
        n: 49,
        fp: 96,
        pf: 49,
        sf: 112,
        sfz: 112,
        sff: 126,
        sffz: 126,
        sfff: 127,
        sfffz: 127,
        sfp: 112,
        sfpp: 112,
        rf: 112,
        rfz: 112,
        fz: 112,
        r: 112,
        s: 112,
        z: 80
    };
    return own(velocities, code) ? velocities[code] : 80;
}

function performanceDefaultVelocityForCode(code) {
    var velocities = {
        pppppp: 1,
        ppppp: 5,
        pppp: 10,
        ppp: 19,
        pp: 32,
        p: 46,
        mp: 56,
        m: 92,
        mf: 74,
        f: 92,
        ff: 108,
        fff: 122,
        ffff: 127,
        fffff: 127,
        ffffff: 127,
        n: 46,
        fp: 92,
        pf: 46,
        sf: 108,
        sfz: 108,
        sff: 122,
        sffz: 122,
        sfff: 127,
        sfffz: 127,
        sfp: 108,
        sfpp: 108,
        rf: 108,
        rfz: 108,
        fz: 108,
        r: 108,
        s: 108,
        z: 74
    };
    return own(velocities, code) ? velocities[code] : 80;
}

function baselineVelocityForCode(code, baselines) {
    var normalizedCode = normalizeDynamicCode(code);
    var values = normalizedBaselines(
                baselines,
                PRESET_CONTROLS.natural.baselines);
    if (own(values, normalizedCode)) {
        return values[normalizedCode];
    }

    var softStep = Math.max(5, values.pp - values.ppp);
    var loudStep = Math.max(5, values.fff - values.ff);
    var mapped = {
        pppppp: values.ppp - softStep * 3,
        ppppp: values.ppp - softStep * 2,
        pppp: values.ppp - softStep,
        n: values.p,
        m: Math.round((values.mf + values.f) / 2),
        ffff: values.fff + loudStep,
        fffff: values.fff + loudStep * 2,
        ffffff: values.fff + loudStep * 3,
        fp: values.f,
        pf: values.p,
        sf: values.ff,
        sfz: values.ff,
        sff: values.fff,
        sffz: values.fff,
        sfff: values.fff + Math.round(loudStep * 0.7),
        sfffz: values.fff + Math.round(loudStep * 0.7),
        sfp: values.ff,
        sfpp: values.ff,
        rf: values.ff,
        rfz: values.ff,
        fz: values.ff,
        r: values.ff,
        s: values.ff,
        z: values.mf
    };
    return clamp(Math.round(own(mapped, normalizedCode)
                            ? mapped[normalizedCode]
                            : values.mf), 1, 127);
}

function performanceVelocityForCode(code, explicitVelocity, baselines) {
    var normalizedCode = normalizeDynamicCode(code);
    var suppliedVelocity = normalizedVelocity(explicitVelocity);
    if (normalizedCode === "custom") {
        return suppliedVelocity !== null ? suppliedVelocity : 80;
    }

    return baselineVelocityForCode(normalizedCode, baselines);
}

function levelForVelocity(velocity) {
    var anchors = [
        [1, 0], [5, 0.3], [10, 1], [16, 2], [33, 3], [49, 4],
        [64, 5], [72, 6], [80, 7], [96, 8], [112, 9],
        [126, 10], [127, 13]
    ];
    var i;
    for (i = 1; i < anchors.length; ++i) {
        if (velocity <= anchors[i][0]) {
            var previous = anchors[i - 1];
            var next = anchors[i];
            var progress = (velocity - previous[0]) / (next[0] - previous[0]);
            return previous[1] + progress * (next[1] - previous[1]);
        }
    }
    return 13;
}

function dynamicLevel(value, explicitVelocity) {
    var code = normalizeDynamicCode(value);
    var velocity = normalizedVelocity(explicitVelocity);
    if (code === "custom" && velocity !== null) {
        return levelForVelocity(velocity);
    }
    if (code === "n") {
        return 0;
    }
    if (code === "mp") {
        return 5;
    }
    if (code === "m") {
        return 6;
    }
    if (code === "mf") {
        return 7;
    }
    if (code === "fp") {
        return 7;
    }
    if (code.indexOf("sf") === 0 || code.indexOf("rf") === 0
            || code === "fz" || code === "r" || code === "s" || code === "z") {
        return 9;
    }
    if (code.indexOf("p") >= 0 && code.indexOf("f") < 0) {
        return clamp(5 - repeatedLetterCount(code, "p"), 0, 4);
    }
    if (code.indexOf("f") >= 0) {
        return clamp(7 + repeatedLetterCount(code, "f"), 8, 13);
    }
    return 7;
}

function dynamicShapeForLevel(level) {
    var result = {
        scale: 1.0,
        maxUp: 15,
        maxDown: 16
    };

    if (level <= 1) {
        result.scale = 0.70;
        result.maxUp = 18;
        result.maxDown = 10;
    } else if (level <= 3) {
        result.scale = 0.85;
        result.maxUp = 17;
        result.maxDown = 13;
    } else if (level <= 5) {
        result.scale = 1.0;
        result.maxUp = 16;
        result.maxDown = 14;
    } else if (level <= 7) {
        result.scale = 1.05;
        result.maxUp = 15;
        result.maxDown = 16;
    } else if (level <= 8) {
        result.scale = 1.0;
        result.maxUp = 14;
        result.maxDown = 17;
    } else if (level <= 9) {
        result.scale = 0.90;
        result.maxUp = 10;
        result.maxDown = 20;
    } else if (level <= 10) {
        result.scale = 0.80;
        result.maxUp = 6;
        result.maxDown = 22;
    } else {
        result.scale = 0.70;
        result.maxUp = 2;
        result.maxDown = 24;
    }
    return result;
}

function buildDynamicInfo(code, velocity, usesExplicitVelocity,
                          forceVelocityLevel) {
    var level = forceVelocityLevel
            ? levelForVelocity(velocity)
            : dynamicLevel(code, velocity);
    var shape = dynamicShapeForLevel(level);
    var result = {
        code: code,
        level: level,
        velocity: velocity,
        usesExplicitVelocity: !!usesExplicitVelocity,
        scale: shape.scale,
        maxUp: shape.maxUp,
        maxDown: shape.maxDown,
        hardMaxUp: 127 - velocity,
        hardMaxDown: velocity - 1
    };

    if (code.indexOf("sf") === 0 || code.indexOf("rf") === 0
            || code === "fz" || code === "r" || code === "s" || code === "z") {
        result.scale = Math.min(result.scale, 0.85);
        result.maxUp = Math.min(result.maxUp, 7);
        result.maxDown = Math.min(result.maxDown, 18);
    } else if (code === "fp" || code === "pf") {
        result.scale = Math.min(result.scale, 0.9);
        result.maxUp = Math.min(result.maxUp, 12);
        result.maxDown = Math.min(result.maxDown, 16);
    }

    result.maxUp = Math.max(0, Math.min(result.maxUp, result.hardMaxUp));
    result.maxDown = Math.max(0, Math.min(result.maxDown, result.hardMaxDown));
    return result;
}

function dynamicInfo(value, explicitVelocity, baselines) {
    var code = normalizeDynamicCode(value);
    var suppliedVelocity = normalizedVelocity(explicitVelocity);
    return buildDynamicInfo(
                code,
                performanceVelocityForCode(code, suppliedVelocity, baselines),
                code === "custom" && suppliedVelocity !== null);
}

function dynamicInfoAtVelocity(value, exactVelocity) {
    var code = normalizeDynamicCode(value);
    var velocity = normalizedVelocity(exactVelocity);
    return buildDynamicInfo(code, velocity !== null ? velocity : 80,
                            true, true);
}

function copyDynamicDescriptor(event) {
    return {
        code: normalizeDynamicCode(event && event.code),
        velocity: normalizedVelocity(event && event.velocity),
        sourceIndex: event && typeof event.sourceIndex !== "undefined"
                ? Number(event.sourceIndex)
                : -1,
        tick: event && typeof event.tick !== "undefined"
                ? numberOr(event.tick, 0)
                : -1,
        scopeKind: event && event.scopeKind
                ? String(event.scopeKind)
                : "system",
        partGroupKey: event && event.partGroupKey
                ? String(event.partGroupKey)
                : ""
    };
}

function assignDynamics(events, dynamicEvents) {
    events = events || [];
    var orderedDynamics = (dynamicEvents || []).slice(0);
    orderedDynamics.sort(function(first, second) {
        if (numberOr(first.tick, 0) !== numberOr(second.tick, 0)) {
            return numberOr(first.tick, 0) - numberOr(second.tick, 0);
        }
        if (numberOr(first.staff, -1) !== numberOr(second.staff, -1)) {
            return numberOr(first.staff, -1) - numberOr(second.staff, -1);
        }
        return numberOr(first.order, 0) - numberOr(second.order, 0);
    });

    // パート全体の記号は遷移を共有。譜表だけの記号は分ける
    var partGroupByStaff = {};
    var staffScopedByStaff = {};
    var mixedPartGroups = {};
    var mappingIndex;
    for (mappingIndex = 0; mappingIndex < orderedDynamics.length; ++mappingIndex) {
        var mappedDynamic = orderedDynamics[mappingIndex];
        var mappedStaff = Math.round(numberOr(mappedDynamic.staff, -1));
        if (mappedStaff < 0) {
            continue;
        }
        var mappedStaffKey = String(mappedStaff);
        var mappedScope = String(mappedDynamic.scopeKind || "");
        var mappedPartGroup = String(mappedDynamic.partGroupKey || "");
        if (mappedScope === "part" && mappedPartGroup.length > 0) {
            partGroupByStaff[mappedStaffKey] = mappedPartGroup;
        } else if (mappedScope === "staff") {
            staffScopedByStaff[mappedStaffKey] = true;
        }
    }
    var scopedStaffKey;
    for (scopedStaffKey in staffScopedByStaff) {
        if (own(staffScopedByStaff, scopedStaffKey)
                && own(partGroupByStaff, scopedStaffKey)) {
            mixedPartGroups[partGroupByStaff[scopedStaffKey]] = true;
        }
    }

    var currentGlobal = {
        code: "",
        velocity: null,
        sourceIndex: -1,
        tick: -1,
        scopeKind: "none",
        partGroupKey: ""
    };
    var currentByStaff = {};
    var lastSourceByStaff = {};
    var lastLevelByStaff = {};
    var lastDescriptorByStaff = {};
    var dynamicIndex = 0;
    var transitionAttackCount = 0;
    var i;

    for (i = 0; i < events.length; ++i) {
        var event = events[i];
        while (dynamicIndex < orderedDynamics.length
                && numberOr(orderedDynamics[dynamicIndex].tick, 0)
                    <= numberOr(event.tick, 0)) {
            var dynamicEvent = orderedDynamics[dynamicIndex];
            var descriptor = copyDynamicDescriptor(dynamicEvent);
            if (numberOr(dynamicEvent.staff, -1) < 0) {
                currentGlobal = descriptor;
                currentByStaff = {};
            } else {
                currentByStaff[String(Math.round(numberOr(dynamicEvent.staff, 0)))]
                        = descriptor;
            }
            ++dynamicIndex;
        }

        var staffKey = String(Math.round(numberOr(event.staff, 0)));
        var current = own(currentByStaff, staffKey)
                ? currentByStaff[staffKey]
                : currentGlobal;
        event.dynamicCode = current.code;
        event.dynamicVelocity = current.velocity;
        event.hasWrittenDynamic = current.sourceIndex >= 0;
        event.writtenDynamicCode = event.hasWrittenDynamic
                ? current.code
                : "";
        event.writtenDynamicVelocity = event.hasWrittenDynamic
                ? dynamicInfo(current.code, current.velocity).velocity
                : null;
        event.dynamicSourceIndex = current.sourceIndex;
        event.dynamicSourceTick = current.tick;
        event.dynamicScopeKind = current.scopeKind;
        event.dynamicPartGroupKey = own(partGroupByStaff, staffKey)
                ? partGroupByStaff[staffKey]
                : "";
        event.dynamicTransitionGroupKey = "staff:" + staffKey;
        if (event.dynamicPartGroupKey.length > 0
                && !own(mixedPartGroups, event.dynamicPartGroupKey)) {
            event.dynamicTransitionGroupKey = event.dynamicPartGroupKey;
        }
        event.dynamicChanged = false;
        event.dynamicFirstWritten = false;
        event.dynamicChangeDelta = 0;
        event.dynamicChangeVelocity = 0;
        event.dynamicPreviousCode = current.code;
        event.dynamicPreviousVelocity = current.velocity;

        var sourceKey = String(current.sourceIndex);
        if (current.sourceIndex >= 0
                && (!own(lastSourceByStaff, staffKey)
                    || lastSourceByStaff[staffKey] !== sourceKey)) {
            var currentLevel = dynamicLevel(current.code, current.velocity);
            var previousDescriptor = own(lastDescriptorByStaff, staffKey)
                    ? lastDescriptorByStaff[staffKey]
                    : {
                        code: "",
                        velocity: null,
                        sourceIndex: -1,
                        tick: -1
                    };
            var previousLevel = own(lastLevelByStaff, staffKey)
                    ? lastLevelByStaff[staffKey]
                    : currentLevel;
            event.dynamicFirstWritten = previousDescriptor.sourceIndex < 0;
            event.dynamicChanged = !event.dynamicFirstWritten;
            event.dynamicChangeDelta = event.dynamicChanged
                    ? currentLevel - previousLevel
                    : 0;
            event.dynamicChangeVelocity = event.dynamicChanged
                    ? dynamicInfo(current.code, current.velocity).velocity
                      - dynamicInfo(previousDescriptor.code,
                                    previousDescriptor.velocity).velocity
                    : 0;
            event.dynamicPreviousCode = previousDescriptor.code;
            event.dynamicPreviousVelocity = previousDescriptor.velocity;
            lastSourceByStaff[staffKey] = sourceKey;
            lastLevelByStaff[staffKey] = currentLevel;
            if (event.dynamicChanged) {
                ++transitionAttackCount;
            }
        }
        lastDescriptorByStaff[staffKey] = {
            code: current.code,
            velocity: current.velocity,
            sourceIndex: current.sourceIndex,
            tick: current.tick,
            scopeKind: current.scopeKind,
            partGroupKey: current.partGroupKey
        };
    }

    return {
        dynamicEventCount: orderedDynamics.length,
        transitionAttackCount: transitionAttackCount
    };
}

function normalizePerformanceText(value) {
    var text = String(value || "").toLowerCase();
    text = text.replace(/<[^>]*>/g, " ");
    text = text.replace(/&[^;]+;/g, " ");
    text = text.replace(/[.,;:!?()\[\]{}\/\\_-]+/g, " ");
    text = text.replace(/\s+/g, " ");
    return text.replace(/^\s+|\s+$/g, "");
}

function containsAny(text, terms) {
    var i;
    for (i = 0; i < terms.length; ++i) {
        if (text.indexOf(terms[i]) >= 0) {
            return true;
        }
    }
    return false;
}

function containsWholeTerm(text, term) {
    return (" " + String(text || "") + " ")
            .indexOf(" " + String(term || "") + " ") >= 0;
}

function expressionInfo(value) {
    var text = normalizePerformanceText(value);
    var result = {
        text: text,
        recognized: false,
        energy: 0,
        attack: 0,
        phraseScale: 1,
        meterScale: 1,
        humanScale: 1,
        variationScale: 1,
        gradual: false,
        sudden: false,
        dynamicDirection: 0,
        tempoDirection: 0,
        hand: "",
        handCueOnly: false,
        reset: false,
        untilNextDynamic: false
    };

    function apply(terms, energy, attack, phraseScale,
                   meterScale, humanScale, variationScale) {
        if (!containsAny(text, terms)) {
            return;
        }
        result.recognized = true;
        result.energy += energy;
        result.attack += attack;
        result.phraseScale *= phraseScale;
        result.meterScale *= meterScale;
        result.humanScale *= humanScale;
        result.variationScale *= variationScale;
    }

    apply(["con fuoco", "with fire", "agitato", "agitated", "energico",
           "energetic", "impetuoso", "feroce", "vigoroso", "vigorously",
           "intenso", "intensely", "drammatico", "dramatic", "eroico",
           "heroic", "激しく"],
          1.25, 0.42, 1.08, 1.08, 1.08, 1.10);
    apply(["appassionato", "passionate", "passionately", "con passione"],
          0.92, 0.24, 1.24, 1.0, 1.05, 1.12);
    apply(["risoluto", "deciso", "determined", "bold", "brillante",
           "brilliant", "grandioso"],
          0.92, 0.36, 1.04, 1.12, 1.0, 1.08);
    apply(["maestoso", "majestic", "pesante", "weighty", "marziale",
           "nobile", "nobly", "largamente", "broadly"],
          0.72, 0.50, 0.96, 1.16, 0.92, 1.02);
    apply(["marcato", "marked"],
          0.56, 0.62, 0.96, 1.18, 0.95, 1.02);
    apply(["animato", "animated", "più mosso", "piu mosso", "con moto",
           "vivo", "vivace", "gioioso", "joyfully"],
          0.58, 0.18, 1.08, 1.05, 1.05, 1.06);
    apply(["scherzando", "giocoso", "playfully", "playful"],
          0.22, -0.08, 1.06, 0.78, 1.08, 1.02);

    apply(["dolce", "sweetly", "tender", "tenderly", "teneramente",
           "con sentimento", "sentimentale", "warmly", "warm", "soave",
           "優しく"],
          -0.52, -0.24, 1.18, 0.82, 0.92, 0.94);
    apply(["cantabile", "singing", "songfully", "歌うように"],
          -0.14, -0.10, 1.28, 0.86, 0.96, 1.06);
    apply(["espressivo", "expressive", "with expression"],
          0.06, 0.02, 1.30, 0.92, 1.04, 1.10);
    apply(["tranquillo", "calm", "calmly", "sereno", "peaceful",
           "quietly", "静かに"],
          -0.88, -0.28, 1.10, 0.76, 0.82, 0.88);
    apply(["misterioso", "mysterious", "mystically"],
          -0.82, -0.20, 1.18, 0.74, 0.90, 0.92);
    apply(["leggiero", "leggero", "lightly", "light", "delicato",
           "delicate"],
          -0.56, -0.34, 1.04, 0.82, 0.94, 0.92);
    apply(["grazioso", "graceful", "gracefully"],
          -0.32, -0.16, 1.16, 0.88, 0.94, 0.96);
    apply(["semplice", "simply", "innocente", "innocently", "naive"],
          -0.24, -0.18, 1.08, 0.84, 0.92, 0.92);
    apply(["sostenuto", "sustained", "sustain"],
          -0.20, -0.10, 1.16, 0.80, 0.90, 0.96);
    apply(["legato", "smoothly"],
          -0.22, -0.18, 1.14, 0.68, 0.92, 0.94);
    apply(["rubato", "freely", "自由に"],
          0, 0, 1.28, 0.56, 1.16, 1.10);
    apply(["morendo", "smorzando", "calando", "dying away", "fading"],
          -1.12, -0.34, 0.92, 0.72, 0.78, 0.86);
    apply(["ritardando", "rallentando", "ritenuto", "slowing down"],
          -0.16, -0.10, 1.14, 0.76, 0.92, 0.94);
    apply(["accelerando", "quickening", "getting faster"],
          0.18, 0.08, 1.08, 0.88, 1.04, 1.02);

    var slowerTempoText = containsAny(text, [
        "ritardando", "rallentando", "ritenuto", "slowing down",
        "getting slower", "broader", "allargando"
    ]) || containsWholeTerm(text, "rit")
            || containsWholeTerm(text, "rall")
            || containsWholeTerm(text, "riten");
    var fasterTempoText = containsAny(text, [
        "accelerando", "quickening", "getting faster", "stringendo"
    ]) || containsWholeTerm(text, "accel");
    if (slowerTempoText || fasterTempoText) {
        result.recognized = true;
        result.tempoDirection = slowerTempoText && !fasterTempoText
                ? -1
                : (fasterTempoText && !slowerTempoText ? 1 : 0);
    }

    var louderText = containsAny(text, [
        "crescendo", "gradually louder", "getting louder", "build up",
        "sempre più forte", "sempre piu forte", "だんだん強く", "次第に強く"
    ]) || containsWholeTerm(text, "cresc");
    var softerText = containsAny(text, [
        "diminuendo", "decrescendo", "gradually softer", "getting softer",
        "morendo", "smorzando", "calando", "perdendosi", "だんだん弱く",
        "次第に弱く"
    ]) || containsWholeTerm(text, "dim")
            || containsWholeTerm(text, "decresc");
    var gradualText = containsAny(text, [
        "poco a poco", "gradually", "little by little", "aumentando",
        "diminuendo", "decrescendo", "crescendo", "morendo", "smorzando",
        "calando", "perdendosi"
    ]) || containsWholeTerm(text, "cresc")
            || containsWholeTerm(text, "dim")
            || containsWholeTerm(text, "decresc");
    var suddenText = containsAny(text, [
        "subito", "suddenly", "improvvisamente", "all at once", "突然"
    ]) || containsWholeTerm(text, "sub");

    if (louderText || softerText || gradualText || suddenText) {
        result.recognized = true;
    }
    result.gradual = gradualText || louderText || softerText;
    result.sudden = suddenText;
    result.dynamicDirection = louderText && !softerText
            ? 1
            : (softerText && !louderText ? -1 : 0);

    var recognizedBeforeHandCue = result.recognized;
    var leftHandText = containsAny(text, [
        "mano sinistra", "main gauche", "left hand"
    ]) || containsWholeTerm(text, "m g")
            || containsWholeTerm(text, "m s")
            || containsWholeTerm(text, "l h");
    var rightHandText = containsAny(text, [
        "mano destra", "main droite", "right hand"
    ]) || containsWholeTerm(text, "m d")
            || containsWholeTerm(text, "r h");
    if (leftHandText !== rightHandText) {
        result.recognized = true;
        result.hand = leftHandText ? "left" : "right";
        result.handCueOnly = !recognizedBeforeHandCue;
    }

    var resetText = containsAny(text, [
        "a tempo", "tempo primo", "l istesso tempo", "ordinario",
        "return to normal", "normal expression", "senza espressione",
        "senza espr", "non espressivo"
    ]) || containsWholeTerm(text, "ord")
            || containsWholeTerm(text, "normal")
            || containsWholeTerm(text, "normale");
    if (resetText) {
        result.recognized = true;
        result.energy = 0;
        result.attack = 0;
        result.phraseScale = 1;
        result.meterScale = 1;
        result.humanScale = 1;
        result.variationScale = 1;
        result.gradual = false;
        result.sudden = false;
        result.dynamicDirection = 0;
        result.tempoDirection = 0;
        result.reset = true;
    }
    result.untilNextDynamic = result.gradual && !result.reset;

    result.energy = clamp(result.energy, -1.8, 1.8);
    result.attack = clamp(result.attack, -1.0, 1.2);
    result.phraseScale = clamp(result.phraseScale, 0.72, 1.55);
    result.meterScale = clamp(result.meterScale, 0.48, 1.35);
    result.humanScale = clamp(result.humanScale, 0.62, 1.35);
    result.variationScale = clamp(result.variationScale, 0.68, 1.45);
    return result;
}

function assignExpressions(events, expressionEvents) {
    events = events || [];
    var ordered = (expressionEvents || []).slice(0);
    ordered.sort(function(first, second) {
        if (numberOr(first.tick, 0) !== numberOr(second.tick, 0)) {
            return numberOr(first.tick, 0) - numberOr(second.tick, 0);
        }
        return numberOr(first.order, 0) - numberOr(second.order, 0);
    });

    var recognizedBySource = {};
    var activeGlobal = null;
    var activeByStaff = {};
    var resolvedGradualBySource = {};
    var handSources = [];
    var expressionIndex = 0;
    var i;

    for (i = 0; i < events.length; ++i) {
        events[i]._explicitHand = "";
        events[i]._explicitHandSourceTick = -1;
    }
    for (i = 0; i < ordered.length; ++i) {
        var handInfo = expressionInfo(ordered[i].text);
        if (handInfo.hand.length > 0) {
            handSources.push({
                source: ordered[i],
                info: handInfo
            });
        }
    }

    function stateApplies(state, event) {
        if (!state) {
            return false;
        }
        if (state.info.untilNextDynamic
                && numberOr(event.dynamicSourceTick, -1) > state.tick) {
            resolvedGradualBySource[state.sourceKey] = true;
            return false;
        }
        return true;
    }

    for (i = 0; i < events.length; ++i) {
        var event = events[i];
        while (expressionIndex < ordered.length
                && numberOr(ordered[expressionIndex].tick, 0)
                    <= numberOr(event.tick, 0)) {
            var source = ordered[expressionIndex];
            var info = expressionInfo(source.text);
            if (info.recognized) {
                var state = {
                    tick: numberOr(source.tick, 0),
                    info: info,
                    text: String(source.text || ""),
                    sourceKind: String(source.sourceKind || "text"),
                    sourceKey: String(numberOr(source.sourceIndex,
                                                expressionIndex))
                };
                if (!info.handCueOnly) {
                    if (numberOr(source.staff, -1) < 0) {
                        activeGlobal = state;
                    } else {
                        activeByStaff[String(Math.round(numberOr(
                                    source.staff, 0)))] = state;
                    }
                }
                recognizedBySource[String(numberOr(source.sourceIndex,
                                                     expressionIndex))] = true;
            }
            ++expressionIndex;
        }

        var staffKey = String(Math.round(numberOr(event.staff, 0)));
        var local = own(activeByStaff, staffKey) ? activeByStaff[staffKey] : null;
        if (!stateApplies(local, event)) {
            local = null;
        }
        var globalState = stateApplies(activeGlobal, event) ? activeGlobal : null;
        var chosen = local && (!globalState || local.tick >= globalState.tick)
                ? local
                : globalState;
        event.expression = chosen ? chosen.info : expressionInfo("");
        event.expressionSourceTick = chosen ? chosen.tick : -1;
        event.expressionSourceText = chosen ? chosen.text : "";
        event.expressionSourceKind = chosen ? chosen.sourceKind : "";
    }

    var assignedHandCueCount = 0;
    var leftHandCueCount = 0;
    var rightHandCueCount = 0;
    for (i = 0; i < handSources.length; ++i) {
        var handSource = handSources[i].source;
        var hand = handSources[i].info.hand;
        var sourceStaff = Math.round(numberOr(handSource.staff, -1));
        var bestEvent = null;
        var bestScore = -1000;
        var candidateIndex;
        for (candidateIndex = 0; candidateIndex < events.length;
                ++candidateIndex) {
            event = events[candidateIndex];
            if (numberOr(event.tick, -1) !== numberOr(handSource.tick, -2)) {
                continue;
            }
            if (sourceStaff >= 0
                    && Math.round(numberOr(event.staff, -2)) !== sourceStaff
                    && Math.round(numberOr(event.displayStaff, -2))
                       !== sourceStaff) {
                continue;
            }
            if (attackedPitchCount(event) <= 0) {
                continue;
            }
            var candidateScore = Math.log(
                        Math.max(1, numberOr(event.durationTicks, 1)))
                    / Math.log(2);
            if (numberOr(event.staffMove, 0) !== 0) {
                candidateScore += 3;
            }
            if (numberOr(event.voice, 0) > 0) {
                candidateScore += 1.1;
            }
            candidateScore += Math.min(0.42,
                        Math.max(0, attackedPitchCount(event) - 1) * 0.14);
            var staffPosition = Math.round(numberOr(
                        event.scorePartStaffIndex,
                        event.staff));
            var staffCount = Math.max(1, Math.round(numberOr(
                        event.scorePartStaffCount, 1)));
            if ((hand === "left" && staffPosition === staffCount - 1)
                    || (hand === "right" && staffPosition === 0)) {
                candidateScore += 0.18;
            }
            if (candidateScore > bestScore
                    || (candidateScore === bestScore
                        && numberOr(event.track, 0)
                           < numberOr(bestEvent && bestEvent.track, 9999))) {
                bestEvent = event;
                bestScore = candidateScore;
            }
        }
        if (bestEvent) {
            bestEvent._explicitHand = hand;
            bestEvent._explicitHandSourceTick = numberOr(handSource.tick, -1);
            ++assignedHandCueCount;
            if (hand === "left") {
                ++leftHandCueCount;
            } else {
                ++rightHandCueCount;
            }
        }
    }

    var recognizedMarkCount = 0;
    var key;
    for (key in recognizedBySource) {
        if (own(recognizedBySource, key)) {
            ++recognizedMarkCount;
        }
    }
    var resolvedGradualMarkCount = 0;
    for (key in resolvedGradualBySource) {
        if (own(resolvedGradualBySource, key)) {
            ++resolvedGradualMarkCount;
        }
    }
    return {
        recognizedMarkCount: recognizedMarkCount,
        resolvedGradualMarkCount: resolvedGradualMarkCount,
        recognizedHandCueCount: handSources.length,
        assignedHandCueCount: assignedHandCueCount,
        leftHandCueCount: leftHandCueCount,
        rightHandCueCount: rightHandCueCount
    };
}

function articulationInfo(values) {
    var names = values || [];
    var text = "";
    var i;
    for (i = 0; i < names.length; ++i) {
        text += " " + normalizePerformanceText(names[i]);
    }

    var result = {
        recognized: false,
        attack: 0,
        phraseBreak: false,
        variationScale: 1,
        slurLike: false
    };

    function add(terms, attack, variationScale) {
        if (containsAny(text, terms)) {
            result.recognized = true;
            result.attack += attack;
            result.variationScale *= variationScale;
            return true;
        }
        return false;
    }

    var strongAccent = add(["marcato", "strong accent"], 1.85, 1.08);
    var softAccent = false;
    if (!strongAccent) {
        softAccent = add(["soft accent"], 0.52, 0.94);
    }
    if (!strongAccent && !softAccent) {
        add(["accent", "sforzato"], 1.28, 1.05);
    }
    add(["tenuto"], 0.28, 0.96);
    add(["staccatissimo"], 0.74, 0.92);
    add(["staccato"], 0.42, 0.94);
    add(["portato", "mezzo staccato"], 0.16, 0.94);
    add(["trill", "mordent", "turn", "ornament"], -0.30, 0.86);
    add(["arpeggio", "arpeggiate"], -0.18, 0.92);
    add(["tremolo"], -0.28, 0.88);

    if (containsAny(text, ["fermata", "breath", "caesura", "luftpause"])) {
        result.recognized = true;
        result.attack -= 0.72;
        result.phraseBreak = true;
        result.variationScale *= 0.86;
    }
    if (containsAny(text, ["legato", "laissez vibrer"])) {
        result.recognized = true;
        result.slurLike = true;
        result.attack -= 0.16;
        result.variationScale *= 0.92;
    }

    result.attack = clamp(result.attack, -1.2, 2.4);
    result.variationScale = clamp(result.variationScale, 0.62, 1.35);
    return result;
}

function assignArticulations(events) {
    events = events || [];
    var recognizedAttackCount = 0;
    var phraseBreakCount = 0;
    var i;
    for (i = 0; i < events.length; ++i) {
        var info = articulationInfo(events[i].articulations || []);
        events[i].articulation = info;
        if (info.recognized) {
            ++recognizedAttackCount;
        }
        if (info.phraseBreak) {
            ++phraseBreakCount;
        }
    }
    return {
        recognizedAttackCount: recognizedAttackCount,
        phraseBreakCount: phraseBreakCount
    };
}

function median(values) {
    if (!values || values.length === 0) {
        return 0;
    }
    var sorted = values.slice(0).sort(function(a, b) { return a - b; });
    var middle = Math.floor(sorted.length / 2);
    if (sorted.length % 2) {
        return sorted[middle];
    }
    return (sorted[middle - 1] + sorted[middle]) / 2;
}

function mean(values) {
    if (!values || values.length === 0) {
        return 0;
    }
    var total = 0;
    var i;
    for (i = 0; i < values.length; ++i) {
        total += values[i];
    }
    return total / values.length;
}

function deviationScale(values, center) {
    var deviations = [];
    var i;
    for (i = 0; i < values.length; ++i) {
        deviations.push(Math.abs(values[i] - center));
    }
    return Math.max(0.45, median(deviations) * 1.4826);
}

function measurePositionMap(measures) {
    var map = {};
    var i;
    for (i = 0; i < measures.length; ++i) {
        map[String(measures[i].index)] = i;
    }
    return map;
}

function measurePositionForTick(measures, tick) {
    var low = 0;
    var high = measures.length - 1;
    while (low <= high) {
        var middle = Math.floor((low + high) / 2);
        if (tick < measures[middle].startTick) {
            high = middle - 1;
        } else if (tick >= measures[middle].endTick) {
            low = middle + 1;
        } else {
            return middle;
        }
    }
    return -1;
}

function spannerAppliesToEvent(spanner, event) {
    var staff = Math.round(numberOr(spanner.staff, -1));
    var endStaff = Math.round(numberOr(spanner.endStaff, staff));
    if (staff < 0) {
        return true;
    }
    if (endStaff < staff) {
        endStaff = staff;
    }
    return numberOr(event.staff, 0) >= staff
            && numberOr(event.staff, 0) <= endStaff;
}

function assignSpannerContext(events, measures, slurs, hairpins) {
    events = events || [];
    slurs = slurs || [];
    hairpins = hairpins || [];
    var i;
    var j;
    for (i = 0; i < events.length; ++i) {
        events[i]._slurCount = 0;
        events[i]._slurPosition = 0;
        events[i]._slurStarts = false;
        events[i]._slurEnds = false;
        events[i]._hairpinBaseOffset = 0;
        events[i]._hairpinActive = false;
    }

    var slurredAttackCount = 0;
    for (i = 0; i < slurs.length; ++i) {
        var slurStart = numberOr(slurs[i].startTick, -1);
        var slurEnd = numberOr(slurs[i].endTick, -1);
        if (slurStart < 0 || slurEnd <= slurStart) {
            continue;
        }
        var startMeasure = measurePositionForTick(measures, slurStart);
        var endMeasure = measurePositionForTick(measures, slurEnd - 1);
        if (startMeasure >= 0) {
            ++measures[startMeasure].slurStarts;
        }
        if (endMeasure >= 0) {
            ++measures[endMeasure].slurEnds;
        }
        for (j = startMeasure + 1; startMeasure >= 0 && j < endMeasure; ++j) {
            ++measures[j].slurCarry;
        }

        for (j = 0; j < events.length; ++j) {
            var slurEvent = events[j];
            if (!spannerAppliesToEvent(slurs[i], slurEvent)
                    || numberOr(slurEvent.tick, 0) < slurStart
                    || numberOr(slurEvent.tick, 0) >= slurEnd) {
                continue;
            }
            var slurProgress = clamp(
                        (numberOr(slurEvent.tick, 0) - slurStart)
                        / Math.max(1, slurEnd - slurStart),
                        0,
                        1);
            ++slurEvent._slurCount;
            slurEvent._slurPosition = slurProgress;
            slurEvent._slurStarts = slurEvent._slurStarts || slurProgress < 0.08;
            slurEvent._slurEnds = slurEvent._slurEnds || slurProgress > 0.82;
            ++slurredAttackCount;
        }
    }

    var hairpinAttackCount = 0;
    for (i = 0; i < hairpins.length; ++i) {
        var hairpin = hairpins[i];
        var hairpinStart = numberOr(hairpin.startTick, -1);
        var hairpinEnd = numberOr(hairpin.endTick, -1);
        var direction = numberOr(hairpin.direction, 0) >= 0 ? 1 : -1;
        if (hairpinStart < 0 || hairpinEnd <= hairpinStart) {
            continue;
        }

        var firstEvent = null;
        var eventAfter = null;
        for (j = 0; j < events.length; ++j) {
            var candidate = events[j];
            if (!spannerAppliesToEvent(hairpin, candidate)) {
                continue;
            }
            if (!firstEvent && numberOr(candidate.tick, 0) >= hairpinStart
                    && numberOr(candidate.tick, 0) < hairpinEnd) {
                firstEvent = candidate;
            }
            if (numberOr(candidate.tick, 0) >= hairpinEnd) {
                eventAfter = candidate;
                break;
            }
        }
        if (!firstEvent) {
            continue;
        }

        var startBase = dynamicInfo(
                    firstEvent.dynamicCode,
                    firstEvent.dynamicVelocity).velocity;
        var configuredChange = Math.abs(numberOr(hairpin.veloChange, 0));
        var amount = direction * (configuredChange > 0 ? configuredChange : 14);
        if (eventAfter) {
            var targetBase = dynamicInfo(
                        eventAfter.dynamicCode,
                        eventAfter.dynamicVelocity).velocity;
            var writtenDifference = targetBase - startBase;
            if (Math.abs(writtenDifference) >= 2
                    && (writtenDifference > 0 ? 1 : -1) === direction) {
                amount = writtenDifference;
            }
        }
        amount = clamp(amount, -64, 64);

        for (j = 0; j < events.length; ++j) {
            var hairpinEvent = events[j];
            if (!spannerAppliesToEvent(hairpin, hairpinEvent)
                    || numberOr(hairpinEvent.tick, 0) < hairpinStart
                    || numberOr(hairpinEvent.tick, 0) >= hairpinEnd) {
                continue;
            }
            var progress = clamp(
                        (numberOr(hairpinEvent.tick, 0) - hairpinStart)
                        / Math.max(1, hairpinEnd - hairpinStart),
                        0,
                        1);
            var eased = progress * progress * (3 - 2 * progress);
            hairpinEvent._hairpinBaseOffset = clamp(
                        numberOr(hairpinEvent._hairpinBaseOffset, 0)
                        + amount * eased,
                        -64,
                        64);
            hairpinEvent._hairpinActive = true;
            ++hairpinAttackCount;
        }
    }

    return {
        slurredAttackCount: slurredAttackCount,
        hairpinAttackCount: hairpinAttackCount
    };
}

function prepareMeasures(data) {
    var source = data.measures || [];
    var measures = [];
    var i;
    for (i = 0; i < source.length; ++i) {
        var item = source[i];
        measures.push({
            index: numberOr(item.index, i),
            startTick: numberOr(item.startTick, 0),
            endTick: numberOr(item.endTick, numberOr(item.startTick, 0) + 1),
            numerator: Math.max(1, Math.round(numberOr(item.numerator, 4))),
            denominator: Math.max(1, Math.round(numberOr(item.denominator, 4))),
            explicitBoundary: !!item.explicitBoundary,
            dynamicJump: Math.max(0, numberOr(item.dynamicJump, 0)),
            tempoBpm: clamp(numberOr(item.tempoBpm, 120), 20, 400),
            tempoMark: !!item.tempoMark,
            noteCount: 0,
            eventCount: 0,
            pitchTotal: 0,
            minPitch: 128,
            maxPitch: -1,
            chordSizeTotal: 0,
            staffSet: {},
            staffCount: 0,
            meanPitch: 60,
            pitchRange: 0,
            avgChordSize: 1,
            activity: 0,
            tempoTotal: 0,
            tempoEventCount: 0,
            expressionTotal: 0,
            expressionEventCount: 0,
            articulationCount: 0,
            phraseBreak: false,
            slurStarts: 0,
            slurEnds: 0,
            slurCarry: 0,
            onsetBins: [0, 0, 0, 0, 0, 0, 0, 0],
            patternEvents: [],
            contourRise: 0,
            contourFall: 0,
            contourRepeat: 0,
            averageInterval: 0,
            patternSource: -1,
            patternSimilarity: 0,
            patternReturnScore: 0,
            patternBoundary: false,
            patternGroup: -1,
            patternOccurrence: 0,
            patternEnergy: 0,
            changeScore: 0,
            sectionIndex: 0,
            sectionEnergy: 0,
            localEnergy: 0,
            phraseIndex: 0,
            phraseStart: i,
            phraseEnd: i + 1
        });
    }
    return measures;
}

function attackedPitchCount(event) {
    var notes = event.notes || [];
    var count = 0;
    var i;
    for (i = 0; i < notes.length; ++i) {
        if (!notes[i].tied) {
            ++count;
        }
    }
    return count;
}

function populateMeasureStats(measures, events, positionByIndex) {
    var i;
    var j;
    for (i = 0; i < events.length; ++i) {
        var event = events[i];
        var position = positionByIndex[String(event.measureIndex)];
        if (typeof position === "undefined") {
            continue;
        }
        event._measurePosition = position;
        var measure = measures[position];
        var notes = event.notes || [];
        var attacked = 0;
        measure.eventCount += 1;
        measure.chordSizeTotal += notes.length;
        measure.staffSet[String(event.staff)] = true;
        var eventTempo = clamp(numberOr(event.tempoBpm, measure.tempoBpm), 20, 400);
        measure.tempoTotal += eventTempo;
        ++measure.tempoEventCount;
        var expression = event.expression || expressionInfo("");
        measure.expressionTotal += numberOr(expression.energy, 0);
        ++measure.expressionEventCount;
        if (event.articulation && event.articulation.recognized) {
            ++measure.articulationCount;
        }
        if (event.articulation && event.articulation.phraseBreak) {
            measure.phraseBreak = true;
        }

        var measureDuration = Math.max(1, measure.endTick - measure.startTick);
        var onsetPosition = clamp(
                    (numberOr(event.tick, measure.startTick) - measure.startTick)
                    / measureDuration,
                    0,
                    0.999999);
        var onsetBin = Math.min(7, Math.floor(onsetPosition * 8));
        measure.onsetBins[onsetBin] += Math.max(1, attackedPitchCount(event));
        measure.patternEvents.push({
            position: onsetPosition,
            top: topPitch(event),
            durationRatio: clamp(numberOr(event.durationTicks, 1) / measureDuration,
                                 0, 1),
            attacked: attackedPitchCount(event),
            staff: numberOr(event.staff, 0)
        });

        for (j = 0; j < notes.length; ++j) {
            if (notes[j].tied) {
                continue;
            }
            var pitch = numberOr(notes[j].pitch, 60);
            ++attacked;
            ++measure.noteCount;
            measure.pitchTotal += pitch;
            measure.minPitch = Math.min(measure.minPitch, pitch);
            measure.maxPitch = Math.max(measure.maxPitch, pitch);
        }

        event._attackedCount = attacked;
    }

    for (i = 0; i < measures.length; ++i) {
        var current = measures[i];
        var staffKey;
        for (staffKey in current.staffSet) {
            if (own(current.staffSet, staffKey)) {
                ++current.staffCount;
            }
        }
        current.meanPitch = current.noteCount > 0 ? current.pitchTotal / current.noteCount : 60;
        current.pitchRange = current.noteCount > 0 ? current.maxPitch - current.minPitch : 0;
        current.avgChordSize = current.eventCount > 0 ? current.chordSizeTotal / current.eventCount : 1;
        current.activity = Math.log(1 + current.noteCount)
                + current.staffCount * 0.22
                + current.pitchRange / 144
                + Math.max(0, current.avgChordSize - 1) * 0.12;
        if (current.tempoEventCount > 0) {
            current.tempoBpm = current.tempoTotal / current.tempoEventCount;
        }
        current.expressionEnergy = current.expressionEventCount > 0
                ? current.expressionTotal / current.expressionEventCount
                : 0;

        var maximumBin = 1;
        for (j = 0; j < current.onsetBins.length; ++j) {
            maximumBin = Math.max(maximumBin, current.onsetBins[j]);
        }
        for (j = 0; j < current.onsetBins.length; ++j) {
            current.onsetBins[j] /= maximumBin;
        }

        var intervalTotal = 0;
        var intervalCount = 0;
        var previousTop = -1;
        for (j = 0; j < current.patternEvents.length; ++j) {
            var patternEvent = current.patternEvents[j];
            if (patternEvent.top < 0) {
                continue;
            }
            if (previousTop >= 0) {
                var interval = patternEvent.top - previousTop;
                intervalTotal += Math.abs(interval);
                ++intervalCount;
                if (interval > 1) {
                    ++current.contourRise;
                } else if (interval < -1) {
                    ++current.contourFall;
                } else {
                    ++current.contourRepeat;
                }
            }
            previousTop = patternEvent.top;
        }
        var contourTotal = Math.max(1, intervalCount);
        current.contourRise /= contourTotal;
        current.contourFall /= contourTotal;
        current.contourRepeat /= contourTotal;
        current.averageInterval = intervalCount > 0 ? intervalTotal / intervalCount : 0;
    }
}

function percentile(values, amount) {
    if (!values || values.length === 0) {
        return 0;
    }
    var sorted = values.slice(0).sort(function(first, second) {
        return first - second;
    });
    var position = clamp(numberOr(amount, 0.5), 0, 1)
            * (sorted.length - 1);
    var lower = Math.floor(position);
    var upper = Math.ceil(position);
    if (lower === upper) {
        return sorted[lower];
    }
    var fraction = position - lower;
    return sorted[lower] + (sorted[upper] - sorted[lower]) * fraction;
}

function uniqueDynamicMarkCount(dynamicEvents) {
    var seen = {};
    var count = 0;
    var i;
    for (i = 0; i < (dynamicEvents || []).length; ++i) {
        var event = dynamicEvents[i];
        var key = numberOr(event.sourceIndex, -1) >= 0
                ? "source:" + String(event.sourceIndex)
                : "tick:" + String(numberOr(event.tick, 0)) + "|"
                  + normalizeDynamicCode(event.code);
        if (!own(seen, key)) {
            seen[key] = true;
            ++count;
        }
    }
    return count;
}

function classifyPieceCharacter(measures, events, dynamicEvents, baselines,
                                division) {
    division = Math.max(1, numberOr(division, 480));
    var tempos = [];
    var activities = [];
    var totalBeats = 0;
    var silentMeasures = 0;
    var attackEvents = 0;
    var attackedNotes = 0;
    var chordEvents = 0;
    var shortEvents = 0;
    var sustainedEvents = 0;
    var strongArticulations = 0;
    var calmExpression = 0;
    var energeticExpression = 0;
    var minPitch = 128;
    var maxPitch = -1;
    var i;

    for (i = 0; i < measures.length; ++i) {
        var measure = measures[i];
        totalBeats += Math.max(1, numberOr(measure.numerator, 4)
                               * 4 / Math.max(1, numberOr(
                                      measure.denominator, 4)));
        if (measure.noteCount > 0) {
            tempos.push(numberOr(measure.tempoBpm, 120));
            activities.push(numberOr(measure.activity, 0));
            minPitch = Math.min(minPitch, numberOr(measure.minPitch, 128));
            maxPitch = Math.max(maxPitch, numberOr(measure.maxPitch, -1));
        } else {
            ++silentMeasures;
        }
    }

    for (i = 0; i < events.length; ++i) {
        var event = events[i];
        var attacked = numberOr(event._attackedCount,
                                attackedPitchCount(event));
        if (attacked <= 0) {
            continue;
        }
        ++attackEvents;
        attackedNotes += attacked;
        if (attacked >= 2) {
            ++chordEvents;
        }
        var durationBeats = Math.max(1, numberOr(event.durationTicks, 1))
                / division;
        if (durationBeats <= 0.45) {
            ++shortEvents;
        }
        if (durationBeats >= 1.25) {
            ++sustainedEvents;
        }
        var articulation = event.articulation || articulationInfo([]);
        if (numberOr(articulation.attack, 0) >= 0.7) {
            ++strongArticulations;
        }
        var expression = event.expression || expressionInfo("");
        if (numberOr(expression.energy, 0) <= -0.35) {
            ++calmExpression;
        } else if (numberOr(expression.energy, 0) >= 0.45) {
            ++energeticExpression;
        }
    }

    var writtenVelocities = [];
    for (i = 0; i < (dynamicEvents || []).length; ++i) {
        var dynamicEvent = dynamicEvents[i];
        if (numberOr(dynamicEvent.staff, -1) >= 0
                && String(dynamicEvent.scopeKind || "") === "part") {
            var sourceKey = String(numberOr(dynamicEvent.sourceIndex, i));
            if (i > 0 && String(numberOr(dynamicEvents[i - 1].sourceIndex,
                                         i - 1)) === sourceKey) {
                continue;
            }
        }
        writtenVelocities.push(performanceVelocityForCode(
                    dynamicEvent.code,
                    dynamicEvent.velocity,
                    baselines));
    }

    var tempo = tempos.length > 0 ? median(tempos) : 120;
    var attacksPerBeat = attackEvents / Math.max(1, totalBeats);
    var chordRatio = chordEvents / Math.max(1, attackEvents);
    var shortRatio = shortEvents / Math.max(1, attackEvents);
    var sustainedRatio = sustainedEvents / Math.max(1, attackEvents);
    var articulationRatio = strongArticulations / Math.max(1, attackEvents);
    var calmRatio = calmExpression / Math.max(1, attackEvents);
    var energeticRatio = energeticExpression / Math.max(1, attackEvents);
    var silenceRatio = silentMeasures / Math.max(1, measures.length);
    var registerSpan = maxPitch >= minPitch ? maxPitch - minPitch : 0;
    var writtenCenter = writtenVelocities.length > 0
            ? median(writtenVelocities)
            : null;
    var activitySpread = activities.length > 0
            ? percentile(activities, 0.85) - percentile(activities, 0.15)
            : 0;

    var scores = {
        intimate: 0.45,
        lyrical: 0.55,
        balanced: 0.72,
        driving: 0.38,
        grand: 0.32
    };
    scores.intimate += clamp((92 - tempo) / 55, -0.25, 0.90)
            + silenceRatio * 0.85
            + calmRatio * 1.05
            + sustainedRatio * 0.46
            - chordRatio * 0.38
            + (writtenCenter !== null
               ? clamp((62 - writtenCenter) / 28, -0.35, 0.75)
               : 0);
    scores.lyrical += clamp(1 - Math.abs(tempo - 86) / 78, 0, 1) * 0.62
            + sustainedRatio * 0.78
            + (1 - chordRatio) * 0.34
            + calmRatio * 0.30
            + clamp(registerSpan / 42, 0, 1) * 0.22;
    scores.balanced += clamp(1 - Math.abs(tempo - 112) / 100, 0, 1) * 0.38
            + clamp(attacksPerBeat / 1.8, 0, 1) * 0.18
            + clamp(activitySpread / 2.2, 0, 1) * 0.26;
    scores.driving += clamp((tempo - 104) / 92, 0, 1) * 0.92
            + clamp(attacksPerBeat / 2.4, 0, 1) * 0.74
            + shortRatio * 0.58
            + articulationRatio * 0.64
            + energeticRatio * 0.52
            - silenceRatio * 0.34;
    scores.grand += chordRatio * 0.88
            + clamp(registerSpan / 54, 0, 1) * 0.54
            + energeticRatio * 0.62
            + clamp(activitySpread / 2.0, 0, 1) * 0.42
            + (writtenCenter !== null
               ? clamp((writtenCenter - 76) / 34, -0.25, 0.72)
               : 0);

    var labels = ["intimate", "lyrical", "balanced", "driving", "grand"];
    var best = "balanced";
    var bestScore = -1000;
    var secondScore = -1000;
    for (i = 0; i < labels.length; ++i) {
        var label = labels[i];
        var score = scores[label];
        if (score > bestScore) {
            secondScore = bestScore;
            bestScore = score;
            best = label;
        } else if (score > secondScore) {
            secondScore = score;
        }
    }

    return {
        name: best,
        confidence: clamp((bestScore - secondScore) / 1.15 + 0.42,
                          0.42, 0.96),
        tempo: tempo,
        attacksPerBeat: attacksPerBeat,
        chordRatio: chordRatio,
        silenceRatio: silenceRatio,
        registerSpan: registerSpan,
        activitySpread: activitySpread,
        writtenCenter: writtenCenter,
        scores: scores
    };
}

function naturalControlsForCharacter(character) {
    var result = presetControls("natural");
    var name = character && character.name
            ? String(character.name)
            : "balanced";
    if (name === "intimate") {
        result.strength = 60;
        result.sectionSensitivity = 48;
        result.melodyEmphasis = 66;
        result.crossStaffStrength = 88;
        result.humanVariation = 34;
        result.baselines = {
            ppp: 18, pp: 30, p: 46, mp: 54,
            mf: 68, f: 84, ff: 100, fff: 116
        };
    } else if (name === "lyrical") {
        result.strength = 70;
        result.sectionSensitivity = 56;
        result.melodyEmphasis = 74;
        result.crossStaffStrength = 104;
        result.humanVariation = 40;
    } else if (name === "driving") {
        result.strength = 78;
        result.sectionSensitivity = 62;
        result.melodyEmphasis = 54;
        result.crossStaffStrength = 92;
        result.humanVariation = 26;
        result.baselines = {
            ppp: 20, pp: 34, p: 48, mp: 60,
            mf: 75, f: 92, ff: 108, fff: 122
        };
    } else if (name === "grand") {
        result.strength = 84;
        result.sectionSensitivity = 70;
        result.melodyEmphasis = 62;
        result.crossStaffStrength = 100;
        result.humanVariation = 30;
        result.baselines = {
            ppp: 20, pp: 34, p: 49, mp: 60,
            mf: 77, f: 95, ff: 111, fff: 124
        };
    }
    if (numberOr(character && character.tempo, 120) <= 72) {
        result.baselines.p = Math.max(46, result.baselines.p);
        result.baselines.mp = Math.min(54, result.baselines.mp);
        result.baselines.mf = Math.min(69, result.baselines.mf);
        result.baselines.f = Math.min(85, result.baselines.f);
        result.baselines.ff = Math.min(101, result.baselines.ff);
        result.baselines.fff = Math.min(117, result.baselines.fff);
    }
    return result;
}

function applyNaturalCalibration(options, character) {
    if (options.profileName !== "natural" || !options.naturalAutoDetect) {
        return options;
    }
    var controls = naturalControlsForCharacter(character);
    options.strength = controls.strength;
    options.sectionSensitivity = controls.sectionSensitivity;
    options.melodyEmphasis = controls.melodyEmphasis;
    options.crossStaffStrength = controls.crossStaffStrength;
    options.humanVariation = controls.humanVariation;
    options.phraseMeasures = controls.phraseMeasures;
    options.baselines = normalizedBaselines(
                controls.baselines,
                PRESET_CONTROLS.natural.baselines);

    var profile = options.profile;
    if (character.name === "intimate") {
        profile.phrase *= 1.08;
        profile.section *= 0.78;
        profile.climax *= 0.82;
        profile.ending *= 1.24;
        profile.meter *= 0.72;
        profile.articulation *= 0.84;
    } else if (character.name === "lyrical") {
        profile.phrase *= 1.12;
        profile.contour *= 1.12;
        profile.voicing *= 1.12;
        profile.ending *= 1.12;
    } else if (character.name === "driving") {
        profile.phrase *= 0.72;
        profile.section *= 1.06;
        profile.meter *= 1.16;
        profile.articulation *= 1.14;
        profile.climax *= 1.04;
    } else if (character.name === "grand") {
        profile.phrase *= 1.02;
        profile.section *= 1.16;
        profile.structure *= 1.14;
        profile.climax *= 1.20;
        profile.texture *= 1.08;
    }
    return options;
}

function prepareStructuralExpression(measures, sections, character) {
    var entryCount = 0;
    var endingCount = 0;
    var sectionIndex;
    for (sectionIndex = 0; sectionIndex < sections.length; ++sectionIndex) {
        var section = sections[sectionIndex];
        var length = Math.max(1, section.end - section.start);
        var preferredProgress = character.name === "grand" ? 0.72 : 0.62;
        var peakPosition = section.start;
        var peakScore = -1000;
        var p;
        for (p = section.start; p < section.end; ++p) {
            var measure = measures[p];
            if (measure.noteCount <= 0) {
                continue;
            }
            var progress = length <= 1
                    ? 0.5
                    : (p - section.start) / (length - 1);
            var placement = 1 - Math.abs(progress - preferredProgress);
            var articulationDensity = measure.articulationCount
                    / Math.max(1, measure.eventCount);
            var candidate = measure.localEnergy * 0.82
                    + measure.sectionEnergy * 0.34
                    + numberOr(measure.expressionEnergy, 0) * 0.42
                    + articulationDensity * 0.38
                    + placement * 0.34
                    + numberOr(measure.patternEnergy, 0) * 0.22;
            if (candidate > peakScore) {
                peakScore = candidate;
                peakPosition = p;
            }
        }
        section.peakMeasure = peakPosition;

        for (p = section.start; p < section.end; ++p) {
            measure = measures[p];
            var sectionProgress = length <= 1
                    ? 0.5
                    : (p - section.start) / (length - 1);
            var peakDistance = Math.abs(p - peakPosition)
                    / Math.max(1, Math.max(peakPosition - section.start,
                                          section.end - 1 - peakPosition));
            var climax = clamp(1 - peakDistance * 1.35, -0.35, 1);
            var phraseLength = Math.max(1,
                                        measure.phraseEnd
                                        - measure.phraseStart);
            var phraseMeasureProgress = clamp(
                        (p - measure.phraseStart + 0.5) / phraseLength,
                        0, 1);
            var phraseArch = Math.sin(Math.PI * phraseMeasureProgress);
            var entry = p === section.start ? -0.22 : 0;
            if (p === section.start && (character.name === "driving"
                                        || character.name === "grand")) {
                entry = 0.06;
            }
            var phraseEnding = p === measure.phraseEnd - 1 ? -0.22 : 0;
            var finalEnding = p === measures.length - 1 ? -0.68 : 0;
            if (p === measures.length - 1 && peakPosition === p
                    && character.name === "grand") {
                finalEnding = -0.12;
            }
            measure.structuralClimax = climax;
            measure.structuralEntry = entry;
            measure.structuralEnding = phraseEnding + finalEnding;
            measure.structuralEnergy = clamp(
                        measure.sectionEnergy * 0.44
                        + measure.localEnergy * 0.30
                        + climax * 0.50
                        + (phraseArch - 0.55) * 0.34
                        + entry + phraseEnding + finalEnding
                        + numberOr(measure.patternEnergy, 0) * 0.22,
                        -1.45, 1.45);
            measure.sectionProgress = sectionProgress;
            if (entry !== 0) {
                ++entryCount;
            }
            if (phraseEnding !== 0 || finalEnding !== 0) {
                ++endingCount;
            }
        }
    }
    return {
        entryCount: entryCount,
        endingCount: endingCount
    };
}

function dynamicCodeForVelocity(velocity, baselines) {
    var order = ["ppp", "pp", "p", "mp", "mf", "f", "ff", "fff"];
    var values = normalizedBaselines(
                baselines,
                PRESET_CONTROLS.natural.baselines);
    var best = order[0];
    var bestDistance = 1000;
    var i;
    for (i = 0; i < order.length; ++i) {
        var distance = Math.abs(numberOr(velocity, values.mf)
                                - values[order[i]]);
        if (distance < bestDistance) {
            bestDistance = distance;
            best = order[i];
        }
    }
    return best;
}

function inferredStartingVelocity(character, baselines) {
    var values = normalizedBaselines(
                baselines,
                PRESET_CONTROLS.natural.baselines);
    if (character.name === "intimate") {
        return values.p;
    }
    if (character.name === "lyrical") {
        return values.mp;
    }
    if (character.name === "driving") {
        return Math.round((values.mf + values.f) / 2);
    }
    if (character.name === "grand") {
        return values.f;
    }
    return values.mf;
}

function inferDynamicPlan(events, measures, dynamicEvents, character,
                          options) {
    var markCount = uniqueDynamicMarkCount(dynamicEvents);
    var sparseLimit = Math.max(2, Math.ceil(measures.length / 8));
    var mode = markCount === 0
            ? "inferred"
            : (markCount <= sparseLimit ? "sparse" : "written");
    var base = inferredStartingVelocity(character, options.baselines);
    var range = {
        intimate: 12,
        lyrical: 18,
        balanced: 18,
        driving: 15,
        grand: 24
    }[character.name] || 18;
    if (options.profileName === "subtle") {
        range *= 0.58;
    } else if (options.profileName === "ballad") {
        range *= 0.68;
    } else if (options.profileName === "expressive") {
        range *= 1.20;
    } else if (options.profileName === "jazz") {
        range *= 0.92;
    } else if (options.profileName === "baroque") {
        range *= 0.72;
    } else if (options.profileName === "cinematic") {
        range *= 1.38;
    } else if (options.profileName === "virtuosic") {
        range *= 1.48;
    }

    var rawByMeasure = [];
    var smoothByMeasure = [];
    var i;

    var markPositions = [];
    var writtenAnchors = [];
    var writtenLevelSet = {};
    var writtenLevels = [];
    var seenSources = {};
    for (i = 0; i < (dynamicEvents || []).length; ++i) {
        var source = dynamicEvents[i];
        var sourceKey = String(numberOr(source.sourceIndex, i));
        if (own(seenSources, sourceKey)) {
            continue;
        }
        seenSources[sourceKey] = true;
        var sourcePosition = measurePositionForTick(
                    measures,
                    numberOr(source.tick, -1));
        if (sourcePosition >= 0) {
            markPositions.push(sourcePosition);
            var anchorVelocity = dynamicInfo(
                        source.code,
                        source.velocity,
                        options.baselines).velocity;
            writtenAnchors.push({
                position: sourcePosition,
                tick: numberOr(source.tick, 0),
                velocity: anchorVelocity
            });
            if (!isTransientDynamic(source.code)
                    && !own(writtenLevelSet, String(anchorVelocity))) {
                writtenLevelSet[String(anchorVelocity)] = true;
                writtenLevels.push(anchorVelocity);
            }
        }
    }
    writtenLevels.sort(function(first, second) { return first - second; });
    writtenAnchors.sort(function(first, second) {
        if (first.position !== second.position) {
            return first.position - second.position;
        }
        return first.tick - second.tick;
    });
    var permittedMinimum = options.baselines.ppp;
    var permittedMaximum = options.baselines.fff;
    if (writtenLevels.length === 0) {
        if (character.name === "intimate") {
            permittedMinimum = options.baselines.p;
            permittedMaximum = options.baselines.mp;
        } else if (character.name === "lyrical") {
            permittedMinimum = options.baselines.p;
            permittedMaximum = options.baselines.mf;
        } else if (character.name === "balanced") {
            permittedMinimum = options.baselines.mp;
            permittedMaximum = options.baselines.f;
        } else if (character.name === "driving") {
            permittedMinimum = options.baselines.mf;
            permittedMaximum = options.baselines.ff;
        } else if (character.name === "grand") {
            permittedMinimum = options.baselines.p;
            permittedMaximum = options.baselines.ff;
        }
    } else if (writtenLevels.length >= 2) {
        permittedMinimum = writtenLevels[0];
        permittedMaximum = writtenLevels[writtenLevels.length - 1];
    } else if (writtenLevels.length === 1) {
        var only = writtenLevels[0];
        var order = ["ppp", "pp", "p", "mp", "mf", "f", "ff", "fff"];
        var onlyCode = dynamicCodeForVelocity(only, options.baselines);
        var onlyIndex = order.indexOf(onlyCode);
        var lowerIndex = Math.max(0, onlyIndex - 1);
        var upperIndex = Math.min(order.length - 1, onlyIndex + 1);
        if (character.name === "intimate" || character.name === "lyrical") {
            upperIndex = onlyIndex;
        } else if (character.name === "driving" || character.name === "grand") {
            lowerIndex = onlyIndex;
        }
        permittedMinimum = options.baselines[order[lowerIndex]];
        permittedMaximum = options.baselines[order[upperIndex]];
    }

    var consistency = options.naturalConsistency || {};
    var naturalSingleLevel = options.profileName === "natural"
            && writtenLevels.length === 1;
    if (options.profileName === "natural") {
        range *= clamp(numberOr(consistency.inferenceScale, 1), 0.3, 1);
        if (naturalSingleLevel) {
            var singleCode = dynamicCodeForVelocity(
                        writtenLevels[0],
                        options.baselines);
            var tempoSoftening = singleCode === "ppp" || singleCode === "pp"
                    || singleCode === "p"
                    ? 0
                    : numberOr(consistency.tempoSoftening, 0);
            base = writtenLevels[0] - tempoSoftening;
            var singleLevelBand = Math.round(clamp(
                        3 + (1 - numberOr(consistency.stability, 0)) * 2
                        + numberOr(consistency.contrastEvidence, 0) * 3,
                        3,
                        8));
            var downBand = singleCode === "p" || singleCode === "pp"
                    || singleCode === "ppp"
                    ? Math.min(3, singleLevelBand)
                    : singleLevelBand;
            permittedMinimum = Math.max(options.baselines.ppp,
                                        writtenLevels[0] - downBand);
            permittedMaximum = Math.min(options.baselines.fff,
                                        writtenLevels[0] + singleLevelBand);
        } else if (base >= options.baselines.mp) {
            base -= numberOr(consistency.tempoSoftening, 0);
        }
    }

    for (i = 0; i < measures.length; ++i) {
        rawByMeasure[i] = clamp(
                    Math.round(base
                               + numberOr(measures[i].structuralEnergy, 0)
                               * range),
                    permittedMinimum,
                    permittedMaximum);
    }

    if (options.profileName === "natural" && measures.length > 0) {
        var sectionTotals = {};
        var sectionCounts = {};
        var sectionGroups = {};
        for (i = 0; i < measures.length; ++i) {
            var sectionKey = String(numberOr(measures[i].sectionIndex, 0));
            sectionTotals[sectionKey] = (sectionTotals[sectionKey] || 0)
                    + rawByMeasure[i];
            sectionCounts[sectionKey] = (sectionCounts[sectionKey] || 0) + 1;
            sectionGroups[sectionKey] = String(numberOr(
                        measures[i].patternGroup,
                        measures[i].sectionIndex));
        }
        var groupTotals = {};
        var groupCounts = {};
        var sectionCenters = {};
        var key;
        for (key in sectionTotals) {
            if (!own(sectionTotals, key)) {
                continue;
            }
            var center = sectionTotals[key] / Math.max(1, sectionCounts[key]);
            sectionCenters[key] = center;
            var groupKey = sectionGroups[key];
            groupTotals[groupKey] = (groupTotals[groupKey] || 0) + center;
            groupCounts[groupKey] = (groupCounts[groupKey] || 0) + 1;
        }
        var withinScale = clamp(numberOr(
                    consistency.withinSectionScale,
                    1), 0.2, 1);
        for (i = 0; i < measures.length; ++i) {
            sectionKey = String(numberOr(measures[i].sectionIndex, 0));
            groupKey = sectionGroups[sectionKey];
            var sectionCenter = sectionCenters[sectionKey];
            var macroCenter = groupCounts[groupKey] > 1
                    ? groupTotals[groupKey] / groupCounts[groupKey]
                    : sectionCenter;
            rawByMeasure[i] = clamp(
                        Math.round(macroCenter
                                   + (rawByMeasure[i] - sectionCenter)
                                     * withinScale),
                        permittedMinimum,
                        permittedMaximum);
        }
    }

    for (i = 0; i < measures.length; ++i) {
        var total = rawByMeasure[i] * 2;
        var weight = 2;
        if (i > 0 && measures[i - 1].sectionIndex === measures[i].sectionIndex) {
            total += rawByMeasure[i - 1];
            ++weight;
        }
        if (i + 1 < measures.length
                && measures[i + 1].sectionIndex === measures[i].sectionIndex) {
            total += rawByMeasure[i + 1];
            ++weight;
        }
        smoothByMeasure[i] = clamp(Math.round(total / weight),
                                   permittedMinimum,
                                   permittedMaximum);
        measures[i].inferredDynamicVelocity = smoothByMeasure[i];
        measures[i].inferredDynamicCode = dynamicCodeForVelocity(
                    smoothByMeasure[i], options.baselines);
    }

    var changedCodeCount = 0;
    var previousCode = "";
    for (i = 0; i < measures.length; ++i) {
        if (measures[i].noteCount <= 0) {
            continue;
        }
        if (measures[i].inferredDynamicCode !== previousCode) {
            ++changedCodeCount;
            previousCode = measures[i].inferredDynamicCode;
        }
    }

    var inferredAttackCount = 0;
    for (i = 0; i < events.length; ++i) {
        var event = events[i];
        if (typeof event._measurePosition === "undefined"
                || numberOr(event._attackedCount, 0) <= 0) {
            continue;
        }
        var position = event._measurePosition;
        var suggested = smoothByMeasure[position];
        var written = numberOr(event._contextDynamicVelocity,
                               dynamicInfo(event.dynamicCode,
                                           event.dynamicVelocity,
                                           options.baselines).velocity);
        var target = written;
        if (mode === "inferred") {
            target = suggested;
        } else if (mode === "sparse") {
            var nearest = 1000000;
            var markIndex;
            for (markIndex = 0; markIndex < markPositions.length; ++markIndex) {
                nearest = Math.min(nearest,
                                   Math.abs(position - markPositions[markIndex]));
            }
            var anchor = nearest === 0
                    ? 0
                    : clamp(0.42 + nearest * 0.12, 0.42, 0.78);
            var structuralOffset = clamp(
                        numberOr(measures[position].structuralEnergy, 0)
                        * range * anchor,
                        -range * 0.72,
                        range * 0.72);
            if (!event.hasWrittenDynamic) {
                target = suggested;
                var nextAnchor = null;
                for (markIndex = 0; markIndex < writtenAnchors.length;
                        ++markIndex) {
                    if (writtenAnchors[markIndex].tick
                            > numberOr(event.tick, 0)) {
                        nextAnchor = writtenAnchors[markIndex];
                        break;
                    }
                }
                if (nextAnchor
                        && nextAnchor.position - position <= 2) {
                    var approach = clamp(
                                1 - (nextAnchor.position - position) / 2.5,
                                0, 0.84);
                    target = target
                            + (nextAnchor.velocity - target)
                              * smoothStep(approach);
                }
            } else {
                target = naturalSingleLevel
                        && !isTransientDynamic(event.dynamicCode)
                        ? suggested
                        : written + structuralOffset;
            }
            if (event.hasWrittenDynamic
                    && numberOr(event.tick, -2)
                       === numberOr(event.dynamicSourceTick, -1)) {
                target = written;
            }
        }
        target = clamp(Math.round(target),
                       permittedMinimum,
                       permittedMaximum);
        event._contextDynamicVelocity = target;
        event._inferredDynamicVelocity = suggested;
        event._inferredDynamicCode = measures[position].inferredDynamicCode;
        event._dynamicInferenceMode = mode;
        if (mode !== "written" && target !== written) {
            inferredAttackCount += numberOr(event._attackedCount, 0);
        }
    }

    return {
        mode: mode,
        writtenMarkCount: markCount,
        inferredChangeCount: mode === "written" ? 0 : changedCodeCount,
        inferredAttackCount: inferredAttackCount,
        startingCode: dynamicCodeForVelocity(base, options.baselines),
        startingVelocity: base,
        minimum: smoothByMeasure.length > 0
                ? Math.min.apply(Math, smoothByMeasure)
                : null,
        maximum: smoothByMeasure.length > 0
                ? Math.max.apply(Math, smoothByMeasure)
                : null
    };
}

function measurePatternSimilarity(first, second) {
    if (!first || !second || first.noteCount === 0 || second.noteCount === 0) {
        return 0;
    }

    var rhythmDifference = 0;
    var i;
    for (i = 0; i < 8; ++i) {
        rhythmDifference += Math.abs(numberOr(first.onsetBins[i], 0)
                                     - numberOr(second.onsetBins[i], 0));
    }
    rhythmDifference /= 8;

    var densityDifference = Math.min(
                1,
                Math.abs(Math.log((first.noteCount + 1) / (second.noteCount + 1)))
                / 1.8);
    var textureDifference = Math.min(
                1,
                Math.abs(first.avgChordSize - second.avgChordSize) / 3
                + Math.abs(first.staffCount - second.staffCount) / 5);
    var contourDifference = Math.min(
                1,
                (Math.abs(first.contourRise - second.contourRise)
                 + Math.abs(first.contourFall - second.contourFall)
                 + Math.abs(first.contourRepeat - second.contourRepeat)) / 2
                + Math.abs(first.averageInterval - second.averageInterval) / 18);
    var meterPenalty = first.numerator === second.numerator
            && first.denominator === second.denominator ? 0 : 0.18;

    return clamp(
                1 - rhythmDifference * 0.46
                - densityDifference * 0.22
                - contourDifference * 0.20
                - textureDifference * 0.12
                - meterPenalty,
                0,
                1);
}

function analyzeMeasurePatterns(measures) {
    var lastPatternBoundary = -1000;
    var i;
    for (i = 2; i + 1 < measures.length; ++i) {
        var bestSource = -1;
        var bestPair = 0;
        var bestReturn = 0;
        var j;
        for (j = 0; j + 1 < i - 1; ++j) {
            var pairSimilarity = (measurePatternSimilarity(measures[i], measures[j])
                                  + measurePatternSimilarity(measures[i + 1],
                                                             measures[j + 1])) / 2;
            if (pairSimilarity < 0.74) {
                continue;
            }
            var precedingSimilarity = j > 0
                    ? measurePatternSimilarity(measures[i - 1], measures[j - 1])
                    : measurePatternSimilarity(measures[i - 1], measures[j]);
            var returnScore = pairSimilarity * (1 - precedingSimilarity);
            if (pairSimilarity > bestPair
                    || (Math.abs(pairSimilarity - bestPair) < 0.0001
                        && returnScore > bestReturn)) {
                bestPair = pairSimilarity;
                bestReturn = returnScore;
                bestSource = j;
            }
        }

        if (bestSource >= 0) {
            measures[i].patternSource = bestSource;
            measures[i].patternSimilarity = bestPair;
            measures[i].patternReturnScore = bestReturn;
            if (bestPair >= 0.82 && bestReturn >= 0.34
                    && i - lastPatternBoundary >= 3) {
                measures[i].patternBoundary = true;
                lastPatternBoundary = i;
            }
        }
    }
}

function computeChangeScores(measures) {
    var i;
    for (i = 1; i < measures.length; ++i) {
        var previous = measures[i - 1];
        var current = measures[i];
        var densityChange = Math.abs(Math.log((current.noteCount + 1) / (previous.noteCount + 1)));
        var registerChange = Math.abs(current.meanPitch - previous.meanPitch) / 12;
        var staffChange = Math.abs(current.staffCount - previous.staffCount);
        var chordChange = Math.abs(current.avgChordSize - previous.avgChordSize);
        var silenceChange = ((current.noteCount === 0) !== (previous.noteCount === 0)) ? 1.25 : 0;
        var tempoChange = Math.abs(Math.log(
                    Math.max(20, current.tempoBpm)
                    / Math.max(20, previous.tempoBpm)));
        var expressionChange = Math.abs(
                    numberOr(current.expressionEnergy, 0)
                    - numberOr(previous.expressionEnergy, 0));

        current.changeScore = densityChange * 0.85
                + registerChange * 0.45
                + staffChange * 0.28
                + chordChange * 0.23
                + silenceChange
                + Math.min(1.0, current.dynamicJump / 28)
                + tempoChange * 1.65
                + expressionChange * 0.38
                + current.patternReturnScore * 1.15
                + (current.tempoMark ? 0.18 : 0)
                + (previous.phraseBreak ? 0.78 : 0);

        if (current.explicitBoundary || current.patternBoundary) {
            current.changeScore += 8;
        }
    }
}

function detectSections(measures, options, activityCenter, activityScale) {
    if (measures.length === 0) {
        return [];
    }

    var threshold = 1.62 - (options.sectionSensitivity / 100) * 0.82;
    var boundaries = [0];
    var lastBoundary = 0;
    var i;

    for (i = 1; i < measures.length; ++i) {
        var distance = i - lastBoundary;
        var explicit = measures[i].explicitBoundary;
        var changed = measures[i].changeScore >= threshold;

        if ((explicit && distance >= 1) || (changed && distance >= 2)) {
            boundaries.push(i);
            lastBoundary = i;
        }
    }

    if (boundaries.length > 1
            && boundaries[boundaries.length - 1] === measures.length - 1
            && !measures[measures.length - 1].explicitBoundary) {
        boundaries.pop();
    }

    boundaries.push(measures.length);
    var sections = [];

    for (i = 0; i < boundaries.length - 1; ++i) {
        var start = boundaries[i];
        var end = boundaries[i + 1];
        var activities = [];
        var p;
        for (p = start; p < end; ++p) {
            activities.push(measures[p].activity);
        }
        var averageActivity = mean(activities);
        var energy = clamp((averageActivity - activityCenter) / (activityScale * 2.1), -1, 1);
        var section = {
            index: sections.length,
            start: start,
            end: end,
            averageActivity: averageActivity,
            energy: energy
        };
        sections.push(section);

        for (p = start; p < end; ++p) {
            measures[p].sectionIndex = section.index;
            measures[p].sectionEnergy = energy;
            measures[p].localEnergy = clamp(
                        (measures[p].activity - averageActivity) / (activityScale * 2.0),
                        -1,
                        1);
        }
    }

    return sections;
}

function sectionPatternSimilarity(first, second, measures) {
    var firstLength = first.end - first.start;
    var secondLength = second.end - second.start;
    var lengthRatio = Math.min(firstLength, secondLength)
            / Math.max(1, Math.max(firstLength, secondLength));
    if (lengthRatio < 0.5) {
        return 0;
    }

    var sampleCount = Math.min(6, Math.min(firstLength, secondLength));
    if (sampleCount <= 0) {
        return 0;
    }
    var total = 0;
    var i;
    for (i = 0; i < sampleCount; ++i) {
        var firstOffset = sampleCount === 1
                ? 0
                : Math.round(i * (firstLength - 1) / (sampleCount - 1));
        var secondOffset = sampleCount === 1
                ? 0
                : Math.round(i * (secondLength - 1) / (sampleCount - 1));
        total += measurePatternSimilarity(
                    measures[first.start + firstOffset],
                    measures[second.start + secondOffset]);
    }
    var activityPenalty = Math.min(
                0.18,
                Math.abs(first.averageActivity - second.averageActivity) * 0.07);
    return clamp(total / sampleCount * 0.9 + lengthRatio * 0.1 - activityPenalty,
                 0, 1);
}

function groupRecurringSections(sections, measures) {
    var nextGroup = 0;
    var occurrenceByGroup = {};
    var groupUseCount = {};
    var i;
    for (i = 0; i < sections.length; ++i) {
        var bestSection = -1;
        var bestSimilarity = 0;
        var j;
        for (j = 0; j < i; ++j) {
            var similarity = sectionPatternSimilarity(sections[i], sections[j], measures);
            if (similarity > bestSimilarity) {
                bestSimilarity = similarity;
                bestSection = j;
            }
        }

        if (bestSection >= 0 && bestSimilarity >= 0.74) {
            sections[i].patternGroup = sections[bestSection].patternGroup;
            sections[i].patternSimilarity = bestSimilarity;
        } else {
            sections[i].patternGroup = nextGroup++;
            sections[i].patternSimilarity = 1;
        }

        var groupKey = String(sections[i].patternGroup);
        var occurrence = own(occurrenceByGroup, groupKey)
                ? occurrenceByGroup[groupKey]
                : 0;
        sections[i].patternOccurrence = occurrence;
        occurrenceByGroup[groupKey] = occurrence + 1;
        groupUseCount[groupKey] = (groupUseCount[groupKey] || 0) + 1;

        var patternEnergy = occurrence === 0
                ? 0
                : Math.min(0.34, 0.12 + occurrence * 0.08);
        var p;
        for (p = sections[i].start; p < sections[i].end; ++p) {
            measures[p].patternGroup = sections[i].patternGroup;
            measures[p].patternOccurrence = occurrence;
            measures[p].patternEnergy = patternEnergy;
        }
    }

    var recurringGroupCount = 0;
    var key;
    for (key in groupUseCount) {
        if (own(groupUseCount, key) && groupUseCount[key] > 1) {
            ++recurringGroupCount;
        }
    }
    return recurringGroupCount;
}

function writtenSustainedLevelCount(dynamicEvents, baselines) {
    var seenSources = {};
    var seenLevels = {};
    var count = 0;
    var i;
    for (i = 0; i < (dynamicEvents || []).length; ++i) {
        var source = dynamicEvents[i];
        var sourceIndex = numberOr(source.sourceIndex, -1);
        var sourceKey = sourceIndex >= 0
                ? "source:" + String(sourceIndex)
                : "event:" + String(i);
        if (own(seenSources, sourceKey)) {
            continue;
        }
        seenSources[sourceKey] = true;
        if (isTransientDynamic(source.code)) {
            continue;
        }
        var velocity = performanceVelocityForCode(
                    source.code,
                    source.velocity,
                    baselines);
        var levelKey = String(velocity);
        if (!own(seenLevels, levelKey)) {
            seenLevels[levelKey] = true;
            ++count;
        }
    }
    return count;
}

function applyNaturalScoreConsistency(options, measures, sections,
                                      dynamicEvents, character) {
    var neutral = {
        stability: 0,
        macroScale: 1,
        inferenceScale: 1,
        withinSectionScale: 1,
        sustainedLevelCount: 0
    };
    if (options.profileName !== "natural" || measures.length === 0) {
        options.naturalConsistency = neutral;
        return neutral;
    }

    var tempos = [];
    var activities = [];
    var expressionMinimum = null;
    var expressionMaximum = null;
    var i;
    for (i = 0; i < measures.length; ++i) {
        if (measures[i].noteCount <= 0) {
            continue;
        }
        tempos.push(numberOr(measures[i].tempoBpm, 120));
        activities.push(numberOr(measures[i].activity, 0));
        var expressionEnergy = numberOr(measures[i].expressionEnergy, 0);
        expressionMinimum = expressionMinimum === null
                ? expressionEnergy
                : Math.min(expressionMinimum, expressionEnergy);
        expressionMaximum = expressionMaximum === null
                ? expressionEnergy
                : Math.max(expressionMaximum, expressionEnergy);
    }

    var tempoMinimum = tempos.length > 0 ? Math.min.apply(Math, tempos) : 120;
    var tempoMaximum = tempos.length > 0 ? Math.max.apply(Math, tempos) : 120;
    var tempoCenter = tempos.length > 0
            ? median(tempos)
            : numberOr(character && character.tempo, 120);
    var tempoSpread = tempoMaximum - tempoMinimum;
    var tempoStability = clamp(1 - tempoSpread / 18, 0, 1);
    var activitySpread = activities.length > 0
            ? percentile(activities, 0.85) - percentile(activities, 0.15)
            : 0;
    var activityStability = clamp(1 - activitySpread / 1.35, 0, 1);
    var expressionSpread = expressionMinimum === null
            ? 0
            : expressionMaximum - expressionMinimum;

    var groupUseCount = {};
    var groupMeasureCount = {};
    var groupEnergyTotal = {};
    var groupEnergyWeight = {};
    var sectionEnergyMinimum = null;
    var sectionEnergyMaximum = null;
    for (i = 0; i < sections.length; ++i) {
        var section = sections[i];
        var key = String(numberOr(section.patternGroup, section.index));
        var length = Math.max(1, section.end - section.start);
        groupUseCount[key] = (groupUseCount[key] || 0) + 1;
        groupMeasureCount[key] = (groupMeasureCount[key] || 0) + length;
        groupEnergyTotal[key] = (groupEnergyTotal[key] || 0)
                + numberOr(section.energy, 0) * length;
        groupEnergyWeight[key] = (groupEnergyWeight[key] || 0) + length;
        sectionEnergyMinimum = sectionEnergyMinimum === null
                ? numberOr(section.energy, 0)
                : Math.min(sectionEnergyMinimum, numberOr(section.energy, 0));
        sectionEnergyMaximum = sectionEnergyMaximum === null
                ? numberOr(section.energy, 0)
                : Math.max(sectionEnergyMaximum, numberOr(section.energy, 0));
    }

    var recurringMeasures = 0;
    var groupKey;
    for (groupKey in groupUseCount) {
        if (own(groupUseCount, groupKey) && groupUseCount[groupKey] > 1) {
            recurringMeasures += groupMeasureCount[groupKey];
        }
    }
    var recurrence = clamp(recurringMeasures / Math.max(1, measures.length),
                           0, 1);
    var sustainedLevelCount = writtenSustainedLevelCount(
                dynamicEvents,
                options.baselines);
    var sparseNotation = sustainedLevelCount <= 1;
    var stability = clamp(
                tempoStability * 0.40
                + activityStability * 0.34
                + (sparseNotation ? 0.16 : 0)
                + recurrence * 0.10,
                0,
                1);
    var sectionContrast = sectionEnergyMinimum === null
            ? 0
            : sectionEnergyMaximum - sectionEnergyMinimum;
    var contrastEvidence = clamp(sectionContrast / 1.05
                                 + expressionSpread / 1.6,
                                 0, 1);
    var macroScale = sparseNotation
            ? clamp(0.46 + (1 - stability) * 0.30
                    + contrastEvidence * 0.18, 0.46, 0.88)
            : 1;
    var inferenceScale = sparseNotation
            ? clamp(0.44 + (1 - stability) * 0.26
                    + contrastEvidence * 0.20, 0.44, 0.86)
            : 1;
    var withinSectionScale = sparseNotation
            ? clamp(0.22 + (1 - stability) * 0.30
                    + contrastEvidence * 0.16, 0.22, 0.68)
            : 1;
    var tempoSoftening = clamp(Math.round((84 - tempoCenter) / 8), 0, 3);

    var profile = options.profile;
    profile.phrase *= macroScale;
    profile.section *= macroScale;
    profile.structure *= macroScale;
    profile.climax *= macroScale;
    profile.ending *= clamp(macroScale + 0.10, 0.54, 1);
    profile.pattern *= clamp(macroScale * 0.72, 0.34, 1);
    profile.human *= clamp(0.62 + macroScale * 0.38, 0.62, 1);
    profile.gain *= clamp(0.86 + macroScale * 0.14, 0.86, 1);
    var microScale = clamp(0.72 + macroScale * 0.28, 0.72, 1);
    profile.meter *= microScale;
    profile.contour *= microScale;
    profile.articulation *= microScale;

    var recurringBlend = clamp(0.72 + stability * 0.22, 0.72, 0.94);
    for (i = 0; i < sections.length; ++i) {
        section = sections[i];
        key = String(numberOr(section.patternGroup, section.index));
        if (groupUseCount[key] <= 1) {
            continue;
        }
        var groupEnergy = groupEnergyTotal[key]
                / Math.max(1, groupEnergyWeight[key]);
        section.energy = numberOr(section.energy, 0) * (1 - recurringBlend)
                + groupEnergy * recurringBlend;
        var p;
        for (p = section.start; p < section.end; ++p) {
            measures[p].sectionEnergy = section.energy;
            // 同じ楽節の再現を勝手に段階クレッシェンドにしない
            measures[p].patternEnergy = 0;
        }
    }

    var result = {
        stability: stability,
        macroScale: macroScale,
        inferenceScale: inferenceScale,
        withinSectionScale: withinSectionScale,
        sustainedLevelCount: sustainedLevelCount,
        tempoStability: tempoStability,
        activityStability: activityStability,
        recurrence: recurrence,
        contrastEvidence: contrastEvidence,
        tempoSoftening: tempoSoftening
    };
    options.naturalConsistency = result;
    return result;
}

function measureDurationSeconds(measure) {
    var beats = Math.max(
                0.25,
                numberOr(measure.numerator, 4) * 4
                / Math.max(1, numberOr(measure.denominator, 4)));
    return clamp(
                beats * 60 / clamp(numberOr(measure.tempoBpm, 120), 20, 400),
                0.15,
                30);
}

function automaticPhraseBoundaryEvidence(measures, position, sectionStart) {
    var current = measures[position];
    var previous = measures[position - 1];
    var beforePrevious = position - 2 >= sectionStart
            ? measures[position - 2]
            : previous;
    var evidence = 0;

    if (current.noteCount === 0 && previous.noteCount > 0) {
        evidence += 3.1;
    } else if (current.noteCount === 0) {
        evidence += 0.55;
    }
    if (previous.noteCount === 0 && current.noteCount > 0) {
        evidence += 2.65;
    }

    if (previous.phraseBreak) {
        evidence += 3.8;
    }
    evidence += Math.min(2.4, numberOr(previous.slurEnds, 0) * 1.35);
    if (numberOr(current.slurStarts, 0) > 0
            && numberOr(current.slurCarry, 0) === 0) {
        evidence += 0.38;
    }
    if (numberOr(current.slurCarry, 0) > 0) {
        evidence -= Math.min(3.2, 1.9 + numberOr(current.slurCarry, 0) * 0.65);
    } else if (numberOr(previous.slurCarry, 0) > 0
               && numberOr(previous.slurEnds, 0) === 0) {
        evidence -= 1.05;
    }

    if (current.patternBoundary) {
        evidence += 3.0;
    }
    evidence += Math.min(1.35, numberOr(current.patternReturnScore, 0) * 1.45);
    evidence += Math.min(1.7, Math.max(0, numberOr(current.changeScore, 0)) * 0.72);

    if (current.numerator !== previous.numerator
            || current.denominator !== previous.denominator) {
        evidence += 1.28;
    }
    var tempoChange = Math.abs(Math.log(
                clamp(numberOr(current.tempoBpm, 120), 20, 400)
                / clamp(numberOr(previous.tempoBpm, 120), 20, 400)));
    evidence += Math.min(1.35, tempoChange * 4.2);
    if (current.tempoMark && tempoChange > 0.025) {
        evidence += 0.28;
    }

    var densityChange = Math.abs(Math.log(
                (numberOr(current.noteCount, 0) + 1)
                / (numberOr(previous.noteCount, 0) + 1)));
    var textureChange = densityChange * 0.42
            + Math.abs(numberOr(current.avgChordSize, 1)
                       - numberOr(previous.avgChordSize, 1)) * 0.18
            + Math.abs(numberOr(current.staffCount, 0)
                       - numberOr(previous.staffCount, 0)) * 0.22;
    evidence += Math.min(1.15, textureChange);
    evidence += Math.min(
                0.95,
                Math.abs(numberOr(current.activity, 0)
                         - numberOr(previous.activity, 0)) * 0.38);

    if (position - 2 >= sectionStart && previous.noteCount > 0) {
        var approachRelease = Math.max(
                    0,
                    numberOr(beforePrevious.activity, 0)
                    - numberOr(previous.activity, 0));
        var restartRise = Math.max(
                    0,
                    numberOr(current.activity, 0)
                    - numberOr(previous.activity, 0));
        var densityValley = Math.max(
                    0,
                    Math.min(numberOr(beforePrevious.noteCount, 0),
                             numberOr(current.noteCount, 0))
                    - numberOr(previous.noteCount, 0));
        evidence += Math.min(
                    1.45,
                    Math.min(approachRelease, restartRise) * 0.92
                    + Math.log(1 + densityValley) * 0.38);
        evidence += Math.min(
                    0.42,
                    numberOr(previous.contourFall, 0) * 0.34
                    + numberOr(previous.contourRepeat, 0) * 0.12);
    }

    return evidence;
}

function automaticPhraseContext(measures, start, end) {
    var totalSeconds = 0;
    var activityTotal = 0;
    var chordTotal = 0;
    var activeCount = 0;
    var silentCount = 0;
    var slurCarryCount = 0;
    var meterChangeCount = 0;
    var anchorDurations = [];
    var lastAnchor = start;
    var secondsSinceAnchor = 0;
    var i;

    for (i = start; i < end; ++i) {
        var duration = measureDurationSeconds(measures[i]);
        totalSeconds += duration;
        secondsSinceAnchor += duration;
        activityTotal += numberOr(measures[i].activity, 0);
        if (measures[i].noteCount === 0) {
            ++silentCount;
        } else {
            chordTotal += numberOr(measures[i].avgChordSize, 1);
            ++activeCount;
        }
        if (numberOr(measures[i].slurCarry, 0) > 0) {
            ++slurCarryCount;
        }
        if (i > start
                && (measures[i].numerator !== measures[i - 1].numerator
                    || measures[i].denominator !== measures[i - 1].denominator)) {
            ++meterChangeCount;
        }

        if (i > start
                && automaticPhraseBoundaryEvidence(measures, i, start) >= 2.75
                && i - lastAnchor >= 2) {
            anchorDurations.push(secondsSinceAnchor - duration);
            lastAnchor = i;
            secondsSinceAnchor = duration;
        }
    }
    if (end - lastAnchor >= 2) {
        anchorDurations.push(secondsSinceAnchor);
    }

    var length = Math.max(1, end - start);
    var averageActivity = activityTotal / length;
    var averageChordSize = activeCount > 0 ? chordTotal / activeCount : 1;
    var preferredSeconds = 12.2;
    if (averageActivity < 1.35) {
        preferredSeconds += 1.15;
    } else if (averageActivity > 2.6) {
        preferredSeconds -= 1.1;
    }
    if (averageChordSize > 2.2) {
        preferredSeconds -= Math.min(1.0, (averageChordSize - 2.2) * 0.55);
    }
    preferredSeconds += Math.min(2.0, slurCarryCount / length * 3.1);
    preferredSeconds -= Math.min(2.4, silentCount / length * 4.8);
    preferredSeconds -= Math.min(1.3, meterChangeCount / length * 4.0);

    if (anchorDurations.length >= 2) {
        var evidenceDuration = clamp(median(anchorDurations), 7, 18);
        preferredSeconds = preferredSeconds * 0.56 + evidenceDuration * 0.44;
    }
    preferredSeconds = clamp(preferredSeconds, 7, 18);

    var averageMeasureSeconds = totalSeconds / length;
    var preferredMeasures = preferredSeconds / Math.max(0.15, averageMeasureSeconds);
    return {
        preferredSeconds: preferredSeconds,
        preferredMeasures: preferredMeasures,
        maximumMeasures: Math.max(
                    4,
                    Math.min(16, Math.ceil(preferredMeasures * 2.15))),
        splitCost: 1.16
    };
}

function automaticPhraseSpanScore(measures, start, end, context) {
    var seconds = 0;
    var i;
    for (i = start; i < end; ++i) {
        seconds += measureDurationSeconds(measures[i]);
    }
    var ratio = Math.max(0.16, seconds / context.preferredSeconds);
    var score = -2.65 * Math.pow(Math.log(ratio), 2);
    var span = end - start;
    if (span === 1) {
        score -= measures[start].noteCount === 0 ? 0.45 : 2.25;
    }
    if (span > context.maximumMeasures) {
        score -= Math.pow(span - context.maximumMeasures, 2) * 0.42;
    }
    return score;
}

function automaticPhraseStarts(measures, section) {
    var start = section.start;
    var end = section.end;
    var length = end - start;
    if (length <= 1) {
        return [start, end];
    }

    var context = automaticPhraseContext(measures, start, end);
    var bestScores = [];
    var bestCounts = [];
    var previousPositions = [];
    var offset;
    for (offset = 0; offset <= length; ++offset) {
        bestScores[offset] = -1000000000;
        bestCounts[offset] = 1000000000;
        previousPositions[offset] = -1;
    }
    bestScores[0] = 0;
    bestCounts[0] = 0;

    var endOffset;
    for (endOffset = 1; endOffset <= length; ++endOffset) {
        var endPosition = start + endOffset;
        var startOffsetMinimum = Math.max(0, endOffset - context.maximumMeasures - 2);
        var startOffset;
        for (startOffset = startOffsetMinimum;
             startOffset < endOffset;
             ++startOffset) {
            if (bestScores[startOffset] <= -999999999) {
                continue;
            }
            var phraseStart = start + startOffset;
            var phraseSpan = endPosition - phraseStart;
            var score = bestScores[startOffset]
                    + automaticPhraseSpanScore(
                        measures, phraseStart, endPosition, context);
            if (endPosition < end) {
                var boundaryEvidence = automaticPhraseBoundaryEvidence(
                            measures, endPosition, start);
                score += boundaryEvidence - context.splitCost;
                if (phraseSpan === 1 && boundaryEvidence < 3.15) {
                    score -= 3.0;
                }
                if (end - endPosition === 1 && boundaryEvidence < 3.15) {
                    score -= 2.5;
                }
            } else if (phraseSpan === 1 && length > 2) {
                score -= 2.5;
            }

            var phraseCount = bestCounts[startOffset] + 1;
            if (score > bestScores[endOffset] + 0.000001
                    || (Math.abs(score - bestScores[endOffset]) <= 0.000001
                        && (phraseCount < bestCounts[endOffset]
                            || (phraseCount === bestCounts[endOffset]
                                && phraseStart < previousPositions[endOffset])))) {
                bestScores[endOffset] = score;
                bestCounts[endOffset] = phraseCount;
                previousPositions[endOffset] = phraseStart;
            }
        }
    }

    var starts = [end];
    var cursor = end;
    while (cursor > start) {
        var previous = previousPositions[cursor - start];
        if (previous < start || previous >= cursor) {
            return [start, end];
        }
        starts.unshift(previous);
        cursor = previous;
    }
    return starts;
}

function detectPhrases(measures, sections) {
    var phrases = [];
    var sectionIndex;

    for (sectionIndex = 0; sectionIndex < sections.length; ++sectionIndex) {
        var section = sections[sectionIndex];
        var starts = automaticPhraseStarts(measures, section);
        var i;
        for (i = 0; i < starts.length - 1; ++i) {
            var phrase = {
                index: phrases.length,
                sectionIndex: section.index,
                start: starts[i],
                end: starts[i + 1]
            };
            phrases.push(phrase);
            var p;
            for (p = phrase.start; p < phrase.end; ++p) {
                measures[p].phraseIndex = phrase.index;
                measures[p].phraseStart = phrase.start;
                measures[p].phraseEnd = phrase.end;
            }
        }
    }

    return phrases;
}

function topPitch(event) {
    var notes = event.notes || [];
    var result = -1;
    var i;
    for (i = 0; i < notes.length; ++i) {
        if (!notes[i].tied) {
            result = Math.max(result, numberOr(notes[i].pitch, 60));
        }
    }
    return result;
}

function bottomPitch(event) {
    var notes = event.notes || [];
    var result = 128;
    var i;
    for (i = 0; i < notes.length; ++i) {
        if (!notes[i].tied) {
            result = Math.min(result, numberOr(notes[i].pitch, 60));
        }
    }
    return result === 128 ? -1 : result;
}

function eventPitchSignature(event) {
    var pitches = [];
    var notes = event && event.notes ? event.notes : [];
    var i;
    for (i = 0; i < notes.length; ++i) {
        if (!notes[i].tied) {
            pitches.push(Math.round(numberOr(notes[i].pitch, 60)));
        }
    }
    pitches.sort(function(first, second) { return first - second; });
    return pitches.join(",");
}

function attackedNotesInPitchOrder(event, resetVoicing) {
    var result = [];
    var notes = event && event.notes ? event.notes : [];
    var i;
    for (i = 0; i < notes.length; ++i) {
        if (resetVoicing) {
            notes[i]._chordVoicingShape = 0;
        }
        if (!notes[i].tied) {
            result.push({
                note: notes[i],
                pitch: numberOr(notes[i].pitch, 60),
                sourceIndex: i
            });
        }
    }
    result.sort(function(first, second) {
        if (first.pitch !== second.pitch) {
            return first.pitch - second.pitch;
        }
        return first.sourceIndex - second.sourceIndex;
    });
    return result;
}

function nearestPitchDistance(pitch, descriptors) {
    if (!descriptors || descriptors.length === 0) {
        return 128;
    }
    var result = 128;
    var i;
    for (i = 0; i < descriptors.length; ++i) {
        result = Math.min(result,
                          Math.abs(pitch - descriptors[i].pitch));
    }
    return result;
}

function prepareChordVoicingShape(event, previousEvent) {
    var tones = attackedNotesInPitchOrder(event, true);
    if (tones.length <= 1) {
        return;
    }
    var previousTones = attackedNotesInPitchOrder(previousEvent, false);
    var lastIndex = tones.length - 1;
    var span = Math.max(1, tones[lastIndex].pitch - tones[0].pitch);
    var shapes = [];
    var shapeTotal = 0;
    var i;
    for (i = 0; i < tones.length; ++i) {
        var pitch = tones[i].pitch;
        var relativeRegister = (pitch - tones[0].pitch) / span;
        var belowGap = i > 0 ? pitch - tones[i - 1].pitch : 0;
        var aboveGap = i < lastIndex ? tones[i + 1].pitch - pitch : 0;
        var shape;
        if (i === lastIndex) {
            shape = 1.02 + clamp((belowGap - 3) / 12, 0, 0.24);
        } else if (i === 0) {
            shape = -0.10 + clamp((aboveGap - 4) / 16, 0, 0.18);
        } else {
            shape = -0.38 + (relativeRegister - 0.5) * 0.12;
            shape += clamp((belowGap - aboveGap)
                           / Math.max(1, belowGap + aboveGap),
                           -1, 1) * 0.16;
        }

        if (previousTones.length > 0) {
            var nearest = nearestPitchDistance(pitch, previousTones);
            var previousRank = Math.round(
                        i * (previousTones.length - 1) / lastIndex);
            var rankedMotion = pitch - previousTones[previousRank].pitch;
            if (i === lastIndex) {
                shape += nearest <= 2 ? 0.12 : -0.04;
                shape += clamp(rankedMotion / 12, -0.08, 0.12);
            } else if (i === 0) {
                shape += Math.abs(rankedMotion) <= 2 ? 0.05 : -0.03;
            } else if (nearest === 0) {
                shape -= 0.07;
            } else if (nearest <= 2) {
                shape += 0.04;
            }
        }

        if (event._sameChordRepeat && i > 0 && i < lastIndex) {
            shape += (i + numberOr(event._repeatStreak, 0)) % 2 === 0
                    ? 0.06
                    : -0.05;
        }
        shapes.push(shape);
        shapeTotal += shape;
    }

    var center = shapeTotal / tones.length;
    for (i = 0; i < tones.length; ++i) {
        tones[i].note._chordVoicingShape = shapes[i] - center;
    }
}

function prepareContour(events) {
    var byTrack = {};
    var staffMoments = {};
    var i;

    for (i = 0; i < events.length; ++i) {
        var event = events[i];
        event._topPitch = topPitch(event);
        event._bottomPitch = bottomPitch(event);
        event._pitchSignature = eventPitchSignature(event);
        event._chordSize = attackedPitchCount(event);
        event._sameChordRepeat = false;
        event._repeatStreak = 0;
        event._isLocalPeak = false;
        event._isLocalLow = false;
        event._leapArrival = 0;
        if (event._topPitch < 0) {
            continue;
        }

        var trackKey = String(event.track);
        if (!own(byTrack, trackKey)) {
            byTrack[trackKey] = [];
        }
        byTrack[trackKey].push(event);

        var momentKey = String(event.tick) + "|" + String(event.staff);
        if (!own(staffMoments, momentKey)) {
            staffMoments[momentKey] = {
                count: 0,
                maxTop: -1,
                minVoice: 4
            };
        }
        var moment = staffMoments[momentKey];
        ++moment.count;
        moment.maxTop = Math.max(moment.maxTop, event._topPitch);
        moment.minVoice = Math.min(moment.minVoice, numberOr(event.voice, 0));
        event._momentKey = momentKey;
    }

    var key;
    for (key in byTrack) {
        if (!own(byTrack, key)) {
            continue;
        }
        var trackEvents = byTrack[key];
        trackEvents.sort(function(a, b) {
            if (a.tick !== b.tick) {
                return a.tick - b.tick;
            }
            return a._topPitch - b._topPitch;
        });
        var repeatStreak = 0;
        for (i = 0; i < trackEvents.length; ++i) {
            var currentEvent = trackEvents[i];
            var previousEvent = i > 0 ? trackEvents[i - 1] : currentEvent;
            var nextEvent = i + 1 < trackEvents.length
                    ? trackEvents[i + 1]
                    : currentEvent;
            currentEvent._previousTop = previousEvent._topPitch;
            trackEvents[i]._nextTop = i + 1 < trackEvents.length
                    ? nextEvent._topPitch
                    : currentEvent._topPitch;
            currentEvent._previousDurationTicks = numberOr(
                        previousEvent.durationTicks,
                        currentEvent.durationTicks);
            currentEvent._nextDurationTicks = numberOr(
                        nextEvent.durationTicks,
                        currentEvent.durationTicks);
            currentEvent._sameChordRepeat = i > 0
                    && currentEvent._pitchSignature.length > 0
                    && currentEvent._pitchSignature
                       === previousEvent._pitchSignature;
            repeatStreak = currentEvent._sameChordRepeat
                    ? repeatStreak + 1
                    : 0;
            currentEvent._repeatStreak = repeatStreak;
            currentEvent._isLocalPeak = currentEvent._topPitch
                    > previousEvent._topPitch
                    && currentEvent._topPitch >= nextEvent._topPitch;
            currentEvent._isLocalLow = currentEvent._topPitch
                    < previousEvent._topPitch
                    && currentEvent._topPitch <= nextEvent._topPitch;
            currentEvent._leapArrival = i > 0
                    ? Math.abs(currentEvent._topPitch
                               - previousEvent._topPitch)
                    : 0;
            prepareChordVoicingShape(currentEvent,
                                     i > 0 ? previousEvent : null);
        }
    }

    for (i = 0; i < events.length; ++i) {
        if (events[i]._topPitch < 0) {
            continue;
        }
        var staffMoment = staffMoments[events[i]._momentKey];
        events[i]._simultaneousStaffEvents = staffMoment.count;
        events[i]._isStaffMelody = events[i]._topPitch === staffMoment.maxTop;
    }
}

function performancePartKey(event) {
    var key = String(event && event.scorePartGroupKey || "");
    if (key.length > 0) {
        return key;
    }
    return "staff:" + String(Math.round(numberOr(event && event.staff, 0)));
}

function prepareWholePartContext(events, measures, division) {
    division = Math.max(1, numberOr(division, 480));
    var groups = {};
    var i;
    for (i = 0; i < events.length; ++i) {
        var event = events[i];
        event._partChordRatio = 0;
        event._partRepeatedChordRatio = 0;
        event._partOnsetDensity = 0;
        event._partRegisterSpan = 0;
        event._wholePartRolePrior = 0;
        event._partContextKey = "";
        if (numberOr(event._attackedCount, 0) <= 0
                || typeof event._measurePosition === "undefined") {
            continue;
        }
        var measure = measures[event._measurePosition];
        var partKey = performancePartKey(event);
        var groupKey = partKey + "|section:"
                + String(numberOr(measure.sectionIndex, 0));
        event._partContextKey = groupKey;
        if (!own(groups, groupKey)) {
            groups[groupKey] = {
                key: groupKey,
                partKey: partKey,
                events: [],
                onsetTicks: {},
                eventCount: 0,
                chordEventCount: 0,
                repeatedChordCount: 0,
                attackedNotes: 0,
                minPitch: 128,
                maxPitch: -1,
                startTick: measure.startTick,
                endTick: measure.endTick,
                staffStats: {}
            };
        }
        var group = groups[groupKey];
        group.events.push(event);
        group.onsetTicks[String(numberOr(event.tick, 0))] = true;
        ++group.eventCount;
        group.attackedNotes += numberOr(event._attackedCount, 0);
        if (numberOr(event._attackedCount, 0) >= 2) {
            ++group.chordEventCount;
        }
        if (event._sameChordRepeat) {
            ++group.repeatedChordCount;
        }
        group.minPitch = Math.min(group.minPitch, numberOr(event._bottomPitch, 128));
        group.maxPitch = Math.max(group.maxPitch, numberOr(event._topPitch, -1));
        group.startTick = Math.min(group.startTick, measure.startTick);
        group.endTick = Math.max(group.endTick, measure.endTick);

        var staffKey = String(Math.round(numberOr(event.staff, 0)));
        if (!own(group.staffStats, staffKey)) {
            group.staffStats[staffKey] = {
                staff: Math.round(numberOr(event.staff, 0)),
                eventCount: 0,
                singleCount: 0,
                chordCount: 0,
                repeatedCount: 0,
                pitchTotal: 0,
                pitchCount: 0,
                motionTotal: 0,
                durationTotal: 0,
                voiceZeroCount: 0,
                score: 0
            };
        }
        var stat = group.staffStats[staffKey];
        ++stat.eventCount;
        if (numberOr(event._attackedCount, 0) === 1) {
            ++stat.singleCount;
        } else {
            ++stat.chordCount;
        }
        if (event._sameChordRepeat) {
            ++stat.repeatedCount;
        }
        if (event._topPitch >= 0) {
            stat.pitchTotal += event._topPitch;
            ++stat.pitchCount;
        }
        stat.motionTotal += Math.min(12, Math.abs(
                    numberOr(event._topPitch, 60)
                    - numberOr(event._previousTop, event._topPitch)));
        stat.durationTotal += Math.max(1, numberOr(event.durationTicks, 1));
        if (numberOr(event.voice, 0) === 0) {
            ++stat.voiceZeroCount;
        }
    }

    var result = {
        partSectionCount: 0,
        fullPartAttackCount: 0,
        chordContextAttackCount: 0
    };
    var groupKey;
    for (groupKey in groups) {
        if (!own(groups, groupKey)) {
            continue;
        }
        group = groups[groupKey];
        ++result.partSectionCount;
        result.fullPartAttackCount += group.attackedNotes;
        var onsetCount = 0;
        var onsetKey;
        for (onsetKey in group.onsetTicks) {
            if (own(group.onsetTicks, onsetKey)) {
                ++onsetCount;
            }
        }
        var sectionBeats = Math.max(1,
                    (group.endTick - group.startTick) / division);
        var onsetDensity = onsetCount / sectionBeats;
        var chordRatio = group.chordEventCount
                / Math.max(1, group.eventCount);
        var repeatedRatio = group.repeatedChordCount
                / Math.max(1, group.chordEventCount);
        var registerSpan = group.maxPitch >= group.minPitch
                ? group.maxPitch - group.minPitch
                : 0;

        var stats = [];
        var totalPitch = 0;
        var totalPitchCount = 0;
        var staffKey;
        for (staffKey in group.staffStats) {
            if (!own(group.staffStats, staffKey)) {
                continue;
            }
            stat = group.staffStats[staffKey];
            stat.meanPitch = stat.pitchCount > 0
                    ? stat.pitchTotal / stat.pitchCount
                    : 60;
            totalPitch += stat.pitchTotal;
            totalPitchCount += stat.pitchCount;
            stats.push(stat);
        }
        var partMeanPitch = totalPitchCount > 0
                ? totalPitch / totalPitchCount
                : 60;
        var bestScore = -1000;
        var secondScore = -1000;
        var leadStaff = null;
        for (i = 0; i < stats.length; ++i) {
            stat = stats[i];
            var singleRatio = stat.singleCount / Math.max(1, stat.eventCount);
            var staffChordRatio = stat.chordCount / Math.max(1, stat.eventCount);
            var staffRepeatRatio = stat.repeatedCount
                    / Math.max(1, stat.chordCount);
            var motion = stat.motionTotal / Math.max(1, stat.eventCount);
            var duration = stat.durationTotal
                    / Math.max(1, stat.eventCount) / division;
            var voiceZero = stat.voiceZeroCount / Math.max(1, stat.eventCount);
            stat.score = clamp((stat.meanPitch - partMeanPitch) / 12,
                               -1.4, 1.4) * 0.54
                    + singleRatio * 0.92
                    + clamp(motion / 7, 0, 1) * 0.28
                    + clamp(duration / 2, 0, 1) * 0.20
                    + voiceZero * 0.10
                    - staffChordRatio * 0.48
                    - staffRepeatRatio * 0.44;
            if (stat.score > bestScore) {
                secondScore = bestScore;
                bestScore = stat.score;
                leadStaff = String(stat.staff);
            } else if (stat.score > secondScore) {
                secondScore = stat.score;
            }
        }
        var balanced = stats.length < 2
                || bestScore - secondScore < 0.46
                || (chordRatio >= 0.72 && repeatedRatio < 0.20);

        for (i = 0; i < group.events.length; ++i) {
            event = group.events[i];
            staffKey = String(Math.round(numberOr(event.staff, 0)));
            event._partChordRatio = chordRatio;
            event._partRepeatedChordRatio = repeatedRatio;
            event._partOnsetDensity = onsetDensity;
            event._partRegisterSpan = registerSpan;
            if (!balanced && stats.length > 1) {
                event._wholePartRolePrior = staffKey === leadStaff
                        ? 0.34
                        : -0.52;
            }
            if (numberOr(event._attackedCount, 0) >= 2) {
                result.chordContextAttackCount += numberOr(
                            event._attackedCount, 0);
            }
        }
    }
    return result;
}

function crossStaffPartDescriptor(event) {
    var scoreKey = String(event && event.scorePartGroupKey || "");
    var scoreCount = Math.round(numberOr(
                    event && event.scorePartStaffCount, 1));
    if (scoreKey.length > 0 && scoreCount > 1) {
        return {
            key: scoreKey,
            count: scoreCount,
            position: Math.max(0, Math.round(numberOr(
                        event && event.scorePartStaffIndex, 0)))
        };
    }

    var dynamicKey = String(event && event.dynamicPartGroupKey || "");
    if (dynamicKey.indexOf("part:") === 0) {
        var staffList = dynamicKey.substring(5).split(",");
        if (staffList.length > 1) {
            var eventStaff = String(Math.round(numberOr(event.staff, 0)));
            var position = staffList.indexOf(eventStaff);
            return {
                key: "dynamic-" + dynamicKey,
                count: staffList.length,
                position: position >= 0 ? position : 0
            };
        }
    }
    return null;
}

function prepareCrossStaffRoles(events, measures, division, options) {
    events = events || [];
    measures = measures || [];
    division = Math.max(1, numberOr(division, 480));
    options = options || {};

    var result = {
        comparedPartCount: 0,
        comparedMeasureCount: 0,
        comparedAttackCount: 0,
        adjustedAttackCount: 0,
        leadAttackCount: 0,
        supportAttackCount: 0,
        balancedAttackCount: 0,
        upperLeadMeasureCount: 0,
        lowerLeadMeasureCount: 0,
        balancedMeasureCount: 0,
        crossedRegisterMeasureCount: 0,
        crossedRegisterAttackCount: 0,
        leadHandoffCount: 0
    };
    var buckets = {};
    var lastTopByStaff = {};
    var i;

    for (i = 0; i < events.length; ++i) {
        var event = events[i];
        event._crossStaffBalance = 0;
        event._crossStaffRole = "single-staff";
        event._crossStaffConfidence = 0;
        event._crossStaffRegisterCrossing = false;
        event._crossStaffHandoff = false;

        if (numberOr(event._attackedCount, 0) <= 0
                || typeof event._measurePosition === "undefined") {
            continue;
        }
        var descriptor = crossStaffPartDescriptor(event);
        if (!descriptor) {
            continue;
        }

        var bucketKey = descriptor.key + "|"
                + String(event._measurePosition);
        if (!own(buckets, bucketKey)) {
            buckets[bucketKey] = {
                key: bucketKey,
                partKey: descriptor.key,
                measurePosition: event._measurePosition,
                staffStats: {},
                moments: {},
                events: [],
                minTick: numberOr(event.tick, 0),
                maxSoundingEnd: eventSoundingEnd(event),
                hasStaffMove: false
            };
        }
        var bucket = buckets[bucketKey];
        bucket.events.push(event);
        bucket.minTick = Math.min(bucket.minTick, numberOr(event.tick, 0));
        bucket.maxSoundingEnd = Math.max(bucket.maxSoundingEnd,
                                         eventSoundingEnd(event));
        bucket.hasStaffMove = bucket.hasStaffMove
                || numberOr(event.staffMove, 0) !== 0;
        event._crossStaffBucketKey = bucketKey;

        var staffKey = String(Math.round(numberOr(event.staff, 0)));
        if (!own(bucket.staffStats, staffKey)) {
            bucket.staffStats[staffKey] = {
                staff: Math.round(numberOr(event.staff, 0)),
                position: descriptor.position,
                eventCount: 0,
                attackCount: 0,
                pitchCount: 0,
                pitchTotal: 0,
                chordTotal: 0,
                singleEventCount: 0,
                durationTotal: 0,
                voiceZeroCount: 0,
                motionTotal: 0,
                motionCount: 0,
                repeatCount: 0,
                wholePartPriorTotal: 0,
                meanPitch: 60,
                avgChord: 1,
                singleRatio: 1,
                avgDurationBeats: 1,
                avgMotion: 0,
                repeatRatio: 0,
                densityShare: 0,
                score: 0
            };
        }
        var stat = bucket.staffStats[staffKey];
        ++stat.eventCount;
        stat.attackCount += numberOr(event._attackedCount, 0);
        stat.chordTotal += numberOr(event._attackedCount, 0);
        if (numberOr(event._attackedCount, 0) === 1) {
            ++stat.singleEventCount;
        }
        stat.durationTotal += Math.max(1, numberOr(event.durationTicks, 1));
        stat.wholePartPriorTotal += numberOr(event._wholePartRolePrior, 0);
        if (numberOr(event.voice, 0) === 0) {
            ++stat.voiceZeroCount;
        }

        var notes = event.notes || [];
        var noteIndex;
        for (noteIndex = 0; noteIndex < notes.length; ++noteIndex) {
            if (!notes[noteIndex].tied) {
                stat.pitchTotal += numberOr(notes[noteIndex].pitch, 60);
                ++stat.pitchCount;
            }
        }
        var continuityKey = descriptor.key + "|" + staffKey;
        if (own(lastTopByStaff, continuityKey) && event._topPitch >= 0) {
            var motion = Math.abs(event._topPitch
                                  - lastTopByStaff[continuityKey]);
            stat.motionTotal += Math.min(12, motion);
            ++stat.motionCount;
            if (motion <= 1) {
                ++stat.repeatCount;
            }
        }
        if (event._topPitch >= 0) {
            lastTopByStaff[continuityKey] = event._topPitch;
        }

        var momentKey = String(numberOr(event.tick, 0));
        if (!own(bucket.moments, momentKey)) {
            bucket.moments[momentKey] = { staffs: {} };
        }
        var moment = bucket.moments[momentKey];
        if (!own(moment.staffs, staffKey)) {
            moment.staffs[staffKey] = {
                position: descriptor.position,
                top: event._topPitch,
                bottom: event._bottomPitch,
                chordTotal: 0,
                eventCount: 0
            };
        }
        var momentStaff = moment.staffs[staffKey];
        momentStaff.top = Math.max(momentStaff.top, event._topPitch);
        momentStaff.bottom = momentStaff.bottom < 0
                ? event._bottomPitch
                : Math.min(momentStaff.bottom, event._bottomPitch);
        momentStaff.chordTotal += numberOr(event._attackedCount, 0);
        ++momentStaff.eventCount;
    }

    var decisionsByPart = {};
    var partSeen = {};
    var bucketKey;
    for (bucketKey in buckets) {
        if (!own(buckets, bucketKey)) {
            continue;
        }
        bucket = buckets[bucketKey];
        var stats = [];
        var totalEvents = 0;
        var totalPitches = 0;
        var totalPitchCount = 0;
        var staffKey;
        for (staffKey in bucket.staffStats) {
            if (!own(bucket.staffStats, staffKey)) {
                continue;
            }
            stat = bucket.staffStats[staffKey];
            if (stat.attackCount <= 0) {
                continue;
            }
            stat.meanPitch = stat.pitchCount > 0
                    ? stat.pitchTotal / stat.pitchCount
                    : 60;
            stat.avgChord = stat.eventCount > 0
                    ? stat.chordTotal / stat.eventCount
                    : 1;
            stat.singleRatio = stat.eventCount > 0
                    ? stat.singleEventCount / stat.eventCount
                    : 1;
            stat.avgDurationBeats = stat.eventCount > 0
                    ? stat.durationTotal / stat.eventCount / division
                    : 1;
            stat.avgMotion = stat.motionCount > 0
                    ? stat.motionTotal / stat.motionCount
                    : 0;
            stat.repeatRatio = stat.motionCount > 0
                    ? stat.repeatCount / stat.motionCount
                    : 0;
            stats.push(stat);
            totalEvents += stat.eventCount;
            totalPitches += stat.pitchTotal;
            totalPitchCount += stat.pitchCount;
        }
        if (stats.length < 2) {
            continue;
        }
        stats.sort(function(first, second) {
            if (first.position !== second.position) {
                return first.position - second.position;
            }
            return first.staff - second.staff;
        });

        var partMeanPitch = totalPitchCount > 0
                ? totalPitches / totalPitchCount
                : 60;
        var crossed = bucket.hasStaffMove;
        var adjacentIndex;
        for (adjacentIndex = 1; adjacentIndex < stats.length;
                ++adjacentIndex) {
            if (stats[adjacentIndex].meanPitch
                    > stats[adjacentIndex - 1].meanPitch + 2) {
                crossed = true;
            }
        }

        var commonMomentCount = 0;
        var intervalMinimum = 1000;
        var intervalMaximum = -1000;
        var momentKey;
        if (stats.length === 2) {
            var firstStaffKey = String(stats[0].staff);
            var secondStaffKey = String(stats[1].staff);
            for (momentKey in bucket.moments) {
                if (!own(bucket.moments, momentKey)) {
                    continue;
                }
                moment = bucket.moments[momentKey];
                if (!own(moment.staffs, firstStaffKey)
                        || !own(moment.staffs, secondStaffKey)) {
                    continue;
                }
                ++commonMomentCount;
                var firstMoment = moment.staffs[firstStaffKey];
                var secondMoment = moment.staffs[secondStaffKey];
                var interval = firstMoment.top - secondMoment.top;
                intervalMinimum = Math.min(intervalMinimum, interval);
                intervalMaximum = Math.max(intervalMaximum, interval);
                if (secondMoment.top > firstMoment.top + 2) {
                    crossed = true;
                }
            }
        }

        var maximumEventCount = 1;
        for (i = 0; i < stats.length; ++i) {
            maximumEventCount = Math.max(maximumEventCount,
                                         stats[i].eventCount);
        }
        var homorhythmic = stats.length === 2
                && commonMomentCount >= 2
                && commonMomentCount / maximumEventCount >= 0.72;
        var stableInterval = commonMomentCount >= 3
                && intervalMaximum - intervalMinimum <= 3;
        var similarChordTexture = stats.length === 2
                && Math.abs(stats[0].avgChord - stats[1].avgChord) <= 0.72;
        var bothChordal = stats.length === 2
                && stats[0].avgChord >= 1.65
                && stats[1].avgChord >= 1.65;
        var naturallyBalanced = homorhythmic && similarChordTexture
                && (stableInterval || bothChordal);

        var highestScore = -1000;
        var secondScore = -1000;
        var leadStat = null;
        for (i = 0; i < stats.length; ++i) {
            stat = stats[i];
            stat.densityShare = totalEvents > 0
                    ? stat.eventCount / totalEvents
                    : 0.5;
            var registerEvidence = clamp(
                        (stat.meanPitch - partMeanPitch) / 12,
                        -1.6,
                        1.6);
            var positionalPrior = crossed
                    ? 0
                    : (stat.position === 0 ? 0.16 : -0.04);
            var densityPenalty = stat.densityShare > 0.58
                    && stat.avgChord > 1.25
                    ? (stat.densityShare - 0.58) * 0.65
                    : 0;
            stat.score = registerEvidence * 0.72
                    + stat.singleRatio * 1.05
                    - Math.max(0, stat.avgChord - 1) * 0.42
                    + clamp(stat.avgDurationBeats, 0, 2.5) * 0.14
                    + clamp(stat.avgMotion / 7, 0, 1) * 0.18
                    - stat.repeatRatio * 0.18
                    + (stat.voiceZeroCount / Math.max(1, stat.eventCount)) * 0.08
                    + positionalPrior
                    - densityPenalty
                    + stat.wholePartPriorTotal
                      / Math.max(1, stat.eventCount) * 0.72;
            if (stat.score > highestScore) {
                secondScore = highestScore;
                highestScore = stat.score;
                leadStat = stat;
            } else if (stat.score > secondScore) {
                secondScore = stat.score;
            }
        }

        var scoreDifference = highestScore - secondScore;
        var balanced = naturallyBalanced || scoreDifference < 0.38;
        var confidence = balanced
                ? 0
                : clamp((scoreDifference - 0.30) / 1.20, 0.12, 1);
        var roleByStaff = {};
        var balanceByStaff = {};
        for (i = 0; i < stats.length; ++i) {
            staffKey = String(stats[i].staff);
            if (balanced) {
                roleByStaff[staffKey] = "balanced";
                balanceByStaff[staffKey] = 0;
            } else if (stats[i].staff === leadStat.staff) {
                roleByStaff[staffKey] = "lead";
                balanceByStaff[staffKey] = 0.22 + confidence * 0.28;
            } else {
                roleByStaff[staffKey] = "support";
                balanceByStaff[staffKey] = -(0.46 + confidence * 0.54);
            }
        }

        var decision = {
            partKey: bucket.partKey,
            measurePosition: bucket.measurePosition,
            events: bucket.events,
            minTick: bucket.minTick,
            maxSoundingEnd: bucket.maxSoundingEnd,
            leadStaff: balanced ? null : String(leadStat.staff),
            leadPosition: balanced ? -1 : leadStat.position,
            confidence: confidence,
            crossed: crossed,
            roleByStaff: roleByStaff,
            balanceByStaff: balanceByStaff,
            handoff: false,
            previousDecision: null
        };
        if (!own(decisionsByPart, bucket.partKey)) {
            decisionsByPart[bucket.partKey] = [];
        }
        decisionsByPart[bucket.partKey].push(decision);
        partSeen[bucket.partKey] = true;
        ++result.comparedMeasureCount;
        if (balanced) {
            ++result.balancedMeasureCount;
        } else if (leadStat.position === 0) {
            ++result.upperLeadMeasureCount;
        } else {
            ++result.lowerLeadMeasureCount;
        }
        if (crossed) {
            ++result.crossedRegisterMeasureCount;
        }
    }

    var partKey;
    for (partKey in partSeen) {
        if (own(partSeen, partKey)) {
            ++result.comparedPartCount;
        }
    }

    for (partKey in decisionsByPart) {
        if (!own(decisionsByPart, partKey)) {
            continue;
        }
        var decisions = decisionsByPart[partKey];
        decisions.sort(function(first, second) {
            return first.measurePosition - second.measurePosition;
        });
        var decisionIndex;
        for (decisionIndex = 0; decisionIndex < decisions.length;
                ++decisionIndex) {
            decision = decisions[decisionIndex];
            var previousDecision = decisionIndex > 0
                    ? decisions[decisionIndex - 1]
                    : null;
            var connected = previousDecision
                    && decision.measurePosition
                       === previousDecision.measurePosition + 1
                    && decision.minTick - previousDecision.maxSoundingEnd
                       < division * 0.75;
            if (connected
                    && decision.leadStaff !== null
                    && previousDecision.leadStaff !== null
                    && decision.leadStaff !== previousDecision.leadStaff) {
                decision.handoff = true;
                decision.previousDecision = previousDecision;
                ++result.leadHandoffCount;
            }

            var measure = decision.measurePosition >= 0
                    && decision.measurePosition < measures.length
                    ? measures[decision.measurePosition]
                    : null;
            var measureStart = measure ? measure.startTick : decision.minTick;
            var measureDuration = measure
                    ? Math.max(1, measure.endTick - measure.startTick)
                    : division * 4;
            for (i = 0; i < decision.events.length; ++i) {
                event = decision.events[i];
                staffKey = String(Math.round(numberOr(event.staff, 0)));
                var currentBalance = own(decision.balanceByStaff, staffKey)
                        ? decision.balanceByStaff[staffKey]
                        : 0;
                if (decision.handoff) {
                    var previousBalance = own(
                                decision.previousDecision.balanceByStaff,
                                staffKey)
                            ? decision.previousDecision.balanceByStaff[staffKey]
                            : 0;
                    var handoffProgress = clamp(
                                (numberOr(event.tick, measureStart) - measureStart)
                                / Math.max(1, measureDuration * 0.55) + 0.12,
                                0,
                                1);
                    var easedHandoff = handoffProgress * handoffProgress
                            * (3 - 2 * handoffProgress);
                    currentBalance = previousBalance
                            + (currentBalance - previousBalance) * easedHandoff;
                    event._crossStaffHandoff = true;
                }
                event._crossStaffBalance = currentBalance;
                event._crossStaffRole = own(decision.roleByStaff, staffKey)
                        ? decision.roleByStaff[staffKey]
                        : "balanced";
                event._crossStaffConfidence = decision.confidence;
                event._crossStaffRegisterCrossing = decision.crossed;

                var attackCount = numberOr(event._attackedCount, 0);
                result.comparedAttackCount += attackCount;
                if (Math.abs(currentBalance) > 0.001
                        && numberOr(options.crossStaffStrength, 100) > 0) {
                    result.adjustedAttackCount += attackCount;
                }
                if (event._crossStaffRole === "lead") {
                    result.leadAttackCount += attackCount;
                } else if (event._crossStaffRole === "support") {
                    result.supportAttackCount += attackCount;
                } else {
                    result.balancedAttackCount += attackCount;
                }
                if (decision.crossed) {
                    result.crossedRegisterAttackCount += attackCount;
                }
            }
        }
    }
    return result;
}

function preparePianoHandContext(events, measures, division) {
    division = Math.max(1, numberOr(division, 480));
    var groups = {};
    var result = {
        comparedPartCount: 0,
        leadAttackCount: 0,
        supportAttackCount: 0,
        balancedAttackCount: 0,
        crossedHandAttackCount: 0,
        jumpReturnCount: 0
    };
    var i;
    for (i = 0; i < events.length; ++i) {
        var event = events[i];
        event._pianoHand = "";
        event._pianoHandRole = "unassigned";
        event._pianoHandBalance = 0;
        event._pianoCrossedHand = false;
        event._pianoJumpReturn = false;
        if (numberOr(event._attackedCount, 0) <= 0
                || typeof event._measurePosition === "undefined") {
            continue;
        }
        var descriptor = crossStaffPartDescriptor(event);
        if (!descriptor || descriptor.count < 2) {
            continue;
        }
        var measure = measures[event._measurePosition];
        var groupKey = descriptor.key + "|section:"
                + String(numberOr(measure && measure.sectionIndex, 0));
        if (!own(groups, groupKey)) {
            groups[groupKey] = {
                key: groupKey,
                events: [],
                streams: {},
                startTick: numberOr(event.tick, 0),
                endTick: eventSoundingEnd(event)
            };
        }
        var group = groups[groupKey];
        group.events.push(event);
        group.startTick = Math.min(group.startTick, numberOr(event.tick, 0));
        group.endTick = Math.max(group.endTick, eventSoundingEnd(event));
        var streamKey = String(numberOr(event.track, 0));
        if (!own(group.streams, streamKey)) {
            group.streams[streamKey] = {
                events: [],
                explicitLeft: 0,
                explicitRight: 0
            };
        }
        var stream = group.streams[streamKey];
        stream.events.push(event);
        if (event._explicitHand === "left") {
            ++stream.explicitLeft;
        } else if (event._explicitHand === "right") {
            ++stream.explicitRight;
        }
    }

    var groupKey;
    for (groupKey in groups) {
        if (!own(groups, groupKey)) {
            continue;
        }
        group = groups[groupKey];
        ++result.comparedPartCount;
        var streamKey;
        for (streamKey in group.streams) {
            if (!own(group.streams, streamKey)) {
                continue;
            }
            stream = group.streams[streamKey];
            var streamHand = "";
            var explicitTotal = stream.explicitLeft + stream.explicitRight;
            if (explicitTotal > 0
                    && (stream.events.length <= 4
                        || explicitTotal / stream.events.length >= 0.25)) {
                streamHand = stream.explicitLeft > stream.explicitRight
                        ? "left"
                        : stream.explicitRight > stream.explicitLeft
                          ? "right"
                          : "";
            }
            for (i = 0; i < stream.events.length; ++i) {
                event = stream.events[i];
                if (event._explicitHand.length > 0) {
                    event._pianoHand = event._explicitHand;
                } else if (streamHand.length > 0) {
                    event._pianoHand = streamHand;
                } else {
                    var position = Math.round(numberOr(
                                event.scorePartStaffIndex,
                                event.staff));
                    var staffCount = Math.max(2, Math.round(numberOr(
                                event.scorePartStaffCount, 2)));
                    event._pianoHand = position >= staffCount - 1
                            ? "left"
                            : "right";
                }
                var displayPosition = Math.round(numberOr(
                            event.displayStaff,
                            event.staff));
                var writtenPosition = Math.round(numberOr(event.staff, 0));
                var partPosition = Math.round(numberOr(
                            event.scorePartStaffIndex,
                            writtenPosition));
                event._pianoCrossedHand = numberOr(event.staffMove, 0) !== 0
                        || displayPosition !== writtenPosition
                        || (event._pianoHand === "left" && partPosition === 0)
                        || (event._pianoHand === "right"
                            && partPosition >= staffCount - 1);
            }
        }

        group.events.sort(function(first, second) {
            if (numberOr(first.tick, 0) !== numberOr(second.tick, 0)) {
                return numberOr(first.tick, 0) - numberOr(second.tick, 0);
            }
            return numberOr(first.track, 0) - numberOr(second.track, 0);
        });
        for (i = 0; i < group.events.length; ++i) {
            event = group.events[i];
            if (event._explicitHand.length === 0) {
                continue;
            }
            var previousHandEvent = null;
            var nextHandEvent = null;
            var neighborIndex;
            for (neighborIndex = i - 1; neighborIndex >= 0;
                    --neighborIndex) {
                if (group.events[neighborIndex]._pianoHand
                        === event._pianoHand) {
                    previousHandEvent = group.events[neighborIndex];
                    break;
                }
            }
            for (neighborIndex = i + 1;
                    neighborIndex < group.events.length; ++neighborIndex) {
                if (group.events[neighborIndex]._pianoHand
                        === event._pianoHand) {
                    nextHandEvent = group.events[neighborIndex];
                    break;
                }
            }
            if (!previousHandEvent || !nextHandEvent
                    || numberOr(event.tick, 0)
                       - numberOr(previousHandEvent.tick, 0) > division * 8
                    || numberOr(nextHandEvent.tick, 0)
                       - numberOr(event.tick, 0) > division * 8) {
                continue;
            }
            var currentCenter = (numberOr(event._topPitch, 60)
                                 + numberOr(event._bottomPitch, 60)) / 2;
            var previousCenter = (numberOr(previousHandEvent._topPitch, 60)
                                  + numberOr(previousHandEvent._bottomPitch,
                                             60)) / 2;
            var nextCenter = (numberOr(nextHandEvent._topPitch, 60)
                              + numberOr(nextHandEvent._bottomPitch, 60)) / 2;
            var neighborDistance = Math.abs(previousCenter - nextCenter);
            var excursion = Math.abs(currentCenter
                                     - (previousCenter + nextCenter) / 2);
            if (neighborDistance <= 7 && excursion >= 10) {
                event._pianoJumpReturn = true;
                event._pianoCrossedHand = true;
                ++result.jumpReturnCount;
            }
        }

        var handStats = {
            left: {
                events: [], durationTotal: 0, shortCount: 0, longCount: 0,
                chordTotal: 0, onsets: {}, score: 0
            },
            right: {
                events: [], durationTotal: 0, shortCount: 0, longCount: 0,
                chordTotal: 0, onsets: {}, score: 0
            }
        };
        for (i = 0; i < group.events.length; ++i) {
            event = group.events[i];
            var handStat = handStats[event._pianoHand];
            if (!handStat) {
                continue;
            }
            var durationBeats = Math.max(1, numberOr(event.durationTicks, 1))
                    / division;
            handStat.events.push(event);
            handStat.durationTotal += durationBeats;
            handStat.chordTotal += numberOr(event._attackedCount, 0);
            handStat.onsets[String(numberOr(event.tick, 0))] = true;
            if (durationBeats <= 0.38) {
                ++handStat.shortCount;
            }
            if (durationBeats >= 0.75) {
                ++handStat.longCount;
            }
        }

        var sectionBeats = Math.max(1,
                    (group.endTick - group.startTick) / division);
        var handName;
        for (handName in handStats) {
            if (!own(handStats, handName)) {
                continue;
            }
            handStat = handStats[handName];
            var eventCount = handStat.events.length;
            var onsetCount = 0;
            var onsetKey;
            for (onsetKey in handStat.onsets) {
                if (own(handStat.onsets, onsetKey)) {
                    ++onsetCount;
                }
            }
            var averageDuration = eventCount > 0
                    ? handStat.durationTotal / eventCount
                    : 0;
            var shortRatio = handStat.shortCount / Math.max(1, eventCount);
            var longRatio = handStat.longCount / Math.max(1, eventCount);
            var averageChord = handStat.chordTotal / Math.max(1, eventCount);
            var onsetDensity = onsetCount / sectionBeats;
            handStat.score = clamp(averageDuration, 0, 2.5) * 0.62
                    - onsetDensity * 0.22
                    - shortRatio * 0.55
                    + longRatio * 0.28
                    - Math.max(0, averageChord - 1) * 0.05;
            handStat.onsetDensity = onsetDensity;
        }

        var leadHand = "";
        var supportHand = "";
        if (handStats.left.events.length > 0
                && handStats.right.events.length > 0) {
            var handDifference = handStats.left.score
                    - handStats.right.score;
            if (Math.abs(handDifference) >= 0.28) {
                leadHand = handDifference > 0 ? "left" : "right";
                supportHand = handDifference > 0 ? "right" : "left";
            }
        }

        for (i = 0; i < group.events.length; ++i) {
            event = group.events[i];
            handStat = handStats[event._pianoHand];
            durationBeats = Math.max(1, numberOr(event.durationTicks, 1))
                    / division;
            if (event._pianoHand === leadHand) {
                event._pianoHandRole = "lead";
                event._pianoHandBalance = 0.62;
                result.leadAttackCount += numberOr(event._attackedCount, 0);
            } else if (event._pianoHand === supportHand) {
                event._pianoHandRole = "support";
                event._pianoHandBalance = -0.72;
                result.supportAttackCount += numberOr(event._attackedCount, 0);
            } else {
                event._pianoHandRole = "balanced";
                event._pianoHandBalance = 0;
                result.balancedAttackCount += numberOr(event._attackedCount, 0);
            }
            if (durationBeats <= 0.38
                    && handStat && handStat.onsetDensity >= 1.8) {
                event._pianoHandBalance -= 0.22;
            } else if (durationBeats >= 0.75) {
                event._pianoHandBalance += 0.12;
            }
            if (event._pianoJumpReturn
                    && event._pianoHandRole === "lead") {
                event._pianoHandBalance += 0.16;
            }
            event._pianoHandBalance = clamp(event._pianoHandBalance,
                                            -1.1, 1.0);
            if (event._pianoCrossedHand) {
                result.crossedHandAttackCount += numberOr(
                            event._attackedCount, 0);
            }
        }
    }
    return result;
}

function isTransientDynamic(code) {
    code = normalizeDynamicCode(code);
    return code === "fp" || code === "pf" || code === "fz"
            || code === "r" || code === "s" || code === "z"
            || code.indexOf("sf") === 0 || code.indexOf("rf") === 0;
}

function dynamicSourceSignature(event, baselines) {
    return String(numberOr(event.dynamicSourceIndex, -1)) + "|"
            + normalizeDynamicCode(event.dynamicCode) + "|"
            + String(dynamicInfo(event.dynamicCode,
                                 event.dynamicVelocity,
                                 baselines).velocity);
}

function eventSoundingEnd(event) {
    return numberOr(event.tick, 0)
            + Math.max(1, numberOr(event.durationTicks, 1));
}

function smoothStep(progress) {
    progress = clamp(numberOr(progress, 0), 0, 1);
    return progress * progress * (3 - 2 * progress);
}

function transitionMicroVariationScale(event) {
    if (!event || !event._dynamicTransitionActive) {
        return 1;
    }
    var progress = clamp(numberOr(event._dynamicTransitionProgress, 0.5),
                         0, 1);
    return clamp(0.34 + Math.abs(progress - 0.5) * 0.48, 0.34, 0.58);
}

function contextAwareDynamicTransitions(events, measures, division, enabled,
                                        baselines) {
    events = events || [];
    measures = measures || [];
    division = Math.max(1, numberOr(division, 480));

    var result = {
        transitionCount: 0,
        smoothedTransitionCount: 0,
        textGuidedTransitionCount: 0,
        rampedAttackCount: 0,
        preservedStepCount: 0,
        pauseStepCount: 0,
        suddenStepCount: 0,
        transientStepCount: 0,
        writtenRampTransitionCount: 0,
        coordinatedMultistaffTransitionCount: 0
    };
    var byStaff = {};
    var soundingByStaff = {};
    var i;

    for (i = 0; i < events.length; ++i) {
        var initialInfo = dynamicInfo(events[i].dynamicCode,
                                      events[i].dynamicVelocity,
                                      baselines);
        events[i]._contextDynamicVelocity = initialInfo.velocity;
        events[i]._dynamicTransitionActive = false;
        events[i]._dynamicTransitionProgress = 1;
        events[i]._dynamicTransitionKind = "steady";
        events[i]._dynamicTransitionStep = false;
        events[i]._dynamicTransitionCoordinated = false;

        if (!enabled) {
            continue;
        }
        var staffKey = String(events[i].dynamicTransitionGroupKey
                              || ("staff:" + String(Math.round(
                                      numberOr(events[i].staff, 0)))));
        if ((events[i].notes || []).length > 0) {
            if (!own(soundingByStaff, staffKey)) {
                soundingByStaff[staffKey] = [];
            }
            soundingByStaff[staffKey].push(events[i]);
        }
        if (numberOr(events[i]._attackedCount, 0) <= 0) {
            continue;
        }
        if (!own(byStaff, staffKey)) {
            byStaff[staffKey] = [];
        }
        byStaff[staffKey].push(events[i]);
    }

    if (!enabled) {
        return result;
    }

    var key;
    for (key in byStaff) {
        if (!own(byStaff, key)) {
            continue;
        }
        var staffEvents = byStaff[key];
        var soundingEvents = own(soundingByStaff, key)
                ? soundingByStaff[key]
                : staffEvents;
        var laneStaffSet = {};
        var laneStaffCount = 0;
        for (i = 0; i < staffEvents.length; ++i) {
            var laneStaffKey = String(Math.round(
                                      numberOr(staffEvents[i].staff, 0)));
            if (!own(laneStaffSet, laneStaffKey)) {
                laneStaffSet[laneStaffKey] = true;
                ++laneStaffCount;
            }
        }
        var coordinatedLane = key.indexOf("part:") === 0
                && laneStaffCount > 1;
        staffEvents.sort(function(first, second) {
            if (numberOr(first.tick, 0) !== numberOr(second.tick, 0)) {
                return numberOr(first.tick, 0) - numberOr(second.tick, 0);
            }
            return numberOr(first.track, 0) - numberOr(second.track, 0);
        });
        soundingEvents.sort(function(first, second) {
            if (numberOr(first.tick, 0) !== numberOr(second.tick, 0)) {
                return numberOr(first.tick, 0) - numberOr(second.tick, 0);
            }
            return numberOr(first.track, 0) - numberOr(second.track, 0);
        });

        var groups = [];
        for (i = 0; i < staffEvents.length; ++i) {
            var attack = staffEvents[i];
            var lastGroup = groups.length > 0 ? groups[groups.length - 1] : null;
            if (!lastGroup || lastGroup.tick !== numberOr(attack.tick, 0)) {
                lastGroup = {
                    tick: numberOr(attack.tick, 0),
                    events: [],
                    soundingEnd: eventSoundingEnd(attack)
                };
                groups.push(lastGroup);
            }
            lastGroup.events.push(attack);
            lastGroup.soundingEnd = Math.max(lastGroup.soundingEnd,
                                             eventSoundingEnd(attack));
        }

        var soundingIndex = 0;
        var latestSoundingEnd = -1;
        var groupIndex;
        for (groupIndex = 1; groupIndex < groups.length; ++groupIndex) {
            var previousGroup = groups[groupIndex - 1];
            var targetGroup = groups[groupIndex];
            while (soundingIndex < soundingEvents.length
                    && numberOr(soundingEvents[soundingIndex].tick, 0)
                       < targetGroup.tick) {
                latestSoundingEnd = Math.max(
                            latestSoundingEnd,
                            eventSoundingEnd(soundingEvents[soundingIndex]));
                ++soundingIndex;
            }
            var previousEvent = previousGroup.events[0];
            var targetEvent = targetGroup.events[0];
            if (dynamicSourceSignature(previousEvent, baselines)
                    === dynamicSourceSignature(targetEvent, baselines)) {
                continue;
            }
            if (!previousEvent.hasWrittenDynamic
                    && targetEvent.hasWrittenDynamic) {
                continue;
            }

            var previousBase = dynamicInfo(
                        previousEvent.dynamicCode,
                        previousEvent.dynamicVelocity,
                        baselines).velocity;
            var targetBase = dynamicInfo(
                        targetEvent.dynamicCode,
                        targetEvent.dynamicVelocity,
                        baselines).velocity;
            var velocityChange = targetBase - previousBase;
            if (velocityChange === 0) {
                continue;
            }
            ++result.transitionCount;

            var targetPosition = numberOr(targetEvent._measurePosition, -1);
            var previousPosition = numberOr(previousEvent._measurePosition, -1);
            var targetMeasure = targetPosition >= 0 && targetPosition < measures.length
                    ? measures[targetPosition]
                    : null;
            var previousMeasure = previousPosition >= 0
                    && previousPosition < measures.length
                    ? measures[previousPosition]
                    : null;
            var measureDuration = targetMeasure
                    ? Math.max(1, targetMeasure.endTick - targetMeasure.startTick)
                    : division * 4;
            var changeTick = numberOr(targetEvent.dynamicSourceTick,
                                      targetGroup.tick);
            if (changeTick < 0) {
                changeTick = targetGroup.tick;
            }
            var previousSourceTick = numberOr(previousEvent.dynamicSourceTick, -1);
            var continuityEnd = Math.max(previousGroup.soundingEnd,
                                         latestSoundingEnd);
            var restTicks = Math.max(0, targetGroup.tick - continuityEnd);

            var intervals = [];
            var intervalStart = Math.max(1, groupIndex - 8);
            var intervalIndex;
            for (intervalIndex = intervalStart;
                    intervalIndex < groupIndex;
                    ++intervalIndex) {
                var interval = groups[intervalIndex].tick
                        - groups[intervalIndex - 1].tick;
                if (interval > 0) {
                    intervals.push(interval);
                }
            }
            var typicalInterval = intervals.length > 0
                    ? median(intervals)
                    : Math.min(division, Math.max(
                          1, previousGroup.soundingEnd - previousGroup.tick));
            var longPause = restTicks >= division * 0.75
                    || restTicks >= typicalInterval * 2.25;
            var moderatePause = restTicks >= Math.max(
                        division * 0.25,
                        typicalInterval * 0.90);
            var sectionBoundary = !!(targetMeasure && previousMeasure
                    && targetMeasure.sectionIndex !== previousMeasure.sectionIndex);
            var phraseBoundary = !!(targetMeasure && previousMeasure
                    && targetMeasure.phraseIndex !== previousMeasure.phraseIndex);
            var explicitBoundary = !!(targetMeasure
                    && targetMeasure.explicitBoundary
                    && targetGroup.tick <= targetMeasure.startTick + division / 8);
            var phraseBreak = !!(previousEvent.articulation
                    && previousEvent.articulation.phraseBreak);
            var strongArrival = !!(targetEvent.articulation
                    && numberOr(targetEvent.articulation.attack, 0) >= 1.2);
            var targetExpression = targetEvent.expression || expressionInfo("");
            var targetExpressionTick = numberOr(targetEvent.expressionSourceTick, -1);
            var recentSuddenText = targetExpression.sudden
                    && targetExpressionTick >= Math.max(previousSourceTick, 0)
                    && targetExpressionTick <= targetGroup.tick
                    && targetGroup.tick - targetExpressionTick
                       <= measureDuration * 1.5;
            var transientDynamic = isTransientDynamic(targetEvent.dynamicCode);

            var hasWrittenRamp = false;
            var scanStart = Math.max(0, groupIndex - 24);
            var scanIndex;
            for (scanIndex = scanStart; scanIndex <= groupIndex; ++scanIndex) {
                var scanEvents = groups[scanIndex].events;
                var scanEventIndex;
                for (scanEventIndex = 0;
                        scanEventIndex < scanEvents.length;
                        ++scanEventIndex) {
                    if (scanEvents[scanEventIndex]._hairpinActive) {
                        hasWrittenRamp = true;
                        break;
                    }
                }
                if (hasWrittenRamp) {
                    break;
                }
            }

            var immediateReason = "";
            if (hasWrittenRamp) {
                ++result.writtenRampTransitionCount;
                continue;
            } else if (recentSuddenText) {
                immediateReason = "subito";
                ++result.suddenStepCount;
            } else if (transientDynamic) {
                immediateReason = "transient";
                ++result.transientStepCount;
            } else if (longPause || phraseBreak) {
                immediateReason = "pause";
                ++result.pauseStepCount;
            } else if (moderatePause
                       && (sectionBoundary || phraseBoundary
                           || explicitBoundary || strongArrival)) {
                immediateReason = "re-entry";
                ++result.pauseStepCount;
            } else if (strongArrival
                       && (sectionBoundary || explicitBoundary)) {
                immediateReason = "accented entry";
            }

            if (immediateReason.length > 0) {
                ++result.preservedStepCount;
                var immediateEventIndex;
                for (immediateEventIndex = 0;
                        immediateEventIndex < targetGroup.events.length;
                        ++immediateEventIndex) {
                    targetGroup.events[immediateEventIndex]._dynamicTransitionStep = true;
                    targetGroup.events[immediateEventIndex]._dynamicTransitionKind
                            = immediateReason;
                }
                continue;
            }

            var tempo = clamp(numberOr(targetEvent.tempoBpm, 120), 20, 400);
            var tempoFactor = clamp(Math.sqrt(tempo / 120), 0.78, 1.22);
            var windowMeasures = clamp(
                        0.52 + Math.abs(velocityChange) / 42,
                        0.62,
                        1.45);
            var windowTicks = measureDuration * windowMeasures * tempoFactor;
            windowTicks *= clamp(
                        1 - numberOr(targetExpression.tempoDirection, 0) * 0.10,
                        0.86,
                        1.14);
            windowTicks = clamp(windowTicks, division * 1.25,
                                measureDuration * 1.75);
            var automaticStartTick = changeTick - windowTicks;
            if (previousSourceTick >= 0) {
                automaticStartTick = Math.max(automaticStartTick,
                                              previousSourceTick);
            }

            var hintTick = -1;
            var hintScan;
            var changeDirection = velocityChange > 0 ? 1 : -1;
            for (hintScan = groupIndex - 1; hintScan >= 0; --hintScan) {
                var hintGroup = groups[hintScan];
                if (hintGroup.tick < Math.max(previousSourceTick, 0)) {
                    break;
                }
                var hintEvent = hintGroup.events[0];
                var hintInfo = hintEvent.expression || expressionInfo("");
                var sourceTick = numberOr(hintEvent.expressionSourceTick, -1);
                if (hintInfo.gradual && sourceTick >= Math.max(previousSourceTick, 0)
                        && sourceTick < changeTick
                        && (numberOr(hintInfo.dynamicDirection, 0) === 0
                            || numberOr(hintInfo.dynamicDirection, 0)
                               === changeDirection)) {
                    hintTick = sourceTick;
                }
            }
            var rampStartTick = hintTick >= 0 ? hintTick : automaticStartTick;
            var startGroupIndex = groupIndex - 1;
            while (startGroupIndex > 0
                    && groups[startGroupIndex - 1].tick >= rampStartTick) {
                --startGroupIndex;
            }

            var preAttackGroupCount = groupIndex - startGroupIndex;
            var endGroupIndex = groupIndex;
            if (preAttackGroupCount < 4) {
                var desiredAdditional = 4 - preAttackGroupCount;
                var futureIndex = groupIndex + 1;
                while (futureIndex < groups.length && desiredAdditional > 0
                        && groups[futureIndex].tick
                           <= targetGroup.tick + windowTicks * 0.65
                        && dynamicSourceSignature(
                               groups[futureIndex].events[0], baselines)
                           === dynamicSourceSignature(targetEvent, baselines)) {
                    endGroupIndex = futureIndex;
                    --desiredAdditional;
                    ++futureIndex;
                }
            }

            if (endGroupIndex - startGroupIndex + 1 < 3) {
                ++result.preservedStepCount;
                var sparseIndex;
                for (sparseIndex = 0;
                        sparseIndex < targetGroup.events.length;
                        ++sparseIndex) {
                    targetGroup.events[sparseIndex]._dynamicTransitionStep = true;
                    targetGroup.events[sparseIndex]._dynamicTransitionKind
                            = "insufficient context";
                }
                continue;
            }

            var rampStart = groups[startGroupIndex].tick;
            var rampEnd = endGroupIndex > groupIndex
                    ? groups[endGroupIndex].tick
                    : Math.max(changeTick, targetGroup.tick);
            if (rampEnd <= rampStart) {
                rampEnd = groups[endGroupIndex].tick;
            }
            if (rampEnd <= rampStart) {
                ++result.preservedStepCount;
                continue;
            }

            var rampKind = hintTick >= 0 ? "text-guided" : "context-smoothed";
            var shapedAnyAttack = false;
            var rampGroupIndex;
            for (rampGroupIndex = startGroupIndex;
                    rampGroupIndex <= endGroupIndex;
                    ++rampGroupIndex) {
                var rampGroup = groups[rampGroupIndex];
                var progress = smoothStep(
                            (rampGroup.tick - rampStart)
                            / Math.max(1, rampEnd - rampStart));
                var shapedVelocity = clamp(
                            Math.round(previousBase
                                       + velocityChange * progress),
                            1,
                            127);
                var rampEventIndex;
                for (rampEventIndex = 0;
                        rampEventIndex < rampGroup.events.length;
                        ++rampEventIndex) {
                    var rampEvent = rampGroup.events[rampEventIndex];
                    var writtenVelocity = dynamicInfo(
                                rampEvent.dynamicCode,
                                rampEvent.dynamicVelocity,
                                baselines).velocity;
                    rampEvent._contextDynamicVelocity = shapedVelocity;
                    rampEvent._dynamicTransitionProgress = progress;
                    rampEvent._dynamicTransitionKind = rampKind;
                    rampEvent._dynamicTransitionCoordinated = coordinatedLane;
                    if (shapedVelocity !== writtenVelocity) {
                        rampEvent._dynamicTransitionActive = true;
                        result.rampedAttackCount += numberOr(
                                    rampEvent._attackedCount, 0);
                        shapedAnyAttack = true;
                    }
                }
            }
            if (shapedAnyAttack) {
                ++result.smoothedTransitionCount;
                if (hintTick >= 0) {
                    ++result.textGuidedTransitionCount;
                }
                if (coordinatedLane) {
                    ++result.coordinatedMultistaffTransitionCount;
                }
            } else {
                ++result.preservedStepCount;
            }
        }
    }

    return result;
}

function beatComponent(event, measure) {
    var duration = Math.max(1, measure.endTick - measure.startTick);
    var position = clamp((event.tick - measure.startTick) / duration, 0, 0.999999);
    var numerator = Math.max(1, measure.numerator);
    var compound = numerator > 3 && numerator % 3 === 0;
    var groupCount = compound ? numerator / 3 : numerator;
    var groupPosition = position * groupCount;
    var groupIndex = Math.floor(groupPosition + 0.000001);
    var withinGroup = groupPosition - groupIndex;
    var nearBeat = withinGroup < 0.075 || withinGroup > 0.925;
    var beatTicks = duration / groupCount;
    var longSyncopation = numberOr(event.durationTicks, 0) >= beatTicks * 0.9;

    if (nearBeat) {
        if (groupIndex === 0) {
            return 1.0;
        }
        if (groupCount === 4 && groupIndex === 2) {
            return 0.43;
        }
        return 0.18;
    }

    return longSyncopation ? 0.04 : -0.30;
}

function phraseProgress(event, measure) {
    var measureDuration = Math.max(1, measure.endTick - measure.startTick);
    var withinMeasure = clamp((event.tick - measure.startTick) / measureDuration, 0, 0.999999);
    var phraseLength = Math.max(1, measure.phraseEnd - measure.phraseStart);
    return clamp(
                ((event._measurePosition - measure.phraseStart) + withinMeasure) / phraseLength,
                0,
                1);
}

function phraseComponent(event, measure) {
    var progress = phraseProgress(event, measure);
    var arch = Math.sin(Math.PI * progress) - 0.55;

    if (progress < 0.11) {
        arch -= (0.11 - progress) / 0.11 * 0.18;
    }
    if (progress > 0.82) {
        arch -= (progress - 0.82) / 0.18 * 0.58;
    }
    return arch;
}

function contourComponent(event) {
    if (event._topPitch < 0) {
        return 0;
    }
    var previous = event._previousTop;
    var next = event._nextTop;
    var current = event._topPitch;
    var result = 0;

    if (current > previous && current >= next && current - Math.min(previous, next) >= 3) {
        result += 0.78;
    }
    if (Math.abs(current - previous) >= 7) {
        result += 0.58;
    }
    if (current < previous && current <= next && Math.max(previous, next) - current >= 5) {
        result -= 0.24;
    }
    return result;
}

function structuralDetailComponent(event, measure) {
    var result = 0;
    if (event._isLocalPeak && numberOr(event._leapArrival, 0) >= 3) {
        result += clamp(numberOr(event._leapArrival, 0) / 12,
                        0.12, 0.62);
    } else if (event._isLocalLow && numberOr(event._leapArrival, 0) >= 5) {
        result -= 0.16;
    }
    if (event._sameChordRepeat) {
        result -= Math.min(0.26,
                           0.05 + numberOr(event._repeatStreak, 0) * 0.035);
    }
    var previousDuration = Math.max(1, numberOr(
                    event._previousDurationTicks,
                    event.durationTicks));
    var durationRatio = Math.max(1, numberOr(event.durationTicks, 1))
            / previousDuration;
    if (durationRatio >= 1.8 && numberOr(measure.structuralClimax, 0) > 0.25) {
        result += 0.18;
    }
    return result;
}

function chordContextComponent(event, measure, profile) {
    var count = Math.max(0, numberOr(event._attackedCount, 0));
    if (count <= 1) {
        return 0;
    }
    var mass = Math.log(Math.max(1, count)) / Math.log(2);
    var compensation = -mass * 0.42;
    var repeatedContext = event._sameChordRepeat
            || (numberOr(event._partRepeatedChordRatio, 0) >= 0.42
                && numberOr(event._partOnsetDensity, 0) >= 1.1);
    if (repeatedContext) {
        compensation -= 0.28;
    }

    var articulation = event.articulation || articulationInfo([]);
    var longArrival = Math.max(1, numberOr(event.durationTicks, 1))
            >= Math.max(1, numberOr(event._previousDurationTicks, 1)) * 1.45;
    var structuralPeak = numberOr(measure.structuralClimax, 0) >= 0.62
            && numberOr(measure.structuralEnergy, 0) >= 0.34;
    var supportedArrival = structuralPeak
            && (longArrival || numberOr(articulation.attack, 0) >= 0.7
                || numberOr(measure.structuralEnding, 0) < -0.18);
    if (supportedArrival) {
        compensation += Math.min(0.84,
                                 0.36
                                 + numberOr(measure.structuralClimax, 0) * 0.34);
    }
    return compensation * numberOr(profile.chordContext, 1);
}

function dynamicTransitionComponent(event) {
    if (!event.dynamicChanged || event._dynamicTransitionActive) {
        return 0;
    }
    return event._dynamicTransitionStep
            ? clamp(numberOr(event.dynamicChangeDelta, 0) * 0.08, -0.4, 0.4)
            : 0;
}

function tempoComponent(measure, tempoCenter) {
    var localTempo = clamp(numberOr(measure.tempoBpm, tempoCenter), 20, 400);
    var center = clamp(numberOr(tempoCenter, 120), 20, 400);
    return clamp(Math.log(localTempo / center) / Math.log(2), -1, 1) * 0.78;
}

function tempoVariationScale(event, tempoCenter) {
    var localTempo = clamp(numberOr(event.tempoBpm, tempoCenter), 20, 400);
    var center = clamp(numberOr(tempoCenter, 120), 20, 400);
    return clamp(Math.sqrt(center / localTempo), 0.76, 1.24);
}

function expressionComponent(event, profile) {
    var info = event.expression || expressionInfo("");
    return numberOr(info.energy, 0) * numberOr(profile.expression, 1)
            + numberOr(info.attack, 0) * numberOr(profile.expression, 1) * 0.72;
}

function articulationComponent(event, profile) {
    var info = event.articulation || articulationInfo([]);
    return numberOr(info.attack, 0) * numberOr(profile.articulation, 1);
}

function slurComponent(event, profile) {
    var articulation = event.articulation || articulationInfo([]);
    if (numberOr(event._slurCount, 0) <= 0 && !articulation.slurLike) {
        return 0;
    }
    var progress = clamp(numberOr(event._slurPosition, 0.5), 0, 1);
    var result = Math.sin(Math.PI * progress) * 0.34 - 0.10;
    if (event._slurStarts) {
        result += 0.18;
    }
    if (event._slurEnds) {
        result -= 0.48;
    }
    return result * numberOr(profile.slur, 1);
}

function crossStaffComponent(event, options, profile) {
    var modeScale = clamp(numberOr(options.crossStaffStrength, 100) / 100,
                          0, 1.5);
    if (modeScale <= 0) {
        return 0;
    }
    var melodyScale = clamp(numberOr(options.melodyEmphasis, 55) / 55,
                            0.35, 1.45);
    return numberOr(event._crossStaffBalance, 0)
            * numberOr(profile.crossStaff, 1)
            * modeScale
            * melodyScale;
}

function pianoHandComponent(event, options, profile) {
    var modeScale = clamp(numberOr(options.crossStaffStrength, 100) / 100,
                          0, 1.5);
    return numberOr(event._pianoHandBalance, 0)
            * numberOr(profile.crossStaff, 1)
            * modeScale * 1.18;
}

function noteVoicingComponent(event, note, options, profile) {
    var melodyScale = clamp(numberOr(options.melodyEmphasis, 55) / 100,
                            0, 1.4);
    var voicingScale = 0.32 + melodyScale * 0.92;
    var result = 0;
    var attackedCount = numberOr(event._attackedCount, 0);
    var pitch = numberOr(note.pitch, 60);

    if (attackedCount > 1) {
        var shape = numberOr(note._chordVoicingShape, 0);
        if (shape === 0) {
            shape = pitch === event._topPitch
                    ? 0.72
                    : pitch === event._bottomPitch ? -0.18 : -0.34;
        }
        var contextScale = 1;
        if (event._crossStaffRole === "lead") {
            contextScale += 0.10;
        } else if (event._crossStaffRole === "support") {
            contextScale -= 0.16;
        }
        contextScale += clamp(numberOr(event._wholePartRolePrior, 0),
                              -0.52, 0.34) * 0.18;
        result += shape * numberOr(profile.voicing, 1)
                * voicingScale * contextScale;
    }

    if (event._simultaneousStaffEvents > 1) {
        if (event._isStaffMelody) {
            result += profile.voicing * melodyScale * 0.72;
        } else {
            result -= profile.voicing * melodyScale * 0.62;
        }
    }

    return result;
}

function eventBaseComponent(event, measure, options, profile,
                            activityCenter, activityScale, tempoCenter) {
    var result = 0;
    var expression = event.expression || expressionInfo("");

    if (options.shapePhrases) {
        result += phraseComponent(event, measure) * profile.phrase
                * numberOr(expression.phraseScale, 1);
    }

    result += measure.sectionEnergy * profile.section;
    result += measure.localEnergy * profile.section * 0.33;
    result += numberOr(measure.structuralEnergy, 0)
            * numberOr(profile.structure, 1);
    result += numberOr(measure.structuralClimax, 0)
            * numberOr(profile.climax, 1) * 0.26;
    result += numberOr(measure.structuralEnding, 0)
            * numberOr(profile.ending, 1);
    result += numberOr(measure.patternEnergy, 0) * numberOr(profile.pattern, 1);
    result += tempoComponent(measure, tempoCenter) * numberOr(profile.tempo, 1);
    result += expressionComponent(event, profile);
    result += articulationComponent(event, profile);
    result += slurComponent(event, profile);
    result += crossStaffComponent(event, options, profile);
    result += pianoHandComponent(event, options, profile);
    result += chordContextComponent(event, measure, profile);

    if (options.adaptTexture) {
        var globalDensity = clamp((measure.activity - activityCenter) / (activityScale * 2), -1, 1);
        result -= Math.max(0, globalDensity) * profile.texture * 0.62;
        result += Math.max(0, -globalDensity) * profile.texture * 0.16;
    }

    if (options.meterAccents) {
        result += beatComponent(event, measure) * profile.meter
                * numberOr(expression.meterScale, 1)
                * transitionMicroVariationScale(event);
    }

    result += contourComponent(event) * profile.contour;
    result += structuralDetailComponent(event, measure)
            * numberOr(profile.human, 1)
            * (options.humanVariation / 100);
    result += dynamicTransitionComponent(event);
    return result;
}

function capForStrength(base, strengthScale) {
    if (strengthScale <= 0 || base <= 0) {
        return 0;
    }
    return Math.max(1, Math.round(base * clamp(0.52 + strengthScale * 0.48, 0.52, 1.45)));
}

function analyze(data, rawOptions) {
    data = data || {};
    var options = normalizedOptions(rawOptions);
    var profile = options.profile;
    var events = (data.events || []).slice(0);
    events.sort(function(first, second) {
        if (numberOr(first.tick, 0) !== numberOr(second.tick, 0)) {
            return numberOr(first.tick, 0) - numberOr(second.tick, 0);
        }
        return numberOr(first.track, 0) - numberOr(second.track, 0);
    });

    var dynamicAssignment = data.dynamicEvents
            ? assignDynamics(events, data.dynamicEvents)
            : {
                dynamicEventCount: 0,
                transitionAttackCount: numberOr(data.transitionAttackCount, 0)
            };
    var expressionAssignment = assignExpressions(events, data.expressionEvents);
    var articulationAssignment = assignArticulations(events);
    var measures = prepareMeasures(data);
    var positionByIndex = measurePositionMap(measures);
    var spannerAssignment = assignSpannerContext(
                events,
                measures,
                data.slurs,
                data.hairpins);

    populateMeasureStats(measures, events, positionByIndex);
    var character = classifyPieceCharacter(
                measures,
                events,
                data.dynamicEvents,
                options.baselines,
                data.division);
    options = applyNaturalCalibration(options, character);
    profile = options.profile;
    analyzeMeasurePatterns(measures);
    computeChangeScores(measures);

    var activities = [];
    var tempos = [];
    var i;
    for (i = 0; i < measures.length; ++i) {
        activities.push(measures[i].activity);
        if (measures[i].noteCount > 0) {
            tempos.push(measures[i].tempoBpm);
        }
    }
    var activityCenter = median(activities);
    var activityScale = deviationScale(activities, activityCenter);
    var tempoCenter = tempos.length > 0 ? median(tempos) : 120;

    var sections = detectSections(measures, options, activityCenter, activityScale);
    var recurringSectionGroupCount = groupRecurringSections(sections, measures);
    var naturalConsistency = applyNaturalScoreConsistency(
                options,
                measures,
                sections,
                data.dynamicEvents,
                character);
    var phrases = detectPhrases(measures, sections);
    var structuralAssignment = prepareStructuralExpression(
                measures,
                sections,
                character);
    prepareContour(events);
    var wholePartAssignment = prepareWholePartContext(
                events,
                measures,
                data.division);
    var crossStaffAssignment = prepareCrossStaffRoles(
                events,
                measures,
                data.division,
                options);
    var pianoHandAssignment = preparePianoHandContext(
                events,
                measures,
                data.division);
    var contextualTransitions = contextAwareDynamicTransitions(
                events,
                measures,
                data.division,
                !!(data.dynamicEvents && data.dynamicEvents.length > 0),
                options.baselines);
    var inferredDynamics = inferDynamicPlan(
                events,
                measures,
                data.dynamicEvents,
                character,
                options);

    var deltas = {};
    var baseVelocities = {};
    var changedCount = 0;
    var consideredCount = 0;
    var dynamicCounts = {};
    var coverageByMeasure = {};
    var strengthScale = options.strength / 60;

    for (i = 0; i < events.length; ++i) {
        var event = events[i];
        if (typeof event._measurePosition === "undefined" || event._attackedCount <= 0) {
            continue;
        }

        var measure = measures[event._measurePosition];
        var writtenInfo = dynamicInfo(event.dynamicCode,
                                      event.dynamicVelocity,
                                      options.baselines);
        var contextBase = numberOr(event._contextDynamicVelocity,
                                   writtenInfo.velocity);
        var effectiveBase = clamp(
                    Math.round(contextBase
                               + numberOr(event._hairpinBaseOffset, 0)),
                    1,
                    127);
        var info = dynamicInfoAtVelocity(event.dynamicCode, effectiveBase);
        var dynamicKey = event.hasWrittenDynamic
                ? (writtenInfo.code === "custom"
                   ? "custom@" + String(writtenInfo.velocity)
                   : writtenInfo.code)
                : "inferred-" + String(event._inferredDynamicCode || "mf");
        dynamicCounts[dynamicKey] = (dynamicCounts[dynamicKey] || 0) + event._attackedCount;

        var eventBase = eventBaseComponent(
                    event,
                    measure,
                    options,
                    profile,
                    activityCenter,
                    activityScale,
                    tempoCenter);
        var expression = event.expression || expressionInfo("");
        var articulation = event.articulation || articulationInfo([]);
        if (event.hasWrittenDynamic
                && numberOr(event.tick, -2)
                   === numberOr(event.dynamicSourceTick, -1)) {
            // 書かれた強弱の開始音では、全体推定より記号を優先
            eventBase *= isTransientDynamic(event.dynamicCode) ? 0.72 : 0.48;
        }

        var maxUp = capForStrength(profile.maxUp, strengthScale);
        var maxDown = capForStrength(profile.maxDown, strengthScale);
        maxUp = Math.min(maxUp, info.hardMaxUp);
        maxDown = Math.min(maxDown, info.hardMaxDown);
        if (options.dynamicHeadroom) {
            maxUp = Math.min(maxUp, info.maxUp);
            maxDown = Math.min(maxDown, info.maxDown);
        }

        var notes = event.notes || [];
        var j;
        for (j = 0; j < notes.length; ++j) {
            var note = notes[j];
            if (note.tied || !note.key) {
                continue;
            }

            var performanceScale = strengthScale * info.scale
                    * numberOr(profile.gain, 1)
                    * numberOr(expression.variationScale, 1)
                    * numberOr(articulation.variationScale, 1)
                    * tempoVariationScale(event, tempoCenter);
            var commonDelta = Math.round(clamp(
                        eventBase * performanceScale,
                        -maxDown,
                        maxUp));
            var voicingDelta = Math.round(noteVoicingComponent(
                        event, note, options, profile) * performanceScale);
            if (strengthScale > 0 && numberOr(event._attackedCount, 0) > 1) {
                var voicingShape = numberOr(note._chordVoicingShape, 0);
                if (voicingShape >= 0.35) {
                    voicingDelta = Math.max(1, voicingDelta);
                } else if (voicingShape <= -0.15) {
                    voicingDelta = Math.min(-1, voicingDelta);
                }
            }
            var delta = strengthScale <= 0
                    ? 0
                    : Math.round(clamp(commonDelta + voicingDelta,
                                       -maxDown, maxUp));
            deltas[note.key] = delta;
            baseVelocities[note.key] = info.velocity;
            ++consideredCount;

            var coverageKey = String(event._measurePosition);
            if (!own(coverageByMeasure, coverageKey)) {
                coverageByMeasure[coverageKey] = {
                    considered: 0,
                    changed: 0
                };
            }
            var coverage = coverageByMeasure[coverageKey];
            ++coverage.considered;
            if (delta !== 0) {
                ++changedCount;
                ++coverage.changed;
            }
        }
    }

    var coverageKey;
    var processedMeasureCount = 0;
    var changedMeasureCount = 0;
    var measureChangeCounts = {};
    for (coverageKey in coverageByMeasure) {
        if (!own(coverageByMeasure, coverageKey)) {
            continue;
        }
        ++processedMeasureCount;
        if (coverageByMeasure[coverageKey].changed > 0) {
            ++changedMeasureCount;
        }
        measureChangeCounts[coverageKey] = coverageByMeasure[coverageKey].changed;
    }

    var deltaMinimum = null;
    var deltaMaximum = null;
    var deltaKey;
    for (deltaKey in deltas) {
        if (!own(deltas, deltaKey)) {
            continue;
        }
        deltaMinimum = deltaMinimum === null
                ? deltas[deltaKey]
                : Math.min(deltaMinimum, deltas[deltaKey]);
        deltaMaximum = deltaMaximum === null
                ? deltas[deltaKey]
                : Math.max(deltaMaximum, deltas[deltaKey]);
    }

    var tempoMinimum = null;
    var tempoMaximum = null;
    var patternMatchCount = 0;
    for (i = 0; i < measures.length; ++i) {
        if (measures[i].noteCount > 0) {
            tempoMinimum = tempoMinimum === null
                    ? measures[i].tempoBpm
                    : Math.min(tempoMinimum, measures[i].tempoBpm);
            tempoMaximum = tempoMaximum === null
                    ? measures[i].tempoBpm
                    : Math.max(tempoMaximum, measures[i].tempoBpm);
        }
        if (measures[i].patternSource >= 0) {
            ++patternMatchCount;
        }
    }

    var suggestedControls = {
        strength: options.strength,
        sectionSensitivity: options.sectionSensitivity,
        melodyEmphasis: options.melodyEmphasis,
        crossStaffStrength: options.crossStaffStrength,
        humanVariation: options.humanVariation,
        phraseMeasures: options.phraseMeasures,
        baselines: copyObject(options.baselines)
    };

    return {
        engineVersion: ENGINE_VERSION,
        deltas: deltas,
        baseVelocities: baseVelocities,
        consideredCount: consideredCount,
        changedCount: changedCount,
        processedMeasureCount: processedMeasureCount,
        changedMeasureCount: changedMeasureCount,
        totalMeasureCount: measures.length,
        measureChangeCounts: measureChangeCounts,
        sectionCount: sections.length,
        phraseCount: phrases.length,
        sections: sections,
        phrases: phrases,
        dynamicCounts: dynamicCounts,
        dynamicInferenceMode: inferredDynamics.mode,
        inferredDynamicChangeCount: inferredDynamics.inferredChangeCount,
        inferredDynamicAttackCount: inferredDynamics.inferredAttackCount,
        inferredStartingDynamic: inferredDynamics.startingCode,
        inferredStartingVelocity: inferredDynamics.startingVelocity,
        inferredDynamicMinimum: inferredDynamics.minimum,
        inferredDynamicMaximum: inferredDynamics.maximum,
        detectedCharacter: character.name,
        detectedCharacterConfidence: character.confidence,
        characterMetrics: character,
        naturalConsistency: naturalConsistency,
        suggestedControls: suggestedControls,
        structuralEntryCount: structuralAssignment.entryCount,
        structuralEndingCount: structuralAssignment.endingCount,
        wholePartSectionCount: wholePartAssignment.partSectionCount,
        wholePartAttackCount: wholePartAssignment.fullPartAttackCount,
        chordContextAttackCount: wholePartAssignment.chordContextAttackCount,
        deltaMinimum: deltaMinimum,
        deltaMaximum: deltaMaximum,
        tempoCenter: tempoCenter,
        tempoMinimum: tempoMinimum,
        tempoMaximum: tempoMaximum,
        dynamicEventCount: dynamicAssignment.dynamicEventCount,
        transitionAttackCount: dynamicAssignment.transitionAttackCount,
        contextualDynamicTransitionCount: contextualTransitions.transitionCount,
        smoothedDynamicTransitionCount: contextualTransitions.smoothedTransitionCount,
        textGuidedDynamicTransitionCount: contextualTransitions.textGuidedTransitionCount,
        rampedDynamicAttackCount: contextualTransitions.rampedAttackCount,
        preservedDynamicStepCount: contextualTransitions.preservedStepCount,
        pauseSeparatedDynamicStepCount: contextualTransitions.pauseStepCount,
        suddenDynamicStepCount: contextualTransitions.suddenStepCount,
        transientDynamicStepCount: contextualTransitions.transientStepCount,
        writtenRampTransitionCount: contextualTransitions.writtenRampTransitionCount,
        coordinatedMultistaffTransitionCount:
                contextualTransitions.coordinatedMultistaffTransitionCount,
        crossStaffComparedPartCount: crossStaffAssignment.comparedPartCount,
        crossStaffComparedMeasureCount: crossStaffAssignment.comparedMeasureCount,
        crossStaffComparedAttackCount: crossStaffAssignment.comparedAttackCount,
        crossStaffAdjustedAttackCount: crossStaffAssignment.adjustedAttackCount,
        crossStaffLeadAttackCount: crossStaffAssignment.leadAttackCount,
        crossStaffSupportAttackCount: crossStaffAssignment.supportAttackCount,
        crossStaffBalancedAttackCount: crossStaffAssignment.balancedAttackCount,
        upperLeadMeasureCount: crossStaffAssignment.upperLeadMeasureCount,
        lowerLeadMeasureCount: crossStaffAssignment.lowerLeadMeasureCount,
        balancedCrossStaffMeasureCount: crossStaffAssignment.balancedMeasureCount,
        crossedRegisterMeasureCount:
                crossStaffAssignment.crossedRegisterMeasureCount,
        crossedRegisterAttackCount:
                crossStaffAssignment.crossedRegisterAttackCount,
        crossStaffLeadHandoffCount: crossStaffAssignment.leadHandoffCount,
        pianoHandComparedPartCount: pianoHandAssignment.comparedPartCount,
        pianoHandLeadAttackCount: pianoHandAssignment.leadAttackCount,
        pianoHandSupportAttackCount: pianoHandAssignment.supportAttackCount,
        pianoHandBalancedAttackCount: pianoHandAssignment.balancedAttackCount,
        crossedHandAttackCount: pianoHandAssignment.crossedHandAttackCount,
        pianoHandJumpReturnCount: pianoHandAssignment.jumpReturnCount,
        recognizedExpressionCount: expressionAssignment.recognizedMarkCount,
        recognizedHandCueCount: expressionAssignment.recognizedHandCueCount,
        assignedHandCueCount: expressionAssignment.assignedHandCueCount,
        leftHandCueCount: expressionAssignment.leftHandCueCount,
        rightHandCueCount: expressionAssignment.rightHandCueCount,
        resolvedGradualExpressionCount:
                expressionAssignment.resolvedGradualMarkCount,
        recognizedArticulationAttackCount: articulationAssignment.recognizedAttackCount,
        phraseBreakCount: articulationAssignment.phraseBreakCount,
        slurredAttackCount: spannerAssignment.slurredAttackCount,
        hairpinAttackCount: spannerAssignment.hairpinAttackCount,
        recurringSectionGroupCount: recurringSectionGroupCount,
        patternMatchCount: patternMatchCount,
        analysisPassCount: 14
    };
}
