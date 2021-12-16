import React, {Component} from 'react'
import {StyleSheet, KeyboardAvoidingView, View, Text, TouchableOpacity, Image, Alert} from 'react-native'
import LinearGradient from "react-native-linear-gradient";
import RadioForm from 'react-native-simple-radio-button';
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Common---------------------------------------------------
import {BasicInput} from "../common/BasicInput";

const radio_props = [
    {label: 'Remember the account ?', value: 0},
];

export default class signIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            userData: {},
            emailError: false,
            passwordError: false
        }
    }

    //User Login -----------------------------------------------------------------------------
    userLogin = () => {
        auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then( json => {
                this.storeData(json.data);
                this.props.navigation.navigate('Dashboard');
            })
            .catch(error => {
            });
    }

    storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('alreadyLaunched', jsonValue)
            console.log('Data saved in Async storage');
        } catch (e) {
            Alert.alert(
                "Welcome!",
                "You have Successfully Signed In to Smart Aquarium",
            );
        }
    }

    //Validate -----------------------------------------------------------------------------------
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
                    <Text style={styles.backTitle}>Sign In</Text>

                    {/*----------------------------Head Image----------------------------*/}
                    <View style={styles.signInCircle}>
                        <Image style={styles.logo} source={require('../assets/logos/main_logo.png')}/>
                    </View>

                    {/*----------------------------Head Title----------------------------*/}
                    <Text style={styles.signInHeadTitle}>
                        Smart {"\n"} Aquarium
                    </Text>

                    {/*---------------------------Common --------------------------------*/}
                    <BasicInput viewLabel='Email'
                                valuData={this.state.email}
                                txtEntry={false}
                                valueSet={
                                    text => this.emailValidate(text)
                                }
                                autoCorrect={false}
                                autoCap="none"
                    />
                    {this.state.emailError ? <Text style={styles.txtError}> Invalid Email Address </Text> : <></>}

                    <BasicInput viewLabel='Password'
                                valuData={this.state.password}
                                txtEntry={true}
                                valueSet={
                                    text => this.passwordValidate(text)
                                }
                                autoCorrect={false}
                                autoCap="none"
                    />
                    {this.state.passwordError ?
                        <Text style={styles.txtPwError}> Invalid Password Format </Text> : <></>}

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
                    <TouchableOpacity style={styles.btnSignIn} onPress={this.userLogin}>
                        <Text style={styles.btnSignInTxt}>{'Sign In'}</Text>
                    </TouchableOpacity>

                    {/*----------------Forgot Password----------------*/}
                    <TouchableOpacity style={styles.btnForgotPassword}
                                      onPress={() => {
                                          this.props.navigation.navigate('ForgotPassword');
                                      }}
                    >
                        <Text style={styles.btnForgotPasswordTxt}>{'Forgot Password ?'}</Text>
                    </TouchableOpacity>

                    <View style={styles.separator}>
                    </View>

                    {/*----------------Register----------------*/}
                    <TouchableOpacity style={styles.btnReg}
                                      onPress={() => {
                                          this.props.navigation.navigate('Register');
                                      }}
                    >
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
    signInCircle: {
        width: 160,
        height: 160,
        backgroundColor: '#ffffff',
        borderRadius: 230,
        elevation: 8,
        marginTop: '5%',
        justifyContent: 'center',
        alignItems: 'center'
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
        fontSize: 24,
        color: "#ffffff",
        alignSelf: "center",
        marginTop: '-1%'
    },
    logo: {
        width: 170,
        height:170,
        marginLeft: -10,
        marginTop: -5
    }
})
