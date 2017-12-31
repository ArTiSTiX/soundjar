import _ from 'lodash'
import moment from 'moment'

const FILTERS = {
  in: value => (_.isArray(value) ? { $in: value } : { $in: value.split ? value.split(',') : value }),
  like: value => ({ $regexp: value }),
  eq: value => (value === 'true' || value === 'false' ? { $eq: value === 'true' } : { $eq: value }),
  ne: value => (value === 'true' || value === 'false' ? { $ne: value === 'true' } : { $ne: value }),
  not: value => ({ $not: (((value === 'true' || value === true) && true) || ((value === 'null' || value === null) ? null : false)) }),
  lte: value => ({ $lte: Number(value) }),
  gte: value => ({ $gte: Number(value) }),
  lt: value => ({ $lt: Number(value) }),
  gt: value => ({ $gt: Number(value) }),
  before: value => {
    const date = moment(value)
    if (date.isValid()) {
      return { $lt: date.toDate() }
    }
    return {}
  },
  after: value => {
    const date = moment(value)
    if (date.isValid()) {
      return { $gte: date.toDate() }
    }
    return {}
  },
  at: value => {
    const date = moment(value, ['YYYY', moment.ISO_8601])
    const { format } = date.creationData()
    if (date.isValid()) {
      switch (format) {
        case 'YYYY': return { $gte: date.startOf('year').toDate(), $lt: date.endOf('year').toDate() }
        case 'YYYY-MM': return { $gte: date.startOf('month').toDate(), $lt: date.endOf('month').toDate() }
        case 'YYYY-MM-DD': return { $gte: date.startOf('day').toDate(), $lt: date.endOf('day').toDate() }
        case 'YYYY-MM-DD HH': case 'YYYY-MM-DDTHH': return { $gte: date.startOf('hour').toDate(), $lt: date.endOf('hour').toDate() }
        case 'YYYY-MM-DD HH:mm': case 'YYYY-MM-DDTHH:mm': return { $gte: date.startOf('minute').toDate(), $lt: date.endOf('minute').toDate() }
        case 'YYYY-MM-DD HH:mm:ss': case 'YYYY-MM-DDTHH:mm:ss': return { $gte: date.startOf('second').toDate(), $lt: date.endOf('second').toDate() }
        default: return null
      }
    }
    return {}
  },
  exists: value => (value === 'true' ? { $ne: null } : { $eq: null }),
}

export const sortToOrder = sort => {
  if (!sort) {
    return undefined
  }

  const order = _.map(
    sort.split(','),
    value => {
      const field = value.replace(/^-/, '')
      const desc = value.charAt(0) === '-'
      return _.concat(field.split('.'), [desc ? 'DESC' : 'ASC'])
    }
  )

  return order
}

export const transformWhere = (where = {}, ignore = []) => _.reduce(where, (memo, value, key) => {
  const parts = _.split(key, '.')

  const field = (parts.length > 1)
    ? _.take(parts, parts.length - 1)
    : parts[0]
  const verb = (parts.length > 1)
    ? _.last(parts)
    : 'eq'

  if (!_.includes(ignore, field) && _.has(FILTERS, verb)) {
    _.merge(memo, _.set({}, field, FILTERS[verb](value)))
  }

  return memo
}, {})

export const transformQuery = (query, ignore = []) => {
  const {
    offset,
    limit,
    sort,
    ...params
  } = query


  const pagination = {
    offset: _.isUndefined(offset) ? undefined : _.parseInt(offset),
    limit: _.isUndefined(limit) ? undefined : _.parseInt(limit),
    order: sortToOrder(sort),
  }

  const where = transformWhere(params, ignore)

  return _.omitBy({
    where,
    ...pagination,
  }, _.isUndefined)
}
