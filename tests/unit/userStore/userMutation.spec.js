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
      errors: { login: null },
    };
    const error = { key: 'login', data: 'error login' };
    mutations.updateError(state, error);

    expect(state.errors.login).toEqual(error.data);
  });
});
