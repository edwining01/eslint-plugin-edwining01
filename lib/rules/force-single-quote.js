/**
 * @fileoverview Force import uses single quote
 * @author Edwin Ting <40881695+edwining01@users.noreply.github.com>
 */
"use strict"

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
const isStringLiteral = require('../utils/isStringLiteral')
const isSurroundedBy = require('../utils/isSurroundedBy')

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
const DYNAMIC_IMPORT = "dynamic import"
const EXPORT = "export"

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "Force import use single quote",
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
      if(!node || !targetNode) return
      if (!isStringLiteral(targetNode)) return
      if (!isSurroundedBy(targetNode.raw, setting.fromQuote)) return

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
        if(node.callee.name !== REQUIRE) return
        node.arguments.forEach((arg) => checkLiteral(node, arg, REQUIRE))
      },
      ImportExpression(node) {
        checkLiteral(node, node.source, DYNAMIC_IMPORT)
      },
      ExportNamedDeclaration(node) {
        checkLiteral(node, node.source, EXPORT)
      },
      ExportAllDeclaration(node) {
        checkLiteral(node, node.source, EXPORT)
      }
    }
  }
}
