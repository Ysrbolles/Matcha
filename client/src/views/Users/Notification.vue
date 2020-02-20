<template>
  <div>
  <b-list-group v-for="(item, index) in items"
  v-bind:key="index" v-bind:user="item" >
  <b-list-group-item :href="profilePath(item.id_user)" variant="dark" class="animated tada delay-1s">
    <label class="font-weight-bold">{{item.notification}}</label>
      <span class="font-italic">{{ getDate(item.Time)}}</span></b-list-group-item>

</b-list-group>
</div>
</template>
<script>
import User from '@/services/User'
import formatDate from '@/services/DateFormat'
export default {
  props: ['cnt'],
  name: 'Notification',
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
      getDate (item) { return formatDate.historyDate(item) }
  },
  created(){
    const num = 0
    this.$emit('num', num)
    User.Notification()
    .then((result) => {
      this.items = result.data
      this.id = result.data.id_user
      window.console.log(result.data)
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
