import React, {useEffect, useState} from 'react';
import * as RNBootSplash from 'react-native';
import {ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
//Common
import {BasicInput} from '../common/BasicInput';
import Dashboard from "./Dashboard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const radio_props = [{label: 'Agree to Terms & Conditions', value: 0}];

export default function Register({navigation}) {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
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
        let reg = /^\d{10}$/;
        if (reg.test(text) === false) {
            setPhone(text);
            return false;
        } else {
            setPhone(text);
        }
    };
    const passwordValidate = text => {
        let pwReg =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        if (pwReg.test(text) === false) {
            setPassword(text);
            return false;
        } else {
            console.log("password txt" + text)
            setPassword({password: text});
            setPassword({passwordError: false});
        }
    };

    function navigateToDashboard(token) {
        setToken(token);
        if (token) {
            navigation.navigate(Dashboard)

        } else {
            Alert.alert('Sorry', 'Please try again');
        }
    }


    useEffect(() => {
        const init = async () => {
            let token = null;
            try {
                token = await AsyncStorage.getItem('token');
                setToken(token);
            } catch (e) {
                console.log(e);
            }
        };
        init().finally(async () => {
            await RNBootSplash({fade: true});
        });
    }, []);
    //User Register------------------------------------------------
    const registerUser = async () => {
        await fetch('http://aquariummonitoringapi-env.eba-n2krf6um.us-west-2.elasticbeanstalk.com/api/register', {
            method: 'POST',
            body: JSON.stringify({
                name: firstname,
                email: email,
                password: password,
                contact: phone,
                address: address
            }),
            headers: {
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
            })
            .then((json) => console.log(json));
        Alert.alert('User Registered', 'Successfully registered as new user ');
    };
    const storeData = async (value, token) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('alreadyLaunched', jsonValue);
            await AsyncStorage.setItem('token', token);
            console.log('Data saved in Async storage');
        } catch (e) {
            Alert.alert('Data not saved!', 'Please try again');
        }
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
            <ScrollView showsVerticalScrollIndicator={false}>
                {/*----------------------------Head Title----------------------------*/}
                <Text style={styles.registerHeadTitle}>SMART{'\n'}AQUARIUM</Text>

                {/*---------------------------Common --------------------------------*/}
                <BasicInput
                    viewLabel="First Name"
                    valuData={setFirstname}
                    valueSet={text => firstNameValidate(text)}
                    txtEntry={false}
                />
                <BasicInput
                    viewLabel="Last Name"
                    valuData={setLastname}
                    valueSet={text => lastNameValidate(text)}
                    txtEntry={false}
                />
                <BasicInput
                    viewLabel="Email"
                    valuData={setEmail}
                    valueSet={text => emailValidate(text)}
                    txtEntry={false}
                />
                <BasicInput
                    viewLabel="phone"
                    valuData={setPhone}
                    valueSet={text => phoneValidate(text)}
                    txtEntry={false}
                />
                <BasicInput
                    viewLabel="Address"
                    valuData={setAddress}
                    valueSet={text => addressValidate(text)}
                    txtEntry={false}
                />
                <BasicInput
                    viewLabel="Password"
                    valuData={setPassword}
                    valueSet={text => passwordValidate(text)}
                    txtEntry={true}
                />
                <BasicInput
                    viewLabel="Confirm Password"
                    // valuData={setPassword}
                    /* valueSet={text =>
                         setPassword({
                             confirmpassword: text,
                         })
                     }*/
                    txtEntry={true}
                />
            </ScrollView>
            {/*-------------------------- Radio Button ---------------------------*/}
            {/* <RadioForm
                    style={styles.rdBtn}
                    radio_props={radio_props}
                    initial={0}
                    animation={true}
                    buttonColor="#ffffff"
                    labelStyle={{fontSize: 15, color: '#ffffff'}}
                />*/}
            <ActivityIndicator size="small" color="#0000ff" animating={false}/>
            {/*----------------Register Button-----------*/}
            <TouchableOpacity
                style={styles.btnRegister}
                onPress={registerUser}>
                <Text style={styles.btnRegisterTxt}>{'Register'}</Text>
            </TouchableOpacity>

        </LinearGradient>
    );
}
console.log()
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
        fontSize: 35,
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
        fontSize: 30,
        fontFamily: 'Montserrat-SemiBold',
        color: '#ffffff',
        marginTop: '5%',
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
        marginTop: '5%',
    },
    btnRegisterTxt: {
        fontSize: 25,
        color: '#ffffff',
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
