const { DiscordMessage } = require('../../src/domain/discordmessage')

exports.getmessage = (props) => {
  const { userid, message, usermentions } = props
  const discordFake = {
    author: {
      id: userid
    },
    timestamp: new Date(),
    content: message,
    mentions: {
      users: usermentions || []
    }
  }
  return new DiscordMessage(discordFake)
}
