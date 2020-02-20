<template>
  <b-container>
    <transition-group name="list-complete" tag="div" class="row">
      <v-match
        v-for="person in persons"
        v-bind:key="person.id"
        v-bind:person="person"
        v-on:like="like"
        v-on:block="block"
        class="list-complete-item"
      ></v-match>
    </transition-group>
  </b-container>
</template>

<script>
import User from '@/services/User'
import _ from 'lodash'
import router from '@/router'
import FastMatch from '@/components/FastMatch'
export default {
  name: 'FastMatch',
  props: ['authenticated', 'profileComplete', 'socket'],
  components: {
    'v-match': FastMatch
  },
  data () {
    return {
      match: [],
      persons: [],
      filters: { is_match: '0' },
      sort: ''
    }
  },
  methods: {
    getInitialUsers () {
      User.getAll({ filters: this.filters, sort: this.sort })
        .then(success => {
          this.match = _.shuffle([...success.data])
          this.persons = this.match.splice(0, 6)
        })
    },
    del (id) {
      this.persons = this.persons.filter(person => person.id !== id)
    },
    add () {
      const add = this.match.shift()
      this.persons.push(add)
    },
    like (id) {
      const userID = localStorage.getItem('userID')
      User.like(userID, id)
        .then(success => {
            success
          this.del(id)
          this.add()
          if(success.data['result'] == 0)
            this.socket.emit('Notification', {message: 'like',reciever: id});
          else
            this.socket.emit('Notification', {message: 'Match',reciever: id, sender:userID, sender_name: success.data['user']});
        })
        .catch(() => {})
    },
    block (id) {
      const userID = localStorage.getItem('userID')
      User.block(userID, id)
        .then(success => {
            success
          this.del(id)
          this.add()
        })
        .catch(() => {})
    }
  },
  beforeMount () {
    if (this.authenticated === false) router.push('/')
    User.get()
      .then(success => {
        if (success.data.user.profileComplete == false || success.data.user.profilePic === null) router.push('/Profile')
        else {
          this.$emit('authenticated', success)
          this.getInitialUsers()
        }
      })
      .catch(() => {})
  }
}
</script>
<style scoped>
.list-complete-item {
  transition: all 1s;
}
.list-complete-enter, .list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
