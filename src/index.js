"use strict";

const createLanguage = require("./prettier/src/utils/create-language.js");
const printer = require("./printer-markdown.js");
const baseOptions = require("./prettier/src/language-markdown/options.js");
const parsers = require("./parsers.js");

// We have to change names of parsers & AST
const languages = [
  createLanguage(require("linguist-languages/data/Markdown.json"), (data) => ({
    since: "1.8.0",
    parsers: ["markdown-nocjsp"],
    vscodeLanguageIds: ["markdown"],
    filenames: [...data.filenames, "README"],
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

const CATEGORY_THIS_PLUGIN = "plugin-markdown-nocjsp";

const options = {
  ...baseOptions,
  quickFix: {
    since: "0.0.0",
    category: CATEGORY_THIS_PLUGIN,
    type: "boolean",
    default: false,
    description: "Remove spaces between kanji(han)/kana & alphanumerics that has already been inserted by the plain Prettier. This option may delete even essential spaces, so you will have to review formatted documents. Also, you do not have to apply this option more than once.",
    oppositeDescription: "Retain spaces that has already been inserted. Of course, no new spaces will not be inserted. If documents have been formatted using this option, you can turn it off.",
  },
};

module.exports = {
  languages,
  options,
  printers,
  parsers,
};
