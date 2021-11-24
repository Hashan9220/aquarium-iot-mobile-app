import React, {Component} from "react";
import {StyleSheet, KeyboardAvoidingView, View, Text, TouchableOpacity, Image} from 'react-native'
import LinearGradient from "react-native-linear-gradient";
import RadioForm from 'react-native-simple-radio-button';

//Common
import {BasicInput} from "../common/BasicInput";

const radio_props = [
    {label: 'Agree to Terms & Conditions', value: 0},
];

export default class register extends Component {
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
                    <Text style={styles.backTitle}>Register</Text>

                    {/*----------------------------Head Image----------------------------*/}
                    <View style={styles.registerCircle}>
                    </View>

                    {/*----------------------------Head Title----------------------------*/}
                    <Text style={styles.registerHeadTitle}>
                        Smart {"\n"} Aquarium
                    </Text>

                    {/*---------------------------Common --------------------------------*/}
                    <BasicInput viewLabel='Full Name'/>
                    <BasicInput viewLabel='Email'/>
                    <BasicInput viewLabel='Password'/>
                    <BasicInput viewLabel='Confirm Password'/>


                    {/*-------------------------- Radio Button ---------------------------*/}
                    <RadioForm
                        style={styles.rdBtn}
                        radio_props={radio_props}
                        initial={0}
                        animation={true}
                        buttonColor='#ffffff'
                        labelStyle={{fontSize: 15, color: '#ffffff'}}
                    />

                    {/*----------------Register Button-----------*/}
                    <TouchableOpacity style={styles.btnRegister}>
                        <Text style={styles.btnRegisterTxt}>{'Register'}</Text>
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
    registerCircle: {
        width: 160,
        height: 160,
        backgroundColor: '#ffffff',
        borderRadius: 230,
        elevation: 8,
        marginTop: '5%'
    },
    registerHeadTitle: {
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
    btnRegister: {
        width: 280,
        height: 50,
        elevation: 8,
        backgroundColor: "#A9D4FF",
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: '6%'
    },
    btnRegisterTxt: {
        fontSize: 25,
        color: "#ffffff",
        alignSelf: "center",
        marginTop: '-1%'
    },
})
