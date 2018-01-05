import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAuthentication } from 'actions/auth'

import Navigation from 'components/Navigation'
import Player from 'views/Player'

import cx from './App.scss'

const APP_TITLE = APPCONFIG.title

class App extends Component {
  componentWillMount() {
    return this.props.handleAuthentication()
  }

  render() {
    const { auth: { user }, playerIsActive, children } = this.props

    return (
      <div className={cx('base')}>
        <div className={cx('header')}>
          <div className={cx('logo')}>{APP_TITLE}</div>
          <div className={cx('auth')}>
            { user
              ? `${user.first_name} ${user.last_name}`
              : <a className={cx('button', 'button--signIn')} href='/auth/facebook'>Se connecter</a>}
          </div>
        </div>
        <div className={cx('main')}>
          <Navigation className={cx('side')} />
          <div className={cx('body')}>
            {children}
          </div>
          <div className={cx('playlist')}>
          playlist
          </div>
        </div>
        <div>
          <Player className={cx('player', { 'player-isActive': playerIsActive })} />
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    auth: state.auth,
    playerIsActive: !!state.player.currentTrack,
  }),
  {
    handleAuthentication,
  }
)(App)
