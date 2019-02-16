import swal from 'sweetalert';

export default {
  methods: {
    Alert(title, status, messageObject) {
      let content = '<ul>';
      const messagesArray = Object.entries(messageObject);
      messagesArray.forEach((messages) => {
        if (Array.isArray(messages[1])) {
          messages[1].forEach((message) => {
            content += `<li>${message}</li>`;
          });
        } else {
          content += `<li>${messages[1]}</li>`;
        }
      });
      content += '</ul>';
      // eslint-disable-next-line no-self-assign
      content = (content);

      return swal({
        // eslint-disable-next-line prefer-template
        title,
        timer: 3000,
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
        this.Alert('Success', 'success', { message: successMessage });
      } else {
        const title = errorTitle;
        this.Alert(title, 'error', response.data.data);
      }
    },
  },
};
