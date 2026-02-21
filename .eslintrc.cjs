module.exports = {
  extends: ["airbnb-base", "prettier"],
  env: {
    node: true,
    commonjs: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  settings: {
    "import/resolver": {
      "babel-module": {},
    },
  },
  rules: {
    "no-console": "off",
    "func-names": "off",
    "no-process-exit": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": "off",
    quotes: ["error", "single"],
  },
};
