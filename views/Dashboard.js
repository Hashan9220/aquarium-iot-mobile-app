import React from "react";
import { Image, StyleSheet,  } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from "../routes/DrawerContent";
import BottomTab from "../routes/BottomTab";
import { NavigationContainer } from "@react-navigation/native";
import StackNav from "../routes/StackNav";
import forgotpassword from './forgotpassword';
import signIn from './signIn';
import welcome from './welcome';
import register from './register';

const Drawer = createDrawerNavigator();

export default function Dashboard() {
    return (
        <NavigationContainer independent={true}>
            <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />}>
                <Drawer.Screen
                    options={{
                        headerTintColor: '#FFFFFF',
                        title: 'Dashboard',
                        headerTitleStyle: { color: '#fff' },
                        drawerStyle: {
                            width: 320,
                            height: 580,
                            marginTop: 60,
                            borderTopRightRadius: 40,
                            borderBottomRightRadius: 40
                        },
                        headerStyle: { backgroundColor: '#a6d4ff' },

                        drawerIcon: ({ focused, size }) => (
                            <Image source={require('../assets/logos/notification_icon.png')} />
                        ),
                    }}
                    name="BottomTab" component={BottomTab}
                />
                <Drawer.Screen options={{headerShown: null}} name={"StackNav"} component={StackNav}/>
                <Drawer.Screen options={{headerShown: null}} name={"Dashboard"} component={Dashboard}/>
                <Drawer.Screen options={{headerShown: null}} name={"Welcome"} component={welcome}/>
                <Drawer.Screen options={{headerShown: null}} name={"ForgotPassword"} component={forgotpassword}/>
                <Drawer.Screen options={{headerShown: null}} name={"Register"} component={register}/>
                <Drawer.Screen options={{headerShown: null}} name={"SignIn"} component={signIn}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    drawerStyle: {
        borderWidth: 0.5,
        borderColor: 'black',
        margin: 10,
    }
})
