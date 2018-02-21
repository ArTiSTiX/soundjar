import webpack from 'webpack'
import path from 'path'
import _ from 'lodash'

import ExtractTextPlugin from 'extract-text-webpack-plugin'
import ExtendedDefinePlugin from 'extended-define-webpack-plugin'

import babelPresetReact from 'babel-preset-react'
import babelPresetEs2015 from 'babel-preset-es2015'
import babelLodashPlugin from 'babel-plugin-lodash'

import babelReactInlineElementsPlugin from 'babel-plugin-transform-react-inline-elements'
import babelReactConstantElementsPlugin from 'babel-plugin-transform-react-constant-elements'

import reactHotLoaderBabel from 'react-hot-loader/babel'
import reactHmre from 'babel-preset-react-hmre'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'

import config from '../config'

const dist = path.resolve(__dirname, '../dist/')
const src = path.resolve(__dirname, '../src/client/')

/*
Config-specific plugins
*/

const plugins = []

plugins.push(new ExtractTextPlugin({
  filename: config.get('build.cssFilename'),
  disable: !config.get('build.cssFilename'),
}))

if (config.get('build.minify')) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      comparisons: false, // Needed for mapboxgl
    },
    output: { comments: false },
    sourceMap: (config.get('build.devtool') === 'source-map' || config.get('build.devtool') === 'hidden-source-map'),
  }))
}

if (config.get('build.hmr')) {
  plugins.push(new webpack.HotModuleReplacementPlugin())
  plugins.push(new webpack.NoEmitOnErrorsPlugin())
}

const webpackConfig = {
  entry: {
    main: './src/client/index.js',
  },

  output: {
    path: dist,
    publicPath: config.get('build.publicPath'),
    filename: config.get('build.filename'),
    chunkFilename: config.get('build.chunkFilename'),
  },

  devtool: config.get('build.devtool'),
  module: {
    rules: [
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: config.get('build.fontsFilename'),
          },
        },
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: config.get('build.imagesFilename'),
          },
        },
      },
      {
        test: /\.scss$/,
        use: _.concat(
          [
            { loader: 'classnames-loader' },
          ],
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  importLoaders: 1,
                  localIdentName: '[name]-[local]',
                },
              },
              { loader: 'autoprefixer-loader' },
              { loader: 'resolve-url-loader' },
              {
                loader: 'sass-loader',
                options: {
                  includePaths: [path.join(__dirname, '../src/client/style')],
                },
              },
            ],
          }),
        ),
      },
      {
        test: /\.js?$/,
        exclude: [require.resolve('wavesurfer.js')],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: _.compact([
              babelPresetReact,
              babelPresetEs2015,
              (config.get('build.hmr') ? reactHmre : null),
            ]),
            plugins: _.compact([
              'transform-class-properties',
              babelLodashPlugin,
              (config.get('build.hmr') ? reactHotLoaderBabel : null),
              babelReactInlineElementsPlugin,
              babelReactConstantElementsPlugin,
            ]),
          },
        },
      },
    ],
  },
  plugins: [
    new ExtendedDefinePlugin({
      BROWSER: true,
      ENV: config.env,
      APPCONFIG: config.get('app'),
    }),

    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /(fr)/),
    new ProgressBarPlugin(),
    ...plugins,
  ],

  resolveLoader: {
    modules: [path.join(__dirname, '../node_modules')],
  },

  resolve: {
    modules: [src, path.join(__dirname, '../node_modules')],
    alias: {
      wavesurfer: 'wavesurfer.js',
    },
  },
}

export default webpackConfig
