const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack  = require('webpack');
const fs = require('fs');

const APP_NAME = "Santa Elena";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // this disables the SSL certificate check. which is okey because a webpack config is not a production server... or is it? 

console.log(`APP_MODULES_PATH: ${process.env.APP_MODULES_PATH}`);

const config = {
	entry: './src/index.js',
	// context: path.resolve(__dirname),
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'boundle.js'
	},
	devServer: {
		open: false,
		host: "192.168.0.140",
		port: 5005,	
		hot: true,
		static:{
			directory: path.join(__dirname, 'public')
		},
		allowedHosts: "all",
		historyApiFallback: true,
		watchFiles: {
			paths: ["src/**/*", "../modules/**/*"]
		}
	},
	resolve: {
		modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
		alias: {
			svelte: path.resolve('node_modules', 'svelte/src/runtime'),
			'@libs': path.resolve(__dirname, 'src/libs'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@svg': path.resolve(__dirname, 'src/svg'),
			'@models': path.resolve(__dirname, 'src/models'),
			"@actions": path.resolve(__dirname, 'src/actions'),
			"@events": path.resolve(__dirname, 'src/events'),
			"@stores": path.resolve(__dirname, 'src/stores'),
			"@databases": path.resolve(__dirname, 'src/databases'),
			"@app_modules": process.env.APP_MODULES_PATH,
		},
		extensions: ['.*', '.mjs', '.js', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main'],
		conditionNames: ['svelte', 'browser', 'module', 'import'],
	},
	module: {
		rules: [
			{
				test:  /\.js?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						onwarn: (warning, handler) => {
							if (warning.code.startsWith("a11y") || warning.code.startsWith("css-unused")) return;

							if (warning.code === "unused-export-let") return;
							console.log(`stupid warning: ${warning.code}`);
		
							handler(warning);
						},
						emitCss: false,
					}
				}
				
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									require('tailwindcss'),
									require('autoprefixer'),
								]
							}
						}
					}
				]	
			},
			{
				test: /node_modules\/svelte\/.*\.mjs$/,
				resolve: {
				  fullySpecified: false
				}
			},
			{
				test: /\.svg$/,
				exclude: /node_modules/,
				use: {
					loader: 'svg-inline-loader',
					options: {
					  removeSVGTagAttrs: true
					}
				}
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			inject: true,
			template: './public/index.html',
			filename: './index.html'
		})
	]
}

const requestTxyFallback = async () => {
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
	if (process.env.WP_API === undefined) {
		throw new Error("WP_API is not defined");
	}

	const response = await fetch(`${process.env.WP_API}/santa-elena/v1/products`);

	if (!(response.status >= 200 && response.status < 300)) {
		throw new Error(`WP_API responded with status ${response.status}`);
	}

	return await response.json();
}

module.exports = async (env, argv) => {
	const is_production = argv.mode === 'production';

	const build_config = {
		JD_ADDRESS: process.env.JD_ADDRESS,
		WP_API: process.env.WP_API,
		TXY_API: process.env.TXY_API,
	}

	const txy_fallback = await requestTxyFallback();

	const services_fallbacks = await requestWordpressServices();

	if (!is_production) {
		config.devServer.https = {
			key: fs.readFileSync("/home/el_maligno/local_domain_certificates/santa-elena.mx/dev-santa-elena.mx-key.pem"),
			cert: fs.readFileSync("/home/el_maligno/local_domain_certificates/santa-elena.mx/dev-santa-elena.mx.pem"),
		}
	}

	console.log("Modules:", config.resolve.modules)

	config.plugins.push(
		new webpack.DefinePlugin({
			"JD_ADDRESS": JSON.stringify(build_config.JD_ADDRESS),
			"WP_API": JSON.stringify(build_config.WP_API),
			"TXY_API": JSON.stringify(build_config.TXY_API),
			"APP_NAME": JSON.stringify(APP_NAME),
			"TXY_FALLBACK": JSON.stringify(txy_fallback),
			"SERVICES_FALLBACKS": JSON.stringify(services_fallbacks),
		})
	);

	return config
} 