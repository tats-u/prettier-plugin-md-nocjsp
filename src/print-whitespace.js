// From Prettier 3.x (modified)
// Coauthored with Georgii Dolzhykov (@thorn0) (one of the maintainers of Prettier)

const {
  builders: { hardline, line, softline },
} = require("./prettier/src/document/index.js");
const {
  KIND_CJK_PUNCTUATION,
  KIND_CJ_LETTER,
  KIND_K_LETTER,
  KIND_NON_CJK,
} = require("./utils.js");
const {
  getAncestorNode,
} = require("./printer-markdown-utils.js");
/**
 * @typedef {import("./utils.js").WordNode} WordNode
 * @typedef {import("./utils.js").WhitespaceValue} WhitespaceValue
 * @typedef {import("./utils.js").WordKind} WordKind
 * @typedef {import("./prettier/src/common/ast-path.js").default} AstPath
 * @typedef {"always" | "never" | "preserve"} ProseWrap
 * @typedef {{ next?: WordNode | null, previous?: WordNode | null }}
 * AdjacentNodes Nodes adjacent to a `whitespace` node. Are always of type
 * `word`.
 */

const SINGLE_LINE_NODE_TYPES = ["heading", "tableCell", "link", "wikiLink"];

/**
 * These characters must not immediately precede a line break.
 *
 * e.g. `"（"`:
 *
 * - Bad:  `"檜原村（\nひのはらむら）"`
 * - Good: `"檜原村\n（ひのはらむら）"` or
 *         `"檜原村（ひ\nのはらむら）"`
 */
const noBreakAfter = new Set(
  "$(£¥·'\"〈《「『【〔〖〝﹙﹛＄（［｛￡￥[{‵︴︵︷︹︻︽︿﹁﹃﹏〘｟«"
);

/**
 * These characters must not immediately follow a line break.
 *
 * e.g. `"）"`:
 *
 * - Bad:  `"檜原村（ひのはらむら\n）以外には、"`
 * - Good: `"檜原村（ひのはらむ\nら）以外には、"` or
 *         `"檜原村（ひのはらむら）\n以外には、"`
 */
const noBreakBefore = new Set(
  "!%),.:;?]}¢°·'\"†‡›℃∶、。〃〆〕〗〞﹚﹜！＂％＇），．：；？］｝～–—•〉》」︰︱︲︳﹐﹑﹒﹓﹔﹕﹖﹘︶︸︺︼︾﹀﹂﹗｜､』】〙〟｠»ヽヾーァィゥェォッャュョヮヵヶぁぃぅぇぉっゃゅょゎゕゖㇰㇱㇲㇳㇴㇵㇶㇷㇸㇹㇺㇻㇼㇽㇾㇿ々〻‐゠〜～‼⁇⁈⁉・"
);

/**
 * A line break between a character from this set and CJ can be converted to a
 * space. Includes only ASCII punctuation marks for now.
 */
const lineBreakBetweenTheseAndCJConvertsToSpace = new Set(
  "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
);

/**
 * Get adjacent nodes of the path of the given node.
 *
 * @param {*} path
 * @returns {AdjacentNodes} adjacent nodes information structure
 */
function getAdjacentNodes(path) {
  return {
    next: path.stack.at(-3)[path.stack.at(-2) + 1] ?? null,
    previous: path.stack.at(-3)[path.stack.at(-2) - 1] ?? null,
  };
}

/**
 *
 * Determine the preferred style of spacing between Chinese or Japanese and non-CJK
 * characters in the parent `sentence` node.
 *
 * @param {AstPath} path
 * @returns {boolean} `true` if Space tends to be inserted between CJ and
 * non-CJK, `false` otherwise.
 */
function isInSentenceWithCJSpaces(path) {
  const sentenceNode = path.getParentNode();
  if (sentenceNode.usesCJSpaces === undefined) {
    const stats = { " ": 0, "": 0 };
    const { children } = sentenceNode;

    for (let i = 1; i < children.length - 1; ++i) {
      const node = children[i];
      if (
        node.type === "whitespace" &&
        (node.value === " " || node.value === "")
      ) {
        const previousKind = children[i - 1].kind;
        const nextKind = children[i + 1].kind;
        if (
          (previousKind === KIND_CJ_LETTER && nextKind === KIND_NON_CJK) ||
          (previousKind === KIND_NON_CJK && nextKind === KIND_CJ_LETTER)
        ) {
          ++stats[node.value];
        }
      }
    }

    // Inject a property to cache the result.
    sentenceNode.usesCJSpaces = stats[" "] > stats[""];
  }

  return sentenceNode.usesCJSpaces;
}

/**
 * Check whether the given `"\n"` node can be converted to a space.
 *
 * For example, if you would like to squash English text
 *
 *     "You might want\nto use Prettier."
 *
 * into a single line, you would replace `"\n"` with `" "`:
 *
 *     "You might want to use Prettier."
 *
 * However, Chinese and Japanese don't use U+0020 Space to divide words, so line
 * breaks shouldn't be replaced with spaces for those languages.
 *
 * PRs are welcome to support line breaking rules for other languages.
 *
 * @param {AstPath} path
 * @param {boolean} isLink
 * @param {quickFIx} boolean See that in `printWhitespace`
 * @returns {boolean}
 */
function lineBreakCanBeConvertedToSpace(path, isLink, quickFix) {
  if (isLink) {
    return true;
  }

  /** @type {AdjacentNodes} */
  const { previous, next } = getAdjacentNodes(path);

  // e.g. " \nletter"
  if (!previous || !next) {
    return true;
  }

  const previousKind = previous.kind;
  const nextKind = next.kind;

  if (
    // "\n" between non-CJK or Korean characters always can be converted to a
    // space. Korean Hangul simulates Latin words. See
    // https://github.com/prettier/prettier/issues/6516
    (isNonCJKOrKoreanLetter(previousKind) &&
      isNonCJKOrKoreanLetter(nextKind)) ||
    // Han & Hangul: same way preferred
    (previousKind === KIND_K_LETTER && nextKind === KIND_CJ_LETTER) ||
    (nextKind === KIND_K_LETTER && previousKind === KIND_CJ_LETTER)
  ) {
    return true;
  }

  // Do not convert \n to a space:
  if (
    // around CJK punctuation
    previousKind === KIND_CJK_PUNCTUATION ||
    nextKind === KIND_CJK_PUNCTUATION ||
    // between CJ
    (previousKind === KIND_CJ_LETTER && nextKind === KIND_CJ_LETTER)
  ) {
    return false;
  }

  // The rest of this function deals only with line breaks between CJ and
  // non-CJK characters.

  // Convert a line break between CJ and certain non-letter characters (e.g.
  // ASCII punctuation) to a space.
  //
  // E.g. :::\n句子句子句子\n::: → ::: 句子句子句子 :::
  //
  // Note: line breaks like "(\n句子句子\n)" or "句子\n." are suppressed in
  // `isBreakable(...)`.
  if (
    lineBreakBetweenTheseAndCJConvertsToSpace.has(next.value[0]) ||
    lineBreakBetweenTheseAndCJConvertsToSpace.has(previous.value.at(-1))
  ) {
    return true;
  }

  // Converting a line break between CJ and non-ASCII punctuation to a space is
  // undesired in many cases. PRs are welcome to fine-tune this logic.
  //
  // Examples where \n must not be converted to a space:
  //
  // 1. "〜" (U+301C, belongs to Pd) in
  //
  //     "ア〜\nエの中から1つ選べ。"
  //
  // 2. "…" (U+2026, belongs to Po) in
  //
  //     "これはひどい……\nなんと汚いコミットログなんだ……"
  if (previous.hasTrailingPunctuation || next.hasLeadingPunctuation) {
    return false;
  }

  // If the sentence uses the style with spaces between CJ and non-CJK, "\n" can
  // be converted to a space.
  // specifci in this plugin; in quick fix mode, no-space style is forced.
  return !quickFix && isInSentenceWithCJSpaces(path);
}

/**
 * @param {WordKind | undefined} kind
 * @returns {boolean} `true` if `kind` is defined and not CJK punctuation
 */
function isLetter(kind) {
  return (
    kind === KIND_NON_CJK || kind === KIND_CJ_LETTER || kind === KIND_K_LETTER
  );
}

/**
 * @param {WordKind | undefined} kind
 * @returns {boolean} `true` if `kind` is Korean letter or non-CJK
 */
function isNonCJKOrKoreanLetter(kind) {
  return kind === KIND_NON_CJK || kind === KIND_K_LETTER;
}

/**
 * Check whether whitespace can be printed as a line break.
 *
 * @param {AstPath} path
 * @param {WhitespaceValue} value
 * @param {ProseWrap} proseWrap
 * @param {boolean} isLink
 * @param {boolean} canBeSpace
 * @returns {boolean}
 */
function isBreakable(path, value, proseWrap, isLink, canBeSpace) {
  if (proseWrap !== "always" || getAncestorNode(path, SINGLE_LINE_NODE_TYPES)) {
    return false;
  }

  if (isLink) {
    return value !== "";
  }

  // Spaces are always breakable
  if (value === " ") {
    return true;
  }

  /** @type {AdjacentNodes} */
  const { previous, next } = getAdjacentNodes(path);

  // Simulates Latin words; see https://github.com/prettier/prettier/issues/6516
  // [Latin][""][Hangul] & vice versa => Don't break
  // [Han & Kana][""][Hangul], either
  if (
    value === "" &&
    ((previous?.kind === KIND_K_LETTER && isLetter(next?.kind)) ||
      (next?.kind === KIND_K_LETTER && isLetter(previous?.kind)))
  ) {
    return false;
  }

  // https://en.wikipedia.org/wiki/Line_breaking_rules_in_East_Asian_languages
  const violatesCJKLineBreakingRules =
    !canBeSpace &&
    ((next && noBreakBefore.has(next.value[0])) ||
      (previous && noBreakAfter.has(previous.value.at(-1))));

  if (violatesCJKLineBreakingRules) {
    return false;
  }

  return true;
}

// specific in this plugin
/**
 * `true` unless Space should be removed
 *
 * @param {AstPath} path
 * @param {boolean} quickFix See that in `printWhitespace`
 */
function canRetainSpace(path, quickFix) {
  if (!quickFix) {
    return true;
  }
  /** @type {AdjacentNodes} */
  const { previous, next } = getAdjacentNodes(path);

  if (!previous || !next) {
    return true;
  }

  // [Japanese (or Chinese)] [Space] [English] or vice versa
  // [Space] must be removed because it is considered to have been inserted by Prettier 2.x.
  // Even in Prettier 2.x, [Japanese (or Chinese)] [non-CJK punctuation] [non-CJK characters] and vice versa are not the target of the Space injection between [Japanese (or Chinese)] and [non-CJK punctuation].
  // If there is Space between them, it is also in the source.
  if (
    (previous.kind === KIND_CJ_LETTER &&
      next.kind === KIND_NON_CJK &&
      !next.hasLeadingPunctuation) ||
    (previous.kind === KIND_NON_CJK &&
      next.kind === KIND_CJ_LETTER &&
      !previous.hasTrailingPunctuation)
  ) {
    return false;
  }

  return true;
}

/**
 * @param {AstPath} path
 * @param {WhitespaceValue} value
 * @param {ProseWrap} proseWrap
 * @param {boolean} [isLink] Special mode of (un)wrapping that preserves the
 * normalized form of link labels. https://spec.commonmark.org/0.30/#matches
 * @param {boolean} quickFix removes Space that has been inserted before. (specific in this plugin)
 */
function printWhitespace(path, value, proseWrap, isLink, quickFix) {
  if (proseWrap === "preserve" && value === "\n") {
    return hardline;
  }

  const canBeSpace =
    (value === " " && canRetainSpace(path, quickFix)) ||
    (value === "\n" && lineBreakCanBeConvertedToSpace(path, isLink, quickFix));

  if (isBreakable(path, value, proseWrap, isLink, canBeSpace)) {
    return canBeSpace ? line : softline;
  }

  return canBeSpace ? " " : "";
}

module.exports = { printWhitespace };
