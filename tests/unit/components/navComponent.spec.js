import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import NavComponent from '@/components/NavComponent.vue';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('Views/NavComponent.vue', () => {
  it('renders components properly', () => {
    const wrapper = shallowMount(NavComponent, {
      localVue,
      mocks: {
        $modal: {
          show: jest.fn(),
          hide: jest.fn(),
        },
        $store: {
          state: {
            user: { user: { username: 'ken', id: 1, token: 'token' } },
          },
        },
      },
      stubs: { 'router-link': RouterLinkStub },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.contains('div')).toBe(true);
    wrapper.vm.modalShow();
    wrapper.vm.modalHide();
  });
});
