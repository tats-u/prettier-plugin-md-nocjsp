# Prettier Makdown nocjsp (do NOt insert SPaces between Chinese or Japanese characters and alphabets or numbers) plugin

![Prettier Logo](https://raw.githubusercontent.com/prettier/prettier-logo/master/images/prettier-banner-light.png)
![Logo](./assets/logo.png)

[![CI (master)](https://github.com/tats-u/prettier-plugin-md-nocjsp/workflows/CI%20(master)/badge.svg)](https://github.com/tats-u/prettier-plugin-md-nocjsp/actions/workflows/master.yml)
[![CI (Release)](https://github.com/tats-u/prettier-plugin-md-nocjsp/workflows/CI%20(Release)/badge.svg)](https://github.com/tats-u/prettier-plugin-md-nocjsp/actions/workflows/release.yml)
[![npm version](https://badge.fury.io/js/prettier-plugin-md-nocjsp.svg)](https://badge.fury.io/js/prettier-plugin-md-nocjsp)

This plugin prevents Prettier from inserting spaces between Chinese or Japanese letters (e.g. Han aka Kanji & Hiragana & Katakana)  and alphabets or numbers in your Markdown documents.

🇯🇵

このプラグインは、Prettierによって、Markdown文書中内の漢字仮名と英数字の間に半角スペースが挿入されないようにします。

## How to use

You can try this plugin by:  
このプラグインは次のコマンドでお試し可能です。

```bash
# or `npm install --save-dev prettier-plugin-md-nocjsp`
yarn add -D prettier-plugin-md-nocjsp

yarn prettier --parser markdown-nocjsp *.md | less
```

If you like the output by this plugin, you may want to add `.prettierrc` like the below to your project root:  
出力が気に入りましたら、次のような`.prettierrc`をプロジェクトルートに追加してください。

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

## Examples

See the Markdown documents in the [assets](./assets) directory.  
[assets](./assets)ディレクトリ内のMarkdown文書を御覧ください。

## Why this plugin is needed

Here is an example of markdown document:

```markdown
# 第1章
```

Without this plugin, Prettier will insert spaces (U+0020) like as follows:

```markdown
# 第 1 章
```

Indeed, Japanese and Chinese typography stipulate that spaces similar to Prettier are inserted.

Official text style guide lines say:

Japanese:

A:

> Note that Western word space (cl-26) is a one third em space, in principle, except at line head, line head of warichu, line end and line end of warichu.
>
> なお，欧文間隔（cl-26）は，三分アキを原則とする．

<https://www.w3.org/TR/jlreq/#mixed_text_composition_in_horizontal_writing_mode>

> Inter-character spacing, between hiragana (cl-15), katakana (cl-16) or ideographic characters (cl-19) and Western characters or European numerals, is quarter em spacing (see Figure 102). The issue as to whether the quarter em spacing can be used for line end adjustment or not is discussed in § 3.8.2 Reduction and Addition of Inter-Character Spacing 詰める処理と空ける処理 and § 3.8.4 Procedures for Inter-Character Space Expansion 空ける処理の優先順位 .
>
> 欧字・アラビア数字の前後に配置される平仮名（cl-15），片仮名（cl-16）又は漢字等（cl-19）との字間は，四分アキとする（Figure 102）．（この四分アキを行の調整処理に使用する場合の詳細については§ 3.8.2 Reduction and Addition of Inter-Character Spacing 詰める処理と空ける処理 及び§ 3.8.4 Procedures for Inter-Character Space Expansion 空ける処理の優先順位 を参照．）

<https://www.w3.org/TR/jlreq/#handling_of_western_text_in_japanese_text_using_proportional_western_fonts>

> “one third em” means one third of the full-width size. (JIS Z 8125)
> “one third em space” means amount of space that is one third size of em space.
> 三分 = 全角の3分の1の長さ．（JIS Z 8125）
> 三分アキ = 三分の空き量．

<https://www.w3.org/TR/jlreq/#term.one-third-em>
<https://www.w3.org/TR/jlreq/#term.one-third-em-space>

> “one quarter em” means quarter size of full-width. (JIS Z 8125)
> “one quarter em” means amount of space that is a quarter of an em space in size.
> 四分 = 全角の4分の1の長さ．（JIS Z 8125）
> 四分アキ = 四分の空き量．

<https://www.w3.org/TR/jlreq/#term.quarter-em>
<https://www.w3.org/TR/jlreq/#term.quarter-em-space>

B (JIS X 4051:2004):

> 3.b6 欧文間隔 欧文の単語間の空きを表現する文字。
> “欧文間隔” means a character that represents the space between words in European text.
>
> 4.7a 欧文間隔は，三分アキを原則とする。
> The space between European words should be one third em, as a rule.
>
> 4.6d 横書きでは，和文と欧文との間の空き量は，四分アキを原則とする。
> In horizontal writing, the space between Japanese and European text should be one quarter em, as a rule.
> (Translation is based on DeepL)

<https://kikakurui.com/x4/X4051-2004-02.html>

Chinese:

 > In principle, there is tracking or spacing between an adjacent Han character and a Western character of up to one quarter of a Han character width, except at the line start or end.
> 横排时，西文使用比例字体；阿拉伯数字则常用比例字体或等宽字体。原则上，汉字与西文字母、数字间使用不多于四分之一个汉字宽的字距或空白。但西文出现在行首或行尾时，则无须加入空白。
> NOTE: Another approach is to use a Western word space (U+0020 SPACE), in which case the width depends on the font in use.
> 或可使用西文词间空格（U+0020 SPACE [ ]，其宽度随不同字体有所变化）。

<https://www.w3.org/TR/clreq/#mixed_text_composition_in_horizontal_writing_mode>

The following table shows that the widths of spaces between Han and western characters, and between western words in both languages are different.

|      | Japanese    | Chinese          |
|------|-------------|------------------|
| 文␣A | 1/4 of “文” | 1/4 of “文”      |
| A␣B  | 1/3 of “文” | Depends on fonts |

Also in text style guide lines for both languages (especially Japanese), using U+0020 is not the only rule.

The image below shows that the spacing between hiragana or kanji and alphabets is 1/4 of the length of the former and that it is different from the spacing between English words. (used: Microsoft Word + Yu Mincho)

![Japanese rendering in Word](https://user-images.githubusercontent.com/12870451/112154796-f5c6ed00-8c27-11eb-86c2-291648286f87.png)

3 underlined Hiraganas “あ” have the same width as 12 Han-alphabet spaces (do not consider those around “m”; they appear in both lines)

![Space width in Word](https://user-images.githubusercontent.com/12870451/112154800-f6f81a00-8c27-11eb-8c7d-15b2aa5c8b1e.png)

In MS Word, the width of a space between Western words is not one quarter or third of that of Hiragana or Han.  (= Chinese rule)

Even in Chinese, the act of inserting U+0020 is not the only standard, and takes away the option of document viewers and converters to insert spaces a quarter of the width of Han characters, which is unacceptable. The spacing between Han characters and the alphabet should be left to them. At least Prettier must not manage spacing in place of them (P.S. idealy).

**TL;DR: inserting spaces (but not U+0020 itself) is the job of viewers and such, not formatters like Prettier!!!  PRETTIER MUST """NEVER""" BREAK DOCUMENTS BY DOING SUCH A THING!!!!  ONCE IT DO, IT CAN """NEVER""" UNDO!!!**

## Use this repository directly

Clone and build this repository by:

```bash
git clone --recursive https://github.com/tats-u/prettier-plugin-md-nocjsp.git
cd prettier-plugin-md-nocjsp
yarn install
yarn build
```

Then you can try it by:

```bash
yarn prettier test.md --parser markdown-nocjsp --plugin path/to/prettier-plugin-md-nocjsp
```

You can test it without `yarn build`:

```bash
yarn prettier test.md --parser markdown-nocjsp --plugin path/to/prettier-plugin-md-nocjsp/index.js
```

## License

MIT License (same as Prettier itself)

This plugin reuse Prettier's code.
