<template>
  <div id="wrapper">
    <navbar v-bind:logged="authenticated"
     @logout="logout"
     class="fixed-value"
     v-bind:cnt="num"
      v-bind:cnum="cnum"
     v-bind:notif="notif"
     />
    <b-container v-bind:class="this.classBase" v-bind:style="{
      'background-image': 'url(' + image + ')',
      'background-repeat': 'no-repeat',
      'background-attachment': 'fixed',
      'background-position': 'center',
      'background-size': 'cover'
    }" fluid>
      <router-view
        @authenticated="setAuthenticated"
        v-bind:authenticated="authenticated"
        @logout="logout"
        v-bind:socket="socket"
        v-bind:profileComplete="profileComplete"
       >
       <div v-if="notif">
         {{toast()}}
       </div>
     </router-view>
     </b-container>
    <Footer />
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import isEmpty from '@/outils/empty/isEmpty'
import User from '@/services/User'
import router from '@/router'
import io from 'socket.io-client'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faHeart as farHeart
} from '@fortawesome/free-regular-svg-icons'
import {
  faPaperPlane, faSpinner, faCog,
  faHeart, faCode, faArchway, faBell,
  faTimes, faArrowDown, faArrowUp,
} from '@fortawesome/free-solid-svg-icons'
library.add([
  faHeart, farHeart, faTimes, faArrowDown, faArrowUp,
  faSpinner, faArchway, faCode,
  faPaperPlane, faCog, faBell,
])
export default {
  name: "App",
  components: {
    'navbar': NavBar,
    'Footer': Footer,
  },
  data () {
    return {
      classBase: 'fill-space',
      image: require('./assets/backgrouds/thomas-broeker-N4gL9yh_g9U-unsplash.jpg'),
      authenticated: false,
      socket: null,
      user: '',
      notif: '',
      num: 0,
      profileComplete: false,
      cnum: null
    }
  },
  computed:{
  },
  methods: {
    verifyValues () {
      const userLogged = localStorage.getItem('userLogged')
      const userID = localStorage.getItem('userID')
      return (!isEmpty(userLogged) && userLogged && !isEmpty(userID))
    },
    setNull () {
     this.authenticated = false
     localStorage.removeItem('userLogged')
     localStorage.removeItem('userID')
   },
    setAuthenticated (response) {
      this.authenticated = true
       this.user = response.data.user || response.data.data
      localStorage.setItem('userLogged', true)
      localStorage.setItem('userID', this.user.id)

    },
    toast() {
      const h = this.$createElement
       // Increment the toast count
      const vNodesMsg = h(
          'p',
          { class: ['text-center', 'mb-0'] },
          [
            h('b-spinner', { props: { type: 'grow', small: true } }),
            h('strong', {},   this.notif),
            h('b-spinner', { props: { type: 'grow', small: true } })
          ]
        )
        this.$bvToast.toast([vNodesMsg], {
          title: 'Notification',
           variant: 'info'
        })
        this.notif = ""
      },
    logout(){
        let id = localStorage.getItem('userID')
        this.socket.emit('logout', {reciever: id});
        User.logout()
        this.setNull()
        router.push('/login')
    },
  },
  created () {
    // this.$store.dispatch('login').
    if(this.authenticated == true){
    User.Getnotifications()
    .then((result) => {
      this.num = result.data[0].count
      this.cnum = result.data[1].m
    })
  }
    const User_id = localStorage.getItem('userID')
    const jToken = localStorage.getItem('authToken')
    if(!isEmpty(User_id) && !isEmpty(jToken))
      this.socket = io('http://localhost:4242/', { query: {user: User_id, token : jToken}});
    this.authenticated = this.verifyValues()
    if(this.authenticated) this.authenticated = true
  },
  beforeMount(){
    if(this.authenticated == true){
    User.get()
    .then((re) => {
      if (re == -1) this.logout()
      else if(re.data.user.profileComplete === 1){
            this.profileComplete = true
          }
      })
    this.socket.on('disconnect',  () => {
      alert("Server Down Sorry!!")
    })
    this.socket.on('Notification',  (message) => {
      this.notif = message.message
      this.num += 1
      if (message.sym == 1)
        this.cnum += 1
    })
  }
  }
}
</script>
<style scoped>
#wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.fill-space {
  flex:1;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  flex: 1 100%;
}
.fill-space-horizontal {
  flex:1;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: row;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  flex: 1 100%;
}
</style>
