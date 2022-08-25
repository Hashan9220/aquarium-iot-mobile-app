import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {
    console.log('LOCAL NOTIFICATION ==>', notification);
  },

  popInitialNotification: true,
  requestPermissions: true,
});

PushNotification.createChannel(
  {
    channelId: '1', // (required)
    channelName: 'My channel', // (required)
    channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    playSound: false, // (optional) default: true
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

export const riskyPhValueNotification = () => {
  PushNotification.localNotification({
    autoCancel: true,
    bigText: 'Your fish is at risk.. MOVE THEM AWAY!',
    color: '#a6d4ff',
    title: 'RISKY PH VALUE !!!',
    message: 'Expand me to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["OK"]',
    channelId: '1',
  });
};

export const riskyTemperatureNotification = () => {
  PushNotification.localNotification({
    autoCancel: true,
    bigText: 'Your fish is at risk.. MOVE THEM AWAY!',
    color: '#a6d4ff',
    title: 'RISKY TEMPERATURE !!!',
    message: 'Expand me to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["OK"]',
    channelId: '1',
  });
};

export const checkOnce = () => {
  PushNotification.requestPermissions().then((response: any) => {
    if (response && response.alert !== 0) {
      riskyTemperatureNotification();
      console.log('Notification showed');
      return;
    }
    console.log('Notification already shown');
  });
};
