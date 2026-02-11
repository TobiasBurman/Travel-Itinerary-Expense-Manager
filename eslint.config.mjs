import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"] },
  { languageOptions: { globals: globals.node } },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "eqeqeq": ["error", "always"],
      "arrow-body-style": ["error", "always"],
      "capitalized-comments": ["error", "always"],
    }
  }
];