const isNumeric = require('../string/isNumeric')
const isFloat = require('../string/isFloat')

const isLongitude = longitude => ((isNumeric(longitude) || isFloat(longitude)) && longitude >= -180 && longitude <= 180)

module.exports = isLongitude
