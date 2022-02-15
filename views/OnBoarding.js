import React, {useRef} from 'react';
import {Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ViewPager from '@react-native-community/viewpager';

import Page from '../components/Page';
import Footer from '../components/Footer';
import {Card, Paragraph, Title} from "react-native-paper";
import {Pulse} from "react-native-loader";
import LinearGradient from "react-native-linear-gradient";

export default function OnBoarding({navigation}) {
    const pagerRef = useRef(null);
    let pageNo = 1;

    const handlePageChange = pageNumber => {
        pagerRef.current.setPage(pageNumber);
    };

    return (
        <View style={{flex: 1}}>
            <StatusBar backgroundColor={'#a6d4ff'}/>
            <View style={{backgroundColor: '#a6d4ff'}}>
                <View style={styles.logoContainer}>
                    <Card style={styles.subCard}>
                        <Image style={styles.card_logo} source={require('../assets/logos/main_logo.png')}/>
                    </Card>
                    <Text style={styles.logoTitle}>SMART AQUARIUM</Text>
                </View>
            </View>

            <ViewPager style={{flex: 1}} initialPage={0} ref={pagerRef}>
                <View key="1">
                    {/*<Image source={require('../assets/logos/slide1_logo.png')}/>*/}
                    <Page
                        image={require('../assets/logos/slide1_logo.png')}
                        title="Title 1 "
                        subTitle="A fish is an animal which  lives and breathes in water. All fish are vertebrates (have a backbone) and  most breathe through gills and have fins and scales."
                    />
                </View>
                <View key="2" style={{backgroundColor: 'red', height: '100%'}}>
                    {/*<Image source={require('../assets/logos/slide2_logo.png')} style={{marginLeft: '20%',}}/>*/}
                    <Page
                        image={require('../assets/logos/slide2_logo.png')}
                        title="Title 2 "
                        subTitle="A bird is an animal which  lives and breathes in water. All fish are vertebrates (have a backbone) and  most breathe through gills and have fins and scales."
                    />
                </View>
                <View key="3" style={{backgroundColor: 'red'}}>
                    {/*<Image source={require('../assets/logos/slide3_logo.png')} style={{marginLeft: '5%',}}/>*/}

                    <Page
                        image={require('../assets/logos/slide3_logo.png')}
                        title="Title 3 "
                        subTitle="A cow is an animal which  lives and breathes in water. All fish are vertebrates (have a backbone) and  most breathe through gills and have fins and scales."
                    />
                </View>
            </ViewPager>

            <Footer
                backgroundColor="#1E90FF"
                leftButtonLabel="Skip"
                rightButtonLabel="Next"
                leftButtonPress={() => navigation.navigate('Welcome')}
                rightButtonPress={() => {
                    if (pageNo === 3) {
                        navigation.navigate('Welcome');
                    }
                    handlePageChange(pageNo);
                    pageNo++;
                }}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    logoContainer: {
        width: '50%',
        height: '15%',
    },
    subCard: {
        width: 50,
        height: 50,
        borderRadius: 15,
        marginLeft: '10%',
        marginTop: '10%',
        backgroundColor: '#fff',
        elevation: 20,
        shadowColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoTitle: {
        marginLeft: '40%',
        marginTop: '-22%',
        fontSize: 22,
        color: '#FFF'
        // fontFamily:
    },
    card_logo: {
        width: 50,
        height: 50,
    },
})
