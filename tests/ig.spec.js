const Insta = require('../lib/ig')
const Instagram = require('instagram-web-api')
const { beforeAll } = require('@jest/globals')
const { username, password } = process.env

const client = new Instagram({ username, password })
const insta = new Insta(client)

jest.setTimeout(60000)

describe('getAllFollowers', () => {

  describe('Basic functions', () => {
    // execute before each test
    let resultFollowers = 0
    let resultFollowings = 0
    let id = 0
    beforeAll(async () => {
      await insta.login()
    })
  })
})