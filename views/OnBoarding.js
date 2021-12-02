import React, {useRef} from "react";
import {Image, View, Text, TouchableOpacity, StatusBar} from "react-native";
import ViewPager from '@react-native-community/viewpager';

import Page from '../components/Page'
import Footer from "../components/Footer";

export default function OnBoarding({navigation}){
    const pagerRef = useRef(null);

    const handlePageChange = pageNumber => {
        pagerRef.current.setPage(pageNumber);
    };

    return(
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor={'#a6d4ff'}/>
            <View style={{backgroundColor: '#a6d4ff'}}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Welcome')}
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
                </View>
                <View key="2">
                    <Page
                        title="Title 2 "
                        subTitle="A fish is an animal which  lives and breathes in water. All fish are vertebrates (have a backbone) and  most breathe through gills and have fins and scales."
                    />
                </View>
                <View key="3">
                    <Page
                        title="Title 3 "
                        subTitle="A fish is an animal which  lives and breathes in water. All fish are vertebrates (have a backbone) and  most breathe through gills and have fins and scales."
                    />
                </View>
            </ViewPager>

            <Footer
                backgroundColor="#1E90FF"
                rightButtonLabel="Next"
                leftButtonLabel="Skip"
                rightButtonPress={() => {
                    if (View.key == 3){
                        handlePageChange(1);
                    }else{
                        handlePageChange(3);

                    }
                }}
                leftButtonPress={() => navigation.navigate('Welcome')}
            />
        </View>
    )
}
