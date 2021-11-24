import React, {Component} from 'react'
import {StyleSheet, KeyboardAvoidingView, View, Text, TouchableOpacity, Image} from 'react-native'
import LinearGradient from "react-native-linear-gradient";
import RadioForm from 'react-native-simple-radio-button';

//Common---------------------------------------------------
import {BasicInput} from "../common/BasicInput";

const radio_props = [
    {label: 'Remember the account ?', value: 0},
];

export default class signIn extends Component {
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
                    <Text style={styles.backTitle}>Sign In</Text>

                    {/*----------------------------Head Image----------------------------*/}
                    <View style={styles.signInCircle}>
                    </View>

                    {/*----------------------------Head Title----------------------------*/}
                    <Text style={styles.signInHeadTitle}>
                        Smart {"\n"} Aquarium
                    </Text>

                    {/*---------------------------Common --------------------------------*/}
                    <BasicInput viewLabel='User Name'/>
                    <BasicInput viewLabel='Password'/>

                    {/*-------------------------- Radio Button ---------------------------*/}
                    <RadioForm
                        style={styles.rdBtn}
                        radio_props={radio_props}
                        initial={0}
                        animation={true}
                        buttonColor='#ffffff'
                        labelStyle={{fontSize: 15, color: '#ffffff'}}
                    />

                    {/*----------------Sign In Button-----------*/}
                    <TouchableOpacity style={styles.btnSignIn}>
                        <Text style={styles.btnSignInTxt}>{'Sign In'}</Text>
                    </TouchableOpacity>

                    {/*----------------Forgot Password----------------*/}
                    <TouchableOpacity style={styles.btnForgotPassword}>
                        <Text style={styles.btnForgotPasswordTxt}>{'Forgot Password ?'}</Text>
                    </TouchableOpacity>

                    <View style={styles.separator}>
                    </View>

                    {/*----------------Register----------------*/}
                    <TouchableOpacity style={styles.btnReg}>
                        <Text style={styles.btnRegTxt}>{'Register'}</Text>
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
    signInCircle: {
        width: 160,
        height: 160,
        backgroundColor: '#ffffff',
        borderRadius: 230,
        elevation: 8,
        marginTop: '5%'
    },
    signInHeadTitle: {
        fontSize: 30,
        fontFamily: 'Montserrat',
        color: '#ffffff',
        marginTop: '5%',
        textAlign: "center"
    },
    rdBtn: {
        marginLeft: '-17%',
        marginTop: '3%'
    },
    btnForgotPassword: {
        width: '40%',
        height: '4%',
        backgroundColor: 'rgba(255,0,0,0)',
        textAlign: "center",
        marginTop: '5%'
    },
    btnForgotPasswordTxt: {
        fontSize: 17,
        color: "#ffffff",
        alignSelf: "center",
        marginTop: '2%'
    },
    separator: {
        width: '80%',
        height: 1,
        backgroundColor: 'rgb(255,255,255)',
        marginTop: '5%'
    },
    btnReg: {
        width: '40%',
        height: '4%',
        backgroundColor: 'rgba(255,0,0,0)',
        textAlign: "center",
        marginTop: '5%'
    },
    btnRegTxt: {
        fontSize: 19,
        color: "#ffffff",
        alignSelf: "center",
        fontWeight: 'bold'
    },
    btnSignIn: {
        width: 280,
        height: 50,
        elevation: 8,
        backgroundColor: "#A9D4FF",
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: '6%'
    },

    btnSignInTxt: {
        fontSize: 25,
        color: "#ffffff",
        alignSelf: "center",
        marginTop: '-1%'
    },
})
