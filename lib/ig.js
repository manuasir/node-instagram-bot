
const fs = require('fs')

class Ig {

  constructor(thirdLib) {
    this.client = thirdLib
    this.followers = []
    this.followings = []
  }

  getFollowers() {
    return this.followers
  }

  getFollowings() {
    return this.followings
  }

  /** Load followers and followings from a JSON file */
  loadDataFromFile() {
    try {
      this.followers = JSON.parse(fs.readFileSync('./data/followers.json'))
      this.followings = JSON.parse(fs.readFileSync('./data/followings.json'))
    } catch (error) {
      throw new Error(error.message)
    }
  }

  /** Store followers and followings into a json file */
  async storeData() {
    try {
      fs.writeFileSync('./data/followers.json', JSON.stringify(this.followers))
      fs.writeFileSync('./data/followings.json', JSON.stringify(this.followings))
      return true
    } catch (error) {
      throw new Error(error.message)
    }
  }


  async login() {
    return await this.client.login()
  }

  /**
   * Get ID from an username
   * @param {string} username
   **/
  async getUserId(username) {
    try {
      const theUser = await this.client.getUserByUsername({ username: username })
      return theUser.id
    } catch (error) {
      throw new Error(error)
    }
  }

  snooze(ms) { return new Promise(resolve => setTimeout(resolve, ms)) }


  /**
   * getAllFollowes
   * @param {string} userId
   * @returns {Promise}
   * @memberof Ig
   * @static
   * @private
   */
  async getAllFollowers(userId) {
    try {
      console.log('Getting followers...')
      let nextPage = true
      let result = []
      let after = null
      while (nextPage) {
        const followers = await this.client.getFollowers({ userId: userId, first: 50, after: after })
        console.log(followers)
        after = (followers.page_info.end_cursor !== '') ? followers.page_info.end_cursor : null
        nextPage = followers.page_info.has_next_page
        result = result.concat(followers.data)
        await this.snooze(1500)
      }
      this.followers = result
      return result
    } catch (error) {
      throw new Error(error.message)
    }
  }


  /**
   * getAllFollowes
   * @param {string} userId
   * @returns {Promise}
   * @memberof Ig
   * @static
   * @private
   */
  async getAllFollowings(userId) {
    try {
      console.log('Getting followings...')
      let nextPage = true
      let result = []
      let after = null
      while (nextPage) {
        const followings = await this.client.getFollowings({ userId: userId, first: 50, after: after })
        after = (followings.page_info.end_cursor !== '') ? followings.page_info.end_cursor : null
        nextPage = followings.page_info.has_next_page
        result = result.concat(followings.data)
        await this.snooze(1500)
      }
      this.followings = result
      return result
    } catch (error) {
      throw new Error(error.message)
    }
  }

}


module.exports = Ig