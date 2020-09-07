
/**
 * Checks whether or not a given node is a string literal.
 * @param {ASTNode} node A node to check.
 * @returns {boolean} `true` if the node is a string literal.
 * @link https://github.com/eslint/eslint/blob/master/lib/rules/utils/ast-utils.js
 */
module.exports = function isStringLiteral(node) {
  return (
    (node.type === "Literal" && typeof node.value === "string") ||
    node.type === "TemplateLiteral"
  )
}
