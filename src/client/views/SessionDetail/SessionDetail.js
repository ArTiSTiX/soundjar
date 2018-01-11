import React, { Component } from 'react'
import { get, map } from 'lodash'
import { connect } from 'react-redux'

import { getSession } from 'actions/sessions'
import { playTrack } from 'actions/player'

import SessionHeader from 'components/SessionHeader'
import TrackItem from 'components/TrackItem'

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

  handlePlay = track => this.props.playTrack(track, this.props.session)

  render() {
    const {
      session,
      error,
      isLoading,
      isPlaying,
      current,
    } = this.props

    if (isLoading) { return null }

    if (error || !session) {
      return (<div>Un erreur est survenue</div>)
    }

    return (
      <div className='Sessions'>
        <SessionHeader
          session={session}
          isLoading={isLoading}
          error={error}
        />
        {map(session.tracks, track => (
          <TrackItem
            key={track.id}
            track={track}
            current={current}
            isPlaying={isPlaying}
            onPlay={this.handlePlay}
          />
        ))}
      </div>
    )
  }
}

export default connect(
  state => ({
    session: get(state, 'sessions.detail.data'),
    isLoading: get(state, 'sessions.detail.isLoading'),
    error: get(state, 'sessions.detail.error'),
    isPlaying: get(state, 'player.isPlaying'),
    current: get(state, 'player.current'),
  }),
  {
    getSession,
    playTrack,
  }
)(SessionDetail)
