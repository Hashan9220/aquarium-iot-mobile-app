import React from "react";
import {View, Text, StyleSheet, StatusBar, Image,} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Card, Title, Paragraph } from 'react-native-paper';
import * as Progress from 'react-native-progress';

export default function Home(){
    return(
        <LinearGradient
        colors={['#a6d4ff','#1E90FF' ]}
        style={styles.container}
        >
            <StatusBar backgroundColor='#a6d4ff'/>
        <View>
            <View style={styles.cardSection}>
                <Card style={styles.leftCard}>
                    <Card.Content style={styles.cardContent}>
                        <Title style={{color:'#1E90FF'}}>pH</Title>
                        <Paragraph>8.13</Paragraph>
                    </Card.Content>
                    <Card style={styles.subCard}>
                        <Card.Content style={styles.cardContent}>
                            <Image style={styles.card_logo} source={require('../assets/icons/ph_icon.png')}/>
                        </Card.Content>
                    </Card>
                </Card>
                <Card style={styles.rightCard}>
                    <Card.Content style={styles.cardContent}>
                        <Title style={{color:'#1E90FF'}}>NH3</Title>
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
                <Text style={{fontSize:25, color:'white', }}>
                    Current Temperature
                </Text>
                <View progressBarContainer>
                    <Progress.Circle progress={0.25} color={'#fff'} size={300} style = {{marginTop:40, }} indeterminate={false} />
                    <View style={styles.midCircle}>
                        <Text style={styles.temperature}>
                            25.0 °C
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
    cardSection: {
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        padding: 5,
        display: 'flex',
        marginTop:10
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
        marginTop:60,
    },
    card_logo: {
        marginTop:-65,
        marginLeft: -2
    },
    tempSection: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    midCircle:{
        padding:20,
        width: 260,
        height: 260,
        borderRadius:250,
        backgroundColor: '#fff',
        marginTop:-280,
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 20,
        shadowColor: 'black',
    },
    temperature:{
        fontSize: 30
    }
})
