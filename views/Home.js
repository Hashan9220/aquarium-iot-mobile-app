import React, {useEffect, useState} from "react";
import {
    View, Text, StyleSheet, StatusBar, Image, Alert, LogBox, TouchableOpacity, Appearance, ScrollView, SafeAreaView
} from 'react-native';
import darkMode from "./darkMode";
import LinearGradient from "react-native-linear-gradient";
import {Card, Title, Paragraph, Button, Dialog, Portal, Provider} from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as Progress from 'react-native-progress';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {riskyPhValueNotification} from '../services/LocalPushController'
import {riskyTemperatureNotification} from '../services/LocalPushController'
import {Pulse} from 'react-native-loader';

export default function Home() {

    const [visible, setVisible] = React.useState(false);
    const showDialog = () => setVisible(false);
    const hideDialog = () => setVisible(false);
    const [ph, setPh] = useState(0);
    const [temp, setTemp] = useState(0);
    const [id, setId] = useState("");
    const [theme, setTheme] = useState(Appearance.getColorScheme());
    const [dangerNh3, setDangerNh3] = useState(0);
    const [normalNh3, setNormalNh3] = useState(0);
    const [indicatorColor, setIndicatorColor] = useState("fff")
    const [normalIndicatorOpacity, setNormalIndicatorOpacity] = useState(0)
    const [dangerIndicatorOpacity, setDangerIndicatorOpacity] = useState(0)
    const [count, setCount] = useState(0);

    Appearance.addChangeListener((scheme) => {
        setTheme(scheme.colorScheme);
    })
    const getData = async () => {
        const value = await AsyncStorage.getItem('@device_id')
        if (value !== null) {
            setId(value)
        }
    }
    useEffect(() => {
        getData();
        if (id !== "") {
            const onValueChange = database()
                .ref('/' + id + '/')
                .on('value', snapshot => {
                    setPh(snapshot.val().PH_Value.toFixed(2));
                    setTemp(snapshot.val().Temp.toFixed(2));
                });
        } else if (id === "") {
            showDialog()
        }
    }, [id])
    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, [])
    useEffect(() => {
        checkNh3()
        // scanIdPopUp()
    })
    useEffect(() => {
        ph >= 7.5 && ph <= 30.5 ? checkHighPH() : reset()
        ph <= 6.5 && ph > 0 ? checkLowPH() : reset()
    }, [ph])
    useEffect(() => {
        temp >= 27 && temp <= 100 ? checkHighTemp() : reset()
        temp <= 23 && temp >= 1 ? checkLowTemp() : reset()
    }, [temp])
    const scanIdPopUp = () => {
        if (id !== null) {
            showDialog()
        } else {
            hideDialog()
        }
    }
    const riskyPH = () => {
        riskyPhValueNotification()
    };
    const riskyTemp = () => {
        riskyTemperatureNotification()
    }
    const reset = () => {
        if (count != 0) {
            setCount(0);
        }
    }
    const checkHighPH = () => {
        if (ph >= 7.5 && ph <= 6.5 && count == 0) {
            setCount(1);
            riskyPH();
        }
    };
    const checkLowPH = () => {
        if (ph <= 6.5 && ph > 0 && count == 0) {
            setCount(1);
            riskyPH();
        }
    }
    const checkHighTemp = () => {
        if (temp >= 32 && temp <= 100 && count == 0) {
            setCount(1);
            riskyTemp();
        }
    };
    const checkLowTemp = () => {
        if (temp <= 23 && temp >= 1 && count == 0) {
            setCount(1);
            riskyTemp();
        }
    };
    const Clickdone = () => {
        hideDialog();
    }
    const checkNh3 = () => {
        if (ph <= 7.5 && ph >= 6.5 && temp >= 23 && temp <= 32) {
            setNormalNh3(1)
            setDangerNh3(0)
            setIndicatorColor("#fff")
            setNormalIndicatorOpacity(1)
            setDangerIndicatorOpacity(0)
        } else if (ph === 0 && temp === 0) {
            setNormalNh3(0)
        } else {
            setDangerNh3(1)
            setNormalNh3(0)
            setIndicatorColor("red")
            setNormalIndicatorOpacity(0)
            setDangerIndicatorOpacity(1)
        }
    }
    return (<Provider>
        <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

            <LinearGradient
                colors={['#a6d4ff', '#1E90FF']}
                style={styles.lcontainer}>

                {id === "" && <View>
                    <Portal>
                        <Dialog visible={visible}>
                            <Dialog.Title>No Device Found</Dialog.Title>
                            <Dialog.Content>
                                <Paragraph>scan Your Device</Paragraph>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <TouchableOpacity
                                    onPress={() => {
                                        Clickdone();
                                    }}><Text>Done</Text></TouchableOpacity>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </View>}
                <StatusBar backgroundColor='#a6d4ff'/>
                <View>
                    <View style={styles.deviceIdView}>
                        <Text style={styles.txtDeviceId}>{"Your ID : "}{id}</Text>
                    </View>
                    <View style={styles.cardSection}>
                        <Card style={{
                            ...theme === 'light' ? styles.leftCard : darkMode.leftCard,
                            borderColor: ph >= 7.50 ? 'red' : ph >= 6.5 ? 'yellow' : ph <= 6.5 ? 'green' : '#fff',
                            borderWidth: ph > 7.50 ? 3 : ph >= 6.5 ? 3 : ph <= 6.5 ? 3 : 0
                        }}>
                            <Card.Content style={styles.cardContent}>
                                <Title style={{color: '#1E90FF'}}>pH</Title>
                                <Paragraph style={{color: '#050505'}}>{ph}</Paragraph>
                            </Card.Content>
                            <Card style={styles.subCard1}>
                                <Card.Content style={styles.cardContent}>
                                    <Image style={styles.card_logo}
                                           source={require('../assets/icons/ph_icon.png')}/>
                                </Card.Content>
                            </Card>
                        </Card>
                        <Card style={theme === 'light' ? styles.rightCard : darkMode.rightCard}>
                            <Card.Content style={styles.cardContent}>
                                <Title style={{color: '#1E90FF',}}>NH3</Title>

                                <View style={{marginTop: '12%'}}>
                                    <Paragraph style={{
                                        fontSize: 15, color: 'red', opacity: dangerNh3, marginTop: '-12%'
                                    }}>Dangerous</Paragraph>
                                    <Paragraph style={{
                                        fontSize: 15, color: 'green', marginTop: '-15%', opacity: normalNh3
                                    }}>Normal</Paragraph>

                                    <View style={{marginTop: '-18%', marginLeft: '60%'}}>
                                        <Pulse size={10} color={indicatorColor}
                                               opacity={dangerIndicatorOpacity}/>
                                        <View style={{
                                            width: 15,
                                            height: 15,
                                            borderRadius: 50,
                                            backgroundColor: 'green',
                                            opacity: normalIndicatorOpacity
                                        }}></View>
                                    </View>
                                </View>
                            </Card.Content>
                            <Card style={styles.subCard}>
                                <Card.Content style={styles.cardContent}>
                                    <Image style={styles.card_logo}
                                           source={require('../assets/icons/NH3_icon.png')}/>
                                </Card.Content>
                            </Card>
                        </Card>
                    </View>

                    <View style={styles.tempSection}>
                        <Text style={{fontSize: 25, color: 'white', marginTop:'-50%'}}>
                            Current Temperature
                        </Text>
                    </View>
                    <View style={{
                        width: wp('100%'),

                        flex: 1, alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Text style={styles.temperature}> {temp} °C </Text>

                        <View style={styles.midCircle}>

                            <Progress.Circle style={styles.progressCircle} progress={temp / 50}
                                             color={temp >= 32 ? 'red' : temp >= 24 ? 'yellow' : temp <= 23 ? 'green' : '#fff'}
                                             size={250} indeterminate={false}
                            >

                            </Progress.Circle>


                        </View>

                    </View>

                </View>
            </LinearGradient>

        </SafeAreaView>
    </Provider>)
}

const styles = StyleSheet.create({
    lcontainer: {
        flex: 1, alignItems: 'center', justifyContent: 'center'
    }, scstyle: {
        flex: 1, alignItems: 'center', justifyContent: 'center',
    }, deviceIdView: {
        width: wp('95%'), height: '5%', alignItems: 'center', justifyContent: 'center'
    }, txtDeviceId: {
        color: "#ffffff", fontSize: 20, fontWeight: '500',
    }, cardSection: {
        flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', padding: 5,

    }, leftCard: {
        width: '40%', height: '50%', marginLeft: '5%', borderRadius: 30, elevation: 10, shadowColor: 'black'
    }, rightCard: {
        width: '40%',
        height: '50%',
        borderRadius: 30,
        marginTop: '-37%',
        marginLeft: '54%',
        elevation: 10,
        shadowColor: 'black',
    }, subCard1: {
        width: wp('18%'),
        height: '50%',
        borderRadius: 20,
        marginLeft: '45%',
        marginTop: '-62%',
        backgroundColor: '#fff',
        elevation: 20,
        shadowColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center'
    }, subCard: {
        width: wp('18%'),
        height: '50%',
        borderRadius: 20,
        marginLeft: '45%',
        marginTop: '-70%',
        backgroundColor: '#fff',
        elevation: 20,
        shadowColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center'
    }, cardContent: {
        marginTop: '20%',
    }, card_logo: {
        width: 50, height: 50, marginTop: '-60%'
    }, tempSection: {
        height: '5%', justifyContent: 'center', alignItems: 'center'
    }, progressCircle: {
        width: wp('100%'), height: hp('40%'), alignItems: 'center', justifyContent: 'center',
    }, midCircle: {
        width: wp('50%'),
        height: '70%',
        marginTop: '-30%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 200,
        backgroundColor: '#fff',
        shadowColor: 'black'
    }, temperature: {
        fontSize: 25, color: '#000', alignItems: 'center', justifyContent: 'center', elevation: 20
    },
})
