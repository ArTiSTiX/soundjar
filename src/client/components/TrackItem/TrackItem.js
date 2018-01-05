import React, { Component } from 'react'
import moment from 'moment'

import Musicon from 'components/Musicon'

import cx from './TrackItem.scss'


class TrackItem extends Component {
  getDefaultTitle = () => {
    const { track } = this.props
    if (!track) { return '' }
    if (track.start_at) {
      return moment(track.start_at).format('HH[h]mm')
    }
    return 'No title'
  }

  handlePlay = () => this.props.onPlay(this.props.track)

  render() {
    const { track, currentTrack, isPlaying: currentTrackIsPlaying } = this.props

    if (!track || !track.render || !track.render.mp3) { return null }

    const isPlaying = currentTrackIsPlaying && (currentTrack && currentTrack.id === track.id)

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
