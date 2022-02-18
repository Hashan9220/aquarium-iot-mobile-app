import React, {useState} from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RadioForm from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Common---------------------------------------------------
import {BasicInput} from '../common/BasicInput';
import Dashboard from "./Dashboard";

const radio_props = [{label: 'Remember the account ?', value: 0}];

export default function SignIn({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    console.log(email,password)
    //User Login -----------------------------------------------------------------------------

    const login = async () => {

        await fetch('http://aquariummonitoringapi-env.eba-n2krf6um.us-west-2.elasticbeanstalk.com/api/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })

            .then((response) => response.json())
            .then(navigation.navigate(Dashboard))
            .then((json) => console.log(json.token));
        Alert.alert('User Login', 'Welcome Smart Aquarium ');

    };

    const storeData = async value => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('alreadyLaunched', jsonValue);
            console.log('Data saved in Async storage');
        } catch (e) {
            Alert.alert('Device Not Found!', 'Please scan your device');
        }
    };
    //Validate -----------------------------------------------------------------------------------
    const emailValidate = text => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            setEmail(text);
            return false;
        } else {
            setEmail( text);
        }
    };
    const passwordValidate = text => {
        let pwReg =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        if (pwReg.test(text) === false) {
            setPassword(text);
            return false;
        } else {
            setPassword(text);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <LinearGradient
                colors={['#a6d4ff', '#1E90FF']}
                style={styles.linearGradient}>
                {/*----------------------------Back Button----------------------------*/}
                <TouchableOpacity style={styles.btnBack}
                                  onPress={() => {
                                      navigation.navigate('Welcome');
                                  }}
                >
                    <Image
                        source={require('../assets/icons/left_arrow.png')}
                        style={styles.imgBack}
                    />
                </TouchableOpacity>

                {/*----------------------------Back Title----------------------------*/}
                <Text style={styles.backTitle}>Sign In</Text>

                {/*----------------------------Head Image----------------------------*/}
                <View style={styles.signInCircle}>
                    <Image
                        style={styles.logo}
                        source={require('../assets/logos/main_logo.png')}
                    />
                </View>

                {/*----------------------------Head Title----------------------------*/}
                <Text style={styles.signInHeadTitle}>SMART {'\n'} AQUARIUM</Text>

                {/*---------------------------Common --------------------------------*/}

                <BasicInput
                    viewLabel="Email"
                    valuData={email}
                    txtEntry={false}
                    valueSet={text => emailValidate(text)}
                    autoCorrect={false}
                    autoCap="none"
                />

                <BasicInput
                    viewLabel="Password"
                    valuData={password}
                    txtEntry={true}
                    valueSet={text => passwordValidate(text)}
                    autoCorrect={false}
                    autoCap="none"
                />

                {/*-------------------------- Radio Button ---------------------------*/}
                <RadioForm
                    style={styles.rdBtn}
                    radio_props={radio_props}
                    initial={0}
                    animation={true}
                    buttonColor="#ffffff"
                    labelStyle={{fontSize: 15, color: '#ffffff'}}
                />

                {/*----------------Sign In Button-----------*/}
                <TouchableOpacity style={styles.btnSignIn} onPress={login}>
                    <Text style={styles.btnSignInTxt}>{'Sign In'}</Text>
                </TouchableOpacity>

                {/*----------------Forgot Password----------------*/}
                <TouchableOpacity
                    style={styles.btnForgotPassword}
                    onPress={() => {
                        navigation.navigate('ForgotPassword');
                    }}>
                    <Text style={styles.btnForgotPasswordTxt}>
                        {'Forgot Password ?'}
                    </Text>
                </TouchableOpacity>

                <View style={styles.separator}/>

                {/*----------------Register----------------*/}
                <TouchableOpacity
                    style={styles.btnReg}
                    onPress={() => {
                        navigation.navigate('Register');
                    }}>
                    <Text style={styles.btnRegTxt}>{'Register'}</Text>
                </TouchableOpacity>
            </LinearGradient>
        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    linearGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnBack: {
        width: 45,
        height: 45,
        // backgroundColor:'#000000',
        backgroundColor: 'rgba(0,0,0,0)',
        marginRight: '90%',
        top: '-12%',
    },
    imgBack: {
        width: 45,
        height: 45,
        marginTop: '-55%',
        marginLeft: '20%',
    },
    backTitle: {
        fontSize: 35,
        fontFamily: 'Montserrat',
        color: '#ffffff',
        marginTop: '-40%',
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
    signInCircle: {
        width: 160,
        height: 160,
        backgroundColor: '#ffffff',
        borderRadius: 230,
        elevation: 8,
        marginTop: '5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signInHeadTitle: {
        fontSize: 30,
        fontFamily: 'Roboto',
        color: '#ffffff',
        marginTop: '5%',
        textAlign: 'center',
    },
    rdBtn: {
        marginLeft: '-17%',
        marginTop: '3%',
    },
    btnForgotPassword: {
        width: '40%',
        height: '4%',
        backgroundColor: 'rgba(255,0,0,0)',
        textAlign: 'center',
        marginTop: '5%',
    },
    btnForgotPasswordTxt: {
        fontSize: 17,
        color: '#ffffff',
        alignSelf: 'center',
        marginTop: '2%',
    },
    separator: {
        width: '80%',
        height: 1,
        backgroundColor: 'rgb(255,255,255)',
        marginTop: '5%',
    },
    btnReg: {
        width: '40%',
        height: '4%',
        backgroundColor: 'rgba(255,0,0,0)',
        textAlign: 'center',
        marginTop: '5%',
    },
    btnRegTxt: {
        fontSize: 19,
        color: '#ffffff',
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    btnSignIn: {
        width: 280,
        height: 50,
        elevation: 8,
        backgroundColor: '#A9D4FF',
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: '6%',
    },
    btnSignInTxt: {
        fontSize: 24,
        color: '#ffffff',
        alignSelf: 'center',
        marginTop: '-1%',
    },
    logo: {
        width: 170,
        height: 170,
    },
});
