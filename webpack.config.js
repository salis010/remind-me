const path = require('path')

module.exports = {
	entry: './index.js',
	output: {
		path: path.join(__dirname),
		filename: 'index_bundle.js'
	},
	mode: 'production',
	module: {
	rules: [{
		test: /\.js$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader'
		}
		}]
	},
	devtool: 'source-map',
	mode: 'development'
}
