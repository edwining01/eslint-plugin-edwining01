/**
 * @fileoverview Validates spacing before and after conditional (ternary) operators
 * @author Edwin Ting <40881695+edwining01@users.noreply.github.com>
 * Ref: {@link https://github.com/eslint/eslint/blob/master/lib/rules/semi-spacing.js}
 */

const astUtils = require('eslint/lib/util/ast-utils')

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
module.exports = {
  meta: {
    type: "layout",
    docs: {
      description: "enforce consistent spacing before and after conditional (ternary) operators",
      category: "Stylistic Issues",
      recommended: true,
      url: "https://eslint.org/docs/rules/semi-spacing"
    },
    fixable: "whitespace",
    schema: [
      {
        type: "object",
        properties: {
          questionMark: {
            type: "object",
            properties: {
              before: {
                type: "boolean",
                default: false,
              },
              after: {
                type: "boolean",
                default: true,
              },
            },
          },
          colon: {
            type: "object",
            properties: {
              before: {
                type: "boolean",
                default: false,
              },
              after: {
                type: "boolean",
                default: true,
              },
            },
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const config = context.options[0] || {}
    const questionMarkConfig = config.questionMark
    const colonConfig = config.colon
    const expectSpaceBeforeQuestionMark = questionMarkConfig? questionMarkConfig.before === true: false
    const expectSpaceAfterQuestionMark = questionMarkConfig? questionMarkConfig.after === true: true
    const expectSpaceBeforeColon = colonConfig? colonConfig.before === true: false
    const expectSpaceAfterColon = colonConfig? colonConfig.after === true: true
    const sourceCode = context.getSourceCode()

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------
    
    /**
     * Report errors
     *
     * @param {Token} token - The token to check.
     * @param {ASTNode} node The corresponding node of the token.
     * @param {Boolean} expectSpace `true` for expect whitespace; `false` for expect no whitespace.
     * @param {Boolean} isBeforeAfter `true` for before; `false` for after.
     * @returns {void}
     */
    function report(token, node, expectSpace, isBefore) {
      const tokenName = token.value == "?"? "question mark":
        token.value == ":"? "colon": false
      if(!tokenName)
        throw new Error(`Unexpected token: \`${token.value}\``)
      
      const message = `Expect ${expectSpace? "": "no "}whitespace ${isBefore? "before": "after"} ${tokenName}.`
      let fix
      if(isBefore) {
        if(expectSpace) {
          fix = function(fixer) {
            return fixer.insertTextBefore(token, " ")
          }
        } else { // expectNoSpace
          fix = function(fixer) {
            const tokenBefore = sourceCode.getTokenBefore(token)
            return fixer.removeRange([tokenBefore.range[1], token.range[0]])
          }
        }
      } else { // isAfter
        if(expectSpace) {
          fix = function(fixer) {
            return fixer.insertTextAfter(token, " ")
          }
        } else { // expectNoSpace
          fix = function(fixer) {
            const tokenAfter = sourceCode.getTokenAfter(token)
            return fixer.removeRange([token.range[1], tokenAfter.range[0]])
          }
        }
      }
      
      context.report({ node, loc: token.loc.start, message, fix })
    }
    
    /**
     * Checks if the given token is a question mark token or not.
     *
     * @param {Token} token - The token to check.
     * @returns {boolean} `true` if the token is a question mark token.
     */
    function isQuestionMarkToken(token) {
      return token.value == "?" && token.type == "Punctuator"
    }

    /**
     * Checks if the given token is a colon token or not.
     *
     * @param {Token} token - The token to check.
     * @returns {boolean} `true` if the token is a colon token.
     */
    function isColonToken(token) {
      return token.value == ":" && token.type == "Punctuator"
    }
    
    /**
     * Checks if a given token has leading whitespace.
     * @param {Object} token The token to check.
     * @returns {boolean} True if the given token has leading space, false if not.
     */
    function hasLeadingSpace(token) {
      const tokenBefore = sourceCode.getTokenBefore(token)
      return tokenBefore && astUtils.isTokenOnSameLine(tokenBefore, token) &&
        sourceCode.isSpaceBetweenTokens(tokenBefore, token)
    }

    /**
     * Checks if a given token has trailing whitespace.
     * @param {Object} token The token to check.
     * @returns {boolean} True if the given token has trailing space, false if not.
     */
    function hasTrailingSpace(token) {
      const tokenAfter = sourceCode.getTokenAfter(token)
      return tokenAfter && astUtils.isTokenOnSameLine(token, tokenAfter) &&
        sourceCode.isSpaceBetweenTokens(token, tokenAfter)
    }

    /**
     * Reports if the given token has invalid spacing.
     * @param {Token} token The operator token to check.
     * @param {ASTNode} node The corresponding node of the token.
     * @returns {void}
     */
    function checkOperatorSpacing(token, node) {
      const tokenIsQuestionMark = isQuestionMarkToken(token)
      const tokenIsColon = isColonToken(token)
      
      if (!tokenIsQuestionMark && !tokenIsColon) return
      
      const tokenHasLeadingSpace = hasLeadingSpace(token)
      const tokenHasTrailingSpace = hasTrailingSpace(token)
      
      if(tokenIsQuestionMark) {
        if(expectSpaceBeforeQuestionMark) {
          if(!tokenHasLeadingSpace)
            report(token, node, expectSpaceBeforeQuestionMark, true)
        } else { // expectNoSpaceBeforeQuestionMark
          if(tokenHasLeadingSpace)
            report(token, node, expectSpaceBeforeQuestionMark, true)
        } 
        
        if(expectSpaceAfterQuestionMark) {
          if(!tokenHasTrailingSpace) 
            report(token, node, expectSpaceAfterQuestionMark, false)
        } else { // expectNoSpaceAfterQuestionMark
          if(tokenHasTrailingSpace) 
            report(token, node, expectSpaceAfterQuestionMark, false)
        }
      } else { // tokenIsColon
        if(expectSpaceBeforeColon) {
          if(!tokenHasLeadingSpace)
            report(token, node, expectSpaceBeforeColon, true)
        } else { // expectNoSpaceBeforeColon
          if(tokenHasLeadingSpace)
            report(token, node, expectSpaceBeforeColon, true)
        } 
        
        if(expectSpaceAfterColon) {
          if(!tokenHasTrailingSpace) 
            report(token, node, expectSpaceAfterColon, false)
        } else { // expectNoSpaceAfterColon
          if(tokenHasTrailingSpace) 
            report(token, node, expectSpaceAfterColon, false)
        }
      }
    }
    
    return {
      ConditionalExpression(node) {
        const { test, consequent, } = node
        
        checkOperatorSpacing(sourceCode.getTokenAfter(test), node)
        checkOperatorSpacing(sourceCode.getTokenAfter(consequent), node)
      }
    }
  }
}
