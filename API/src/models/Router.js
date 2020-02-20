


// routes/token
const tokenDelete = require('../routers/token/delete')
const tokenGet = require('../routers/token/get')
const tokenPost = require('../routers/token/post')
//user
const {register, confirm, login, EditProfile, getuser, fgpassword, viewprofile, logout, count, check} = require('../routers/user/Register')

const getall = require('../routers/user/Match')
const allmap = require('../routers/user/MapUsers')

//picture
const pictureDelete = require('../routers/picture/delete')
const picturePost = require('../routers/picture/post')
const picturePutProfile = require('../routers/picture/putProfile')
//notif
const like = require('../routers/notif/Like')
const unlike = require('../routers/notif/Unlike')
const block = require('../routers/notif/Block')
const unblock = require('../routers/notif/Unblock')
const report = require('../routers/notif/Report')
const getnotifs = require('../routers/notif/getnotif')
const blockedList = require('../routers/notif/BlockList')
const deleteuser = require('../routers/user/delete')
const History = require('../routers/notif/History')
const blocker = require('../routers/notif/checkBlocked')
//chat
const getcnv = require('../routers/chat/getConv')
const getMsg = require('../routers/chat/getMsg')
const postMsg = require('../routers/chat/postMsg')


//databse


const notification = require('../routers/notif/notification')


class Router {
  constructor(app) {
    this.app = app
    this.routes = {

      '/token': [
        tokenDelete,
        tokenGet,
        tokenPost,
      ],
      '/del': [deleteuser],
      '/user': [
        allmap,
        getall,
        fgpassword,
        confirm,
        register,
        login,
        EditProfile,
        getuser,
        viewprofile,
        logout,
        count,
        check

      ],
      '/picture': [
        picturePost,
        pictureDelete,
        picturePutProfile
      ],
      '/notif': [
        report,
        like,
        block,
        unlike,
        unblock,
        blockedList,
        getnotifs,
        notification,
        blocker,
        History
      ],
      '/chat':[
        getcnv,
        getMsg,
        postMsg,


      ],

    }
  }

  setAllRoutes() {
    Object.keys(this.routes).forEach((route) => {
      this.routes[route].forEach((element) => {
        if (route === '') this.app.use(element)
        else this.app.use(route, element)
      })
    })
  }
}

module.exports = Router
