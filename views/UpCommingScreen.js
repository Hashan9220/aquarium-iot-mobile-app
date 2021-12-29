import React, { useRef, useEffect } from 'react';
import {Text, View, StyleSheet, Image, StatusBar} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import LinearGradient from "react-native-linear-gradient";
import * as Animatable from 'react-native-animatable';

export default function UpCommingScreen(){
    return(
        <LinearGradient
            colors={['#a6d4ff', '#1E90FF']}
            style={styles.container}
        >

            <Animatable.View animation="zoomIn">
                <Image style={styles.image} source={require('../assets/logos/main_logo.png')}/>
            </Animatable.View>

            <Animatable.View animation="zoomIn">
                <Text style={styles.subHeadingText}>This page will be comming soon..!</Text>
            </Animatable.View>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    headingText: {
        marginTop: '80%',
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff'
    },
    subHeadingText:{
        fontSize: 15,
        marginTop: '10%',
        color: '#fff'
    },
    image: {
        width: 150,
        height: 150,
        marginTop: '10%'
    }
})
