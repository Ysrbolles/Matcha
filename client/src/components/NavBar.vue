<template>
  <b-navbar toggleable="md" type="dark" variant="dark" >
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand><router-link to="/" class="nav-link text-white"> <i class="fas fa-venus-mars"></i> Matcha</router-link></b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav class="m-auto">
        <b-nav-item> <router-link to="/" class="nav-link">Home</router-link> </b-nav-item>
        <b-nav-item><router-link to="/About" class="nav-link">About</router-link></b-nav-item>
        <b-nav-item><router-link to="/Services" class="nav-link">Services</router-link></b-nav-item>
      </b-navbar-nav>
    </b-collapse>

    <b-navbar-nav class="ml-auto" v-if="logged === true" id="profile">
      <b-collapse is-nav id="nav_collapse">
      <b-nav-item>
            <router-link to="/Notification" class="nav-link">
               <span style="color:white;">{{cnt}}
              <font-awesome-icon icon="bell" />
              </span>
            </router-link>
      </b-nav-item>
     <b-navbar-nav ><router-link to="/Chat" style="color: white;">
      <span style="color:white;">{{cnum}}
     <font-awesome-icon :icon="['fab', 'facebook-messenger']" />
      </span>
     </router-link>
     </b-navbar-nav>
     </b-collapse>
      <b-dropdown variant="link" size="lg" offset="-100" no-caret>
        <template slot="button-content">
        <i class="fas fa-chevron-circle-down" style="color:white;"></i>
        </template>
         <b-dropdown-item><router-link to="/Fastmatch" class="nav-link text-dark">FastMatch</router-link></b-dropdown-item>
        <b-dropdown-item><router-link to="/Browse" class="nav-link text-dark">Browse</router-link></b-dropdown-item>
         <b-dropdown-item><router-link to="/Search" class="nav-link text-dark">Search</router-link></b-dropdown-item>
        <b-dropdown-item><router-link to="/Profile" class="nav-link text-dark">Profile</router-link></b-dropdown-item>
       <b-dropdown-divider></b-dropdown-divider>
       <b-dropdown-item><router-link to="/Blocked" class="nav-link text-dark">Blocked List</router-link></b-dropdown-item>
       <b-dropdown-item><router-link to="/History" class="nav-link text-dark">History</router-link></b-dropdown-item>
        <b-dropdown-item-button class="no-focus" v-on:click="logout">Logout</b-dropdown-item-button>
      </b-dropdown>
    </b-navbar-nav>
    <b-navbar-nav v-else id="nav">
      <b-nav-item><router-link to="/login" class="nav-link">Login</router-link></b-nav-item>
      <b-nav-item><router-link to="/register" class="nav-link">Register</router-link></b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css'
export default {
  name: 'NavBar',
  props: ['logged', 'socket', 'profileComplete', 'cnt', 'notif', 'cnum'],
  data () {
    return {
      baseMenu: {
        home: { name: 'Home', to: '/' },
        about: { name: 'About', to: 'About' },
        services: { name: 'Services', to: 'Services' }
      },
      baseLogged: {
        home: { name: 'Profile', to: '/' },
      }
    }
  },
  methods: {
    logout () { this.$emit('logout') }
  }
}
</script>
<style scoped>
.transparentp{
  background-color: rgba(0,0,0,0.4) !important;
}
.btn-link svg {
  color:white;
}
.btn-link:hover svg {
  color:#05728f;
}
.navbar-toggler {
  margin-right: 10px;
}
.no-focus {
  background-color: white;
}
.no-focus:hover {
  background-color:#05728f;
  color:white;
}
.no-focus:focus {
  outline: 0;
  cursor: pointer;
}
</style>
