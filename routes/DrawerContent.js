import React, {useEffect, useState} from 'react';
import {Alert, Animated, Image, Linking, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Drawer, Text} from 'react-native-paper';
import baseURL from '../services/baseURL';

const ModelPoup = ({visible, children}) => {
    const [showModel, setShowModel] = React.useState(visible);
    const scaleValue = React.useRef(new Animated.Value(0)).current;
    React.useEffect(() => {
        toggleModal();
    }, [visible]);

    const toggleModal = () => {
        if (visible) {
            setShowModel(true);
            Animated.spring(scaleValue, {
                toValue: 1, duration: 300, useNativeDriver: true,
            }).start();
        } else {

            setTimeout(() => setShowModel(false), 200);
            Animated.timing(scaleValue, {
                toValue: 0, duration: 300, useNativeDriver: true,
            }).start();
        }
    }

    return (<Modal transparent visible={showModel}>
        <View style={styles.modalBackGround}>
            <Animated.View style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
                {children}
            </Animated.View>
        </View>
    </Modal>)
}

export default function DrawerContent({navigation, onPress}) {

    const signOut = async () => {
        try {
            await AsyncStorage.removeItem('alreadyLaunched');
            await AsyncStorage.removeItem('@device_id');
            await AsyncStorage.removeItem('token');
            navigation.navigate('Welcome');
        } catch (e) {
        }
    }

    const [active, setActive] = React.useState('');
    const [name, setUserName] = useState('');
    const [images, setImage] = useState('');
    const [token, setToken] = useState('');
    const [id, setId] = useState('');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        getId();
        getToken();

    }, [])

    useEffect(() => {
        if (id && token) {
            imageSet();
        }
    }, [id, token, onPress])

    const imageSet = () => {
        fetch(baseURL + 'user/' + id, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }, method: 'GET',
        })
            .then((response) => response.json())
            .then((json) => {
                setImage(json.user_image);
                setUserName(json.name)
            })
    }

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

    return (<View style={styles.drawerContainer}>
        <DrawerContentScrollView>
            <View style={styles.userInfoSection}>
                <View style={styles.profilePicSection}>
                    <Image
                        source={{uri: 'http://54.245.177.239/storage/user_images/' + images}}
                        style={styles.dummyPic}
                    />
                </View>
                <Text style={{marginLeft: 100, marginTop: -65, fontSize: 20, color: '#000'}}>
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
                                <Image source={require('../assets/icons/close.png')}
                                       style={{height: 20, width: 20}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Image source={require('../assets/icons/fish-food.png')}
                               style={{height: 100, width: 100, marginVertical: 10}}/>
                    </View>
                    <Text style={styles.modelText}>hello text</Text>
                    <Text style={styles.modelText}>use feed tab for your fish</Text>
                    <Text style={styles.modelText}>use feed tab for your fish</Text>
                    <Text style={styles.modelText}>use feed tab for your fish</Text>
                </ModelPoup>
            </Drawer.Section>
            <Drawer.Section title=" ">
                <Drawer.Item
                    style={styles.signOutSection}
                    label="Sign Out"
                    active={active === 'fourth'}
                    onPress={() => {
                        Alert.alert('Signing Out', 'Are you sure?', [{
                            text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel',
                        }, {text: 'Yes', onPress: () => signOut()},]);
                    }}
                />
            </Drawer.Section>
        </DrawerContentScrollView>
    </View>);
}

const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1, padding: 10, justifyContent: 'space-between',
    }, userInfoSection: {
        padding: 10, height: 100,
    }, profilePicSection: {
        width: 80,
        height: 80,
        borderRadius: 50,
        backgroundColor: '#fff',
        elevation: 20,
        shadowColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
    }, dummyPic: {
        width: 80, height: 80, borderRadius: 50
    }, signOutSection: {
        marginTop: 150,
    }, edit_icon: {
        marginTop: '10%', marginLeft: '15%',
    }, modalBackGround: {
        flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center',
    }, modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20,
    }, header: {
        width: '100%', alignItems: 'flex-end', justifyContent: 'center', height: 40,
    }, modelText: {
        marginVertical: 30, fontSize: 20, textAlign: 'center',
    }
});
