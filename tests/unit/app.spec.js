import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import App from '@/App.vue';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('App.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(App, {
      propsData: { msg },
      methods: { init: () => {} },
      stubs: { 'router-view': localVue },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.contains('div')).toBe(true);
  });
});
