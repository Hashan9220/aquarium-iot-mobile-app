import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from "../views/Dashboard";
import SignIn from "../views/signIn";
import Register from "../views/register";
import ForgotPassword from "../views/forgotpassword";

const Stack = createNativeStackNavigator();

export default function StackNav() {
    return (
            <Stack.Navigator>
                <Stack.Screen options={{headerShown: false}} name="SignIn" component={SignIn} />
                <Stack.Screen options={{headerShown: false}} name="Register" component={Register} />
                <Stack.Screen options={{headerShown: false}} name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen options={{headerShown: false}} name="Dashboard" component={Dashboard} />
            </Stack.Navigator>
    );
}
