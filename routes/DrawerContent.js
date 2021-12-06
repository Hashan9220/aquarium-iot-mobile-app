import React from "react";
import {View, Image, StyleSheet, TouchableOpacity, Alert} from "react-native";
import {DrawerContentScrollView,} from "@react-navigation/drawer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, Drawer} from 'react-native-paper';

export default function DrawerContent({navigation}){

    const signOut = async () => {
        try {
            await AsyncStorage.removeItem('userData');
            await AsyncStorage.removeItem('userToken');
            navigation.navigate('StackNav');
        } catch (e) {

        }
    }

    const [active, setActive] = React.useState('');

    return(
       <View style={styles.drawerContainer}>
           <DrawerContentScrollView>
               <View style={styles.userInfoSection}>
                   <View style={styles.profilePicSection}>
                   </View>
                   <Text style={{marginLeft:100, marginTop: -65, fontSize: 20}}>User Name</Text>
                   <View style={styles.editBtnSection}>
                       <TouchableOpacity onPress={() => { }}>
                           <Image style={styles.edit_icon} source={require('../assets/icons/edit_icon.png')}/>
                       </TouchableOpacity>
                   </View>
               </View>
               <Drawer.Section title=" ">
                   <Drawer.Item
                       label="Change Password"
                       active={active === 'first'}
                       onPress={() => setActive('first')}
                   />
                   <Drawer.Item
                       label="Contact Us"
                       active={active === 'second'}
                       onPress={() => setActive('second')}
                   />
                   <Drawer.Item
                       label="Support"
                       active={active === 'third'}
                       onPress={() => setActive("second")}
                   />
               </Drawer.Section>

               <Drawer.Section title=" ">
                   <Drawer.Item
                       style={styles.signOutSection}
                       label="Sign Out"
                       active={active === 'fourth'}
                       onPress={() => {
                           signOut();
                       }}
                   />
               </Drawer.Section>
           </DrawerContentScrollView>
       </View>
    )
}

const styles =StyleSheet.create({
    drawerContainer:{
      flex: 1,
      padding:10,
      justifyContent: 'space-between'
    },
   userInfoSection:{
       padding:10,
       height: 100,
   },
    profilePicSection:{
        width:80,
        height: 80,
        borderRadius:50,
        backgroundColor: '#fff',
        elevation: 20,
        shadowColor: 'grey',
    },
    editBtnSection:{
        width:30,
        height: 30,
        borderRadius:50,
        backgroundColor: '#fff',
        marginLeft: 245,
        marginTop: -25,
        elevation: 20,
        shadowColor: 'grey',
    },
    signOutSection: {
        marginTop: 150,
    },
    edit_icon:{
        marginTop:-10,
        marginLeft:-10
    }
})

