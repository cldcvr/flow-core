import { defineConfig } from "vite";

export default defineConfig({
	build: {
		// Disabling minification makes it easy to debug during development
		// And all modern bundlers will consume the library and minify it anyway
		minify: false,
		sourcemap: true,
		lib: {
			entry: "src/index.ts",
			name: "flow-table",
			fileName: format => `flow-table.${format}.js`,
			formats: ["es", "cjs"]
		},
		rollupOptions: {
			// If we want to publish standalone components we don't externalize lit,
			// if you are going to use lit in your own project, you can make it a dep instead.
			// external: /^lit/, <-- comment this line
			external: [
				/^@ollion/,
				"axios",
				"emoji-mart",
				"lodash-es",
				/^lit/,
				"rxjs",
				"vanilla-colorful",
				"mark.js",
				"@emoji-mart/data",
				"@lit-labs/virtualizer",
				"flatpickr",
				"@floating-ui/dom"
			],
			output: {
				globals: {
					"@ollion/flow-core": "@ollion/flow-core"
				}
			}
		}
	}
});
