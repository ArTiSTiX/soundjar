import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get, map } from 'lodash'
import PlaylistItem from 'components/PlaylistItem'
import {
  play,
} from 'actions/player'

import cx from './Playlist.scss'

class Playlist extends Component {
  handlePlay = item => this.props.play(item)
  render() {
    const {
      className,
      playlist,
      current,
      isPlaying,
    } = this.props

    if (!playlist.length) {
      return (<div className={cx('empty', className)}>Empty</div>)
    }

    return (
      <div className={cx('base', className)}>
        {map(playlist, item => (
          <PlaylistItem
            className={cx('item')}
            item={item}
            current={current}
            isPlaying={isPlaying}
            onPlay={this.handlePlay}
            key={item.id}
          />
        ))}
      </div>
    )
  }
}

const connectPlaylist = connect(
  state => ({
    isPlaying: get(state, 'player.isPlaying'),
    current: get(state, 'player.current'),
    playlist: get(state, 'player.playlist'),
  }),
  {
    play,
  }
)

export default connectPlaylist(Playlist)
