import {useNavigation} from '@react-navigation/native';
import {Image, View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {StyleSheet} from 'react-native';

import CustomButton from '../CustomButton';
import Input from '../Input';

const InfoUserRegisterComponent = ({
  onSubmit,
  onChange,
  form,
  loading,
  error,
  errors,
}) => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('VerifyEmail')}>
          <Image
            source={require('../../asserts/images/backBtn.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={styles.info}>
          {error?.error && <Text>{error.error}</Text>}
          <View>
            <Text style={styles.email}>Your Information</Text>
            <Input
              label="Username"
              placeholder="Enter your username"
              onChangeText={value => {
                onChange({name: 'username', value});
              }}
              error={errors.username || error?.username?.[0]}
            />
            <Input
              label="Password"
              secureTextEntry={true}
              placeholder="Enter your password"
              onChangeText={value => {
                onChange({name: 'password', value});
              }}
              error={errors.password || error?.password?.[0]}
            />
            <Input
              label="Retype password"
              secureTextEntry={true}
              placeholder="Retype your username"
              onChangeText={value => {
                onChange({name: 'retypePassword', value});
              }}
              error={errors.retypePassword || error?.retypePassword?.[0]}
            />
          </View>
        </View>
        <View style={styles.btn}>
          <View style={styles.textContinue}>
            <Text style={styles.text}>Tapping to Register</Text>
          </View>
          <CustomButton
            loading={loading}
            primary
            title="Sign up     >"
            onPress={onSubmit}
            disabled={loading}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default InfoUserRegisterComponent;

const styles = StyleSheet.create({
  container: {
    // position: 'relative',
    flex: 1,
    backgroundColor: '#164655',
    fontFamily: 'K2D',
  },
  image: {
    width: 40,
    height: 40,
    marginTop: 20,
    marginLeft: 20,
    resizeMode: 'cover',
  },
  info: {
    //flex: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 24,
  },
  email: {
    color: 'white',
    fontSize: 30,
    fontWeight: 800,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
    marginBottom: 30,
    fontFamily: 'K2D',
  },
  textContinue: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  text: {
    color: 'rgba(217,217,217,0.7)',
  },
  textReg: {
    color: 'white',
    fontWeight: 600,
    fontSize: 15,
    fontStyle: 'italic',
  },
  btn: {
    //flex: 1,
    marginTop: '10%',
  },
});
