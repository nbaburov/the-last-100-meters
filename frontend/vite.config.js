import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get the directory name from the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@components": resolve(__dirname, "src/components"),
			"@pages": resolve(__dirname, "src/pages"),
			"@styles": resolve(__dirname, "src/styles"),
			"@constants": resolve(__dirname, "src/constants"),
			"@hooks": resolve(__dirname, "src/hooks"),
		},
	},
});
