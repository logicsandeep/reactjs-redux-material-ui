const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const wpconfig = require('./webpack.config')
const express = require('express')
const cors = require('cors')
const app = express()
const compression = require('compression')

/**
 * Production mode build
 * `set NODE_ENV=production`
 * `webpack -p --config ./webpack.production.config.js`
 * `npm start`
 */

app.use(compression())
app.use(cors())

var config;
if (process.env.NODE_ENV == 'production') {
  console.log('PRODUCTION MODE')
  app.use('/static', express.static('dist'))
  config = require('./config/production.json')
} else {
  console.log('DEBUG MODE')
  var compiler = webpack(wpconfig)
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: wpconfig.output.publicPath }))
  app.use(webpackHotMiddleware(compiler))
  config = require('./config/default.json')
}

app.use('/public', express.static('public'))
app.use(express.static('faviconit'))

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.get('/', function(req, res) {
  getIndexHtml(res)
})

app.use(redirectUnmatched)

app.listen(config.port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', config.port, config.port)
  }
})

function getIndexHtml(res) {
  res.sendFile(__dirname + '/index.html')
}
function redirectUnmatched(req, res) {
  res.redirect('/')
}
