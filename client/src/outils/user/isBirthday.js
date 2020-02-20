const isDate = (str) => {
  return (/^\d{4}[//-]\d{2}[//-]\d{2}$/g.test(str))
}
module.exports = isDate
