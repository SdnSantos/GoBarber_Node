module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "prettier/prettier": "error",
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    "camelcase": "off",
    "no-undef": "off",
    "no-console": "off",
    "no-irregular-whitespace": "off",
    "no-unused-vars": ["error", {
      "argsIgnorePattern": "next",
      "vars": "all",
      "args": "after-used",
      "ignoreRestSiblings": false,
      "argsIgnorePattern": "^_",
      "argsIgnorePattern": "_",
      "treatUndefinedAsUnspecified": false,
    }]
  },
};
