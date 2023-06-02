import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../../helpers/axiosInterceptor';

export const updateUser = userData => {
  return dispatch => {
    dispatch({type: 'UPDATE_USER_LOADING'});
    console.log('haha');
    // Gửi yêu cầu API để cập nhật thông tin người dùng
    axiosInstance
      .patch('users/update', userData)
      .then(res => {
        // Cập nhật thông tin người dùng đã được lưu trữ trong AsyncStorage
        // AsyncStorage.setItem('user', JSON.stringify(res.data));

        // dispatch({type: 'UPDATE_USER_SUCCESS', payload: res.data});
        console.log('up:', JSON.stringify(res.data.data));
        AsyncStorage.setItem('user', JSON.stringify(res.data.data));
        dispatch({type: 'UPDATE_USER_SUCCESS', payload: res.data});
      })
      .catch(err => {
        console.log(err);
        console.log(err.response);
        // dispatch({
        //   type: 'UPDATE_USER_FAIL',
        //   payload: err.response
        //     ? err.response.data
        //     : {error: 'Something went wrong.'},
        // });
      });
  };
};
