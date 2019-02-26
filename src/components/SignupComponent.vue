
<template>
  <modal :scrollable="true" width="65%" height="auto" name="signup">
     <div class="row">
        <div class="col s12 m6">
            <img src='../assets/images/assess8.jpg' class="form-img">
        </div>
        <div class="col s12 m6">
            <div class="row">
                <h4 class="center"> SignUp</h4>
                <form class="col s12" @submit="signup">
                <div class="row">
                    <div class="input-field col s6">
                    <input v-model="firstName" id="first_name" type="text" class="validate">
                    <label for="first_name">First Name</label>
                    <span class="error">{{errors.firstName}}</span>
                    </div>
                    <div class="input-field col s6">
                    <input v-model="lastName" id="last_name" type="text" class="validate">
                    <label for="last_name">Last Name</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                    <input v-model="username" id="username" type="text" class="validate">
                    <label for="username">Username</label>
                    <span class="error">{{errors.username}}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                    <input v-model="email" id="email" type="email" class="validate">
                    <label for="email">Email</label>
                    <span class="error">{{errors.email}}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6">
                    <input v-model="password" id="password" type="password" class="validate">
                    <label for="password">Password</label>
                    <span class="error">{{errors.password}}</span>
                    </div>
                    <div class="input-field col s6">
                    <input v-model="vpassword" id="verypassword" type="password" class="validate">
                    <label for="verypassword">Very Password</label>
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
import Validator from 'validatorjs';
import AlertMixins from '@/mixins/alertMixins';

export default {
  name: 'SignupComponent',
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      vpassword: '',
      errors: {
        email: null,
        username: null,
        password: null,
        firstName: null,
      },
    };
  },
  methods: {
    async signup(e) {
      e.preventDefault();
      this.errors = {};
      let response;
      const data = {
        firstName: this.firstName,
        username: this.username,
        email: this.email,
        password: this.password,
      };
      const rules = {
        email: 'required|email',
        firstName: 'required',
        username: 'required',
        password: ['required', 'min:5', { in: [this.vpassword] }],
      };
      const validator = new Validator(data, rules, {
        'in.password': 'Password and verify password must match',
      });
      validator.fails();
      const allError = validator.errors.errors;
      Object.entries(allError).forEach((obj) => {
        this.errors[obj[0]] = validator.errors.first(obj[0]);
      });
      if (!Object.keys(allError).length) {
        const detail = { user: data, url: 'users/', key: 'signup' };
        response = await this.$store.dispatch('user/LoginOrSignUp', detail);
        const successMessage = 'user successfully signed up';
        const errorTitle = 'Error occured during signup';
        this.sendResponse(response, 'signup', successMessage, errorTitle);
      } else {
        this.Alert('signup', 'error', allError, 3000);
      }
    },

  },
  watch: {
    email(newEmail) {
      const valid = new Validator({ email: newEmail }, { email: 'required|email' });
      if (valid.fails()) {
        this.errors.email = 'Invalid email address';
      } else {
        this.errors.email = null;
      }
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
@media only screen and (min-width: 600px) {
  .form-img {
    max-width: 100%;
    height: 100%;
}
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
