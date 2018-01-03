import path from 'path'
import HTMLPlugin from 'html-webpack-plugin'

import base from './base'
import config from '../config'

export default {
  ...base,
  cache: true,
  watch: true,

  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false',
    'babel-polyfill',
    base.entry.main,
  ],

  devServer: {
    historyApiFallback: true,
  },

  plugins: [
    ...base.plugins,
    new HTMLPlugin({
      title: config.get('app.title'),
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/client/index.ejs'),
      env: config.env,
    }),
  ],
}
