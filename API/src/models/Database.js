const mysql = require('mysql')
const { DATABASE } = require('../config/config')

class Database {
  constructor() {
    this.credentials = {
      host: DATABASE.HOST,
      user: DATABASE.USER,
      password: DATABASE.PASS,
      database: DATABASE.NAME,
      charset : 'utf8mb4_bin'
    }
    this.connection = this.createConnection()
  }

  createConnection() {
    return mysql.createConnection(this.credentials)
  }

  queries(sql, args) {
    if (this.connection === null) this.connection = this.createConnection()
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, async (err, rows) => {
        if (err) return reject(err)
        return resolve(rows)
      })
    })
  }

  query(sql, args) {
    if (this.connection === null) this.connection = this.createConnection()
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, async (err, rows) => {
        try{
          await this.close();
        }
        catch{
        if (err) return console.log()
      }
        return resolve(rows)

      })
    })
  }

  close() {
    return new Promise((resolve, reject) => {
      this.connection.end((err) => {
        this.connection = null
        if (err) return reject('err')
        return resolve()
      })
    })
  }
}

module.exports = Database
