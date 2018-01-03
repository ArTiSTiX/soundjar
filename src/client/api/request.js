import axios from 'axios'

const { apiRoot } = APPCONFIG

const request = axios.create({
  baseURL: apiRoot,
  timeout: 1000,
})

request.interceptors.response.use(
  response => response.data,
  ({ response }) => Promise.reject(response)
)

export function setAuthorizationToken(token) {
  if (token) {
    request.defaults.headers.common.authorization = `JWT ${token}`
  } else {
    delete request.defaults.headers.common.authorization
  }
}

export default request
