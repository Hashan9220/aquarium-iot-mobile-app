import React, {Fragment, Component, useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Alert, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Text, Divider, TextInput} from 'react-native-paper';
import * as ImagePicker from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {state} from "react-native-push-notification/component";

export default function ProfileScreen({navigation}) {
    const[userEmail,  setUserEmail] = useState('');
    const[contact,  setUserContact] = useState('');
    const[name,  setUserName] = useState('');
    useEffect(async ()=>{
        try{
            let email = await AsyncStorage.getItem('email');
            let contact = await AsyncStorage.getItem('contact');
            let name = await AsyncStorage.getItem('name');
            setUserEmail(email);
            setUserContact(contact);
            setUserName(name);
            console.log(email)
            console.log(contact)
            console.log(name)
        }
        catch(error){

        }

    },[])
    return (
        <LinearGradient
            colors={['#a6d4ff', '#1E90FF']}
            style={styles.container}>
            <View style={styles.card}>
                <View style={styles.imgContainer}>
                    <Image
                        /* source={{uri: state.fileData}}*/
                        style={styles.images}
                    />
                </View>
                <TouchableOpacity
                    style={styles.cameraContainer}
                    onPress={launchImageLibrary}>
                    <Image
                        style={{marginLeft: '5%'}}
                        source={require('../assets/icons/camera.png')}
                    />
                </TouchableOpacity>
                <Text style={styles.name}>{userEmail}</Text>
            </View>

            <View style={styles.mainContainer}>
                <View style={styles.detailContainer}>
                    <Text style={styles.heading}> {userEmail} </Text>
                    <Text style={styles.detail}> </Text>
                </View>
                <Divider/>

                <View style={styles.detailContainer}>
                    <Text style={styles.heading}>{contact} </Text>
                    <Text style={styles.detail}> </Text>
                </View>
                <Divider/>

                <View style={styles.detailContainer}>
                    <Text style={styles.heading}> {name} </Text>
                    <Text style={styles.detail}> </Text>
                </View>
                <Divider/>

                <View style={styles.detailContainer}>
                    <Text style={styles.heading}> {contact} </Text>
                    <Text style={styles.detail}> </Text>
                </View>
                <Divider/>
            </View>
        </LinearGradient>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        padding: 5,
        width: '90%',
        height: '30%',
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '-15%',
    },
    imgContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#a6d4ff',
    },
    cameraContainer: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: '#a6d4ff',
        borderWidth: 3,
        borderColor: '#a6d4ff',
        marginTop: '-12%',
        marginLeft: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        marginTop: '5%',
        fontSize: 25,
        color: '#34495e',
    },
    heading: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'left',
    },
    detail: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'right',
        marginTop: '-7%',
    },
    mainContainer: {
        marginTop: '10%',
        width: '90%',
    },
    detailContainer: {
        width: '100%',
        padding: 5,
        marginTop: '5%',
    },
    images: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginLeft: '-1%',
    },
});
