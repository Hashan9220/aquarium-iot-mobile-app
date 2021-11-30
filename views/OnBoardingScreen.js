import React from "react";
import {View, Text, StyleSheet, Image, StatusBar, TouchableOpacity} from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';
import LinearGradient from "react-native-linear-gradient";

const Dots = ({selected}) => {
    let backgroundColor;
    backgroundColor = selected ? 'rgb(255,255,255)' : 'rgb(134, 164, 197)';

    return (
        <View
            style={{
                width:10,
                height: 10,
                marginHorizontal: 3,
                backgroundColor,
                borderRadius: 6
            }}
        />
    );
}

const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:40}}
        {...props}
    >
        <Text style={{fontSize:16, color: '#FFF'}}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:50}}
        {...props}
    >
        <Text style={{fontSize:16, color: '#FFF'}}>Next</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        {...props}
        style={{marginHorizontal:70}}
    >
        <Text style={{fontSize:16, color: '#F4F5FF'}}>Done</Text>
    </TouchableOpacity>
);

export default function OnBoardingScreen({navigation}){

    return (
        <LinearGradient
            colors={['#a6d4ff','#1E90FF' ]}
                style={styles.container}
        >
            <StatusBar backgroundColor={'#a6d4ff'}/>
            <Image style={styles.header} source={require('../assets/logos/logo.png')} />

            <Onboarding titleStyles={{color: '#F4F5FF'}}
                SkipButtonComponent={Skip}
                NextButtonComponent={Next}
                DoneButtonComponent={Done}
                DotComponent={Dots}
                onSkip={() => navigation.navigate('Welcome')}
                onDone={() => navigation.navigate('Welcome')}
                pages={[
                    {
                        image: <Image style={styles.onBoard_1_Image} source={require('../assets/logos/slide3_logo.png')} />,
                        title: <Text style={styles.onBoard_1_Title}>Title 1</Text>,
                        subtitle: <Text style={styles.onBoard_1_SubTitle}>
                                        A fish is an animal which {'\n'} lives and breathes in water. {'\n'} All fish are vertebrates {'\n'} (have a backbone) and {'\n'} most breathe through gills {'\n'} and have fins and scales.
                                  </Text>,
                    },
                    {
                        image: <Image style={styles.onBoard_2_Image} source={require('../assets/logos/slide2_logo.png')} />,
                        title: <Text style={styles.onBoard_2_Title}>Title 2</Text>,
                        subtitle: <Text style={styles.onBoard_2_SubTitle}>
                                        A fish is an animal which {'\n'} lives and breathes in water. {'\n'} All fish are vertebrates {'\n'} (have a backbone) and {'\n'} most breathe through gills {'\n'} and have fins and scales.
                                  </Text>,
                    },
                    {
                        image: <Image style={styles.onBoard_3_Image} source={require('../assets/logos/slide3_logo.png')} />,
                        title: <Text style={styles.onBoard_3_Title}>Title 2</Text>,
                        subtitle: <Text style={styles.onBoard_3_SubTitle}>
                                    A fish is an animal which {'\n'} lives and breathes in water. {'\n'} All fish are vertebrates {'\n'} (have a backbone) and {'\n'} most breathe through gills {'\n'} and have fins and scales.
                                  </Text>,
                    },
                ]}
            />
         </LinearGradient>
    );
};

const styles=StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent:'center',
      width: 420,
    },
    header: {
        marginTop: 10,
        marginLeft:-200,
    },
    content: {
        width: 412,
        height: 1000,
        marginTop: 10,
    },
    skipBtn: {
        color: 'white',
        marginLeft: 360,
        fontSize: 15,
        marginTop: -45,
        textDecorationLine: 'none'
    },
    onBoard_1_Image:{
        marginLeft:30,
        marginTop:-150
    },
    onBoard_1_Title:{
        fontSize:35,
        color:'white',
        marginTop: -40,
        marginLeft:30
    },
    onBoard_1_SubTitle: {
        fontSize:18,
        marginTop: 10,
        marginLeft:30,
        textAlign: 'center',
        color: '#F4F5FF'
    },
    onBoard_2_Image:{
        marginLeft:50,
        marginTop:-200
    },
    onBoard_2_Title:{
        fontSize:35,
        color:'white',
        marginTop: -40,
        marginLeft:30
    },
    onBoard_2_SubTitle: {
        fontSize:18,
        color:'white',
        marginTop: 10,
        marginLeft:40,
        textAlign: 'center',
    },
    onBoard_3_Image:{
        marginLeft:-80,
        marginTop:-200
    },
    onBoard_3_Title:{
        fontSize:35,
        color:'white',
        marginTop: -40,
        marginLeft:-80
    },
    onBoard_3_SubTitle: {
        fontSize:18,
        color:'white',
        marginTop: 10,
        marginLeft:-70,
        textAlign: 'center'
    }
})
