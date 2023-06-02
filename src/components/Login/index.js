import {useNavigation} from '@react-navigation/native';
import {Image, View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {StyleSheet} from 'react-native';
import CustomButton from '../CustomButton';
import Input from '../Input';
import axios from 'axios';
import {useState} from 'react';

const LoginComponent = ({onSubmit, loading, onChange, form, error}) => {
  const navigation = useNavigation();
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Image
          source={require('../../asserts/images/login.png')}
          style={styles.image}
        />
        {error && <Text>{error.error}</Text>}
        <View style={styles.info}>
          <View>
            <Input
              label="Username"
              placeholder="Enter Username"
              onChangeText={value => {
                onChange({name: 'username', value});
              }}
              error={error?.username?.[0]}
            />
            <Input
              label="Password"
              secureTextEntry={isSecureEntry}
              placeholder="Enter Password!"
              icon={
                <TouchableOpacity
                  onPress={() => {
                    setIsSecureEntry(prev => !prev);
                  }}>
                  {isSecureEntry ? (
                    <Image
                      source={require('../../asserts/images/show.png')}
                      style={styles.hideshowPass}
                    />
                  ) : (
                    <Image
                      source={require('../../asserts/images/hide.png')}
                      style={styles.hideshowPass}
                    />
                  )}
                </TouchableOpacity>
              }
              onChangeText={value => {
                onChange({name: 'password', value});
              }}
              error={error?.password?.[0]}
            />
            <View style={styles.register}>
              <Text style={styles.text}>Need a new account??</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.textReg}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* <View>
          <CustomButton primary title="Click me" onPress={() => getMethod()} />
        </View> */}
        <View style={styles.btn}>
          <CustomButton primary title="Login" onPress={onSubmit} />
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginComponent;

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
    resizeMode: 'cover',
  },
  hideshowPass: {
    width: 24,
    height: 24,
    marginRight: 6,
  },
  info: {
    //flex: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 24,
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
    //flex: 20,
    marginTop: '10%',
  },
});
