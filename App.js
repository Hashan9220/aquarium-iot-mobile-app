import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import SplashScreen from "react-native-splash-screen";

import OnBoarding from "./views/OnBoarding";

const App = ()  => {

    useEffect(() => {
        setTimeout(() => {
            console.log("hello");
            SplashScreen.hide();
        },2000)
    })

  return(
      <OnBoarding/>
  );
};

export default App;
