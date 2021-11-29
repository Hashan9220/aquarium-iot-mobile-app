import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import SplashScreen from "react-native-splash-screen";
import OnBoardingScreen from "./views/OnBoardingScreen";
import Dashboard from "./views/Dashboard";
import {NavigationContainer} from "@react-navigation/native";
import BottomTabNav from "./routes/BottomTabNav";
import BottomTab from "./routes/BottomTab";
import SignIn from './views/signIn';
import Register from './views/register';


const App = ()  => {

    useEffect(() => {
        setTimeout(() => {
            console.log("hello");
            SplashScreen.hide();
        },2000)
    })

  return(
          <SignIn/>
  );
};

export default App;
