
import UserStore from '@/store/userStore';
import baseUrl from '@/config/host';

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
    await action.LoginOrSignUp({ commit }, { user, url: 'users/', key: 'signup' });

    expect(url).toBe(`${baseUrl}/v1/users/`);
    expect(body).toEqual(user);
  });

  it('should login user', async () => {
    const commit = jest.fn();
    await action.LoginOrSignUp({ commit }, { user, url: 'login/', key: 'login' });

    expect(url).toBe(`${baseUrl}/v1/login/`);
    expect(body).toEqual(user);
  });

  it('catches an error with bad request', async () => {
    mockError = true;
    const commit = jest.fn();
    await action.LoginOrSignUp({ commit }, {});
    expect(body).toEqual(user);
    expect(commit).toHaveBeenCalledWith(
      'updateError', { data: undefined, key: undefined },
    );
  });
});
