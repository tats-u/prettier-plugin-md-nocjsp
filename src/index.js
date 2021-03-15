"use strict";

const createLanguage = require("./prettier/src/utils/create-language");
const printer = require("./printer-markdown");
const options = require("./prettier/src/language-markdown/options");

const languages = [
  createLanguage(require("linguist-languages/data/Markdown.json"), (data) => ({
    since: "1.8.0",
    parsers: ["markdown-nocjsp"],
    vscodeLanguageIds: ["markdown"],
    filenames: data.filenames.concat(["README"]),
    extensions: data.extensions.filter((extension) => extension !== ".mdx"),
  })),
  createLanguage(require("linguist-languages/data/Markdown.json"), () => ({
    name: "MDX",
    since: "1.15.0",
    parsers: ["mdx-nocjsp"],
    vscodeLanguageIds: ["mdx"],
    filenames: [],
    extensions: [".mdx"],
  })),
];

const printers = {
  "mdast-nocjsp": printer,
};

const baseParsers = require("./prettier/src/language-markdown/parser-markdown")
  .parsers;
const modifiedParsers = Object.fromEntries(
  Object.entries(baseParsers).map(([lang, parser]) => [
    lang,
    { ...parser, astFormat: parser.astFormat + "-nocjsp" },
  ])
);

const parsers = {
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

module.exports = {
  languages,
  options,
  printers,
  parsers,
};
