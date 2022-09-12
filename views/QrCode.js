import React, {useState, useEffect} from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import Orientation, {lockToPortrait} from 'react-native-orientation';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const overlayColor = 'rgba(0,0,0,0.5)';
const rectDimensions = SCREEN_WIDTH * 0.65;
const rectBorderWidth = SCREEN_WIDTH * 0.005;
const rectBorderColor = '#fff';
const scanBarWidth = SCREEN_WIDTH * 0.46;
const scanBarHeight = SCREEN_WIDTH * 0.0025;
const scanBarColor = 'red';

export default function QrCode({navigation}) {
  
  const makeSlideOutTranslation = (translationType, fromValue) => {
    return {
      from: {
        [translationType]: SCREEN_WIDTH * -0.18,
      },
      to: {
        [translationType]: fromValue,
      },
    };
  };

  const [state, setState] = useState('');
  const onSuccess = e => {
    Linking.openURL(e.data).catch(_err => setState({data: e.data}));
  };

  const getId = async () => {
    try {
      await AsyncStorage.setItem('@device_id', state.data);
      if (state.data) {
        navigation.navigate('Dashboard');

      }
    } catch (e) {}
  };

  return (
    <QRCodeScanner
      showMarker
      onRead={onSuccess}
      cameraStyle={{height: SCREEN_HEIGHT}}
      customMarker={
        <View style={styles.rectangleContainer}>
          <View style={styles.topOverlay}>
            <Text style={styles.txtData}>Your Device Id :{state.data}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={styles.leftAndRightOverlay} />

            <View style={styles.rectangle}>
              <Icon size={SCREEN_WIDTH * 0.73} />
              <Animatable.View
                style={styles.scanBar}
                direction="alternate-reverse"
                iterationCount="infinite"
                duration={1700}
                easing="linear"
                animation={makeSlideOutTranslation(
                  'translateY',
                  SCREEN_WIDTH * -0.54,
                )}
              />
            </View>

            <View style={styles.leftAndRightOverlay} />
          </View>

          <View style={styles.bottomOverlay}>
            <TouchableOpacity style={styles.btnGoView} onPress={getId}>
              <Text style={styles.txtGo}>Go</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: SCREEN_WIDTH * 0.25,
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor,
  },

  topView: {
    flex: 1,
    backgroundColor: '#a6d4ff',
    width: wp('100%'),
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtData: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 25,
  },
  btnGoView: {
    width: '50%',
    height: '20%',
    borderRadius: 10,
    borderColor: '#a6d4ff',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtGo: {
    color: '#FFF',
    fontSize: 25,
  },
});
