import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import SplashScreen from "react-native-splash-screen";
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Screens---------------------------------------------------------------------------------------------------------------
import OnBoarding from "./views/OnBoarding";
import Welcome from './views/welcome';
import SignIn from './views/signIn';
import Register from './views/register';
import ForgotPassword from "./views/forgotpassword";
import Dashboard from "./views/Dashboard";
import QrCode from "./views/QrCode";


const Stack = createStackNavigator();

const App = ()  => {

    useEffect(() => {
        setTimeout(() => {
            console.log("hello");
            SplashScreen.hide();
        },2000)
    })

  return(
      <NavigationContainer independent={true}>
          <Stack.Navigator
              shifting="true"
              screenOptions={() => ({
                  headerShown: false,
                  gestureEnabled: true,
                  cardOverlayEnabled: false,
                  gestureDirection: 'horizontal'
              })}>
              <Stack.Screen name="OnBoarding" component={OnBoarding}/>
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
              <Stack.Screen name="Dashboard" component={Dashboard} />
              <Stack.Screen name="QrCode" component={QrCode} />
          </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
