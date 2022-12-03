# Prettier Makdown nocjsp (do NOt insert SPaces between Chinese or Japanese characters and alphabets or numbers) plugin

![Prettier Logo](https://raw.githubusercontent.com/prettier/prettier-logo/master/images/prettier-banner-light.png)
![Logo](./assets/logo.png)

[![CI (master)](<https://github.com/tats-u/prettier-plugin-md-nocjsp/workflows/CI%20(master)/badge.svg>)](https://github.com/tats-u/prettier-plugin-md-nocjsp/actions/workflows/master.yml)
[![CI (Release)](<https://github.com/tats-u/prettier-plugin-md-nocjsp/workflows/CI%20(Release)/badge.svg>)](https://github.com/tats-u/prettier-plugin-md-nocjsp/actions/workflows/release.yml)
[![npm version](https://badge.fury.io/js/prettier-plugin-md-nocjsp.svg)](https://badge.fury.io/js/prettier-plugin-md-nocjsp)

This plugin prevents Prettier from inserting spaces between Chinese or Japanese letters (e.g. Han aka Kanji & Hiragana & Katakana) and alphabets or numbers in your Markdown documents.

🇯🇵

このプラグインは、Prettierによって、Markdown文書中内の漢字仮名と英数字の間に半角スペースが挿入されないようにします。

## Target versions

The modification by this plugin [has been merged into the branch for next major version (3.x) of Prettier](https://github.com/prettier/prettier/pull/11597). You do not have to install this plugin with Prettier 3.x, and you are required to uninstall this plugin after you upgrade Prettier to 3.x.  
本プラグインによる修正点は、[Prettierの次期メジャーバージョン（3.x）用ブランチにマージされました。](https://github.com/prettier/prettier/pull/11597)このプラグインをPrettier 3.xと一緒にインストールする必要はなく、Prettierのバージョンを3.xに上げたのならばこのプラグインは用済みのためアンインストールする必要があります。

## How to use

First, run `yarn init` or `npm init` in the project root directory unless you have already done or are going to install this plugin globally.  
まず、プロジェクトルートディレクトリ上で、`yarn init`または`npm init`を実行してください。（すでにやっている場合や、グローバル環境にインストール予定の場合は除く）

Next, install Prettier by:  
次に、Prettierを次のコマンドでインストールしてください。

```bash
yarn add -D prettier

# or (↓ when you prefer npm to yarn)

npm install -D prettier
```

You can install and try this plugin by:  
このプラグインは次のコマンドでインストール及びお試しが可能です。

```bash
# or `npm install -D prettier-plugin-md-nocjsp`
yarn add -D prettier-plugin-md-nocjsp

yarn prettier --parser markdown-nocjsp *.md | less
```

If you like the output by this plugin, you may want to add `.prettierrc` (or `.prettier.yml`) like the below to your project root:  
出力が気に入りましたら、次のような`.prettierrc`（または`.prettierrc.yml`）をプロジェクトルートに追加してください。

```yaml
# *snip*
overrides:
  - files:
      - "*.md"
      - README
    options:
      parser: markdown-nocjsp
  - files:
      - "*.mdx"
    options:
      parser: mdx-nocjsp
```

Then you can format documents using this plugin just by:  
次のコマンドさえ打てば、本プラグインを用いてMarkdown文書を整形することができます。

```bash
# format only Markdown documents in the current directory
#
# `yarn` should be removed in `scripts` in `package.json`
yarn prettier -w *.md
```

You may want to check whether all documents have been formatted by:  
次のようなコマンドで、全文書が整形されているかどうかを確認できます。

```bash
yarn prettier -l *.md
```

### Help! Prettier put extra spaces and messed up my document!

Since the version 1.4.0, this plugin has provided the private option named `quickFix` that allows us to remove extra spaces between han(kanji)/kana and alphanumerics forced into your document by the (plain) Prettier.  
バージョン1.4.0から、本プラグインは`quickFix`という名前の独自オプションを実装しています。これは、素のPrettierによりねじ込まれた漢字・仮名と英数字の間の余計なスペースを取り除きます。

To use this option, edit `.prettierrc` like the following (i.e. add `quickFix: true`) and re-format your document just once.  
このオプションを利用するには、`.prettierrc`を以下のように編集（`quickFix: true`を加える）して、1回だけ再フォーマットします。

```yaml
# *snip*
overrides:
  - files:
      - "*.md"
      - README
    options:
      parser: markdown-nocjsp
      quickFix: true
  - files:
      - "*.mdx"
    options:
      parser: mdx-nocjsp
      quickFix: true
```

After re-format, you do not have to keep the `quickFix: true` option that you have just added any longer and can remove it.
再フォーマットが済んだら、追加した`quickFix: true`オプションは不要なので削除してください。

Note that this cannot be specified from command line options. You are required to use e.g. `.prettier` instead.  
注意点として、コマンドラインオプションから指定することはできません。代わりに`.prettierrc`などを利用する必要があります。

Also, as the name "quick-fix" suggests, the behavior of this option is not perfect. There is a risk of removing even necessary spaces. After applying this option, please look over the formatted document carefully.  
また、「応急措置」（quick-fix）の名が表すように、このオプションの動作は完璧ではありません。必要なスペースまで削除してしまうおそれがあります。このオプションを適用した後は、整形した文書によく目を通してください。

## proseWrap value

This plugin mainly supports only the `"preserve"` value (default) for the `proseWrap` option. However, from 1.5.0, this plugin supports the other values `"always"` and `"never"`. The behavior when these additional values are given is based on that of the incoming upstream Prettier 3+.  
本プラグインは`proseWrap`オプションにおいて基本的に`"preserve"`の値のみに対応しています。しかし、1.5.0から、他の値、すなわち`"always"`・`"never"`の値にも対応しています。その時の挙動は、Prettier 3以上（将来利用可能）のものに準じています。

## Formatting Examples

See the Markdown documents in the [assets](./assets) directory.  
[assets](./assets)ディレクトリ内のMarkdown文書を御覧ください。

## Why this plugin is needed

Here is an example of markdown document:  
Markdown文書の例を挙げます。

```markdown
# 第1章
```

Without this plugin, Prettier will insert spaces (U+0020) like as follows:  
このプラグインがないと、Prettierは、次のように半角スペースを入れてしまします。

```markdown
# 第 1 章
```

Indeed, Japanese and Chinese typography stipulate that spaces similar to those inserted by Prettier.  
確かに、日本語・中国語組版では、Prettierが挿入するものと似たスペースが挿入されます。

Let us refer to the official text style guide lines. They say:  
公式の組版規則を見てみると次のようになっています。

Japanese:

W3C:

> Inter-character spacing, between hiragana (cl-15), katakana (cl-16) or ideographic characters (cl-19) and Western characters or European numerals, is quarter em spacing (see Figure 102). The issue as to whether the quarter em spacing can be used for line end adjustment or not is discussed in § 3.8.2 Reduction and Addition of Inter-Character Spacing 詰める処理と空ける処理 and § 3.8.4 Procedures for Inter-Character Space Expansion 空ける処理の優先順位 .
>
> 欧字・アラビア数字の前後に配置される平仮名（cl-15），片仮名（cl-16）又は漢字等（cl-19）との字間は，四分アキとする（Figure 102）．（この四分アキを行の調整処理に使用する場合の詳細については§ 3.8.2 Reduction and Addition of Inter-Character Spacing 詰める処理と空ける処理 及び§ 3.8.4 Procedures for Inter-Character Space Expansion 空ける処理の優先順位 を参照．）

<https://www.w3.org/TR/jlreq/#handling_of_western_text_in_japanese_text_using_proportional_western_fonts>

> “one quarter em” means quarter size of full-width. (JIS Z 8125)  
> “one quarter em” means amount of space that is a quarter of an em space in size.  
> 四分 = 全角の4分の1の長さ．（JIS Z 8125）  
> 四分アキ = 四分の空き量．

<https://www.w3.org/TR/jlreq/#term.quarter-em>
<https://www.w3.org/TR/jlreq/#term.quarter-em-space>

参考：欧文間隔  
FYI: Western word space

> Note that Western word space (cl-26) is a one third em space, in principle, except at line head, line head of warichu, line end and line end of warichu.
>
> なお，欧文間隔（cl-26）は，三分アキを原則とする．

<https://www.w3.org/TR/jlreq/#mixed_text_composition_in_horizontal_writing_mode>

> “one third em” means one third of the full-width size. (JIS Z 8125)  
> “one third em space” means amount of space that is one third size of em space.  
> 三分 = 全角の3分の1の長さ．（JIS Z 8125）  
> 三分アキ = 三分の空き量．

<https://www.w3.org/TR/jlreq/#term.one-third-em>
<https://www.w3.org/TR/jlreq/#term.one-third-em-space>

JIS X 4051:2004:

> 3.b.61 四分アキ（しぶあき，しぶんあき） 空き量を，全角アキの1/4とするもの。  
> One quarter em: space/width with 1/4 of full-width space.  
> 4.6d 横書きでは，和文と欧文との間の空き量は，四分アキを原則とする。  
> In horizontal writing, the space between Japanese and European text should be one quarter em, as a rule.  
> (Translation based on DeepL)

参考：欧文間隔  
FYI: Western word space

> 3.b6 欧文間隔 欧文の単語間の空きを表現する文字。  
> “欧文間隔” means a character that represents the space between words in European text.
>
> 4.7a 欧文間隔は，三分アキを原則とする。  
> The space between European words should be one third em, as a rule.

<https://kikakurui.com/x4/X4051-2004-02.html>

Chinese (W3C):

> In principle, there is tracking or spacing between an adjacent Han character and a Western character of up to one quarter of a Han character width, except at the line start or end.  
> 横排时，西文使用比例字体；阿拉伯数字则常用比例字体或等宽字体。原则上，汉字与西文字母、数字间使用不多于四分之一个汉字宽的字距或空白。但西文出现在行首或行尾时，则无须加入空白。  
> NOTE: Another approach is to use a Western word space (U+0020 SPACE), in which case the width depends on the font in use.  
> 或可使用西文词间空格（U+0020 SPACE [ ]，其宽度随不同字体有所变化）。

<https://www.w3.org/TR/clreq/#mixed_text_composition_in_horizontal_writing_mode>

The following table summarizes the above quotes. It shows that the widths of spaces between Han and western characters, and between western words in both languages are different.  
上をまとめると、下表のようになります。和欧文字間・英単語間のスペースの幅が異なることが見て取れます。

|                       | Japanese        | Chinese            |
| --------------------- | --------------- | ------------------ |
| 文␣A                  | 1/4 of “文”     | 1/4 of “文”        |
| Substitute for U+0020 | No stipulations | One of the options |
| FYI: A␣B              | 1/3 of “文”     | Depends on fonts   |

Moreover, in text style guide lines for both languages (especially Japanese), using U+0020 is not the only rule.  
さらに、半角スペースを使用することは、両言語（特に日本語）では唯一絶対の規則ではありません。

The image below shows that the spacing between hiragana or kanji and alphabets is 1/4 of the length of the former and that it is different from the spacing between English words. (used: Microsoft Word + Yu Mincho)  
次の画像は、 平仮名・漢字と英文字の間が四分アキであり、英単語間のスペースとは幅が異なることを表しています。

![Japanese rendering in Word](https://user-images.githubusercontent.com/12870451/112154796-f5c6ed00-8c27-11eb-86c2-291648286f87.png)

3 underlined Hiraganas “あ” have the same width as 12 Han-alphabet spaces (do not consider those around “m”; they appear in both lines)  
下線が引いてある平仮名「あ」3文字は、漢字・アルファベット間のスペース12個分に相当します。（「`m`」周辺のスペースは勘定しません。両方の行に現れるからです。）

![Space width in Word](https://user-images.githubusercontent.com/12870451/112154800-f6f81a00-8c27-11eb-8c7d-15b2aa5c8b1e.png)

In MS Word, the width of a space between Western words is not one quarter or third of that of Hiragana or Han. (= Chinese rule)  
MS Wordでは、英単語間のアキは三分でも四分でもありません。（中国語の規則のようです）

Even in Chinese, the act of inserting U+0020 is not the only standard, and takes away the option of document viewers and converters to insert spaces a quarter of the width of Han characters, which is unacceptable. The spacing between Han characters and the alphabet should be left to them. At least Prettier must not manage spacing in place of them (idealy).  
中国語であっても、半角スペースを挿入する行為は唯一の標準ではなく、文書表示ソフトや変換ソフトが全角の1/4幅（四分）のアキを挿入できなくしてしまいます。当然容認できるものではありません。漢字仮名・アルファベット間のアキはそれらのソフトに任せるべきです。最低でも、Prettierはそれらを差し置いてスペースを管理してはなりません（ならないのが理想的です）。

As described above, U+0020 must not be inserted between Han (or hiragana or katakana) and alphanumerics. Then, can we remove those that have already injected easily? NO!  
このように、漢字（仮名）・英数字の間に半角スペースは挿入してはなりません。ならば、既に挿入されてしまったものは簡単に除去できるのでしょうか？無理！

The following sentence is correct; we must not remove any spaces in it.  
次の英文は正しく、どのスペースも削除してはなりません。

> 作る means “make” in Japanese.

As you can see, formatter like Prettier cannot tell if the spaces should be removed and help leaving them. Once it did, it cannot be undone anymore.  
このように、Pretierのようなフォーマットは半角スペースを除去するかはわからず、放置する他ありません。一回やったら、二度と戻せません。

**TL;DR: inserting spaces (but not U+0020 itself) is the job of viewers and such, not formatters like Prettier!!! PRETTIER MUST """NEVER""" BREAK DOCUMENTS BY DOING SUCH A THING!!!! ONCE IT DO, IT CAN """NEVER""" UNDO!!!**  
要点: アキ（半角スペース自体ではない）を挿入する行為は表示ソフトの責務であり、Prettierのようなフォーマッタの責務ではありません！Prettierがこんなことをやらかすことにより、文書を破壊する行為は到底認められるものではありません。

## Use this repository directly

Clone and build this repository by:

```bash
git clone --recursive https://github.com/tats-u/prettier-plugin-md-nocjsp.git
cd prettier-plugin-md-nocjsp
yarn install
yarn build
```

Note that you must make sure to add a `--recursive` option to `git clone` (See “Use this repository directly”) because this repository uses the Git submodule feature.

Then you can try it by:

```bash
yarn prettier test.md --parser markdown-nocjsp --plugin path/to/prettier-plugin-md-nocjsp
```

You can test it without `yarn build`:

```bash
yarn prettier test.md --parser markdown-nocjsp --plugin path/to/prettier-plugin-md-nocjsp/src/index.js
```

IMPORTANT: you must not run `yarn install` in `src/prettier/`, or you will get the following error after running `yarn build && yarn test`:

```text
[error] Could not dynamically require "./data.generated/Script/Han". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.
```

This is because Rollup tries to import JSON data in the package `unicode-regex` in `./src/prettier/node_modules/` duplicated to that in `./node_modules/` dynamically. To fix this error, you must erase `./src/prettier/node_modules/` by:

```powershell
rm -re -fo .\src\prettier\node_modules
```

↑Windows (PowerShell) / Unix↓

```bash
rm -rf ./src/prettier/node_modules
```

After this, make sure to re-run `yarn build` to fix the broken `./dist/main.js`.

## License

MIT License (same as Prettier itself)

This plugin reuses Prettier's code.
