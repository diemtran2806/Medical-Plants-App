import {View, Text} from 'react-native';
import {useState} from 'react';
import VerifyEmailComponent from '../../components/VerifyEmail';
import {useNavigation} from '@react-navigation/native';
const VerifyEmail = ({route}) => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();
  const {email} = route.params;

  const onChange = ({name, value}) => {
    setForm({...form, [name]: value});

    if (value !== '') {
      if (name === 'otp') {
        if (value.length < 6) {
          setErrors(prev => {
            return {
              ...prev,
              [name]: 'OTP need min 6 characters!',
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
    if (!form.otp) {
      setErrors(prev => {
        return {...prev, otp: 'Please add an otp!'};
      });
      // return;
    }
    fetch('http://172.20.10.3:8000/auth/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        otp: form.otp,
      }),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the API response as needed
        console.log('data:', data);
        navigation.navigate('InfoUserRegister', {email: email});
      })
      .catch(error => {
        console.error('Failed to send otp', error);
      });
  };

  return (
    <VerifyEmailComponent
      onSubmit={onSubmit}
      onChange={onChange}
      form={form}
      errors={errors}
    />
  );
};

export default VerifyEmail;
