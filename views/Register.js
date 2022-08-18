import React, {useEffect, useState} from 'react';
import {Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BasicInput} from "../common/BasicInput";
import Dashboard from "./Dashboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../services/baseURL";
// import RadioForm from 'react-native-simple-radio-button';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

// const radio_props = [{ label: 'Agree to Terms & Conditions', value: 0 }];

export default function Register({navigation}) {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorState, setErrorState] = useState(true);
    const [token, setToken] = useState('');

    //Validation---------------------------------------------------
    const firstNameValidate = text => {
        let nameReg = /^[a-zA-Z ]{1,40}$/;
        if (nameReg.test(text) === false) {
            setFirstname(text);
            return false;
        } else {
            setFirstname(text);
        }
    };
    const lastNameValidate = text => {
        let nameReg = /^[a-zA-Z ]{1,40}$/;
        if (nameReg.test(text) === false) {
            setLastname(text);
            return false;
        } else {
            setLastname(text);
        }
    };
    const addressValidate = text => {
        let nameReg = /^[a-zA-Z ]{1,40}$/;
        if (nameReg.test(text) === false) {
            setAddress(text);
            return false;
        } else {
            setAddress(text);
        }
    };
    const emailValidate = text => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            setEmail(text);
            return false;
        } else {
            setEmail(text);
        }
    };
    const phoneValidate = text => {
        let reg = /^[a-zA-Z ]{1,10}$/;
        if (reg.test(text) === false) {
            setContact(text);
            return false;
        } else {
            setContact(text);
        }
    };
    const passwordValidate = text => {
        let pwReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        if (pwReg.test(text) === false) {
            setPassword(text);
            return false;
        } else {
            setPassword({password: text});
            setPassword({passwordError: false});
        }
    };

    function navigateToDashboard(token) {
        setToken(token);
        if (token) {
            navigation.navigate(Dashboard)
            Alert.alert('Success');
        } else {
            Alert.alert('Sorry', 'Please try again');
        }
    }

    useEffect(() => {
        let token = AsyncStorage.getItem('token');
        setToken(token);
    }, []);
    //User Register------------------------------------------------

    const registerUser = async () => {
        if (password === confirmPassword) {
            await fetch(baseURL + 'register', {
                method: 'POST', body: JSON.stringify({
                    name: firstname, email: email, password: password, address: address, contact: contact
                }), headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    if (json.token) {
                        navigateToDashboard(json.token)
                        storeData(json, json.token)
                    } else {
                        Alert.alert('please fill input field..!', 'Please try again');
                    }
                    // eslint-disable-next-line no-undef
                }).catch((error));

            Alert.alert('User Registered', 'Successfully registered as new user ');
        } else {
            Alert.alert('Password Not Match ');
        }
    };
    const storeData = async (value, token) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('alreadyLaunched', jsonValue);
            await AsyncStorage.setItem('token', token);
        } catch (e) {
        }
    };
    const startLoading = () => {
        Register();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    };
    const onEnterText = (TextInputValue) => {
        if (TextInputValue.trim() != 0) {
            this.setState({TextInputValue: TextInputValue, ErrorStatus: true});
        } else {
            this.setState({TextInputValue: TextInputValue, ErrorStatus: false});
        }
    }
    {
        errorState == false ? (<Text style={styles.errorMessage}>
                * Please enter the text to proceed.
            </Text>) : null
    }
    return (<LinearGradient
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
        <ScrollView showsVerticalScrollIndicator={false} style={{display: 'flex'}}>
            <View style={{width: wp('30%'), alignItems: 'center', justifyContent: 'center', marginLeft: 70}}>
                {/*----------------------------Back Title----------------------------*/}
                <Text style={styles.backTitle}>Register</Text>
                {/*----------------------------Head Image----------------------------*/}
            </View>

            <View style={styles.registerCircle}>
                <Image
                    style={styles.logo}
                    source={require('../assets/logos/main_logo.png')}
                />
            </View>

            <View style={{width: wp('30%'), marginLeft: 70}}>
                {/*----------------------------Head Title----------------------------*/}
                <Text style={styles.registerHeadTitle}>SMART{'\n'}AQUARIUM</Text>
            </View>
            {/*---------------------------Common --------------------------------*/}


            <BasicInput
                viewLabel="First Name"
                valuData={firstname}
                valueSet={text => firstNameValidate(text)}
                txtEntry={false}
                autoCorrect={false}
                autoCap="none"
            />
            <BasicInput
                viewLabel="Last Name"
                valuData={lastname}
                valueSet={text => lastNameValidate(text)}
                txtEntry={false}
            />
            <BasicInput
                viewLabel="Email"
                valuData={email}
                valueSet={text => emailValidate(text)}
                txtEntry={false}
            />
            <BasicInput
                viewLabel="Phone"
                valuData={contact}
                valueSet={text => phoneValidate(text)}
                onChangeText={TextInputValue => onEnterText(TextInputValue)}
                txtEntry={false}
            />
            <BasicInput
                viewLabel="Address"
                valuData={address}
                valueSet={text => addressValidate(text)}
                txtEntry={false}
            />
            <BasicInput
                viewLabel="Password"
                valuData={password}
                valueSet={text => passwordValidate(text)}
                txtEntry={true}
            />
            <BasicInput
                viewLabel="Confirm Password"
                valueSet={setConfirmPassword}
                txtEntry={true}
            />

            {/*----------------Register Button-----------*/}


            <TouchableOpacity
                style={styles.btnRegister}
                onPress={registerUser}>
                <Text style={styles.btnRegisterTxt}>{'Register'}</Text>
            </TouchableOpacity>
        </ScrollView>

    </LinearGradient>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center',
    }, linearGradient: {
        flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    }, btnBack: {
        width: wp('10%'), height: hp('5%'), backgroundColor: 'rgba(0,0,0,0)', marginRight: '90%', marginTop: '6%',
    }, imgBack: {
        width: wp('10%'), height: hp('5%'), marginTop: '-55%', marginLeft: '20%',
    }, txtError: {
        color: '#ff2020', fontSize: 15, marginLeft: '-38%', marginTop: '-2%',
    }, txtPwError: {
        color: '#ff2020', fontSize: 15, marginLeft: '-31%', marginTop: '-2%',
    }, txtUserError: {
        color: '#ff2020', fontSize: 15, marginLeft: '-45%', marginTop: '-2%',
    }, txtCPWError: {
        color: '#ff2020', fontSize: 15, marginLeft: '-40%', marginTop: '-2%',
    }, backTitle: {
        fontSize: 30, fontFamily: 'Montserrat-Regular', color: '#ffffff', marginBottom: 15,
    }, registerCircle: {
        width: wp('35%'), height: hp('15%'), backgroundColor: '#ffffff', borderRadius: 230, elevation: 8, marginLeft: 60

    }, // ridBtn: {
    //     marginLeft: '10%', marginTop: '7%',
    // }, 
    registerHeadTitle: {
        fontSize: 25, fontFamily: 'Montserrat-SemiBold', color: '#ffffff', marginTop: '5%', textAlign: 'center',
    }, //rdBtn: {
    //      marginTop: '3%',
    //  },
    btnRegister: {
        width: wp('60%'),
        height: hp('5%'),
        elevation: 8,
        backgroundColor: '#A9D4FF',
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 10
    }, btnRegisterTxt: {
        fontSize: 25,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        alignSelf: 'center',
        marginTop: '-1%',
    }, logo: {
        width: wp('35%'), height: hp('15%'), justifyContent: 'center', alignItems: 'center',
    }, spinnerTextStyle: {
        color: '#000000',
    }, errorMessage: {
        fontSize: 20, color: "red", marginLeft: -80,
    },
});
