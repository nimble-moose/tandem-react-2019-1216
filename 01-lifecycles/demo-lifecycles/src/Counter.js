import React from 'react'

export default class Counter extends React.Component {

  constructor(props) {
    console.log('Counter constructor')
    super(props)
  }

  componentDidMount() {
    console.log('Counter componentDidMount')
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Counter componentDidUpdate', prevProps, prevState)
  }

  componentWillUnmount() {
    console.log('Counter componentWillUnmount')
  }

  render () {
    console.log('Counter render')
    const { count, onClick } = this.props
    const timeText = count === 1 ? 'time' : 'times'
    return <div>
      <p>You clicked {count} {timeText}</p>
      <button onClick={onClick}>Click Me</button>
    </div>
  }
}
