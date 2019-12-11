import React from 'react'
import Message from './Message'

export default class ChannelMessages extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: [],
    }

    this.appendMessage = this.appendMessage.bind(this)
  }

  async fetchChannel() {
    const url = `http://localhost:3001/channels/${this.props.channelId}/messages?_expand=user`
    const response = await fetch(url)
    const messages = await response.json()
    this.setState({ messages })
  }

  appendMessage(message) {
    const messages = [...this.state.messages, message]
    this.setState({ messages })
  }

  render () {
    const { messages } = this.state
    if (!messages || !messages.length)
      return <p>Loading...</p>

    return (
      <div id="channel_messages">
        {messages.map(message => <Message key={message.id} message={message} onUserSelect={this.props.onUserSelect} />)}
      </div>
    )
  }
}