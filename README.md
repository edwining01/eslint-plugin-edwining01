# eslint-plugin-edwining01

Personal ESLint plugin

## Installation

You'll first need to install [ESLint](http://eslint.org):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-edwining01`:

```sh
npm install --save-dev git+https://git@github.com/edwining01/eslint-plugin-edwining01.git
```

```sh
yarn add -D git+https://git@github.com/edwining01/eslint-plugin-edwining01.git
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-edwining01` globally.

## Usage

Add `edwining01` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": [
    "edwining01"
  ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "edwining01/import-single-quote": "error"
  }
}
```

## Supported Rules

* Fill in provided rules here

