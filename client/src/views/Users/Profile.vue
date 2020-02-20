<template>
  <b-row class="justify-content-md-center bg-transparent">
    <b-row class="justify-content-md-center w-100 mb-2">
      <b-col md="4" class="btn">
        <b-button
          v-bind:class="{ 'btn-success active ' : setPicture === false }"
          @click="setPicture = false"
        >
          Set Profile
        </b-button>
        <b-button
          v-bind:class="{ 'btn-success active': setPicture === true }"
          @click="setPicture = true"
        >
          Add Picture
        </b-button>
        <div v-if="!input.profileComplete" class="dang bg-warning text-center mt-2 p-2"> Please fill all informations to start matching with people</div>
      </b-col>
    </b-row>
    <b-row v-if="setPicture === false" class="justify-content-md-center w-100">
      <b-col col md="6" lg="4">
        <b-card title="Edit your informations" class="bg-dark-transparent mb-2">
          <b-form>
             <v-profilePic v-bind:profilePic="input.profilePic"></v-profilePic>
            <b-form-group
              id="usernameGroup"
              label="username:"
              label-for="usernameInput"
            >
              <b-form-input
                id="usernameInput"
                type="text"
                v-model="input.username"
                @input="Emptyerr"
                required
                :state="verifyUsername"
                placeholder="Enter Username"
              ></b-form-input>
              </b-form-group>
            <b-form-group
              id="firstnameGroup"
              label="Firstname:"
              label-for="firstnameInput"
            >
              <b-form-input
                id="firstnameInput"
                type="text"
                v-model="input.firstname"
                required
                @input="Emptyerr"
                placeholder="Enter firstname"
                :state="verifyFirstname"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="lastnameGroup"
              label="Last Name:"
              label-for="lastnameInput"
            >
              <b-form-input
                id="lastnameInput"
                type="text"
                v-model="input.lastname"
                required
                placeholder="Enter lastname"
                :state="verifyLastname"
                  @input="Emptyerr"
              ></b-form-input>
              </b-form-group>
              <b-form-group
              id="emailGroup"
              label="Email :"
              label-for="emailInput"
            >
               <b-form-input
                id="emailInput"
                type="text"
                v-model="input.email"
                required
                placeholder="Enter email"
                :state="verifyEmail"
                  @input="Emptyerr"
              ></b-form-input>
               </b-form-group>

          </b-form>
        </b-card>
        <b-card title="Change your password" class="bg-dark-transparent">
          <b-form>
           <b-form-group id="oldPasswordGroup" label="Old password:" label-for="oldPasswordInput">
              <b-form-input
                @input="Emptyerr"
                id="oldPasswordInput"
                type="password"
                v-model="input.oldPassword"
                required
                :state="verifyOldPassword"
                placeholder="Enter your old password"
              ></b-form-input>
              <span class="text-danger">{{Error1}}</span>
            </b-form-group>
            <b-form-group id="passwordGroup" label="Password:" label-for="passwordInput">
              <b-form-input
                id="passwordInput"
                type="password"
                v-model="input.password"
                required
                  @input="Emptyerr"
                placeholder="Enter your password"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="cpasswordGroup" label="Re-enter your password:" label-for="cpasswordInput">
              <b-form-input
                id="cpasswordInput"
                type="password"
                v-model="input.cpassword"
                @input="Emptyerr"
                required
                :state="verifyCpassword"
                placeholder="Enter your password again"
              ></b-form-input>
            </b-form-group>
         </b-form>
        </b-card>
      </b-col>
      <b-col col md="6" lg="4">
        <b-card title="Edit your profile" class="bg-dark-transparent h-100">
          <b-form>
            <b-form-group id="birthdayGroup" label="Birthday:" label-for="birthdayInput">
              <b-form-input
                id="birthdayInput"
                type="date"

                v-model="input.birthday"
                required
                @input="test"
                placeholder="Enter name"
              ></b-form-input>
              <!-- <p class="text-danger">{{err_date}}</p> -->
            </b-form-group>
            <b-form-group id="genderGroup" label="Gender:" label-for="genderInput">
              <b-form-select id="gender" v-model="input.gender" :options="options" class="mb-3"/>
            </b-form-group>
           <b-form-group label="Select your orientation" >
            <b-form-checkbox-group
                v-model="orientation"
                :options="options2"
                name="checkbox-validation"
              >
             </b-form-checkbox-group>
            </b-form-group>
           
            <b-form-row>
              <b-form-group
                class="col-md-6 mx-0"
              
                id="latitudeGroup"
                label="Latitude"
                label-for="latitudeInput"
              >
                  <b-form-input  id="latitudeInput"
                   v-model="input.latitude"
                    placeholder="Latitude"/>
              </b-form-group>
              <b-form-group
                class="col-md-6 mx-0"
               
                id="longitudeGroup"
                label="Longitude"
                label-for="longitudeInput"
              >
                  <b-form-input  id="longitudeInput"
                  v-model="input.longitude"
                   placeholder="Longitude"/>
              </b-form-group>
            </b-form-row>
            <b-form-group
              id="biographyGroup"
              label="Biography:"
              label-for="biographyInput"
            >
              <b-form-textarea
                id="biographyInput"
                type="text"
                v-model="input.biography"
                :state="verifybiography"
                required
                placeholder="This will be displayed on matching page"
              ></b-form-textarea>
            </b-form-group>
            <b-form-group
              id="interestGroup"
              label="Interest:"
              label-for="interestInput"
            >
              <b-badge
                class="ml-1 mb-1"
                v-for="(tags, index) in interest"
                v-bind:key="tags"
                @click="removeElement(index)"
              >
                {{ tags }}
              </b-badge>
              <b-row class="m-0 mt-2">
                <b-col md="8" class="p-0">
                  <b-form-input
                    id="interestInput"
                    type="text"
                    v-model="input.interest"
                    autocomplete="off"
                    @input="filterTags"
                    placeholder="Add interest"
                  />
                </b-col>
                <b-col md="4">
                  <b-button variant="light" v-on:click="Addtags">Add</b-button>
                </b-col>
                <span class="text-danger">{{error}}</span>
                <div v-if="filterTags && modal">
                  <ul>
                   <li class="list-group-item list-group-item-info" v-for="Filtre in Filtres" @click="settag(Filtre)" :key="Filtre">{{ Filtre }}</li>
                   </ul>
                 </div>
              </b-row>
            </b-form-group>
           <b-row>
            <b-button v-if="loadingProfile === 'false'"  v-on:click="updateProfile" variant="dark">Update</b-button>
            <b-button v-else-if="loadingProfile ==='complete'" variant="success">Update complete</b-button>
            <b-button v-else-if="loadingProfile ==='error'" variant="danger">An error has occured, try again later</b-button>
            <b-button v-else variant="dark"><font-awesome-icon icon="spinner" size="1x" pulse/> Updating...</b-button>
            <b-button v-confirm="{ok: DeleteAccount, cancel: doNothing, message: 'Your Account Will Be Deleted!'}" variant="danger">Delete</b-button>

           </b-row>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
    <b-row v-if="setPicture === true" class="justify-content-md-center w-100 m-height-500">
      <b-col md="8">
        <b-row class="justify-content-md-center h-100 w-100">

          <b-col md="6">

            <b-card title="Add a profile picture" class="h-100 bg-dark-transparent">

              <b-form-file
                v-model="file"
                @change="onFileChange"
                :state="Boolean(file)"
                ref="fileinput"
                placeholder='Choose a file...'
                accept="image/jpeg, image/png, image/gif"
              >
              </b-form-file>
              <template v-if="urlEmpty">
                <div id="preview" class="w-100 mb-2">
                  <p>Preview :</p>
                  <img :src="url" class="w-100"/>
                </div>
                <b-button
                  variant="outline-info"
                  v-on:click="addPicture"
                >Add</b-button>
                <b-button variant="outline-danger" v-on:click="resetPicture">Cancel</b-button>
              </template>
              <span>{{err_img}}</span>
            </b-card>
          </b-col>
          <b-col md="6" v-if="input.pictures.length > 0">
            <v-carousel isProfile="true" v-bind:pictures="input.pictures" v-on:deletePicture="deletePicture"></v-carousel>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-row>

</template>

<script>
import isalphanum from '@/outils/string/isAlphaNumeric'
import _ from 'lodash'
import User from '@/services/User'
import Carousel from '@/components/Carousel'
import router from '@/router'
import isEmpty from '@/outils/empty/isEmpty'
import profilePic from '@/components/ProfilePic'
import isDate from '@/outils/user/isBirthday'
import isUsername from '@/outils/user/isUsername'
import isPassword from '@/outils/user/isPassword'
import isLastname from '@/outils/user/isLastname'
import isFirstname from '@/outils/user/isFirstname'
import isEmail from '@/outils/user/isEmail'
// import vueConfirmationButton from 'vue-confirmation-button';

export default {
    name: "Profile",
    props: ['socket', 'profileComplete', 'authenticated'],
    components:{
      'v-carousel' : Carousel,
       'v-profilePic': profilePic,


    },
    data () {
    return {
      err_img: '',
      loadingInformation: false,
      loadingPostApikey: false,
      loadingProfile: false,
      loadingPassword: false,
      setPicture: false,
      customMessages: [
      'Delete User',
      'Are you sure?',
      'Ok!'
    ],
      url: null,
      file: null,
      options: ['Male', 'Female', 'Others'],
      options2: [
      {text: 'Male', value: 'Male'},
      {text: 'Female', value: 'Female'},
      {text: 'Others', value: 'Others'}],
      uu: [],
      err_date: '',
      error: '',
      Error1: '',
      Error2: '',
      new:[],
      tags: [],
      orientation: [],
      data: [],
      Filtres: [],
      interest: [],
      modal: false,
      input: {
        pictures: [],
        id: '',
        orientation: [],
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        cpassword: '',
        oldPassword: '',
        birthday: '',
        gender: '',
        biography: '',
        interest: '',
        latitude: 0,
        longitude: 0,
        isGeolocationActive: false,
        profileComplete: false,
        profilePic: '',
        new: []
      },
      show: true,
      showLatLong: false
    }
  },
  created(){
    User.getTags()
    .then((result) => {
      result.data.forEach(element => {
        this.data.push(element['tags'])
      })
    })
    .catch((err) => (err))
  },
    mounted () {
    if (this.authenticated === false) router.push('/')
    User.get()
      .then(success => {
        this.$emit('authenticated', success)
        this.input = success.data.user
        if(!_.isEmpty(success.data.user.latitude) && !_.isEmpty(success.data.user.longitude)){
            this.showLatLong = !this.input.isGeolocationActive
        }
        this.interest = _.isEmpty(success.data.user.interests) ? [] : success.data.user.interests
        if(!_.isEmpty(success.data.user.orientation)){
          this.uu = (success.data.user.orientation).split(',')
          this.orientation = this.uu
       }
      })
      .catch(() => { router.push('/') })
    this.loadingInformation = 'false'
    this.loadingProfile = 'false'
    this.loadingPassword = 'false'
  },

  methods: {

    doNothing: function() {
        // Do nothing or some other stuffs
    },
    DeleteAccount(){
      return new Promise((resolve, reject) =>{
        User.deleteAccount()
        .then(() => {

          })
        .catch(() => reject())
      })
    },
    Emptyerr(){
      this.err_date= '',
      this.error= '',
      this.Error1= '',
      this.Error2= ''
    },
    test(){
      let d = new Date();
      let year_now = d.getFullYear();
      if(year_now - this.input.birthday.split('-')[0] < 2)
        this.err_date = 'Wrong date chose an other one'
      else
        this.err_date = ''
    },
    settag(Filtre){
      this.input.interest = Filtre
      this.modal = false
    },
    filterTags(){
      if(isEmpty(this.input.interest))
        return false
      this.error = ''
      this.modal = true
      this.Filtres = this.data.filter(state => {
        return state.toLowerCase().startsWith(this.input.interest.toLowerCase())
      })
    },
   getPath (path) {
      return 'http://localhost:4242/assets/' + path
    },
    updateProfile () {
      this.input.interest = this.interest
      this.input.new = this.new
      if(isDate(this.input.birthday) && isEmpty(this.err_date)){
      this.input.orientation = this.orientation
      User.EditProfile(this.input)
      .then((success) => {
        if(success.data == '1')
          this.Error1 = 'Wrong Password'
        if(success.data == '2')
            this.Error2 = "passwords don't match or Wrong format"
        if(success.data == 'error')
          this.Error2 = "Error please try again"
        if(!isEmpty(success.data.err)){
          this.Error2 = "Error please try again"
          alert(success.data.err)}
        this.profileComplete = true
        if(!isEmpty(success) && success.data != 'error' && isEmpty(this.Error2)  && isEmpty(this.Error1))
          localStorage.setItem('authToken', success.data)
       location.reload()
      })
      .catch((err) => {
       (err)
      })

    }else {
      location.reload()
      this.err_date = 'Wrong Date'
    }

    },
    resetPicture () {
      this.$refs.fileinput.reset()
      this.url = null
      this.file = null
      this.err_img = ''
    },
    onFileChange (e) { this.url = URL.createObjectURL(e.target.files[0]) },
    addPicture(){
      User.addPicture(this.file)
       .then(success => {
         window.console.log(success)
          if (_.isEmpty(success.data.err)) {
            this.resetPicture()
            this.input = success.data.user
          }else {
            this.err_img = success.data.err
          }
        })
        .catch(() => {})
    },
    deletePicture () {
      User.get()
        .then(() => {
            location.reload()
          })
        .catch(() => {})
    },

     Addtags(){
    if (isalphanum(this.input.interest) === true && this.input.interest.length < 20){
      let test = this.interest.find(element => element == '#'+this.input.interest)
      if (isEmpty(test)){
      this.interest.push('#'+this.input.interest)
        let ff = this.data.find(element => element == this.input.interest)
        if (isEmpty(ff)){
          this.new.push(this.input.interest)
        }
      this.input.interest = ''
    }else {
      this.error = 'Already existe'
    }
    }else {
      this.error = 'Wrong Tag'
    }
    },

    removeElement(index){
      let remove = this.interest.splice(index)
      remove.shift();
      this.interest = this.interest.concat(remove)
      remove = this.new.splice(index)
      remove.shift();
      this.new = this.new.concat(remove)
      window.console.log(this.new)
      window.console.log('----------')
      window.console.log(this.interest)
    },
  },
  computed: {
    verifyEmail () {return (this.input.email === "" ? null : isEmail(this.input.email))},
    verifyUsername () {return (this.input.username == "" ? null : isUsername(this.input.username))},
    verifyFirstname () {return (this.input.firstname === "" ? null : isFirstname(this.input.firstname))},
    verifyLastname () {return (this.input.lastname === "" ? null : isLastname(this.input.lastname))},
    verifyOldPassword () {return (this.input.oldPassword === "" ? null : isPassword(this.input.oldPassword))},
     verifyPassword () {return (this.input.password === "" ? null : isPassword(this.input.password))},
     verifyCpassword () {return (this.input.cpassword === "" ? null : this.input.cpassword === this.input.password)},
    verifybiography () {return ((this.input.biography === "" && this.input.biography.length > 255) ? false : true)},
    urlEmpty () { return !_.isEmpty(this.url) },
  },
}
</script>


<style scoped>
.dl{
  background-color: red;
}
.btn{
  margin-right: 15px;
}
.m-height-500 {
  min-height: 500px;
}
.bg-dark-transparent {
  	background-color: rgba(0,0,0,0.4) !important;
    /* background-color:#343a40ad;
  color:rgba(255, 255, 255, 0.8); */
}
li{
  color: black;
}
.dang{
   background-color:#343a40ad;
}
.form-control {
  background-color: #ffffff2e;
  border: 1px solid #dacece00;
  color: #e6e6e6;
}

.form-control:focus {
    color:black;
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
#preview {
  max-width: 201px;
}
</style>
