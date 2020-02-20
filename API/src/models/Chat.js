const Database = require('./Database')
const {isEmpty } = require('../outils')
const queries = require("../config/const")
const CHAT = queries.CHAT
const USER = queries.USERS;
class Chat{
    constructor(){
        this.con = new Database()

        this.conversations = []
        this.messages= []
    }

    Conversations(id){
        return new Promise((resolve, reject) => {
            this.con.query(CHAT.GET_CONVERSATION, [id])
            .then((rows) => {
                this.conversations = []
                rows.forEach(element => {
                    if(element.sender_id === element.owner_id){
                        this.conversations.push({
                            id: element.receiver_is,
                            username: element.username,
                            lastMessageDate: element.creation
                        })
                    }
                })
                return resolve(this.conversations)
            })
            .catch(err => reject(err0))
        })
    }
    addMessage(sender, receiver, content, user){
      const c ='You have new message from '+user
        return new Promise((resolve, reject) =>{
            this.con.query(CHAT.ADD_MESSAGE, [sender, receiver, sender, receiver, content,
                 receiver, sender, sender, receiver, content])
            .then((rows) => {
                if(isEmpty(rows)) throw new Error('ERROR: Please try again later')
                return this.con.query(USER.ADD_NOTIFICATION, [c,receiver])
            })
            .then(() =>  resolve())
            .catch(err => reject(err))
        })
    }

    Messages(sender, receiver){
      let message = ''
        return new Promise((resolve, reject) =>{
            this.con.query(CHAT.GET_MESSAGES, [sender, receiver])
            .then((rows) => {
              console.log(rows)
                this.messages = []
                rows.forEach((messages) => {
                    this.messages.push({
                        id: messages.id,
                        sender_id: messages.sender_id,
                        sender: messages.sender,
                        receiver_id: messages.receiver_id,
                        receiver: messages.receiver,
                        content: messages.content,
                        date: messages.creation,
                        profilePic: messages.profile_pic,
                        connected: messages.is_connection,
                        seen: messages.seen
                    })
                    message = this.messages
                })
                this.con.query('UPDATE `users_messages` SET `seen`=1 WHERE `sender_id`=? AND `receiver_id`=?', [receiver, sender])
            })
            .then(() =>  resolve(message))
            .catch(err => reject(err))
        })

    }

    getHeaderChat(id){
        return new Promise((resolve, reject) =>{

            this.con.query(CHAT.GET_CHAT, [id])
            .then((rows) =>{
                this.head = []
                rows.forEach((row) =>{
                    this.head.push({
                        firstaneme: row.firstname,
                        lastname: row.lastname,
                        username: row.username,
                        lastConnection: row.last_connection,
                        isConnected: row.is_connection,
                        profilePic: row.profile_pic,
                    })
                })
                return resolve(this.head)
            })
            .catch(err => reject(err))
        })
    }
}

module.exports = Chat
