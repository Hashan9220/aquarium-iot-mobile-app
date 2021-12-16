'use strict';

import React, {Component, useState} from 'react';
import {Linking, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';

class QrCode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: ''
        }
    }

    onSuccess = e => {
        Linking.openURL(e.data).catch(err =>
            this.setState({data: e.data})
        );
    };

    getId = async () => {
        try {
            await AsyncStorage.setItem('@device_id', this.state.data)
        } catch (e) {
        }
    }

    render() {
        return (
            <QRCodeScanner
                onRead={this.onSuccess}
                topContent={
                    <View style={styles.topView}>
                        <Text style={styles.txtData}>Your Device ID : {this.state.data}</Text>
                    </View>
                }
                bottomContent={
                    <View style={styles.bottomView}>
                        <TouchableOpacity
                            style={styles.btnGoView}
                            onPress={this.getId}
                        >
                            <Text style={styles.txtGo}>Go</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
        );
    }
}

const styles = StyleSheet.create({
    topView: {
        flex: 1,
        backgroundColor: "#a6d4ff",
        width: "100%",
        height: "20%",
        justifyContent: "center",
        alignItems: "center"
    },
    txtData: {
        color: "#ffffff",
        fontWeight: "500",
        fontSize: 20,
        marginTop: "-17%"
    },
    bottomView: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1E90FF"
    },
    btnGoView: {
        width: "50%",
        height: "30%",
        borderRadius: 10,
        borderColor: "#a6d4ff",
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    txtGo: {
        color: "#FFF",
        fontSize: 23
    }
});
export default QrCode;
