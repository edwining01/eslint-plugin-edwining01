/**
 * @fileoverview Force import use single quote
 * @author Edwin Ting <40881695+edwining01@users.noreply.github.com>
 */
"use strict"

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/import-single-quote'),
  RuleTester = require('eslint').RuleTester

var parserOptions = { ecmaVersion: 6, sourceType: "module" }

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester()
var error = {
  message: "Do not use double quote for import. Expect to use single quote.",
  type: "ImportDeclaration",
}
ruleTester.run("import-single-quote", rule, {
  valid: [
    {
      code: `import 'hello-world'`,
      parserOptions,
    },
    {
      code: `import myVar from 'hello-world'`,
      parserOptions,
    },
    {
      code: `import { myVar1, myVar2 } from 'hello-world'`,
      parserOptions,
    },
    {
      code: `import myVar0, { myVar1, myVar2 } from 'hello-world'`,
      parserOptions,
    },
    {
      code: `import * as myVar from 'hello-world'`,
      parserOptions,
    },
  ],
  
  invalid: [
    {
      code: "import \"hello-world\"",
      errors: [error],
      output: "import 'hello-world'",
      parserOptions,
    },
    {
      code: `import myVar from "hello-world"`,
      errors: [error],
      output: `import myVar from 'hello-world'`,
      parserOptions,
    },
    {
      code: `import { myVar1, myVar2 } from "hello-world"`,
      errors: [error],
      output: `import { myVar1, myVar2 } from 'hello-world'`,
      parserOptions,
    },
    {
      code: `import myVar0, { myVar1, myVar2 } from "hello-world"`,
      errors: [error],
      output: `import myVar0, { myVar1, myVar2 } from 'hello-world'`,
      parserOptions,
    },
    {
      code: `import * as myVar from "hello-world"`,
      errors: [error],
      output: `import * as myVar from 'hello-world'`,
      parserOptions,
    },
  ]
})
