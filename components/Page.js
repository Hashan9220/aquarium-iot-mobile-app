import React from 'react';
import {View, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Page = ({image, title, subTitle}) => {
  return (
    <LinearGradient
      colors={['#a6d4ff', '#1E90FF']}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image source={image} />
      <View style={{marginTop: 16}}>
        <Text
          style={{
            fontSize: 45,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            fontFamily: 'Montserrat-Medium',
          }}>
          {title}
        </Text>
        <Text
          style={{
            marginTop: 30,
            fontSize: 16,
            color: 'white',
            textAlign: 'center',
            width: 300,
            fontFamily: 'Montserrat-Medium',
          }}>
          {subTitle}
        </Text>
      </View>
    </LinearGradient>
  );
};

export default Page;
