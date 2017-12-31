import express from 'express'

import * as Errors from '../errors'

export default function apiResponse(data, status = 200) {
  return Promise.resolve(data)
    .then(values => this.status(status).send(JSON.stringify(values)))
    .catch(err => {
      if (err) {
        console.error(err)
      }

      if (err instanceof Errors.ApiError) {
        return this.status(err.status).json(err)
      }

      return this.status(500).json(err)
    })
}


express.response.api = apiResponse
