const { describe, it } = require('mocha')
const chai = require('chai')
const expect = chai.expect
const utility = require('../utility')
const { UserActivityService } = require('../../src/services/useractivity')
const userActivityService = new UserActivityService().get()

describe('UserActivityService', () => {
  it('should log date of first message', () => {
    const userid = 'someuser'
    const firstmsg = utility.getDiscordMsg({ userid })
    userActivityService.log(firstmsg)
    let userdata = userActivityService.getInfoFor(userid)
    expect(userdata.getInitialTime()).to.equal(firstmsg.timestamp)
    expect(userdata.getAllTimeCount()).to.eql(1)
    userActivityService.log(utility.getDiscordMsg({ userid }))
    userdata = userActivityService.getInfoFor(userid)
    expect(userdata.getInitialTime()).to.equal(firstmsg.timestamp)
    expect(userdata.getAllTimeCount()).to.eql(2)
  })
  it('should return true if user is chattier right now', () => {
    const userid = 'chattyCathy'
    const message = utility.getDiscordMsg({ userid })
    message.timestamp = new Date((message.getTimeStamp().getTime() - (1000 * 60 * 60 * 4)))
    userActivityService.log(message)
    message.timestamp = new Date((message.getTimeStamp().getTime() - (1000 * 60 * 60 * 3)))
    userActivityService.log(message)
    message.timestamp = new Date((message.getTimeStamp().getTime() - (1000 * 60 * 60 * 2)))
    userActivityService.log(message)
    message.timestamp = new Date((message.getTimeStamp().getTime() - (1000 * 60 * 60)))
    userActivityService.log(message)
    message.timestamp = new Date()
    userActivityService.log(message)
    userActivityService.log(message)
    expect(userActivityService.isChattyCathy(userid)).to.be.true
  })
  it('should return false for a non chatty person', () => {
    const userid = 'notTooChatty'
    const message = utility.getDiscordMsg({ userid })
    message.timestamp = new Date((message.getTimeStamp().getTime() - (1000 * 60 * 60 * 2)))
    userActivityService.log(message)
    userActivityService.log(message)
    message.timestamp = new Date()
    userActivityService.log(message)
    expect(userActivityService.isChattyCathy(userid)).to.be.false
  })
  it('should return false when asking if a make believe person is too chatty', () => {
    const userid = 'pretend'
    expect(userActivityService.isChattyCathy(userid)).to.be.false
  })
  it('should persist user information across multiple instances', () => {
    const userid = 'singletone'
    userActivityService.log(utility.getDiscordMsg({ userid }))
    const newUserActivityService = new UserActivityService().get()
    expect(newUserActivityService.getInfoFor(userid).getAllTimeCount()).to.equal(1)
  })
})
