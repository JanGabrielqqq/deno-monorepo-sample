import { defineConfig } from "vite"
import deno from "@deno/vite-plugin"
import react from "@vitejs/plugin-react"
import { dirname, fromFileUrl, join } from "@std/path"
// https://vite.dev/config/

export default defineConfig({
	plugins: [deno(), react()],
	resolve: {
		alias: {
			"@scope/components": join(
				dirname(fromFileUrl(import.meta.url)),
				"./libs/components/mod.tsx",
			),
		},
	},
})
