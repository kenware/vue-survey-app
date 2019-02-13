<template>
  <div id="app">
    <header>
      <NavComponent />
    </header>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
import NavComponent from './components/NavComponent.vue';

export default {
  name: 'App',
  components: {
    NavComponent,
  },
  mounted() {
    M.AutoInit();
  },
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
