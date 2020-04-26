const { beforeEach, describe, it } = require('mocha')
const chai = require('chai')
const expect = chai.expect
const utility = require('../utility')

const naclManager = require('../../src/services/naclmanager')

describe('NaClManager', () => {
  const SHANEJOKEID = 'shaneUser'
  const SALTYUSERID = 'saltyGuy'
  const USERS = {
    SHANEJOKEUSER: SHANEJOKEID
  }
  let startingSaltyGuySalt, startingShaneSalt
  beforeEach(() => {
    startingShaneSalt = naclManager.getSaltStashForUser(SHANEJOKEID).getCurrentSalt()
    startingSaltyGuySalt = naclManager.getSaltStashForUser(SALTYUSERID).getCurrentSalt()
  })
  it('should distribute salt if `!shanejoke`', () => {
    const message = '!shanejoke'
    const shaneJokeMsg = utility.getDiscordMsg({ userid: SALTYUSERID, message })

    naclManager.processCommentForSalt({ discordmsg: shaneJokeMsg, USERS })

    expect(naclManager.getSaltStashForUser(SHANEJOKEID).getCurrentSalt()).to.equal(1)
    expect(naclManager.getSaltStashForUser(SALTYUSERID).getCurrentSalt()).to.equal(1)
  })
  it('should distribute salt if `this is the worst`', () => {
    const message = 'this is the worst'
    const theWorstMsg = utility.getDiscordMsg({ userid: SALTYUSERID, message })

    naclManager.processCommentForSalt({ discordmsg: theWorstMsg, USERS })

    expect(naclManager.getSaltStashForUser(SHANEJOKEID).getCurrentSalt()).to.equal(startingShaneSalt)
    expect(naclManager.getSaltStashForUser(SALTYUSERID).getCurrentSalt()).to.equal(startingSaltyGuySalt + 1)
  })
  it('should distribute no salt if just a normal comment', () => {
    const message = 'just talking about sports'
    const normalComment = utility.getDiscordMsg({ userid: SALTYUSERID, message })

    naclManager.processCommentForSalt({ discordmsg: normalComment, USERS })

    expect(naclManager.getSaltStashForUser(SHANEJOKEID).getCurrentSalt()).to.equal(startingShaneSalt)
    expect(naclManager.getSaltStashForUser(SALTYUSERID).getCurrentSalt()).to.equal(startingSaltyGuySalt)
  })
  it('should distribute salty to the tagged person if making a salty accusation', () => {
    const message = '@SaltyGuy sure is salty right now'
    const normalComment = utility.getDiscordMsg({ userid: SHANEJOKEID, message, usermentions: [{ id: SALTYUSERID }] })

    naclManager.processCommentForSalt({ discordmsg: normalComment, USERS })

    expect(naclManager.getSaltStashForUser(SHANEJOKEID).getCurrentSalt()).to.equal(startingShaneSalt)
    expect(naclManager.getSaltStashForUser(SALTYUSERID).getCurrentSalt()).to.equal(startingSaltyGuySalt + 1)
  })
})
