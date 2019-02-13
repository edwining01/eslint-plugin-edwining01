/**
 * @fileoverview Force import uses single quote
 * @author Edwin Ting <40881695+edwining01@users.noreply.github.com>
 */
"use strict"

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
const astUtils = require('eslint/lib/util/ast-utils')

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
const IMPORT = "import"
const REQUIRE = "require"

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
    fixable: "code",
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
    
    function checkLiteral(node, targetNode, importerName) {
      if (!astUtils.isStringLiteral(targetNode)) return
      if (!astUtils.isSurroundedBy(targetNode.raw, setting.fromQuote)) return

      context.report({
        node,
        message: `Do not use double quote for ${importerName}. Expect to use single quote.`,
        fix(fixer) {
          return fixer.replaceText(targetNode, setting.convert(targetNode.raw))
        }
      })
    }
    
    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------
    
    return {
      ImportDeclaration(node) {
        checkLiteral(node, node.source, IMPORT)
      },
      CallExpression(node) {
        let importerName
        if(node.callee.name == REQUIRE) {
          importerName = REQUIRE
        } else if (node.callee.type == "Import") {
          importerName = "dynamic import"
        } else {
          return
        }
        node.arguments.forEach((arg) => checkLiteral(node, arg, importerName))
      },
    }
  }
}
