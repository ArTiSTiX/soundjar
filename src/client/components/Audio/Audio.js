/* eslint-disable jsx-a11y/media-has-caption */
import React, { Component } from 'react'

import cx from './Audio.scss'

class Audio extends Component {
  componentDidMount() {
    // audio player object
    const { audio } = this

    audio.addEventListener('error', e => this.props.onError && this.props.onError(e))

    // When enough of the file has downloaded to start playing
    audio.addEventListener('canplay', e => this.props.onReady && this.props.onReady(e))

    // When enough of the file has downloaded to play the entire file
    audio.addEventListener('canplaythrough', () => this.props.onLoading && this.props.onLoading(false))

    // When audio play starts
    audio.addEventListener('play', e => {
      this.listenTrack()
      if (this.props.onPlay) this.props.onPlay(e)
    })

    // When unloading the audio player (switching to another src)
    audio.addEventListener('abort', e => {
      this.clearListenTrack()
      if (this.props.onAbort) this.props.onAbort(e)
    })

    // When the file has finished playing to the end
    audio.addEventListener('ended', e => {
      this.clearListenTrack()
      if (this.props.onFinish) this.props.onFinish(e)
    })

    // When the user pauses playback
    audio.addEventListener('pause', e => {
      this.clearListenTrack()
      if (this.props.onPause) this.props.onPause(e)
    })

    // When the user seeks
    audio.addEventListener('seeked', () => {
      const { currentTime, duration } = this.audio
      this.props.onPositionChange({ currentTime, duration })
    })

    audio.addEventListener('loadstart', () => {
      if (this.props.onLoading) this.props.onLoading(true)
    })
  }

  componentDidUpdate(prevProps) {
    const { src, startPosition, isPlaying } = this.props
    if (src !== prevProps.src) {
      this.props.onPositionChange({ currentTime: 0, duration: null })
    }
    if (startPosition !== prevProps.startPosition) {
      this.audio.currentTime = startPosition
    }
    if (isPlaying !== prevProps.isPlaying) {
      if (isPlaying) {
        this.audio.play()
      } else {
        this.audio.pause()
      }
    }
  }

  listenTrack = () => {
    if (this.interval) this.clearListenTrack()
    this.interval = setInterval(() => {
      const { currentTime, duration } = this.audio
      this.props.onPositionChange({ currentTime, duration })
    }, 60)
  }

  clearListenTrack = () => {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  render() {
    const { src } = this.props

    return (
      <div className={cx('base')}>
        <audio
          src={src}
          preload='auto'
          controls={false}
          ref={ref => {
            this.audio = ref
          }}
        />
      </div>
    )
  }
}

export default Audio
