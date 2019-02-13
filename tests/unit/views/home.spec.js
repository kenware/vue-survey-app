import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';

describe('Views/Home.vue', () => {
  it('renders components properly', () => {
    const wrapper = shallowMount(Home, {
      methods: { init: () => {} },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.contains('div')).toBe(true);
  });
});
