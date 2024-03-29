import React from 'react'
import Message from './Message'

import { subscribe } from './subscriptions'

// const subscription = subscribe(channelId)
// subscription.on('message', (msg) => ...do something ))

export default class ChannelMessages extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: [],
    }

    this.appendMessage = this.appendMessage.bind(this)
    this.windowRef = React.createRef()
  }

  async componentDidMount() {
    await this.fetchChannel()
    this.subscription = subscribe(this.props.channelId)
    this.subscription.on('message', this.appendMessage)
  }

  getSnapshotBeforeUpdate() {
    return this.windowRef.current
      ? this.windowRef.current.scrollHeight
      : 0
  }

  async componentDidUpdate(prevProps, prevState, prevHeight) {
    console.log('componentDidUpdate', prevHeight)
    if (prevProps.channelId !== this.props.channelId) {
      await this.fetchChannel()
      this.subscription.off('message', this.appendMessage)
      this.subscription = subscribe(this.props.channelId)
      this.subscription.on('message', this.appendMessage)
    }

    if (prevState.messages.length < this.state.messages.length) {

      const list = this.windowRef.current
      const scrolledUp = list.scrollTop < (prevHeight - list.clientHeight)

      if (!scrolledUp) {
        this.scrollToBottom()
      }
    }
  }

  async componentWillUnmount() {
    this.subscription.off('message', this.appendMessage)
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


  scrollToBottom() {
    const list = this.windowRef.current
    list.scrollTop = list.scrollHeight
  }

  render () {
    const { messages } = this.state
    if (!messages || !messages.length)
      return <p>Loading...</p>

    return (
      <div id="channel_messages" ref={this.windowRef}>
        {messages.map(message => <Message key={message.id} message={message} onUserSelect={this.props.onUserSelect} />)}
      </div>
    )
  }
}
