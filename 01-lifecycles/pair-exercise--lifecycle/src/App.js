import React from 'react';
import ChannelList from './ChannelList'
import ChannelHeader from './ChannelHeader'
import ChannelMessages from './ChannelMessages'
import UserProfile from './UserProfile'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      channels: [],
      selectedUserId: null,
      selectedChannelId: null
    }

    this.selectChannel = this.selectChannel.bind(this)
    this.selectUser = this.selectUser.bind(this)
    this.deselectUser = this.deselectUser.bind(this)
  }

  async fetchChannelList() {
    const response = await fetch('http://localhost:3001/channels')
    const channels = await response.json()
    this.setState({
      channels,
      selectedChannelId: this.state.selectedChannelId || channels[0].id
    })
  }

  getSelectedChannel() {
    if (!this.state.selectedChannelId) {
      return null
    }
    return this.state.channels.find(channel => channel.id === this.state.selectedChannelId)
  }

  selectChannel(channelId) {
    this.deselectUser()
    this.setState({ selectedChannelId: channelId })
  }

  selectUser(userId) {
    this.setState({ selectedUserId: userId })
  }

  deselectUser() {
    this.setState({ selectedUserId: null })
  }

  render() {

    return (
      <div className="container-fluid" style={{ marginTop: "2em"}}>
        <div className="row">
          <div className="col col-md-4">
            <p className="logo">
              <img src="avatars/dog2.png" alt="Logo"/>
              PetFeed
            </p>
            <ChannelList
             channels={this.state.channels}
             selectedChannelId={this.state.selectedChannelId}
             onSelect={this.selectChannel}
            />
          </div>
          <div className="col col-md-8">
            { this.state.selectedUserId
              ? <UserProfile userId={this.state.selectedUserId} onClose={this.deselectUser} />

              :this.state.selectedChannelId
              ? <>
                 <ChannelHeader channel={this.getSelectedChannel()} />
                 <ChannelMessages channelId={this.state.selectedChannelId} onUserSelect={this.selectUser} />
               </>

              :null
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
