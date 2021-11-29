import * as React from 'react'
import {View, StyleSheet, TextInput} from 'react-native';

export function BasicInput({viewLabel,valuData,valueSet,txtEntry,autoCap,autoCorrect}) {
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
            >
            </TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    inputView: {
        paddingVertical: 6,
    },
    txt: {
        width: 300,
        height: 45,
        borderColor: '#ffffff',
        borderWidth: 3,
        borderRadius: 7,
        elevation: 8,
        color: '#ffffff',
        backgroundColor: '#B0D7FD',
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontSize: 18,
        marginTop: "2%"
    },
});
