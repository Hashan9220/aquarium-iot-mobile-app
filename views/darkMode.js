import React from "react";
import {StyleSheet} from "react-native";

const darkMode = StyleSheet.create({

    cardSection: {
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        padding: 5, display: 'flex',
        marginTop: 10
    }, leftCard: {
        width: '47%',
        height: 170,
        borderRadius: 30,
        elevation: 10,
        shadowColor: 'black',
        backgroundColor: '#fcfcfc'
    }, rightCard: {
        width: '47%',
        height: 170,
        borderRadius: 30,
        marginLeft: '54%',
        marginTop: -170,
        elevation: 10,
        shadowColor: 'black',
        backgroundColor: '#fcfcfc'
    }, subCard: {
        width: 70,
        height: 70,
        borderRadius: 20,
        marginLeft: '50%',
        marginTop: '-70%',
        backgroundColor: '#fff',
        elevation: 20,
        shadowColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContent: {
        marginTop: 65,

    }, card_logo: {
        width: 50, height: 50, marginTop: -65,
    },
});
export default darkMode;
