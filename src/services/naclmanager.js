const naclCalculator = require('./naclcalculator')
const { UserNaClLevels } = require('../domain/usernacllevels')

const SALT_MINE = {}

const getSaltStashForUser = (userId) => {
  if (!Object.keys(SALT_MINE).includes(userId)) {
    SALT_MINE[userId] = new UserNaClLevels()
  }
  return SALT_MINE[userId]
}
exports.getSaltStashForUser = getSaltStashForUser

exports.processCommentForSalt = (props) => {
  const { discordmsg, USERS } = props
  if (naclCalculator.isShaneJoke(discordmsg)) {
    getSaltStashForUser(USERS.SHANEJOKEUSER).salinate()
    getSaltStashForUser(discordmsg.getAuthorId()).salinate()
    return undefined
  }
  if (naclCalculator.isTheWorst(discordmsg)) {
    getSaltStashForUser(discordmsg.getAuthorId()).salinate()
  }
  if (naclCalculator.isSaltyAccusation(discordmsg)) {
    discordmsg.getUserMentions().forEach(saltyTarget => {
      getSaltStashForUser(saltyTarget).salinate()
    })
  }
}
