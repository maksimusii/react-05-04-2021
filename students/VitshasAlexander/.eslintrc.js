module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "eslint-config-prettier",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended",
    "jest-enzyme",
  ],
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module",
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["prettier", "react", "babel", "import", "jsx-a11y"],
  rules: {
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "prettier/prettier": [
      "error",
      {
        htmlWhitespaceSensitivity: "ignore",
        singleQuote: true,
      },
    ],
    "no-console": "off",
    "no-unused-vars": "off",
    "no-useless-escape": "off",
  },
  globals: {
    $refs: "readonly",
  },
};
