import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import validator from 'validator';
import RegisterComponent from '../../components/Signup';
const Register = () => {
  const navigation = useNavigation();
  const validator = require('validator');
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const onChange = ({name, value}) => {
    setForm({...form, [name]: value});

    if (value !== '') {
      if (name === 'email') {
        if (!validator.isEmail(value)) {
          setErrors(prev => {
            return {
              ...prev,
              [name]: 'Email is invalid, please enter a valid email!',
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
    if (!form.email) {
      setErrors(prev => {
        return {...prev, email: 'Please add a email!'};
      });
      // return;
    }
    fetch('http://172.20.10.3:8000/auth/sendotp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: form.email,
      }),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the API response as needed
        console.log('data:', data);
        navigation.navigate('VerifyEmail', {email: form.email});
      })
      .catch(error => {
        console.error('Failed to send email', error);
      });
  };
  return (
    <RegisterComponent
      onSubmit={onSubmit}
      onChange={onChange}
      form={form}
      errors={errors}
    />
  );
};

export default Register;
