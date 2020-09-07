/**
 * @fileoverview Force pragma comment at the top of file
 * @author Edwin Ting <40881695+edwining01@users.noreply.github.com>
 */
"use strict"

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// Constants
//------------------------------------------------------------------------------
const DEFAULT_PRAGMA_STR = `@format`
const DEFAULT_PRAGMA_COMMENT_STR = `/** ${DEFAULT_PRAGMA_STR} */\n`

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
module.exports = {
  meta: {
    docs: {
      description: "Force pragma comment at the top of file.",
      category: "pragma",
      recommended: true,
    },
    fixable: "whitespace",
    schema: [
      {
        type: "object",
        additionalProperties: false,
        properties: {
          pragmaStr: {
            type: "string",
            default: DEFAULT_PRAGMA_STR,
          },
          pragmaCommentStr: {
            type: "string",
            default: DEFAULT_PRAGMA_COMMENT_STR,
          },
          // @TODO
          // emptyLine: {
          //   type: "object",
          //   additionalProperties: false,
          //   properties: {
          //     before: {
          //       type: "boolean",
          //       default: true,
          //     },
          //     after: {
          //       type: "boolean",
          //       default: true,
          //     },
          //   },
          // },
        },
      },
    ]
  },
  create: function(context) {
    const config = context.options[0] || {}
    const pragmaStr = config && typeof config.pragmaStr == "string"?
      config.pragmaStr: DEFAULT_PRAGMA_STR
    const pragmaCommentStr = config && typeof config.pragmaCommentStr == "string"?
      config.pragmaCommentStr: DEFAULT_PRAGMA_COMMENT_STR
    if(pragmaCommentStr.indexOf(pragmaStr) < 0)
      throw new Error(`\`pragmaStr\` should be part of \`pragmaCommentStr\`!`)
    
    const parser = require(context.parserPath)
    const parserOptions = Object.assign({
      comment: true,
      ecmaVersion: context.ecmaVersion || 2019,
    })
    const parseResult = typeof parser.parseForESLint == "function"?
      parser.parseForESLint(pragmaCommentStr, parserOptions):
      { ast: parser.parse(pragmaCommentStr, parserOptions) }
    const { ast: pragmaCommentStrAst } = parseResult
    if(!pragmaCommentStrAst.comments.length)
      throw new Error(`Miss comment in \`pragmaCommentStr\`!`)
    else if(pragmaCommentStrAst.comments.length > 1)
      throw new Error(`More than one comments in \`pragmaCommentStr\`!`)
    const pragmaCommentNode = pragmaCommentStrAst.comments[0]
    
    // const emptyLineConfig = config.emptyLine
    // const expectEmptyLineBeforePragma = emptyLineConfig?
    //   emptyLineConfig.before === true: true
    // const expectEmptyLineAfterPragma = emptyLineConfig?
    //   emptyLineConfig.after === true: true
      
    const sourceCode = context.getSourceCode()
    const allComments = sourceCode.getAllComments()
    const hasComment = !!allComments.length
    
    // --------------------------------------------------------------------------
    // Helpers
    // --------------------------------------------------------------------------
    function reportNoPragma(node) {
      const loc = { line: 1, column: 0, }
      let report = {
        message: `Expected pragma comment \`${pragmaCommentStr}\` at the top of file.`,
        fix(fixer) {
          const range = sourceCode.getIndexFromLoc(loc)
          return fixer.insertTextAfterRange(range, pragmaCommentStr)
        }
      }
      
      if(node) {
        report.node = node
      } else {
        Object.assign(report, { loc: {start: loc } })
      }
      context.report(report)
    }
    
    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------
    if(hasComment) {
      const firstCommentNode = allComments[0]
      const pragmaStrFound = firstCommentNode && firstCommentNode.value.indexOf(pragmaStr) >= 0
      if(pragmaStrFound) {
        if(firstCommentNode.type != pragmaCommentNode.type ||
          firstCommentNode.value != pragmaCommentNode.value) {
          context.report({
            node: firstCommentNode,
            message: `Expected top pragma comment to be \`${pragmaCommentStr}\`.`,
            fix(fixer) {
              return fixer.replaceText(firstCommentNode, pragmaCommentStr)
            }
          })
        }
      } else { // pragmaStrNotFound
        reportNoPragma(firstCommentNode)
      }
    } else {
      reportNoPragma()
    }
    
    return {}
  }
}
