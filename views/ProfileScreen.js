    import React, {useEffect, useState} from 'react';
    import {Image, StyleSheet, TouchableOpacity, View,} from 'react-native';
    import LinearGradient from 'react-native-linear-gradient';
    import {ActivityIndicator, Divider, Text} from 'react-native-paper';
    import {launchImageLibrary} from 'react-native-image-picker';
    import AsyncStorage from '@react-native-async-storage/async-storage';
    import baseURL from "../services/baseURL";

    export default function ProfileScreen() {

        const [id, setId] = useState('');
        const [token, setToken] = useState('');
        const [userEmail, setUserEmail] = useState('');
        const [pic, setPic] = useState('');
        const [contact, setUserContact] = useState('');
        const [name, setUserName] = useState('');
        const [address, setUserAddress] = useState('');
        const [loading, setLoading] = useState(false);
        const formdata = new FormData();

        useEffect(() => {
            getId();
            getToken();

        }, []);
        const getId = async () => {
            let value = await AsyncStorage.getItem('id');
            if (value !== null) {
                setId(value)
            }
        }
        const getToken = async () => {
            let token = await AsyncStorage.getItem('token');
            if (token !== null) {
                setToken(token)
            }
        }

        const imageUpload = async () => {
            let options = {
                mediaType: 'photo', quality: 1, includeBase64: true,
            };
            launchImageLibrary(options, response => {
                if (response.didCancel === true) {
                    alert("cancel image upload")
                } else if (response.errorCode && parseInt(response.errorCode)) {
                    alert("error image upload")
                } else {
                    setPic(response.assets[0].base64);
                    const file = {
                        uri: response.assets[0].uri,
                        name: response.assets[0].fileName,
                        type: response.assets[0].type,
                    };
                    formdata.append('image', file);
                    uploadImage();
                    alert("Image Update Success")
                }
            })
        }

        const uploadImage = async () => {
            await fetch(baseURL + 'uploadImage/' + id, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
                method: 'POST',
                body: formdata
            })
                .then(response => response.json())  // promise
                .then((responseData) => {
                })
        }

        const startLoading = () => {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 3000);
        };

        return (<LinearGradient
            colors={['#a6d4ff', '#1E90FF']}
            style={styles.container}>
            {loading ? (<ActivityIndicator
                visible={loading}
                textStyle={styles.spinnerTextStyle}
            />) : (<View style={styles.card} onScroll={startLoading}>
                <View style={styles.imgContainer}>
                    <Image
                        size={100}
                        source={{uri: 'data:image/png;base64,' + pic}}
                        style={styles.images}
                    />
                </View>
                <TouchableOpacity
                    style={styles.cameraContainer}
                    onPress={() => imageUpload()}>
                    <Image
                        style={{marginLeft: '5%'}}
                        source={require('../assets/icons/camera.png')}
                    />
                </TouchableOpacity>
                <Text style={styles.name}>{name}</Text>
            </View>)}
            <View style={styles.mainContainer}>
                <View style={styles.detailContainer}>
                    <Text style={styles.heading}>Name :- {name}       </Text>
                    <Text style={styles.detail}> </Text>
                </View>
                <Divider/>
                <View style={styles.detailContainer}>
                    <Text style={styles.heading}>Email :- {userEmail}  </Text>
                    <Text style={styles.detail}> </Text>
                </View>
                <Divider/>
                <View style={styles.detailContainer}>
                    <Text style={styles.heading}>Address :- {address}    </Text>
                    <Text style={styles.detail}> </Text>
                </View>
                <Divider/>
                <View style={styles.detailContainer}>
                    <Text style={styles.heading}>Contact :- {contact}    </Text>
                    <Text style={styles.detail}> </Text>
                </View>
                <Divider/>
            </View>
        </LinearGradient>);
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center',
        }, card: {
            padding: 5,
            width: '90%',
            height: '30%',
            borderRadius: 25,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '-15%',
        }, imgContainer: {
            width: 100, height: 100, borderRadius: 50, backgroundColor: '#fff', borderWidth: 1, borderColor: '#a6d4ff',
        }, cameraContainer: {
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
            marginTop: '5%', fontSize: 25, color: '#34495e',
        }, heading: {
            color: '#fff', fontSize: 20, textAlign: 'left',
        }, detail: {
            color: '#fff', fontSize: 20, textAlign: 'right', marginTop: '-7%',
        }, mainContainer: {
            marginTop: '10%', width: '90%',
        }, detailContainer: {
            width: '100%', padding: 5, marginTop: '5%',
        }, images: {
            width: 100, height: 100, borderRadius: 50, marginLeft: '-1%',
        },
    });
