import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, StatusBar, Image, Button,} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {Card, Title, Paragraph} from 'react-native-paper';
import * as Progress from 'react-native-progress';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Home() {

    const [ph, setPh] = useState(0);
    const [temp, setTemp] = useState(0);
    const [id, setId] = useState("")

    useEffect(() => {
        getData()
        const onValueChange = database()
            .ref('/AQ-001/')
            .on('value', snapshot => {
                console.log('User data: ', snapshot.val().PH_Value);
                setPh(snapshot.val().PH_Value.toFixed(2));
                setTemp(snapshot.val().Temp.toFixed(2));

            });
    }, [])

    const getData = async () => {
        const value = await AsyncStorage.getItem('@device_id')
        if (value !== null) {
            setId(value)
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
                        borderColor: ph > 7.5 ? '#ff0a0a' : '#fff',
                        borderWidth: ph > 7.5 ? 3 : 0
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
                            <Title style={{color: '#1E90FF'}}>NH3</Title>
                            <Paragraph>0.004 mg(ppm)</Paragraph>
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
                                         color={temp >= 30 ? '#e61405' : temp >= 27 ? '#1bff0a' : '#fff421'}
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
        // color:"#1E90FF",
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
        width: 170,
        height: 170,
        borderRadius: 30,
        elevation: 10,
        shadowColor: 'black',
    },
    rightCard: {
        width: 170,
        height: 170,
        borderRadius: 30,
        marginLeft: 190,
        marginTop: -170,
        elevation: 10,
        shadowColor: 'black',
    },
    subCard: {
        width: 70,
        height: 70,
        borderRadius: 20,
        marginLeft: 90,
        marginTop: -130,
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
        marginTop: -65,
        marginLeft: -2
    },
    tempSection: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    midCircle: {
        padding: 20,
        width: 260,
        height: 260,
        borderRadius: 250,
        backgroundColor: '#fff',
        marginTop: -280,
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 20,
        shadowColor: 'black',
    },
    temperature: {
        fontSize: 30,
        color: '#000'
    }
})
