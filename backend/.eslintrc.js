module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', "functional"],
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'dist/*', 'node_modules/*'],
  rules: {
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "@typescript-eslint/quotes": 0,
    "array-callback-return": "error",
    "no-constructor-return": "error",
    "no-duplicate-imports": "off",
    "no-new-native-nonconstructor": "error",
    "@typescript-eslint/no-use-before-define": "off",
    "no-self-compare": "error",
    "no-template-curly-in-string": "error",
    "no-unused-private-class-members": "error",
    "class-methods-use-this": "off",
    "consistent-return": "off",
    "no-unused-vars": "off",
    "default-case": "error",
    "dot-notation": "error",
    "eqeqeq": "error",
    "init-declarations": "error",
    "no-eq-null": "error",
    "no-extend-native": "error",
    "no-implicit-coercion": "error",
    "@typescript-eslint/no-unused-vars": "off",
    "indent": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "no-implicit-globals": "error",
    "no-new": "error",
    "no-new-func": "error",
    "no-new-object": "error",
    "no-var": "error",
    "prefer-object-spread": "error",
    "require-await": "off",
    "yoda": "error",
    "explicit-function-return-type": "off",

    "sort-keys": "off",
    "no-undef-init": "off",
    "no-restricted-syntax": [
      "error",
      {
        "selector": "CallExpression[callee.name='Error']",
        "message": "Error is deprecated, use Left instead because it complies the full type Error of the lib ts-belt.  "
      },
      {
        "selector": "CallExpression[callee.name='Ok']",
        "message": "Ok is deprecated, use Right instead because it complies the full type Ok of the lib ts-belt.  "
      },

    ]
  },
};