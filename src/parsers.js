"use strict";

const baseParsers = require("./prettier/src/language-markdown/parser-markdown.js")
  .parsers;
const modifiedParsers = Object.fromEntries(
  Object.entries(baseParsers).map(([lang, parser]) => [
    lang,
    { ...parser, astFormat: parser.astFormat + "-nocjsp" },
  ])
);

module.exports = {
  /* istanbul ignore next */
  get "remark-nocjsp"() {
    return modifiedParsers.remark;
  },
  get "markdown-nocjsp"() {
    return modifiedParsers.remark;
  },
  get "mdx-nocjsp"() {
    return modifiedParsers.mdx;
  },
};
