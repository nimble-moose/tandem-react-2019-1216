import React from 'react'
import Counter from './Counter'
import Win from './Win'

export default class Game extends React.Component {

  constructor(props) {
    console.log('Game constructor')
    super(props)
    this.state = { count: 0 }

    this.incrementCount = this.incrementCount.bind(this)
    this.reset = this.reset.bind(this)
  }

  componentDidMount() {
    console.log('Game componentDidMount')
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Game componentDidUpdate', prevProps, prevState)
  }

  reset() {
    this.setState({ count: 0 })
  }

  incrementCount() {
    console.log('-----')
    this.setState(state => ({
      count: state.count+1
    }))
  }

  render() {
    console.log('Game render')
    return (this.state.count >= 5)
    ? <Win onClick={this.reset} />
    : <Counter count={this.state.count} onClick={this.incrementCount} />
  }
}
