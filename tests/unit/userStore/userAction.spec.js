
import UserStore from '@/store/userStore';

const action = UserStore.actions;
const user = {
  name: 'kevin',
  username: 'kenware',
};

let url = '';
let body = {};
let mockError = false;
jest.mock('axios', () => ({
  post: (_url, _body) => new Promise((resolve) => {
    if (mockError) { throw Error(); }

    url = _url;
    body = _body;
    resolve(true);
  }),
}));

describe('user store', () => {
  it('should signup user', async () => {
    const commit = jest.fn();
    await action.signUp({ commit }, user);

    expect(url).toBe('/api/v1/users/');
    expect(body).toEqual(user);
  });

  it('should login user', async () => {
    const commit = jest.fn();
    await action.login({ commit }, user);

    expect(url).toBe('/api/v1/login/');
    expect(body).toEqual(user);
  });

  it('catches an error with bad request', async () => {
    mockError = true;
    const commit = jest.fn();
    await action.signUp({ commit }, {});
    expect(body).toEqual(user);
    expect(commit).toHaveBeenCalledWith(
      'updateError', { data: undefined, key: 'signUpError' },
    );
  });

  it('catches an error with bad request', async () => {
    mockError = true;
    const commit = jest.fn();
    await action.login({ commit }, {});
    expect(body).toEqual(user);
    expect(commit).toHaveBeenCalledWith(
      'updateError', { data: undefined, key: 'loginError' },
    );
  });
});
