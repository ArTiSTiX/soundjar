import path from 'path'

export const server = {
  port: 3000,
  host: '127.0.0.1',
}

export const database = {
  storage: './development.sqlite',
  dialect: 'sqlite',
  directory: './migrations',
  define: {
    paranoid: true,
    rejectOnEmpty: false,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
  },
}

export const auth = {
  jwt: {
    sign: {
      expiresIn: '15 days',
      issuer: 'artistix',
    },
    secret: 'CapteLesVibrationsEtTuVerrasBougerTesBras',
  },
  facebook: {
    secret: 'b2c1cccf0eb84465bab7e931ba10a1f6', // TODO: Change me before publishing app :p
    appId: '136488650354900',
  },
}

export const defaults = {
  artist: 'NXMR',
}

export const bluebird = {
  longStackTrace: false,
}

export const storage = {
  sessions: path.resolve(__dirname, '../files/projects'),
  instrumentals: path.resolve(__dirname, '../files/instrus'),
  audioPattern: {
    regex: /^([a-z0-9_ ]+)_(\d{4}-\d{2}-\d{2}\s\d{2}-\d{2}-\d{2})_([a-z0-9_ ]+)$/i,
    dateFormat: 'YYYY-MM-DD hh-mm-ss',
    groups: {
      name: 1,
      date: 2,
      channel: 3,
    },
  },
  renderPattern: {
    regex: /^((\d\.)*[AB0-9]{1,2})* *-* *(\d{2})h(\d{2}) *-* *(.+)*$/i,
    groups: {
      hours: 3,
      minutes: 4,
      title: 5,
    },
  },
}

export const build = {
  filename: 'assets/javascripts/[name].js',
  chunkFilename: 'assets/javascripts/[name].js',
  commonsChunk: null,
  imagesFilename: 'assets/images/[name].[ext]',
  fontsFilename: 'assets/fonts/[name].[ext]',
  cssFilename: false,
  publicPath: '/',
  devtool: 'inline-cheap-module-source-map',
  minify: false,
  hmr: true,
}

export const app = {
  title: 'SoundJar',
  apiRoot: '/api/',
}
