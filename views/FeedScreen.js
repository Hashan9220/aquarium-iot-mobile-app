import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Pressable, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import SplashScreen from 'react-native-splash-screen';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';

export default function FeedScreen() {

    const [id, setId] = useState('');
    const [lottieOpacity, setLottieOpacity] = useState(0);
    const [rippleOpacity, setRippleOpacity] = useState(0);
    const [txtOpacity, setTxtOpacity] = useState(1)

    useEffect(() => {
        getData();
    }, [id]);

    const feed = () => {
        database()
            .ref('/' + id + '/')
            .update({
                feed: 1,
            })
            .then(() => viewLottie());
    };

    const reset = () => {
            setTimeout(() => {
                setLottieOpacity(0)
                setRippleOpacity(0)
                setTxtOpacity(1)
            }, 1500)
    }

    const viewLottie = () => {
        if (lottieOpacity === 0){
            setLottieOpacity(1)
            setRippleOpacity(1)
            setTxtOpacity(0)
            reset();
        }else {

        }
    }

    const getData = async () => {
        const value = await AsyncStorage.getItem('@device_id');
        if (value !== null) {
            setId(value);
        }
    };

    return (
        <LinearGradient
            colors={['#a6d4ff', '#1E90FF']}
            style={styles.container}
        >



            <View style={{width: '100%', height: '50%', opacity: lottieOpacity, marginLeft: '85%', marginTop: '20%'}}>
                <Bubbles size={10} color="#FFF" />
            </View>
            <LottieView style={{marginTop: 130}} source={require('../assets/animations/82892-wave.json')} autoPlay loop></LottieView>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={feed}
                >
                    <LottieView style={{opacity: rippleOpacity}} source={require('../assets/animations/82892-wave.json')} autoPlay loop></LottieView>
                    <Text style={{ color: '#1E90FF', fontSize: 30, opacity: txtOpacity}}>FEED</Text>
                </TouchableOpacity>
        </LinearGradient>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        width: 200,
        height: 200,
        backgroundColor: '#fff',
        borderRadius: 150,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        marginTop: '-40%'
    },
    body: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
