exports.UserNaClLevels = class {
  constructor () {
    this.maxsalt = 0
    this.currentsalt = 0
    this.lastdaily = new Date()
  }

  desalinate () {
    if (this.currentsalt > 0) {
      this.currentsalt--
    }
  }

  salinate () {
    this.maxsalt++
    this.currentsalt++
  }

  getCurrentSalt () {
    return this.currentsalt
  }

  getMaxSalt () {
    return this.maxsalt
  }
}
