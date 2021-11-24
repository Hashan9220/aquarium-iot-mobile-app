import React, {Component} from 'react'
import {StyleSheet, KeyboardAvoidingView, View, Text, TouchableOpacity, Image} from 'react-native'
import LinearGradient from "react-native-linear-gradient";

//Common
import {BasicInput} from "../common/BasicInput";

export default class forgotpassword extends Component {
    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <LinearGradient colors={['#a6d4ff', '#1E90FF']} style={styles.linearGradient}>

                    {/*----------------------------Back Button----------------------------*/}
                    <TouchableOpacity style={styles.btnBack}>
                        <Image source={require('../assets/icon/left_arrow.png')} style={styles.imgBack}>
                        </Image>
                    </TouchableOpacity>

                    {/*----------------------------Back Title----------------------------*/}
                    <Text style={styles.backTitle}>Forgot Password</Text>

                    {/*----------------------------Head Image----------------------------*/}
                    <View style={styles.forgotCircle}>
                    </View>

                    {/*----------------------------Head Title----------------------------*/}
                    <Text style={styles.HeadTitle}>
                        Smart {"\n"} Aquarium
                    </Text>

                    {/*----------------------------Head Details------------------------------------------*/}
                    <Text style={styles.headDetail}>
                        Enter Email Address
                    </Text>

                    {/*---------------------------Common --------------------------------*/}
                    <BasicInput viewLabel='Email Address'/>

                    {/*---------------- Forgot Password Button-----------*/}
                    <TouchableOpacity style={styles.btnForgotPassword}>
                        <Text style={styles.btnForgotPasswordTxt}>{'Forgot Password'}</Text>
                    </TouchableOpacity>


                </LinearGradient>
            </KeyboardAvoidingView>
        )
    }
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
    btnBack: {
        width: 45,
        height: 45,
        backgroundColor: "rgba(0,0,0,0)",
        marginRight: '90%'
    },
    imgBack: {
        width: 45,
        height: 45,
        marginTop: '-55%',
        marginLeft: '20%'
    },
    backTitle: {
        fontSize: 17,
        fontFamily: 'Montserrat',
        color: '#ffffff',
        marginTop: '-15%'
    },
    forgotCircle: {
        width: 160,
        height: 160,
        backgroundColor: '#ffffff',
        borderRadius: 230,
        elevation: 8,
        marginTop: '5%'
    },
    HeadTitle: {
        fontSize: 30,
        fontFamily: 'Montserrat',
        color: '#ffffff',
        marginTop: '5%',
        textAlign: "center"
    },
    headDetail: {
        fontSize: 15,
        fontFamily: 'Montserrat',
        color: '#ffffff',
        textAlign: "center",
        marginTop: "3%",
        marginBottom: "2%"
    },
    btnForgotPassword: {
        width: 280,
        height: 50,
        elevation: 8,
        backgroundColor: "#A9D4FF",
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: '10%',
        marginBottom: "40%"
    },

    btnForgotPasswordTxt: {
        fontSize: 23,
        color: "#ffffff",
        alignSelf: "center",
        marginTop: '-1%'
    },
})
