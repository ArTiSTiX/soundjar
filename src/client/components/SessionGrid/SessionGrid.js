import React, { Component } from 'react'
import { map, times } from 'lodash'
import SessionCard from '../SessionCard'

import cx from './SessionGrid.scss'

class SessionGrid extends Component {
  render() {
    const { sessions, isLoading } = this.props

    return (
      <div className={cx('base')}>
        {map(sessions, session => (
          <SessionCard
            className={cx('item')}
            session={session}
            key={session.id}
          />
        ))}
        {isLoading
          ? times(3, i => (<div className={cx('placeholder')} key={i} />))
          : null}
      </div>
    )
  }
}

export default SessionGrid
