import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer,CommonActions} from '@react-navigation/native';
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
import Home from './views/Home';


const Stack = createStackNavigator();

const App = () => {

    const [token, setToken] = useState(null)

    useEffect(() => {
        const init = async () => {
            let token = null;

            try {
                token = await AsyncStorage.getItem('token');
                setToken(token);
            } catch (e) {
                console.log(e);
            }
        };
        init().finally(async () => {
            await RNBootSplash({fade: true});
        });

    }, []);

    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hide();
        }, 1000);

    }, []);
    if (token === null) {
        return (<NavigationContainer independent={true}>
                <Stack.Navigator
                    shifting="true"
                    screenOptions={() => ({
                        headerShown: false,
                        gestureEnabled: false,
                        cardOverlayEnabled: false,
                        gestureDirection: 'horizontal',
                    })}>

                    <Stack.Screen name="OnBoarding" component={OnBoarding}/>
                    <Stack.Screen name="Welcome" component={Welcome}/>
                    <Stack.Screen name="SignIn" component={SignIn}/>
                    <Stack.Screen name="Register" component={Register}/>
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
                    <Stack.Screen name="Dashboard" component={Dashboard}/>
                </Stack.Navigator>
            </NavigationContainer>);
    } else {
        return (<NavigationContainer independent={true}>
                <Stack.Navigator
                    shifting="true"
                    screenOptions={() => ({
                        headerShown: false,
                        gestureEnabled: false,
                        cardOverlayEnabled: false,
                        gestureDirection: 'horizontal',
                    })}>
                    <Stack.Screen name="Dashboard" component={Dashboard}/>
                </Stack.Navigator>
            </NavigationContainer>);
    }
};

export default App;
