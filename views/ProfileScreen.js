import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ActivityIndicator, Divider, Text} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseURL from '../services/baseURL';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Orientation, {unlockAllOrientations} from 'react-native-orientation';

export default function ProfileScreen() {
  const [id, setId] = useState(null);
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [pic, setPic] = useState('');
  const [contact, setUserContact] = useState('');
  const [name, setUserName] = useState('');
  const [address, setUserAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const formdata = new FormData();

  const getUserData = useCallback(() => {
    fetch(baseURL + 'user/' + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
        setUserName(json.name);
        setUserEmail(json.email);
        setUserAddress(json.address);
        setUserContact(json.contact);
        setPic(json.user_image);
      });
  });

  useEffect(() => {
    getId();
    getToken();
  }, []);

  useEffect(() => {
    if (id && token) {
      getUserData();
    }
  }, [getUserData, id, token]);

  const a = 0;

  const getId = async () => {
    let value = await AsyncStorage.getItem('id');
    if (value !== null) {
      setId(value);
    }
  };

  const getToken = async () => {
    let token = await AsyncStorage.getItem('token');
    if (token !== null) {
      setToken(token);
    }
  };

  const imageUpload = async () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel === true) {
      } else if (response.errorCode && parseInt(response.errorCode)) {
        alert('error image upload');
      } else if (response.assets[0].fileSize > 1000000) {
        // eslint-disable-next-line no-alert
        alert('Maximum image size exceeded Please Choose image under 2 MB');
      } else {
        setPic(response.assets[0].base64);
        const file = {
          uri: response.assets[0].uri,
          name: response.assets[0].fileName,
          type: response.assets[0].type,
        };
        formdata.append('image', file);
        uploadImage();
      }
    });
  };

  const uploadImage = () => {
    fetch(baseURL + 'uploadImage/' + id, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      method: 'POST',
      body: formdata,
    })
      .then(response => response.json())
      .then(responseData => {
        getUserData();
      })
      .catch(error => {});
  };

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <LinearGradient colors={['#a6d4ff', '#1E90FF']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator
            visible={loading}
            textStyle={styles.spinnerTextStyle}
          />
        ) : (
          <View style={styles.card} onScroll={startLoading}>
            <View style={styles.imgContainer}>
              {/* <Image style={styles.images} source={require('../assets/icons/profile.png')}/> */}
              <Image
                source={{
                  uri: 'http://54.245.177.239:8060/storage/user_images/' + pic,
                }}
                style={styles.images}
              />
            </View>
            <TouchableOpacity
              style={styles.cameraContainer}
              onPress={() => imageUpload()}>
              <Image
                style={{marginLeft: '5%'}}
                source={require('../assets/icons/camera.png')}
              />
            </TouchableOpacity>
            <Text style={styles.name}>{name}</Text>
          </View>
        )}
        <View style={styles.mainContainer}>
          <View style={styles.detailContainer}>
            <Text style={styles.heading}> Name :- {name} </Text>
            <Text style={styles.detail}> </Text>
          </View>
          <Divider />
          <View style={styles.detailContainer}>
            <Text style={styles.heading}> Email :- {userEmail} </Text>
            <Text style={styles.detail}> </Text>
          </View>
          <Divider />
          <View style={styles.detailContainer}>
            <Text style={styles.heading}> Address :- {address} </Text>
            <Text style={styles.detail}> </Text>
          </View>
          <Divider />
          <View style={styles.detailContainer}>
            <Text style={styles.heading}> Contact :- {contact} </Text>
            <Text style={styles.detail}> </Text>
          </View>
          <Divider />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: wp('100%'),
    height: hp('40%'),
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: {
    width: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    marginBottom: '-8%',
    borderColor: '#a6d4ff',
  },
  cameraContainer: {
    width: '10%',
    height: '10%',
    borderRadius: 20,
    backgroundColor: '#a6d4ff',
    borderWidth: 3,
    borderColor: '#a6d4ff',
    marginLeft: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    marginTop: 20,
    fontSize: 25,
    color: '#34495e',
  },
  heading: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'left',
  },
  detail: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'left',
  },
  mainContainer: {
    marginTop: '10%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  detailContainer: {
    padding: 5,
  },
  images: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: '-1%',
  },
});
