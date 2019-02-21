module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://assessments-api.herokuapp.com',
        changeOrigin: true,
      },
    },
  },
};
