import React from "react";
import { Image, StyleSheet,  } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from "../routes/DrawerContent";
import BottomTab from "../routes/BottomTab";
import { NavigationContainer } from "@react-navigation/native";
import StackNav from "../routes/StackNav";
import ForgotPassword from './ForgotPassword';
import signIn from './SignIn';
import welcome from './Welcome';
import register from './Register';
import FeedScreen from './FeedScreen';
import QrCode from './QrCode';

const Drawer = createDrawerNavigator();

export default function Dashboard() {
    return (
        <NavigationContainer independent={true}>
            <Drawer.Navigator initialRouteName="" drawerContent={props => <DrawerContent {...props} />}>
                <Drawer.Screen
                    options={{
                        headerTintColor: '#FFFFFF',
                        title: '',
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
                    name="Bottom Tab" component={BottomTab}
                />
                <Drawer.Screen options={{headerShown: null}} name={"StackNav"} component={StackNav}/>
                <Drawer.Screen options={{headerShown: null}} name={"Dashboard"} component={Dashboard}/>
                <Drawer.Screen options={{headerShown: null}} name={"Welcome"} component={welcome}/>
                <Drawer.Screen options={{headerShown: null}} name={"ForgotPassword"} component={ForgotPassword}/>
                <Drawer.Screen options={{headerShown: null}} name={"Register"} component={register}/>
                <Drawer.Screen options={{headerShown: null}} name={"SignIn"} component={signIn}/>
                <Drawer.Screen options={{headerShown: true}} name={"FeedScreen"} component={FeedScreen}/>
                <Drawer.Screen options={{headerShown: true}} name={"QrCode"} component={QrCode}/>

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
