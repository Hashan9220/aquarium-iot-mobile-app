import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Text, View} from "react-native";
import SplashScreen from "react-native-splash-screen";
import OnBoardingScreen from "./views/OnBoardingScreen";
import Dashboard from "./views/Dashboard";
import {NavigationContainer} from "@react-navigation/native";
import BottomTabNav from "./routes/BottomTabNav";
import BottomTab from "./routes/BottomTab";

const App = ()  => {

    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hide();
        },2000)
    })

  return(
          <Dashboard/>
  );
};

export default App;
