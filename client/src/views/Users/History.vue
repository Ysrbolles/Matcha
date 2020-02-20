<template>
  <div>
  <b-list-group  v-for="(item, index) in items"
  v-bind:key="index" v-bind:user="item" >
  <b-list-group-item :href="profilePath(item.id_ss)" variant="dark"><label class="font-weight-bold">{{item.user}}</label>    <small class="font-italic">{{item.Time}}</small></b-list-group-item>
  </b-list-group>
</div>
</template>
<script>
import User from '@/services/User'
export default {
  props: ['cnt'],
  name: 'Match',
  data(){
    return {
      items: [],
      id: ''
    }
  },
  methods: {
    profilePath (id) {
      return '/viewprofile?id=' + id
    },
  },
  created(){
    const num = 0
    this.$emit('num', num)
    User.History()
    .then((result) => {
      this.items = result.data
      this.id = result.data.id_user
    })
  }
}
</script>
<style>
.list-group{
  width: 60%;
  padding: 5px;
  margin: 0 auto;
  text-align: center;

}
</style>
