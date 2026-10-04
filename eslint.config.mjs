import shawnConfig from '@shawnphoffman/eslint-config/eslint.config.mjs'
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

export default defineConfig([
	...nextVitals,
	...nextTs,
	...shawnConfig,
	{
		rules: {
			'react/no-unescaped-entities': 'warn',
		},
	},
	{
		// TypeScript already checks these, and the eslint versions misfire on global types and package exports maps
		files: ['**/*.{ts,tsx,mts,cts}'],
		rules: {
			'no-undef': 'off',
			'import/named': 'off',
			'import/namespace': 'off',
			'import/default': 'off',
			'import/no-named-as-default-member': 'off',
		},
	},
	globalIgnores(['.next/**', 'next-env.d.ts']),
])
