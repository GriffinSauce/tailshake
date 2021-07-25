module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",
    "plugin:sonarjs/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["@typescript-eslint", "prettier", "sonarjs"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.eslint.json"
  },
  env: {
    es6: true,
    browser: true
  },
  rules: {
    "prettier/prettier": "error",

    // Un-opinionate airbnb a bit
    "arrow-body-style": "off",
    "no-console": "off",
    "max-classes-per-file": "off"
  },
  ignorePatterns: [".eslintrc.js"], // TODO: doesn't want to play nice with ts parser
  overrides: [
    {
      // Config files are not compiled
      files: [".eslintrc.js", "*.config.js", "next.config.js", "build.js"],
      env: { node: true },
      parserOptions: { sourceType: "script" },
      rules: {
        "@typescript-eslint/no-var-requires": ["off"],
        "import/no-extraneous-dependencies": [
          "error",
          {
            devDependencies: true // ie. allowed
          }
        ]
      }
    },
    {
      // Tests
      files: ["src/test/**", "**/*.test.{ts,tsx}"],
      env: { jest: true },
      rules: {
        "import/no-extraneous-dependencies": [
          "error",
          {
            devDependencies: true // ie. allowed
          }
        ]
      }
    }
  ]
};
