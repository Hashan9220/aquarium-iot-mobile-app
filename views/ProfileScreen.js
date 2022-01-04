import React, { Fragment, Component } from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Text, Divider, TextInput } from 'react-native-paper';
import * as ImagePicker from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ProfileScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {
            filepath: {
                data: '',
                uri: ''
            },
            fileData: '',
            fileUri: '',
            data: '',
            fullName: '',
            email: '',
            password: ''
        }
    }

    componentDidMount(){
        this.getFullName()
    }

    launchImageLibrary = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
                cameraRoll: true,
                waitUntilSaved: true
            },
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = { uri: response.uri };
                console.log('response = ', response.assets[0].uri);
                this.setState({
                    filePath: response,
                    fileData: response.assets[0].uri,
                    fileUri: response.uri
                });
                this.saveImg
            }
        });
    }

    saveImg = async () => {
        try {
            await AsyncStorage.setItem('@pro_img', JSON.stringify(this.state.data))
            console.log("image saved to async");
        } catch (e) {
        }
    }

     getFullName = async () => {
        const value = await AsyncStorage.getItem('reg_Full_Name')
         if (value !== null) {
             console.log("Full name printed");
         }
    }

    render(){
        return(
            <LinearGradient
                colors={['#a6d4ff', '#1E90FF']}
                style={styles.container}
            >
                <View style={styles.card}>
                    <View style={styles.imgContainer}>
                        <Image source={{ uri: this.state.fileData }}
                               style={styles.images}
                        />
                    </View>
                    <TouchableOpacity style={styles.cameraContainer} onPress={this.launchImageLibrary}>
                        <Image style={{marginLeft: '5%'}} source={require('../assets/icons/camera.png')}/>
                    </TouchableOpacity>
                    <Text style={styles.name}>Mindula Dilthushan</Text>
                </View>

                <View style={styles.mainContainer}>
                    <View style={styles.detailContainer}>
                        <Text style={styles.heading}> First Name </Text>
                        <Text style={styles.detail}> {this.state.fullName} </Text>
                    </View>
                    <Divider/>

                    <View style={styles.detailContainer}>
                        <Text style={styles.heading}> Last Name </Text>
                        <Text style={styles.detail}> {this.state.email} </Text>
                    </View>
                    <Divider/>

                    <View style={styles.detailContainer}>
                        <Text style={styles.heading}> Email </Text>
                        <Text style={styles.detail}> {this.state.fullName} </Text>
                    </View>
                    <Divider/>

                    <View style={styles.detailContainer}>
                        <Text style={styles.heading}> Phone </Text>
                        <Text style={styles.detail}> {this.state.email} </Text>
                    </View>
                    <Divider/>
                </View>

            </LinearGradient>
        )
    }
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
        marginTop: '-15%'
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
        alignItems: 'center'
    },
    name: {
        marginTop: '5%',
        fontSize: 25,
        color: '#34495e'
    },
    heading: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'left'
    },
    detail: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'right',
        marginTop: '-7%'
    },
    mainContainer: {
        marginTop: '10%',
        width: '90%'
    },
    detailContainer: {
        width: '100%',
        padding: 5,
        marginTop: '5%'
    },
    images: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginLeft: '-1%'
    }

})
