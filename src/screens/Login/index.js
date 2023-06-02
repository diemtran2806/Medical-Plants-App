import {useContext, useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import loginUser from '../../context/actions/auth/loginUser';
import {GlobalContext} from '../../context/Provider';
import {useNavigation} from '@react-navigation/native';
import LoginComponent from '../../components/Login';
const Login = () => {
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({});

  const {
    authDispatch,
    authState: {error, loading},
  } = useContext(GlobalContext);

  const onChange = ({name, value}) => {
    setForm({...form, [name]: value});
  };

  const onSubmit = () => {
    if (form.username && form.password) {
      loginUser(form)(authDispatch);
    }
  };
  return (
    <LoginComponent
      onSubmit={onSubmit}
      onChange={onChange}
      form={form}
      error={error}
      loading={loading}
    />
  );
};

export default Login;
