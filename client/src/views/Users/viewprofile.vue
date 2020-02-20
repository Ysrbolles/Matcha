<template>

  <b-container fluid class="h-100">
    <div v-if="socket.message" class="animated slideInLeft delay-1s alert alert-warning alert-dismissible fade show" style="width:30%;" id="notification" role="alert">
    <strong>Notification</strong><br>{{socket.message}}
    <button type="button" class="close" data-dismiss="alert" @click="out()" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
      <b-card-group deck class="shadow m-auto" style="width:54%">
        <b-card class="bg-dark-transparent grey lighten-5">
            <v-card
              class="mx-auto"
              max-width="1000"
              tile
            >
              <v-img
                height="100%"
                src="https://images.wallpapersden.com/image/download/scheme-lines-dark_2289_1920x1080.jpg"
              >

                <v-row
                  align="center"
                  class="fill-height"
                >
                  <v-col
                    align-self="end"
                    class="pa-0"
                    cols="12"
                  >
                <ProfilePic v-bind:profilePic="input.profilePic"/>
          </v-col>

          <v-col  class="white--text" align="center">
            <div class="display-4" >{{input.lastname + ' ' + input.firstname}}</div>
          </v-col>

        </v-row>
      </v-img>

    </v-card>
    <div class="card-text">
          <template v-if="input.is_connection === 1">
            <b-badge variant="success">Online</b-badge>
          </template>
          <template v-else>
            <p>Last connection: {{ getDate }}</p>
          </template>
            <n-rating v-bind:popul="input.popularity"/>
        </div>
 <b-col  cols="12">
      <b-row>
    <v-matchbutton v-bind:id="parseInt(input.id)"
          v-bind:liked="liked"
          v-bind:blocked="blocked"
          v-on:like="like"
          v-on:unlike="unlike"
          v-on:block="block"
          v-on:unblock="unblock"
         />

        <b-col md="6" class="p-0 mt-2">
          <v-load
              v-bind:loadingState="loadingReport"
              message="Report user"
              variant="warning"
              v-on:update="report"
          />
        </b-col>

      </b-row>
    </b-col>

  <b-tabs pills card vertical nav-wrapper-class="w-20">
    <b-tab  bg-variant="secondary" text-variant="white" header="Secondary" title="Apropos" active>
        <p class="font-weight-bold">{{input.username}}</p>
        <p  class="font-italic">{{input.firstname}}</p>
        <p class="font-italic">{{input.lastname}}</p>
        <p>{{input.age}} years </p>
        <b-badge
              class="ml-1 mb-1"
              v-for="(tags) in input.interests"
              v-bind:key="tags"
            >
              {{ tags }}
            </b-badge>
    </b-tab>
    <b-tab title="Pictures">
       <b-col md="6" v-if="input.pictures.length > 0">
            <v-carousel isProfile="true" v-bind:pictures="input.pictures"></v-carousel>
          </b-col>
      </b-tab>
    <b-tab title="Biography"><p class="font-weight-bold">{{input.biography}}</p></b-tab>
    <b-tab title="Location">
      <GmapMap v-if="input.latitude && input.longitude"
      v-bind:center="center"
      v-bind:zoom="7"
      style="width: 100%; height: 300px"
      >
      <GmapMarker
      v-bind:key="index"
      v-for="(m, index) in markers"
      v-bind:position="m.position"
      v-bind:clickable="false"
      v-bind:draggable="false"
      />
      </GmapMap>
    </b-tab>
  </b-tabs>
</b-card>
</b-card-group>
</b-container>
</template>
<script>
import 'animate.css'
import '@fortawesome/fontawesome-free/css/all.css'
import User from '@/services/User'
import isEmpty from '@/outils/empty/isEmpty'
import Carousel from '@/components/ProfileCarousel'
import MatchButton from '@/components/MatchButton'
import isNumeric from '@/outils/string/isNumeric'
import router from '@/router'
import ProfilePic from '@/components/ProfilePic'
import BtnLoading from '@/components/BtnLoading'
import formatDate from '@/services/DateFormat'
import _ from 'lodash'
import rating from '@/components/n_rating'
export default {
    name: 'viewprofile',
    components: {
       'v-carousel' : Carousel,
       'v-matchbutton': MatchButton,
       'ProfilePic': ProfilePic,
       'v-load': BtnLoading,
       'n-rating': rating,
    },
    props: ['authenticated','socket', 'profileComplete'],

    data(){
      return {
        center: { lat: '', lng: '' },
        markers: [
          {
            position: { lat: '', lng: ''}
          }
        ],
        uid:null,
        loadingReport: 'false',
        liked: false,
        blocked: false,
        message: false,
        pika: false,
        input: {
                id: null,
                username: null,
                lastname: null,
                firstname: null,
                email: null,
                confirmed: false,
                age: null,
                pictures: [],
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
                last_connection: null
        },
        cover: ''
      }
    },
    methods:{

    out(){
      document.getElementById('notification').className = "animated slideOutLeft  delay-1s alert alert-warning alert-dismissible fade show"
    },
    like(id){
      const userID = localStorage.getItem('userID')
      User.like(userID, id)
        .then(success => {
           this.liked = true
          if (this.blocked === true) this.unblock(id)
          if(success.data['result'] == 0)
            this.socket.emit('Notification', {message: 'like',reciever: id});
          else
            this.socket.emit('Notification', {message: 'Match',reciever: id, sender:userID,sender_name: success.data['user']});
          // this.socket.emit('Notification', {message: 'like',reciever: id});
        })
        .catch(() => {})
    },
    block(id) {
       const userID = localStorage.getItem('userID')
       User.block(userID, id)
        .then(success => {
          success
          this.blocked = true
          if (this.liked === true) this.unlike(id)
        })
    },
     unlike (id) {
      const userID = localStorage.getItem('userID')
      User.unlike(userID, id)
        .then(success => {
          success
          this.liked = false
          this.socket.emit('Notification', {message: 'unlike',reciever: id});
        })
        .catch(() => {})
    },
      unblock (id) {
      const userID = localStorage.getItem('userID')
      User.unblock(userID, id)
        .then(success => {
          success
          this.blocked = false })
        .catch(() => {})
    },
      report () {
      this.loadingReport = 'true'
      const userID = localStorage.getItem('userID')
      User.report(userID, this.input.id)
        .then(success => {
          success
          setTimeout(() => { this.loadingReport = 'complete' }, 1500)
        })
        .catch(() => { setTimeout(() => { this.loadingReport = 'error' }, 1500) })
        .finally(setTimeout(() => { this.loadingReport = 'false' }, 3000))
    },
      setLikes () {
      User.get().then(success => {
        const likes = success.data.user.likes
        _.each(likes, x => {
          if (parseInt(x.id) === parseInt(this.input.id)) this.liked = true
        })
      })
    },
    checkBlock(){
      return new Promise((resolve, reject) =>{
      let pika = false


       User.checkBlocked(this.get.id)
      .then((rows)=>{
         if(!isEmpty(rows)){
          if(rows.data[0].blocker_id == this.get.id && rows.data[0].blocked_id == this.uid ) {
            pika = true
          }
          }

        resolve(pika)
      })
      .catch(err => reject(err))
       })
    }
    },
    computed:{
       getDate () { return formatDate.messageDate(this.input.last_connection) }
    },
    beforeMount () {
    if (this.authenticated === false) router.push('/')
    User.get()
      .then(success => {
        if (success.data.user.profileComplete === 0 || success.data.user.profilePic === null) router.push('/Profile')
        else {
          this.$emit('authenticated', success)
          this.setLikes()
        }
      })
      .catch(() => {})
  },
    created(){

      this.get =this.$router.history.current.query
      if(isEmpty(this.get.id) || this.get.id < 0 || this.get.id == 0 || !isNumeric(this.get.id))
        router.push('/')
      User.getID()
      .then(uid=>{
        this.uid = uid
      })
      User.GetUser(this.get)
      .then((res) => {
        this.checkBlock()
        .then((ros)=> {
          if(ros === true) {
            this.pika = true
            router.push('/Browse')
          }
          // this.socket.emit('Notification', {message: 'see',reciever: this.get.id});

        })
        window.console.log(this.pika)
        this.socket.emit('Notification', {message: 'see',reciever: this.get.id});
        if(!isEmpty(res.data)){
        this.input = res.data
        this.center.lat = res.data.latitude
        this.center.lng = res.data.longitude
        this.markers[0].position.lat = res.data.latitude
        this.markers[0].position.lng = res.data.longitude
      }else {
          router.push('/')
      }
      })
      .catch((Er) => (Er))



    },

  }

</script>
<style>

.card.bg-dark-transparent {
 background-color: rgba(0,0,0,0.4) !important;
 color: white;

}
.white--text{
  color: white;

}
.b-form-filet{
  display: none;
}
</style>
