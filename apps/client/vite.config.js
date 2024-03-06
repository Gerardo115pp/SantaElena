import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const requestTxyFallback = async () => {
	console.log("Requesting TXY fallbacks");
	if (process.env.TXY_API === undefined) {
		throw new Error("TXY_API is not defined");
	}

	const response = await fetch(`${process.env.TXY_API}/fallbacks`);

	if (!(response.status >= 200 && response.status < 300)) {
		throw new Error(`TXY_API responded with status ${response.status}`);
	}

	return await response.json();
}

const requestWordpressServices = async () => {
	console.log("Requesting wordpress services");
	if (process.env.WP_API === undefined) {
		throw new Error("WP_API is not defined");
	}

	const response = await fetch(`${process.env.WP_API}/santa-elena/v1/products`);

	if (!(response.status >= 200 && response.status < 300)) {
		throw new Error(`WP_API responded with status ${response.status}`);
	}
	let json_data = await response.json();
	
	return json_data;
}

export default defineConfig(async ({ command, mode, isSsrBuild, isPreview }) => {
	let is_production = command === 'build';

	let build_config = {
		JD_ADDRESS: JSON.stringify(process.env.JD_ADDRESS),
		WP_API: JSON.stringify(process.env.WP_API),
		TXY_API: JSON.stringify(process.env.TXY_API),
		PAYMENTS_API: JSON.stringify(`https://${process.env.BASE_DOMAIN}${process.env.PAYMENTS_API}`),
	}

	const txy_fallback = await requestTxyFallback();

	const services_fallbacks = await requestWordpressServices();

	console.log("Vite ssl key path", process.env.SSL_KEY_PATH);
	console.log("Vite ssl cert path", process.env.SSL_CERT_PATH);
	
	/**
	 * @type {import('vite').UserConfig}
	 */
	let config = {
		plugins: [sveltekit({
			onwarn: (warning, handler) => {
				console.log(`stupid warning: ${warning.code}`);
				if (warning.code.startsWith("a11y") || warning.code.startsWith("css-unused")) return;

				if (warning.code === "unused-export-let") return;

				handler(warning);
			}
		})],
		server: {
			open: false,
			host: "192.168.0.140",
			port: 5005,
			https: {
				key: fs.readFileSync(process.env.SSL_KEY_PATH),
				cert: fs.readFileSync(process.env.SSL_CERT_PATH),
			}

		},
		define: {
			...build_config,
			TXY_FALLBACK: JSON.stringify(txy_fallback),
			SERVICES_FALLBACKS: JSON.stringify(services_fallbacks),
			__DEV__: !is_production
		},
		resolve: {
			alias: {
				'@libs': '/src/libs',
				'@components': '/src/components',
				'@pages': '/src/pages',
				'@svg': '/src/svg',
				'@models': '/src/models',
				"@actions": '/src/actions',
				"@events": '/src/events',
				"@stores": '/src/stores',
				"@databases": '/src/databases',
				"@app_modules": path.resolve(__dirname, process.env.APP_MODULES_PATH),
				"@themes": '/src/themes',
				"@app": '/src'
			},
		},
		clearScreen: true,
		esbuild: {
			tsconfigRaw: "./src/jsconfig.json"
		}
	}

	console.log("Vite build_config", build_config);

	return config;
});
