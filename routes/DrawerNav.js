import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNav from "./BottomTabNav";

const Drawer = createDrawerNavigator();

export default function DrawerContent(){
    return(
        <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />} >
            <Drawer.Screen
                options={{
                    title: '',
                    headerStyle: {backgroundColor: 'rgb(76,209,55)'}
                }
                }
                name="BottomTabs" component={BottomTabNav} />
        </Drawer.Navigator>
    )
}
