// https://docs.expo.dev/guides/using-eslint/
module.exports = {
	extends: ['expo', 'prettier'],
	plugins: ['prettier'],
	rules: {
		indent: ['error', 'tab'],
		'no-tabs': 'off',
		'react/jsx-indent': ['error', 'tab'],
		'react/jsx-indent-props': ['error', 'tab'],
		curly: ['error', 'multi-line', 'consistent'],
		'object-curly-spacing': ['error', 'always'],
		'brace-style': ['error', '1tbs', { allowSingleLine: true }],
		'@typescript-eslint/object-curly-spacing': ['error', 'always'],
		quotes: ['error', 'single', { allowTemplateLiterals: true }],
		'prettier/prettier': [
			'error',
			{
				useTabs: true,
				tabWidth: 2,
				singleQuote: true,
				trailingComma: 'none'
			}
		]
	}
};
