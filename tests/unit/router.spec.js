import { shallowMount, createLocalVue } from '@vue/test-utils';
import App from '@/App.vue';
import VueRouter from 'vue-router';
import routes from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('App', () => {
  it('renders a component via routing', () => {
    const wrapper = shallowMount(App, { localVue, routes, methods: { init: () => {} } });

    routes.push('/about');

    expect(wrapper.find(App).exists()).toBe(true);
  });
});
