import React, { Component } from 'react'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { listSessions } from 'actions/sessions'

import SessionGrid from 'components/SessionGrid'

class Sessions extends Component {
  componentWillMount() {
    return this.props.listSessions()
  }

  render() {
    const { sessions, error, isLoading } = this.props

    if (error) {
      return (<div>Un erreur est survenue</div>)
    }

    return (
      <SessionGrid
        sessions={sessions}
        isLoading={isLoading}
      />
    )
  }
}

export default connect(
  state => ({
    sessions: get(state, 'sessions.list.items'),
    isLoading: get(state, 'sessions.list.isLoading'),
    error: get(state, 'sessions.list.error'),
  }),
  {
    listSessions,
  }
)(Sessions)
