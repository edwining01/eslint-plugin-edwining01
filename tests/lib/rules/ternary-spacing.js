/**
 * @fileoverview Force import uses single quote
 * @author Edwin Ting <40881695+edwining01@users.noreply.github.com>
 */
"use strict"

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
const rule = require('../../../lib/rules/ternary-spacing'),
  RuleTester = require('eslint').RuleTester
const type = "ConditionalExpression"

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
const ruleTester = new RuleTester()

ruleTester.run("ternary-spacing", rule, {
  valid: [
    "a? b: c",
    {
      code: "a?b:c",
      options: [{ questionMark: { before: false, after: false }, colon: { before: false, after: false }}],
    },
    {
      code: "a?b: c",
      options: [{ questionMark: { before: false, after: false }, colon: { before: false, after: true }}],
    },
    {
      code: "a?b :c",
      options: [{ questionMark: { before: false, after: false }, colon: { before: true, after: false }}],
    },
    {
      code: "a?b : c",
      options: [{ questionMark: { before: false, after: false }, colon: { before: true, after: true }}],
    },
    {
      code: "a? b:c",
      options: [{ questionMark: { before: false, after: true }, colon: { before: false, after: false }}],
    },
    {
      code: "a? b: c",
      options: [{ questionMark: { before: false, after: true }, colon: { before: false, after: true }}],
    },
    {
      code: "a? b :c",
      options: [{ questionMark: { before: false, after: true }, colon: { before: true, after: false }}],
    },
    {
      code: "a? b : c",
      options: [{ questionMark: { before: false, after: true }, colon: { before: true, after: true }}],
    },
    {
      code: "a ?b:c",
      options: [{ questionMark: { before: true, after: false }, colon: { before: false, after: false }}],
    },
    {
      code: "a ?b: c",
      options: [{ questionMark: { before: true, after: false }, colon: { before: false, after: true }}],
    },
    {
      code: "a ?b :c",
      options: [{ questionMark: { before: true, after: false }, colon: { before: true, after: false }}],
    },
    {
      code: "a ?b : c",
      options: [{ questionMark: { before: true, after: false }, colon: { before: true, after: true }}],
    },
    {
      code: "a ? b:c",
      options: [{ questionMark: { before: true, after: true }, colon: { before: false, after: false }}],
    },
    {
      code: "a ? b: c",
      options: [{ questionMark: { before: true, after: true }, colon: { before: false, after: true }}],
    },
    {
      code: "a ? b :c",
      options: [{ questionMark: { before: true, after: true }, colon: { before: true, after: false }}],
    },
    {
      code: "a ? b : c",
      options: [{ questionMark: { before: true, after: true }, colon: { before: true, after: true }}],
    },
  ],
  
  invalid: [
    {
      code: "a ? b : c",
      options: [{ questionMark: { before: false, after: false }, colon: { before: false, after: false }}],
      errors: [
        { message: "Expect no whitespace before question mark.", type, },
        { message: "Expect no whitespace after question mark.", type, },
        { message: "Expect no whitespace before colon.", type, },
        { message: "Expect no whitespace after colon.", type, },
      ],
      output: "a?b:c",
    },
    {
      code: "a?b:c",
      options: [{ questionMark: { before: true, after: true }, colon: { before: true, after: true }}],
      errors: [
        { message: "Expect whitespace before question mark.", type, },
        { message: "Expect whitespace after question mark.", type, },
        { message: "Expect whitespace before colon.", type, },
        { message: "Expect whitespace after colon.", type, },
      ],
      output: "a ? b : c",
    },
  ]
})
