
import AssessmentStore from '@/store/assessmentStore';
import baseUrl from '@/config/host';

const { actions } = AssessmentStore;
const headers = { headers: { Authorization: 'Bearer null' } };

let url = '';
let body = {};
let mockError = false;
jest.mock('axios', () => ({
  get: (_url, _body) => new Promise((resolve) => {
    if (mockError) { throw Error(); }

    url = _url;
    body = _body;
    resolve(true);
  }),
}));

describe('assessment store', () => {
  it('should add an Assessment', async () => {
    const commit = jest.fn();
    await actions.get({ commit }, { key: 'assessment', url: '?userId=1' });

    expect(url).toBe(`${baseUrl}/v1/assessments/?userId=1`);
    expect(body).toEqual(headers);
  });

  it('catches an error with bad request', async () => {
    mockError = true;
    const commit = jest.fn();
    await actions.get({ commit }, { key: 'assessment', url: '?userId=1' });
    expect(commit).toHaveBeenCalledWith(
      'updateErrorState', { error: undefined, key: 'assessment' },
    );
  });
});
