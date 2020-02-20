<template>
  <b-row class="fill-space">
    <b-col md="4" cols="12" class="right-space bg-dark-transparent">
      <b-card v-if="recovery === false"
        title="Login"
        sub-title="Log in to use our awesome services !"
        class="bg-dark border-info"
      >
        <b-form class="mt-5">
          <b-form-group
            id="exampleInputGroup1"
            label-for="exampleInput1"
          >
            <b-form-input
              id="username"
              type="text"
              v-model="input.username"
              required
              placeholder="Enter username"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="exampleInputGroup2"
            label-for="exampleInput2"
          >
            <b-form-input
              id="password"
              type="password"
              v-model="input.password"
              required
              placeholder="Enter password"
            ></b-form-input>
          </b-form-group>
          <b-button v-on:click="login" variant="info">Login</b-button>
          <b-button v-on:click="resetPassword" variant="dark">Forgot your password ?</b-button>
          <p class="card-text text-danger mt-4">{{ myError.message }}</p>
          <b-card-footer class="mt-4">
            <p class="card-text">Not on Matcha yet ? <router-link to="/register" class="card-link">Sign up</router-link></p>
          </b-card-footer>
        </b-form>
      </b-card>
       <b-card v-else
          title="Recover Password"
          sub-title="Enter your email to reset your password"
          class="bg-dark-transparent border-info"
        >
          <b-form-group
            id="exampleInputGroup1"
            label-for="exampleInput1"
          >
            <b-form-input
              id="username"
              type="text"
              v-model="recover"
              required
              placeholder="Enter your email"
            ></b-form-input>
          </b-form-group>
          <b-button v-on:click="reset" variant="info">Reset</b-button>
          <b-button v-on:click="resetPassword" variant="dark">Go back to log in</b-button>

       </b-card>
    </b-col>
  </b-row>
</template>

<script>
import _ from 'lodash'
import router from '@/router'

import isEmail from '@/outils/user/isEmail'
import User from "@/services/User";

export default {
    name: "Login",
    props: ['authenticated','socket'],
    data () {
    return {
      myError: {
        value: false,
        message: ''
      },
      recovery: false,
      sent: false,
      input: {
        username: '',
        password: ''
      },
      recover: '',
      show: true
    }
  },
  created () {
    if (this.authenticated === true) router.push('/') },
  methods:{
    login(){
      if(_.isEmpty(this.input.username || _.isEmpty(this.input.password))){
        this.myError.message = "Make sure all fields are filled in"
        return null
      }
      const data = {username: this.input.username, password: this.input.password  }
      User.login(data)
        .then(success => {
          if(success.data.data.confirmed == 1){
            this.$emit('authenticated', success)
            if(success.data.data.profileComplete == 1)
              router.push('/')
            else
              router.push('/profile')
          }
          else {
            this.myError.message = 'You must Confirm your profile'}
        })
        .catch(() => {
          this.myError.value = true
          this.myError.message = 'User not found'
        })

    },
    reset () {
      if (!isEmail(this.recover)) return null

        User.reset({'email':this.recover})
        .then((r) => {
          window.console.log(r)
          this.sent = true
          if(_.isEmpty(r.data.err))
            alert('Email sent')
          else
            alert(r.data.err)
          setTimeout(() => { this.resetPassword() }, 2000)
        })
        .catch(err => alert(err))
    },
      resetPassword() {
        this.recovery = !this.recovery
      }
}}
</script>



<style scoped>
.right-space {
  padding: 0;
  flex: 1 100%;
  align-self: flex-end;
  justify-content: center;
  -ms-flex: 1;
  display: flex;
   opacity: 0.9;
}
.card{
		color: aliceblue;
			border-radius: 15px !important;
			background-color: rgba(0,0,0,0.4) !important;
	}
.bg-dark-transparent {
  background-color: rgba(0,0,0,0.4) !important;

}
.bg-dark{
  align-self: center;
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
</style>
