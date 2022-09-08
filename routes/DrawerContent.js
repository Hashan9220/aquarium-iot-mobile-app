import React, {useEffect, useState} from 'react';
import {
  Alert,
  Animated,
  Image,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Drawer, Text} from 'react-native-paper';
import baseURL from '../services/baseURL';
import SignIn from '../views/SignIn';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ModelPoup = ({visible, children}) => {
  const [showModel, setShowModel] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    if (visible && SignIn) {
      setShowModel(true);

      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModel(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <Modal transparent visible={showModel}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default function DrawerContent({navigation}) {
  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('alreadyLaunched');
      await AsyncStorage.removeItem('@device_id');
      await AsyncStorage.removeItem('token');
      navigation.navigate('Welcome');
    } catch (e) {}
  };

  const [active, setActive] = React.useState('');
  const [name, setUserName] = useState('');
  const [images, setImage] = useState('');
  const [token, setToken] = useState('');
  const [id, setId] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getId();
    getToken();
  }, []);

  useEffect(() => {
    if (id && token) {
      imageSet();
    }
  }, [id, token, navigation]);

  const imageSet = () => {
    fetch(baseURL + 'user/' + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
        setImage(json.user_image);
        setUserName(json.name);
        console.log('image :- ', json.user_image);
      });
  };

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

  return (
    <View style={styles.drawerContainer}>
      <DrawerContentScrollView>
        <View style={styles.userInfoSection}>
          <View style={styles.profilePicSection}>
            <Image
              source={{
                uri: 'http://54.245.177.239/storage/user_images/' + images,
              }}
              style={styles.dummyPic}
            />
          </View>
          <Text
            style={{
              width: wp('25%'),
              marginLeft: wp('30%'),
              marginTop: wp('-15%'),
              fontSize: 20,
              color: '#000',
            }}>
            {name}
          </Text>
        </View>
        <Drawer.Section title=" ">
          <Drawer.Item
            label="Contact Us"
            active={active === 'second'}
            onPress={() => Linking.openURL('https://www.hotcat.lk/#contact')}
          />
          <Drawer.Item
            label="Support"
            active={active === 'third'}
            onPress={() => setVisible(true)}
          />

          <ModelPoup visible={visible}>
            <View style={{alignItems: 'center'}}>
              <View style={styles.header}>
                <TouchableOpacity onPress={() => setVisible(false)}>
                  <Image
                    source={require('../assets/icons/close.png')}
                    style={{height: 20, width: wp('5%'), marginTop: wp('10%')}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../assets/logos/slide1_logo.png')}
                style={{height: hp('15%'), width: wp('35%')}}
              />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modelText}>Hi! Welcome</Text>
              <Text style={styles.modelText}>
                Fist Scan On Your Device QrCode
              </Text>
              <Text style={styles.modelText}>
                QrCode Scan After Go Home Page
              </Text>
              <Text style={styles.modelText}>
                Now You Can Device Setup to Your Tank{' '}
              </Text>
              <Text style={styles.modelText}>
                Now You Can See The Value Of PH and Temp in Tank Water In Your
                App
              </Text>
              <Text style={styles.modelText}>
                You can Feed to Your Fish Go to App Feed Page And Click The Feed
                Button
              </Text>
            </ScrollView>
          </ModelPoup>
        </Drawer.Section>
        <Drawer.Section title=" ">
          <Drawer.Item
            style={styles.signOutSection}
            label="Sign Out"
            active={active === 'fourth'}
            onPress={() => {
              Alert.alert('Signing Out', 'Are you sure?', [
                {
                  text: 'No',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'Yes', onPress: () => signOut()},
              ]);
            }}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  userInfoSection: {
    padding: 10,
    height: hp('10%'),
  },
  profilePicSection: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#fff',
    elevation: 20,
    shadowColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dummyPic: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  signOutSection: {
    marginTop: wp('10%'),
  },
  edit_icon: {
    marginTop: '10%',
    marginLeft: '15%',
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 10,
  },
  modelText: {
    marginVertical: 30,
    fontSize: 20,
    textAlign: 'center',
  },
});
