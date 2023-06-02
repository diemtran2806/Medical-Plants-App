import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../../context/Provider';
import logoutUser from '../../context/actions/auth/logoutUser';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
const SettingComponent = () => {
  const {authDispatch} = useContext(GlobalContext);
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [imageUser, setImageUser] = useState(null);

  const getUsername = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      setUsername(JSON.parse(user).username);
      console.log(username);
    } catch (error) {
      console.error('Failed to get username', error);
    }
  };

  const getImageUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      setImageUser(JSON.parse(user).avatar);
      console.log(imageUser + 'hihi');
    } catch (error) {
      console.error('Failed to get avatar', error);
    }
  };

  useEffect(() => {
    console.log('hihi');
    getUsername();
    getImageUser();
  }, []);

  const handleLogout = () => {
    Alert.alert('Logout!', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'OK',
        onPress: () => {
          logoutUser()(authDispatch);
        },
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image
          source={require('../../asserts/images/backBtn.png')}
          style={styles.image}
        />
      </TouchableOpacity>
      <View style={styles.avata}>
        {imageUser ? (
          <Image source={{uri: imageUser}} style={styles.imageAvata} />
        ) : (
          <Image
            source={require('../../asserts/images/avataDefault.png')}
            style={styles.imageAvata}
          />
        )}
      </View>
      <View style={styles.wrapperName}>
        <Text style={styles.name}>{username}</Text>
        <View style={styles.edit}>
          <TouchableOpacity onPress={() => navigation.navigate('EditInfo')}>
            <Text style={styles.text}>Edit Info</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.option}>
        <TouchableOpacity onPress={handleLogout} style={styles.logout}>
          <View style={styles.wrapperIcon}>
            <MaterialIcon name="logout" style={styles.icon} />
          </View>
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.logout}>
          <View style={styles.wrapperIcon}>
            <MaterialIcon name="delete" style={styles.icon} />
          </View>
          <Text style={styles.text}>Delete Account</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={handleLogout} style={styles.logout}>
          <View style={styles.wrapperIcon}>
            <MaterialIcon name="email" style={styles.icon} />
          </View>
          <Text style={styles.text}>Change your email</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default SettingComponent;

const styles = StyleSheet.create({
  container: {
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
  avata: {
    //flex: 20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#79AEA5',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 20,
  },
  imageAvata: {
    width: 94,
    height: 94,
    borderRadius: 47,
  },
  wrapperName: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: 'white',
    fontSize: 22,
    fontWeight: 700,
  },
  edit: {
    width: 100,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(217, 217, 217, 0.5)',
    borderRadius: 20,
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 500,
  },
  option: {
    //flex: 60,
    width: 310,
    height: 160,
    backgroundColor: 'rgba(217, 217, 217, 0.33)',
    marginVertical: 30,
    marginRight: 'auto',
    marginLeft: 'auto',
    borderRadius: 20,
  },
  logout: {
    flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  wrapperIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(217, 217, 217, 0.44)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    color: 'white',
    fontSize: 20,
  },
});
