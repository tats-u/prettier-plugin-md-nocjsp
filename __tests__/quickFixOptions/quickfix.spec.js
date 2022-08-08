const { formatMd } = require("../../__utils__/utils.js");

/**
 * Formats with quick fix.
 *
 * @param {string} text what to be formatted
 * @returns {string} formatted text
 */
const quickFix = (text) => formatMd(text, { quickFix: true });
/**
 * `expect(quickFix(test))`
 *
 * @param {string} text what to be formatted
 */
const expectFormat = (text) => expect(quickFix(text));
/**
 * `expectFormat(before).toBe(after)`
 *
 * @param {string} before before format
 * @param {string} after after format
 */
const formatCompare = (before, after) => expectFormat(before).toBe(after);

describe("Quick fix", () => {
  it("single number", () => {
    formatCompare("第 1 章\n", "第1章\n");
  });
  it("several words", () => {
    formatCompare(
      "#  1.   英語由来のことわざ\n時は金なりは、英語の Time is money に由来することわざです。\n",
      "# 1. 英語由来のことわざ\n\n時は金なりは、英語のTime is moneyに由来することわざです。\n"
    );
  });
  it("embedded Markdown snippets", () => {
    formatCompare(
      "第 1 章\n\n```markdown\n第 1 章\n```\n",
      "第1章\n\n```markdown\n第1章\n```\n"
    );
  });
  it("embedded foreign language snippets", () => {
    formatCompare(
      "JS のサンプル\n\n```js\nconsole.log(\"みんな Prettier を使え\");\n```\n",
      "JSのサンプル\n\n```js\nconsole.log(\"みんな Prettier を使え\");\n```\n"
    );
  });
});
