
import Api from '@/services/Api'
import token from '@/services/Token'
import _ from 'lodash'

export default {

  register (user) {
    return new Promise((resolve, reject) => {
        Api().post('/user/register', user)
            .then(success => { resolve(success) })
            .catch(err => { reject(err) })
      })
  },
  login (user) {
    return new Promise((resolve, reject) => {
        Api().post('/user/login', user)
            .then(success => {
            localStorage.setItem('authToken', success.data)
            token.decodeToken(success.data).then((result) => {
              resolve(result)
              })
            })
            .catch(err => { reject(err) })
      })
  },
  confirm(token) {
    return new Promise((resolve, reject) => {
         Api().put('/user/confirm', { 'token' : token })
          .then(success => { resolve(success) })
          .catch(err => reject(err))
    })
  },
  fgpassword(data) {
    return new Promise((resolve, reject) => {
         Api().get(`/user/fgpassword?token=${data}`)
          .then(success => { resolve(success) })
          .catch(err => reject(err))
    })
  },
  resetPassword(data) {
    return new Promise((resolve, reject) => {
         Api().post('/user/fgpassword', data)
          .then(success => { resolve(success) })
          .catch(err => reject(err))
    })
  },
  EditProfile(user) {
    return new Promise((resolve, reject) => {
         Api().post('/user/profile', user)
          .then(success => {
            resolve(success) })
          .catch(err => reject(err))
    })
  },
  reset(data){
  return new Promise((resolve, reject) => {
       Api().post('/user/reset', data)
        .then(success => { resolve(success) })
        .catch(err => reject(err))
  })
},
  logout () {
  return new Promise((resolve, reject) => {
  Api().post('/user/logout')
  .then(success => {
  localStorage.removeItem('userLogged')
  localStorage.removeItem('authToken')
  localStorage.removeItem('userID')
  resolve(success)
  })
  .catch((err) => {
    reject(err)
    })
  })
  },

  get () {
      return this.getID()
      .then((uid) => {
        if(uid == -1) return -1
          return Api().get(`/user/${uid}`)
      })
      .then(data => data)
      .catch((err) => new Error(_.get(err, 'response.data.err') || err))
  },

  addPicture(file){
    return new Promise((resolve, reject) => {
    return this.getID()
    .then((uid) => {
      const formData = new FormData();
      formData.append('user_id', uid)
      formData.append('filename', file)
      const config = { headers: { 'Content-Type': 'multipart/form-data; boundary=something' } }
    return Api().post('/picture/', formData, config)
    })
    .then(response => {
      resolve(response)})
    .catch(err => { reject(err) })
  })
  },
  deletePicture (body) {
    return new Promise((resolve, reject) => (
      this.getID()
        .then((uid) => {
          Object.assign(body, { 'user_id': uid })
          return Api().delete('/picture/', { data: body })
        })
        .catch((err) => reject(err))
    ))
  },
  putProfile(body)
  {
    return new Promise((resolve, reject) =>{
      return this.getID()
      .then((uid) => {
      Object.assign(body, {'user_id': uid})
      return Api().put('/picture/putprofile', body)
      })
      .then(response => {
        resolve(response)
      })
      .catch(err => reject(err))
    })
  },
  getID () {
    const uid = localStorage.getItem('authToken')
    if(uid === null) return null
     return Api().get(`/token?token=${uid}`)
      .then((data) => {
        return data.data.data.id
      })
      .catch(() => { window.console.log('er')
        return(-1)})
  },

  getAll (filters, sort) {

    return new Promise((resolve, reject) => (
      this.getID()
        .then((uid) => {
          const params = { user_id: uid }
          Object.assign(params, filters, sort)
        return Api().get('/user/all/',  {params})
        })
      .then(success => {
        resolve(success)})
        .catch(err => { reject(err.response.data.err) })
    ))
  },
  getAllII(){
    return new Promise((resolve, reject) => (
      Api().get('/user/allmap')
      .then(success => {
        resolve(success)})
        .catch(err => { reject(err.response.data.err) })
    ))
  },
  getMatched () {
    return new Promise((resolve, reject) => (
        this.getID()
        .then(uid => Api().get('/user/all/', { params: {
          user_id: uid,
          filters: {
            is_match: 1
          }
        }}))
        .then(data => resolve(data))
        .catch(err => reject(err.response.data.err))
    ))
  },
  getBlocked(){
    return new Promise((resolve, reject) =>{
      this.getID()
      .then((uid) => {
        return Api().get(`/notif/blockedlist?id=${uid}`)
      })
      .then((rows) => {
        resolve(rows)
      })
      .catch(() => reject())
    })
  },
  like(Liker, Liked){
    const body = {'liker': Liker, 'liked': Liked}
    return Api().post('/notif/like', body)
      .then((response) => {
        return response
      })
      .catch((err) => {
        return err
      })

  },
  unlike (unliker, unliked) {
    const body = { 'unliker': parseInt(unliker, 10), 'unliked': parseInt(unliked, 10) }
    return Api().post('/notif/unlike', body)
      .then((response) => { return response })
      .catch((err) => { return err })
  },
  getTags(){
    return new Promise((resolve, reject) => {
    Api().get('/user/profile')
        .then(success => { resolve(success) })
        .catch(err => { reject(err) })
    })

  },
  block(blocker, blocked){
    const body = {'blocker': blocker, 'blocked': blocked}
    return Api().post('/notif/block', body)
    .then(success => {return success})
    .catch((err) => {return err})
  },
  unblock (unblocker, unblocked) {
    const body = { 'unblocker': unblocker, 'unblocked': unblocked }
    return Api().delete('/notif/unblock', { data: body })
      .then((response) => { return response })
      .catch((err) => { return err })
  },
  GetUser(id){
    return Api().post('/user/viewprofile', id)
    .then(success => {return success})
    .catch((err) => {return err})
  },
  report (reporter, reported) {
    const body = { 'reporter': reporter, 'reported': reported }
    return Api().post('/notif/report', body)
      .then((response) => { return response })
      .catch((err) => { return err })
  },
  Count(){
    return Api().post('/user/count')
    .then(success => {return success})
    .catch((err) => {return err})
  },
  ProfilePic(id){
    return new Promise((resolve, reject) => {
        Api().get('/user/' + id)
          .then(data => {
            if (data.data.user.profilePic === null) reject(Error('No profile Picture'))
            const path = 'http://localhost:4242/assets/' + data.data.user.profilePic
            resolve(path)
          })
          .catch(err => reject(err))
      })

  },
  getConversation(){
      return new Promise((resolve, reject) => {
        this.getID()
        .then(uid => {
          Api().get('/chat/conversation', {
            params: {
              user_id: uid
            }
          })
        })
        .then(data => {
            resolve(data)
        })
        .catch(err => reject(err.response.data.err))
      })
  },
  getMessages (receiver) {
    return new Promise((resolve, reject) => (

        this.getID()
        .then(uid => Api().get('/chat/message', { params: { sender: uid, receiver } }))
        .then(data => resolve(data))
        .catch(err => reject(err.response.data.err))
    ))
  },
  sendMessage (receiver, message) {
    return new Promise((resolve, reject) => (
      this.getID()
        .then(uid => Api().post('/chat/message', { sender: uid, receiver, message }))
        .then(response => resolve(response))
        .catch((err) => reject(err))
    ))
  },
  getHaderChat(id){
    return new Promise((resolve, reject) =>{
      Api().get(`/chat/headerchat?id=${id}`)
      .then((rows) => resolve(rows))
      .catch(err => reject(err))
    })
  },
  Getnotifications(){
    return new Promise((resolve, reject) =>{
      Api().get('/notif')
      .then((rows) => resolve(rows))
      .catch(err => reject(err))
    })
  },
  deleteAccount()
  {
    return new Promise((resolve, reject) =>{
      this.getID()
      .then(uid =>{
        Api().delete(`/del/${uid}`)
      })
      .then(()=> {
        this.logout()
        resolve()
      })
      .catch(()=> reject())
    })
  },
  Notification(){
    return new Promise((resolve, reject) =>{
      Api().post('/notif')
      .then((rows) => resolve(rows))
      .catch(err => reject(err))
    })
  },
  History(){
    return new Promise((resolve, reject) => {
      Api().post('/notif/History')
      .then((rows) => resolve(rows))
      .catch(err => reject(err))
    })
  },
  checkBlocked(id){
    return new Promise((resolve, reject) =>{
      this.getID()
      .then((uid) => {
        return Api().get(`/notif/checkBlocked?id=${id}&&uid=${uid}`)
      })
      .then((rows) => {
        resolve(rows)
      })
      .catch(() => reject())
    })
  }
}
