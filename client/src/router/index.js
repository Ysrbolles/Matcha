import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Pages/Home.vue'
import About from '../views/Pages/About.vue'
import Services from '../views/Pages/Services'
import Register from '../views/Users/Register.vue'
import Login from '../views/Users/Login.vue'
import Profile from '../views/Users/Profile.vue'
import Confirmation from '../views/Users/Confirm.vue'

import Viewprofile from '../views/Users/viewprofile.vue'
import Fgpassword from '../views/Users/fgpassword.vue'
import FastMatch from '../views/Users/FastMatch'
import Brows from '../views/Users/Brows.vue'
import Search from '../views/Users/Search.vue'
import Chat from '../views/Users/Chat.vue'
import BlockedList from '../views/Users/BlockedList'
import Notification from '../views/Users/Notification'
import History from '../views/Users/History'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/services',
    name: 'services',
    component: Services
  },

  {
    path: '/blocked',
    name: 'blocked',
    component: BlockedList,
    meta: {
      requiresAuth: true,
      title: 'Matcha'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/fastmatch',
    name: 'fastmatch',
    component: FastMatch,
    meta: {
      requiresAuth: true,
      title: 'Matcha'
    }
  },
  {
    path: '/Browse',
    name: 'browse',
    component: Brows,
    meta: {
      requiresAuth: true,
      title: 'Matcha'
    }
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    meta: {
      requiresAuth: true,
      title: 'Matcha'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true,
      title: 'Matcha'
    }
  },
  {
    path: '/confirm',
    name: 'Confirm',
    component: Confirmation,
    meta: {
      title: 'Matcha'
    }
  },
  {
    path: '/viewprofile',
    name: 'viewprofile',
    component: Viewprofile,
    meta: {
      requiresAuth: true,
      title: 'Matcha'
    }
  },
  {
    path: '/fgpassword',
    name: 'fgpassword',
    component: Fgpassword
  },
  {
    path: '/Chat',
    name: 'chat',
    component: Chat,
    meta: {
      requiresAuth: true,
      title: 'Matcha'
    }
  },
  {
  path: '/Notification',
  name: 'Notification',
  component: Notification,
  meta: {
    requiresAuth: true,
    title: 'Matcha'
  }
  },
  {
  path: '/History',
  name: 'History',
  component: History,
  meta: {
    requiresAuth: true,
    title: 'Matcha'
  }
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('authToken') === null ||
    localStorage.getItem('authToken') === undefined) {
      next({
        path: '/'
      })
    } else next()
  } else next()
})

export default router
