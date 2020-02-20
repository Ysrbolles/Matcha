<template>
  <div class="max-height-600">
    <b-carousel
      id="carousel1"
      style="text-shadow: 1px 1px 2px #333;"
      controls
      indicators
      background="#ababab"
      :interval="9000"
      img-width="100%"
      img-height="100%"
      v-model="slide"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide
        v-for="(pic, index) in pictures"
        v-bind:key="index"
        v-model="current"
        v-bind:img-src="getPath(pic)"
        class="max-height-600"
      >
      </b-carousel-slide>
    </b-carousel>
    <p class="text-white mt-2 max-height-600">

      <b-button pill size="lg" v-if="isProfile && pictures.length >= 0" variant="danger" @click="deletePicture(pictures[slide])">X Delete</b-button>
      <b-button pill size="lg" v-if="isProfile && pictures.length >= 0" variant="dark" @click="putProfile(pictures[slide])">Put Profile Picture</b-button>
    </p>
  </div>
</template>
<script>
import User from '@/services/User'
import router from'@/router'
export default {
  name: 'Carousel',
  props: ['pictures', 'isProfile'],
  data () {
    return {
      slide: 0,
      sliding: null,
      current: '',
      sllide: ''
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sllide = (slide)
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sllide = (slide)
      this.sliding = false
    },
    deletePicture (pic) {
      User.deletePicture({ 'filename': pic })
        .then(() => {
          this.$emit('deletePicture')
          location.reload() })
        .catch(() => {})

    },
    putProfile(pic){
      User.putProfile({'filename': pic})
      .then(() => {

         this.$emit('putProfile')
       router.push('/profile')
         location.reload()
     })
      .catch(() => {})
    },
    getPath (path) {
      return 'http://localhost:4242/assets/' + path }
  }
}
</script>
<style>
.carousel-caption {
    height: 80px;
    right: 0;
    top: -15px;
    left: 65px;
    text-align: left;
}
.max-height-600 {
  max-height: 600px;
}
</style>
