import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
//Screens---------------------------------------------------------------------------------------------------------------
import OnBoarding from './views/OnBoarding';
import Welcome from './views/welcome';
import SignIn from './views/signIn';
import Register from './views/register';
import ForgotPassword from './views/forgotpassword';
import Dashboard from './views/Dashboard';
import QrCode from './views/QrCode';
import UpCommingScreen from './views/UpCommingScreen';

const Stack = createStackNavigator();

const App = () => {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);

    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value === null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);
  if (isFirstLaunch === null) {
      return(
          null
      )
  } else if (isFirstLaunch === true) {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator
          shifting="true"
          screenOptions={() => ({
            headerShown: false,
            gestureEnabled: true,
            cardOverlayEnabled: false,
            gestureDirection: 'horizontal',
          })}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="QrCode" component={QrCode} />
          <Stack.Screen name="UpCommingScreen" component={UpCommingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator
          shifting="true"
          screenOptions={() => ({
              headerShown: false,
              gestureEnabled: true,
              cardOverlayEnabled: false,
              gestureDirection: 'horizontal',
          })}
        >
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;
