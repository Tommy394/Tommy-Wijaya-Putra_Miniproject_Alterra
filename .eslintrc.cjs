module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"react-app",
	],
	overrides: [],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: ["react", "react-hooks"],
	rules: {
		"react/prop-types": "off",
		"react-hooks/exhaustive-deps": [
			"warn",
			{
				additionalHooks: "(useRecoilCallback|useRecoilTransaction_UNSTABLE)",
			},
		],
	},
};
