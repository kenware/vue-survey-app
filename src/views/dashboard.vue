<template>
  <div class='dashboard'>
  <div class="container">
    <div class="row">
      <div class="col s12 m6">
        <h5>Practice Assessments</h5>
        <div class="card horizontal">
        <div class="card-image">
            <img src="../assets/images/assess5.jpg">
        </div>
        <div class="card-stacked">
            <div class="card-content">
              <ul class="">
                <li v-for="item in assessment" :key="item.id" class="list">
                <a @click="Alert(alertData.title, {message: alertData.message + item.type},
                 { params: item.type})" class="alert">
                {{item.type}} <i class="material-icons">send</i></a>
                </li>
               </ul>
            </div>
        </div>
        </div>
      </div>
      <div class="col s12 m6">
        <h5>Value Alignment Assessments</h5>
          <div class="card horizontal value-align ">
        <div class="card-image">
            <img src="../assets/images/assess11.jpg">
        </div>
        <div class="card-stacked">
            <div class="card-content">
              <ul class="">
                <li class="">
                    <router-link to="/about">
                    Take value alignment test <i class="material-icons">send</i>
                    </router-link>
                </li>
               </ul>
            </div>
        </div>
        </div>
      </div>
    </div>
  </div>
   <div class="analytic-container">
     <div class="row">
       <div class="col s12 m4">
         <h5>Analytics</h5>
         <div class="analytic">
            <div class="title">
              Total No. of Assessment Taken
            </div>
            <p class="content">
              {{scores.count}}
            </p>
         </div>
       </div>
       <div class="col s12 m8">
        <h5>Assessments Taken</h5>
        <table class="responsive-table striped">
        <thead>
          <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
              <th>Score</th>
              <th>History</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="score in scores.results" :key="score.id">
            <td>{{score.assessmentName.name}}</td>
            <td>{{score.assessments.type}}</td>
            <td>{{score.startTime}}</td>
            <td>End Time</td>
            <td>{{score.status}}</td>
            <td>{{score.score}}</td>
            <td><router-link :to="`/assessment/history/${score.id}/${score.assessments.type}`">
               History
            </router-link></td>
          </tr>

        </tbody>
      </table>
       </div>
     </div>
   </div>
  </div>
</template>

<script>
import AlertWithRedirect from '@/mixins/AlertWithRedirect';
import { mapState } from 'vuex';

export default {
  name: 'dashboard',
  mixins: [AlertWithRedirect],
  async created() {
    const assessmentUrl = '?include=children&name=Practice assessment';
    const scoreUrl = `score/?userId=${this.$store.state.user.user.id}`;
    this.$store.dispatch('assessment/get', { key: 'assessment', url: assessmentUrl });
    this.$store.dispatch('assessment/get', { key: 'score', url: scoreUrl });
  },
  computed: {
    ...mapState({
      assessment: state => state.assessment.assessment.results[0].assessments,
      scores: state => state.assessment.score,
    }),
    alertData() {
      return {
        title: 'Information',
        message: 'You are about to start practice assessment on ',
      };
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  background-color: #F6F9FC;
}
.material-icons {
   font-size: 15px !important;
}
.dashboard {
  background-color: #F6F9FC;
  height: 100vh;
  .value-align {
      min-height: 165px !important;
  }
}
.analytic-container {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    .analytic {
    box-shadow: 0 0.125rem 0.5625rem 0 rgba(0, 0, 0, 0.05);
    border-radius: 0.25rem;
    background-color: white;
    min-height: 150px;
    width: 80%;
    .title {
        padding-top: 20px;
        margin-left: 5px;
    }
    .content {
        color: #42b983;
        margin-top: 50px;
        font-size: 4rem;
        font-weight: 500;
        text-align: right;
        margin-right: 20px;
    }
    }
}
a {
  color: #42b983;
  cursor: pointer;
}
</style>
