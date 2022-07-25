import { fetchClient } from 'services/search.service';
import {
  SEARCH_CLIENT_LOADING,
  SEARCH_CLIENT_FAILED,
  SEARCH_CLIENT_SUCCESS,
  CLEAN_INFO_CLIENT,
} from 'constants/actionTypes';
import { encode } from 'utils/encode';

export const searchClient = (data) => {
  function onSuccess(result) { return ({ type: SEARCH_CLIENT_SUCCESS, result }); }
  function onError(error) { return ({ type: SEARCH_CLIENT_FAILED, error }); }

  return (dispatch) => {
    dispatch({ type: SEARCH_CLIENT_LOADING });

    const req = {
      params: {
        number: data.number ? encode(data.number) : data.number,
        rfc: data.rfc ? encode(data.rfc) : data.rfc,
      },
    };
    return fetchClient(req).then(
      (response) => {
        if (!response.data.client[0]) {
          dispatch(onError({ response: { data: { message: 'Usuario no encontrado' } } }));
          return;
        }
        dispatch(onSuccess(response));
      },
      (error) => {
        dispatch(onError(error));
      },
    );
  };
};

export const cleanInfoClient = () => ({ type: CLEAN_INFO_CLIENT });
