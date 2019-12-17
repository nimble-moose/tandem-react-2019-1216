import React from 'react'
import UserContext from './UserContext'

export default class ProfilePage extends React.Component {

  static contextType = UserContext

  render() {
    return (
      <div>
        <p>Heyo, {this.context || 'Guest'}!</p>
      </div>
    )
  }
}
