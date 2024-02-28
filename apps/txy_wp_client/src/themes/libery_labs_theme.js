import { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const libery_labs_theme = {
    name: 'libery-labs-theme',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `var(--font-read)`,
		"--theme-font-family-heading": `var(--font-titles)`,
		"--theme-font-color-base": "var(--color-secondary-500)",
		"--theme-font-color-dark": "var(--color-primary-300)",
		"--theme-rounded-base": "4px",
		"--theme-rounded-container": "4px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "0 0 0",
		"--on-secondary": "255 255 255",
		"--on-tertiary": "255 255 255",
		"--on-success": "0 0 0",
		"--on-warning": "255 255 255",
		"--on-error": "0 0 0",
		"--on-surface": "255 255 255",
		// =~= Theme Colors  =~=
		// primary | #ff8000 
		"--color-primary-50": "255 236 217", // #ffecd9
		"--color-primary-100": "255 230 204", // #ffe6cc
		"--color-primary-200": "255 223 191", // #ffdfbf
		"--color-primary-300": "255 204 153", // #ffcc99
		"--color-primary-400": "255 166 77", // #ffa64d
		"--color-primary-500": "255 128 0", // #ff8000
		"--color-primary-600": "230 115 0", // #e67300
		"--color-primary-700": "191 96 0", // #bf6000
		"--color-primary-800": "153 77 0", // #994d00
		"--color-primary-900": "125 63 0", // #7d3f00
		// secondary | #fa4f00 
		"--color-secondary-50": "254 229 217", // #fee5d9
		"--color-secondary-100": "254 220 204", // #fedccc
		"--color-secondary-200": "254 211 191", // #fed3bf
		"--color-secondary-300": "253 185 153", // #fdb999
		"--color-secondary-400": "252 132 77", // #fc844d
		"--color-secondary-500": "250 79 0", // #fa4f00
		"--color-secondary-600": "225 71 0", // #e14700
		"--color-secondary-700": "188 59 0", // #bc3b00
		"--color-secondary-800": "150 47 0", // #962f00
		"--color-secondary-900": "123 39 0", // #7b2700
		// tertiary | #0d82ff 
		"--color-tertiary-50": "219 236 255", // #dbecff
		"--color-tertiary-100": "207 230 255", // #cfe6ff
		"--color-tertiary-200": "195 224 255", // #c3e0ff
		"--color-tertiary-300": "158 205 255", // #9ecdff
		"--color-tertiary-400": "86 168 255", // #56a8ff
		"--color-tertiary-500": "13 130 255", // #0d82ff
		"--color-tertiary-600": "12 117 230", // #0c75e6
		"--color-tertiary-700": "10 98 191", // #0a62bf
		"--color-tertiary-800": "8 78 153", // #084e99
		"--color-tertiary-900": "6 64 125", // #06407d
		// success | #a8ff06 
		"--color-success-50": "242 255 218", // #f2ffda
		"--color-success-100": "238 255 205", // #eeffcd
		"--color-success-200": "233 255 193", // #e9ffc1
		"--color-success-300": "220 255 155", // #dcff9b
		"--color-success-400": "194 255 81", // #c2ff51
		"--color-success-500": "168 255 6", // #a8ff06
		"--color-success-600": "151 230 5", // #97e605
		"--color-success-700": "126 191 5", // #7ebf05
		"--color-success-800": "101 153 4", // #659904
		"--color-success-900": "82 125 3", // #527d03
		// warning | #fdcf00 
		"--color-warning-50": "255 248 217", // #fff8d9
		"--color-warning-100": "255 245 204", // #fff5cc
		"--color-warning-200": "255 243 191", // #fff3bf
		"--color-warning-300": "254 236 153", // #feec99
		"--color-warning-400": "254 221 77", // #fedd4d
		"--color-warning-500": "253 207 0", // #fdcf00
		"--color-warning-600": "228 186 0", // #e4ba00
		"--color-warning-700": "190 155 0", // #be9b00
		"--color-warning-800": "152 124 0", // #987c00
		"--color-warning-900": "124 101 0", // #7c6500
		// error | #e50b00 
		"--color-error-50": "251 218 217", // #fbdad9
		"--color-error-100": "250 206 204", // #facecc
		"--color-error-200": "249 194 191", // #f9c2bf
		"--color-error-300": "245 157 153", // #f59d99
		"--color-error-400": "237 84 77", // #ed544d
		"--color-error-500": "229 11 0", // #e50b00
		"--color-error-600": "206 10 0", // #ce0a00
		"--color-error-700": "172 8 0", // #ac0800
		"--color-error-800": "137 7 0", // #890700
		"--color-error-900": "112 5 0", // #700500
		// surface | #131313 
		"--color-surface-50": "220 220 220", // #dcdcdc
		"--color-surface-100": "208 208 208", // #d0d0d0
		"--color-surface-200": "196 196 196", // #c4c4c4
		"--color-surface-300": "161 161 161", // #a1a1a1
		"--color-surface-400": "90 90 90", // #5a5a5a
		"--color-surface-500": "19 19 19", // #131313
		"--color-surface-600": "17 17 17", // #111111
		"--color-surface-700": "14 14 14", // #0e0e0e
		"--color-surface-800": "11 11 11", // #0b0b0b
		"--color-surface-900": "9 9 9", // #090909
		
	}
}