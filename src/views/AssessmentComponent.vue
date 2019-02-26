<template>
  <div class="assessment">
    <h4 class="center h-color">{{assessment.type}} assessment</h4>
    <h5 class="center"> Total Time  {{assessment.maxTime}}</h5>
    <h5 class="center">
    <countdown :end-time="time.end"
      :start-time="time.start"
      @onFinish="vm => submit(vm, 'elapsed')">
      <span
        slot="process"
        slot-scope="{ timeObj }">H : M : S <br>{{ `${timeObj.h}:${timeObj.m}:${timeObj.s}` }}</span>
      <span
        slot="finish"
        method="{ finishCountdown }"
      >Done! </span>
    </countdown></h5>
    <div class="section">
      <div class="container-fluid">
        <div class="row" v-for="(question, index) in questions.results" :key="question.id">
          <div class="col s1">
            <form>
              <p class="right">
               {{index + 1}}
             </p>
            </form>
          </div>
          <div class="col s11">
            <div class="row">
              <div class="col s12">
              <p class="question">
                {{question.questionText}}
              </p>
              <p class="question" v-if="question.multiChoice">
                Check all that applies
              </p>
              </div>
              <form>
              <div class="col s11" v-for="answer in question.answers" :key="answer.id">
                <p v-if="!question.multiChoice">
                  <label v-if="checked(question.id, answer.id)">
                    <input @click="postAnswer(question.id, answer.id)"
                    class="with-gap" name="group1" type="radio" checked />
                    <span>{{answer.choiceText}}</span>
                  </label>
                  <label v-if="!checked(question.id, answer.id)">
                    <input @click="postAnswer(question.id, answer.id)"
                    class="with-gap" name="group1" type="radio" />
                    <span>{{answer.choiceText}}</span>
                  </label>
                </p>
                <p v-if="question.multiChoice">
                  <label v-if="checked(question.id, answer.id)">
                    <input @click="postAnswer(question.id, answer.id)"
                    type="checkbox" class="filled-in" checked/>
                    <span>{{answer.choiceText}}</span>
                  </label>
                  <label v-if="!checked(question.id, answer.id)">
                    <input @click="postAnswer(question.id, answer.id)"
                    type="checkbox" class="filled-in"/>
                    <span>{{answer.choiceText}}</span>
                  </label>
                </p>
             </div>
             </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section center">
    <div class="divider" />
      <paginate
      :page-count="Math.ceil(questions.count/limit)"
      :margin-pages="3"
      :click-handler="handlePage"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'">
    </paginate>
    </div>
    <div class="section center">
    <div class="divider" />
      <button @click="submitAlert" class="btn waves-effect waves-light submit-btn"
      type="submit" name="action">Submit Assessment
      <i class="material-icons right">send</i>
      </button>
    </div>
  </div>
</template>

<script>
import AlertMixins from '@/mixins/alertMixins';
import { mapState } from 'vuex';
import swal from 'sweetalert';

export default {
  name: 'AssessmentComponent',
  props: {
    id: String,
    type: String,
  },
  methods: {
    async submit(vm, status) {
      const { id } = this;
      const url = `assessments/submit/?assessmentId=${id}`;
      await this.$store.dispatch('assessment/post', { key: 'assessmentType', url });
      const finished = 'Assessment successfully submited';
      const elapsed = 'Your time have elapsed for this assessment';
      const report = 'Your Score has been recorded';
      const message = status === 'elapsed' ? elapsed : finished;
      this.Alert('Info', 'success', { message: [message, report] }, 3000);
      this.$router.push('/dashboard');
    },
    async apiCall(limit, offset) {
      const userId = this.$store.state.user.user.id;
      const { id } = this;
      const startUrl = `event/?assessmentId=${id}&include=children&limit=${limit}&offset=${offset}`;
      const scoreUrl = `score/?userId=${userId}&assessmentId=${id}&orderBy=decId`;
      const assessmentData = await this.$store.dispatch('assessment/get', { key: 'assessmentType', url: startUrl });
      const isTaken = await this.$store.dispatch('assessment/get', { key: 'isTakenScore', url: scoreUrl });
      return { assessmentData, isTaken };
    },
    checked(questionId, answerId) {
      const { history } = this.currentScore;
      const isChecked = history[questionId.toString()];
      if (isChecked) {
        // eslint-disable-next-line no-restricted-syntax
        for (const id of isChecked) {
          if (answerId === id) {
            return true;
          }
        }
        return false;
      }
      return false;
    },
    async handlePage(pageNum) {
      const { limit } = this;
      const offset = (pageNum - 1) * limit;
      await this.apiCall(limit, offset);
    },
    async postAnswer(questionId, answerId) {
      const assessmentId = this.assessment.id;
      const data = {
        assessmentId, questionId, answerId,
      };
      const url = 'assessments/event/';
      const response = await this.$store.dispatch('assessment/post', { key: 'postAnswer', url, value: data });
      if (response.status === 'error') {
        this.submit({ state: 'elapsed' }, 'elapsed');
      }
    },
    submitAlert() {
      swal({
        // eslint-disable-next-line prefer-template
        title: 'Info',
        icon: 'warning',
        content: {
          element: 'span',
          attributes: {
            innerHTML: 'You are about to submit this assessment',
          },
        },
        buttons: {
          Cancel: true,
          Submit: true,
        },
      })
        .then((value) => {
          // eslint-disable-next-line default-case
          switch (value) {
            case 'Submit':
              this.submit({ state: 'finished' }, 'finished');
          }
        });
    },
  },
  async created() {
    const { assessmentData, isTaken } = await this.apiCall(this.limit, 0);
    if (isTaken.status === 'error') {
      const title = 'Error occured loading assessment page';
      const message = { message: 'Please make sure you accessing this page from a correct resource' };
      this.Alert(title, 'error', message, 12000);
      this.$router.push('/dashboard');
    }
    if (assessmentData.status === 'error') {
      this.Alert('Info!', 'error', assessmentData.data.data, 12000);
      this.$router.push('/dashboard');
    }
    if (isTaken.data.results.length > 1) {
      const message = { message: 'You are about to retake this assessment' };
      this.Alert('Info!', 'success', message, 3000);
    }
  },
  computed: {
    ...mapState({
      assessment: state => state.assessment.assessmentType,
      questions: state => state.assessment.assessmentType.questions,
      currentScore: state => state.assessment.isTakenScore.results[0],
    }),
    limit() {
      return 10;
    },
    time() {
      const time = this.assessment.maxTime;
      const arr = time.split(':');

      const hour = Number(arr[0]) * 60 * 60 * 1000;
      const min = Number(arr[1]) * 60 * 1000;
      const sec = Number(arr[2]) * 1000;
      const totalMilliseconds = hour + min + sec;
      let { startTime } = this.assessment;
      startTime = new Date(startTime).getTime();
      return {
        end: startTime + totalMilliseconds,
        start: startTime,
      };
    },
  },
  mixins: [AlertMixins],
};
</script>

<style lang="scss" scoped>
.question {
    font-size: 1.15rem !important;
  }
form{
  label {
    color: #777171 !important;
  }
  p {
    span {
      font-size: 1.15rem !important;
    }
  }
}
.submit-btn {
  margin-top: 1.5rem;
  margin-bottom: 3rem;
  border-radius: 9px;
  background-color:  #42b983 !important;
}
.h-color{
  color: #42b983;
}
</style>
<style>
.pagination {
    display: inline-block;
    padding-left: 0;
    margin: 20px 0;
    border-radius: 4px;
}
.pagination > li {
    display: inline;
}
.pagination > .active > a, .pagination > .active > span, .pagination >
.active > a:hover, .pagination > .active > span:hover, .pagination > .active > a:focus,
.pagination > .active > span:focus {
    z-index: 2 !important;
    color: #fff !important;
    cursor: default !important;
    background-color: #42b983 !important;
    border-color: #337ab7 !important;
}
.pagination > li > a, .pagination > li > span {
    position: relative !important;
    float: left !important;
    padding: 6px 12px !important;
    margin-left: -1px !important;
    line-height: 1.42857143 !important;
    color: #337ab7 !important;
    text-decoration: none !important;
    background-color: #42b983 !important;
    border: 1px solid #ddd !important;
}
.pagination > li > a, .pagination > li > span {
    position: relative !important;
    float: left !important;
    padding: 6px 12px !important;
    margin-left: -1px !important;
    line-height: 1.42857143 !important;
    color: #337ab7 !important;
    text-decoration: none !important;
    background-color: #fff !important;
    border: 1px solid #ddd !important;
}
</style>
