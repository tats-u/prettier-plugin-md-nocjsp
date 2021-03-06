# Prettier Makdown nocjsp (do NOt insert SPaces between Chinese or Japanese characters and alphabets or numbers) plugin

![Prettier Logo](https://raw.githubusercontent.com/prettier/prettier-logo/master/images/prettier-banner-light.png)
![Logo](./assets/logo.png)

[![CI (master)](<https://github.com/tats-u/prettier-plugin-md-nocjsp/workflows/CI%20(master)/badge.svg>)](https://github.com/tats-u/prettier-plugin-md-nocjsp/actions/workflows/master.yml)
[![CI (Release)](<https://github.com/tats-u/prettier-plugin-md-nocjsp/workflows/CI%20(Release)/badge.svg>)](https://github.com/tats-u/prettier-plugin-md-nocjsp/actions/workflows/release.yml)
[![npm version](https://badge.fury.io/js/prettier-plugin-md-nocjsp.svg)](https://badge.fury.io/js/prettier-plugin-md-nocjsp)

This plugin prevents Prettier from inserting spaces between Chinese or Japanese letters (e.g. Han aka Kanji & Hiragana & Katakana) and alphabets or numbers in your Markdown documents.

ð¯ðµ

ãã®ãã©ã°ã¤ã³ã¯ãPrettierã«ãã£ã¦ãMarkdownææ¸ä¸­åã®æ¼¢å­ä»®åã¨è±æ°å­ã®éã«åè§ã¹ãã¼ã¹ãæ¿å¥ãããªãããã«ãã¾ãã

## How to use

First, run `yarn init` or `npm init` in the project root directory unless you have already done or are going to install this plugin globally.  
ã¾ãããã­ã¸ã§ã¯ãã«ã¼ããã£ã¬ã¯ããªä¸ã§ã`yarn init`ã¾ãã¯`npm init`ãå®è¡ãã¦ãã ãããï¼ãã§ã«ãã£ã¦ããå ´åããã°ã­ã¼ãã«ç°å¢ã«ã¤ã³ã¹ãã¼ã«äºå®ã®å ´åã¯é¤ãï¼

Next, install Prettier by:  
æ¬¡ã«ãPrettierãæ¬¡ã®ã³ãã³ãã§ã¤ã³ã¹ãã¼ã«ãã¦ãã ããã

```bash
yarn add -D prettier

# or (â when you prefer npm to yarn)

npm install -D prettier
```

You can install and try this plugin by:  
ãã®ãã©ã°ã¤ã³ã¯æ¬¡ã®ã³ãã³ãã§ã¤ã³ã¹ãã¼ã«åã³ãè©¦ããå¯è½ã§ãã

```bash
# or `npm install -D prettier-plugin-md-nocjsp`
yarn add -D prettier-plugin-md-nocjsp

yarn prettier --parser markdown-nocjsp *.md | less
```

If you like the output by this plugin, you may want to add `.prettierrc` (or `.prettier.yml`) like the below to your project root:  
åºåãæ°ã«å¥ãã¾ããããæ¬¡ã®ãããª`.prettierrc`ï¼ã¾ãã¯`.prettierrc.yml`ï¼ããã­ã¸ã§ã¯ãã«ã¼ãã«è¿½å ãã¦ãã ããã

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
æ¬¡ã®ã³ãã³ãããæã¦ã°ãæ¬ãã©ã°ã¤ã³ãç¨ãã¦Markdownææ¸ãæ´å½¢ãããã¨ãã§ãã¾ãã

```bash
# format only Markdown documents in the current directory
#
# `yarn` should be removed in `scripts` in `package.json`
yarn prettier -w *.md
```

You may want to check whether all documents have been formatted by:  
æ¬¡ã®ãããªã³ãã³ãã§ãå¨ææ¸ãæ´å½¢ããã¦ãããã©ãããç¢ºèªã§ãã¾ãã

```bash
yarn prettier -l *.md
```

## Examples

See the Markdown documents in the [assets](./assets) directory.  
[assets](./assets)ãã£ã¬ã¯ããªåã®Markdownææ¸ãå¾¡è¦§ãã ããã

## Why this plugin is needed

Here is an example of markdown document:  
Markdownææ¸ã®ä¾ãæãã¾ãã

```markdown
# ç¬¬1ç« 
```

Without this plugin, Prettier will insert spaces (U+0020) like as follows:  
ãã®ãã©ã°ã¤ã³ããªãã¨ãPrettierã¯ãæ¬¡ã®ããã«åè§ã¹ãã¼ã¹ãå¥ãã¦ãã¾ãã¾ãã

```markdown
# ç¬¬ 1 ç« 
```

Indeed, Japanese and Chinese typography stipulate that spaces similar to those inserted by Prettier.  
ç¢ºãã«ãæ¥æ¬èªã»ä¸­å½èªçµçã§ã¯ãPrettierãæ¿å¥ãããã®ã¨ä¼¼ãã¹ãã¼ã¹ãæ¿å¥ããã¾ãã

Let us refer to the official text style guide lines. They say:  
å¬å¼ã®çµçè¦åãè¦ã¦ã¿ãã¨æ¬¡ã®ããã«ãªã£ã¦ãã¾ãã

Japanese:

W3C:

> Note that Western word space (cl-26) is a one third em space, in principle, except at line head, line head of warichu, line end and line end of warichu.
>
> ãªãï¼æ¬§æééï¼cl-26ï¼ã¯ï¼ä¸åã¢ã­ãååã¨ããï¼

<https://www.w3.org/TR/jlreq/#mixed_text_composition_in_horizontal_writing_mode>

> Inter-character spacing, between hiragana (cl-15), katakana (cl-16) or ideographic characters (cl-19) and Western characters or European numerals, is quarter em spacing (see Figure 102). The issue as to whether the quarter em spacing can be used for line end adjustment or not is discussed in Â§ 3.8.2 Reduction and Addition of Inter-Character Spacing è©°ããå¦çã¨ç©ºããå¦ç and Â§ 3.8.4 Procedures for Inter-Character Space Expansion ç©ºããå¦çã®åªåé ä½ .
>
> æ¬§å­ã»ã¢ã©ãã¢æ°å­ã®åå¾ã«éç½®ãããå¹³ä»®åï¼cl-15ï¼ï¼çä»®åï¼cl-16ï¼åã¯æ¼¢å­ç­ï¼cl-19ï¼ã¨ã®å­éã¯ï¼ååã¢ã­ã¨ããï¼Figure 102ï¼ï¼ï¼ãã®ååã¢ã­ãè¡ã®èª¿æ´å¦çã«ä½¿ç¨ããå ´åã®è©³ç´°ã«ã¤ãã¦ã¯Â§ 3.8.2 Reduction and Addition of Inter-Character Spacing è©°ããå¦çã¨ç©ºããå¦ç åã³Â§ 3.8.4 Procedures for Inter-Character Space Expansion ç©ºããå¦çã®åªåé ä½ ãåç§ï¼ï¼

<https://www.w3.org/TR/jlreq/#handling_of_western_text_in_japanese_text_using_proportional_western_fonts>

> âone third emâ means one third of the full-width size. (JIS Z 8125)  
> âone third em spaceâ means amount of space that is one third size of em space.  
> ä¸å = å¨è§ã®3åã®1ã®é·ãï¼ï¼JIS Z 8125ï¼  
> ä¸åã¢ã­ = ä¸åã®ç©ºãéï¼

<https://www.w3.org/TR/jlreq/#term.one-third-em>
<https://www.w3.org/TR/jlreq/#term.one-third-em-space>

> âone quarter emâ means quarter size of full-width. (JIS Z 8125)  
> âone quarter emâ means amount of space that is a quarter of an em space in size.  
> åå = å¨è§ã®4åã®1ã®é·ãï¼ï¼JIS Z 8125ï¼  
> ååã¢ã­ = ååã®ç©ºãéï¼

<https://www.w3.org/TR/jlreq/#term.quarter-em>
<https://www.w3.org/TR/jlreq/#term.quarter-em-space>

JIS X 4051:2004:

> 3.b6 æ¬§æéé æ¬§æã®åèªéã®ç©ºããè¡¨ç¾ããæå­ã  
> âæ¬§æééâ means a character that represents the space between words in European text.
>
> 4.7a æ¬§æééã¯ï¼ä¸åã¢ã­ãååã¨ããã  
> The space between European words should be one third em, as a rule.
>
> 4.6d æ¨ªæ¸ãã§ã¯ï¼åæã¨æ¬§æã¨ã®éã®ç©ºãéã¯ï¼ååã¢ã­ãååã¨ããã  
> In horizontal writing, the space between Japanese and European text should be one quarter em, as a rule.  
> (Translation is based on DeepL)

<https://kikakurui.com/x4/X4051-2004-02.html>

Chinese (W3C):

> In principle, there is tracking or spacing between an adjacent Han character and a Western character of up to one quarter of a Han character width, except at the line start or end.  
> æ¨ªææ¶ï¼è¥¿æä½¿ç¨æ¯ä¾å­ä½ï¼é¿æä¼¯æ°å­åå¸¸ç¨æ¯ä¾å­ä½æç­å®½å­ä½ãååä¸ï¼æ±å­ä¸è¥¿æå­æ¯ãæ°å­é´ä½¿ç¨ä¸å¤äºååä¹ä¸ä¸ªæ±å­å®½çå­è·æç©ºç½ãä½è¥¿æåºç°å¨è¡é¦æè¡å°¾æ¶ï¼åæ é¡»å å¥ç©ºç½ã  
> NOTE: Another approach is to use a Western word space (U+0020 SPACE), in which case the width depends on the font in use.  
> æå¯ä½¿ç¨è¥¿æè¯é´ç©ºæ ¼ï¼U+0020 SPACE [ ]ï¼å¶å®½åº¦éä¸åå­ä½ææååï¼ã

<https://www.w3.org/TR/clreq/#mixed_text_composition_in_horizontal_writing_mode>

The following table summarizes the above quotes. It shows that the widths of spaces between Han and western characters, and between western words in both languages are different.  
ä¸ãã¾ã¨ããã¨ãä¸è¡¨ã®ããã«ãªãã¾ããåæ¬§æå­éã»è±åèªéã®ã¹ãã¼ã¹ã®å¹ãç°ãªããã¨ãè¦ã¦åãã¾ãã

|      | Japanese    | Chinese          |
| ---- | ----------- | ---------------- |
| æâ£A | 1/4 of âæâ | 1/4 of âæâ      |
| Aâ£B  | 1/3 of âæâ | Depends on fonts |

Moreover, in text style guide lines for both languages (especially Japanese), using U+0020 is not the only rule.  
ããã«ãåè§ã¹ãã¼ã¹ãä½¿ç¨ãããã¨ã¯ãä¸¡è¨èªï¼ç¹ã«æ¥æ¬èªï¼ã§ã¯å¯ä¸çµ¶å¯¾ã®è¦åã§ã¯ããã¾ããã

The image below shows that the spacing between hiragana or kanji and alphabets is 1/4 of the length of the former and that it is different from the spacing between English words. (used: Microsoft Word + Yu Mincho)  
æ¬¡ã®ç»åã¯ã å¹³ä»®åã»æ¼¢å­ã¨è±æå­ã®éãååã¢ã­ã§ãããè±åèªéã®ã¹ãã¼ã¹ã¨ã¯å¹ãç°ãªããã¨ãè¡¨ãã¦ãã¾ãã

![Japanese rendering in Word](https://user-images.githubusercontent.com/12870451/112154796-f5c6ed00-8c27-11eb-86c2-291648286f87.png)

3 underlined Hiraganas âãâ have the same width as 12 Han-alphabet spaces (do not consider those around âmâ; they appear in both lines)  
ä¸ç·ãå¼ãã¦ããå¹³ä»®åããã3æå­ã¯ãæ¼¢å­ã»ã¢ã«ãã¡ãããéã®ã¹ãã¼ã¹12ååã«ç¸å½ãã¾ããï¼ã`m`ãå¨è¾ºã®ã¹ãã¼ã¹ã¯åå®ãã¾ãããä¸¡æ¹ã®è¡ã«ç¾ããããã§ããï¼

![Space width in Word](https://user-images.githubusercontent.com/12870451/112154800-f6f81a00-8c27-11eb-8c7d-15b2aa5c8b1e.png)

In MS Word, the width of a space between Western words is not one quarter or third of that of Hiragana or Han. (= Chinese rule)  
MS Wordã§ã¯ãè±åèªéã®ã¢ã­ã¯ä¸åã§ãååã§ãããã¾ãããï¼ä¸­å½èªã®è¦åã®ããã§ãï¼

Even in Chinese, the act of inserting U+0020 is not the only standard, and takes away the option of document viewers and converters to insert spaces a quarter of the width of Han characters, which is unacceptable. The spacing between Han characters and the alphabet should be left to them. At least Prettier must not manage spacing in place of them (idealy).  
ä¸­å½èªã§ãã£ã¦ããåè§ã¹ãã¼ã¹ãæ¿å¥ããè¡çºã¯å¯ä¸ã®æ¨æºã§ã¯ãªããææ¸è¡¨ç¤ºã½ãããå¤æã½ãããå¨è§ã®1/4å¹ï¼ååï¼ã®ã¢ã­ãæ¿å¥ã§ããªããã¦ãã¾ãã¾ããå½ç¶å®¹èªã§ãããã®ã§ã¯ããã¾ãããæ¼¢å­ä»®åã»ã¢ã«ãã¡ãããéã®ã¢ã­ã¯ãããã®ã½ããã«ä»»ããã¹ãã§ããæä½ã§ããPrettierã¯ããããå·®ãç½®ãã¦ã¹ãã¼ã¹ãç®¡çãã¦ã¯ãªãã¾ããï¼ãªããªãã®ãçæ³çã§ãï¼ã

As described above, U+0020 must not be inserted between Han (or hiragana or katakana) and alphanumerics. Then, can we remove those that have already injected easily? NO!  
ãã®ããã«ãæ¼¢å­ï¼ä»®åï¼ã»è±æ°å­ã®éã«åè§ã¹ãã¼ã¹ã¯æ¿å¥ãã¦ã¯ãªãã¾ããããªãã°ãæ¢ã«æ¿å¥ããã¦ãã¾ã£ããã®ã¯ç°¡åã«é¤å»ã§ããã®ã§ããããï¼ç¡çï¼

The following sentence is correct; we must not remove any spaces in it.  
æ¬¡ã®è±æã¯æ­£ãããã©ã®ã¹ãã¼ã¹ãåé¤ãã¦ã¯ãªãã¾ããã

> ä½ã means âmakeâ in Japanese.

As you can see, formatter like Prettier cannot tell if the spaces should be removed and help leaving them. Once it did, it cannot be undone anymore.  
ãã®ããã«ãPretierã®ãããªãã©ã¼ãããã¯åè§ã¹ãã¼ã¹ãé¤å»ãããã¯ãããããæ¾ç½®ããä»ããã¾ãããä¸åãã£ãããäºåº¦ã¨æ»ãã¾ããã

**TL;DR: inserting spaces (but not U+0020 itself) is the job of viewers and such, not formatters like Prettier!!! PRETTIER MUST """NEVER""" BREAK DOCUMENTS BY DOING SUCH A THING!!!! ONCE IT DO, IT CAN """NEVER""" UNDO!!!**  
è¦ç¹: ã¢ã­ï¼åè§ã¹ãã¼ã¹èªä½ã§ã¯ãªãï¼ãæ¿å¥ããè¡çºã¯è¡¨ç¤ºã½ããã®è²¬åã§ãããPrettierã®ãããªãã©ã¼ããã¿ã®è²¬åã§ã¯ããã¾ããï¼Prettierããããªãã¨ããããããã¨ã«ãããææ¸ãç ´å£ããè¡çºã¯å°åºèªãããããã®ã§ã¯ããã¾ããã

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
yarn prettier test.md --parser markdown-nocjsp --plugin path/to/prettier-plugin-md-nocjsp/src/index.js
```

## License

MIT License (same as Prettier itself)

This plugin reuses Prettier's code.
