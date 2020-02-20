const isNumeric = require('../string/isNumeric')
const isFloat = require('../string/isFloat')

const isLatitude = latitude => ((isNumeric(latitude) || isFloat(latitude))
&& latitude >= -90 && latitude <= 90)


module.exports = isLatitude
