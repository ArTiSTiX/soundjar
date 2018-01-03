import React, { Component } from 'react'
import Trianglify from 'react-trianglify'

import Link from '../Link'

import cx from './SessionCard.scss'

class SessionCard extends Component {
  render() {
    const { session, className } = this.props

    return (
      <Link
        className={cx('base', className)}
        to={`/sessions/${session.id}`}
      >
        <div className={cx('preview')}>
          { session.cover
            ? <img
              className={cx('cover', 'cover--image')}
              src={session.cover}
              alt={`Cover of ${session.title}`}
            />
            : (
              <div className={cx('cover', 'cover--trianglify')}>
                <Trianglify
                  output='png'
                  width={480}
                  height={480}
                  cell_size={90}
                  seed={session.title}
                />
              </div>
            )
          }
        </div>
        <div className={cx('header')}>
          <div className={cx('title')}>{session.title}</div>
          <div className={cx('artist')}>{session.artist}</div>
        </div>
      </Link>
    )
  }
}

export default SessionCard
