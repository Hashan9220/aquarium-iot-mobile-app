import React from "react";
import { BottomNavigation, Text,  } from 'react-native-paper';
import Home from "../views/Home";
import Article from "../views/Article";
import QrCode from "../views/QrCode";

export default function BottomTab(){
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'home', title: 'Home', icon: 'home', color: '#1E90FF', },
        { key: 'history', title: 'History', icon: 'history', color: '#1E90FF'},
        { key: 'scan', title: 'Scan', icon: 'qrcode-scan', color: '#1E90FF' },
        { key: 'manage', title: 'Manage', icon: 'cog', color: '#1E90FF' },
        { key: 'profile', title: 'Profile', icon: 'account', color: '#1E90FF' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: Home,
        history: Article,
        scan: QrCode,
        manage: Article,
        profile: Article
    });

    return(
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    )
}
