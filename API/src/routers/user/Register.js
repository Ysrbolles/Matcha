const router = require('express').Router()
const User = require('../../models/User')
const jwt = require('../../models/JsonWebToken');
const ipInfo = require("ipinfo");
const {
  isEmpty,
  isFirstname,
  isLastname,
  isUsername,
 isEmail,
 isPassword,
 hash,
 isNumeric,
 AgeFromDate,
 isLongitude,isLatitude, isTags, isBirthday
} = require('../../outils')
const dataCheck = user => (
  isFirstname(user.firstname)
  &&  isLastname(user.lastname)
  &&  isUsername(user.username)
  &&  isEmail(user.email)
  &&  isPassword(user.password, user.cpassword)
)

async function findplace(){
  return new Promise((resolve, reject) =>{
    ipInfo((err, cLoc) => {
      if (err)
        reject(err)
      resolve(cLoc.loc)
  })
})
}
const viewprofile = router.post('/viewprofile', (req, res) => {
  return new jwt().check(req.headers.authorization.split(' ')[1])
  .then((data) => {
  return new User().fetchInformationById(req.body.id)
  .then((suc) => {
    res.send(suc)
      return new jwt().check(req.headers.authorization.split(' ')[1])
      .then((data) => {
        if(data.data.id != req.body.id)
          new User().SeeProfile(data.data.id, req.body.id, data.data.username)
        .then((r) => console.log(r))
      })
        .catch(() => console.log())
    })
  })
  .catch(err => {
    res.send({ err: err.message })})
})
const getTags = router.get('/profile', (req, res) => {
  return new User().getTags()
  .then((suc) => {
    res.send(suc)})
  .catch(err => {
    res.send({ err: err.message })})
  })
/************* Reset password********/
const check = router.get('/fgpassword', (req, res) => {
      let data = {
      "token": req.query.token
    }

    if (isEmpty(data.token)) return res.json({ err: 'ERRORS.DATA_MISSING' })
    return new User().checktk(data.token)
    .then((suc) => {
      if(isEmpty(suc))
        return res.send('0')
      else
        return res.send('1')
    })
      .catch(err => res.send({ err: 'err' }))
})
const fgpassword = router.post('/fgpassword', (req, res) => {
    if (isEmpty(req.body.token) || !isPassword(req.body.pass,req.body.cpass)) return res.json({ err: 'ERRORS.DATA_MISSING' })
    let data = {
      "token": req.body.token,
      "pass": hash(req.body.pass),
      "cpass": hash(req.body.cpass),
      "id": ''
    }
    return new User().checktk(req.body.token)
    .then((suc) => {
      if(isEmpty(suc))
        res.send('0')
      data.id = suc[0].user_id
      console.log("data")
      console.log(data)
      return new User().FindTk(data)
    })
      .then(() => {
        res.send('You can Signin now')})
      .catch(err => res.send())
    })

/************** Confirm **************/
const confirm = router.put('/confirm', (req, res) => {
    if (isEmpty(req.body.token)) return res.json({ err: 'ERRORS.DATA Are MISSING' })
    return new User().Confirm(req.body.token)
        .then(user => {
            return res.json({ user })})
        .catch(err => res.json({ err: err.message }))

  })
  /*******************        profile         ****************/
const EditProfile = router.post('/profile', async function(req, res){

let {username, email, firstname,lastname,  oldPassword, password, cpassword, birthday, gender, latitude, longitude, biography, interest, isGeolocationActive, tags, orientation} = req.body;
let cLoc =  await findplace()
const values = {
          'id': '',
          'username':'',
          'firstname': '',
          'lastname': '',
          'birthday': '',
          'password': '',
          'gender': '',
          'latitude': '',
          'longitude': '',
          'birthday': '',
          'Biography': '',
          'tags': '',
          'profileComplete': '',
          'Age': '',
          'orientation': '',
          'email': ''
        };
const tags_new = req.body.new
if(!isEmpty(req.headers['authorization']))
  token = req.headers['authorization'].split(' ')[1]
else {
  return "No Header"
}
return new jwt().check(token)
.then((data) => {
  if (!isEmpty(password) && !isEmpty(cpassword))
  {
    if(hash(oldPassword) == data.data.password){
    if(password === cpassword && isPassword(password))
      values['password'] = hash(password)
    else
      return res.send('2');
    }else
      return res.send('1')
    console.log(hash(oldPassword))
    console.log(data.data.password)

  }

  (!isEmpty(firstname)) ? values['firstname'] = firstname : values['firstname'] = data.data.firstname;
  (!isEmpty(lastname))  ? values['lastname'] = lastname : values['lastname'] = data.data.lastname;
  (isEmpty(values['password'])) ? values['password'] = data.data.password : 1;
  (!isEmpty(birthday))  ? values['birthday'] = birthday : values['birthday'] = data.data.birthday;
  (!isEmpty(biography))  ? values['Biography'] = biography : values['Biography'] = data.data.Biography;
  (!isEmpty(gender))  ? values['gender'] = gender : values['gender'] = data.data.gender;
  (!isEmpty(username))  ? values['username'] = username :values['username'] = data.data.username
  if (!isEmpty(email))   values['email'] = email
  else values['email'] = data.data.email
  values['Age'] = AgeFromDate(values['birthday'])
  values['id'] = data.data.id
  values['profileComplete'] = data.data.profileComplete
  if(!isEmpty(interest)){
  for(let i = 0; i < interest.length; i++){
    values['tags'] += interest[i]
    if(i + 1 < interest.length)
      values['tags'] += ','
  }}
  if(values['email'] != data.data.email || values['username'] != data.data.username){
    return new User().Check_email_user(values['username'], values['email'])
    .then((r) => {
      if (r == '1')
        return res.send({err: "User or email already existe"})
    }).catch(() => console.log())
  }
  if (!isEmpty(orientation) && !/^[\s]*$/.test(orientation.toString())){
    for(let i = 0; i < orientation.length; i++){
      if (orientation[i] == "Female" || orientation[i] == "Male" || orientation[i] == "Others")
      {
        values['orientation'] += orientation[i]
        if(i + 1 < orientation.length)
          values['orientation'] += ','
      }
    }
  }else if(!isEmpty(data.data.orientation))
      values['orientation'] = data.data.orientation
    else
      values['orientation'] = "Others"
    if((isEmpty(latitude) || isEmpty(longitude)) && !data.data.profileComplete){
      cLoc = cLoc.split(',')
      values['latitude'] = cLoc[0]
      values['longitude'] = cLoc[1]
    }
    if(!isEmpty(latitude) && !isEmpty(longitude)){
      values['latitude'] = latitude
      values['longitude'] = longitude
    }
    if((isEmpty(latitude) || isEmpty(longitude)) && data.data.profileComplete){
      values['latitude'] = data.data.latitude
      values['longitude'] = data.data.longitude
    }
  console.log('values before:')
  console.log(values)
  console.log("----------------")
  console.log(values['firstname'], isFirstname(values['firstname']))
  console.log(values['lastname'], isLastname(values['lastname']))
  console.log(values['email'], isEmail(values['email']))
  console.log(values['longitude'], isLongitude(values['longitude']))
  console.log(values['latitude'], isLatitude(values['latitude']))
  console.log(values['username'], isUsername(values['username']))
  console.log(values['tags'].split(','), isTags(values['tags'].split(',')))
  console.log("----------------")
  if (isFirstname(values['firstname']) &&  isLastname(values['lastname']) && isUsername(values['username']) && values['password'] &&  isEmail(values['email']) &&  isBirthday(values['birthday']) &&  values['gender'] &&  values['Biography'] &&  isLongitude(values['longitude']) &&  isLatitude(values['latitude']) && isTags(values['tags'].split(',')) && values['id'] && values['Age'] && values['orientation'] && values['Biography'].length < 225 && values['latitude'] && values['longitude']){
  values['profileComplete'] = 1
  console.log('values:')
  console.log(values)

  /***************** UPDATE Profile  ******************/
  new User().EditProfile(values['firstname'], values['lastname'],values['username'], values['password'], values['email'], values['birthday'], values['gender'], values['Biography'], values['tags'], values['profileComplete'], values['latitude'], values['longitude'], values['Age'], values['orientation'], values['id'], tags_new)
 /************* END PROFILE ************/
}else {
  return res.send('error')
}
  })    .then(() => {
          return new jwt().create(values)
        }).then((token) =>{
          return res.send( token )
        })
    .catch(() => {
      return res.json()
  })
})

/************      getuser          **************/
const getuser = router.get('/:id', (req, res) => {
  if (!isNumeric(req.params.id) || isEmpty(req.params.id)) return res.send(404)
  return new User().fetchInformationById(req.params.id)
    .then(user => res.json({ user }))
    .catch(err => res.json({ err: err.message }))
})
/************      Login          **************/
  const login = router.post('/login', (req, res) => {
    let {username, password} = req.body;
    if (isEmpty(username) && isEmpty(password))
      return res.json({ err: 'ERRORS.DATA_MISSING' })
      password = hash(password)
       return new User().Signin(username, password)
       .then(rows => {
       if(!isEmpty(rows)){
          return new jwt().create(rows[0])
          .then((token) =>{
            res.send(token)
          }).catch(err => res.json({err: err+' jwt'}))
       }
       else {
         return res.json({err: 'User not found'})
       }

    }).catch(err => res.send({err: err.message}))

})
/************      Register          **************/
 const register = router.post('/register', (req, res) => {
  // Check if user is not undefined
  if (isEmpty(req.body.user)) {
    return res.json({ err: 'ERRORS.DATA_MISSING' })
  }
  // Check user data
  if (!dataCheck(req.body.user)) return res.json({ err: 'ERRORS.DATA_VALIDATION' })
  return new User().Registration(req.body.user)
    .then(user => {
      return res.json({ user })
    })
    .catch(() => {
      return res.json({ err: err.message })
    })
})

const reset = router.post('/reset', (req, res) => {
  console.log(req.body)
  if(isEmpty(req.body.email) || !isEmail(req.body.email)) res.send('machi mail')
  return new User().Reset(req.body.email)
  .then((suc) =>
  { if(suc == 1)
      res.send('suc')
    else{
    res.send({err: 'You must confirm Your profil first'})}
      })
  .catch((err) =>
      res.send(err))
})

const logout = router.post('/logout', (req, res) => {
  if(!isEmpty(req.headers['authorization'])){
  return new jwt().check(req.headers['authorization'].split(' ')[1])
  .then((data) => {
    const id = data.data.id
    new User().logout(id)
    .then(() => res.send('Ok'))
    .catch((err) => res.send(err))
  })
  .catch((err) => (err))}
})
const count =  router.post('/count', (req, res) => {
  return new User().Count()
  .then((suc) => res.send(suc))
  .catch((err) =>
      res.send(err))
})
module.exports = {register , confirm, login, EditProfile, getuser, reset, fgpassword, getTags, viewprofile, logout, count, check}
