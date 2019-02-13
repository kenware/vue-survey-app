<template>
    <div class="home">
      <div class="section">
      <h3 class="center">{{ msg }}</h3>
      <p class="center">
        For a guide and recipes on to secure assessment space as an organization or <br>
        to take an assessment as a learner/student<br>
        check out the
        <a href="https://cli.vuejs.org" target="_blank" rel="noopener">Qick tour</a>.
      </p>
      </div>
      <div class="section">
      <div class="container-fluid">
        <div class="row">
        <div class="col s12 m4 l3">
          <img src='../assets/images/assess2.png'  class="materialboxed img" width="250">
        </div>
        <div class="col s12 m2 l3">
        <h5>Pracice Assessments</h5>
        <ul>
            <li><router-link to="/assessment/practice">Verbal Reasoning</router-link></li>
            <li><router-link to="/assessment/practice">Logical Reasoning</router-link></li>
            <li><router-link to="/assessment/practice">Quantitative Reasoning</router-link></li>
            <li><router-link to="/assessment/practice">Sinonymes</router-link></li>
            <li><router-link to="/assessment/practice">Antonymes</router-link></li>
        </ul>
        </div>
        <div class="col s12 m4 l3">
          <img src='../assets/images/assess9.jpg'  class="materialboxed" width="250" >
        </div>
        <div class="col s12 m2 l3">
        <h5>Pracice Behavioural Assessments</h5>
        <ul>
            <li><router-link to="/assessment/practice">Initiative</router-link></li>
            <li><router-link to="/assessment/practice">Creativity</router-link></li>
            <li><router-link to="/assessment/practice">Integrity</router-link></li>
            <li><router-link to="/assessment/practice">Inovation</router-link></li>
        </ul>
        </div>
      </div>
      </div>
    </div>
    <div class="home-footer">
        <h6 class="center footer-text">© 2018 Survey Wizard</h6>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  mounted() {
    M.AutoInit();
  },
};
</script>

<style lang="scss" scoped>
h2 {
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
.img {
  margin-top: 38px !important;
}
a {
  color: #42b983;
}
.home-footer {
  .footer-text {
    padding-top: 21px !important;
  }
  height: 50px;
  background-color: #f1f1f1 !important;
}
</style>
