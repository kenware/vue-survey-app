import {
  mount, createLocalVue, RouterLinkStub,
} from '@vue/test-utils';
import Dashboard from '@/views/dashboard.vue';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(VueRouter);
const data = {
  score: { results: [] },
  assessment: {
    results: [{
      assessments: [
        {
          id: 1,
          type: 'Verbal Reasoning',
        },
      ],
    }],
  },
};

describe('Views/Dashboard.vue', () => {
  it('renders components properly', () => {
    const wrapper = mount(Dashboard, {
      localVue,
      mocks: {
        $store: {
          dispatch: jest.fn(),
          state: {
            assessment: data,
            user: { user: { username: 'ken', id: 1, token: 'token' } },
          },
        },
      },
      stubs: { 'router-link': RouterLinkStub },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.contains('div')).toBe(true);
    wrapper.find('a.alert').trigger('click');
    wrapper.vm.Alert('success', { m: ['success'] }, { params: 'assessment' });
  });
});
