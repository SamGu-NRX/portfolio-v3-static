import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "better-tailwindcss": betterTailwindcss,
    },
    rules: {
      // Temp disable all recommended rules cuz interference, enable with v4.0.0 is out
      // (curr. v3.7.11 @ https://github.com/schoero/eslint-plugin-better-tailwindcss)
      // ...betterTailwindcss.configs["recommended-warn"].rules,
      // ...betterTailwindcss.configs["recommended-error"].rules,
    },
    settings: {
      "better-tailwindcss": {
        // Tailwind CSS v4 entrypoint
        entryPoint: "src/app/globals.css",
        "enforce-consistent-class-order": "offical",
      },
    },
  },
]);

export default eslintConfig;
