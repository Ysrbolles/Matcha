const isEmpty = require('../empty/isEmpty')
const isAlphaNumeric = require('../string/isAlphaNumeric')

const  isUsername = (username) => {
    if(isEmpty(username)) return false
    if(username.length < 4 || username.length > 20) return false
    if(!isAlphaNumeric(username)) return false
    return true
}

module.exports = isUsername
