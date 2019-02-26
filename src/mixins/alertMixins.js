import swal from 'sweetalert';
import formatContent from './formatAlertContent';

export default {
  methods: {
    Alert(title, status, messageObject, timer) {
      const content = formatContent(messageObject);
      return swal({
        // eslint-disable-next-line prefer-template
        title,
        timer,
        icon: status === 'error' ? 'warning' : status,
        button: 'Cancel',
        content: {
          element: 'span',
          attributes: {
            innerHTML: `${content}`,
          },
        },
      });
    },
    sendResponse(response, modalName, successMessage, errorTitle) {
      if (response.status === 'success') {
        this.$modal.hide(modalName);
        this.Alert('Success', 'success', { message: successMessage }, 3000);
        this.$router.push('/dashboard');
      } else {
        const title = errorTitle;
        this.Alert(title, 'error', response.data.data, 3000);
      }
    },
  },
};
