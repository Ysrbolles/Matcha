const nodemailer = require('nodemailer');
const Database = require('./Database');
const queries = require("../config/const");
const fs = require('fs')
const JsonWebToken = require('./JsonWebToken')
const USER = queries.USERS;
const CHAT = queries.CHAT
const {
  hash,
  random,
  isEmpty,
} = require('../outils')



class User {
  constructor(){
    this.jwt = new JsonWebToken()
    this.con = new Database()
    this.user = {
      id: null,
      username: null,
      lastname: null,
      firstname: null,
      email: null,
      confirmed: false,
      age: null,
      pictures: [],
      likes: [],
      liked: [],
      profilePic: null,
      profileComplete: false,
      latitude: null,
      longitude: null,
      interests: [],
      biography: null,
      gender: null,
      birthday: null,
      creation: null,
      popularity: null,
      is_connection: null,
      last_connection: null,
      orientation: null,
      isGeolocationActive: null
    }
  }
"-------------------------------------------------------Register------------------------------------------------------------"
Registration(user){
        return new Promise ((resolve, reject ) => (
          this.con.query(USER.GET_COUNT_BY_USERNAME_AND_EMAIL,  [user.username, user.email])
          .then((result) =>{
          if (result[0].count > 0) throw new Error('ERRORS.USER_ACCOUNT_EXISTS')
          const password = hash(user.password)
          this.user.username = user.username
          this.user.firstname = user.firstname
          this.user.lastname = user.lastname
          this.user.email = user.email
          return (this.con.query(USER.ADD_USER,[user.firstname,user.lastname,user.username,password,user.email]))
          })
          .then((rows) => {
            if(isEmpty(rows)) throw new Error('An error occured. Please try again later.')
              this.user.Registertoken = random(this.user.username+this.user.password+this.user.email)
            return (this.con.query(
            USER.ADD_REGISTRATION_TOKEN,
            [this.user.Registertoken,rows.insertId]
            ))
            })
          .then((rows) =>{
            if (isEmpty(rows)) throw new Error('An error occured. Please try again later.')
              const html ='<h1>Welcome!</h1><p> Please click here: </p><a href="http://localhost:8081/confirm?token='+this.user.Registertoken+'">here</a>'
            this.sendEmail(this.user.email, 'Confirm Account', html)
          })
          .then(() => this.addIdentificationToken())
          .then(() => resolve(this.user))
          .catch((r) => reject(r))
        ))
    }

"-------------------------------------------------------addPicture------------------------------------------------------------"
    addPicture(file, userId) {
      return new Promise((resolve, reject) => (
        this.fetchInformationById(userId)
          .then(() => {
            if (this.user.pictures.length >= 5) throw new Error('ERRORS.USER_MAX_PICTURES')
            const isProfilePicture = (this.user.pictures.length === 0)
            return this.con.query(USER.ADD_PICTURE, [userId, file.filename, isProfilePicture])
          })
          .then((rows) => {
            if (isEmpty(rows)) throw new Error('An error occured. Please try again later.')
            this.user.pictures.push(file.filename)
            if (isEmpty(this.user.profilePic)) this.user.profilePic = file.filename
            return resolve(this.user)
          })
          .catch((err) => {
            fs.unlinkSync(`./src/assets/uploads/${file.filename}`)
            return reject(err)
          })
      ))
    }

    "-------------------------------------------------------deletePicture------------------------------------------------------------"
    deletePicture(userId, filename) {
      return new Promise((resolve, reject) => (
        this.fetchInformationById(userId)
          .then(() => {
            if (this.user.pictures.length <= 1) {
              throw new Error('Minimum number of pictures is one.')
            }
            if (this.user.pictures.indexOf(filename) === -1) {
              throw new Error('Wrong filename.')
            }
            if (this.user.profilePic === filename) this.user.profilePic = null
            this.user.pictures = this.user.pictures.filter(el => el !== filename)
            return this.con.query(USER.DELETE_PICTURE, [userId, filename])
          })
          .then(() => {
            if (this.user.pictures.length > 0 && this.user.profilePic === null) {
              [this.user.profilePic] = this.user.pictures
              return this.con.query(USER.SET_PROFILE_PICTURE, [1, this.user.profilePic])
            }
            fs.unlinkSync(`./src/assets/uploads/${filename}`)
            return resolve(this.user)
          })
          .then(() => resolve(this.user))
          .catch(err => reject(err))
      ))
    }

"-------------------------------------------------------fetchPicture------------------------------------------------------------"
    fetchPictures(id) {
      return new Promise((resolve, reject) => (
        this.con.query(USER.GET_PICTURES, [id])
          .then((rows) => {
            this.user.pictures = []
            this.user.profilePic = null
            rows.forEach((pic) => {
              if (pic.is_profile_pic) this.user.profilePic = pic.filename
              this.user.pictures.push(pic.filename)
            })
            return resolve(this.user)
          })
          .catch(err => reject(err))
      ))
    }

"-------------------------------------------------------fetchLikes------------------------------------------------------------"

    fetchLikes(id){
      return new Promise((resolve, reject) => {
        this.con.query(USER.GET_LIKES[0], [id])
        .then((rows) => {
          this.liked = []
          rows.forEach((like) =>{
            this.user.liked.push({id: like.id,  username: like.username, at: like.date})
          })
          return this.con.query(USER.GET_LIKES[1], [id])
        })
        .then((rows) => {
          this.likes = []
          rows.forEach((like) =>{
            this.user.likes.push({id: like.id,  username: like.username, at: like.date})
          })
          return resolve(this.user)
        })
        .catch(err =>  reject(err))
      })
    }

"-------------------------------------------------------fetchInformationById------------------------------------------------------------"
    fetchInformationById(id) {
          return new Promise((resolve, reject) => (
          this.con.query(USER.GET_USER_BY_ID , [id])
          .then((rows) => {
          if (isEmpty(rows)) throw new Error('ERROR.: NO_USER')
          this.user.id = id
          this.user.username = rows[0].username
          this.user.lastname = rows[0].lastname
          this.user.firstname = rows[0].firstname
          this.user.email = rows[0].email
          this.user.confirmed = rows[0].confirmed
          this.user.biography = rows[0].Biography
          this.user.birthday = rows[0].birthday
          this.user.gender = rows[0].gender
          this.user.latitude = rows[0].latitude
          this.user.longitude = rows[0].longitude
          this.user.interests = (isEmpty(rows[0].tags)) ? [] : rows[0].tags.split(',')
          this.user.age =  rows[0].Age
          this.user.popularity = rows[0].popularity
          this.user.is_connection = rows[0].is_connection
          this.user.last_connection = rows[0].last_connection
          this.user.orientation = rows[0].orientation
          this.user.isGeolocationActive = 0,
          this.user.profileComplete = rows[0].profileComplete

          return this.fetchPictures(id)
          })
          .then((user) => {
          if (isEmpty(user)) throw new Error('ERRORS:Cannot fetch user pictures')
          return this.fetchLikes(id)
          })
          .then((user) =>{
            if (isEmpty(user)) throw new Error('ERRORS:Cannot fetch user likes.')
            return resolve(this.user)
          })
          .catch(err => reject(err))
          ))
    }

"-------------------------------------------------------fetchALL------------------------------------------------------------"
    fetchAll(id){
      return new Promise((resolve, reject) => (

        this.fetchInformationById(id)
        .then(() => this.con.query(USER.GET_ALL_USERS, [id, id, id, id]))
        .then((usersFetch) => {
          const users=[]
          usersFetch.forEach((user) => {
            const link = (!isEmpty(user.liker_id))
            const interests = (isEmpty(user.tags)) ? null : user.tags.split(',')
            users.push({
              id: user.id,
              username: user.username,
              firstname: user.firstname,
              lastname: user.lastname,
              age: user.age,
              latitude: user.latitude,
              longitude: user.longitude,
              gender: user.gender,
              interests,
              is_connected: user.is_connection,
              link,
              profilePic: user.profile_pic,
              popularity: user.popularity,
              last_connection: user.last_connection,
              orientation: user.orientation

            })
          })
           return resolve({users, currUser: this.user})
        })
        .catch(err => err.message)
      ))
    }
    "-------------------------------------------------------fetchALLII(Map)------------------------------------------------------------"
    fetchAllII(){
      return new Promise((resolve, reject) => (
        this.con.query(USER.GET_ALL_MAP)
        .then((usersFetch) => {
          const users=[]
          usersFetch.forEach((user) => {
            users.push({
              id: user.id,
              username: user.username,
              firstname: user.firstname,
              lastname: user.lastname,
              age: user.age,
              latitude: user.latitude,
              longitude: user.longitude,
              gender: user.gender,
              profilePic: user.profile_pic,
              popularity: user.popularity,
            })
          })
           return resolve(users)
        })
        .catch(err => err.message)
      ))
    }

    "-------------------------------------------------------Confirm------------------------------------------------------------"
    Confirm(token){
        return new Promise ((resolve, reject) => {
        this.con.query(USER.GET_REGISTRATION_TOKEN, token)
        .then((rows) => {
        if(isEmpty(rows)) throw new Error('ERRORS.USER_TOKEN_EXPIRED')
        return this.fetchInformationById(rows[0].user_id)
        })
        .then(() => {this.con.query(USER.SET_ACCOUNT_CONFIRMED, this.user.id)
        })
        .then(() => {
        if (this.user.confirmed) throw new Error('ERRORS.USER_ACCOUNT_ACTIVATED')
        this.user.confirmed = 1
        return this.con.query(USER.DELETE_REGISTRATION_TOKEN, [token])
        })
        .then(() => resolve(this.user))
        .catch(err => reject(err))
        })
    }

    "-------------------------------------------------------addIdentificationToken------------------------------------------------------------"
    addIdentificationToken(){
      return new Promise((resolve, reject) => (
        this.jwt.create(this.user)
        .then((newToken) => {
      if (isEmpty(newToken)) throw new Error('ERRORS.JWT_CREATION')
        this.user.identificationToken = newToken
      return resolve(this.user)
      })
      .catch(err => reject(err))
      ))
    }

    "-------------------------------------------------------Signin----------------------------------------------------------------"
    Signin(username,  password){
      return new Promise ((resolve, reject) => {
          this.con.query(USER.GET_USER, [username, password])
          .then((rows) => {
            this.con.query(USER.SET_CONNECTED, [username])
              resolve(rows)
            })
            .catch(err => reject(err))
          })
    }

    "-------------------------------------------------------EditProfile------------------------------------------------------------"
    EditProfile(firstname, lastname, username, password, email, birthday, gender, biography, tags, profileComplete, latitude, longitude, age, orientation, id, tags_new){
       return new Promise ((resolve, reject) => {
         return this.con.query(USER.UP_USER_DETAILS, [firstname, lastname, username, password, email, birthday, gender, biography, tags, profileComplete, latitude, longitude, age, orientation, id])
         .then((res) => {
           if (!isEmpty(tags_new)){
           tags_new.forEach( el => {
              this.con.query(USER.TAG_SUP, el)
              .catch(err => reject(err))
            })}
         })
         .catch((err) => reject(err))
           })
       }
       "-------------------------------------------------------Reset------------------------------------------------------------"
       Reset(email){
         let s = 0
        return new Promise ((resolve, reject) => {
          const tk = random('')
          this.con.query(USER.GET_USER_BY_EMAIL, [email])
          .then((ss) => {
            console.log(ss)
            if(ss[0].confirmed == 1)
              s = 1
            else
              resolve(0)
            return(this.con.query(USER.FIND_ID,ss[0].id))
            .then((rows) => {
              if(s == 1){
              if(isEmpty(rows))
                return(this.con.query(USER.ADD_REGISTRATION_TOKEN,[tk, ss[0].id]))
              else
                return(this.con.query(USER.UP_REGISTRATION_TOKEN,[tk, ss[0].id]))}
            })
          })
          .then(() => {
            if(s == 1){
          let html = '<h1>Welcome!</h1>To change your password click in the link below! Link<p> Please click here: </p><a href="http://localhost:8081/fgpassword?token='+tk+'">here</a>'
          this.sendEmail(email, 'Forget Password', html)
          .then(() => resolve(s))
          .catch((er) => reject(er))
        }
        })
          .catch((er) => reject(er))
        })
       }

    "-------------------------------------------------------putone----------------------------------------------------------------"
    putone(id){
      return new Promise ((resolve, reject) => {
        this.con.query(USER.PUT_ONE, id,(err,ress) => {
          if(err)
            reject(err)
          else {
            resolve(ress)
          }
          })
        })
    }

    "-------------------------------------------------------sendEmail------------------------------------------------------------"
    sendEmail(email, subject, html){
      return new Promise ((resolve, reject) => {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'ysrbolles@gmail.com',
        pass: 'vhcretlphmeqgjkf'
        }
        })
      let mailOptions = {
        from: 'ysrbolles@gmail.com',
        to: email,
        subject: subject,
        html: html,
        }
      transporter.sendMail(mailOptions, (err, res) => {
        if (!isEmpty(err)) return reject(err)
        return resolve(res)
        })
      })
    }
    "-------------------------------------------------------putProfile------------------------------------------------------------"

    setProfilePicture(userId, filename) {
      return new Promise((resolve, reject) => (
        this.fetchInformationById(userId)
          .then(() => this.con.query(USER.SET_PROFILE_PICTURE, [0, this.user.profilePic]))
          .then(() => this.con.query(USER.SET_PROFILE_PICTURE, [1, filename]))
          .then(() => this.fetchPictures(userId))
          .then(() => resolve(this.user))
          .catch(err => reject(err))
      ))
    }
    "-------------------------------------------------------addLike------------------------------------------------------------"
    addLike(liker, liked, user){
      const content = user+' Liked You'
      return new Promise((resolve, reject) => (
        this.con.query(USER.GET_LIKE, [liker, liked])
        .then((rows) => {
          if(isEmpty(rows) || rows[0].count > 0) throw new Error('User already liked.')
          return this.con.query(USER.ADD_LIKE, [liker, liked])
        })
        .then((rows) => {
          if(isEmpty(rows)) throw new Error('Please try again later')
          return this.con.query(USER.ADD_NOTIFICATION, [content,liked, liker])
        })
        .catch(() => console.log())
        .then(() => {
          return this.con.query('SELECT username FROM users INNER join  `users_likes` on users.id = users_likes.liker_id WHERE `liker_id`=? and `liked_id`=?', [liked, liker])
      })
      .then((r) => {
        if(!isEmpty(r)){
          this.con.query(USER.ADD_NOTIFICATION, ['Now you can Match with '+user, liked, liker])
           this.con.query(USER.ADD_NOTIFICATION, ['Now you can Match with '+r[0].username, liker, liked])}
        resolve(r)})
        .catch((er) => {
          reject(er)})
      ))
    }
    "-------------------------------------------------------Reset------------------------------------------------------------"
    FindTk(data){
        return new Promise ((resolve, reject) => {
        if(data.sym == 0)
          resolve('rows');
        else
        {
        return this.con.query(USER.UPDATE_PASSWORD, [data.pass,data.id])
        .then(() => {
        return this.con.query(USER.DELETE_REGISTRATION_TOKEN, [data.token])
        })
        .then((res) => resolve(res))
        .catch(err => reject("Not Found"))
      }
      })
    }


    checktk(token){
      return new Promise ((resolve, reject) => {
        this.con.query(USER.GET_REGISTRATION_TOKEN, token)
        .then((rows) => {
            resolve(rows)
        })
        .catch(err => reject(err))
      })
    }
    "------------------------------------------Tags----------------------------------"
    getTags(){
      return new Promise ((resolve, reject) => {
        this.con.query(USER.GET_TAGS)
        .then((rows) => {
            resolve(rows)
        })
        .catch(err => reject(err))
      })
    }
    "------------------------------------------addBlock----------------------------------"
    addBlock(blocker, blocked){
      return new Promise((resolve, reject) => {
        this.con.query(USER.GET_BLOCK, [blocker, blocked])
        .then((rows) => {
          if(isEmpty(rows) ||rows[0].count > 0) throw new Error('User Already Blocked.')
          return this.con.query(USER.ADD_BLOCK, [blocker, blocked])
        })
        .then((rows) => {
          if(isEmpty(rows)) throw new Error('Please try again later')
        })
        .then(() =>  resolve())
        .catch(err => {
          reject(err)})
      })
    }
    "------------------------------------------GetUser----------------------------------"
    GetUser(id){
      return new Promise((resolve, reject) => {
      this.con.query(USER.GET_ALL, [id,id])
      .then((rows) => {
          resolve(rows)
      })
      .catch(err => reject(err))
      })
    }
    SeeProfile(id_user, id_ss, user){
      let p = 0;
      const content = user+' See Your profile'
      return new Promise((resolve, reject) => {
        this.con.query(USER.ADD_NOTIFICATION, [content,id_ss, id_user])
        .then(() => {
          return this.con.query(USER.GET_USER_BY_ID, id_ss)
        })
        .then((r) => {
          r[0].popularity += 1;
          p = r[0].popularity
          console.log(r)
          this.con.query(USER.SEE_PROFILE, [id_user, id_ss, r[0].username])
        })
        .then(() =>  {this.con.query(USER.ADD_POP, [p, id_ss])
        resolve('suc')})
        .catch((er) => reject('er'))
      })
    }
      "------------------------------------------Logout----------------------------------"
      logout(id){
        return new Promise((resolve, reject) => {
        this.con.query(USER.SET_DISCONNECTED, id)
        .then(() => {
          resolve('Done')
        })
        .catch((err) => reject(err))
      })
      }
      "------------------------------------------Unblock----------------------------------"

  unblock(unblocker, unblocked) {
    return new Promise((resolve, reject) => (
      this.con.query(USER.GET_BLOCK, [unblocker, unblocked])
        .then((rows) => {
          if (isEmpty(rows) || rows[0].count === 0) throw new Error('ERRORS: User not blocked')
          return this.con.query(USER.DELETE_BLOCK, [unblocker, unblocked])
        })
        .then((rows) => {
          if (isEmpty(rows)) throw new Error('ERROR: Please try again later')
        })
        .catch(err => reject(err))
    ))
  }
  "------------------------------------------.getBlocked----------------------------------"

  getBlocked(id) {
    return new Promise((resolve, reject) => (
      this.con.query(USER.GET_BLOCK_LIST, [id])
        .then((rows) => {
          if (isEmpty(rows)) throw new Error('ERROR: Please try again later')
          resolve(rows)
        })
        .catch(err => reject(err))
    ))
  }
  "------------------------------------------Unlike---------------------------------------"

  unlike(unliker, unliked, user) {
    const content = user+' Unliked You'
    return new Promise((resolve, reject) => (
      this.con.query(USER.GET_LIKE, [unliker, unliked])
        .then((rows) => {
          if (isEmpty(rows) || rows[0].count === 0) throw new Error('ERRORS: User not liked')
          return this.con.query(USER.DELETE_LIKE, [unliker, unliked])
        })
        .then((rows) => {
          if (isEmpty(rows)) throw new Error('ERRORS: Please try again later')
          this.con.query(USER.ADD_NOTIFICATION, [content,unliked, unliker])
          resolve()
        })
        .catch(err => reject(err))
    ))
  }

  "------------------------------------------Report---------------------------------------"

  Report(reporter, reported) {
    const Reporter = {}
    const Reported = {}
    return new Promise((resolve, reject) => (
      this.con.query(USER.GET_USERNAME_EMAIL, [reporter])
        .then((rows) => {
          if (isEmpty(rows)) throw new Error('ERROR: No user found')
          Reporter.username = rows[0].username
          Reporter.email = rows[0].email
          return this.con.query(USER.GET_USERNAME_EMAIL, [reported])
        })
        .then((rows) => {
          if (isEmpty(rows)) throw new Error('ERROR: No user found')
          Reported.username = rows[0].username
          Reported.email = rows[0].email
          return this.con.query(USER.ADD_REPORT, [reporter, reported])
        })
        .then((rows) => {
          if (isEmpty(rows)) throw new Error('ERRORS: Please try again later')

        })

        .catch(err => reject(err))
    ))
  }
  "------------------------------------------Delete User---------------------------------------"
  delete(userId) {
    return new Promise((resolve, reject) => (
      this.con.query(USER.DELETE_USER.USER, [userId])
        .then(() => this.con.query(USER.DELETE_USER.BLOCKED, [userId, userId]))
        .then(() => this.con.query(USER.DELETE_USER.LIKES, [userId, userId]))
        .then(() => this.con.query(USER.DELETE_USER.MESSAGES, [userId, userId]))
        .then(() => this.con.query(USER.DELETE_USER.NOTIFICATIONS, [userId]))
        .then(() => this.con.query(USER.GET_PICTURES, [userId]))
        .then((rows) => {
          if (!isEmpty(rows)) {
            rows.forEach((row) => {
              fs.unlinkSync(`./src/assets/uploads/${row.filename}`)
            })
          }
          return this.con.query(USER.DELETE_USER.PICTURES, [userId])
        })
        .then(() => this.con.query(USER.DELETE_USER.REGISTRATION, [userId]))
        .then(() => resolve())
        .catch(err => reject(err))
    ))
  }

   Count(){
    return new Promise((resolve, reject) => {
    this.con.query('SELECT count(*) as num from users')
    .then((res) => {
      resolve(res)
    })
    .catch((err) => reject(err))
  })
  }
  Countnotifs(id){
    let result = ''
    return new Promise((resolve, reject) => {
    this.con.query('SELECT count(*)as count FROM `Notification` WHERE `ID`=? AND `vu`=0', id)
    .then((res) => {
      result = res;
      return this.con.query('SELECT count(*) as m FROM `users_messages` WHERE `seen`=0 AND receiver_id=?', id)
      .then((mm) => {
        console.log(mm)
        result.push({m: mm[0].m/2})
        resolve(result)
      })
    })
    .catch((err) => reject(err))
  })
  }
  Notifs(id){
    return new Promise((resolve, reject) => {
    return this.con.query('SELECT `id`, `notification`, DATE_FORMAT(Time, "%M %d %Y %T") as Time, `id_user`  FROM `Notification` WHERE id=? ORDER BY `Time` DESC', id)
    .then((res) => {
      this.con.query('UPDATE `Notification` SET `vu`=1 WHERE id=?', id)
      resolve(res)
    })
    .catch((err) => reject(err))
  })
  }
  History(id){
    return new Promise((resolve, reject) => {
      return this.con.query('SELECT `id_user`, `id_ss`,  DATE_FORMAT(time, "%M %d %Y %T") as Time, `user` FROM `See_profile` WHERE id_user = ? ORDER BY `Time` DESC', id)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => reject(err))
  })
}
checkBlocked(id, uid){
  return new Promise((resolve, reject) => (
    this.con.query(USER.GET_BLOCKED, [id, uid])
      .then((rows) => {
        if (isEmpty(rows)) throw new Error('ERROR: Please try again later')
        resolve(rows)
      })
      .catch(err => reject(err))
  ))
}
"-----------Check_email_user----------------"
Check_email_user(username,email){
  return new Promise ((resolve, reject ) => {
    this.con.query(USER.GET_COUNT_BY_USERNAME_AND_EMAIL,  [username, email])
    .then((result) =>{
    if (result[0].count > 0) resolve(1)
    else resolve(0)
    })
    .catch(() => console.log())
  })
}
}

module.exports = User
