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
const {
  getFencedCodeBlockValue,
} = require("./prettier/src/language-markdown/utils.js");

/**
 * Removes the unwanted built-in Markdown plugin from plugins list in options.
 *
 * This allows our plugin to take precedence over the built-in plugin in code blocks.
 *
 * @param {*} options options to be censored
 * @returns modified options with censored plugins list
 */
function removeBuiltInMarkdownPlugin(options) {
  const newPlugins = options.plugins.filter(
    (plugin) =>
      !(
        plugin.languages.some(
          (language) => language.name.toLowerCase() === "markdown"
        ) &&
        Object.keys(plugin.printers).every(
          (printerName) => !printerName.endsWith("-nocjsp")
        )
      )
  );
  return { ...options, plugins: newPlugins };
}

function embed(path, print, textToDoc, options) {
  const node = path.getValue();

  if (node.type === "code" && node.lang !== null) {
    // add patch (intervenes in external parser call)
    const parser = inferParserByLanguage(
      node.lang,
      removeBuiltInMarkdownPlugin(options)
    );
    if (parser) {
      const styleUnit = options.__inJsTemplate ? "~" : "`";
      const style = styleUnit.repeat(
        Math.max(3, getMaxContinuousCount(node.value, styleUnit) + 1)
      );
      const newOptions = { parser };
      if (node.lang === "tsx") {
        newOptions.filepath = "dummy.tsx";
      }
      const doc = textToDoc(
        getFencedCodeBlockValue(node, options.originalText),
        newOptions,
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
