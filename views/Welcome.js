import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function Welcome({navigation}) {

    return (
        <ScrollView style={StyleSheet.swcontainer} >
            <LinearGradient colors={['#a6d4ff', '#1E90FF']} style={styles.linearGradient}>

                <StatusBar backgroundColor='#a6d4ff'/>
                {/*----------------Title Name------------*/}
                <Text style={styles.titleName}> SMART AQUARIUM</Text>
                {/*----------------Image Circle------------*/}
                <View style={styles.imgCircle}>
                    <Image style={styles.logo} source={require('../assets/logos/main_logo.png')}/>
                </View>
                {/*----------------Head Title ------------*/}
                <Text style={styles.headTitle}>
                    Welcome in {'\n'} Smart Aquarium
                </Text>
                {/*--------------- Details Title------------*/}
                <Text style={styles.detailTitle}>
                    A fish is an animal which {'\n'}
                    lives and breathes in water.
                </Text>
                {/*----------------Sign In Button-----------*/}
                <TouchableOpacity style={styles.btnSignIn}
                                  onPress={() => {
                                      navigation.navigate('SignIn');
                                  }}>
                    <Text style={styles.btnSignInTxt}>{'Sign In'}</Text>
                </TouchableOpacity>
                {/*----------------Register Button-----------*/}
                <TouchableOpacity style={styles.btnRegister}
                                  onPress={() => {
                                      navigation.navigate('Register');
                                  }}>
                    <Text style={styles.btnRegisterTxt}>{'Register'}</Text>
                </TouchableOpacity>
            </LinearGradient>
        </ScrollView>)
}

const styles = StyleSheet.create({
    swcontainer: {
        flex: 1,justifyContent: 'center', alignItems: 'center',
    }, linearGradient: {
     flexDirection: 'column',justifyContent: 'center', alignItems: 'center',
    }, titleName: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 25, //fontFamily:'Roboto-Bold',
        fontFamily: 'Montserrat-Bold',
        color: '#ffffff',
        marginBottom: '10%',
        paddingTop: StatusBar.currentHeight,
    }, imgCircle: {
        width: wp('45%'),
        height: hp('20%'),
        backgroundColor: '#ffffff',
        borderRadius:360,
        elevation: 8,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '10%'
    }, headTitle: {
        width: wp('70%'),
        height: hp('10%'),
        fontSize: 35,
        fontFamily: 'Montserrat-Medium',
        color: '#ffffff',
        marginTop: 20,
        textAlign: 'center'
    }, detailTitle: {
        fontSize: 18,
        fontFamily: 'Montserrat-Medium',
        color: '#ffffff',
        textAlign: 'center',
    }, btnSignIn: {
        width: wp('60%'),
        height: hp('6%'),
        elevation: 8,
        backgroundColor: '#A9D4FF',
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: '5%',
    }, btnSignInTxt: {
        fontSize: 21,
        color: '#ffffff',
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: '1%',
        fontFamily: 'Montserrat-Medium',
    }, btnRegister: {
        width: wp('60%'),
        height: hp('6%'),
        elevation: 8,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: 20,

    }, btnRegisterTxt: {
        fontSize: 20,
        color: '#5FB0FF',
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: '1%',
        fontFamily: 'Montserrat-Medium',
    }, logo: {
        width: '130%', height: '130%',
    }
})
