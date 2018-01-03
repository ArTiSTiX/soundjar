import React, { Component } from 'react'
import cx from './Layout.scss'

class Layout extends Component {
  render() {
    const { user, children } = this.props

    return (
      <div className={cx('base')}>
        <div className={cx('header')}>
          <div className={cx('logo')}>SoundJar</div>
          <div className={cx('auth')}>
            { user
              ? `${user.first_name} ${user.last_name}`
              : 'Sign in'}
          </div>
        </div>
        <div className={cx('main')}>
          <aside className={cx('side')}>
          navigation
          </aside>
          <div className={cx('body')}>
            {children}
          </div>
          <div className={cx('playlist')}>
          playlist
          </div>
        </div>
      </div>
    )
  }
}

export default Layout
