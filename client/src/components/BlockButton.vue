<template>
<div>
    <b-card
      class="size-max-md"
      v-bind:title="person.firstname.charAt(0).toUpperCase() + person.firstname.slice(1) + ' '+person.lastname.charAt(0).toUpperCase() + person.lastname.slice(1) "
      v-bind:img-src="profilePic"
      img-fluid
      img-alt="image"
      img-top
  >
      <p >
        <b-row>
          
      <b-col>
        <b-button variant="warning" @click="unblock">Unblock</b-button>
      </b-col>
      </b-row>
      </p>
  </b-card>
</div>
</template>

<script>
import User from '@/services/User'

export default {
  name: 'BlockButton',
  components: {

  },
  props: ['person', 'socket'],
  computed: {
    profilePath () {
      return '/viewprofile?id=' + this.person.id
    },
    profilePic () {
      return 'http://localhost:4242/assets/' + this.person.profile_pic
    },


  },
  methods: {
      unblock () {
      const userID = localStorage.getItem('userID')
      User.unblock(userID, this.person.id)
        .then(success => {
          success

          })
        .catch(() => {})
         location.reload()
    },
  }
}
</script>
<style scoped>
.card{

			border-radius: 15px !important;
			background-color: rgba(0,0,0,0.4) !important;
      color: aliceblue
		}
.rounded-circle {
  height: 50px;
  width: 50px;
  font-size: 22px;
  padding: 0;
  margin: 0;
}
.btn-outline-warning:hover {
  color:white;
}
.size-max-md {
  max-width: 20rem;
}
</style>
