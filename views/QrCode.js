'use strict';

import React, { Component } from 'react';

import {
    Linking
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

class QrCode extends Component {
    onSuccess = e => {
        Linking.openURL(e.data).catch(err =>
            console.error('An error occured', err)
        );
    };

    render() {
        return (
            <QRCodeScanner
                onRead={this.onSuccess}
                // flashMode={RNCamera.Constants.FlashMode.torch}
            />
        );
    }
}
export default QrCode;
