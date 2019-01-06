import { get } from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  setPosition,
  setPlaying,
  setReady,
  next,
  previous,
} from 'actions/player'

import Musicon from 'components/Musicon'
import Audio from 'components/Audio'
import TrackSlider from 'components/TrackSlider'

import cx from './Player.scss'

class Player extends Component {
  state = {
    isLoading: false,
    currentTime: 0,
    duration: null,
  }

  handleTogglePlay = () => this.props.setPlaying(!this.props.isPlaying)
  handleFinish = () => {
    this.setState({ currentTime: 0, duration: null })
    this.props.next()
  }
  handleForward = () => {
    this.props.next()
  }
  handleBackward = () => {
    this.props.previous()
  }
  handlePositionChange = ({ currentTime, duration }) => this.setState({ currentTime, duration })

  handleReady = () => {
    const { isPlaying } = this.props
    if (!isPlaying) {
      this.props.setPlaying(true)
    }
  }

  handleLoading = isLoading => {
    this.setState({ isLoading })
  }

  handleSeek = position => {
    this.props.setPosition(position)
  }

  render() {
    const {
      className,
      isPlaying,
      current,
      position,
    } = this.props

    const {
      isLoading,
      currentTime,
      duration,
    } = this.state

    const audioFile = get(current, 'file')

    return (
      <div className={cx('base', className)}>
        <div
          className={cx(
            'waveform',
            {
              isLoading,
            }
          )}
          onWheel={this.handleWheel}
        >
          <Audio
            src={audioFile}
            startPosition={position}
            isPlaying={isPlaying}
            onReady={this.handleReady}
            onPositionChange={this.handlePositionChange}
            onFinish={this.handleFinish}
            onLoading={this.handleLoading}
          />
          <TrackSlider
            currentTime={currentTime}
            duration={duration}
            isPlaying={isPlaying}
            isLoading={isLoading}
            onSeek={this.handleSeek}
            markerTime={position}
          />
          {!!isLoading &&
            <div
              className={cx('loading')}
              style={{ width: `${isLoading}%` }}
            />}
        </div>
        <div className={cx('actions')}>
          <button
            className={cx('button', 'button--backward')}
            onClick={this.handleBackward}
          >
            <Musicon icon='backward' />
          </button>
          <button
            className={cx(
              'button',
              'button--play',
              {
                isPlaying,
              }
            )}
            disabled={!audioFile}
            onClick={this.handleTogglePlay}
          >
            <Musicon icon={isPlaying ? 'pause' : 'play'} />
          </button>
          <button
            className={cx('button', 'button--forward')}
            onClick={this.handleForward}
          >
            <Musicon icon='forward' />
          </button>
        </div>
      </div>
    )
  }
}

const connectPlayer = connect(
  state => ({
    isPlaying: get(state, 'player.isPlaying'),
    isReady: get(state, 'player.isReady'),
    current: get(state, 'player.current'),
    playlist: get(state, 'player.playlist'),
    position: get(state, 'player.position'),
  }),
  {
    setPosition,
    setPlaying,
    setReady,
    next,
    previous,
  }
)

export default connectPlayer(Player)
