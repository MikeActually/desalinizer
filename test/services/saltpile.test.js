const { describe, it } = require('mocha')
const chai = require('chai')
const expect = chai.expect

const saltpile = require('../../src/services/saltpile')

describe('SaltPile', () => {
  it('should build a perfect pile', () => {
    const expectedmound = [
      '    . ',
      '   . . ',
      '  . . . ',
      ' . . . . ',
      '. . . . . '
    ]
    expect(saltpile.build(15)).to.eql(expectedmound)
  })
  it('should build a small pile based on total salinity', () => {
    const expectedmound = [
      ' . ',
      '. . '
    ]
    expect(saltpile.build(3)).to.eql(expectedmound)
  })
  it('should build a small offset pile based on total salinity', () => {
    const expectedmound = [undefined,
      ' . ',
      '. . . '
    ]
    expect(saltpile.build(4)).to.eql(expectedmound)
  })
  it('should build a medium offset pile based on total salinity', () => {
    const expectedmound = [undefined,
      '   . ',
      '  . . ',
      ' . . . . ',
      '. . . . . '
    ]
    expect(saltpile.build(12)).to.eql(expectedmound)
  })
})
