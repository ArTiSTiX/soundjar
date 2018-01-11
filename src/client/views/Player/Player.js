import { get, throttle } from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Wavesurfer from 'react-wavesurfer'

import {
  setPosition,
  setPlaying,
  setReady,
  next,
  previous,
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
  handleFinish = () => {
    this.setState({ position: 0 })
    this.props.next()
  }
  handleForward = () => {
    this.props.next()
  }
  handleBackward = () => {
    this.props.previous()
  }
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
      current,
    } = this.props

    return window.innerWidth / (get(current, 'duration') || 60.0)
  }

  setZoom = zoom => {
    this.setState({ zoom: Math.min(50.0, Math.max(this.getMinZoom(), zoom)) })
  }

  render() {
    const {
      className,
      isPlaying,
      current,
    } = this.props

    const { isLoading, position, zoom } = this.state
    const audioFile = get(current, 'file')

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
          {audioFile
            ? <Wavesurfer
              options={PLAYER_OPTIONS}
              audioFile={audioFile}
              pos={position}
              zoom={Math.max(minZoom, zoom || minZoom)}
              onPosChange={this.handlePosChange}
              onLoading={this.handleLoading}
              onReady={this.handleReady}
              onWaveformReady={this.handleWaveformReady}
              onFinish={this.handleFinish}
              playing={isPlaying}
              responsive={false}
            />
            : null}
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
