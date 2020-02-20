<template>
  <b-row class="fill-space">
    <b-col
      md="6"
      class="left-space bg-dark-transparent"
      v-bind:class="{ 'translate': registered }"
    >
      <b-card
        v-if="registered === false"
        class="text-white bg-dark my-auto col-md-9 border-info"
        title="Register"
        sub-title="Create your account to use our awesome services !"
      >
        <b-form>

          <b-form-group
            id="exampleInputGroup2"
            label="Username:"
            label-for="username"
            description="Your username must be alpha numeric and contain between 5 and 20 characters"
          >
            <b-form-input
              id="username"
              type="text"
              v-model="input.username"
              :state="verifyUsername"
              required
              placeholder="Enter username"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="exampleInputGroup1"
            label="Email address:"
            label-for="email"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              id="email"
              type="email"
              v-model="input.email"
              :state="verifyEmail"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="exampleInputGroup3"
            label="First Name:"
            label-for="firstname"
          >
            <b-form-input
              id="firstname"
              type="text"
              v-model="input.firstname"
              :state="verifyFirstname"
              required
              placeholder="Enter firstname"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="exampleInputGroup4" label="Last Name:" label-for="lastname">
            <b-form-input
              id="lastname"
              type="text"
              v-model="input.lastname"
              :state="verifyLastname"
              required
              placeholder="Enter lastname"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="exampleInputGroup5" label="Password" label-for="password">
            <b-form-input
              id="password"
              type="password"
              v-model="input.password"
              :state="verifyPassword"
              required
              placeholder="Enter your password"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="exampleInputGroup6"
            label="Re-enter your password"
            label-for="cpassword"
          >
            <b-form-input
              id="cpassword"
              type="password"
              v-model="input.cpassword"
              :state="verifyCpassword"
              required
              placeholder="Enter your password again"
            ></b-form-input>
          </b-form-group>
          <btnLaoding
              v-bind:loadingState="loadingRegister"
              v-bind:errorMessage="errorMessage"
              message="Register"
              v-on:update="verify()"
            />

        </b-form>
      </b-card>
      <b-card v-else
      class="text-white bg-dark my-auto col-md-8 border-info"
      title="Register successful !"
      sub-title="Thanks for creating an account">
        <p class="card-text">
          Check your email to set your account as confirmed
        </p>
      </b-card>
    </b-col>
  </b-row>
</template>

 <script>
import _ from 'lodash'
import User from '@/services/User'
import router from '@/router'
import isEmail from '@/outils/user/isEmail'
import isUsername from '@/outils/user/isUsername'
import isPassword from '@/outils/user/isPassword'
import isLastname from '@/outils/user/isLastname'
import isFirstname from '@/outils/user/isFirstname'
import BtnLoading from '@/components/BtnLoading'



export default {
  name: 'Register',
  props: ['authenticated'],
  components: {
    'btnLaoding': BtnLoading
  },
  data () {
    return {
      loadingRegister: 'false',
      errorMessage: 'Please verify that all fields are filled in',
      registered: false,
      input: {
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        cpassword: ""
      },
      verified: {
        username: null,
        firstname: null,
        lastname: null,
        email: null,
        password: null,
        cpassword: null
      },
      show: true
      }
    },
     methods: {
   verify () {
      if (
        isUsername(this.input.username) &&
        isFirstname(this.input.firstname) &&
        isLastname(this.input.lastname) &&
        isEmail(this.input.email) &&
        !(_.isEmpty(this.input.cpassword)) &&
        isPassword(this.input.password, this.input.cpassword) &&
        this.input.cpassword !== ''
      ) this.register()
      else {
        this.loadingRegister = 'error'
        setTimeout(() => { this.loadingRegister = 'false' }, 3000)
      }
    },
   register () {
      this.loadingRegister = true
      User.register({ user: this.input })
        .then((success) => {
          if (success.data.err) {
            this.loadingRegister = 'error'
            setTimeout(() => { this.loadingRegister = 'false' }, 4000)
            this.errorMessage = "username or email Already existe"
          } else this.registered = true
        })
        .catch(() => {
          this.loadingRegister = 'error'
          setTimeout(() => { this.loadingRegister = 'false' }, 3000)
        })
    }
  },
    computed: {
      verifyEmail () {return (this.input.email === "" ? null : isEmail(this.input.email))},
      verifyUsername () {return (this.input.username == "" ? null : isUsername(this.input.username))},
      verifyFirstname () {return (this.input.firstname === "" ? null : isFirstname(this.input.firstname))},
      verifyLastname () {return (this.input.lastname === "" ? null : isLastname(this.input.lastname))},
      verifyPassword () {return (this.input.password === "" ? null : isPassword(this.input.password))},
      verifyCpassword () {return (this.input.cpassword === "" ? null : this.input.cpassword === this.input.password)}
    },
    beforeMount () {
    if (this.authenticated === true) router.push('/')
    this.loadingRegister = 'false'
  }
}
</script>


<style scoped>
@media screen and (min-width: 640px) {
  .translate {
    transform: translate(100%, 0);
    transition: transform 2s, height 4s;
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
.left-space {
  flex:auto;
  align-self: flex-start;
  justify-content: center;
  display: flex;
   opacity: 0.9;
}
.form-control:not(:matches(.is-valid, .is-unvalid)) {
  border: transparent;
}
.form-control {
  background-color: #ffffff2e;
  color: #e6e6e6;
}
.form-control:focus {
    color: #dae0e6;
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
    color:    rgb(149, 148, 148);
}
</style>
