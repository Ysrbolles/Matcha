const jwt = require('jsonwebtoken')
const Database = require('./Database')
const { isEmpty } = require('../outils')
const { JWT } = require('../config/config')
const { JSON_WEB_TOKEN } = require('../config/const')


class JsonWebToken {
  constructor() {
    this.token = ''
  }

  check(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'ABFA422265CE21265CDECF71CD8DF', (err, data) => {
          if (err)
            reject(err)
          resolve(data)
        })
    })
  }

  refresh(token) {
    let data
    return new Promise((resolve, reject) => {
      this.check(token)
        .then((tokenData) => {
          data = tokenData
          this.delete(token)
        })
        .then(() => this.create(data))
        .then(() => resolve(this.token))
        .catch(err => reject(err))
    })
  }

  create(data) {
    return new Promise((resolve, reject) => {
      jwt.sign({data: data},'ABFA422265CE21265CDECF71CD8DF', (err, token) => {
        if (!isEmpty(err)) return reject(err)
        //this.token = token
        return resolve(token)
      })
    })
  }

  delete(token) {
    const database = new Database()
    return new Promise((resolve, reject) => {
      database.query(JSON_WEB_TOKEN.ADD_BLACKLIST, [token])
        .then(() => {
          this.token = ''
          return resolve()
        })
        .catch(err => reject(err))
    })
  }
}

module.exports = JsonWebToken
