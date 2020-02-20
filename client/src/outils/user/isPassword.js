const isEmpty = require('../empty/isEmpty')
const isDigit = require('../string/isDigit')
const isSpecial = require('../string/isSpecial')
const isLowercase = require('../string/isLowercase')
const isUppercase = require('../string/isUppercase')

const isPassword = (password, cpassword) => {
    if(isEmpty(password)) return false
    if(password.length < 8) return false
    if(!(isDigit(password) && isSpecial(password) && isLowercase(password) && isUppercase(password))) return false
    if(!isEmpty(cpassword) && cpassword !== password) return false
    return true
}

module.exports = isPassword
