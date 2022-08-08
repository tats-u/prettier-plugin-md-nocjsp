const { formatMd } = require("../../__utils__/utils.js");
/**
 * `expect(formatMd(test))`
 *
 * @param {string} text what to be formatted
 */
const expectFormat = (text) => expect(formatMd(text));
/**
 * `expectFormat(before).toBe(after)`
 *
 * @param {string} before before format
 * @param {string} after after format
 */
const formatCompare = (before, after) => expectFormat(before).toBe(after);

describe("Markdown in Markdown", () => {
  it("Extra spaces", () => {
    formatCompare(
      "```markdown\n#  第   1   章\n```\n",
      "```markdown\n# 第 1 章\n```\n"
    );
  });
  it("Unusual list mark", () => {
    formatCompare(
      "```markdown\n+ 項目1\n+ 項目  2\n```\n",
      "```markdown\n- 項目1\n- 項目 2\n```\n"
    );
  });
});
