import UserStore from '@/store/userStore';

const { mutations } = UserStore;

const user = {
  name: 'kevin',
  username: 'kenware',
};

describe('Mutation', () => {
  it('adds a user state', () => {
    const state = {
      user: {},
    };

    mutations.addUser(state, user);

    expect(state.user).toEqual(user);
  });
  it('update an error to state', () => {
    const state = {
      loginError: null,
    };
    const error = { key: 'loginError', data: 'error login' };
    mutations.updateError(state, error);

    expect(state.loginError).toEqual(error.data);
  });
});
