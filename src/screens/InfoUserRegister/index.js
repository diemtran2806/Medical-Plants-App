import InfoUserRegisterComponent from '../../components/InfoUserRegister';
import {useContext, useEffect, useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import register, {clearAuthState} from '../../context/actions/auth/register';
import {GlobalContext} from '../../context/Provider';
import {useNavigation} from '@react-navigation/native';

const InfoUserRegister = ({route}) => {
  const navigation = useNavigation();
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [pass, setPass] = useState('');
  const {email} = route.params;

  const {
    authDispatch,
    authState: {error, loading, data},
  } = useContext(GlobalContext);

  useEffect(() => {
    if (data) {
      navigation.navigate('Login');
    }
  }, [data]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        //hàm dọn dẹp
        if (data || error) {
          clearAuthState()(authDispatch); //này để xóa data để có thể quay lại register chứ k thôi nó cứ nhảy dô login
        }
      };
    }, [data, error]),
  );

  const onChange = ({name, value}) => {
    setForm({...form, [name]: value});

    if (value !== '') {
      if (name === 'password') {
        if (value.length < 6) {
          setErrors(prev => {
            return {
              ...prev,
              [name]: 'Password need min 6 characters!',
            };
          });
        } else {
          setErrors(prev => {
            return {...prev, [name]: null};
          });
        }
        setPass(value);
      }
      if (name === 'retypePassword') {
        if (value !== pass) {
          setErrors(prev => {
            return {
              ...prev,
              [name]: 'The passwords do not match. Please try again.',
            };
          });
        } else {
          setErrors(prev => {
            return {...prev, [name]: null};
          });
        }
      } else {
        setErrors(prev => {
          return {...prev, [name]: null};
        });
      }
    } else {
      setErrors(prev => {
        return {...prev, [name]: 'This field is required!'};
      });
    }
  };

  const onSubmit = () => {
    if (!form.username) {
      setErrors(prev => {
        return {...prev, username: 'Please add a username!'};
      });
    }
    if (!form.password) {
      setErrors(prev => {
        return {...prev, password: 'Please add a password!'};
      });
    }
    if (!form.retypePassword) {
      setErrors(prev => {
        return {...prev, retypePassword: 'Please retype password!'};
      });
    }
    //navigation.navigate('VerifyEmail');

    if (
      Object.values(form).length === 3 &&
      Object.values(form).every(item => item.trim().length > 0) &&
      Object.values(errors).every(item => !item)
    ) {
      // register(form)(authDispatch)((response) => {
      //   navigate(LOGIN, {data: response});
      // });
      const newForm = {
        email: email,
        username: form.username,
        password: form.password,
      };
      register(newForm)(authDispatch);
      navigation.navigate('Login');
    }
  };
  return (
    <InfoUserRegisterComponent
      onSubmit={onSubmit}
      onChange={onChange}
      form={form}
      errors={errors}
      error={error}
      loading={loading}
    />
  );
};

export default InfoUserRegister;
