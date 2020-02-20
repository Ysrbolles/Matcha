const isEmpty = require('../empty/isEmpty')
const isAlpha = require('../string/isAlpha')

const isFirstname = (firstname) => {
    if(isEmpty(firstname)) return false;
    if(firstname.length > 15) return false
    if(!isAlpha(firstname)) return false
    return true
}

module.exports = isFirstname
