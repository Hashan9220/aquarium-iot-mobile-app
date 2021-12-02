import React, {useRef} from "react";
import {Image, View, Text, TouchableOpacity, StatusBar} from "react-native";
import ViewPager from '@react-native-community/viewpager';

import Page from '../components/Page'
import Footer from "../components/Footer";

export default function OnBoarding(){
    const pagerRef = useRef(null);

    const handlePageChange = pageNumber => {
        pagerRef.current.setPage(pageNumber);
    };

    return(
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor={'#a6d4ff'}/>
            <View style={{backgroundColor: '#a6d4ff'}}>
                <Image source={require('../assets/logos/logo.png')} style={{marginLeft: '5%', marginTop:'2%'}} />
                <TouchableOpacity

                >
                    <Text  style={{marginLeft:'85%', marginTop:'-12%', color: '#fff'}} >Skip</Text>
                </TouchableOpacity>
            </View>

            <ViewPager style={{ flex: 1 }} initialPage={0} ref={pagerRef}>
                <View key="1">
                    <Page
                        title="Title 1 "
                        subTitle="A fish is an animal which  lives and breathes in water. All fish are vertebrates (have a backbone) and  most breathe through gills and have fins and scales."
                    />
                    <Footer
                        backgroundColor="#1E90FF"
                        rightButtonLabel="Next"
                        rightButtonPress={() => {
                            handlePageChange(1);
                        }}
                    />
                </View>
                <View key="2">
                    <Page
                        title="Title 2 "
                        subTitle="A fish is an animal which  lives and breathes in water. All fish are vertebrates (have a backbone) and  most breathe through gills and have fins and scales."
                    />
                    <Footer
                        backgroundColor="#1E90FF"
                        leftButtonLabel="Back"
                        leftButtonPress={() => {
                            handlePageChange(0);
                        }}
                        rightButtonLabel="Next"
                        rightButtonPress={() => {
                            handlePageChange(2);
                        }}
                    />
                </View>
                <View key="3">
                    <Page
                        title="Title 3 "
                        subTitle="A fish is an animal which  lives and breathes in water. All fish are vertebrates (have a backbone) and  most breathe through gills and have fins and scales."
                    />
                    <Footer
                        backgroundColor="#1E90FF"
                        rightButtonLabel="Done"
                        leftButtonLabel="Back"
                        leftButtonPress={() => {
                            handlePageChange(0);
                        }}
                        rightButtonPress={() => navigation.navigate("Dashboard")}
                    />
                </View>
            </ViewPager>
        </View>
    )
}
