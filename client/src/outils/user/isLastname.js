const isEmpty = require('../empty/isEmpty')
const isAlpha = require('../string/isAlpha')

const isLastname = (lastname) => {
    if(isEmpty(lastname)) return false
    if(lastname.length < 1 || lastname.length > 50) return false
    if(!isAlpha(lastname)) return false
    return true
}

module.exports = isLastname
