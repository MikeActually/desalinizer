const { describe, it } = require('mocha')
const chai = require('chai')
const expect = chai.expect
const utility = require('../utility')

const naclcalculator = require('../../src/services/naclcalculator')

describe('NaClCalculator', () => {
  const USERID = 'testUser'
  it('should return true if message is a `!shanejoke`', () => {
    const MSG_CONTENT = '!shanejoke'
    const SHANEJOKE_MSG = utility.getDiscordMsg({ userid: USERID, message: MSG_CONTENT })
    expect(naclcalculator.isShaneJoke(SHANEJOKE_MSG)).to.be.true
  })
  it('should return false if message is not a `!shanejoke`', () => {
    const MSG_CONTENT = 'not a shane joke'
    const NOT_A_SHANEJOKE = utility.getDiscordMsg({ userid: USERID, message: MSG_CONTENT })
    expect(naclcalculator.isShaneJoke(NOT_A_SHANEJOKE)).to.be.false
  })
  it('should return false if message talks about `!shanejoke`', () => {
    const MSG_CONTENT = 'a message about !shanejoke '
    const TALKING_ABOUT_SHANE_JOKE = utility.getDiscordMsg({ userid: USERID, message: MSG_CONTENT })
    expect(naclcalculator.isShaneJoke(TALKING_ABOUT_SHANE_JOKE)).to.be.false
  })
  it('should return true if something is `the worst`', () => {
    const MSG_CONTENT = 'that thing is the worst'
    const THE_WORST_MESSAGE = utility.getDiscordMsg({ userid: USERID, message: MSG_CONTENT })
    expect(naclcalculator.isTheWorst(THE_WORST_MESSAGE)).to.be.true
  })
  it('should return false if nothing is `the worst`', () => {
    const MSG_CONTENT = 'just a normal comment'
    const NOT_THE_WORST_MESSAGE = utility.getDiscordMsg({ userid: USERID, message: MSG_CONTENT })
    expect(naclcalculator.isTheWorst(NOT_THE_WORST_MESSAGE)).to.be.false
  })
  it('should return true comment has a tag and mentions `salty`', () => {
    const MSG_CONTENT = '@SaltyGuy sure is salty right now'
    const SALTY_ACCUSATION = utility.getDiscordMsg({ userid: USERID, message: MSG_CONTENT, usermentions: [{ id: 'saltyGuyId' }] })
    expect(naclcalculator.isSaltyAccusation(SALTY_ACCUSATION)).to.be.true
  })
  it('should return not a salty accusation when just a normal comment', () => {
    const MSG_CONTENT = 'just a normal comment targeted @SaltyGuy'
    const NORMAL_COMMENT = utility.getDiscordMsg({ userid: USERID, message: MSG_CONTENT, usermentions: [{ id: 'saltyGuyId' }] })
    expect(naclcalculator.isSaltyAccusation(NORMAL_COMMENT)).to.be.false
  })
  it('should return not a salty accusation when making an accusation with no tags', () => {
    const MSG_CONTENT = 'that is salty'
    const SALTY_ACCUSATION = utility.getDiscordMsg({ userid: USERID, message: MSG_CONTENT })
    expect(naclcalculator.isSaltyAccusation(SALTY_ACCUSATION)).to.be.false
  })
})
