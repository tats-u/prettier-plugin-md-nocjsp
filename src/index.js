"use strict";

const createLanguage = require("./prettier/src/utils/create-language.js");
const printer = require("./printer-markdown.js");
const options = require("./prettier/src/language-markdown/options.js");
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

module.exports = {
  languages,
  options,
  printers,
  parsers,
};
