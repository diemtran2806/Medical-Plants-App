import {useNavigation} from '@react-navigation/native';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {StyleSheet} from 'react-native';
import CustomButton from '../CustomButton';
import Container from '../Container';
import Input from '../Input';

const RegisterComponent = ({onSubmit, onChange, form, errors}) => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.container}> */}
      <Image
        source={require('../../asserts/images/register.png')}
        style={styles.image}
      />
      <View style={styles.info}>
        <View>
          <Text style={styles.email}>What's your email?</Text>
          <Input
            label="Email"
            placeholder="Enter your email"
            onChangeText={value => {
              onChange({name: 'email', value});
            }}
            error={errors.email}
          />
          <View style={styles.register}>
            <Text style={styles.text}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.textReg}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.btn}>
        <CustomButton
          primary
          title="Continue     >"
          //onPress={() => navigation.navigate('VerifyEmail')}
          onPress={onSubmit}
        />
      </View>
      {/* </View> */}
    </ScrollView>
  );
};

export default RegisterComponent;

const styles = StyleSheet.create({
  container: {
    // position: 'relative',
    flex: 1,
    backgroundColor: '#164655',
    fontFamily: 'K2D',
  },
  image: {
    //flex: 30,
    width: '100%',
    height: 200,
    //aspectRatio: 1,
    resizeMode: 'cover',
  },
  info: {
    flex: 1,
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
  register: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginTop: '25%',
  },
});
