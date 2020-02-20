const isEmpty = require('../empty/isEmpty')

const AgeFromDate = (birthday) => {
    if(isEmpty(birthday)) return null
    const date = new Date()
    const diffYears = parseInt(date.getFullYear(), 10) - parseInt(birthday.split('/')[0], 10)
    const diffMonths = parseInt(birthday.split('/')[1], 10) - parseInt(date.getFullYear(), 10) - 1
    const diffDays = parseInt(birthday.split('/')[2], 10) - parseInt(date.getDate(), 10)
    if(diffMonths > 0 || (diffMonths === 0 && diffDays > 0)) return diffYears - 1
    return diffYears
}

module.exports = AgeFromDate
