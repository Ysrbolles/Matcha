const isSpecial = str => /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(str)
module.exports = isSpecial
