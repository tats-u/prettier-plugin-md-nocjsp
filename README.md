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

```bash
# or `npm install --save-dev prettier-plugin-md-nocjsp`
yarn add -D prettier-plugin-md-nocjsp

yarn prettier --parser markdown-nocjsp *.md | less
```

If you favorite the output by this plugin, you may want to add `.prettierrc` like the below to your project root:

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

```bash
# format only Markdown documents in the current directory
#
# `yarn` should be removed in `scripts` in `package.json`
yarn prettier -w *.md
```

You may want to check whether all documents have been formatted by:

```bash
yarn prettier -l *.md
```

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

  Note that Western word space (cl-26) is a one third em space, in principle, except at line head, line head of warichu, line end and line end of warichu.

  “one third em” means one third of the full-width size. (JIS Z 8125)
  “one third em space” means amount of space that is one third size of em space.

<https://www.w3.org/TR/jlreq/#mixed_text_composition_in_horizontal_writing_mode>

<https://www.w3.org/TR/jlreq/#term.one-third-em>
<https://www.w3.org/TR/jlreq/#term.one-third-em-space>

B (JIS X 4051:2004):

  横書きでは，和文と欧文との間の空き量は，四分アキを原則とする。
  In horizontal writing, the space between Japanese and European text should be one quarter em, as a rule.
  (Translation is based on DeepL)

<https://kikakurui.com/x4/X4051-2004-02.html>

Chinese:

  In principle, there is tracking or spacing between an adjacent Han character and a Western character of up to one quarter of a Han character width, except at the line start or end.
  Another approach is to use a Western word space (U+0020 SPACE), in which case the width depends on the font in use.

<https://www.w3.org/TR/clreq/#mixed_text_composition_in_horizontal_writing_mode>

Anyway, the length of spaces between different types of characters is based on Han characters (or Hiragana / Katakana).
The image below shows that the spacing between hiragana or kanji and alphabets is 1/4 of the length of the former and that it is different from the spacing between English words. (used: Microsoft Word)

![rendering in MS Word](https://user-images.githubusercontent.com/12870451/92094047-f8d6c900-ee0e-11ea-8164-2fc7d54cdeb7.png)

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
