import { shallowMount, createLocalVue } from '@vue/test-utils';
import Login from '@/components/LoginComponent.vue';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Views/login.vue', () => {
  it('renders components properly', () => {
    const wrapper = shallowMount(Login, {
      localVue,
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.contains('div')).toBe(true);
    wrapper.vm.login({ preventDefault: jest.fn() });
  });

  it('test login method', () => {
    const actions = {
      LoginOrSignUp: jest.fn(),
    };

    const user = {
      namespaced: true,
      state: {},
      actions,
    };

    const store = new Vuex.Store({
      modules: {
        user,
      },
    });

    const wrapper = shallowMount(Login, {
      localVue,
      store,
      data: () => ({
        username: 'username',
        password: 'password',
      }),
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.contains('div')).toBe(true);
    wrapper.vm.login({ preventDefault: jest.fn() });
  });
});
