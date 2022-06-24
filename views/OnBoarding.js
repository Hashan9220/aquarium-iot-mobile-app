import React, {useRef} from 'react';
import {Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import Page from '../components/Page';
import Footer from '../components/Footer';
import {Card, Paragraph, Title} from "react-native-paper";

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
                    <Text style={styles.logoTitle}>SMART {'\n'}AQUARIUM</Text>
                </View>
            </View>
            <ViewPager style={{flex: 1}} initialPage={0} ref={pagerRef}>
                <View key="1">
                    <Page
                        image={require('../assets/logos/slide3_logo.png')}
                        title="Title 1 "
                        subTitle="A fish is an animal which  lives and breathes in water. All fish are vertebrates (have a backbone) and  most breathe through gills and have fins and scales."
                    />
                </View>
                <View key="2">
                    <Page
                        image={require('../assets/logos/slide2_logo.png')}
                        title="Title 2 "
                        subTitle="A bird is an animal which  lives and breathes in water. All fish are vertebrates (have a backbone) and  most breathe through gills and have fins and scales."
                    />
                </View>
                <View key="3">
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
                width: '60%',
                height: '15%',
            },
            subCard: {
                width: 50,
                height: 50,
                borderRadius: 15,
                marginLeft: '10%',
                marginTop: '13%',
                backgroundColor: '#fff',
                elevation: 20,
                shadowColor: 'grey',
                justifyContent: 'center',
                alignItems: 'center'
            },
            logoTitle: {
                marginLeft: '40%',
                marginTop: '-21%',
                fontSize: 20,
                color: '#FFF',
                fontFamily: 'Montserrat-SemiBold',
            },
            card_logo: {
                width: 50,
                height: 50,
            },
        })
