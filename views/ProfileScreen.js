import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Divider} from 'react-native-paper';

export default function ProfileScreen(){
    return(
        <LinearGradient
            colors={['#a6d4ff', '#1E90FF']}
            style={styles.container}
        >
            <View style={styles.card}>
                    <View style={styles.imgContainer}></View>
                <TouchableOpacity style={styles.cameraContainer}></TouchableOpacity>
                <Text style={styles.name}>Mindula Dilthushan</Text>
            </View>

            <View style={styles.detailContainer}>
                <View>
                    <Text style={styles.heading}> First Name </Text>
                    <Divider />

                    <Text style={styles.heading}> Last Name </Text>
                    <Divider />

                    <Text style={styles.heading}> Email </Text>
                    <Text style={styles.heading}> Phone </Text>

                </View>
            </View>

            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnTxt}>Done</Text>
            </TouchableOpacity>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        padding: 5,
        width: '90%',
        height: '30%',
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#fff',
        borderWidth: 3,
        borderColor: '#a6d4ff',
    },
    cameraContainer: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: '#a6d4ff',
        borderWidth: 3,
        borderColor: '#a6d4ff',
        marginTop: '-12%',
        marginLeft: '20%',
    },
    name: {
        marginTop: '5%',
        fontSize: 25,
        color: '#000'
    },
    detailContainer: {
        marginTop: '15%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        marginLeft: '-40%',
        color: '#fff',
        fontSize: 20,
        marginBottom: '5%'
    },
    detail: {
        marginTop: '-6%',
        marginLeft: '40%',
        color: '#fff',
        fontSize: 20,
    },
    btn: {
        marginTop: '10%',
        width: '65%',
        height: '8%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        elevation: 5
    },
    btnTxt: {
        color: '#a6d4ff',
        fontSize: 25,

    }

})
