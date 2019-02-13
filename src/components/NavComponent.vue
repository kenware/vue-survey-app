
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
          <li><router-link to="/about">Login</router-link></li>
          <li><router-link to="/about">Register</router-link></li>
          <li><router-link to="/about">About</router-link></li>
          <li><router-link to="/about">Contact</router-link></li>
        </ul>
      </div>
    </nav>
    <ul class="sidenav" id="mobile-demo">
      <li><router-link to="/about">Login</router-link></li>
      <li><router-link to="/about">Register</router-link></li>
      <li><router-link to="/about">About</router-link></li>
      <li><router-link to="/about">Contact</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NavComponent',
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
