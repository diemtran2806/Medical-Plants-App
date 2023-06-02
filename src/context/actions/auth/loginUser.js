import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../../helpers/axiosInterceptor';

export default ({username, password}) =>
  dispatch => {
    dispatch({type: 'LOGIN_LOADING'});
    axiosInstance
      .post('auth/login', {username, password})
      .then(res => {
        // console.log(JSON.stringify(res.data.user));
        // console.log(typeof(JSON.stringify(res.data.user)));
        AsyncStorage.setItem('token', res.data.token.access_token);
        // console.log(res.data.token)
        //console.log(typeof(res.data.token))
        console.log('login dô nè:', JSON.stringify(res.data.user));
        AsyncStorage.setItem('user', JSON.stringify(res.data.user));
        dispatch({type: 'LOGIN_SUCCESS', payload: res.data});
      })
      .catch(err => {
        console.log(err);
        console.log(err.response);
        dispatch({
          type: 'LOGIN_FAIL',
          payload: err.response
            ? err.response.data
            : {error: 'Something went wrong.'},
        });
      });
  };
