import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import AsyncStorage from '@react-native-async-storage/async-storage';
//Common---------------------------------------------------
import {BasicInput} from '../common/BasicInput';
import Dashboard from './Dashboard';
import baseURL from '../services/baseURL';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Checkbox} from 'react-native-paper';

export default function SignIn({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = React.useState(false);

  //User Login -----------------------------------------------------------------------------
  const login = async () => {
    fetch(baseURL + 'login', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(json => {
        if (json.token) {
          const val = {
            id: json.user.id,
            image: json.user.images,
          };

          navigation.navigate('Dashboard');
          storeData(json);
        } else {
          Alert.alert('Email or Password In Correct..!', 'Please try again');
        }
      });
  };

  const storeData = async val => {
    if (checked) {
      AsyncStorage.setItem('alreadyLaunched', JSON.stringify(true));
      AsyncStorage.setItem('token', val.token);
      AsyncStorage.setItem('id', JSON.stringify(val.user.id));
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
  //loader-----------------------------------------------------------------------------
  const startLoading = () => {
    login();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={StyleSheet.sconterner}>
      <LinearGradient
        colors={['#a6d4ff', '#1E90FF']}
        style={styles.linearGradient}>
        {/*----------------------------Back Button----------------------------*/}
        <View style={{marginLeft: 10, width: '100%'}}>
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
        </View>
        {/*----------------------------Back Title----------------------------*/}
        <View
          style={{
            width: wp('100%'),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.backTitle}>Sign In</Text>
        </View>
        {/*----------------------------Head Image----------------------------*/}
        <View style={styles.signInCircle}>
          <Image
            style={styles.logo}
            source={require('../assets/logos/main_logo.png')}
          />
        </View>
        {/*----------------------------Head Title----------------------------*/}
        <View style={{width: wp('30%')}}>
          <Text style={styles.signInHeadTitle}> SMART {'\n'}AQUARIUM</Text>
        </View>
        <View>
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
        </View>
        {/*-------------------------- Radio Button ---------------------------*/}
        <View />

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Text style={{fontWeight: 'bold'}}>Keep Login</Text>
        </View>
        {/*----------------Sign In Button-----------*/}
        {loading ? (
          <ActivityIndicator
            visible={loading}
            textStyle={styles.spinnerTextStyle}
          />
        ) : (
          <TouchableOpacity style={styles.btnSignIn} onPress={startLoading}>
            <Text style={styles.btnSignInTxt}>{'Sign In'}</Text>
          </TouchableOpacity>
        )}
        {/*----------------Forgot Password----------------*/}
        <TouchableOpacity
          style={styles.btnForgotPassword}
          onPress={() => {
            navigation.navigate('ForgotPassword');
          }}>
          <Text style={styles.btnForgotPasswordTxt}>{'Forgot Password ?'}</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        {/*----------------Register----------------*/}
        <TouchableOpacity
          style={styles.btnReg}
          onPress={() => {
            navigation.navigate('Register');
          }}>
          <Text style={styles.btnRegTxt}>{'Register'}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sconterner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('100%'),
  },
  linearGradient: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('100%'),
  },
  btnBack: {
    width: wp('10%'),
    height: 45,
    marginTop: wp('7%'),
  },
  imgBack: {
    width: wp('10%'),
    height: 45,
  },
  backTitle: {
    fontSize: 25,
    fontFamily: 'Montserrat-Regular',
    color: '#ffffff',
    marginBottom: 10,
  },
  txtError: {
    color: '#ff2020',
    fontSize: 15,
    marginTop: '-2%',
  },
  txtPwError: {
    color: '#ff2020',
    fontSize: 15,
    marginTop: '-2%',
  },
  signInCircle: {
    width: wp('35%'),
    height: hp('18%'),
    backgroundColor: '#ffffff',
    borderRadius: 230,
    elevation: 8,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInHeadTitle: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  }, //  rdBtn: {
  //     marginLeft: '-17%',
  //     marginTop: '3%',
  // },
  btnForgotPassword: {
    width: wp('65%'),
    height: '4%',
    backgroundColor: 'rgba(255,0,0,0)',
    textAlign: 'center',
    marginTop: '2%',
  },
  btnForgotPasswordTxt: {
    fontSize: 15,
    color: '#ffffff',
    alignSelf: 'center',
    marginTop: '2%',
    fontFamily: 'Montserrat-Regular',
  },
  separator: {
    width: wp('65%'),
    height: 1,
    backgroundColor: 'rgb(255,255,255)',
    marginTop: '5%',
  },
  btnReg: {
    width: wp('65%'),
    height: '4%',
    backgroundColor: 'rgba(255,0,0,0)',
    textAlign: 'center',
    marginBottom: '20%',
  },
  btnRegTxt: {
    fontSize: 20,
    color: '#ffffff',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Medium',
  },
  btnSignIn: {
    width: wp('65%'),
    height: 50,
    elevation: 8,
    backgroundColor: '#A9D4FF',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
    marginTop: 10,
  },
  btnSignInTxt: {
    fontSize: 21,
    color: '#ffffff',
    alignSelf: 'center',

    fontFamily: 'Montserrat-Medium',
  },
  logo: {
    width: 170,
    height: 170,
  },
  spinnerTextStyle: {
    color: '#000000',
  },
  label: {
    margin: 8,
  },
});
