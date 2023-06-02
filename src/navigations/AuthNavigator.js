import react from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Welcome from '../screens/Welcome';
import VerifyEmail from '../screens/VerifyEmail';
import InfoUserRegister from '../screens/InfoUserRegister';

const AuthNavigator = () => {
  const AuthStack = createNativeStackNavigator();
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Welcome" component={Welcome}></AuthStack.Screen>
      <AuthStack.Screen name="Login" component={Login}></AuthStack.Screen>
      <AuthStack.Screen name="Register" component={Register}></AuthStack.Screen>
      <AuthStack.Screen
        name="VerifyEmail"
        component={VerifyEmail}></AuthStack.Screen>
      <AuthStack.Screen
        name="InfoUserRegister"
        component={InfoUserRegister}></AuthStack.Screen>
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
