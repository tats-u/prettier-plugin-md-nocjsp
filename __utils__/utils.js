const { format } = require("prettier");

/** @typedef {{quickFix?: boolean} & import("prettier").Options} FormatOption */

/**
 *
 * @param {string} language Language/parser name (with**out** `-nocjsp`)
 * @param {string} text what to be formatted
 * @param {FormatOption} options Options
 * @returns {string} formatted text
 */
function formatWithThisPlugin(language, text, option) {
  return format(text, {
    ...option,
    parser: `${language}-nocjsp`,
    plugins: ["prettier-plugin-md-nocjsp"],
  });
}

/**
 *
 * @param {string} text what to be formatted
 * @param {FormatOption} options Options
 * @returns {string} formatted text
 */
function formatMd(text, options) {
  return formatWithThisPlugin("markdown", text, options);
}

module.exports = { formatMd };
