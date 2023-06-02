import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'react-native/Libraries/Components/Button';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

const WelcomeScreen = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={require('../asserts/images/welcome2.png')}
      />
      <View style={styles.nameApp}>
        <Text style={styles.title}>Identify Medical Plants</Text>
      </View>
      <View style={styles.des}>
        <Text style={styles.description}>
          You can identify the medical plants you don’t know
        </Text>
      </View>
      <View style={styles.btn}>
        <CustomButton
          primary
          title="Get Started"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 100,
    backgroundColor: '#164655',
    fontFamily: 'K2D',
  },
  img: {
    //position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 300,
    height: 300,
    //left: 50,
    // left: 28,
    // top: 46,
  },
  nameApp: {
    flex: 20,
    //backgroundColor: 'yellow',
    marginTop: 30,
  },
  title: {
    color: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 34,
    fontWeight: 900,
    fontFamily: 'K2D',
  },
  des: {
    flex: 20,
    //backgroundColor: 'green',
  },
  description: {
    color: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  btn: {
    flex: 10,
    marginBottom: 30,
    //backgroundColor: 'red',
  },
});

{
  /* <LinearGradient
        colors={[
          '#143F4D',
          'rgba(41, 81, 89, 0.89761)',
          'rgba(55, 92, 97, 0.830761)',
          'rgba(82, 114, 112, 0.704924)',
          'rgba(120, 146, 135, 0.52)',
          'rgba(120, 146, 135, 0.52)',
          'rgba(57, 94, 98, 0.823132)',
          'rgba(42, 81, 89, 0.895323)',
          'rgba(47, 30, 82, 0.954799)',
        ]}
        style={styles.container}> */
}
{
  /* </LinearGradient> */
}
