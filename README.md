# 奏脈 • Somyaku

奏脈は、MuseScore Studio 4 の鍵盤パートをより自然に再生するための、ローカル完結・決定論的な演奏解釈プラグインです。MuseScore Studio 4.7 を検証対象としています。古い MuseScore 4 でも動く可能性はありますが未検証です。

Somyaku is a fully local, deterministic performance-interpretation plugin for keyboard parts in MuseScore Studio 4. MuseScore Studio 4.7 is the tested target. Older MuseScore 4 versions may work, but are untested.

**Version 1.0.0** — 記譜、音符、テンポマップ、レイアウトは書き換えず、対応する鍵盤音符の再生ベロシティだけを調整します。

**Version 1.0.0** — Somyaku does not rewrite notation, notes, the tempo map, or layout. It adjusts playback velocity only for supported keyboard notes.

## 奏脈とは • What Somyaku does

奏脈は、書かれた強弱、テンポ、表情、奏法、アーティキュレーション、休符、反復、セクション境界などを読み取り、対象となる鍵盤パートを曲の最初から最後まで解析します。フレーズ、旋律と伴奏、手の受け渡し、和音内の役割などもまとめて判断します。

Somyaku reads written dynamics, tempo, expression, technique, articulation, rests, repetition, and section boundaries, then analyzes each supported keyboard part across the complete piece. It also considers phrasing, melody and accompaniment roles, handoffs, and balance within chords.

混合編成の楽譜では、曲全体の時間軸や全体にかかるテンポ・セクション情報は参照しますが、ヴァイオリンやヴィオラなど非対応楽器の音符をピアノの旋律・密度・和音解析へ混ぜません。非対応楽器にはベロシティを書き込みません。

In mixed-instrument scores, Somyaku can use the complete score timeline and genuinely global information such as tempo or section markers, but notes from unsupported instruments such as violin or viola are not mixed into the piano's melody, density, or chord analysis. Unsupported instruments are never written to.

同じ楽譜と同じ設定からは、毎回同じ結果が得られます。乱数による「人間らしさ」は加えません。

The same score and settings always produce the same result. Somyaku does not add random “humanization.”

## 主な特長 • Highlights

- **曲全体を見てから演奏を整えます。** 選択範囲に適用する場合も解析は曲全体で行い、変更するのは選択した対応鍵盤音符だけです。

  **It considers the complete piece before shaping playback.** Apply to selection still analyzes the full piece, then changes only the selected supported keyboard notes.

- **書かれた強弱を強い基準として扱います。** フレーズやクライマックスは強弱の中で自然に動き、通常の `f` が理由なく `fff` に近づくような過度な飛び出しを抑えます。本物のクレッシェンド／ディミヌエンドは次の強弱へ自然に移動できます。

  **Written dynamics act as strong anchors.** Phrase and climax shaping can breathe around the written level without letting a normal `f` drift toward `fff` without musical justification. Real crescendos and diminuendos can still travel naturally toward their destination level.

- **繰り返しをむやみに揺らしません。** 安定したオスティナートや伴奏は、楽譜に根拠がない限り毎回違う強さにはしません。

  **Repeating material stays coherent.** Stable ostinatos and accompaniment patterns do not receive arbitrary note-by-note pumping without evidence in the score.

- **上段＝右手／旋律とは決めません。** 手の交差、持続音、受け渡し、音域、声部の連続性などから役割を判断します。

  **The upper staff is not automatically treated as right hand or melody.** Crossings, sustained gestures, handoffs, register, and voice continuity are considered together.

- **和音は音数だけで大きくしません。** 同時発音には、旋律・低音・内声などの役割に応じた小さな決定論的な差を付けます。

  **Chord size alone does not make a chord louder.** Simultaneous notes receive small deterministic differences based on melodic, bass, and inner-voice roles.

- **装飾音は主音との関係で扱います。** 記譜された短い前打音は通常、主音より少し控えめに扱い、装飾音だけが突然突出しないようにします。アルペジオは前打音とは別の和音表現として扱います。

  **Grace notes follow the principal-note gesture.** Written short grace notes are normally kept slightly subordinate to the principal note so they do not unexpectedly jump out. Arpeggios remain a separate chord-voicing behavior rather than being treated as grace-note runs.

- **記譜は変更しません。** 強弱記号、発想標語、音符、テンポ表示、レイアウトは追加・削除・移動しません。

  **Notation stays untouched.** Dynamics, expression text, notes, tempo text, and layout are not added, removed, or moved.

## 使い方 • Quick start

1. 楽譜を開き、**プラグイン > 再生 > 奏脈**を実行します。

   Open a score and run **Plugins > Playback > Somyaku**.

2. 迷ったら **自然（自動）** を選びます。

   If unsure, choose **Natural (automatic)**.

3. **スコア全体に適用** または **選択範囲に適用** を押します。

   Press **Apply to full score** or **Apply to selection**.

4. 再生中だった場合は、いったん停止してから再開します。

   If playback was running, stop it and start it again.

元のベロシティへ戻すには **奏脈の変更を元に戻す** を使います。奏脈は変更前の値を保存し、復元時に正確に戻します。

Use **Revert Somyaku changes** to restore the saved original velocity values. Somyaku keeps the pre-change values so they can be restored exactly.

## 音楽の読み取り方 • Musical interpretation

フレーズは固定の２・４・８小節ではなく、休符、カデンツ、旋律線、拍子、テンポ、テクスチャ、反復、セクション境界などから自動判定します。

Phrase grouping is not locked to two, four, or eight measures. It is detected from rests, cadences, melodic contour, meter, tempo, texture, repetition, and section boundaries.

記譜された強弱や表情が十分にある場合は、それらを最優先にします。指示が少ない曲では、長い空白を限定的に補い、曲の性格と構造に合う範囲で再生を整えます。すべての強弱段階を無理に使いません。

When the score already contains clear dynamics and expression, those markings stay in charge. In sparsely marked music, Somyaku can support long unmarked passages within a limited range that fits the piece and its structure. It does not force every dynamic level into every song.

通常の強弱では、隣の強弱との境界を現在のダイナミクス基準値から計算し、少しだけ隣の領域へ重なる余地を残します。これにより、`mf` や `f` の中でも自然な抑揚を保ちながら、別の強弱段階へ過度に飛び出すのを抑えます。

For normal steady dynamics, Somyaku derives the practical boundary between neighboring levels from the currently active Dynamic Baselines and allows only a small amount of overlap. This keeps `mf`, `f`, and other levels expressive without allowing them to drift excessively into distant dynamic levels.

実際に書かれたクレッシェンド、ディミヌエンド、急な強弱変化、アクセントや一時的な強調は別に扱い、記譜の意図を優先します。

Real crescendos, diminuendos, abrupt dynamic changes, accents, and transient emphasis are handled separately so explicit notation remains authoritative.

## 対応楽器 • Supported instruments

２段以上の音高譜表を持つ、次の鍵盤パートを対象にします。

Supported parts must have at least two pitched staves and a recognized keyboard identity.

- ピアノ、グランドピアノ、アップライトピアノ

  Piano, grand piano, upright piano
- エレクトリックピアノ、ホンキートンクピアノ、トイピアノ

  Electric piano, honky-tonk piano, toy piano
- チェレスタ、クラヴィコード、クラビネット

  Celesta, clavichord, clavinet

ストリングス、ハープ、オルガン、ハープシコード、打楽器、単一譜表のパート、一覧にない楽器は変更しません。判定には MuseScore / MusicXML の楽器情報、パート構造、その位置で有効な楽器情報を使います。

Strings, harp, organs, harpsichord, percussion, single-staff parts, and unknown instruments stay unchanged. Eligibility uses MuseScore / MusicXML instrument identity, part structure, and the instrument active at that point in the score.

## ８種類のプリセット • Eight presets

プリセットを選ぶと、５つの演奏コントロールと８つのダイナミクス基準値が連動します。

Selecting a preset updates its five Performance Controls and eight Dynamic Baselines together.

- **自然（自動） / Natural (automatic)** — 曲の性格と構造を読み取り、自然な基準値を自動調整します。 / Detects the piece's character and structure and automatically calibrates its effective controls.
- **繊細なクラシック / Subtle classical** — 頂点や音ごとの対比を控えめにします。 / Keeps peaks and note-level contrast restrained.
- **ソフト・バラード / Soft ballad** — 柔らかさと旋律の呼吸を重視します。 / Favors softness and melodic breathing.
- **表情豊かなソロ / Expressive solo** — 旋律線とフレーズの弧に広めの表現幅を与えます。 / Gives melodic lines and phrase arcs more room.
- **ジャズ / Jazz** — シンコペーション、アクセント、和音内の色合いを明確にします。 / Clarifies syncopation, accents, and color within chords.
- **バロックの明瞭さ / Baroque clarity** — 独立した声部とアーティキュレーションを重視します。 / Emphasizes independent voices and articulation.
- **シネマティック / Cinematic** — セクションとクライマックスの対比を広く取ります。 / Allows broader section and climax contrast.
- **ヴィルトゥオーゾ / Virtuosic** — 速いパッセージと強い到達感に対応します。 / Supports rapid passagework and strong arrivals.

演奏コントロールは **全体の効き方 / セクションの対比 / 旋律の強調 / 鍵盤パートのバランス / 文脈の細かさ** です。ダイナミクス基準値は `ppp / pp / p / mp / mf / f / ff / fff` の順です。

The Performance Controls are **overall strength / section contrast / melody focus / keyboard-part balance / context detail**. Dynamic Baselines are ordered `ppp / pp / p / mp / mf / f / ff / fff`.

## カスタムプリセット • Custom presets

最大６個のカスタムプリセットを保存できます。各プリセットには、元にした内蔵プリセット、５つの演奏コントロール、８つのダイナミクス基準値、カスタム名を保存します。名前は後から変更できます。

You can save up to six custom presets. Each preset keeps its base built-in profile, five Performance Controls, eight Dynamic Baselines, and a custom name. The name can be changed later.

**変更を保存** で現在のカスタムプリセットを明示的に上書きします。未保存の編集がある状態で切り替え・終了・削除などを行う場合は確認を表示します。内蔵８プリセットは削除されません。

Use **Save changes** to explicitly overwrite the selected custom preset. Somyaku asks for confirmation before actions that would discard unsaved custom-preset edits. The eight built-in presets cannot be deleted.

自然（自動）を元にしたカスタムプリセットでも曲全体の解析は続けますが、保存した演奏コントロールと基準値を自動調整で上書きしません。

A custom preset based on Natural still uses full musical analysis, but its saved controls and baselines are not replaced by Natural's automatic control calibration.

カスタムプリセットは MuseScore の設定機構を使って保存します。通常の保存では個別のプリセットファイルは作成しません。

Custom presets are stored through MuseScore's settings system. Normal preset saving does not create a separate preset file.

## コントロールと復元 • Controls and restore

演奏コントロールとダイナミクス基準値は、スライダーと MIDI ベロシティ `1–127` の数値欄で調整できます。

Performance Controls and Dynamic Baselines can be adjusted with sliders and MIDI velocity fields from `1–127`.

**MuseScore 既定値 / MuseScore defaults** は標準カーブ `16 / 33 / 49 / 64 / 80 / 96 / 112 / 126` を一時的に使い、チェックを外すと直前のカーブを正確に戻します。

**MuseScore defaults** temporarily uses `16 / 33 / 49 / 64 / 80 / 96 / 112 / 126`. Unchecking it restores the exact curve that was active before.

既存の音符ベロシティは既定では演奏判断に使わず、復元用に保存します。上級設定で既存の手動ベロシティを保持することもできます。

Existing per-note velocity is ignored as musical evidence by default and saved for restoration. An advanced option can preserve genuine manual velocity when desired.

## UI と対応言語 • UI and languages

ページタブ、ドロップダウン、ボタン、スライダー、チェックボックス、テーマ色には MuseScore 4 のネイティブ部品を使い、ライト、ダーク、ハイコントラスト、カスタムテーマを引き継ぎます。強弱記号は MuseScore の SMuFL 楽譜フォントで表示し、標準のフォールバックには Leland を使います。

Page tabs, dropdowns, buttons, sliders, checkboxes, and theme colors use MuseScore 4 native components. The interface follows light, dark, high-contrast, and custom themes. Dynamic symbols use MuseScore’s SMuFL music font, with Leland as the standard fallback.

言語選択の先頭には、現在自動検出されている言語名を含む項目を表示します。たとえば日本語環境では **日本語（自動検出）**、英語環境では **English (Auto-detect)** のように表示します。

The first language item includes the language currently detected from MuseScore, for example **日本語（自動検出）** in Japanese or **English (Auto-detect)** in English.

日本語、英語、ドイツ語、フランス語、ポルトガル語、イタリア語、オランダ語、スペイン語、韓国語、ポーランド語、繁体字中国語、簡体字中国語、スウェーデン語、ロシア語の１４言語に対応します。各言語では、開発者向けの用語を直訳せず、MuseScore を使う演奏者に自然に伝わる表現を使います。

Fourteen languages are supported: Japanese, English, German, French, Portuguese, Italian, Dutch, Spanish, Korean, Polish, Traditional Chinese, Simplified Chinese, Swedish, and Russian. User-facing wording is translated naturally for musicians rather than exposing literal internal developer terminology.

## 再生互換性と制限 • Compatibility and limits

音符ごとのベロシティは MuseScore Basic、SoundFont、ベロシティ対応 VST 音源で最も効果的です。Muse Sounds はこのベロシティレイヤーに反応しません。

Per-note velocity works best with MuseScore Basic, SoundFonts, and velocity-responsive VST instruments. Muse Sounds does not respond to this velocity layer.

奏脈は外部サービスへ楽譜を送信せず、再生音を録音・試聴せず、機械学習モデルやクラウド AI を実行せず、音符を乱数で揺らしません。演奏判断はローカルの決定論的な楽譜解析で行います。

Somyaku does not send notation to external services, record or listen to playback, run a machine-learning model or cloud AI, or randomize notes. Its performance decisions come from local deterministic score analysis.

奏脈は音符タイミングやテンポマップを書き換えません。MuseScore Studio 4.7 の安定性を優先し、クラッシュの原因になり得るスコア全体のネイティブ・スパナー列挙は避けています。

Somyaku does not rewrite note timing or the tempo map. For MuseScore Studio 4.7 stability, it avoids score-wide enumeration of native spanner wrappers that can be unsafe in the target runtime.

## インストール • Install

> **重要 / Important:** MuseScore の **環境設定 / Preferences > 一般 / General > フォルダー / Folders > プラグイン / Plugins** に表示される場所を優先してください。ユーザーが保存先を変更している場合、下記の既定パスとは異なります。

> Use the Plugins folder configured in **Preferences > General > Folders > Plugins**. If the user changed that location, it takes priority over the default paths below.

1. [Somyaku Releases](https://github.com/Ysabelle12/Somyaku---Smart-Dynamics-for-MS4/releases) からインストール用 ZIP をダウンロードし、展開します。中に **Somyaku** フォルダーが１つ入っています。

   Download the installation ZIP from [Somyaku Releases](https://github.com/Ysabelle12/Somyaku---Smart-Dynamics-for-MS4/releases) and extract it. The archive contains one top-level **Somyaku** folder.

2. 既に古い **Somyaku** フォルダーがある場合は、MuseScore を終了してから古いフォルダーを削除または置き換えます。古い版と新しい版を同時に残さないでください。

   If an older **Somyaku** folder is already installed, close MuseScore first and remove or replace the old folder. Do not leave duplicate versions installed side by side.

3. 展開した **Somyaku** フォルダーを MuseScore の Plugins フォルダーへコピーします。

   Copy the extracted **Somyaku** folder into MuseScore's Plugins folder.

### Windows

MuseScore の **編集 > 環境設定 > 一般 > フォルダー > プラグイン** に表示される場所をエクスプローラーで開き、**Somyaku** フォルダーをコピーします。既定では通常、次の場所です。

Open the Plugins location shown under **Edit > Preferences > General > Folders > Plugins** in File Explorer and copy the **Somyaku** folder there. The usual default is:

`C:\Users\[User Name]\Documents\MuseScore4\Plugins\`

### macOS

MuseScore の **MuseScore > 環境設定 > 一般 > フォルダー > プラグイン** で Plugins の場所を確認します。MuseScore から場所を開いたときに Finder ではなくフォルダー選択画面が表示され、そこへ直接ドラッグできない場合は、対象フォルダーを Control クリック／右クリックして **Finder に表示 / Show in Finder** を選びます。開いた Finder ウインドウへ、展開した **Somyaku** フォルダーをコピーします。

Check the Plugins location under **MuseScore > Preferences > General > Folders > Plugins**. If opening the location from MuseScore gives you a folder-selection window rather than a normal Finder window and you cannot drag the plugin into it, Control-click/right-click the Plugins folder and choose **Show in Finder**. Copy the extracted **Somyaku** folder into the Finder window that opens.

既定では通常、次の場所です。

The usual default is:

`~/Documents/MuseScore4/Plugins/`

### Linux

MuseScore の **編集 > 環境設定 > 一般 > フォルダー > プラグイン** に表示される場所をファイルマネージャーで開き、**Somyaku** フォルダーをコピーします。既定では `~/Documents/MuseScore4/Plugins/` が一般的ですが、Documents/XDG の設定や MuseScore の設定によって異なる場合があるため、環境設定に表示される場所を優先してください。

Open the Plugins location shown under **Edit > Preferences > General > Folders > Plugins** in your file manager and copy the **Somyaku** folder there. `~/Documents/MuseScore4/Plugins/` is the usual default, but Documents/XDG configuration or a custom MuseScore setting may change it, so prefer the location shown in Preferences.

4. MuseScore Studio を再起動します。

   Restart MuseScore Studio.

5. 必要なら **ホーム > プラグイン**（または **プラグイン > プラグインを管理**）で Somyaku を選び、**有効にする / Enable** を押します。

   If needed, open **Home > Plugins** (or **Plugins > Manage plugins**), select Somyaku, and click **Enable**.

`Somyaku.qml`、`SomyakuEngine.js`、`languages` フォルダー、README、ライセンスファイルは同じトップレベルの **Somyaku** フォルダー内に保ってください。

Keep `Somyaku.qml`, `SomyakuEngine.js`, the `languages` folder, README, and license files together inside the same top-level **Somyaku** folder.

## ライセンス • License

奏脈は GNU General Public License version 3 only（GPL-3.0-only）で公開しています。GNU は GPLv3 の翻訳を法的な公式版として承認していません。`LICENSE.ja.md` は理解のための非公式な日本語訳で、法的な頒布条件は `LICENSE.en.md` の英語原文だけが示します。詳しくは [GNU の翻訳方針](https://www.gnu.org/licenses/translations.ja.html) を参照してください。

Somyaku is released under the GNU General Public License version 3 only (GPL-3.0-only). GNU does not approve GPLv3 translations as legally official. `LICENSE.ja.md` is included as an unofficial Japanese translation for understanding; only the original English text in `LICENSE.en.md` states the legal distribution terms. See [GNU's translation policy](https://www.gnu.org/licenses/translations.ja.html).

## 作者 • Author

花火 ch. / Pandas213 • [Ysabelle12](https://github.com/Ysabelle12)
