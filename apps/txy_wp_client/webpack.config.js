const path = require('path');
const webpack  = require('webpack');
const fs = require('fs');

const APP_NAME = "TXY WP CLIENT";

const config = {
	entry: './src/index.js',
	// context: path.resolve(__dirname),
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js'
	},
	devServer: {
		open: false,
		host: "192.168.0.140",
		port: 5006,	
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
			"@app_modules": path.resolve(__dirname, '../modules'),
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
								],
							},
						},
					},
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
	plugins: []
}


module.exports = (env, argv) => {
	const is_production = argv.mode === 'production';

	const build_config = {
		JD_ADDRESS: process.env.JD_ADDRESS,
		WP_API: process.env.WP_API,
		TXY_API: process.env.TXY_API,
	}

	if (!is_production) {
		config.devServer.https = {
			key: fs.readFileSync("/home/el_maligno/local_domain_certificates/santa-elena.mx/dev-santa-elena.mx-key.pem"),
			cert: fs.readFileSync("/home/el_maligno/local_domain_certificates/santa-elena.mx/dev-santa-elena.mx.pem"),
		}
	}

	config.plugins.push(
		new webpack.DefinePlugin({
			"JD_ADDRESS": JSON.stringify(build_config.JD_ADDRESS),
			"WP_API": JSON.stringify(build_config.WP_API),
			"APP_NAME": JSON.stringify(APP_NAME),
			"TXY_API": JSON.stringify(build_config.TXY_API),
			"PAYMENTS_API": JSON.stringify(`https://${process.env.BASE_DOMAIN}${process.env.PAYMENTS_API}`),
		})
	);

	return config
} 