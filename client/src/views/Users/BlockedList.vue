
<template>
<b-row>
        <b-row class="justify-content-sm-center w-100 pt-5 m-0">
          <b-col col md="12" lg="10" class="m-0 px-0">
            <transition-group name="list-complete" tag="div" class="card-columns">
              <v-match
                v-for="(person, index) in persons"
                v-bind:key="`person.id-${index}`"
                v-bind:person="person"
                class="list-complete-item"
              />
            </transition-group>
          </b-col>
        </b-row>
         <b-row v-if="persons.length == 0" class="justify-content-sm-center w-100 pt-5 m-0">
          <b-col col md="12" lg="10" class="m-0 px-0">
            <b-jumbotron header="No user Blocked">

            </b-jumbotron>
          </b-col>
        </b-row>
</b-row>
</template>

<script>
import User from '@/services/User'
import Match from '@/components/BlockButton'

export default {
  name: 'Match',
  props: ['socket','profileComplete'],
  components: {
    'v-match': Match,
  },

  data(){
    return{

      persons: [],
    }
  },
   created(){
     User.getBlocked()
      .then(success => {
        this.persons =  [...success.data]

      })
    .catch((err) => (err))
  },
}
</script>

<style scoped>


.card-columns {
 	background-color: rgba(0,0,0,0.4) !important
}
.form-control {
  background-color: #ffffff2e;
  border: 1px solid #dacece00;
  color: #e6e6e6;
}
.form-control:focus {
    color: #dae0e6;
    border-color:transparent;
    outline: 0;
    -webkit-box-shadow: 0 0 0 0.2rem rgba(121, 121, 121, 0.25);
    box-shadow: 0 0 0 0.2rem rgba(121, 121, 121, 0.25);
}
::-webkit-input-placeholder {
    color:    rgb(148, 148, 148);
}
:-moz-placeholder {
    color:    rgb(148, 148, 148);
}
::-moz-placeholder {
    color:    rgb(148, 148, 148);
}
:-ms-input-placeholder {
    color:    rgb(148, 148, 148);
}

@media (min-width: 992px) {
  .card-columns {
    column-count: 4;
  }
}
</style>
