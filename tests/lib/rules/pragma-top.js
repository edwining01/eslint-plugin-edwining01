/**
 * @fileoverview Force pragma comment at the top of file
 * @author Edwin Ting <40881695+edwining01@users.noreply.github.com>
 */
"use strict"

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
const rule = require('../../../lib/rules/pragma-top')
const RuleTester = require('eslint').RuleTester
const DEFAULT_PRAGMA_COMMENT_STR = "/** @format */"
const loc = 0
//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
const ruleTester = new RuleTester()

ruleTester.run("pragma-top", rule, {
  valid: [
    DEFAULT_PRAGMA_COMMENT_STR,
    { code: "/* @format */", options: [{ pragmaCommentStr: "/* @format */" }] },
    { code: "/** @customPragma */", options: [{
      pragmaStr: "@customPragma", pragmaCommentStr: "/** @customPragma */" }] },
    { code: "// @format", options: [{ pragmaCommentStr: "// @format" }] },
  ],
  invalid: [
    {
      code: "",
      errors: [
        {
          loc,
          message: "Expected pragma comment `/** @format */` at the top of file.",
        }
      ],
      output: DEFAULT_PRAGMA_COMMENT_STR,
    },
    {
      code: "/**  @format */",
      errors: [{
        message: "Expected top pragma comment to be `/** @format */`.",
      }],
      output: DEFAULT_PRAGMA_COMMENT_STR,
    },
  ]
})
