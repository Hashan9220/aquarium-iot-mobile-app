import React, {Component} from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RadioForm from 'react-native-simple-radio-button';
//Common
import {BasicInput} from '../common/BasicInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {state} from "react-native-push-notification/component";

import {TextInput, Platform, TouchableWithoutFeedback, Button, Keyboard} from 'react-native';

const radio_props = [{label: 'Agree to Terms & Conditions', value: 0}];

export default function Register({navigation}) {

    //Validation---------------------------------------------------
    /* const firstNameValidate = text => {
       let nameReg = /^[a-zA-Z ]{1,40}$/;
       if (nameReg.test(text) === false) {
         this.setState({nameError: true});
         this.setState({firstname: text});
         return false;
       } else {
         this.setState({firstname: text});
         this.setState({nameError: false});
       }
     };
     const lastNameValidate = text => {
       let nameReg = /^[a-zA-Z ]{1,40}$/;
       if (nameReg.test(text) === false) {
         this.setState({nameError: true});
         this.setState({lastname: text});
         return false;
       } else {
         this.setState({lastname: text});
         this.setState({nameError: false});
       }
     };
     const emailValidate = text => {
       let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
       if (reg.test(text) === false) {
         this.setState({emailError: true});
         this.setState({email: text});
         return false;
       } else {
         this.setState({email: text});
         this.setState({emailError: false});
       }
     };
     const phoneValidate = text => {
       let reg = /^\d{10}$/;
       if (reg.test(text) === false) {
         this.setState({phoneError: true});
         this.setState({phone: text});
         return false;
       } else {
         this.setState({phone: text});
         this.setState({phoneError: false});
       }
     };
     const passwordValidate = text => {
       let pwReg =
         /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
       if (pwReg.test(text) === false) {
         this.setState({passwordError: true});
         this.setState({password: text});
         return false;
       } else {
         this.setState({password: text});
         this.setState({passwordError: false});
       }
     };*/

    //User Register------------------------------------------------
    const registerUser = () => {

    };

    return (

        <LinearGradient
            colors={['#a6d4ff', '#1E90FF']}
            style={styles.linearGradient}>
            {/*----------------------------Back Button----------------------------*/}
            <TouchableOpacity
                style={styles.btnBack}
                onPress={() => {
                    navigation.navigate('Welcome');
                }}>
                <Image
                    source={require('../assets/icons/left_arrow.png')}
                    style={styles.imgBack}
                />
            </TouchableOpacity>

            {/*----------------------------Back Title----------------------------*/}
            <Text style={styles.backTitle}>Register</Text>

            {/*----------------------------Head Image----------------------------*/}

            <View style={styles.registerCircle}>
                <Image
                    style={styles.logo}
                    source={require('../assets/logos/main_logo.png')}
                />
            </View>
            <ScrollView>
                {/*----------------------------Head Title----------------------------*/}
                <Text style={styles.registerHeadTitle}>SMART {'\n'} AQUARIUM</Text>

                {/*---------------------------Common --------------------------------*/}
                <BasicInput
                    viewLabel="First Name"
                    // valuData={state.firstname}
                    // valueSet={text => firstNameValidate(text)}
                    txtEntry={false}
                />
                <BasicInput
                    viewLabel="Last Name"
                    // valuData={state.lastname}
                    // valueSet={text => lastNameValidate(text)}
                    txtEntry={false}
                />
                <BasicInput
                    viewLabel="Email"
                    // valuData={state.email}
                    // valueSet={text => emailValidate(text)}
                    txtEntry={false}
                />
                <BasicInput
                    viewLabel="phone"
                    // valuData={state.phone}
                    // valueSet={text => phoneValidate(text)}
                    txtEntry={false}
                />
                <BasicInput
                    viewLabel="Password"
                    // valuData={state.password}
                    // valueSet={text => passwordValidate(text)}
                    txtEntry={true}
                />
                <BasicInput
                    viewLabel="Confirm Password"
                    // valuData={state.confirmpassword}
                    // valueSet={text =>
                    //     this.setState({
                    //       confirmpassword: text,
                    //     })
                    // }
                    txtEntry={true}
                />
                {/* <BasicInput
              viewLabel="First Name"
              valuData={state.firstname}
              valueSet={text => firstNameValidate(text)}
              txtEntry={false}
            />
            {state.nameError ? (
              <Text style={styles.txtUserError}> Invalid First Name </Text>
            ) : (
              <></>
            )}
            <BasicInput
              viewLabel="Last Name"
              valuData={state.lastname}
              valueSet={text => lastNameValidate(text)}
              txtEntry={false}
            />
            {state.nameError ? (
              <Text style={styles.txtUserError}> Invalid last Name </Text>
            ) : (
              <></>
            )}

            <BasicInput
              viewLabel="Email"
              valuData={state.email}
              valueSet={text => emailValidate(text)}
              txtEntry={false}
            />

            {this.state.emailError ? (
              <Text style={styles.txtError}> Invalid Email Address </Text>
            ) : (
              <></>
            )}
            <BasicInput
              viewLabel="phone"
              valuData={state.phone}
              valueSet={text => phoneValidate(text)}
              txtEntry={false}
            />
            {state.nameError ? (
              <Text style={styles.txtUserError}> Invalid phone No </Text>
            ) : (
              <></>
            )}

            <BasicInput
              viewLabel="Password"
              valuData={state.password}
              valueSet={text => passwordValidate(text)}
              txtEntry={true}
            />
            {state.passwordError ? (
              <Text style={styles.txtPwError}> Invalid Password Format </Text>
            ) : (
              <></>
            )}

            <BasicInput
              viewLabel="Confirm Password"
              valuData={state.confirmpassword}
              valueSet={text =>
                this.setState({
                  confirmpassword: text,
                })
              }
              txtEntry={true}
            />
            {state.confirmPasswordError ? (
              <Text style={styles.txtCPWError}> Password Different </Text>
            ) : (
              <></>
            )}
*/}

            </ScrollView>
            {/*-------------------------- Radio Button ---------------------------*/}
            <RadioForm
                style={styles.rdBtn}
                radio_props={radio_props}
                initial={0}
                animation={true}
                buttonColor="#ffffff"
                labelStyle={{fontSize: 17, color: '#ffffff', fontFamily: 'Montserrat-Regular',}}
            />

            {/*----------------Register Button-----------*/}
            <TouchableOpacity
                style={styles.btnRegister}
                onPress={registerUser}>
                <Text style={styles.btnRegisterTxt}>{'Register'}</Text>
            </TouchableOpacity>
        </LinearGradient>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    linearGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnBack: {
        width: 45,
        height: 45,
        backgroundColor: 'rgba(0,0,0,0)',
        marginRight: '90%',
        marginTop: '6%',
    },
    imgBack: {
        width: 45,
        height: 45,
        marginTop: '-55%',
        marginLeft: '20%',
    },
    txtError: {
        color: '#ff2020',
        fontSize: 15,
        marginLeft: '-38%',
        marginTop: '-2%',
    },
    txtPwError: {
        color: '#ff2020',
        fontSize: 15,
        marginLeft: '-31%',
        marginTop: '-2%',
    },
    txtUserError: {
        color: '#ff2020',
        fontSize: 15,
        marginLeft: '-45%',
        marginTop: '-2%',
    },
    txtCPWError: {
        color: '#ff2020',
        fontSize: 15,
        marginLeft: '-40%',
        marginTop: '-2%',
    },
    backTitle: {
        fontSize: 33,
        fontFamily: 'Montserrat-Regular',
        color: '#ffffff',
        marginTop: '-15%',
    },
    registerCircle: {
        width: 160,
        height: 160,
        backgroundColor: '#ffffff',
        borderRadius: 230,
        elevation: 8,
        marginTop: '5%',

    },
    registerHeadTitle: {
        fontSize: 22,
        fontFamily: 'Montserrat-SemiBold',
        color: '#ffffff',
        marginTop: '0%',
        textAlign: 'center',
    },
    rdBtn: {
        marginTop: '3%',
    },
    btnRegister: {
        width: 280,
        height: 50,
        elevation: 8,
        backgroundColor: '#A9D4FF',
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: '5%',
    },
    btnRegisterTxt: {
        fontSize: 25,
        color: '#ffffff',
        fontFamily: 'Montserrat-Medium',
        alignSelf: 'center',
        marginTop: '-1%',
    },
    logo: {
        width: 160,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
