
const { UserMessageLog } = require('../domain/usermessagelog')

const UserActivityServiceClass = class {
  constructor () {
    this.userhistory = {}
  }

  log (discordmessage) {
    const messageuser = discordmessage.getAuthorId()
    if (!Object.keys(this.userhistory).includes(messageuser)) {
      this.userhistory[messageuser] = new UserMessageLog()
    }
    this.userhistory[messageuser].logmessage(discordmessage)
  }

  getInfoFor (userid) {
    if (Object.keys(this.userhistory).includes(userid)) {
      return this.userhistory[userid]
    }
  }

  pruneUser (userid) {
    const userInfo = this.getInfoFor(userid)
    if (userInfo) {
      userInfo.reduce()
    }
  }

  isChattyCathy (userid) {
    this.pruneUser(userid)
    const userInfo = this.getInfoFor(userid)
    if (userInfo) {
      const hoursSinceStart = ((new Date()).getTime() - userInfo.getInitialTime().getTime()) / 1000 / 60 / 60
      const messagesPerHourAvg = userInfo.getAllTimeCount() / hoursSinceStart
      const messagesInLastHour = userInfo.getMessagesInLastHour()
      return messagesInLastHour !== 0 && messagesInLastHour >= messagesPerHourAvg
    }
    return false
  }
}

exports.UserActivityService = class UserActivityServiceSingleton {
  constructor () {
    if (!UserActivityServiceSingleton.instance) {
      UserActivityServiceSingleton.instance = new UserActivityServiceClass()
    }
  }

  get () {
    return UserActivityServiceSingleton.instance
  }
}
