exports.DiscordMessage = class {
  constructor (originalMsg) {
    this.authorId = originalMsg.author.id
    this.timestamp = originalMsg.timestamp
    this.content = originalMsg.content
    this.userMentionIds = originalMsg.mentions.users.map(user => user.id)
  }

  getAuthorId () {
    return this.authorId
  }

  getTimeStamp () {
    return this.timestamp
  }

  getContent () {
    return this.content
  }

  getUserMentions () {
    return this.userMentionIds
  }
}
