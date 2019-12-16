import React from 'react'

export default class Win extends React.Component {
  constructor(props) {
    console.log('Win constructor')
    super(props)
  }

  componentDidMount() {
    console.log('Win componentDidMount')
  }

  componentWillUnmount() {
    console.log('Win componentWillUnmount')
  }

  render() {
    return <>
      <p>You won!</p>
      <button onClick={this.props.onClick}>Reset</button>
    </>
  }
}
