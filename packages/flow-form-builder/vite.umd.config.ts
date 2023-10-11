import { defineConfig } from "vite";

export default defineConfig({
	build: {
		lib: {
			entry: "src/index.ts",
			name: "flowFormBuilder",
			fileName: format => `flow-form-builder.${format}.js`,
			formats: ["umd"]
		},
		outDir: "umd",
		rollupOptions: {
			external: ["@cldcvr/flow-core-config", "@cldcvr/flow-core"],
			output: {
				globals: {
					"@cldcvr/flow-core": "flowCore"
				}
			}
		}
	}
});
