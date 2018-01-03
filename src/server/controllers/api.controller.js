import _ from 'lodash'
import { Router } from 'express'
import { ApiError } from '../errors'
import ContextService from '../services/Context.service'

const routes = new Router()

function contextSerializer(context, value) {
  if (_.isArray(value)) {
    return value.map(val => contextSerializer(context, val))
  }

  if (_.isObject(value) && _.isFunction(value.toJSON)) {
    const serialized = value.toJSON(context)
    return _.isObject(serialized)
      ? _.mapValues(serialized, val => contextSerializer(context, val))
      : contextSerializer(context, serialized)
  }

  return value
}

function apiResponse(context, data, status = 200) {
  const serializer = contextSerializer.bind(null, context)

  return Promise
    .resolve(data)
    .then(values => this.status(status).json(serializer(values)))
    .catch(err => {
      if (err) {
        console.error(err)
      }

      if (err instanceof ApiError) {
        return this.status(err.status).json(err)
      }

      return this.status(500).json(err)
    })
}

function initialize(req, res, next) {
  req.local = {}
  req.local.context = new ContextService('api', req.user)
  res.api = apiResponse.bind(res, req.local.context)
  return next()
}

routes.all('/*', initialize)

export default routes
