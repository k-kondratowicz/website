module.exports = {
	presets: ["@babel/preset-env"],
	plugins: [
		"@babel/plugin-proposal-nullish-coalescing-operator",
		"@babel/plugin-proposal-optional-chaining",
		[
			"@babel/plugin-proposal-decorators",
			{
				legacy: true
			}
		],
		"@babel/plugin-proposal-class-properties"
	]
}	