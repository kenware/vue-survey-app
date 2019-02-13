import { shallowMount } from '@vue/test-utils';
import MaterializeInit from '@/mixins/materializeInit-mixin';


describe('Mixin function', () => {
  it('renders components properly', () => {
    const wrapper = shallowMount(MaterializeInit);
    expect(wrapper.exists()).toBe(true);
  });
});
