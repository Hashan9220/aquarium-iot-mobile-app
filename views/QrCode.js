import React, {useState} from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity, View, Dimensions, Alert} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";
import Dashboard from "./Dashboard";
import SignIn from "./SignIn";
import ProfileScreen from "./ProfileScreen";

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const overlayColor = "rgba(0,0,0,0.5)"; // this gives us a black color with a 50% transparency

const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = "#fff";

const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = "red";
const iconScanColor = "#fff";

export default function QrCode({navigation}) {

    const makeSlideOutTranslation = (translationType, fromValue) => {
        return {
            from: {
                [translationType]: SCREEN_WIDTH * -0.18
            }, to: {
                [translationType]: fromValue
            }
        };
    }

    const [state, setState] = useState('');
    const onSuccess = e => {
        Linking.openURL(e.data).catch(err => setState({data: e.data}));

    };
    const getId = async () => {
        console.log(state.data);
        try {
            await AsyncStorage.setItem('@device_id', state.data);
            if (state.data){
                console.log("navigate")
                navigation.navigate(ProfileScreen);
            }
        } catch (e) {
        }
    };
    const goDashabord = () => {
        console.log("goDashbord");
        getId();

    }





    return (<QRCodeScanner
            showMarker
            onRead={onSuccess}
            cameraStyle={{height: SCREEN_HEIGHT}}
            customMarker={<View style={styles.rectangleContainer}>
                <View style={styles.topOverlay}>
                    <Text style={styles.txtData}>Your Device Id :{state.data}</Text>
                </View>

                <View style={{flexDirection: 'row'}}>

                    <View style={styles.leftAndRightOverlay}/>

                    <View style={styles.rectangle}>
                        <Icon

                            size={SCREEN_WIDTH * 0.73}

                        />
                        <Animatable.View
                            style={styles.scanBar}
                            direction="alternate-reverse"
                            iterationCount="infinite"
                            duration={1700}
                            easing="linear"
                            animation={makeSlideOutTranslation('translateY', SCREEN_WIDTH * -0.54)}
                        />
                    </View>

                    <View style={styles.leftAndRightOverlay}/>
                </View>

                <View style={styles.bottomOverlay}>
                   <TouchableOpacity style={styles.btnGoView} onPress={goDashabord} >

                        <Text style={styles.txtGo}>Go</Text>
                    </TouchableOpacity>

                </View>
            </View>

            }

        />



        // <QRCodeScanner
        // reactivate={true}
        // showMarker={true}
        // onRead={onSuccess}
        // topContent={
        //     <View style={styles.topView}>
        //         <Text style={styles.centerText}>
        //             <Text style={styles.txtData}>Your Device Id :{state.data}</Text>
        //         </Text>
        //     </View>
        // }

        // bottomContent={
        //     <View style={styles.bottomView}>
        //         <TouchableOpacity style={styles.btnGoView} onPress={goDashabord} >
        //             <Text style={styles.txtGo}>Go</Text>
        //         </TouchableOpacity>
        //     </View>
        // }
        //  />


    );
}

const styles = StyleSheet.create({
    rectangleContainer: {
        flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "transparent"
    },

    rectangle: {
        height: rectDimensions,
        width: rectDimensions,
        borderWidth: rectBorderWidth,
        borderColor: rectBorderColor,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },

    topOverlay: {
        flex: 1,
        height: SCREEN_WIDTH,
        width: SCREEN_WIDTH,
        backgroundColor: overlayColor,
        justifyContent: "center",
        alignItems: "center"
    },

    bottomOverlay: {
        flex: 1,
        height: SCREEN_WIDTH,
        width: SCREEN_WIDTH,
        backgroundColor: overlayColor,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: SCREEN_WIDTH * 0.25
    },

    leftAndRightOverlay: {
        height: SCREEN_WIDTH * 0.65, width: SCREEN_WIDTH, backgroundColor: overlayColor
    },

    scanBar: {
        width: scanBarWidth, height: scanBarHeight, backgroundColor: scanBarColor
    },

    topView: {
        flex: 1,
        backgroundColor: '#a6d4ff',
        width: wp('100%'),
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    }, txtData: {
        color: '#ffffff', fontWeight: '500', fontSize: 25,
    }, // bottomView: {
    //     width: '100%',
    //     height: '100%',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#1E90FF',
    // },
    btnGoView: {
        width: '50%',
        height: '15%',
        borderRadius: 10,
        borderColor: '#a6d4ff',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    }, txtGo: {
        color: '#FFF', fontSize: 25,
    },
});
