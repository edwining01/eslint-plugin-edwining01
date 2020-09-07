
/**
 * Determines whether two adjacent tokens are on the same line.
 * @param {Object} left The left token object.
 * @param {Object} right The right token object.
 * @returns {boolean} Whether or not the tokens are on the same line.
 * @public
 * @link https://github.com/eslint/eslint/blob/master/lib/rules/utils/ast-utils.js
 */

module.exports = function isTokenOnSameLine(left, right) {
  return left.loc.end.line === right.loc.start.line
}
