import store from '@/store/store';

describe('Root store', () => {
  it('non function', () => {
    // eslint-disable-next-line no-underscore-dangle
    expect(typeof store).toBe('object');
  });
});
