import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import AppVersionPlugin from './plugins/app-version-plugin';

const distPath:string = path.join(__dirname, 'dist');

const config: webpack.Configuration = {
  entry: {
    app: './src/index.ts'
  },
  output: {
    filename: '[name].js',
    path: distPath,
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html')
    }),

    new MiniCssExtractPlugin({ filename: 'styles.css' }),

    new AppVersionPlugin({ filename: 'version.txt', version: require('./package.json').version })
  ],
  optimization: {
    namedModules: true,
    noEmitOnErrors: true,
    concatenateModules: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /node_modules/,
          chunks: 'all'
        }
      }
    }

  }
};

export default config;
