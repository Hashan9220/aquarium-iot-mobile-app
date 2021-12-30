import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, StatusBar, Image, Alert, LogBox} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import {Card, Title, Paragraph, Button} from 'react-native-paper';
import * as Progress from 'react-native-progress';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { riskyPhValueNotification } from '../services/LocalPushController'
import { riskyTemperatureNotification } from '../services/LocalPushController'
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';


export default function Home() {

    const [ph, setPh] = useState(0);
    const [temp, setTemp] = useState(0);
    const [id, setId] = useState("");

    const [dangerNh3, setDangerNh3] = useState(0);
    const [normalNh3, setNormalNh3] = useState(0);
    const [indicatorColor, setIndicatorColor] = useState("fff")
    const [normalIndicatorOpacity, setNormalIndicatorOpacity] = useState(0)
    const [dangerIndicatorOpacity, setDangerIndicatorOpacity] = useState(0)

    const [count, setCount] = useState(0);

    useEffect(() => {
        getData()
        if (id !== "") {
            const onValueChange = database()
                .ref('/' + id + '/')
                .on('value', snapshot => {
                    setPh(snapshot.val().PH_Value.toFixed(2));
                    setTemp(snapshot.val().Temp.toFixed(2));
                });
        }
    },[id])

    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, [])

    useEffect(() => {
        checkNh3()
    })

    useEffect(() => {
        ph >= 7.5 && ph <= 30.5 ? checkHighPH() : reset()
        ph <= 6.5 && ph > 0 ? checkLowPH() : reset()
    }, [ph])

    useEffect(() => {
        temp >= 27 && temp <= 100 ? checkHighTemp() : reset()
        temp <= 23 && temp >= 1 ? checkLowTemp() : reset()
    }, [temp])



    const riskyPH = () => {
        riskyPhValueNotification()
    };

    const riskyTemp = () => {
      riskyTemperatureNotification()
    }

    const getData = async () => {
        const value = await AsyncStorage.getItem('@device_id')
        if (value !== null) {
            setId(value)
        }
    }

    const reset = () => {
        if(count != 0) {
            setCount(0);
        }
    }

    const checkHighPH = () => {
        if(ph >= 7.5 && ph <= 6.5 && count == 0) {
            setCount(1);
            riskyPH();
        }
    };

    const checkLowPH = () => {
        if(ph <= 6.5 && ph > 0 && count == 0) {
            setCount(1);
            riskyPH();
        }
    }

    const checkHighTemp = () => {
        if(temp >= 32 && temp <= 100 && count == 0) {
            setCount(1);
            riskyTemp();
        }
    };

    const checkLowTemp = () => {
         if(temp <= 23 && temp >= 1 && count == 0) {
            setCount(1);
            riskyTemp();
        }
    };

    const checkNh3 = () => {
      if (ph <= 7.5 && ph >= 6.5 && temp >= 23 && temp <= 32){
          setNormalNh3(1)
          setDangerNh3(0)
          setIndicatorColor("#fff")
          setNormalIndicatorOpacity(1)
          setDangerIndicatorOpacity(0)
      }else if(ph === 0 && temp === 0){
          setNormalNh3(0)
      } else {
          setDangerNh3(1)
          setNormalNh3(0)
          setIndicatorColor("red")
          setNormalIndicatorOpacity(0)
          setDangerIndicatorOpacity(1)
      }
    }

    return (
        <LinearGradient
            colors={['#a6d4ff', '#1E90FF']}
            style={styles.container}
        >
            <StatusBar backgroundColor='#a6d4ff'/>
            <View>
                <View style={styles.deviceIdView}>
                    <Text style={styles.txtDeviceId}>{"Your ID : "}{id}</Text>
                </View>
                <View style={styles.cardSection}>
                    <Card style={{
                        ...styles.leftCard,
                        borderColor: ph >= 7.50 ? 'red' : ph >= 6.5 ? 'yellow' : ph <= 6.5 ? 'green' : '#fff',
                        borderWidth: ph > 7.50 ? 3 : ph >= 6.5 ? 3 : ph <= 6.5 ? 3 : 0
                    }}>
                        <Card.Content style={styles.cardContent}>
                            <Title style={{color: '#1E90FF'}}>pH</Title>
                            <Paragraph>{ph}</Paragraph>
                        </Card.Content>
                        <Card style={styles.subCard}>
                            <Card.Content style={styles.cardContent}>
                                <Image style={styles.card_logo} source={require('../assets/icons/ph_icon.png')}/>
                            </Card.Content>
                        </Card>
                    </Card>
                    <Card style={styles.rightCard}>
                        <Card.Content style={styles.cardContent}>
                            <Title style={{color: '#1E90FF', }}>NH3</Title>

                            <View style={{marginTop: '12%'}}>
                                <Paragraph style={{ fontSize: 15, color: 'red' , opacity: dangerNh3, marginTop: '-12%'}}>Dangerous</Paragraph>
                                <Paragraph style={{ fontSize: 15, color: 'green', marginTop: '-15%', opacity: normalNh3}}>Normal</Paragraph>

                                <View style={{marginTop: '-18%', marginLeft: '60%'}}>
                                    <Pulse size={10} color={indicatorColor} opacity={dangerIndicatorOpacity}/>
                                    <View style={{width: 15, height: 15, borderRadius: 50, backgroundColor: 'green', marginTop: '-28%', opacity: normalIndicatorOpacity}}></View>
                                </View>
                            </View>
                        </Card.Content>
                        <Card style={styles.subCard}>
                            <Card.Content style={styles.cardContent}>
                                <Image style={styles.card_logo} source={require('../assets/icons/NH3_icon.png')}/>
                            </Card.Content>
                        </Card>
                    </Card>
                </View>
                <View style={styles.tempSection}>
                    <Text style={{fontSize: 25, color: 'white',}}>
                        Current Temperature
                    </Text>
                    <View progressBarContainer>
                        <Progress.Circle progress={temp / 50}
                                         color={temp >= 32 ? 'red' : temp >= 24 ? 'yellow' : temp <= 23 ? 'green' : '#fff' }
                                         size={300} style={{marginTop: 40,}} indeterminate={false}/>
                        <View style={styles.midCircle}>
                            <Text style={styles.temperature}>
                                {temp} °C
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    deviceIdView: {
        width: "100%",
        height: "5%",
        alignItems: "center",
        justifyContent: "center"
    },
    txtDeviceId: {
        color: "#ffffff",
        fontSize: 20,
        fontWeight: "500"
    },
    cardSection: {
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        padding: 5,
        display: 'flex',
        marginTop: 10
    },
    leftCard: {
        width: '47%',
        height: 170,
        borderRadius: 30,
        elevation: 10,
        shadowColor: 'black',
    },
    rightCard: {
        width: '47%',
        height: 170,
        borderRadius: 30,
        marginLeft: '54%',
        marginTop: -170,
        elevation: 10,
        shadowColor: 'black',
    },
    subCard: {
        width: 70,
        height: 70,
        borderRadius: 20,
        marginLeft: '50%',
        marginTop: '-70%',
        backgroundColor: '#fff',
        elevation: 20,
        shadowColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardContent: {
        marginTop: 60,
    },
    card_logo: {
        width: 50,
        height: 50,
        marginTop: -65,
    },
    tempSection: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    midCircle: {
        padding: 20,
        width: 250,
        height: 250,
        borderRadius: 250,
        backgroundColor: '#fff',
        marginTop: '-83%',
        marginLeft: '8%',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 20,
        shadowColor: 'black',
    },
    temperature: {
        fontSize: 30,
        color: '#000'
    },
})
