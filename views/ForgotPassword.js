    import React, {Component, useState} from 'react'
    import {StyleSheet, KeyboardAvoidingView, View, Text, TouchableOpacity, Image,ScrollView} from 'react-native'
    import LinearGradient from "react-native-linear-gradient";
    import {BasicInput} from "../common/BasicInput";
    export default function ForgotPassword ({navigation})  {

        const [email, setEmail] = useState('');
        const sendEmail = () => {
        }
        const emailValidate = (text) => {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            if (reg.test(text) === false) {
                this.setState({email: text})
                return false;
            } else {
                this.setState({email: text})
        }
        }

        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{flex:1,backgroundColor:'#000'}}>
                    <LinearGradient colors={['#a6d4ff', '#1E90FF']} style={styles.linearGradient}>

                        {/*----------------------------Back Button----------------------------*/}
                        <TouchableOpacity
                            style={styles.btnBack}
                            onPress={() => {
                               navigation.navigate('Welcome');
                            }}
                        >
                            <Image
                                source={require('../assets/icons/left_arrow.png')}
                                style={styles.imgBack}
                            >
                            </Image>
                        </TouchableOpacity>
                        {/*----------------------------Back Title----------------------------*/}
                        <Text style={styles.backTitle}>Forgot Password</Text>

                        {/*----------------------------Head Image----------------------------*/}
                        <View style={styles.forgotCircle}>
                            <Image style={styles.logo} source={require('../assets/logos/main_logo.png')}/>
                        </View>
                        {/*----------------------------Head Title----------------------------*/}
                        <Text style={styles.HeadTitle}>
                             SMART {"\n"}AQUARIUM
                        </Text>
                        {/*----------------------------Head Details------------------------------------------*/}
                        <Text style={styles.headDetail}>
                            Enter Email Address
                        </Text>
                        {/*---------------------------Common --------------------------------*/}
                        <BasicInput
                            viewLabel='Email Address'
                            valueSet={
                                text => emailValidate(text)
                            }
                        />
                        {/*---------------- Forgot Password Button-----------*/}
                        <TouchableOpacity style={styles.btnForgotPassword} onPress={sendEmail}>
                            <Text style={styles.btnForgotPasswordTxt}>Send Email</Text>
                        </TouchableOpacity>
                    </LinearGradient>
               </ScrollView>
            )
        }

        const styles = StyleSheet.create({
              
                linearGradient: {
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                },
                btnBack: {
                    width: 45,
                    height: 45,
                    backgroundColor: "rgba(0,0,0,0)",
                    marginRight: '80%',
                    top:70,
                },
                imgBack: {
                    width: 45,
                    height: 45,
                    marginLeft: '20%'
                },
                backTitle: {
                    fontSize: 30,
                    fontFamily: 'Montserrat-Regular',
                    color: '#ffffff',
                    marginTop: 100
                },
                forgotCircle: {
                    width: 160,
                    height: 160,
                    backgroundColor: '#ffffff',
                    borderRadius: 230,
                    elevation: 8,
                    marginTop: '5%',
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                HeadTitle: {
                    fontSize: 26,
                    fontFamily: 'Montserrat-SemiBold',
                    color: '#ffffff',
                    marginTop: '5%',
                    textAlign: "center"
                },
                headDetail: {
                    fontSize: 20,
                    fontFamily: 'Montserrat-Regular',
                    color: '#ffffff',
                    textAlign: "center",
                    marginTop: "3%",
                    marginBottom: "2%"
                },
                btnForgotPassword: {
                    width: 280,
                    height: 50,
                    elevation: 8,
                    backgroundColor: "#A9D4FF",
                    borderRadius: 15,
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    marginTop: '10%',
                    marginBottom:110
                },
                btnForgotPasswordTxt: {
                    fontSize: 25,
                    color: "#ffffff",
                    alignSelf: "center",
                    marginTop: '-1%',
                    fontFamily: 'Montserrat-Medium',
                },
                logo: {
                    width: 170,
                    height:170,
                }
                })
