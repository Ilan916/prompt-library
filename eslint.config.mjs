// eslint.config.mjs

import next from "eslint-config-next";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-config-prettier";

export default [
  /**
   * Base Next.js
   * - inclut React, JSX, App Router, etc.
   */
  ...next,

  /**
   * Règles TypeScript recommandées
   */
  ...tseslint.configs.recommended,

  /**
   * Plugin import (ordre + sécurité des imports)
   */
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      /**
       * Ordre des imports
       * - lisible
       * - cohérent
       * - adapté à l'alias @/
       */
      "import/order": [
        "warn",
        {
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
            "object",
            "type",
          ],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
        },
      ],

      /**
       * Sécurité imports
       */
      "import/no-duplicates": "error",
      "import/no-unresolved": "off", // faux positifs avec TS + Next
    },
  },

  /**
   * Désactive les règles ESLint en conflit avec Prettier
   */
  prettier,

  /**
   * Règles projet (les plus importantes)
   */
  {
    ignores: [
      ".next/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "node_modules/**",
      "**/*.d.ts",
    ],

    rules: {
      /**
       * ============================
       * VARIABLES
       * ============================
       */

      // Désactivé au profit de la version TypeScript
      "no-unused-vars": "off",

      // Variables déclarées mais non utilisées
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // Utilisation de variables non définies (typos, oublis)
      "no-undef": "error",

      /**
       * ============================
       * DEBUG / PROPRETÉ
       * ============================
       */

      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",

      /**
       * ============================
       * TYPESCRIPT
       * ============================
       */

      // Force les imports de types explicites
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
        },
      ],

      /**
       * ============================
       * REACT / HOOKS
       * ============================
       */

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];
