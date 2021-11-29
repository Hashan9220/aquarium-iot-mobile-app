import React from "react";
import {Image, StyleSheet, View} from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import {NavigationContainer} from "@react-navigation/native";
import DrawerContent from "../routes/DrawerContent";
import BottomTab from "../routes/BottomTab";

const Drawer = createDrawerNavigator();

export default function Dashboard(){
    return(
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />} >
                <Drawer.Screen
                    options={{
                        headerTintColor: '#FFFFFF',
                        title:'Title',
                        headerTitleStyle:{color:'#fff'},

                        drawerStyle:{width:320, height: 580, marginTop: 60, borderTopRightRadius: 40, borderBottomRightRadius: 40},
                        headerStyle: {backgroundColor: '#a6d4ff'},

                        drawerIcon: ({focused, size}) => (
                            <Image source={require('../assets/logos/notification_icon.png')}/>
                        ),
                    }}
                    name="BottomTab" component={BottomTab}
                    />
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
     drawerStyle:{
            borderWidth: 0.5,
            borderColor:'black',
            margin:10,
        }
})
