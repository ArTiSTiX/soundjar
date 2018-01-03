import webpack from 'webpack'
import webpackConfig from '../webpack/base'

const bundler = webpack(webpackConfig)

bundler.run((err, stats) => {
  if (err) { throw err }
  return stats
})
