
<template>
  <div>
    <nav class="nav">
      <div class="nav-wrapper white">
        <router-link class="brand-logo" to="/">
           <img class="logo-img" src="../assets/images/app-logo2.png">
        </router-link>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger">
        <i class="material-icons">menu</i></a>
        <ul class="right hide-on-med-and-down">
          <li v-if="!isAuthenticated.username" @click="modalShow('login')">
            <router-link to="#login">Login</router-link>
           </li>
          <li v-if="!isAuthenticated.username" @click="modalShow('signup')">
            <router-link to="#signup">Register</router-link>
          </li>

          <li v-if="isAuthenticated.username" >
            <router-link class="dropdown-trigger" href="#!" data-target="dropdown1" to="#!">
              {{isAuthenticated.username}}<i class="material-icons right">arrow_drop_down</i>
            </router-link>
          </li>
          <li v-if="isAuthenticated.username" ><router-link to="/dashboard">
              Dashboard
          </router-link></li>
          <li><router-link to="/about">About</router-link></li>
          <li><router-link to="/about">Contact</router-link></li>
        </ul>
      </div>
    </nav>
    <ul class="sidenav" id="mobile-demo">
      <li @click="modalShow('login')"><router-link to="#">Login</router-link></li>
      <li @click="modalShow('signup')"><router-link to="#">Register</router-link></li>
      <li><router-link to="/about">About</router-link></li>
      <li><router-link to="/about">Contact</router-link></li>
    </ul>
    <ul id="dropdown1" class="dropdown-content ">
      <li v-if="isAuthenticated.username" @click="logOut"><router-link to="#">
        logOut
      </router-link></li>
    </ul>
  </div>
</template>

<script>
import isAuthenticated from '@/mixins/authentication';

export default {
  name: 'NavComponent',
  methods: {
    modalShow(name) {
      this.$modal.show(name);
    },
    modalHide(name) {
      this.$modal.hide(name);
    },
  },
  mixins: [isAuthenticated],
};
</script>

<style lang="scss" scoped>
.nav {
  .logo-img {
    height: 70px;
    width: 110px;
  }
  .brand-logo {
    margin-left: 30px;
  }
  height: 85px !important;
  .nav-wrapper {
    a {
      margin-top: 15px !important;
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
}
</style>
