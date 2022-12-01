const { formatMd } = require("../../__utils__/utils.js");

/**
 * `expect(quickFix(test))`
 *
 * @param {import("../../__utils__/utils.js").FormatOption} formatOption
 * @returns {(text: string) => string} text what to be formatted
 */
const expectFormatBase = (formatOption) => (text) =>
  expect(formatMd(text, formatOption));
/**
 * `expectFormat(before).toBe(after)`
 *
 * @param {import("../../__utils__/utils.js").FormatOption} formatOption
 * @returns {(before: string, after: string) => boolean} text what to be formatted
 */
const formatCompareBase = (formatOption) => (before, after) =>
  expectFormatBase(formatOption)(before).toBe(after);

describe("proseWrap = never", () => {
  const formatCompare = formatCompareBase({ proseWrap: "never" });
  it("Alnum only", () => {
    formatCompare("Prettier\nvs\nRome", "Prettier vs Rome\n");
  });
  it("Alnum -- Japanese Ambiguous", () => {
    formatCompare(
      "日本語\nEnglish\nにほんご\n123",
      "日本語Englishにほんご123\n"
    );
  });
  it("Alnum -- Japanese / no space", () => {
    formatCompare(
      "日本語Englishにほんご123日本語\nEnglish\nにほんご\n123",
      "日本語Englishにほんご123日本語Englishにほんご123\n"
    );
    formatCompare(
      "日本語English にほんご123日本語\nEnglish\nにほんご\n123",
      "日本語English にほんご123日本語Englishにほんご123\n"
    );
    formatCompare(
      "日本語 English にほんご123日本語\nEnglish\nにほんご\n123",
      "日本語 English にほんご123日本語Englishにほんご123\n"
    );
  });
  it("Alnum -- Japanese / space", () => {
    formatCompare(
      "日本語 English にほんご 123 日本語\nEnglish\nにほんご\n123",
      "日本語 English にほんご 123 日本語 English にほんご 123\n"
    );
    formatCompare(
      "日本語 English にほんご 123日本語\nEnglish\nにほんご\n123",
      "日本語 English にほんご 123日本語 English にほんご 123\n"
    );
  });
  it("Japanese -- Japanese", () => {
    formatCompare("日\n本\n語\nに\nほ\nん\nご", "日本語にほんご\n");
  });
  it("CJK Punctuations", () => {
    formatCompare(
      "日本語\n、\nEnglish\n。\n日本語\n、\nEnglish\n。\n",
      "日本語、English。日本語、English。\n"
    );
  });
  it("Latin Punctuations", () => {
    formatCompare(
      "日本語,\nEnglish.\n日本語,\nEnglish.\n",
      "日本語, English. 日本語, English.\n"
    );
    formatCompare(":::\nwarning\n日本語\n:::\n", "::: warning日本語 :::\n");
  });
  it("Korean mix", () => {
    formatCompare(
      "大草原不可避\nㅋㅋㅋ\nㅎㅎㅎ\nLMFAO\n",
      "大草原不可避 ㅋㅋㅋ ㅎㅎㅎ LMFAO\n"
    );
  });
});

describe("proseWrap = never & quickFix", () => {
  const formatCompare = formatCompareBase({
    proseWrap: "never",
    quickFix: true,
  });
  it("Alnum only", () => {
    formatCompare("Prettier\nvs\nRome", "Prettier vs Rome\n");
  });
  it("Alnum -- Japanese Ambiguous", () => {
    formatCompare(
      "日本語\nEnglish\nにほんご\n123",
      "日本語Englishにほんご123\n"
    );
  });
  it("Alnum -- Japanese", () => {
    formatCompare(
      "日本語Englishにほんご123日本語\nEnglish\nにほんご\n123",
      "日本語Englishにほんご123日本語Englishにほんご123\n"
    );
    formatCompare(
      "日本語English にほんご123日本語\nEnglish\nにほんご\n123",
      "日本語Englishにほんご123日本語Englishにほんご123\n"
    );
    formatCompare(
      "日本語 English にほんご123日本語\nEnglish\nにほんご\n123",
      "日本語Englishにほんご123日本語Englishにほんご123\n"
    );
    formatCompare(
      "日本語 English にほんご 123 日本語\nEnglish\nにほんご\n123",
      "日本語Englishにほんご123日本語Englishにほんご123\n"
    );
    formatCompare(
      "日本語 English にほんご 123日本語\nEnglish\nにほんご\n123",
      "日本語Englishにほんご123日本語Englishにほんご123\n"
    );
  });
  it("Japanese -- Japanese", () => {
    formatCompare("日\n本\n語\nに\nほ\nん\nご", "日本語にほんご\n");
  });
  it("CJK Punctuations", () => {
    formatCompare(
      "日本語\n、\nEnglish\n。\n日本語\n、\nEnglish\n。\n",
      "日本語、English。日本語、English。\n"
    );
  });
  it("Latin Punctuations", () => {
    formatCompare(
      "日本語,\nEnglish.\n日本語,\nEnglish.\n",
      "日本語, English. 日本語, English.\n"
    );
    formatCompare(":::\nwarning\n日本語\n:::\n", "::: warning日本語 :::\n");
  });
  it("Korean mix", () => {
    formatCompare(
      "大草原不可避\nㅋㅋㅋ\nㅎㅎㅎ\nLMFAO\n",
      "大草原不可避 ㅋㅋㅋ ㅎㅎㅎ LMFAO\n"
    );
  });
});

describe("proseWrap = always", () => {
  const formatCompare = formatCompareBase({
    proseWrap: "always",
    printWidth: 10,
  });
  it("Japanese & Alnum", () => {
    formatCompare("あ\nい\nう\n1\n2\n3\nえ\nお", "あいう1 2\n3えお\n");
    formatCompare("あ\nい\nう1\n2\n3\nえ\nお", "あいう1 2\n3えお\n");
    formatCompare("あ\nい\nう1\n2\n3 え\nお", "あいう1 2\n3 えお\n");
  });
  it("Japanese & Alnum (space)", () => {
    formatCompare("あ\nい\nう 1\n2\n3\nえ\nお", "あいう 1 2\n3 えお\n");
  });
  it("Punctuations", () => {
    formatCompare("あいうえお、かきくけこ", "あいうえ\nお、かきく\nけこ\n");
    formatCompare("あいうえお\n、かきくけこ", "あいうえ\nお、かきく\nけこ\n");
    formatCompare(
      "「（あい！？）」「（うえお）」",
      "「（あ\nい！？）」\n「（うえ\nお）」\n"
    );
  });
});
describe("proseWrap = always & quickFix", () => {
  const formatCompare = formatCompareBase({
    proseWrap: "always",
    printWidth: 10,
    quickFix: true,
  });
  it("Japanese & Alnum", () => {
    formatCompare("あ\nい\nう\n1\n2\n3\nえ\nお", "あいう1 2\n3えお\n");
    formatCompare("あ\nい\nう1\n2\n3\nえ\nお", "あいう1 2\n3えお\n");
    formatCompare("あ\nい\nう1\n2\n3 え\nお", "あいう1 2\n3えお\n");
    formatCompare("あ\nい\nう 1\n2\n3\nえ\nお", "あいう1 2\n3えお\n");
  });
});
