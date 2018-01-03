const PROMISE_SUFFIX = {
  success: '',
  pending: '/LOADING',
  failure: '/ERROR',
}

function isPromise(val) {
  return val && typeof val.then === 'function'
}

function promiseMiddleware({ dispatch, getState }) {
  return next => action => {
    const res = action
    if (typeof res.payload === 'function') {
      res.payload = res.payload(dispatch, getState)
    }
    if (isPromise(res.payload)) {
      res.payload
        .then(result => dispatch({
          ...res,
          type: `${res.type}${PROMISE_SUFFIX.success}`,
          payload: result,
        }))
        .catch(error => {
          dispatch({
            ...res,
            type: `${res.type}${PROMISE_SUFFIX.failure}`,
            payload: error,
            error: true,
          })
        })
      next({
        ...res,
        type: `${res.type}${PROMISE_SUFFIX.pending}`,
        payload: null,
      })
    } else {
      next(res)
    }
  }
}
export default promiseMiddleware
