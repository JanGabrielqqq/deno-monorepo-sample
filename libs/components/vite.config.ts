import { defineConfig } from "vite"
import deno from "@deno/vite-plugin"
import react from "@vitejs/plugin-react-swc"
import dts from "vite-plugin-dts"
import { fileURLToPath } from "node:url"

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: ["react", "react-dom", "styled-components"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "styled-components": "styled",
        },
      },
    },
    lib: {
      name: "@scope/components",
      entry: fileURLToPath(new URL("./mod.tsx", import.meta.url)),
      formats: ["es", "umd"],
    },
  },

  plugins: [
    deno(),
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
})
