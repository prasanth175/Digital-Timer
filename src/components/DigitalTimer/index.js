// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    hour: 25,
    count: '00',
    isStarted: false,
    isBegin: false,
    time: 0,
  }

  onIncrease = () => {
    const {isStarted} = this.state
    if (isStarted === false) {
      this.setState(prev => ({hour: prev.hour + 1}))
    }
  }

  onDecrease = () => {
    const {isStarted} = this.state
    if (isStarted === false) {
      this.setState(prev => ({hour: prev.hour - 1}))
    }
  }

  onReset = () => {
    clearInterval(this.setCount)
    this.setState({
      hour: 25,
      count: '00',
      isBegin: false,
      isStarted: false,
    })
  }

  onStart = () => {
    const {isBegin} = this.state
    if (isBegin) {
      this.setCount = setInterval(this.tick, 1000)
      this.setState(prev => ({isStarted: !prev.isStarted}))
    } else {
      const {hour} = this.state
      const totalTime = hour * 60
      this.setState(prev => ({
        isStarted: !prev.isStarted,
        time: totalTime,
        isBegin: !prev.isBegin,
      }))
      if (totalTime > 0) {
        this.setCount = setInterval(this.tick, 1000)
      }
    }
  }

  tick = () => {
    const {time} = this.state
    if (time === 0) {
      clearInterval(this.setCount)
    }
    const minutes = Math.floor(time / 60)
    let seconds = time % 60

    seconds = seconds < 10 ? `0${seconds}` : seconds

    this.setState(prev => ({
      count: seconds,
      hour: minutes,
      time: prev.time - 1,
    }))
  }

  onPause = () => {
    clearInterval(this.setCount)
    this.setState(prev => ({isStarted: !prev.isStarted}))
  }

  render() {
    const {hour, count, isStarted} = this.state

    return (
      <div className="main">
        <h1>Digital Timer</h1>
        <div className="mid">
          <div className="left">
            <div className="timer">
              <h1 className="setTime">
                {hour}:{count}
              </h1>
              {isStarted ? (
                <p className="setTxt">Running</p>
              ) : (
                <p className="setTxt">Paused</p>
              )}
            </div>
          </div>

          <div className="right">
            <div className="top">
              {isStarted ? (
                <div type="button" className="top-left">
                  <img
                    onClick={this.onPause}
                    className="imgBtn"
                    src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png "
                    alt="pause icon"
                  />
                  <button
                    onClick={this.onPause}
                    type="button"
                    className="txt btn"
                  >
                    Pause
                  </button>
                </div>
              ) : (
                <div type="button" className="top-left">
                  <img
                    onClick={this.onStart}
                    className="imgBtn"
                    src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png "
                    alt="play icon"
                  />
                  <button
                    onClick={this.onStart}
                    type="button"
                    className="txt btn"
                  >
                    Start
                  </button>
                </div>
              )}

              <div className="top-right">
                <img
                  className="imgBtn"
                  onClick={this.onReset}
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
                  alt="reset icon"
                />
                <button
                  onClick={this.onReset}
                  type="button"
                  className="txt btn"
                >
                  Reset
                </button>
              </div>
            </div>
            <p className="limit">Set timer limit</p>
            <div className="controls">
              <button type="button" onClick={this.onDecrease}>
                -
              </button>
              <p className="time">{hour}</p>
              <button type="button" onClick={this.onIncrease}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
