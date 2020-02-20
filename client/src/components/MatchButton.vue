<template>
  <b-row class="justify-content-center" id="match-btn">
    <b-col class="text-right">
      <b-button v-if="!liked" class="rounded-circle" variant="outline-danger" v-on:click="like">
        <font-awesome-icon :icon="['far', 'heart']"/>
      </b-button>
      <b-button v-else class="rounded-circle unlikebaby" variant="danger" v-on:click="unlike">
        <font-awesome-icon :icon="['far', 'heart']"/>
      </b-button>
    </b-col>
    <b-col class="text-left">
      <b-button v-if="!blocked" class="rounded-circle" variant="outline-warning" v-on:click="block">
        <font-awesome-icon :icon="['fas', 'times']"/>
      </b-button>
      <b-button v-else class="rounded-circle" variant="warning" v-on:click="unblock">
        <font-awesome-icon :icon="['fas', 'times']"/>
      </b-button>
    </b-col>
  </b-row>
</template>
<script>


export default {
  name: 'MatchButton',
  props: {
    'id': {
      type: [String, Number],
      required: true
    },
    liked: {
      type: Boolean,
      default: false
    },
    blocked: {
      type: Boolean,
      default: false
    },
    col: Boolean,
    socket: Object
  },
  methods: {
    like () {
      
         this.$emit('like', this.id)
 
    },
    block () { this.$emit('block', this.id) },
    unblock () { this.$emit('unblock', this.id) },
     unlike () {
        this.$emit('unlike', this.id)
    }
  }
}
</script>
<style>
#match-btn .text-left .rounded-circle:hover {
  color: white;
}
</style>
