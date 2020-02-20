const isEmpty = require('../empty/isEmpty')

const isEmail = (email) => {
    if(isEmpty(email)) return false
    if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(email) === false) return false
    return true
}

module.exports = isEmail
