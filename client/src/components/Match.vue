<template>
    <b-card
      class="size-max-md"
      v-bind:title="person.firstname.charAt(0).toUpperCase() + person.firstname.slice(1) + ' '+person.lastname.charAt(0).toUpperCase() + person.lastname.slice(1) "
      v-bind:subTitle="'Age: ' + person.age"
      v-bind:img-src="profilePic"
      img-fluid
      img-alt="image"
      img-top
  >
        <b-badge v-if="person.is_connected === 1" variant="success">Online</b-badge>
        <b-badge v-else >Seen: {{ getDate }}</b-badge>
      <p class="card-text" >
        <b-button v-bind:href="profilePath">View profile</b-button>
      </p>
      <p class="card-text">
      <v-rating  v-bind:popul="person.popularity"/>
      </p>
      <div class="d-flex justify-content-around flex-wrap mb-2">
        <b-badge
          class="mb-2"
          v-for="interest in person.interests"
          v-bind:key="interest"
          v-bind:variant="colors"
        >
        {{ interest }}
        </b-badge>
      </div>
      <v-matchbutton
        v-bind:id="person.id"
        v-on:like="like"
        v-on:block="block"
      />
  </b-card>
</template>

<script>
import MatchButton from '@/components/MatchButton'
import formatDate from '@/services/DateFormat'
import Rating from '@/components/n_rating'
export default {
  name: 'Match',
  components: {
    'v-matchbutton': MatchButton,
    'v-rating': Rating
  },
  props: ['person'],
  data () {
    return {
      interests: [],
      colors: 'dark'
    }
  },
  computed: {
    profilePath () {
      return '/viewprofile?id=' + this.person.id
    },
    profilePic () {

      return 'http://localhost:4242/assets/' + this.person.profilePic
    },
     getDate () { return formatDate.messageDate(this.person.last_connection) }
  },
  methods: {
    like (personId) {
      this.$emit('like', personId)
    },
    block (personId) {
      this.$emit('block', personId)
    }
  }
}
</script>
<style scoped>
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
