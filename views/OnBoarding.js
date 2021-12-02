import React, {useRef} from "react";
import {Image, StatusBar, Text, TouchableOpacity, View} from "react-native";
import ViewPager from '@react-native-community/viewpager';

import Page from '../components/Page'
import Footer from "../components/Footer";

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
                <TouchableOpacity
                    onPress={() => navigation.navigate('Welcome')}
                >
                    <Text style={{marginLeft: '85%', marginTop: '13%', color: '#fff'}}>Skip</Text>
                </TouchableOpacity>
                <Image style={{marginLeft: '2%', marginTop: '-12%'}} source={require('../assets/logos/logo.png')}/>
            </View>

            <ViewPager style={{flex: 1}} initialPage={0} ref={pagerRef}>
                <View key="1">
                    <Page
                        title="Title 1 "
                        subTitle="A fish is an animal which  lives and breathes in water. All fish are vertebrates (have a backbone) and  most breathe through gills and have fins and scales."
                    />
                </View>
                <View key="2">
                    <Page
                        title="Title 2 "
                        subTitle="A bird is an animal which  lives and breathes in water. All fish are vertebrates (have a backbone) and  most breathe through gills and have fins and scales."
                    />
                </View>
                <View key="3">
                    <Page
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
                        navigation.navigate('Welcome')
                    }
                    handlePageChange(pageNo);
                    pageNo++;
                }}
            />
        </View>
    )
}
