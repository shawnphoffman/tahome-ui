module.exports = {
	extends: 'next/core-web-vitals',
	plugins: ['simple-import-sort'],
	rules: {
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					['^\\u0000'],
					['^react$', '^react', '^@?\\w'],
					['^(@root|types|data)(/.*)'],
					['^(components|utils|context|config|pages|hooks)(/.*)'],
					[('^\\.\\.(?!/?$)', '^\\.\\./?$')],
					['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
				],
			},
		],
		'sort-imports': 'off',
		'import/order': 'off',
		'react/no-unescaped-entities': 'warn',
	},
}
