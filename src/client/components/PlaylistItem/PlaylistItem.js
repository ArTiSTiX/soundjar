import React, { Component } from 'react'
import Musicon from 'components/Musicon'

import cx from './PlaylistItem.scss'

class PlaylistItem extends Component {
  handlePlay = () => this.props.onPlay(this.props.item)

  render() {
    const { item, current, isPlaying: currentIsPlaying } = this.props

    const isPlaying = currentIsPlaying && (
      current
      && current.type === item.type
      && current.id === item.id
    )

    return (
      <div className={cx('base', { isPlaying })}>
        <div className={cx('play')}>
          <button
            className={cx('button', 'button--play')}
            onClick={this.handlePlay}
          >
            <Musicon icon={isPlaying ? 'pause' : 'play'} />
          </button>
        </div>
        <div className={cx('info')}>
          <div className={cx('title')}>{item.title}</div>
        </div>
      </div>
    )
  }
}

export default PlaylistItem
