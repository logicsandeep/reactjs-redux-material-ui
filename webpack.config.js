var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var precss = require('precss')
var json = require('json-loader')
var WriteFilePlugin = require('write-file-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    'babel-polyfill',
    'whatwg-fetch',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    //new WriteFilePlugin()
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loaders: ['eslint-loader'],
        include: [
          path.resolve(__dirname, 'src'),
        ],
      }
    ],
    loaders: [{
        loaders: ['babel-loader'],
        include: [
          path.resolve(__dirname, 'src'),
        ],
        test: /\.js$/,
        plugins: ['transform-runtime'],
      }, /*{
        test: /\.jsx?$/,
        loaders: ['react-hot', 'jsx?harmony'],
        include: path.join(__dirname, 'src')
      }, */{
        test:   /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      }, {
        test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader : 'file-loader'
      }, {
        test: /\.json($|\?)/,
        use: 'json-loader'
      }, {
        test: /\.(jpg|png)$/,
        loader: 'url?limit=25000'
      }
      /*{
        test: /\.(jpe?g|png|gif)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }*/
    ]
  },
  postcss: function () {
    return [autoprefixer, precss]
  }
}
