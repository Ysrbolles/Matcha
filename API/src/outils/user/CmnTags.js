const isEmpty = require('../empty/isEmpty')

const Cmninterests = (user1, user2) => {
  let n = 0
  if (!isEmpty(user1.interests) && !isEmpty(user2.interests)) {
    user1.interests.forEach((interest) => {
      if (user2.interests.includes(interest)) {
        n += 1
      }
    })
  }
  return n
}

module.exports = Cmninterests
