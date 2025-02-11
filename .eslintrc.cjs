module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		es6: true,
	},

	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
	},

	plugins: ['@typescript-eslint', 'simple-import-sort'],

	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'plugin:lit/recommended',
	],

	ignorePatterns: ['dist'],

	rules: {
		'no-console': 'warn',
		quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],

		'prettier/prettier': 'warn',

		'@typescript-eslint/no-unused-vars': 'warn',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',

		'simple-import-sort/imports': 'warn',
		'simple-import-sort/exports': 'warn',
	},
};
