import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const WORDPRESS_FALLBACK_FILE = "wordpress_fallback.json";
const TXY_FALLBACK_FILE = "txy_fallback.json";

const requestTxyFallback = async () => {
	console.log("Requesting TXY fallbacks");
	let txy_fallback = null;

	if (fs.existsSync(TXY_FALLBACK_FILE)) {
		console.log("Loading TXY fallback from file");
		const fallback_content = fs.readFileSync(TXY_FALLBACK_FILE, "utf-8");
		txy_fallback = JSON.parse(fallback_content);
	}
	

	if (process.env.TXY_API !== undefined) {
		const response = await fetch(`${process.env.TXY_API}/fallbacks`);
	
		if (response.status >= 200 && response.status < 300) {
			console.log(`TXY_API responded with status ${response.status}`);
			txy_fallback = await response.json();
	
			fs.writeFileSync(TXY_FALLBACK_FILE, JSON.stringify(txy_fallback));
		}
	
	}

	return txy_fallback;
}

const requestWordpressServices = async () => {
	console.log("Requesting wordpress services");
	let services_fallbacks = null;

	if (fs.existsSync(WORDPRESS_FALLBACK_FILE)) {
		console.log("Loading wordpress services from file");
		const fallback_content = fs.readFileSync(WORDPRESS_FALLBACK_FILE, "utf-8");
		services_fallbacks = JSON.parse(fallback_content);
	}

	if (process.env.WP_API !== undefined) {
		const response = await fetch(`${process.env.WP_API}/santa-elena/v1/products`);
	
		if (response.status >= 200 && response.status < 300) {
			console.log("WP_API responded with status", response.status);
			services_fallbacks = await response.json();
	
			fs.writeFileSync(WORDPRESS_FALLBACK_FILE, JSON.stringify(services_fallbacks));
		}	
	}

	return services_fallbacks;
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
	if (txy_fallback === null) {
		throw new Error("TXY fallback is null");
	}

	const services_fallbacks = await requestWordpressServices();
	if (services_fallbacks === null) {
		throw new Error("Services fallback is null");
	}

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
	}

	console.log("Vite is_production", is_production);

	if (!is_production) {
		config.server.https = {
			key: fs.readFileSync(process.env.SSL_KEY_PATH),
			cert: fs.readFileSync(process.env.SSL_CERT_PATH),
		}
	}

	console.log("Vite build_config", build_config);

	return config;
});
