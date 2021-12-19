import React, { useState } from 'react';
import {Text, StyleSheet, Image} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import database from '@react-native-firebase/database';
import { Button } from 'react-native-paper';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

export default function FeedScreen () {

    const [imgOpacity, setImgOpacity] = useState(0);
    const [btnColor, setBtnColor] = useState("#FFF")
    const [text, setText] = useState("FEED")

   const toggleImage = () => {
        console.log("inside");
        if ( imgOpacity === 0 ) {
            setImgOpacity(1)
            setBtnColor("#dfe6e9")
            setText("STOP")
        } else {
            setImgOpacity(0)
            setBtnColor("#FFF")
            setText("FEED")
        }
    }

    return(
        <LinearGradient
            colors={['#a6d4ff', '#1E90FF']}
            style={styles.container}
        >

            <Image style={{marginLeft: '20%'}} source={require('../assets/icons/20170.gif')} />

            <Button style={{backgroundColor: btnColor, width: '60%'}} mode="contained"  onPress={() => {
                toggleImage()
            }}>
                <Text style={{color: '#000'}}>{text}</Text>
            </Button>

            <Animatable.View animation="fadeInRight">
            <Image style={{opacity: imgOpacity, marginLeft: '-50%'}} source={require('../assets/icons/giphy.gif')} />
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
    // feedBtn: {
    //     backgroundColor: btnColor,
    //     width: '50%',
    //     height: '6%',
    // },
    feedTxt: {
        color: '#1E90FF',
        fontWeight: 'bold',
    },
    image: {

    }

})
