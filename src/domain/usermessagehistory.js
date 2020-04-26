
exports.UserMessageHistory = class {
  constructor (discordmessage) {
    this.timestamp = discordmessage.getTimeStamp()
  }

  getTimestamp () {
    return this.timestamp
  }
}
