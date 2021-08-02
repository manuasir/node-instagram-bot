const Instagram = require('instagram-web-api')
const Core = require('./lib/ig')
const Insta = require('./lib/app')
const fs = require('fs')
const { username, password } = process.env


const load = async () => {
  try {
    const client = new Instagram({ username, password })
    await client.login()
    const core = new Core(client)

    const insta = new Insta(core)

    await insta.initData('mnml_s')
    fs.writeFileSync('./data/people-who-dont-follow-me.json', JSON.stringify(insta.getPeopleWhoDontFollowMe(),null,2))
  } catch (error) {
    console.error(error)
  }

}

load()


