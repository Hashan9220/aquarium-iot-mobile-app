'use strict';

import React, {Component, useState} from 'react';
import {Linking, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {state} from "react-native-push-notification/component";

export default function QrCode({navigation}) {

 const onSuccess = e => {
    //Linking.openURL(e.data).catch(err => setState({data: e.data}));
  };

  const getId = async () => {
    try {
      await AsyncStorage.setItem('@device_id', state.data);
      props.navigation.navigate('SignIn');
    } catch (e) {}
  };

    return (
      <QRCodeScanner
        onRead={onSuccess}
        /*topContent={
          <View style={styles.topView}>
            <Text style={styles.txtData}>
             // Your Device ID : {state.data}
            </Text>
          </View>
        }*/
        bottomContent={
          <View style={styles.bottomView}>
            <TouchableOpacity style={styles.btnGoView} onPress={getId}>
              <Text style={styles.txtGo}>Go</Text>
            </TouchableOpacity>
          </View>
        }
      />
    );
}

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    backgroundColor: '#a6d4ff',
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtData: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 20,
    marginTop: '-17%',
  },
  bottomView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E90FF',
  },
  btnGoView: {
    width: '50%',
    height: '30%',
    borderRadius: 10,
    borderColor: '#a6d4ff',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtGo: {
    color: '#FFF',
    fontSize: 23,
  },
});
