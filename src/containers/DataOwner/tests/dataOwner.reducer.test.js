import reducer from '../dataOwner.reducer';
import {
  GET_STATS_FAILED,
  GET_STATS_LOADING,
} from '../../../constants/actionTypes';

describe('DataOwnerReducer', () => {
  const state = {
    isLoading: false,
    data: [],
    error: null,
    uploadFileStaus: null,
  };
  xit('Should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(state);
  });

  xit('Should update loading state value to true', () => {
    const expectedState = {
      isLoading: true,
      data: [],
      error: null,
    };
    const literalAction = {
      type: GET_STATS_LOADING,
    };
    expect(reducer(state, literalAction)).toEqual(expectedState);
  });

  xit('Should update error state', () => {
    const expectedState = {
      isLoading: false,
      data: [],
      error: { code: '500', msg: 'error' },
    };
    const literalAction = {
      type: GET_STATS_FAILED,
      error: { code: '500', msg: 'error' },
    };
    expect(reducer(state, literalAction)).toEqual(expectedState);
  });
});
