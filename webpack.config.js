const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './docs'
	},
	
	plugins: [
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: ['docs']
		}),
		new HtmlWebpackPlugin({
			title: 'Sokoban'
		})
	],
	
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'docs')
	},
	
	module: {
		rules: [{
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader'
			]
		}]
	}
};
