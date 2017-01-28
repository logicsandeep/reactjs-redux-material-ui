var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var precss = require('precss')
var json = require('json-loader')
var WriteFilePlugin = require('write-file-webpack-plugin')

module.exports = {
  devtool: 'cheap-source-map',
  entry: [
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
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
      }
    }),
    new WriteFilePlugin()
  ],
  module: {
    loaders: [{
        loaders: ['babel-loader'],
        include: [
          path.resolve(__dirname, 'src'),
        ],
        test: /\.js$/,
        plugins: ['transform-runtime'],
      }, {
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
