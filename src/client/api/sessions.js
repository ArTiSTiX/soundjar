import request from './request'

export const fetchAllSessions = () => request.get('/sessions')
export const fetchSession = sessionId => request.get(`/sessions/${sessionId}`)
