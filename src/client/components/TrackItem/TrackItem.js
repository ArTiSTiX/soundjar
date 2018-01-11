import React, { Component } from 'react'
import { getTrackDefaultTitle } from 'helpers/playlist'

import Musicon from 'components/Musicon'

import cx from './TrackItem.scss'


class TrackItem extends Component {
  getDefaultTitle = () => getTrackDefaultTitle(this.props.track)

  handlePlay = () => this.props.onPlay(this.props.track)

  render() {
    const { track, current, isPlaying: currentIsPlaying } = this.props

    if (!track || !track.render || !track.render.mp3) { return null }

    const isPlaying = currentIsPlaying && (current && current.type === 'track' && current.id === track.id)

    return (
      <div className={cx('base')}>
        <div className={cx('play')}>
          <button
            className={cx('button', 'button--play', { isPlaying })}
            onClick={this.handlePlay}
          >
            <Musicon icon={isPlaying ? 'pause' : 'play'} />
          </button>
        </div>
        <div className={cx('info')}>
          <div className={cx('title')}>{track.title || this.getDefaultTitle()}</div>
        </div>
      </div>
    )
  }
}

export default TrackItem
