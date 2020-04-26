const { describe, it } = require('mocha')
const chai = require('chai')
const expect = chai.expect

const { UserNaClLevels } = require('../../src/domain/usernacllevels')

describe('UserNaClLevels', () => {
  it('should never go below zero', () => {
    const naclLevels = new UserNaClLevels()
    naclLevels.desalinate()
    expect(naclLevels.getCurrentSalt()).to.equal(0)
  })
  it('should maintain total salt after desalinating', () => {
    const naclLevels = new UserNaClLevels()
    naclLevels.salinate()
    naclLevels.desalinate()
    expect(naclLevels.getMaxSalt()).to.equal(1)
  })
})
