import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import HomeComponent from '@/components/HomeComponent.vue';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('Views/Home.vue', () => {
  it('renders components properly', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HomeComponent, {
      methods: { init: () => {} },
      propsData: { msg },
      stubs: { 'router-link': RouterLinkStub },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.contains('div')).toBe(true);
    expect(wrapper.text()).toMatch(msg);
  });
});
