import React, { Component } from 'react'
import { secondsToTime } from 'helpers/time'

import cx from './TrackSlider.scss'

class TrackSlider extends Component {
  state = {
    cursorTime: 0,
  }

  componentDidMount() {
    const { container } = this
    container.addEventListener('mousemove', this.mouseMoveHandler)
    container.addEventListener('click', this.mouseClickHandler)
  }

  getTimeAt = (left, width) => {
    const { duration } = this.props
    return (left * duration) / width
  }

  mouseMoveHandler = event => {
    event.preventDefault()
    const { container } = this

    const containerWidth = this.container.offsetWidth

    const offsetX = (
      event.clientX !== undefined
        ? event.clientX
        : event.targetTouches[0].pageX
    ) - container.getBoundingClientRect().left

    const cursorTime = this.getTimeAt(offsetX, containerWidth)

    this.setState({ cursorTime })
  }

  mouseClickHandler = event => {
    event.preventDefault()
    const { container } = this

    const containerWidth = this.container.offsetWidth

    const offsetX = (
      event.clientX !== undefined
        ? event.clientX
        : event.targetTouches[0].pageX
    ) - container.getBoundingClientRect().left

    const markerTime = this.getTimeAt(offsetX, containerWidth)

    if (this.props.onSeek) this.props.onSeek(markerTime)
  }

  render() {
    const {
      isPlaying,
      isLoading,
      currentTime,
      duration,
      markerTime,
    } = this.props

    const { cursorTime } = this.state

    const width = duration ? `${(currentTime / duration) * 100}%` : 0
    const cursorLeft = duration ? `${(cursorTime / duration) * 100}%` : 0
    const markerLeft = duration ? `${(markerTime / duration) * 100}%` : 0
    return (
      <div
        className={cx('base', {
          isPlaying,
          isLoading,
        })}
        ref={ref => { this.container = ref }}
      >
        <div className={cx('time')}>
          {secondsToTime(currentTime)}
        </div>
        <div className={cx('duration')}>
          {secondsToTime(duration)}
        </div>
        <div
          className={cx('progress')}
          style={{ width }}
        />
        <div className={cx('cursor')} style={{ left: cursorLeft }} />
        <div className={cx('marker')} style={{ left: markerLeft }} />
      </div>
    )
  }
}

export default TrackSlider
