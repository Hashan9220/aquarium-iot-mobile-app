import React, {useEffect} from 'react';
import {Text, View} from "react-native";
import SplashScreen from "react-native-splash-screen";
import OnBoardingScreen from "./views/OnBoardingScreen";

const App = ()  => {

    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hide();
        },2000)
    })

  return(
      <OnBoardingScreen/>
  );
};

export default App;
