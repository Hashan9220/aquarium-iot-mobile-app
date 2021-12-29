import React from "react";
import { BottomNavigation, Text,  } from 'react-native-paper';
import Home from "../views/Home";
import Article from "../views/Article";
import QrCode from "../views/QrCode";
import UpCommingScreen from '../views/UpCommingScreen';
import FeedScreen from '../views/FeedScreen';
import ProfileScreen from '../views/ProfileScreen';

export default function BottomTab(){

    const HomeRoute = () => <Home/>;
    const UpCommingScreenRoute = () => <UpCommingScreen/>;
    const QrCodeRoute = () => <QrCode/>;
    const FeedRoute = () => <FeedScreen/>;
    const ProfileScreenRoute = () => <ProfileScreen/>

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'home', title: 'Home', icon: 'home', color: '#1E90FF', },
        { key: 'scan', title: 'Scan', icon: 'qrcode-scan', color: '#1E90FF' },
        { key: 'feed', title: 'Feed', icon: 'cookie', color: '#1E90FF' },
        { key: 'profile', title: 'Profile', icon: 'account', color: '#1E90FF' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: HomeRoute,
        scan: QrCodeRoute,
        feed: FeedRoute,
        profile: ProfileScreenRoute
    });

    return(
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    )
}
