<template>
  <b-row class="fill-space">
    <b-col md="4" cols="12" class="right-space bg-dark">
      <b-card
        title="recovery"
        sub-title="Choose a secret password"
        class="bg-dark-transparent border-info"
      >
      <p v-if="myError.message" class="list-group-item list-group-item-danger">{{myError.message}}</p>
        <b-form class="mt-5">
          <b-form-group
            id="exampleInputGroup1"
            label-for="exampleInput1"
          >
            <b-form-input
              id="pass"
              type="password"
              v-model="input.pass"
              required
              :state="verifyPassword"
              placeholder="Enter Password"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="exampleInputGroup2"
            label-for="exampleInput2"
          >
            <b-form-input
              id="cpass"
              type="password"
              v-model="input.cpass"

              required
              placeholder="Confirm Password"
            ></b-form-input>
          </b-form-group>
          <b-button v-on:click="Send" variant="info">Send</b-button>
        </b-form>
      </b-card>

    </b-col>
  </b-row>
</template>

<script>
import User from "@/services/User";
import isPassword from '@/outils/user/isPassword'
import isEmpty from '@/outils/empty/isEmpty'
import router from '@/router'
export default {
    name: "Login",
    props: ['authenticated'],
    data () {
    return {
      myError: {
        value: false,
        message: ''
      },
      recovery: false,
      sent: false,
      input: {
        pass: '',
        cpass: '',
        token: ''
      },
      recover: '',
      show: true
    }
  },
  created() {
    this.input.token = this.$router.history.current.query.token
     if (this.authenticated === true || isEmpty(this.input.token)) router.push('/')
      User.fgpassword(this.input.token)
      .then((result) => {
        if(result.data == 0)
          router.push('/login')
      })
  },
  methods:{
    Send(){
      if(this.input.pass  && this.input.token){
        User.resetPassword(this.input)
        .then((s) => {

          if(isEmpty(s.data.err))
            router.push('/login')
          else {
            this.myError.message = "Wrong Password"
          }
        })
        .catch((err) => (err))

      }
    }
  },
  computed:{
  verifyPassword () {return (this.input.pass === "" ? null : isPassword(this.input.pass))},
  verifyCpassword () {return (this.input.cpass === "" ? null : this.input.cpass === this.input.pass)}
  }
}
</script>



<style scoped>
.right-space {
  padding: 0;
  flex: 1 100%;
  align-self: center;
  justify-content: center;
  -ms-flex: 1;
  display: flex;
   opacity: 0.9;
}
.bg-dark-transparent {
  background-color:#343a40ad;
  color:rgba(255, 255, 255, 0.8);
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
