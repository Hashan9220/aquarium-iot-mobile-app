import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  Alert,
  LogBox,
  Appearance,
  ScrollView,
  BackHandler,
} from 'react-native';
import darkMode from './darkMode';
import LinearGradient from 'react-native-linear-gradient';
import {
  Card,
  Title,
  Paragraph,
  Button,
  Dialog,
  Portal,
  Provider,
} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as Progress from 'react-native-progress';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  riskyPhValueNotification,
  riskyTemperatureNotification,
} from '../services/LocalPushController';
import {Pulse} from 'react-native-loader';

export default function Home() {
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(false);
  const hideDialog = () => setVisible(false);
  const [ph, setPh] = useState(0);
  const [temp, setTemp] = useState(0);
  const [id, setId] = useState('');
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [dangerNh3, setDangerNh3] = useState(0);
  const [normalNh3, setNormalNh3] = useState(0);
  const [indicatorColor, setIndicatorColor] = useState('000');
  const [normalIndicatorOpacity, setNormalIndicatorOpacity] = useState(0);
  const [dangerIndicatorOpacity, setDangerIndicatorOpacity] = useState(0);
  const [count, setCount] = useState(0);

  Appearance.addChangeListener(scheme => {
    setTheme(scheme.colorScheme);
  });

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const getData = async () => {
    const value = await AsyncStorage.getItem('@device_id');
    if (value !== null) {
      setId(value);
    }
  };

  useEffect(() => {
    getData();
    if (id !== '') {
      const onChangeValue = database()
        .ref('/' + id + '/')
        .on('value', snapshot => {
          setPh(snapshot.val().PH_Value.toFixed(2));
          setTemp(snapshot.val().Temp.toFixed(2));
        });
    } else if (id === '') {
      showDialog();
    }
  }, [id, ph, temp]);

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);
  useEffect(() => {
    checkNh3();
    scanIdPopUp();
  }, []);
  useEffect(() => {

    if (ph > 8.00){
      checkHighPH();
    } else if (ph < 6.5) {
      checkLowPH();
    }else {
      // reset();
    }
  }, []);
  useEffect(() => {
    if (temp > 35) {
      checkHighTemp();
    } else if (temp < 23) {
      checkLowTemp();
    } 
  }, []);
  const scanIdPopUp = () => {
    if (id !== null) {
      showDialog();
    } else {
      hideDialog();
    }
  };
  const riskyPH = () => {
    riskyPhValueNotification();
  };
  const riskyTemp = () => {
    riskyTemperatureNotification();
  };
  // const reset = () => {
  //   if (count !== 0) {
  //     setCount(0);
  //   }
  // };
  const checkHighPH = () => {

    if ( count === 0) {
      setCount(1);
      console.log(" ph high",count);
      riskyPH();
      
    }else {
      console.log("reset ph high");
      // reset();
    }
  };
  const checkLowPH = () => {
    if ( count === 0) {
      
      riskyPH();
    }else {
      console.log("reset ph low");
      // reset();
    }
  };
  const checkHighTemp = () => {
    if (temp >= 30 && temp <= 35 && count === 0) {
      console.log("resky temp");
      riskyTemp();
    }else {
      console.log("reset temp");
      // reset();
    }
  };
  const checkLowTemp = () => {
    if (temp <= 23 && temp >= 1 && count === 0) {
    
      riskyTemp();
    }
  };

  const checkNh3 = () => {
    if (ph <= 7.5 && ph >= 6.5 && temp >= 23 && temp <= 32) {
      setNormalNh3(1);
      setDangerNh3(0);
      setIndicatorColor('#fff');
      setNormalIndicatorOpacity(1);
      setDangerIndicatorOpacity(0);
    } else if (ph === 0 && temp === 0) {
      setNormalNh3(0);
    } else {
      setDangerNh3(1);
      setNormalNh3(0);
      setIndicatorColor('red');
      setNormalIndicatorOpacity(0);
      setDangerIndicatorOpacity(1);
    }
  };
  const Clickdone = () => {
    hideDialog();
  };
  return (
    <Provider>
      <LinearGradient colors={['#a6d4ff', '#1E90FF']} style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          <View>
            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Device not found</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>Please scan your device</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={Clickdone}>OK</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </View>
          <StatusBar backgroundColor="#a6d4ff" />
          <View>
            <View style={styles.deviceIdView}>
              <Text style={styles.txtDeviceId}>
                {'Your ID : '}
                {id}
              </Text>
            </View>
            <View style={styles.cardSection}>
              <Card
                style={{
                  ...styles.leftCard,
                  borderColor:
                    ph >= 7.5
                      ? 'red'
                      : ph >= 6.5
                      ? 'yellow'
                      : ph <= 6.5
                      ? 'green'
                      : '#fff',
                  borderWidth: ph > 7.5 ? 3 : ph >= 6.5 ? 3 : ph <= 6.5 ? 3 : 0,
                }}>
                <Card.Content style={styles.cardContent}>
                  <Title style={{color: '#1E90FF'}}>pH</Title>
                  <Paragraph style={{color: '#000'}}>{ph}</Paragraph>
                </Card.Content>
                <Card style={styles.subCard}>
                  <Card.Content style={styles.cardContent}>
                    <Image
                      style={styles.card_logo}
                      source={require('../assets/icons/ph_icon.png')}
                    />
                  </Card.Content>
                </Card>
              </Card>
              <Card style={styles.rightCard}>
                <Card.Content style={styles.cardContent}>
                  <Title style={{color: '#1E90FF'}}>NH3</Title>

                  <View style={{marginTop: '12%'}}>
                    <Paragraph
                      style={{
                        fontSize: 15,
                        color: 'red',
                        opacity: dangerNh3,
                        marginTop: '-12%',
                      }}>
                      Dangerous
                    </Paragraph>
                    <Paragraph
                      style={{
                        fontSize: 15,
                        color: 'green',
                        marginTop: '-15%',
                        opacity: normalNh3,
                      }}>
                      Normal
                    </Paragraph>

                    <View style={{marginTop: 5, marginLeft: '30%'}}>
                      <Pulse
                        size={10}
                        color={indicatorColor}
                        opacity={dangerIndicatorOpacity}
                      />
                      <View
                        style={{
                          width: '5%',
                          height: '5%',
                          borderRadius: 50,
                          backgroundColor: 'green',
                          marginTop: '-28%',
                          opacity: normalIndicatorOpacity,
                        }}
                      />
                    </View>
                  </View>
                </Card.Content>
                <Card style={styles.rightSubCard}>
                  <Card.Content style={styles.cardContent}>
                    <Image
                      style={styles.card_logo}
                      source={require('../assets/icons/NH3_icon.png')}
                    />
                  </Card.Content>
                </Card>
              </Card>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: wp('5%'),
                marginBottom: wp('5%'),
              }}>
              <Text style={{fontSize: 25, color: '#fff'}}>
                Current Temperature
              </Text>
              <View
                style={{position: 'relative', margin: 20, marginBottom: 50}}
                progressBarContainer>
                <Progress.Circle
                  progress={temp / 50}
                  color={
                    temp >= 32
                      ? 'red'
                      : temp >= 24
                      ? 'yellow'
                      : temp <= 23
                      ? 'green'
                      : '#fff'
                  }
                  size={248}
                  indeterminate={false}
                />
                <View style={styles.midCircle}>
                  <Text
                    style={{
                      width: '40%',
                      height: '30%',
                      textAlign: 'center',
                      fontSize: 20,
                      fontStyle:'bold'
                    }}>
                    {temp} °C
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  deviceIdView: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  txtDeviceId: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '500',
  },
  cardSection: {
    height: 200,
    flex: 1,
    padding: 5,
  },
  leftCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '42%',
    height: '10%',
    marginLeft: '2%',
    marginRight: '45%',
    marginTop: '2%',
    borderRadius: 30,
    elevation: 10,
    shadowColor: '#fff',
    backgroundColor: '#fff',
  },
  rightCard: {
    flex: 1,
    width: '40%',
    height: '10%',
    borderRadius: 30,
    marginLeft: '55%',
    marginTop: -185,
    elevation: 10,
    shadowColor: '#fff',
    backgroundColor: '#fff',
  },
  subCard: {
    width: 70,
    height: 70,
    borderRadius: 20,
    marginLeft: 70,
    marginTop: -105,
    backgroundColor: '#fff',
    elevation: 20,
    shadowColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightSubCard: {
    width: 70,
    height: 70,
    borderRadius: 20,
    marginLeft: 70,
    marginTop: -110,
    backgroundColor: '#fff',
    elevation: 20,
    shadowColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    marginTop: 45,
  },
  card_logo: {
    width: 50,
    height: 50,
    marginTop: -47,
  },
  midCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 24,
    marginTop: -222,
    width: 200,
    height: 200,
    borderRadius: 360,
    backgroundColor: '#fff',
  },
});
