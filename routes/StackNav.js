import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from "../views/SignIn";
import Register from "../views/Register";
import ForgotPassword from "../views/ForgotPassword";
import OnBoarding from "../views/OnBoarding";

const Stack = createNativeStackNavigator();

export default function StackNav() {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name="OnBoarding" component={OnBoarding}/>
            <Stack.Screen options={{headerShown: false}} name="SignIn" component={SignIn}/>
            <Stack.Screen options={{headerShown: false}} name="Register" component={Register}/>
            <Stack.Screen options={{headerShown: false}} name="ForgotPassword" component={ForgotPassword}/>
        </Stack.Navigator>
    );
}
