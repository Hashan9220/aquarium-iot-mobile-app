import React from "react";
import {StyleSheet, Text} from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function Article(){
    return(
        <LinearGradient
            colors={['#a6d4ff','#1E90FF' ]}
            style={styles.container}
        >
            <Text>
                Article
            </Text>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
