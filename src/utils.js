"use strict";

const { getLast } = require("./prettier/src/common/util.js");
// const { locStart, locEnd } = require("./prettier/src/language-markdown/loc.js");
const {
  cjkPattern,
  kPattern,
  punctuationPattern,
} = require("./prettier/src/language-markdown/constants.evaluate.js");

// const INLINE_NODE_TYPES = [
//   "liquidNode",
//   "inlineCode",
//   "emphasis",
//   "strong",
//   "delete",
//   "wikiLink",
//   "link",
//   "linkReference",
//   "image",
//   "imageReference",
//   "footnote",
//   "footnoteReference",
//   "sentence",
//   "whitespace",
//   "word",
//   "break",
//   "inlineMath",
// ];

// const INLINE_NODE_WRAPPER_TYPES = [
//   ...INLINE_NODE_TYPES,
//   "tableCell",
//   "paragraph",
//   "heading",
// ];

const kRegex = new RegExp(kPattern);
const punctuationRegex = new RegExp(punctuationPattern);

/**
 * split text into whitespaces and words
 * @param {string} text
 */
function splitText(text, options) {
  const KIND_NON_CJK = "non-cjk";
  const KIND_CJ_LETTER = "cj-letter";
  const KIND_K_LETTER = "k-letter";
  // const KIND_CJK_LETTER = "cjk-letter";
  const KIND_CJK_PUNCTUATION = "cjk-punctuation";

  /** @type {Array<{ type: "whitespace", value: " " | "\n" | "" } | { type: "word", value: string }>} */
  const nodes = [];

  const tokens = (
    options.proseWrap === "preserve"
      ? text
      : text.replace(
          new RegExp(`(${cjkPattern})\n(${cjkPattern})`, "g"),
          "$1$2"
        )
  ).split(/([\t\n ]+)/);
  for (const [index, token] of tokens.entries()) {
    // whitespace
    if (index % 2 === 1) {
      nodes.push({
        type: "whitespace",
        value: /\n/.test(token) ? "\n" : " ",
      });
      continue;
    }

    // word separated by whitespace

    if ((index === 0 || index === tokens.length - 1) && token === "") {
      continue;
    }

    const innerTokens = token.split(new RegExp(`(${cjkPattern})`));
    for (const [innerIndex, innerToken] of innerTokens.entries()) {
      if (
        (innerIndex === 0 || innerIndex === innerTokens.length - 1) &&
        innerToken === ""
      ) {
        continue;
      }

      // non-CJK word
      if (innerIndex % 2 === 0) {
        if (innerToken !== "") {
          appendNode(
            {
              type: "word",
              value: innerToken,
              kind: KIND_NON_CJK,
              hasLeadingPunctuation: punctuationRegex.test(innerToken[0]),
              hasTrailingPunctuation: punctuationRegex.test(
                getLast(innerToken)
              ),
            },
            options
          );
        }
        continue;
      }

      // CJK character
      appendNode(
        punctuationRegex.test(innerToken)
          ? {
              type: "word",
              value: innerToken,
              kind: KIND_CJK_PUNCTUATION,
              hasLeadingPunctuation: true,
              hasTrailingPunctuation: true,
            }
          : {
              type: "word",
              value: innerToken,
              // We don't have to disrtinguish between Korean, and Chinese & Japanese letters now.
              kind: kRegex.test(innerToken) ? KIND_K_LETTER : KIND_CJ_LETTER,
              // kind: KIND_CJK_LETTER,
              hasLeadingPunctuation: false,
              hasTrailingPunctuation: false,
            },
        options
      );
    }
  }

  return nodes;

  // https://github.com/prettier/prettier/pull/8526/files
  function appendNode(node, options) {
    const lastNode = getLast(nodes);
    if (lastNode) {
      if (options.quickFix) {
        const secondLastNode = nodes[nodes.length - 2];
        if (
          secondLastNode &&
          lastNode.type === "whitespace" &&
          lastNode.value === " " &&
          ((secondLastNode.kind === KIND_NON_CJK &&
            node.kind === KIND_CJ_LETTER &&
            !secondLastNode.hasTrailingPunctuation) ||
            (secondLastNode.kind === KIND_CJ_LETTER &&
              node.kind === KIND_NON_CJK &&
              !node.hasLeadingPunctuation))
        ) {
          // Remove extra space (= lastNode)
          nodes.pop();
        }
      }
      if (lastNode.type === "word") {
        // Most important change: remove adding space
        if (
          !isBetween(KIND_NON_CJK, KIND_CJK_PUNCTUATION) &&
          // disallow leading/trailing full-width whitespace
          ![lastNode.value, node.value].some((value) => /\u3000/.test(value))
        ) {
          nodes.push({ type: "whitespace", value: "" });
        }
      }
    }
    nodes.push(node);

    function isBetween(kind1, kind2) {
      return (
        (lastNode.kind === kind1 && node.kind === kind2) ||
        (lastNode.kind === kind2 && node.kind === kind1)
      );
    }
  }
}

module.exports = {
  splitText,
};
