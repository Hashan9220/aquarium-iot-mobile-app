import * as React from 'react'
import {View, StyleSheet, TextInput, } from 'react-native';


import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export function BasicInput({
  viewLabel,
  valuData,
  valueSet,
  txtEntry,
  autoCap,
  autoCorrect,
}) {
   
    return (
        <View style={styles.inputView}>
            <TextInput style={styles.txt}
                       placeholder={viewLabel}
                       placeholderTextColor='#ffffff'
                       value={valuData}
                       onChangeText={valueSet}
                       secureTextEntry={txtEntry}
                       autoCapitalize={autoCap}
                       autoCorrect={autoCorrect}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputView: {
        paddingVertical: 5,
    },
    txt: {
        width: wp('65%'),
        height: hp('7%'),
        borderColor: '#ffffff',
        borderWidth: 3,
        borderRadius: 7,
        elevation: 8,
        color: '#ffffff',
        backgroundColor: '#B0D7FD',
        paddingHorizontal: 10,
        fontSize: 18,
       

    },
});
