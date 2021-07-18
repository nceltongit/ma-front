const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  devServer: {
    contentBase: './public',
    hot: true,
    host: 'localhost',
    port: 9000,
    historyApiFallback: true
  },
  entry: [
    path.join(__dirname, '/src/index.jsx'),
    path.join(__dirname, '/src/assets/scss/style.scss')
  ],
  module: {
    rules: [
      {
        test: /\.woff|eot|svg|otf|ttf|woff2|gif$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'font/[name].[ext]'
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: 'Ma-front',
      template: path.join(__dirname, '/src/index.html'),
      filename: './index.html',
      favicon: 'src/assets/images/favicon.png'
    })
  ],
  output: {
    filename: '[hash].bundle.js',
    path: path.join(__dirname, '/public'),
    publicPath: ''
  }
};
