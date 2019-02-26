import swal from 'sweetalert';
import formatContent from './formatAlertContent';

export default {
  methods: {
    redirectAlert(title, messageObject, routeData) {
      const content = formatContent(messageObject);
      return swal({
        // eslint-disable-next-line prefer-template
        title,
        content: {
          element: 'span',
          attributes: {
            innerHTML: `${content}`,
          },
        },
        buttons: {
          Cancel: true,
          proceed: true,
        },
      })
        .then((value) => {
          // eslint-disable-next-line default-case
          switch (value) {
            case 'proceed':
              this.$router.push(routeData.params);
          }
        });
    },
  },
};
