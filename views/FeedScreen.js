import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import database from '@react-native-firebase/database';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import {Bubbles} from 'react-native-loader';

export default function FeedScreen() {

    const [id, setId] = useState('');
    const [lottieOpacity, setLottieOpacity] = useState(0);
    const [rippleOpacity, setRippleOpacity] = useState(0);
    const [txtOpacity, setTxtOpacity] = useState(1);
    const [visible, setVisible] = useState(false);
    const getId = async () => {
        const value = await AsyncStorage.getItem('@device_id')
        if (value !== null) {
            setId(value)
        }
        console.log("value");
        console.log(value);
    }
    useEffect(() => {
        getId();

    }, []);
    const feed = () => {

        database()
            .ref('/' + id + '/')
            .update({
                feed: 1,
            })
            .then(() => {
                viewLottie();
            });
        if (id !== "") {

            gift();
        } else {
            alert("Device Id Not Found");

        }

    }
    const gift = () => {

        setTimeout(() => {
            setVisible(false)
        }, 2000);
        setVisible(true)
    }
    const reset = () => {
        setTimeout(() => {
            setLottieOpacity(0)
            setRippleOpacity(0)
            setTxtOpacity(1)
        }, 1500)
    }
    const viewLottie = () => {
        if (lottieOpacity === 0) {
            setLottieOpacity(1)
            setRippleOpacity(1)
            setTxtOpacity(0)
            reset();
        }
    }
    return (<LinearGradient

        colors={['#a6d4ff', '#1E90FF']}
        style={styles.container}>

        <View style={{
            marginLeft: -20,
            display: "flex",
            width: 200,
            height: 340,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        }}>

            {visible ? <Image
                style={styles.card_bubble}
                source={require('../assets/gift/bubble4.png')}
            /> : null}
        </View>
        <View style={{
            width: '100%', height: '50%', opacity: lottieOpacity, marginLeft: '90%',
        }}>

            <Bubbles size={10} color="#FFF"/>
        </View>
        <LottieView style={{marginTop: 170}}
                    source={require('../assets/animations/82892-wave.json')} autoPlay
                    loop/>
        <TouchableOpacity
            style={styles.btn}

                     onPress={feed}
                    >
                    <LottieView style={{opacity: rippleOpacity}}
                                source={require('../assets/animations/82892-wave.json')}
                                autoPlay loop/>
                    <Text style={{color: '#1E90FF', fontSize: 30, opacity: txtOpacity}}>FEED</Text>
                    </TouchableOpacity>
                     </LinearGradient>);
}
        const styles = StyleSheet.create({
            container: {
                flex: 1, justifyContent: 'center', alignItems: 'center',
            }, btn: {
                width: 200,
                height: 200,
                backgroundColor: '#fff',
                borderRadius: 150,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 5,
                marginTop: '-90%'
            }, body: {
                flex: 1,
                backgroundColor: '#ffffff',
                alignItems: 'center',
                justifyContent: 'center',
            }, card_bubble: {

                marginLeft: -5,
                display: "flex",
                width: 200,
                height: 340,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',

            }
        });
