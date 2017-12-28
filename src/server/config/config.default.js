export const server = {
  port: 3000,
  host: '127.0.0.1',
}

export const database = {
  storage: './development.sqlite',
  dialect: 'sqlite',
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
