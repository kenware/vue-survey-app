<template>
  <div id="app">
    <header>
      <NavComponent />
    </header>
    <main>
      <router-view/>
    </main>
    <SignupComponent />
    <LoginComponent />
  </div>
</template>

<script>
import NavComponent from './components/NavComponent.vue';
import materializeInit from './mixins/materializeInit-mixin';
import SignupComponent from '@/components/SignupComponent.vue';
import LoginComponent from '@/components/LoginComponent.vue';
import Authentication from '@/mixins/authentication';

export default {
  name: 'App',
  components: {
    NavComponent,
    SignupComponent,
    LoginComponent,

  },
  mounted() {
    this.init();
  },
  created() {
    this.authenticatedSession();
  },
  mixins: [materializeInit, Authentication],
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
