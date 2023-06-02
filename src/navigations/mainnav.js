import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {GlobalContext} from '../context/Provider';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';
const AppNavContainer = () => {
  const {
    authState: {isLoggedIn},
  } = useContext(GlobalContext);
  const [isAuthenticated, setIsAuthenicated] = useState(isLoggedIn);
  const [authLoaded, setAuthLoaded] = useState(false);

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      console.log(user);
      if (user) {
        setAuthLoaded(true);
        setIsAuthenicated(true);
      } else {
        setAuthLoaded(true);
        setIsAuthenicated(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
    setIsAuthenicated(isLoggedIn);
  }, [isLoggedIn]);

  console.log('is: ', isLoggedIn);
  console.log('Au:', isAuthenticated);
  return (
    <>
      {authLoaded ? (
        <NavigationContainer>
          {/* {isAuthenticated ? <HomeNavigator /> : <AuthNavigator />} */}
          {isAuthenticated ? <HomeNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
};

export default AppNavContainer;
