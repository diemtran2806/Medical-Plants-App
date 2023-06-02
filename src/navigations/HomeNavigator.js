import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Setting from '../screens/Setting';
import History from '../screens/History';
import EditInfo from '../screens/EditInfo';

const HomeNavigator = () => {
  const AuthStack = createNativeStackNavigator();
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Home" component={Home}></AuthStack.Screen>
      <AuthStack.Screen name="Setting" component={Setting}></AuthStack.Screen>
      <AuthStack.Screen name="History" component={History}></AuthStack.Screen>
      <AuthStack.Screen name="EditInfo" component={EditInfo}></AuthStack.Screen>
    </AuthStack.Navigator>
  );
};

export default HomeNavigator;
