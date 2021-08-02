
class Insta {

  constructor(instaLib) {
    this.insta = instaLib
  }

  async initData(username) {
    try {
      const id = await this.insta.getUserId(username)
      await this.insta.getAllFollowers(id)
      await this.insta.getAllFollowings(id)
      this.insta.storeData()
    } catch (error) {
      throw new Error(error.message)
    }
  }


  getPeopleWhoDontFollowMe() {
    this.insta.loadDataFromFile()
    return this.insta.getFollowings().map(item => item.username).filter(x => !this.insta.getFollowers().map(item => item.username).includes(x))
  }


}

module.exports = Insta