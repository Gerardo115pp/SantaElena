import { join } from 'path';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { libery_labs_theme } from "./src/themes/libery_labs_theme"

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
		'./src/**/*.{html,js,svelte,ts,css}',
		join(require.resolve('@skeletonlabs/skeleton'),'../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
            colors: {
                main: {
                    DEFAULT: 'var(--main)',
                    '1': 'var(--main-1)',
                    '2': 'var(--main-2)',
                    '3': 'var(--main-3)',
                    '4': 'var(--main-4)',
                    '5': 'var(--main-5)',
                    '6': 'var(--main-6)',
                    '7': 'var(--main-7)',
                    '8': 'var(--main-8)',
                    '9': 'var(--main-9)'
                },
                "main-dark": {
                    DEFAULT: 'var(--main-dark)',
                    '1': 'var(--main-dark-color-1)',
                    '2': 'var(--main-dark-color-2)',
                    '3': 'var(--main-dark-color-3)',
                    '4': 'var(--main-dark-color-4)',
                    '5': 'var(--main-dark-color-5)',
                    '6': 'var(--main-dark-color-6)',
                    '7': 'var(--main-dark-color-7)',
                    '8': 'var(--main-dark-color-8)',
                    '9': 'var(--main-dark-color-9)',
                    't': 'var(--main-dark-color-t)'
                },
                'color-accent': {
                    DEFAULT: 'var(--accent)',
                    '1': 'var(--accent-1)',
                    '2': 'var(--accent-2)',
                    '3': 'var(--accent-3)',
                    '4': 'var(--accent-4)',
                    '5': 'var(--accent-5)',
                    '6': 'var(--accent-6)',
                    '7': 'var(--accent-7)',
                    '8': 'var(--accent-8)',
                    '9': 'var(--accent-9)',
                    't': 'hsl(from var(--accent) h s l / 0.5)'
                },
                'theme-grey': {
                    DEFAULT: 'var(--grey)',
                    '1': 'var(--grey-1)',
                    '2': 'var(--grey-2)',
                    '3': 'var(--grey-3)',
                    '4': 'var(--grey-4)',
                    '5': 'var(--grey-5)',
                    '6': 'var(--grey-6)',
                    '7': 'var(--grey-7)',
                    '8': 'var(--grey-8)',
                    '9': 'var(--grey-9)',
                    't': 'var(--grey-t)'
                },
                'success': {
                    DEFAULT: 'var(--success)',
                    '1': 'var(--success-1)',
                    '2': 'var(--success-2)',
                    '3': 'var(--success-3)',
                    '4': 'var(--success-4)',
                    '5': 'var(--success-5)',
                    '6': 'var(--success-6)',
                    '7': 'var(--success-7)',
                    '8': 'var(--success-8)',
                    '9': 'var(--success-9)',
                    't': 'var(--success-t)'
                },
                'warning': {
                    DEFAULT: 'var(--warning)',
                    '1': 'var(--warning-1)',
                    '2': 'var(--warning-2)',
                    '3': 'var(--warning-3)',
                    '4': 'var(--warning-4)',
                    '5': 'var(--warning-5)',
                    '6': 'var(--warning-6)',
                    '7': 'var(--warning-7)',
                    '8': 'var(--warning-8)',
                    '9': 'var(--warning-9)',
                    't': 'hsl(from var(--warning) h s l / 0.5)'
                }, 
                'danger': {
                    DEFAULT: 'var(--danger)',
                    '1': 'var(--danger-1)',
                    '2': 'var(--danger-2)',
                    '3': 'var(--danger-3)',
                    '4': 'var(--danger-4)',
                    '5': 'var(--danger-5)',
                    '6': 'var(--danger-6)',
                    '7': 'var(--danger-7)',
                    '8': 'var(--danger-8)',
                    '9': 'var(--danger-9)',
                    't': 'hsl(from var(--danger) h s l / 0.5)'
                },
            },
        },
	},
	plugins: [
		skeleton({
            themes: {
                preset: ['skeleton'],
                custom: [libery_labs_theme]
            }
        })
	]
}

