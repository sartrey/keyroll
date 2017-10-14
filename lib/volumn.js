'use strict'

const fs = require('fs')
const path = require('path')

class Volumn {
  constructor() {
    this.entries = []
    this.change = 0
    this.file = ''
  }

  access(uuid, value) {
  }

  create() {
  }

  delete() {
  }

  filter(tags) {
  }

  reload(file, code) {
    this.file = file
    return new Promise((resolve, reject) => {
      var stream = fs.createReadStream(file)
      stream.on('data', function () {

      })
      stream.on('finish', function () {

      })
    })
  }

  commit(code) {
    return new Promise((resolve, reject) => {
      var stream = fs.createWriteStream(file)

    })
  }
}

module.exports = Volumn
