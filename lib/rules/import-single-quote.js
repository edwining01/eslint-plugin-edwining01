/**
 * @fileoverview Force import uses single quote
 * @author Edwin Ting <40881695+edwining01@users.noreply.github.com>
 */
"use strict"

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
const astUtils = require('eslint/lib/ast-utils')

//------------------------------------------------------------------------------
// Constants
//------------------------------------------------------------------------------

const QUOTE_SETTINGS = {
  "prefer-single": {
    fromQuote: "\"",
    toQuote: "'",
    description: "Double quote to single quote.",
    convert(str) {
      return str.replace(/"/g, "'")
    }
  }
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "Force import use single quotes",
      category: "import",
      recommended: true,
    },
    fixable: "whitespace", // or "code" or "whitespace"!!!
    schema: [
      {
        enum: Object.values(QUOTE_SETTINGS)
      }
    ]
  },

  create: function(context) {
    const option0 = context.options[0] || "prefer-single"
    const setting = QUOTE_SETTINGS[option0]

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------
    
    return {
      ImportDeclaration(node) {
        const targetNode = node.source
        
        if (!astUtils.isStringLiteral(targetNode)) return
        if (!astUtils.isSurroundedBy(targetNode.raw, setting.fromQuote)) return

        context.report({
          node,
          message: "Do not use double quote for import. Expect to use single quote.",
          fix(fixer) {
            return fixer.replaceText(targetNode, setting.convert(targetNode.raw))
          }
        })
      }
    }
  }
}
