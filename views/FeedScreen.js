import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Pressable, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import SplashScreen from 'react-native-splash-screen';
import Ripple from 'react-native-material-ripple';

export default function FeedScreen() {

    const [id, setId] = useState('');
    const [lottieOpacity, setLottieOpacity] = useState(0);
    const [rippleOpacity, setRippleOpacity] = useState(0);


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
            }, 3000)
    }

    const viewLottie = () => {
        if (lottieOpacity === 0){
            setLottieOpacity(1)
            setRippleOpacity(1)
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
            <View style={{width: '50%', height: '50%', opacity: lottieOpacity, marginLeft: '-90%'}}>
                {/*<LottieView source={require('../assets/animations/5152-fish-animation.json')} autoPlay loop></LottieView>*/}
                <Image style={styles.card_logo} source={require('../assets/icons/Gold-Fish-Animation-HD-Loop-unscreen.gif')}/>
            </View>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={feed}
                >
                    <LottieView style={{opacity: rippleOpacity}} source={require('../assets/animations/82892-wave.json')} autoPlay loop></LottieView>

                    <Text style={styles.text}>FEED</Text>
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
        width: '38%',
        height: '22%',
        backgroundColor: '#fff',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    lottieView: {
        width: '100%',
        height: '50%'
    },
    body: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#1E90FF',
        fontSize: 30
    }
});
