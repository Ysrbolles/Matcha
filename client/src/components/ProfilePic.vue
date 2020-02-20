<template>
  <b-container v-bind:style="{
    'background-image': 'url(' + getPath(profilePic) + ')',
    'background-repeat': 'no-repeat',
    'background-position': 'center',
    'background-size': 'cover',
    'height': '143px',
    'width': '40%',
    'border-radius': '60%'
  }" fluid>
</b-container>
</template>

<script>
import isEmpty from '@/outils/empty/isEmpty'
export default {
  name: 'ProfilePic',
  props: ['profilePic'],
  data () {
    return {
       img: '../assets/logo.png',
       mainProps: {
        center: true,
        blankColor: '#bbb', width: 200, height: 200,
        },
    }
  },
  methods: {
    getPath (path) {
      if(isEmpty(path)) return 'http://localhost:4242/assets/profilepic.png'
      else
        return 'http://localhost:4242/assets/' + path }
  }
}
</script>
