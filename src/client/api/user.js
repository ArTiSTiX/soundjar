import request from './request'

export const getUser = userId => request.get(`/users/${userId}`)
