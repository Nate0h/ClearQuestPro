const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  resolve: {
    fallback: {
      util: require.resolve("util/")
    }
},
  plugins: [
		new NodePolyfillPlugin()
	],
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
    {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
    },
    {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    },
    {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
    },
    ],
},
};