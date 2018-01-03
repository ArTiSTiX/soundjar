import React, { Component } from 'react'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { getSession } from 'actions/sessions'

import SessionHeader from 'components/SessionHeader'

class SessionDetail extends Component {
  componentWillMount() {
    const {
      match: {
        params: {
          sessionId,
        },
      },
    } = this.props
    return this.props.getSession(sessionId)
  }

  render() {
    const { session, error, isLoading } = this.props

    if (error) {
      return (<div>Un erreur est survenue</div>)
    }

    return (
      <div className='Sessions'>
        <SessionHeader
          session={session}
          isLoading={isLoading}
          error={error}
        />
      </div>
    )
  }
}

export default connect(
  state => ({
    session: get(state, 'sessions.detail.data'),
    isLoading: get(state, 'sessions.detail.isLoading'),
    error: get(state, 'sessions.detail.error'),
  }),
  {
    getSession,
  }
)(SessionDetail)
