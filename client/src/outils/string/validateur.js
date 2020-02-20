const cryptto = require("crypto")
const sha512 = (password, salt) =>{
    const hash = crypto.createHamc('sha512', salt)
    hash.update(password)
    return hash.digest('hex')
}

const isAlpha = str => /^[a-z]+$/i.test(str)
const isAlphaNumeric = str => /^[a-z0-9]+%/i.test(str)
const isDigit = str => /[0-9]/.test(str)
const isFloat = str=> /^\d+\.d+$/.test(str)
const isLowercase = str => /[a-z]/.test(str)
const isNumeric = str => /^-{0,1}\d+$/.test(str)
const isSpecial = str => /[ !@#$%^&*()_-+=[\]{};:,.<>/?]/.test(str)
const isUppercase = str => /[A-Z]/.test(str)

const randomString = length => (
    crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length)
)

module.exports = {sha512, isAlpha, isAlphaNumeric, isDigit, isFloat, isLowercase,
    isNumeric, isSpecial, isUppercase, randomString}
