
<template>
  <modal :scrollable="true" width="65%" height="auto" name="login">
     <div class="row">
        <div class="col s12 m6">
            <img src='../assets/images/assess10.jpeg' class="form-img">
        </div>
        <div class="col s12 m6">
            <div class="row">
                <h4 class="center"> Login</h4>
                <form class="col s12" @submit="login">
                <div class="row">
                    <div class="input-field col s12">
                    <input v-model="username" id="username" type="text" class="validate">
                    <label for="username">Username</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                    <input v-model="password" id="password" type="password" class="validate">
                    <label for="password">Password</label>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12 center-align">
                    <button class="btn waves-effect waves-light submit-btn" type="submit">Submit
                      <i class="material-icons right">send</i>
                    </button>
                    </div>
                </div>
                </form>
            </div>
        </div>
     </div>
  </modal>
</template>

<script>
import AlertMixins from '@/mixins/alertMixins';

export default {
  name: 'LoginComponent',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login(e) {
      e.preventDefault();
      const user = {
        username: this.username,
        password: this.password,
      };
      const data = { user, url: 'login/', key: 'login' };
      const response = await this.$store.dispatch('user/LoginOrSignUp', data);
      const successMessage = 'User successfully authenticated';
      const errorTitle = 'Error occured during login';
      this.sendResponse(response, 'login', successMessage, errorTitle);
    },

  },
  mixins: [AlertMixins],
};
</script>

<style lang="scss" scoped>
.v--modal-overlay {
    position: fixed;
    box-sizing: border-box;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    z-index: 999;
    opacity: 1;
}
.error {
    color: red !important;
}
.submit-btn {
    background-color: #42b983 !important;
    border-radius: 10px !important;
}
.form-img {
    max-width: 100%;
    height: auto;
}
.swal-text {
  background-color: #FEFAE3;
  padding: 17px;
  border: 1px solid #F0E1A1;
  display: block;
  margin: 22px;
  text-align: center;
  color: #61534e;
}
</style>
