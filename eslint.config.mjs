// .eslintrc.ts
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "dist/**",
  ]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      ...nextVitals,
      ...nextTs,
      "plugin:@typescript-eslint/recommended",
      "plugin:react-hooks/recommended",
    ],
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
    rules: {
      // React Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);