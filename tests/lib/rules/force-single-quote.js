/**
 * @fileoverview Force import uses single quote
 * @author Edwin Ting <40881695+edwining01@users.noreply.github.com>
 */
"use strict"

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/force-single-quote')
const RuleTester = require('eslint/lib/rule-tester/rule-tester')
const parser = require.resolve('@babel/eslint-parser')

const parserOptions = {
  ecmaVersion: 6,
  sourceType: "module",
  requireConfigFile: false,
}

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester()
const errorImport = {
  message: "Do not use double quote for import. Expect to use single quote.",
  type: "ImportDeclaration",
}
const errorDynamicImport = {
  message: "Do not use double quote for dynamic import. Expect to use single quote.",
  type: "ImportExpression",
}
const errorRequire = {
  message: "Do not use double quote for require. Expect to use single quote.",
  type: "CallExpression",
}
const errorExportNamed = {
  message: "Do not use double quote for export. Expect to use single quote.",
  type: "ExportNamedDeclaration",
}
const errorExportAll = {
  message: "Do not use double quote for export. Expect to use single quote.",
  type: "ExportAllDeclaration",
}


ruleTester.run("import-single-quote", rule, {
  valid: [
    // import
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
  
    // dynamic import
    {
      code: `import('hello-world')`,
      parser,
      parserOptions,
    },
    {
      code: `import(\`hello-world\`)`,
      parser,
      parserOptions,
    },
    
    // require
    {
      code: `require('hello-world')`,
      parserOptions,
    },
    {
      code: `require(\`hello-world\`)`,
      parserOptions,
    },
    
    // export
    {
      code: `export * from 'hello-world'`,
      parserOptions,
    },
    {
      code: `export { abc } from 'hello-world'`,
      parserOptions,
    },
    {
      code: `export { abc as defg } from 'hello-world'`,
      parserOptions,
    },
  ],
  
  invalid: [
    // import
    {
      code: "import \"hello-world\"",
      errors: [errorImport],
      output: "import 'hello-world'",
      parserOptions,
    },
    {
      code: `import myVar from "hello-world"`,
      errors: [errorImport],
      output: `import myVar from 'hello-world'`,
      parserOptions,
    },
    {
      code: `import { myVar1, myVar2 } from "hello-world"`,
      errors: [errorImport],
      output: `import { myVar1, myVar2 } from 'hello-world'`,
      parserOptions,
    },
    {
      code: `import myVar0, { myVar1, myVar2 } from "hello-world"`,
      errors: [errorImport],
      output: `import myVar0, { myVar1, myVar2 } from 'hello-world'`,
      parserOptions,
    },
    {
      code: `import * as myVar from "hello-world"`,
      errors: [errorImport],
      output: `import * as myVar from 'hello-world'`,
      parserOptions,
    },
    
    // dynamic import
    {
      code: `import("hello-world")`,
      errors: [errorDynamicImport],
      output: `import('hello-world')`,
      parser,
      parserOptions,
    },
    
    // // require
    {
      code: `require("hello-world")`,
      errors: [errorRequire],
      output: `require('hello-world')`,
      parserOptions,
    },
    
    // export
    {
      code: `export * from "hello-world"`,
      errors: [errorExportAll],
      output: `export * from 'hello-world'`,
      parserOptions,
    },
    {
      code: `export { abc } from "hello-world"`,
      errors: [errorExportNamed],
      output: `export { abc } from 'hello-world'`,
      parserOptions,
    },
    {
      code: `export { abc as defg } from "hello-world"`,
      errors: [errorExportNamed],
      output: `export { abc as defg } from 'hello-world'`,
      parserOptions,
    },
  ]
})
