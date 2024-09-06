module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{html,json}'
	],
	swDest: 'public/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/,
		/^s/
	]
};