import AssessmentStore from '@/store/assessmentStore';

const { mutations } = AssessmentStore;

const assessment = { results: [{ assessments: [{ id: 1, type: 'verbal' }] }] };

describe('Assessment Mutation', () => {
  it('adds an assessment to state', () => {
    const state = {
      assessment: {},
    };

    mutations.addGetObjectToState(state, { key: 'assessment', value: assessment });

    expect(state.assessment).toEqual(assessment);
  });

  it('update an error to state', () => {
    const state = {
      errors: { assessment: null },
    };

    const error = { key: 'assessment', data: 'error assessment' };
    mutations.updateErrorState(state, error);

    expect(state.errors.assessment).toEqual(error.data);
  });
});
