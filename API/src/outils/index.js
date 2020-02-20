const isEmpty = require("./empty/isEmpty")


const isDigit = require("./string/isDigit")
const hash = require("./string/hash")
const isLowercase = require("./string/isLowercase")
const isUppercase = require("./string/isUppercase")
const isSpecial = require("./string/isSpecial")
const isAlpha = require("./string/isAlpha")
const isAlphaNumeric =  require("./string/isAlphaNumeric")
const isNumeric = require("./string/isNumeric")
const isFloat = require("./string/isFloat")
const random = require("./string/random")

const isUsername = require("./user/isUsername")
const isEmail = require("./user/isEmail")
const isbirthday = require("./user/isBirthday")
const age = require("./user/AgeFromDate")
const isFirstname = require("./user/isFirstname")
const isLastname = require("./user/isLastname")
const isPassword = require("./user/isPassword")
const isProfileComplet = require("./user/isProfileComplet")
const AgeFromDate = require('./user/AgeFromDate');
const dynamicSort = require("../outils/string/dynamicSort")
const usergetDistance = require("./user/distance")
const Cmninterests = require('./user/CmnTags')
const MatchingFilter = require('./user/MatchFilter')
const isLongitude = require('./user/isLongitude')
const isLatitude = require('./user/isLatitude')
const isTags = require('./user/isTags')
const isBirthday = require('./user/isBirthday')
const isImage = require('./user/isImage')

module.exports = {
    isEmpty, isDigit, hash, isLowercase, isUppercase, isSpecial,
    isAlpha, isAlphaNumeric, isNumeric, isFloat, random, isUsername,
    isEmail, isbirthday, age, isFirstname, isLastname, isPassword,
    isProfileComplet, AgeFromDate,isProfileComplet, dynamicSort,usergetDistance,Cmninterests,
    MatchingFilter, isLongitude, isLatitude, isTags, isBirthday, isImage
}
