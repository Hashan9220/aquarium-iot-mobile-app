import React, {useEffect} from 'react';
import {Text, StyleSheet} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import database from '@react-native-firebase/database';

export default function FeedScreen(){

    return(
        <LinearGradient
            colors={['#a6d4ff', '#1E90FF']}
            style={styles.container}
        >
            <Text>Feeding Screen</Text>
        </LinearGradient>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
