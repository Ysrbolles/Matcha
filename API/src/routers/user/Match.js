const router = require('express').Router()
const User = require('../../models/User')
const {isEmpty, dynamicSort, usergetDistance, Cmninterests, MatchingFilter} = require('../../outils')
const _ = require('lodash')

const overrideUsers = (users, currentUser) => (
  users.map((user) => {
    let link = 'Let\'s match !'
    const included = _.findKey(currentUser.likes, like => like.id === user.id)
    if (user.link && included === undefined) link = `It seems you like ${user.username} !`
    else if (user.link && included !== undefined) link = 'It is a match !'
    else if (!user.link && included !== undefined) link = `${user.username} likes you ! Let's match !`
    Object.assign(user, {
       link,
      distance: usergetDistance(currentUser, user),
      cmninterests: Cmninterests(user, currentUser),
    })
    Object.assign(user, { matchScore:  MatchingFilter(currentUser, user)})

    return user
  })
)

const Usort = (users, params) => {
  if(isEmpty(users) || isEmpty(params)) return users
  switch(params) {
    case 'age':
      return users.sort(dynamicSort('age'))
    case 'distance':
      return users.sort(dynamicSort('distance'))
    case 'popularity':
      return users.sort(dynamicSort('-popularity'))
    case 'interests':
      return users.sort(dynamicSort('-cmninterests'))
    default:
      return users.sort(dynamicSort('-matchScore'))
  }
}

const filter = (users, params, inter, currUser, match) =>{
    if(isEmpty(users) || isEmpty(params)) return users
     const filter = JSON.parse(params)
     return users.filter((user) => {
         const  useror = currUser.orientation.split(',')
        if(!isEmpty(filter.age_min) && (isEmpty(user.age) || user.age < filter.age_min)) return false
        if(!isEmpty(filter.age_max) && (isEmpty(user.age) || user.age > filter.age_max)) return false
        if(!isEmpty(filter.distance_min) && (isEmpty(user.distance) || user.distance < filter.distance_min)) return false
        if(!isEmpty(filter.distance_max) && (isEmpty(user.distance) || user.distance > filter.distance_max)) return false
        if(!isEmpty(filter.popularity_min) && (isEmpty(user.popularity) || user.popularity < filter.popularity_min)) return false
        if(!isEmpty(filter.popularity_max) && (isEmpty(user.popularity) || user.popularity > filter.popularity_max)) return false
        if(match !== undefined && match === 0 && user.link === 'It is a match !') return false
        if(match !== undefined && match === 1 && user.link !== 'It is a match !') return false
        if(useror.includes(user.gender) !== true) return false

        if(!isEmpty(inter))
        {
          let intert = true
          if(isEmpty(user.interests)) return false
          inter.forEach(interest => {
            if(user.interests.includes(interest) === false)
             intert = false
           })
           return intert
        }

         return true
     })
}

router.get('/all/', (req, res) => {
  if(isEmpty(req.query.user_id)) return res.json({err: "ERROR: Data Are Missing" })
  return new User().fetchAll(req.query.user_id)
  .then(({users, currUser}) => {
  const overrideUsersArr = overrideUsers(users, currUser)
  const filteredUsersArr = filter(overrideUsersArr, req.query.filter, req.query.inter, currUser, req.query.match)
  const sortedUsersArr = Usort(filteredUsersArr, req.query.sort) 
  return res.json(sortedUsersArr)

  })
  .catch(err => res.json({err: err.message}))
  })



  module.exports = router
