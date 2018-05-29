const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    loaders: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html')
    })
  ]
};
