import React from "react";
import {Image, StyleSheet,onPress} from "react-native";
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from "../routes/DrawerContent";
import BottomTab from "../routes/BottomTab";
import {NavigationContainer} from "@react-navigation/native";
import StackNav from "../routes/StackNav";
import ForgotPassword from './ForgotPassword';
import signIn from './SignIn';
import welcome from './Welcome';
import register from './Register';
import FeedScreen from './FeedScreen';
import QrCode from './QrCode';
import Home from "./Home";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Drawer = createDrawerNavigator();

export default function Dashboard() {

    return (<NavigationContainer independent={true}>
        <Drawer.Navigator initialRouteName="" drawerContent={props => <DrawerContent {...props} onPress={props} />}>
            <Drawer.Screen
                options={{
                    headerTintColor: '#fff', title: '', headerTitleStyle: {color: '#fff'}, drawerStyle: {
                        flex:1,
                        width:'50%',
                        height:'100%',

                        borderTopRightRadius: 40,
                        borderBottomRightRadius: 40,
                    }, headerStyle: {backgroundColor: '#a6d4ff',},
                    drawerIcon: ({focused, size}) => (
                        <Image source={require('../assets/logos/notification_icon.png')} />),
                }}
                name="Bottom Tab" component={BottomTab}/>
            <Drawer.Screen options={{headerShown: null}} name={'StackNav'} component={StackNav}/>
            <Drawer.Screen options={{headerShown: null}} name={'Dashboard'} component={Dashboard}/>
            <Drawer.Screen options={{headerShown: null}} name={'Welcome'} component={welcome}/>
            <Drawer.Screen options={{headerShown: null}} name={'ForgotPassword'} component={ForgotPassword}/>
            <Drawer.Screen options={{headerShown: null}} name={'Register'} component={register}/>
            <Drawer.Screen options={{headerShown: null}} name={'SignIn'} component={signIn}/>
            <Drawer.Screen options={{headerShown: null}} name={'QrCode'} component={QrCode}/>
            <Drawer.Screen options={{headerShown: true}} name={'Home'} component={Home}/>
            <Drawer.Screen options={{headerShown: true}} name={'FeedScreen'} component={FeedScreen}/>


        </Drawer.Navigator>
    </NavigationContainer>);
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }, drawerStyle: {
        borderWidth: 0.5,
        borderColor: 'black',
        margin: 10,
    }
})
