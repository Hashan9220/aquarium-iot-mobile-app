import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Image,} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Text, Divider, TextInput, ActivityIndicator} from 'react-native-paper';
import * as ImagePicker from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
    const [userEmail, setUserEmail] = useState('');
    const [pic, setPic] = useState('');
    const [contact, setUserContact] = useState('');
    const [name, setUserName] = useState('');
    const [address, setUserAddress] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(async () => {
        // try {
        //     let  = await AsyncStorage.getItem('name');
        //     name: json.user.name,
        //     email: json.user.email,
        //     address: json.user.address,
        //     contact: json.user.contact
        //     let name = await AsyncStorage.getItem('name');
        //     let email = await AsyncStorage.getItem('email');
        //     let address = await AsyncStorage.getItem('address');
        //     let contact = await AsyncStorage.getItem('contact');
        //     console.log(contact);
        //     setUserName(name);
        //     setUserEmail(email);
        //     setUserAddress(address);
        //     setUserContact(contact);
        //
        // } catch (error) {
        //
        // }
    }, [])

    const startLoading = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    };
    const imageUpload = () =>{
    let options = {
        mediaType:'photo',
        quality:1,
        includeBase64: true,
    };
    launchImageLibrary(options,response => {
       setPic(response.assets[0].base64);
    })
    }
    return (<LinearGradient
            colors={['#a6d4ff', '#1E90FF']}
            style={styles.container}>
            {loading ? (<ActivityIndicator
                    visible={loading}
                    textStyle={styles.spinnerTextStyle}
                />) : (
                <View style={styles.card} onScroll={startLoading}>
                    <View style={styles.imgContainer}>
                        <Image
                            size={100}
                            source={{uri: 'data:image/png;base64,'+pic}}
                            style={styles.images}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.cameraContainer}
                        onPress={imageUpload}>
                        <Image
                            style={{marginLeft: '5%'}}
                            source={require('../assets/icons/camera.png')}
                        />
                    </TouchableOpacity>
                    <Text style={styles.name}>{name}</Text>
                </View>)}
            <View style={styles.mainContainer}>
                <View style={styles.detailContainer}>
                    <Text style={styles.heading}>Name       :- {name}       </Text>
                    <Text style={styles.detail}> </Text>
                </View>
                <Divider/>
                <View style={styles.detailContainer}>
                    <Text style={styles.heading}>Email       :- {userEmail}  </Text>
                    <Text style={styles.detail}> </Text>
                </View>
                <Divider/>
                <View style={styles.detailContainer}>
                    <Text style={styles.heading}>Address   :- {address}    </Text>
                    <Text style={styles.detail}> </Text>
                </View>
                <Divider/>
                <View style={styles.detailContainer}>
                    <Text style={styles.heading}>Contact    :- {contact}    </Text>
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
            }, card: {
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
            }, name: {
                marginTop: '5%',
                fontSize: 25,
                color: '#34495e',
            }, heading: {
                color: '#fff',
                fontSize: 20,
                textAlign: 'left',
            }, detail: {
                color: '#fff',
                fontSize: 20,
                textAlign: 'right',
                marginTop: '-7%',
            }, mainContainer: {
                marginTop: '10%', width: '90%',
            }, detailContainer: {
                width: '100%',
                padding: 5,
                marginTop: '5%',
            }, images: {
                width: 100,
                height: 100,
                borderRadius: 50,
                marginLeft: '-1%',
            },
        });
