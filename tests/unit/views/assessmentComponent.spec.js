import {
  mount, createLocalVue, RouterLinkStub,
} from '@vue/test-utils';
import AssessmentComponent from '@/views/AssessmentComponent.vue';
import VueRouter from 'vue-router';
import sinon from 'sinon';

import data from './assessmentMock';

const localVue = createLocalVue();
localVue.use(VueRouter);


describe('Views/AssessmentComponent.vue', () => {
  it('renders components properly', () => {
    const wrapper = mount(AssessmentComponent, {
      methods: {
        init: () => {},
      },
      mocks: {
        $router: {
          push: jest.fn(),
        },
        $store: {
          dispatch: () => ({ status: 'error' }),
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
  });

  it('test vue methods', () => {
    const wrapper = mount(AssessmentComponent,
      {
        localVue,
        methods: {
          init: () => {},
          apiCall: () => ({ assessmentData: { data: { data: '' }, status: 'error' }, isTaken: { status: 'success' } }),
        },
        mocks: {
          $router: {
            push: jest.fn(),
          },
          $store: {
            dispatch: () => ({ status: 'error' }),
            state: {
              assessment: data,
              user: { user: { username: 'ken', id: 1, token: 'token' } },
            },
          },
        },
        stubs: { 'router-link': RouterLinkStub },
      });

    sinon.spy(wrapper.vm, 'submit');
    sinon.spy(wrapper.vm, 'checked');
    wrapper.vm.submit('', 'elapsed');
    wrapper.vm.checked(1, 1);

    expect(wrapper.vm.submit.callCount).toBe(1);
    expect(wrapper.vm.checked.callCount).toBe(1);
    expect(wrapper.contains('div')).toBe(true);
  });

  it('test vue methods', () => {
    const wrapper = mount(AssessmentComponent,
      {
        localVue,
        methods: {
          init: () => {},
          apiCall: () => ({ assessmentData: { status: 'suces' }, isTaken: { data: { results: [1, 2] }, status: 'success' } }),
        },
        mocks: {
          $router: {
            push: jest.fn(),
          },
          $store: {
            dispatch: () => ({ status: 'error' }),
            state: {
              assessment: data,
              user: { user: { username: 'ken', id: 1, token: 'token' } },
            },
          },
        },
        stubs: { 'router-link': RouterLinkStub },
      });
    sinon.spy(wrapper.vm, 'handlePage');
    sinon.spy(wrapper.vm, 'postAnswer');
    sinon.spy(wrapper.vm, 'checked');
    wrapper.vm.handlePage(1);
    wrapper.vm.postAnswer(1, 1);
    wrapper.vm.checked(1, 2);

    expect(wrapper.vm.handlePage.callCount).toBe(1);
    expect(wrapper.vm.postAnswer.callCount).toBe(1);
    expect(wrapper.vm.checked.callCount).toBe(1);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.contains('div')).toBe(true);
  });
});
