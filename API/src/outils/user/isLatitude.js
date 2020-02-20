const isNumeric = require('../string/isNumeric')
const isFloat = require('../string/isFloat')

const isLatitude = latitude => (
 latitude >= -90 && latitude <= 90)


module.exports = isLatitude
