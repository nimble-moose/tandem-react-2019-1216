import EventEmitter from 'events'
import faker from 'faker'
faker.seed(9048)

class Subscription extends EventEmitter {
  constructor(channelId) {
    super()
    this.channelId = channelId

    this.postMessage = this.postMessage.bind(this)
    this.timer = setInterval(this.postMessage, 5000)
  }

  async postMessage() {
    const message = createMessage(this.channelId)
    const url = 'http://localhost:3001/messages'
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    })
    const newMessage = await response.json()
    const msgResponse = await fetch(`http://localhost:3001/messages/${newMessage.id}?_expand=user`)
    const msgWithUser = await msgResponse.json()
    this.emit('message', msgWithUser)
  }

  cancel() {
    clearInterval(this.timer)
  }
}


const subscriptions = {}
;([ 1, 2, 3]).forEach((channelId) => {
  const channelPath = `channels/${channelId}`
  subscriptions[channelPath] = new Subscription(channelId)
})

export const subscribe = (channelId) => subscriptions[`channels/${channelId}`]



function createMessage(channelId) {
  const userId = faker.random.number({
    min: ((channelId - 1) * 3) + 1,
    max: channelId * 3
  })
  return {
    text: faker.lorem.sentence(),
    channelId: channelId,
    userId: userId
  }

}
