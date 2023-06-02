import axiosInstance from '../../../helpers/axiosInterceptor';

export const clearAuthState = () => dispatch => {
  dispatch({type: 'CLEAR_AUTH_STATE'});
};

export default ({email, username, password}) =>
  dispatch => {
    dispatch({type: 'REGISTER_LOADING'});
    axiosInstance
      .post('auth/register', {email, username, password})
      .then(res => {
        dispatch({type: 'REGISTER_SUCCESS', payload: res.data});
      })
      .catch(err => {
        dispatch({
          type: 'REGISTER_FAIL',
          payload: err.response
            ? err.response.data
            : {error: 'Something went wrong.'},
        });
      });
  };
