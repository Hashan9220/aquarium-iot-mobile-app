import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import SplashScreen from 'react-native-splash-screen';

export default function FeedScreen() {

    const [id, setId] = useState('');
    const [lottieOpacity, setLottieOpacity] = useState(0);

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
        console.log("inside reset");
            setTimeout(() => {
                setLottieOpacity(0)
            }, 1000)
    }

    const viewLottie = () => {
        console.log("inside lottie");
        if (lottieOpacity === 0){
            setLottieOpacity(1)
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
            <View style={{width: '100%', height: '50%', opacity: lottieOpacity}}>
                <LottieView source={require('../assets/animations/89332-loading-4.json')} autoPlay loop></LottieView>

            </View>

            <TouchableOpacity style={styles.btn}
                              onPress={feed}
            >
                <Text style={styles.btnTxt}>FEED</Text>
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
        backgroundColor: 'green',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    btnTxt: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 25,
    },
    lottieView: {
        width: '100%',
        height: '50%'
    }
});
