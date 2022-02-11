import React, {Component} from 'react'
import {StyleSheet, KeyboardAvoidingView, View, Text, TouchableOpacity, Image, StatusBar} from 'react-native';
import LinearGradient from "react-native-linear-gradient";

export default function Welcome ({navigation}) {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <LinearGradient colors={['#a6d4ff', '#1E90FF']} style={styles.linearGradient}>
                    <StatusBar backgroundColor='#a6d4ff'/>

                    {/*----------------Title Name------------*/}
                    <Text style={styles.titleName}> Smart Aquarium </Text>

                    {/*----------------Image Circle------------*/}
                    <View style={styles.imgCircle}>
                        <Image style={styles.logo} source={require('../assets/logos/main_logo.png')}/>
                    </View>

                    {/*----------------Head Title ------------*/}
                    <Text style={styles.headTitle}>
                        Welcome in {"\n"} Smart Aquarium
                    </Text>

                    {/*--------------- Details Title------------*/}
                    <Text style={styles.detailTitle}>
                        A fish is an animal which {"\n"}
                        lives and breathes in water.
                    </Text>

                    {/*----------------Sign In Button-----------*/}
                    <TouchableOpacity style={styles.btnSignIn}
                                      onPress={() => {
                                          this.props.navigation.navigate('SignIn');
                                      }}
                    >
                        <Text style={styles.btnSignInTxt}>{'Sign In'}</Text>
                    </TouchableOpacity>

                    {/*----------------Register Button-----------*/}
                    <TouchableOpacity style={styles.btnRegister}
                                      onPress={() => {
                                          this.props.navigation.navigate('Register');
                                      }}
                    >
                        <Text style={styles.btnRegisterTxt}>{'Register'}</Text>
                    </TouchableOpacity>

                </LinearGradient>
            </KeyboardAvoidingView>
        )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    linearGradient: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    titleName: {
        fontSize: 25,
        fontFamily: 'Montserrat',
        color: '#ffffff',
        marginBottom: '6%'
    },
    imgCircle: {
        width: 230,
        height: 230,
        backgroundColor: '#ffffff',
        borderRadius: 230,
        elevation: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headTitle: {
        fontSize: 35,
        fontFamily: 'Montserrat',
        color: '#ffffff',
        marginTop: '5%',
        textAlign: "center"
    },
    detailTitle: {
        fontSize: 18,
        fontFamily: 'Montserrat',
        color: '#ffffff',
        marginTop: '5%',
        textAlign: "center",
    },
    btnSignIn: {
        width: 280,
        height: 50,
        elevation: 8,
        backgroundColor: "#A9D4FF",
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: '10%'
    },
    btnSignInTxt: {
        fontSize: 20,
        color: "#ffffff",
        fontWeight: "bold",
        alignSelf: "center",
        marginTop: '1%'
    },
    btnRegister: {
        width: 280,
        height: 50,
        elevation: 8,
        backgroundColor: "#ffffff",
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: '5%'
    },
    btnRegisterTxt: {
        fontSize: 20,
        color: "#5FB0FF",
        fontWeight: "bold",
        alignSelf: "center",
        marginTop: '1%'
    },
    logo: {
        width: "130%",
        height:"130%",
    }
})
