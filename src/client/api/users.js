import request from './request'

export const fetchAllUsers = () => request.get('/users')
export const fetchUser = userId => request.get(`/users/${userId}`)
