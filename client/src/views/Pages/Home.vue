<template>
    <b-container fluid class="h-100">
      <div v-if="authenticated == false" >

        <b-row class="justify-content-md-center">
            <b-col lg="4" xl="3" cols="12" md="8">
              <b-card class="mt-5">
                <b-card-header class="pb-2 mb-3">
                  <b-row>
                    <b-col cols="2" class="p-0">
                      <font-awesome-icon icon="code" size="2x"/>
                    </b-col>
                    <b-col cols="10">
                      <h4>Make every single moment count.</h4>
                    </b-col>
                  </b-row>
                </b-card-header>
                <p class="card-text">
                  All members are personally confirmed by our staff to prove they are real.
                  Receive lots of attention from attractive members.
                </p>
                <p class="card-text">
                  Chat, send letters, call, share your photos and make presents.
                </p>
              </b-card>
            </b-col>
        </b-row>

      </div>
      <div v-else>
        <GmapMap
        v-bind:center="center"
        v-bind:zoom="5"
        style="width: 100%; height: 800px; border: 10px;"
        >
        <div  class="icon">
        <GmapMarker

        v-for="(m, index) in markers"
         v-bind:key="index"
        v-bind:position="m.position"
        v-bind:icon="m.icon"
        :title="m.title"
        v-bind:clickable="true"
        v-bind:draggable="false"
        />
        </div>
      </GmapMap>
    </div>
    </b-container>
</template>
<script>
import User from '@/services/User'
import router from '@/router'
export default {
  name: 'Home',
  props: ['socket','authenticated'],
  data(){
    return {
      img: 'http://localhost:4242/assets/back.jpg',
      center: { lat: 32.8807922, lng: -6.9873336},
      markers: [
        { position: { lat: 32.8807922, lng: -6.9873336}},

      ],
    }

  },
  methods: {
    profilePath (id) {
      if(this.authenticated === true)
           router.push('/viewprofile?id=' + id)

    },
},
  created()
  {
    User.getAllII()
    .then((suc) => {
      for(let i = 0; i< suc.data.length; i++){
      this.markers.push({position: {lat: parseFloat(suc.data[i].latitude),lng: parseFloat(suc.data[i].longitude)} ,
       icon: {
             url: "http://localhost:4242/assets/"+suc.data[i].profilePic,
            size: {width: 100, height: 100, f: 'px', b: 'px',},
            scaledSize: {width: 30, height: 30, f: 'px', b: 'px'},
          },
           title: suc.data[i].username,
           id: suc.data[i].id
                  })
      }

    })
  }
}
</script>
<style scoped>
h4 {
  color: white;
}
.container{
  background-color: yellow;
  width: 100%;
  height: 100%;
}
.card{
		color: aliceblue;
			border-radius: 15px !important;
			background-color: rgba(0,0,0,0.4) !important;
		}

.card-header {
  border-bottom: 1px solid rgb(154, 157, 160);
}
.icon{
 background: red;
 border-radius: 15px;
}
</style>
