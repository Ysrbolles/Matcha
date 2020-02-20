<template>
  <b-container fluid>
    <b-row >
      <b-col>
        <div>
          <label class="t" v-for="item in length" v-bind:key="item">
            <i class="fas fa-star" v-if="item <= res"></i> 
            <i class="far fa-star" v-else></i>
          </label>
        </div>
          <!-- <h1>{{res}}</h1> -->
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css'
import User from '@/services/User'

export default {
  name: 'Footer',
  props: ['popul'],
  data () {
    return {
      num: '',
      res:'',
      etoiles: '',
      length: 5
    }
  },
  mounted(){
 
    User.Count()
    .then((result) => {
      this.num = result.data[0].num
      this.res = (this.popul * 5) / this.num
      for(var i = 0; i < 5; i++)
      {
        if(i <= this.res)
          this.etoiles += '<i class="fas fa-star"></i>'
        else
          this.etoiles += '<i class="far fa-star"></i>'
      }
    })
  }
}
</script>
<style scoped>
.footer {
  min-height: 50px;
}
.c-text {
  margin-top: 10px;
  margin-bottom: 0;
}
.t{
  justify-content: center;
}
</style>
