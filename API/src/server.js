//Import du module
const express = require('express')
const http = require('http')
const jwt = require('jsonwebtoken');
const cors = require('cors');
const Router = require('./models/Router')
const isEmpty = require('./outils/empty/isEmpty');

//Module NodeJs (middleware) qui permet de parser nos requetes
const bodyParser = require('body-parser');
// Initialisation du module
class Server{
   constructor(){
    this.users = {
      id: '',
      socketid: ''
    }
    this.app = express()
    this.app.use('/assets', express.static('src/assets/uploads'))
    this.app.use(bodyParser.json())
    this.app.use(cors())
    let users = [{id: '', socketid: ''}]
    this.http = http.Server(this.app)
    this.io = require('socket.io')(this.http)
    this.io.use(function(socket, next){
      if (socket.handshake.query && socket.handshake.query.token){
          jwt.verify(socket.handshake.query.token, 'ABFA422265CE21265CDECF71CD8DF', function(err, decoded) {
          if(err) return next(new Error('Authentication error'));
            socket.decoded = decoded;
            next();
          });
      } else {
      next(new Error('Authentication error'));
      }
    })
    .on('connection', function(socket) {
      let sym = 0;
      if(!isEmpty(socket.handshake.query.user) && socket.handshake.query.user != null)
        users.push({id: socket.handshake.query.user, socketid: socket.id})
      let content = ''
      socket.on('Notification', function (message) {
      console.log(message.message)
      if(message.message == 'like')
        content = socket.decoded.data.username + ` likes you ! Let's match !`
        if(message.message == 'unlike')
        content = socket.decoded.data.username+' Unlike you ! Boooo!'
      else if(message.message == 'see')
          content = socket.decoded.data.username+' saw Your Profile'
      else if(message.message == 'msg'){
          content = 'You have new message from '+ socket.decoded.data.username
          sym = 1
        }
      else if(message.message == 'Match')
          content = 'Now you can Match with '+ socket.decoded.data.username
          console.log(message)
      for(let i = 0; i < users.length; i++)
      {
        if(users[i].id == message.reciever){
          socket.broadcast.to(users[i].socketid).emit('Notification', {message: content, sym: sym});
        }
       if(users[i].id == message.sender){
         console.log('******************')
         console.log('test')
          socket.to(users[i].socketid).emit('Notification', {message: 'Now you can Match with '+message.sender_name});
        }
      }
    })
    socket.on('logout', function (message) {
      for(let i = 0; i < users.length; i++)
      {
        users = users.filter(word => word.id != message.reciever);
      }
    })
    socket.on('message', function (message) {
      if(!isEmpty(users)){
          console.log('users[1].id')
      for(let i = 0; i < users.length; i++)
      {
        if(users[i].id == message.reciever){
          socket.to(users[i].socketid).emit('message', {message: message.message, sender: message.sender});
        }
      }}
    })

    })
    .on('disconnect', () => {
        socket.emit('disconnect', {message: "Server Down Sorry!!"});
    })
    this.routes = new Router(this.app).setAllRoutes()
   }
   listen() {
       this.http.listen(4242, ()=> {
         console.log(`Listening on http://localhost:4242`)
       })
     }
}
const server = new Server()
server.listen()
