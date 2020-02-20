const isEmpty = require('../empty/isEmpty')

const isTags = (tags) => {
    if(isEmpty(tags)) return false
    for(let i = 0; i < tags.length; i++){
      if (!/(^\#\w+)/g.test(tags[i])) return false
      if(tags[i].length > 20) return false
    }
    return true
}

module.exports = isTags
