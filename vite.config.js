import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const javascriptObfuscator = require("javascript-obfuscator");

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        plugins: [
          {
            name: "obfuscate-js",
            generateBundle(options, bundle) {
              for (const file of Object.values(bundle)) {
                if (file.type === "chunk" && file.isEntry) {
                  file.code = javascriptObfuscator
                    .obfuscate(file.code, {
                      compact: true,
                      controlFlowFlattening: false,
                      deadCodeInjection: false,
                      identifierNamesGenerator: "hexadecimal",
                    })
                    .getObfuscatedCode();
                }
              }
            },
          },
        ],
      },
    },
  },
});
