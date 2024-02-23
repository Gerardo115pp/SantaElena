
import { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

/**
 * @type {CustomThemeConfig}
 */
export const santa_elena_theme = {
    name: 'santa-elena-theme',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `var(--font-read)`,
		"--theme-font-family-heading": `var(--font-titles)`,
		"--theme-font-color-base": "var(--body-text-color)",
		"--theme-font-color-dark": "var(--body-text-color)",
		"--theme-rounded-base": "9999px",
		"--theme-rounded-container": "var(--border-radius)",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "var(--color-secondary-600)",
		"--on-secondary": "var(--color-primary-300)",
		"--on-tertiary": "var(--color-primary-300)",
		"--on-success": "var(--color-secondary-500)",
		"--on-warning": "0 0 0",
		"--on-error": "255 255 255",
		"--on-surface": "var(--color-primary-300)",
		// =~= Theme Colors  =~=
		// primary | #ba931c 
		"--color-primary-50": "245 239 221", // #f5efdd
		"--color-primary-100": "241 233 210", // #f1e9d2
		"--color-primary-200": "238 228 198", // #eee4c6
		"--color-primary-300": "227 212 164", // #e3d4a4
		"--color-primary-400": "207 179 96", // #cfb360
		"--color-primary-500": "186 147 28", // #ba931c
		"--color-primary-600": "167 132 25", // #a78419
		"--color-primary-700": "140 110 21", // #8c6e15
		"--color-primary-800": "112 88 17", // #705811
		"--color-primary-900": "91 72 14", // #5b480e
		// secondary | #333333 
		"--color-secondary-50": "224 224 224", // #e0e0e0
		"--color-secondary-100": "214 214 214", // #d6d6d6
		"--color-secondary-200": "204 204 204", // #cccccc
		"--color-secondary-300": "173 173 173", // #adadad
		"--color-secondary-400": "112 112 112", // #707070
		"--color-secondary-500": "51 51 51", // #333333
		"--color-secondary-600": "46 46 46", // #2e2e2e
		"--color-secondary-700": "38 38 38", // #262626
		"--color-secondary-800": "31 31 31", // #1f1f1f
		"--color-secondary-900": "25 25 25", // #191919
		// tertiary | #62462d 
		"--color-tertiary-50": "231 227 224", // #e7e3e0
		"--color-tertiary-100": "224 218 213", // #e0dad5
		"--color-tertiary-200": "216 209 203", // #d8d1cb
		"--color-tertiary-300": "192 181 171", // #c0b5ab
		"--color-tertiary-400": "145 126 108", // #917e6c
		"--color-tertiary-500": "98 70 45", // #62462d
		"--color-tertiary-600": "88 63 41", // #583f29
		"--color-tertiary-700": "74 53 34", // #4a3522
		"--color-tertiary-800": "59 42 27", // #3b2a1b
		"--color-tertiary-900": "48 34 22", // #302216
		// success | #84cc16 
		"--color-success-50": "237 247 220", // #edf7dc
		"--color-success-100": "230 245 208", // #e6f5d0
		"--color-success-200": "224 242 197", // #e0f2c5
		"--color-success-300": "206 235 162", // #ceeba2
		"--color-success-400": "169 219 92", // #a9db5c
		"--color-success-500": "132 204 22", // #84cc16
		"--color-success-600": "119 184 20", // #77b814
		"--color-success-700": "99 153 17", // #639911
		"--color-success-800": "79 122 13", // #4f7a0d
		"--color-success-900": "65 100 11", // #41640b
		// warning | #EAB308 
		"--color-warning-50": "252 244 218", // #fcf4da
		"--color-warning-100": "251 240 206", // #fbf0ce
		"--color-warning-200": "250 236 193", // #faecc1
		"--color-warning-300": "247 225 156", // #f7e19c
		"--color-warning-400": "240 202 82", // #f0ca52
		"--color-warning-500": "234 179 8", // #EAB308
		"--color-warning-600": "211 161 7", // #d3a107
		"--color-warning-700": "176 134 6", // #b08606
		"--color-warning-800": "140 107 5", // #8c6b05
		"--color-warning-900": "115 88 4", // #735804
		// error | #e71d13 
		"--color-error-50": "251 221 220", // #fbdddc
		"--color-error-100": "250 210 208", // #fad2d0
		"--color-error-200": "249 199 196", // #f9c7c4
		"--color-error-300": "245 165 161", // #f5a5a1
		"--color-error-400": "238 97 90", // #ee615a
		"--color-error-500": "231 29 19", // #e71d13
		"--color-error-600": "208 26 17", // #d01a11
		"--color-error-700": "173 22 14", // #ad160e
		"--color-error-800": "139 17 11", // #8b110b
		"--color-error-900": "113 14 9", // #710e09
		// surface | #333333 
		"--color-surface-50": "224 224 224", // #e0e0e0
		"--color-surface-100": "214 214 214", // #d6d6d6
		"--color-surface-200": "var(--clear)", // #cccccc
		"--color-surface-300": "173 173 173", // #adadad
		"--color-surface-400": "112 112 112", // #707070
		"--color-surface-500": "51 51 51", // #333333
		"--color-surface-600": "46 46 46", // #2e2e2e
		"--color-surface-700": "38 38 38", // #262626
		"--color-surface-800": "31 31 31", // #1f1f1f
		"--color-surface-900": "25 25 25", // #191919
		
	}
}