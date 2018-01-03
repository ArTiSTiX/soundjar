import React, { Component } from 'react'
import Trianglify from 'react-trianglify'

import cx from './SessionHeader.scss'

class SessionHeader extends Component {
  render() {
    const {
      session,
      className,
      isLoading,
      error,
    } = this.props

    if (!session || isLoading || error) { return null }

    return (
      <header
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
                  width={640}
                  height={640}
                  cell_size={120}
                  seed={session.title}
                />
              </div>
            )
          }
        </div>
        <div className={cx('info')}>
          <div className={cx('header')}>
            <div className={cx('title')}>{session.title}</div>
            <div className={cx('artist')}>{session.artist}</div>
          </div>
        </div>
      </header>
    )
  }
}

export default SessionHeader
