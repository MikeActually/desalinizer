const { UserMessageHistory } = require('./usermessagehistory')

exports.UserMessageLog = class {
  constructor () {
    this.messageinfo = []
    this.total = 0
  }

  logmessage (message) {
    const newmessage = new UserMessageHistory(message)
    this.messageinfo.push(newmessage)
    if (this.total === 0) {
      this.initialtimestamp = newmessage.getTimestamp()
    }
    this.total += 1
  }

  getInitialTime () {
    return this.initialtimestamp
  }

  getAllTimeCount () {
    return this.total
  }

  getlogsize () {
    return this.messageinfo.length
  }

  reduce () {
    this.messageinfo = this.messageinfo.filter((log) => {
      const difference = (new Date()).getTime() - log.getTimestamp().getTime()
      const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24)
      return daysDifference < 1
    })
  }

  getMessagesInLastHour () {
    return this.messageinfo.filter((message) => {
      const difference = (new Date()).getTime() - message.getTimestamp().getTime()
      return Math.floor(difference / 1000 / 60 / 60) < 1
    }).length
  }
}
