
<template>
        <b-row
      v-if="contentReady === true"
      class="justify-content-md-center self-align-start bg-dark-transparent"

    >
        <b-row class="justify-content-md-center .bg-dark-transparent w-100 pb-2 m-0">
          <b-col col md="12" lg="10">
            <b-row>
              <b-col md="2"><p class="text-white">Sort by :</p></b-col>
              <b-col md="10">
                <template v-for="option in sorts">
                  <b-button
                    v-bind:key="option.key"
                    v-model="option.active"
                    @click="setActive(option)"
                    variant="outline-info"
                    class="mr-2 mb-2"
                    v-bind:class="{'active': option.active }"
                  > {{ option.name }}</b-button>
                </template>
                <b-button @click="changeSort">
                  <font-awesome-icon v-if="ascendant === false" :icon="['fas', 'arrow-up']"/>
                  <font-awesome-icon v-else :icon="['fas', 'arrow-down']"/>
                </b-button>
              </b-col>
            </b-row>
            <b-row class="mt-4">
              <b-col md="2">
                <p class="text-white">Filters :</p>
                <b-button
                  variant="info"
                  @click="getInitialUsers"
                >
                  Filter
                </b-button>
              </b-col>
              <b-col md="10">
                <b-row>
                  <template v-for="(value, key, index) in filters">
                    <b-form-group
                      class="col-md-2 text-white"
                      :key="key"
                      :id="'fieldset' + index"
                      :label="'Enter ' + key.split('_').reverse().join(' ')"
                      :label-for="key + index"
                  >
                    <b-input
                      :id="key + index"
                      v-bind:key="key"
                      v-model="filters[key]"
                      type="number"
                      v-bind:min="getMin(key)"
                      v-bind:max="getMax(key)"
                      variant="outline-info"
                    >
                    </b-input>
                  </b-form-group>
                  </template>
                   <label  class="col-md-2 text-white">Intrests</label>
                     <v-multiselect v-model="value"
                      tag-placeholder="Add this as new tag"
                        placeholder="Search or add a tag"
                        label="name" track-by="code"
                        :options="options" :multiple="true"
                        :taggable="true" @tag="addTag"
                        >
                     </v-multiselect>
                </b-row>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="justify-content-sm-center w-100 pt-5 m-0">
          <b-col col md="12" lg="10" class="m-0 px-0">
            <transition-group name="list-complete" tag="div" class="card-columns">
              <v-match
                v-for="(person, index) in persons"
                v-bind:key="`person.id-${index}`"
                v-bind:person="person"
                v-on:like="like"
                v-on:block="block"
                class="list-complete-item"
              />
            </transition-group>
          </b-col>
        </b-row>
        <b-row v-if="persons.length == 0" class="justify-content-sm-center w-100 pt-5 m-0">
          <b-col col md="12" lg="10" class="m-0 px-0">
            <b-jumbotron header="No user found">
              <p>Please change your filters</p>
            </b-jumbotron>
          </b-col>
        </b-row>

    </b-row>

</template>

<script>
import User from '@/services/User'
import router from '@/router'
import _ from 'lodash'
import Match from '@/components/Match'
import Multiselect from 'vue-multiselect'

export default {
  name: 'Match',
  components: {
    'v-match': Match,
    'v-multiselect': Multiselect
  },
  props: ['authenticated', 'profileComplete', 'socket'],
  data(){
    return{
      matches: [],
      persons: [],
       value: [],
      options: [],
      intrests: [],
      ascendant: true,
      contentReady: false,

      img: '',
      filters: {
        age_min: 18,
        age_max: 99,
        distance_min: 0,
        distance_max: '',
        popularity_min: 0,
        popularity_max: '',

      },
      sorts: [
        { name: 'age', active: false },
        { name: 'popularity', active: false },
        { name: 'distance', active: false },
        { name: 'interests', active: false },
        { name: 'default', active: true }
      ]
    }
  },
  beforeMount () {


    if (this.authenticated === false) router.push('/')
    User.get()
      .then(success => {
          if (success.data.user.profileComplete == false || success.data.user.profilePic === null) router.push('/Profile')
          else{
          this.$emit('authenticated', success)
          this.getInitialUsers()
          }

      })
      .catch(() => {})
  },
mounted () {
    this.scroll(this.persons)

  },
   created(){

    User.getTags()
    .then((result) => {
      result.data.forEach(element => {
        this.options.push({
            'name':element['tags'],
            'code':element['tags']
            })
      })
    })
    .catch((err) =>(err))
  },

    methods: {
         addTag (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.value.push(tag)

    },
      getInitialUsers () {
      const filters = new Array(this.filters)
       if (this.value){
            this.intrests = this.value.map(itm => '#'+itm.code)
      }
      User.getAll({
        'filter': filters,
        'sort': this.getSort(),
        'inter': this.intrests,
        'match': 0
      })
      .then(success => {
        this.matches = this.ascendant ? [...success.data] : [...success.data].reverse()
        this.persons = this.matches.splice(0,20)

        this.contentReady = true
      })
    },
      getSort () {
      const sort = _.find(this.sorts, o => o.active === true).name
      return sort === undefined ? '' : sort
    },
      setActive (option) {
      if (this.getSort() !== option.name) {
        _.map(this.sorts, o => { o.active = o.name === option.name })
        this.getInitialUsers()
      }
    },
    changeSort () {
      this.ascendant = !this.ascendant
      this.getInitialUsers()
    },
      getMin (key) {
       if (key < 'age_min' || key === 'age_max') return 18
      if (key === 'popularity_min' || key === 'popularity_max') return 0
      return 0
    },
    getMax (key) {
      if (key === 'age_min' || key === 'age_max') return 99
     if (key === 'popularity_min' || key === 'popularity_max') return 5000
      return 10000
    },
    getHeight () {
      let e = document.documentElement
      return e.scrollHeight - e.scrollTop - e.clientHeight < 40
    },
    scroll () { window.onscroll = () => { if (this.getHeight()) { this.add(2) } } },
     add (number) {
      for (let a = 0; a < number; a++) {
        if (this.matches.length !== 0) {
          const add = this.matches.shift()
           this.persons.push(add)
        }
      }
    },
   del (id) { this.persons = this.persons.filter(person => person.id !== id) },

    like(id){
      const userID = localStorage.getItem('userID')
      User.like(userID, id)
        .then(success => {
          this.del(id)
          this.add(1)
          if(success.data['result'] == 0)
            this.socket.emit('Notification', {message: 'like',reciever: id});
          else
            this.socket.emit('Notification', {message: 'Match',reciever: id, sender:userID,sender_name: success.data['user']});
        })
        .catch(() => {})
    },
    block(id) {
       const userID = localStorage.getItem('userID')
       User.block(userID, id)
        .then(success => {
          success
          this.del(id)
          this.add(1)
        })
    }

    }

}
</script>

<style scoped>

.multiselect__spinner {
  position: absolute;
  right: 1px;
  top: 1px;
  width: 48px;
  height: 35px;
  background: #fff;
  display: block;
}
.multiselect__spinner:before,
.multiselect__spinner:after {
  position: absolute;
  content: "";
  top: 50%;
  left: 50%;
  margin: -8px 0 0 -8px;
  width: 16px;
  height: 16px;
  border-radius: 100%;
  border-color: #41b883 transparent transparent;
  border-style: solid;
  border-width: 2px;
  box-shadow: 0 0 0 1px transparent;
}
.multiselect__spinner:before {
  animation: spinning 2.4s cubic-bezier(0.41, 0.26, 0.2, 0.62);
  animation-iteration-count: infinite;
}
.multiselect__spinner:after {
  animation: spinning 2.4s cubic-bezier(0.51, 0.09, 0.21, 0.8);
  animation-iteration-count: infinite;
}
.multiselect__loading-enter-active,
.multiselect__loading-leave-active {
  transition: opacity 0.4s ease-in-out;
  opacity: 1;
}
.multiselect__loading-enter,
.multiselect__loading-leave-active {
  opacity: 0;
}
.multiselect,
.multiselect__input,
.multiselect__single {
  font-family: inherit;
  font-size: 16px;
  touch-action: manipulation;
}
.multiselect {
  box-sizing: content-box;
  display: block;
  position: relative;
  width: 40%;
  min-height: 40px;
  text-align: left;
  color: #35495e;
}
.multiselect * {
  box-sizing: border-box;
}
.multiselect:focus {
  outline: none;
}
.multiselect--disabled {
  background: #ededed;
  pointer-events: none;
  opacity: 0.6;
}
.multiselect--active {
  z-index: 50;
}
.multiselect--active:not(.multiselect--above) .multiselect__current,
.multiselect--active:not(.multiselect--above) .multiselect__input,
.multiselect--active:not(.multiselect--above) .multiselect__tags {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.multiselect--active .multiselect__select {
  transform: rotateZ(180deg);
}
.multiselect--above.multiselect--active .multiselect__current,
.multiselect--above.multiselect--active .multiselect__input,
.multiselect--above.multiselect--active .multiselect__tags {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.multiselect__input,
.multiselect__single {
  position: relative;
  display: inline-block;
  min-height: 20px;
  line-height: 20px;
  border: none;
  border-radius: 5px;
  background: #fff;
  padding: 0 0 0 5px;
  width: 50%;
  transition: border 0.1s ease;
  box-sizing: border-box;
  margin-bottom: 8px;
  vertical-align: top;
}
.multiselect__input::placeholder {
  color: #35495e;
}
.multiselect__tag ~ .multiselect__input,
.multiselect__tag ~ .multiselect__single {
  width: auto;
}
.multiselect__input:hover,
.multiselect__single:hover {
  border-color: #cfcfcf;
}
.multiselect__input:focus,
.multiselect__single:focus {
  border-color: #a8a8a8;
  outline: none;
}
.multiselect__single {
  padding-left: 5px;
  margin-bottom: 8px;
}
.multiselect__tags-wrap {
  display: inline;
}
.multiselect__tags {
  min-height: 40px;
  display: block;
  padding: 8px 40px 0 8px;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  background: #fff;
  font-size: 14px;
}
.multiselect__tag {
  position: relative;
  display: inline-block;
  padding: 4px 26px 4px 10px;
  border-radius: 5px;
  margin-right: 10px;
  color: #fff;
  line-height: 1;
  background: #41b883;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  max-width: 50%;
  text-overflow: ellipsis;
}
.multiselect__tag-icon {
  cursor: pointer;
  margin-left: 7px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  font-weight: 700;
  font-style: initial;
  width: 22px;
  text-align: center;
  line-height: 22px;
  transition: all 0.2s ease;
  border-radius: 5px;
}
.multiselect__tag-icon:after {
  content: "×";
  color: #266d4d;
  font-size: 14px;
}
.multiselect__tag-icon:focus,
.multiselect__tag-icon:hover {
  background: #369a6e;
}
.multiselect__tag-icon:focus:after,
.multiselect__tag-icon:hover:after {
  color: white;
}
.multiselect__current {
  line-height: 16px;
  min-height: 40px;
  box-sizing: border-box;
  display: block;
  overflow: hidden;
  padding: 8px 12px 0;
  padding-right: 30px;
  white-space: nowrap;
  margin: 0;
  text-decoration: none;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  cursor: pointer;
}
.multiselect__select {
  line-height: 16px;
  display: block;
  position: absolute;
  box-sizing: border-box;
  width: 40px;
  height: 38px;
  right: 1px;
  top: 1px;
  padding: 4px 8px;
  margin: 0;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}
.multiselect__select:before {
  position: relative;
  right: 0;
  top: 65%;
  color: #999;
  margin-top: 4px;
  border-style: solid;
  border-width: 5px 5px 0 5px;
  border-color: #999999 transparent transparent transparent;
  content: "";
}
.multiselect__placeholder {
  color: #adadad;
  display: inline-block;
  margin-bottom: 10px;
  padding-top: 2px;
}
.multiselect--active .multiselect__placeholder {
  display: none;
}
.multiselect__content-wrapper {
  position: absolute;
  display: block;
  background: #fff;
  width: 100%;
  max-height: 240px;
  overflow: auto;
  border: 1px solid #e8e8e8;
  border-top: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  z-index: 50;
  -webkit-overflow-scrolling: touch;
}
.multiselect__content {
  list-style: none;
  display: inline-block;
  padding: 0;
  margin: 0;
  min-width: 100%;
  vertical-align: top;
}
.multiselect--above .multiselect__content-wrapper {
  bottom: 100%;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: none;
  border-top: 1px solid #e8e8e8;
}
.multiselect__content::webkit-scrollbar {
  display: none;
}
.multiselect__element {
  display: block;
}
.multiselect__option {
  display: block;
  padding: 12px;
  min-height: 40px;
  line-height: 16px;
  text-decoration: none;
  text-transform: none;

  position: relative;
  cursor: pointer;
  white-space: nowrap;
}
.multiselect__option:after {
  top: 0;
  right: 0;
  position: absolute;
  line-height: 40px;
  padding-right: 12px;
  padding-left: 20px;
  font-size: 13px;
}
.multiselect__option--highlight {
  background: #41b883;
  outline: none;
  color: white;
}
.multiselect__option--highlight:after {
  content: attr(data-select);
  background: #41b883;
  color: white;
}
.multiselect__option--selected {
  background: #f3f3f3;
  color: #35495e;
  font-weight: bold;
}
.multiselect__option--selected:after {
  content: attr(data-selected);
  color: silver;
}
.multiselect__option--selected.multiselect__option--highlight {
  background: #ff6a6a;
  color: #fff;
}
.multiselect__option--selected.multiselect__option--highlight:after {
  background: #ff6a6a;
  content: attr(data-deselect);
  color: #fff;
}
.multiselect--disabled .multiselect__current,
.multiselect--disabled .multiselect__select {
  background: #ededed;
  color: #a6a6a6;
}
.multiselect__option--disabled {
  background: #ededed !important;
  color: #a6a6a6 !important;
  cursor: text;
  pointer-events: none;
}
.multiselect__option--group {
  background: #ededed;
  color: #35495e;
}
.multiselect__option--group.multiselect__option--highlight {
  background: #35495e;
  color: #fff;
}
.multiselect__option--group.multiselect__option--highlight:after {
  background: #35495e;
}
.multiselect__option--disabled.multiselect__option--highlight {
  background: #dedede;
}
.multiselect__option--group-selected.multiselect__option--highlight {
  background: #ff6a6a;
  color: #fff;
}
.multiselect__option--group-selected.multiselect__option--highlight:after {
  background: #ff6a6a;
  content: attr(data-deselect);
  color: #fff;
}
.multiselect-enter-active,
.multiselect-leave-active {
  transition: all 0.15s ease;
}
.multiselect-enter,
.multiselect-leave-active {
  opacity: 0;
}
.multiselect__strong {
  margin-bottom: 8px;
  line-height: 20px;
  display: inline-block;
  vertical-align: top;
}
*[dir="rtl"] .multiselect {
  text-align: right;
}
*[dir="rtl"] .multiselect__select {
  right: auto;
  left: 1px;
}
*[dir="rtl"] .multiselect__tags {
  padding: 8px 8px 0px 40px;
}
*[dir="rtl"] .multiselect__content {
  text-align: right;
}
*[dir="rtl"] .multiselect__option:after {
  right: auto;
  left: 0;
}
*[dir="rtl"] .multiselect__clear {
  right: auto;
  left: 12px;
}
*[dir="rtl"] .multiselect__spinner {
  right: auto;
  left: 1px;
}
@keyframes spinning {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(2turn);
  }
}


.card{
		  color: aliceblue;
			border-radius: 15px !important;
			background-color: rgba(0,0,0,0.4) !important;
	}
.bg-dark-transparent {
			background-color: rgba(0,0,0,0.4) !important;
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
