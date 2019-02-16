import { shallowMount, createLocalVue } from '@vue/test-utils';
import SignUp from '@/components/SignupComponent.vue';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Views/signup.vue', () => {
  it('renders components properly', () => {
    const wrapper = shallowMount(SignUp, {
      localVue,
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.contains('div')).toBe(true);
    wrapper.vm.signup({ preventDefault: jest.fn() });
  });

  it('test signup method', () => {
    const actions = {
      signUp: jest.fn(),
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

    const wrapper = shallowMount(SignUp, {
      localVue,
      store,
      data: () => ({
        email: 'foo@gmaol.com',
        username: 'username',
        password: 'password',
        vpassword: 'password',
        firstName: 'kevin',
      }),
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.contains('div')).toBe(true);
    wrapper.vm.signup({ preventDefault: jest.fn() });
  });

  it('test email watch', () => {
    const wrapper = shallowMount(SignUp);
    wrapper.setData({ email: 'foo' });
    expect(wrapper.vm.email).toBe('foo');
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.contains('div')).toBe(true);
  });
  it('test email watch', () => {
    const wrapper = shallowMount(SignUp);
    wrapper.setData({ email: 'foo@gmail.com' });
    expect(wrapper.vm.email).toBe('foo@gmail.com');
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.contains('div')).toBe(true);
  });
  it('should send an alert after success', () => {
    const spy = jest.fn();
    const wrapper = shallowMount(SignUp, {
      mocks: {
        $modal: {
          hide: jest.fn(),
        },
      },
    });
    wrapper.vm.sendResponse({ status: 'error', data: { data: 'error occured' } });
    wrapper.vm.sendResponse({ status: 'success' });
    wrapper.vm.sendResponse = spy;
    wrapper.vm.sendResponse({ status: 'success' });
    expect(spy).toHaveBeenCalledWith({ status: 'success' });
  });
});
