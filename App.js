import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
//Screens---------------------------------------------------------------------------------------------------------------
import OnBoarding from './views/OnBoarding';
import Welcome from './views/Welcome';
import SignIn from './views/SignIn';
import Register from './views/Register';
import ForgotPassword from './views/ForgotPassword';
import Dashboard from './views/Dashboard';
import QrCode from './views/QrCode';



const Stack = createStackNavigator();

const App = () => {
    const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);

    const [token, setToken] = useState(null)

    useEffect(() => {
        const init = async () => {
            let userToken = null;
            try {
                userToken = await AsyncStorage.getItem('userToken');
                setToken(userToken);
            } catch (e) {
                console.log(e);
            }
        };
    }, []);

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
        return (
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
                    <Stack.Screen name="OnBoarding" component={OnBoarding}/>
                    <Stack.Screen name="Welcome" component={Welcome}/>
                    <Stack.Screen name="SignIn" component={SignIn}/>
                    <Stack.Screen name="Register" component={Register}/>
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
                    <Stack.Screen name="Dashboard" component={Dashboard}/>
                    <Stack.Screen name="QrCode" component={QrCode}/>

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
                    })}>
                    <Stack.Screen name="Dashboard" component={Dashboard}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
};

export default App;
