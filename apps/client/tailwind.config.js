import { join } from 'path';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { santa_elena_theme } from "./src/themes/santa-elena-theme"

console.log("santa_elena_theme", santa_elena_theme);
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
                clear: {
                    DEFAULT: 'var(--clear)',
                    '1': 'var(--clear-1)',
                    '2': 'var(--clear-2)',
                    '3': 'var(--clear-3)',
                    '4': 'var(--clear-4)',
                },
                "theme-color": {
                    DEFAULT: 'var(--color)',
                    '1': 'var(--color-1)',
                    '2': 'var(--color-2)',
                    '3': 'var(--color-3)',
                    '4': 'var(--color-4)',
                    '5': 'var(--color-5)',
                    '6': 'var(--color-6)',
                    '7': 'var(--color-7)',
                    '8': 'var(--color-8)',
                    '9': 'var(--color-9)'
                },
                'color-accent': {
                    DEFAULT: 'var(--color-accent)',
                    '1': 'var(--color-accent-1)',
                    '2': 'var(--color-accent-2)',
                    '3': 'var(--color-accent-3)',
                    '4': 'var(--color-accent-4)',
                    '5': 'var(--color-accent-5)',
                    '6': 'var(--color-accent-6)',
                    '7': 'var(--color-accent-7)',
                    '8': 'var(--color-accent-8)',
                    '9': 'var(--color-accent-9)'
                },
                'theme-color-light': {
                    DEFAULT: 'var(--color-light)',
                    '1': 'var(--color-light-1)',
                    '2': 'var(--color-light-2)',
                    '3': 'var(--color-light-3)',
                    '4': 'var(--color-light-4)',
                    '5': 'var(--color-light-5)',
                    '6': 'var(--color-light-6)',
                    '7': 'var(--color-light-7)',
                    '8': 'var(--color-light-8)',
                    '9': 'var(--color-light-9)'
                },
                'dark': {
                    DEFAULT: 'var(--dark)',
                    '1': 'var(--dark-1)',
                    '2': 'var(--dark-2)',
                    '3': 'var(--dark-3)',
                    '4': 'var(--dark-4)',
                    '5': 'var(--dark-5)',
                    '6': 'var(--dark-6)',
                    '7': 'var(--dark-7)',
                    '8': 'var(--dark-8)',
                    '9': 'var(--dark-9)'
                },
                'shade': {
                    DEFAULT: 'var(--shade-5)',
                    '1': 'var(--shade-1)',
                    '2': 'var(--shade-2)',
                    '3': 'var(--shade-3)',
                    '4': 'var(--shade-4)',
                    '5': 'var(--shade-5)',
                    '6': 'var(--shade-6)',
                    '7': 'var(--shade-7)',
                    '8': 'var(--shade-8)',
                    '9': 'var(--shade-9)'
                }, 
                'shade-light': {
                    DEFAULT: 'var(--shade-light)',
                    '1': 'var(--shade-light-1)',
                    '2': 'var(--shade-light-2)',
                    '3': 'var(--shade-light-3)',
                    '4': 'var(--shade-light-4)',
                    '5': 'var(--shade-light-5)',
                    '6': 'var(--shade-light-6)',
                    '7': 'var(--shade-light-7)',
                    '8': 'var(--shade-light-8)',
                    '9': 'var(--shade-light-9)'
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
                },
            },
            maxWidth: {
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
            },
            width: {
                'cq-1/4': '25cqw',
                'cq-1/3': '33.33cqw',
                'cq-1/2': '50cqw',
                'cq-3/4': '75cqw',
                'cq-full': '100cqw',
            },
            minWidth: {
                'cq-1/4': '25cqw',
                'cq-1/3': '33.33cqw',
                'cq-1/2': '50cqw',
                'cq-3/4': '75cqw',
                'cq-full': '100cqw',
            }
        },
	},
	plugins: [
		skeleton({
            themes: {
                preset: ['skeleton'],
                custom: [santa_elena_theme]
            }
        })
	]
}

