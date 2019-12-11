import React from 'react'

export default class UserProfile extends React.Component {

  constructor(props) {
    super(props)
    this.state = { user: null }
  }

  async fetchUser() {
    const response = await fetch(`http://localhost:3001/users/${this.props.userId}`)
    const user = await response.json()
    this.setState({ user })
  }

  render() {
    if (!this.state.user) {
      return null
    }

    const { user } = this.state
    return (
      <div id='user_profile'>

        <p className="text-right">
          <button className="btn btn-default" onClick={this.props.onClose}>Close</button>
        </p>
        <div className="row">
          <div className="col-md-3">
            <img src={`avatars/${user.avatar}`} alt={user.name} className="user_profile--avatar"/>
          </div>
          <div className="col-md-8">
            <h1 className="user_profile--name">@{user.name}</h1>
            <p className='user_profile--bio'>{user.bio}</p>
          </div>
        </div>
      </div>
    )
  }
}
