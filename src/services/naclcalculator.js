exports.isShaneJoke = (discordmessage) => {
  const SHANEJOKE_FORMAT = /^!shanejoke/gi
  return SHANEJOKE_FORMAT.test(discordmessage.getContent())
}
exports.isTheWorst = (discordmessage) => {
  const THE_WORST_COMMENT = /the worst/gi
  return THE_WORST_COMMENT.test(discordmessage.getContent())
}

exports.isSaltyAccusation = (discordmessage) => {
  const SALTY_ACCUSATION = /is salty/gi
  return discordmessage.getUserMentions().length > 0 && SALTY_ACCUSATION.test(discordmessage.getContent())
}
