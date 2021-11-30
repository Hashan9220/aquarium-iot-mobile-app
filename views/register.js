import React, {Component} from "react";
import {StyleSheet, KeyboardAvoidingView, View, Text, TouchableOpacity, Image, Alert} from 'react-native'
import LinearGradient from "react-native-linear-gradient";
import RadioForm from 'react-native-simple-radio-button';
import auth from '@react-native-firebase/auth';

//Common
import {BasicInput} from "../common/BasicInput";

const radio_props = [
    {label: 'Agree to Terms & Conditions', value: 0},
];

export default class register extends Component {

    constructor(props) {
        super();
        this.state = {
            fullname: '',
            email: '',
            password: '',
            confirmpassword: '',
            nameError: false,
            emailError: false,
            passwordError: false,
            confirmPasswordError: false
        };
    }

    //Validation---------------------------------------------------
    fullNameValidate = (text) => {
        let nameReg = /^[a-zA-Z ]{2,40}$/;
        if (nameReg.test(text) === false) {
            this.setState({nameError: true});
            this.setState({fullname: text})
            return false;
        } else {
            this.setState({fullname: text})
            this.setState({nameError: false});
        }
    }
    emailValidate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            this.setState({emailError: true});
            this.setState({email: text})
            return false;
        } else {
            this.setState({email: text})
            this.setState({emailError: false});
        }
    }
    passwordValidate = (text) => {
        let pwReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        if (pwReg.test(text) === false) {
            this.setState({passwordError: true});
            this.setState({password: text})
            return false;
        } else {
            this.setState({password: text})
            this.setState({passwordError: false});
        }
    }

    //User Register------------------------------------------------
    registerUser = () => {
        if (this.state.password == this.state.confirmpassword) {
            auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password, this.state.fullname, this.state.confirmpassword)
                .then(() => {
                    this.setState({confirmPasswordError: false});
                    Alert.alert("Success !");
                    this.props.navigation.navigate('SignIn');
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        Alert.alert("That email address is already in use!");
                    }
                    if (error.code === 'auth/invalid-email') {
                        Alert.alert("That email address is invalid!");
                    }
                    console.error(error);
                });
        } else {
            this.setState({confirmPasswordError: true});
        }
    }

    render() {

        return (
            <KeyboardAvoidingView style={styles.container}>
                <LinearGradient colors={['#a6d4ff', '#1E90FF']} style={styles.linearGradient}>

                    {/*----------------------------Back Button----------------------------*/}
                    <TouchableOpacity style={styles.btnBack}
                                      onPress={() => {
                                          this.props.navigation.navigate('Welcome');
                                      }}
                    >
                        <Image source={require('../assets/icons/left_arrow.png')} style={styles.imgBack}>
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
                    <BasicInput viewLabel='Full Name'
                                valuData={this.state.fullname}
                                valueSet={
                                    text => this.fullNameValidate(text)
                                }
                                txtEntry={false}
                    />
                    {this.state.nameError ? <Text style={styles.txtUserError}> Invalid Full Name </Text> : <></>}

                    <BasicInput viewLabel='Email'
                                valuData={this.state.email}
                                valueSet={
                                    text => this.emailValidate(text)
                                }
                                txtEntry={false}
                    />

                    {this.state.emailError ? <Text style={styles.txtError}> Invalid Email Address </Text> : <></>}

                    <BasicInput viewLabel='Password'
                                valuData={this.state.password}
                                valueSet={
                                    text => this.passwordValidate(text)
                                }
                                txtEntry={true}
                    />
                    {this.state.passwordError ? <Text style={styles.txtPwError}> Invalid Password Format </Text> : <></>}

                    <BasicInput viewLabel='Confirm Password'
                                valuData={this.state.confirmpassword}
                                valueSet={
                                    text => this.setState({
                                        confirmpassword: text
                                    })
                                }
                                txtEntry={true}

                    />
                    {this.state.confirmPasswordError ?
                        <Text style={styles.txtCPWError}> Password Different </Text> : <></>}


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
                    <TouchableOpacity style={styles.btnRegister} onPress={this.registerUser}>
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
    txtError: {
        color: "#ff2020",
        fontSize: 15,
        marginLeft: "-38%",
        marginTop: "-2%"
    },
    txtPwError: {
        color: "#ff2020",
        fontSize: 15,
        marginLeft: "-31%",
        marginTop: "-2%"
    },
    txtUserError:{
        color: "#ff2020",
        fontSize: 15,
        marginLeft: "-45%",
        marginTop: "-2%"
    },
    txtCPWError:{
        color: "#ff2020",
        fontSize: 15,
        marginLeft: "-40%",
        marginTop: "-2%"
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
