import React, {useState} from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    onPress
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import RadioForm from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Common---------------------------------------------------
import {BasicInput} from '../common/BasicInput';
import Dashboard from "./Dashboard";

// const radio_props = [{label: 'Remember the account ?', value: 0,value: 1 }];

export default function SignIn({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    //User Login -----------------------------------------------------------------------------


    const login = async () => {
        await fetch('http://54.245.177.239/api/login', {
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
            .then((json) => {
                console.log('json user contact');
                console.log(json.user.contact);

                if (json.token) {
                    setToken(token);
                    const val = {
                        name: json.user.name,
                        email: json.user.email,
                        address: json.user.address,
                        contact: json.user.contact
                    }

                    navigation.navigate('Dashboard')


                    storeData(json)

                } else {
                    Alert.alert('Email or Password In Correct..!', 'Please try again');
                }
            })


    };


    const storeData = async (val) => {

        try {

            await AsyncStorage.setItem('alreadyLaunched', JSON.stringify(val));
            await AsyncStorage.setItem('token', val.token);
            await AsyncStorage.setItem('name', val.user.name);
            await AsyncStorage.setItem('email', val.user.email);
            await AsyncStorage.setItem('address', val.user.address)
            await AsyncStorage.setItem('contact', val.user.contact);


            console.log(name);

            console.log(email);

            console.log(address);

            console.log(contact);

            console.log('Data saved in Async storage');
        } catch (e) {
            console.log('Data not saved!', 'Please try again');
        }
    };
    //Validate -----------------------------------------------------------------------------------
    const emailValidate = text => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            setEmail(text);

            return false;
        } else {
            setEmail(text);

        }
        // Alert.alert('Email is In Correct','Please try again');
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

    //loader
    const startLoading = () => {
        login();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);


            // overlayColor="rgba(255,255,255,0.75)"
            // source={require("./loader.json")}
            // animationStyle={styles.lottie}
            // speed={1}
        }, 3000);
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
                <Text style={styles.signInHeadTitle}> SMART {'\n'}AQUARIUM</Text>

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
                {/* <RadioForm
                    style={styles.rdBtn}
                    radio_props={radio_props}
                    initial={0}
                    animation={true}
                    buttonColor="#ffffff"
                    labelStyle={{fontSize: 15, color: '#ffffff'}}
                /> */}

                {/*----------------Sign In Button-----------*/}
                {
                    loading ? (
                        <ActivityIndicator
                            visible={loading}
                            textStyle={styles.spinnerTextStyle}
                        />
                    ) : (
                        <TouchableOpacity style={styles.btnSignIn} onPress={startLoading}>
                            <Text style={styles.btnSignInTxt}>{'Sign In'}</Text>
                        </TouchableOpacity>
                    )
                }

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
        top: '-5%',
    },
    imgBack: {
        width: 45,
        height: 45,
        marginTop: '-55%',
        marginLeft: '20%',
    },
    backTitle: {
        fontSize: 31,
        fontFamily: 'Montserrat-Regular',
        color: '#ffffff',
        marginTop: '-27%',
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
        fontSize: 26,
        fontFamily: 'Montserrat-SemiBold',
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
        fontSize: 15,
        color: '#ffffff',
        alignSelf: 'center',
        marginTop: '2%',
        fontFamily: 'Montserrat-Regular',
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
        fontSize: 20,
        color: '#ffffff',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontFamily: 'Montserrat-Medium',
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
        fontSize: 21,
        color: '#ffffff',
        alignSelf: 'center',
        marginTop: '-1%',
        fontFamily: 'Montserrat-Medium',
    },
    logo: {
        width: 170,
        height: 170,
    },
    spinnerTextStyle: {
        color: '#000000',
    },
});
