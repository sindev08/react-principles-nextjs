import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  // next/core-web-vitals — enforces Next.js best practices and Core Web Vitals rules
  // Includes next/recommended + additional strict rules for performance
  ...nextVitals,

  // next/typescript — adds TypeScript-specific rules from @typescript-eslint
  // Catches type errors that tsc alone might miss
  ...nextTs,

  // Rules that DON'T require type information — apply to all files
  {
    rules: {
      // Enforce `import type` for type-only imports
      // WHY: Reduces bundle size — type imports are erased at compile time,
      // and this ensures they're explicitly marked so bundlers can tree-shake them
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { fixStyle: "inline-type-imports" },
      ],

      // Ban `any` type — forces you to write proper types
      // WHY: `any` disables all type checking and defeats the purpose of TypeScript
      "@typescript-eslint/no-explicit-any": "error",

      // Ban non-null assertions (the ! operator)
      // WHY: They bypass null checks and can cause runtime errors.
      // Use optional chaining (?.) or proper null guards instead
      "@typescript-eslint/no-non-null-assertion": "error",

      // Warn on console.log (allow console.warn and console.error)
      // WHY: console.log is for debugging — it shouldn't ship to production.
      // Use proper logging or error reporting instead
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // Ban unused variables (except those prefixed with _)
      // WHY: Dead code makes the codebase harder to read and maintain
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },

  // Rules that REQUIRE type information — only apply to TypeScript files
  // WHY separate? These rules need parserOptions.project to analyze types,
  // which only works on .ts/.tsx files included in tsconfig.json
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Prefer optional chaining (?.) over manual && chains
      // WHY: Cleaner, more readable, and less error-prone
      "@typescript-eslint/prefer-optional-chain": "error",

      // Prevent unhandled promises — every promise must be awaited, returned, or voided
      // WHY: Unhandled promise rejections crash Node.js and cause silent failures
      "@typescript-eslint/no-floating-promises": "error",

      // Prevent passing promises where non-promises are expected
      // WHY: Common source of bugs — e.g., passing async function to forEach
      "@typescript-eslint/no-misused-promises": "error",
    },
  },

  // Override default ignores of eslint-config-next
  globalIgnores([
    // Build output directories — no point linting generated code
    ".next/**",
    "out/**",
    "build/**",
    // Auto-generated type declaration — managed by Next.js
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
