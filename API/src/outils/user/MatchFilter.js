const isEmpty = require('../empty/isEmpty')

const DistanceScore = distance => {
    return Math.exp(distance * -0.01)
}

const interestsScore = interests => {
  return   1 - Math.exp(interests * -1)
}

const PopularityScore = popularity => 
{
    return popularity / 20
}

const Gender = (user1, user2) => {
   
const  user1or = user1.orientation.split(',')
if (isEmpty(user1.orientation) || isEmpty(user2.orientation)
  || isEmpty(user1.gender) || isEmpty(user2.gender)
  || isEmpty(user1or.includes(user2.gender) !== 0)
  ) {
    return 0
  }
     return 1
}

const MatchingFilter = (user1, user2) => {
    const Genderfilter = Gender(user1, user2)
    const distancefilter = DistanceScore(user2.distance)
    const interestsfilter = interestsScore(user2.cmninterests)
    const popularityfilter = PopularityScore(user2.popularity)
    const MatchScore =  Genderfilter * (distancefilter * 3
        + interestsfilter * 2 + popularityfilter * 2) / (3 + 2 + 2)
    return MatchScore * 100
}

module.exports = MatchingFilter