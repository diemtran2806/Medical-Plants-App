import {useNavigation} from '@react-navigation/native';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';
import CustomButton from '../CustomButton';
import Input from '../Input';

const VerifyEmailComponent = ({onSubmit, onChange, form, errors}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Image
          source={require('../../asserts/images/backBtn.png')}
          style={styles.image}
        />
      </TouchableOpacity>
      <View style={styles.info}>
        <View>
          <Text style={styles.email}>Verify your email</Text>
          <Input
            label="OTP"
            placeholder="6 - Digit code"
            onChangeText={value => {
              onChange({name: 'otp', value});
            }}
            error={errors.otp}
          />
        </View>
      </View>
      <View style={styles.btn}>
        <View style={styles.textContinue}>
          <Text style={styles.text}>Tapping to Continue</Text>
        </View>
        <CustomButton primary title="Continue     >" onPress={onSubmit} />
      </View>
    </View>
  );
};

export default VerifyEmailComponent;

const styles = StyleSheet.create({
  container: {
    // position: 'relative',
    flex: 100,
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
    flex: 50,
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
    marginVertical: 20,
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
    flex: 20,
  },
});
