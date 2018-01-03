import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import path from 'path'

import config from '../config'
import webpackConfig from '../../../webpack/dev.js'

export default server => {
  if (config.get('build.hmr')) {
    const compiler = webpack(webpackConfig)

    const devMiddlewareConfig = {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
    }

    server.use(webpackHotMiddleware(compiler))
    server.use((req, res, next) => {
      if (!path.extname(req.url)) {
        req.url = '/'
      }
      next()
    })
    server.use(webpackDevMiddleware(compiler, devMiddlewareConfig))
  }
}
