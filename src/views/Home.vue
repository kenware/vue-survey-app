<template>
  <div class="home">
    <div class="parallax-container img-parallax">
      <div class="parallax"><img src="../assets/images/assess.jpg"></div>
    </div>
    <HomeComponent msg="Welcome to Survey Wizard"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeComponent from '@/components/HomeComponent.vue';
import MateriazeInit from '../mixins/materializeInit-mixin';

export default {
  name: 'home',
  components: {
    HomeComponent,
  },
  mounted() {
    this.init();
  },
  mixins: [MateriazeInit],
};
</script>

<style lang="scss">
.img-parallax {
  background-color: rgba(0,0,0,.2);
  cursor: pointer;
  transition: .5s ease;
}
</style>
