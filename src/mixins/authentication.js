
export default {
  computed: {
    isAuthenticated() {
      return this.$store.state.user.user;
    },
  },
  methods: {
    logOut() {
      localStorage.removeItem('accessUser');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('accessUserId');
      this.$store.commit('user/addUser', {});
      this.$router.push('/');
    },
    authenticatedSession() {
      const username = localStorage.getItem('accessUser');
      const token = localStorage.getItem('accessToken');
      const id = localStorage.getItem('accessUserId');
      if (username && token) {
        this.$store.commit('user/addUser', { username, token, id });
      }
    },
  },
};
