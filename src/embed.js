"use strict";

const {
  inferParserByLanguage,
  getMaxContinuousCount,
} = require("./prettier/src/common/util.js");
const {
  builders: { hardline, markAsRoot },
  utils: { replaceEndOfLine },
} = require("./prettier/src/document/index.js");
const printFrontMatter = require("./prettier/src/utils/front-matter/print.js");
const { getFencedCodeBlockValue } = require("./prettier/src/language-markdown/utils.js");

/**
 * Patch function to block upstream parser
 * @param {*} lang Language name just after ```
 * @returns censored language name
 */
function modifyLanguage(lang) {
  switch (lang) {
    case "markdown":
    case "mdx":
    case "remark":
      return lang + "-nocjsp";
    default:
      return lang;
  }
}

function embed(path, print, textToDoc, options) {
  const node = path.getValue();

  if (node.type === "code" && node.lang !== null) {
    // add patch (intervenes in external parser call)
    const parser = inferParserByLanguage(modifyLanguage(node.lang), options);
    if (parser) {
      const styleUnit = options.__inJsTemplate ? "~" : "`";
      const style = styleUnit.repeat(
        Math.max(3, getMaxContinuousCount(node.value, styleUnit) + 1)
      );
      const doc = textToDoc(
        getFencedCodeBlockValue(node, options.originalText),
        { parser },
        { stripTrailingHardline: true }
      );
      return markAsRoot([
        style,
        node.lang,
        node.meta ? " " + node.meta : "",
        hardline,
        replaceEndOfLine(doc),
        hardline,
        style,
      ]);
    }
  }

  switch (node.type) {
    case "front-matter":
      return printFrontMatter(node, textToDoc);

    // MDX
    case "importExport":
      return [
        textToDoc(
          node.value,
          { parser: "babel" },
          { stripTrailingHardline: true }
        ),
        hardline,
      ];
    case "jsx":
      return textToDoc(
        `<$>${node.value}</$>`,
        {
          parser: "__js_expression",
          rootMarker: "mdx",
        },
        { stripTrailingHardline: true }
      );
  }

  return null;
}

module.exports = embed;
