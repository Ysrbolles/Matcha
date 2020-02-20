const isAlphaNumeric = (str) => {
  return (/^[A-z0-9]{2,}$/g.test(str))
}
module.exports = isAlphaNumeric
