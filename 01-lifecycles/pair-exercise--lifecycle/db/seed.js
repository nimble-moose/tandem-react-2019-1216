const _ = require('lodash')
const fs = require('fs')
const faker = require("faker")
faker.seed(230498230)

console.log('Generating Data...')
const channels = [
  { id: 1, name: "Dogs" },
  { id: 2, name: "Cats" },
  { id: 3, name: "Rabbits" },
]

const dogUsers = [
  { id: 1, name: "Rex", avatar: "dog1.png", bio: faker.lorem.paragraphs(3) },
  { id: 2, name: "Fido", avatar: "dog2.png", bio: faker.lorem.paragraphs(3) },
  { id: 3, name: "Bruce", avatar: "dog3.png", bio: faker.lorem.paragraphs(3) },
]

const catUsers = [
  { id: 4, name: "Mr. Snuffles", avatar: "cat1.png", bio: faker.lorem.paragraphs(3)},
  { id: 5, name: "Eddie", avatar: "cat2.png", bio: faker.lorem.paragraphs(3)},
  { id: 6, name: "Zeke", avatar: "cat3.png", bio: faker.lorem.paragraphs(3)},
]

const rabbitUsers = [
  { id: 7, name: "Bunny Bunny Bo Bunny", avatar: "rabbit1.png", bio: faker.lorem.paragraphs(3)},
  { id: 8, name: "Robby Rabbit", avatar: "rabbit2.png", bio: faker.lorem.paragraphs(3)},
  { id: 9, name: "Other Bunny", avatar: "rabbit3.png", bio: faker.lorem.paragraphs(3)},
]




const messages = Array(9).fill('').map((x, idx) => {
  const channel = channels[idx % 3]
  const users = channel.name === "Cats" ? catUsers
              : channel.name === "Dogs" ? dogUsers
              : rabbitUsers
  const user = faker.random.arrayElement(users)
  return {
    id: idx + 1,
    text: faker.lorem.sentence(),
    channelId: channel.id,
    userId: user.id
  }
})

const data = {
  channels,
  messages,
  users: _.flatten([dogUsers, catUsers, rabbitUsers])
}

console.log('Writing data to db/data.json...')
fs.writeFileSync(`${__dirname}/data.json`, JSON.stringify(data, null, 2))
console.log('done')
