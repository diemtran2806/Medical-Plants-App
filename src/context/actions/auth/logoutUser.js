import AsyncStorage from '@react-native-async-storage/async-storage';

export default () => dispatch => {
  AsyncStorage.removeItem('token');
  AsyncStorage.removeItem('user');
  dispatch({
    type: 'LOGOUT_USER',
  });
};
