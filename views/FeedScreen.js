import React, {useEffect} from 'react';
import {Text, StyleSheet, Image} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import database from '@react-native-firebase/database';
import { Button } from 'react-native-paper';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

export default function FeedScreen(){
    const setAnimatedImage = () => {
      return
       <Image source={require('../assets/icons/cvs.gif')} />
    }

    return(
        <LinearGradient
            colors={['#a6d4ff', '#1E90FF']}
            style={styles.container}
        >
            <Button style={styles.feedBtn} mode="contained" onPress={() => console.log('Pressed')}>
                <Text style={styles.feedTxt}>Feed</Text>
            </Button>

            <Animatable.View animation="fadeInRight">
            <Image source={require('../assets/icons/ZKZl.gif')} />
            </Animatable.View>

        </LinearGradient>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    feedBtn: {
        backgroundColor: 'white',
        width: '50%',
        height: '6%',
    },
    feedTxt: {
        color: '#1E90FF',
        fontWeight: 'bold',
    }

})
