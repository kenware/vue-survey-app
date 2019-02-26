import {
  mount, createLocalVue, RouterLinkStub,
} from '@vue/test-utils';
import Dashboard from '@/views/dashboard.vue';
import VueRouter from 'vue-router';
import sinon from 'sinon';

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
      methods: { init: () => {} },
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
    sinon.spy(wrapper.vm, 'handlePage');

    wrapper.vm.handlePage(2);
    expect(wrapper.vm.handlePage.callCount).toBe(1);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.contains('div')).toBe(true);
    wrapper.find('a.alert').trigger('click');
    wrapper.vm.redirectAlert('success', { m: ['success'] }, { params: 'assessment' });
  });
});
