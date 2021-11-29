import React, {useEffect} from "react";
import {StyleSheet, View, LogBox} from "react-native";
import Home from "../views/Home";
import TabBar from "fluidbottomnavigation-rn";

export default function BottomTabNav(){
    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, [])

    return(
        <View style={styles.container}>
            <Home/>
            <TabBar
                tintColor={'#1E90FF'}
                onPress={(tabIndex) => { console.log(tabIndex), tabIndex }}
                values={[
                    { title: "Home", icon: require("../assets/icons/home.png") },
                    { title: "History", icon: require("../assets/icons/clock.png") },
                    { title: "Scan", icon: require("../assets/icons/scan.png") },
                    { title: "Settings", icon: require("../assets/icons/settings.png") },
                    { title: "Profile", icon: require("../assets/icons/profile.png") },
                ]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
