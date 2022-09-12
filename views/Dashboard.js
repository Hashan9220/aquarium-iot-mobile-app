import React from 'react';
import {Image, onPress} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from '../routes/DrawerContent';
import {NavigationContainer} from '@react-navigation/native';
import BottomTab from '../routes/BottomTab';
import Welcome from './Welcome';
import SignIn from './SignIn';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import QrCode from './QrCode';

const Drawer = createDrawerNavigator();

export default function Dashboard() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => <DrawerContent {...props} props={onPress} />}>
        <Drawer.Screen
          options={{
            headerTintColor: '#fff',
            title: '',
            headerTitleStyle: {color: '#fff'},
            drawerStyle: {
              flex: 1,
              width: '70%',
              height: '100%',
              borderTopRightRadius: 40,
              borderBottomRightRadius: 40,
            },
            headerStyle: {backgroundColor: '#a6d4ff'},
            drawerIcon: ({focused, size}) => (
              <Image
                source={require('../assets/logos/notification_icon.png')}
              />
            ),
          }}
          name="BottomTab"
          component={BottomTab}
        />
        <Drawer.Screen
          options={{headerShown: null}}
          name={'Welcome'}
          component={Welcome}
        />
        <Drawer.Screen
          options={{headerShown: null}}
          name={'SignIn'}
          component={SignIn}
        />
        <Drawer.Screen
          options={{headerShown: null}}
          name={'Register'}
          component={Register}
        />
        <Drawer.Screen
          options={{headerShown: null}}
          name={'ForgotPassword'}
          component={ForgotPassword}
        />
        <Drawer.Screen
          options={{headerShown: null}}
          name={'Dashboard'}
          component={Dashboard}
        />
          <Drawer.Screen
          options={{headerShown: null}}
          name={'QrCode'}
          component={QrCode}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
