import { get, throttle } from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Wavesurfer from 'react-wavesurfer'

import {
  setPosition,
  setPlaying,
  setReady,
} from 'actions/player'

import Musicon from 'components/Musicon'

import cx from './Player.scss'

const ZOOM_FACTOR = 0.02
const PLAYER_OPTIONS = {
  // barWidth: 1,
  cursorColor: '#30d3a5',
  waveColor: '#7d8491',
  progressColor: '#209775',
  fillParent: false,
  height: 72,
  // barHeight: 0.90,
  pixelRatio: 3,
  scrollParent: true,
  backend: 'MediaElement',
  renderer: 'MultiCanvas',
  autoCenter: false,
}

class Player extends Component {
  state = {
    isLoading: false,
    position: 0,
    zoom: null,
  }
  zoomDelta = 0

  handleTogglePlay = () => this.props.setPlaying(!this.props.isPlaying)
  handlePosChange = e => this.setState({ position: e.originalArgs[0] })
  handleLoading = e => {
    const isLoading = e.originalArgs[0]
    this.setState({ isLoading })
  }

  handleReady = () => {
    this.props.setPlaying(true)
  }

  handleWaveformReady = () => {
    this.setState({ isLoading: false })
  }

  handleWheel = e => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault()
      this.zoomDelta += e.deltaY
      this.applyZoomDelta()
    }
  }

  applyZoomDelta = throttle(() => {
    const { zoom } = this.state
    this.setZoom(Math.max((0.0, -ZOOM_FACTOR * this.zoomDelta) + zoom))
    this.zoomDelta = 0
  }, 200)

  getMinZoom = () => {
    const {
      currentTrack,
    } = this.props

    return window.innerWidth / get(currentTrack, 'render.duration', 60.0)
  }

  setZoom = zoom => {
    this.setState({ zoom: Math.min(50.0, Math.max(this.getMinZoom(), zoom)) })
  }

  render() {
    const {
      isPlaying,
      currentTrack,
      className,
    } = this.props

    const { isLoading, position, zoom } = this.state
    const audioFile = get(currentTrack, 'render.mp3')

    const minZoom = this.getMinZoom()

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
          <Wavesurfer
            options={PLAYER_OPTIONS}
            audioFile={audioFile}
            pos={position}
            zoom={Math.max(minZoom, zoom || minZoom)}
            onPosChange={this.handlePosChange}
            onLoading={this.handleLoading}
            onReady={this.handleReady}
            onWaveformReady={this.handleWaveformReady}
            playing={isPlaying}
            responsive={false}
          />
          {!!isLoading &&
            <div
              className={cx('loading')}
              style={{ width: `${isLoading}%` }}
            />}
        </div>
        <div className={cx('actions')}>
          <button
            className={cx('button', 'button--backward', { isActive: false })}
            onClick={this.handleBackward}
            disabled
          >
            <Musicon icon='backward' />
          </button>
          <button
            className={cx(
              'button',
              'button--play',
              {
                isPlaying,
                isActive: !!audioFile,
              }
            )}
            disabled={!audioFile}
            onClick={this.handleTogglePlay}
          >
            <Musicon icon={isPlaying ? 'pause' : 'play'} />
          </button>
          <button
            className={cx('button', 'button--forward', { isActive: false })}
            disabled
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
    currentTrack: get(state, 'player.currentTrack'),
  }),
  {
    setPosition,
    setPlaying,
    setReady,
  }
)

export default connectPlayer(Player)
