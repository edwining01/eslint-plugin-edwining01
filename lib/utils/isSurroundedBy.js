
/**
* Validate that a string passed in is surrounded by the specified character
* @param  {string} val The text to check.
* @param  {string} character The character to see if it's surrounded by.
* @returns {boolean} True if the text is surrounded by the character, false if not.
* @private
* @link https://github.com/eslint/eslint/blob/master/lib/rules/utils/ast-utils.js
*/
module.exports = function isSurroundedBy(val, character) {
  return val[0] === character && val[val.length - 1] === character
}
