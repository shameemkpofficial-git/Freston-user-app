import React from 'react';
import { View, Text, Stylesheet, TouchableOpacity } from 'react-native';
import PushNotification from 'react-native-push-notification';

import {
  showNotification,
  handleScheduleNotification,
  handleCancelNotification
} from 'app/notification/notification.android';

const notificationConfig = () => {
  PushNotification.configure({
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
    },

    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);
    },

    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true
    },

    popInitialNotification: true,

    requestPermissions: true
  });
};

const createChannelId = () => {
  PushNotification.createChannel(
    {
      channelId: 'channel-id', // (required)
      channelName: 'My channel', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      // importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true // (optional) default: true. Creates the default vibration pattern if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );
};

notificationConfig();
createChannelId();

const NotificationHandle = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text>Push Notification</Text>
      <TouchableOpacity
        style={{ backgroundColor: 'red', height: 30, width: 120 }}
        onPress={() => showNotification()}
      >
        <Text style={{ alignText: 'center' }}>Notification</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: 'red', height: 30, width: 120 }}
        onPress={() => handleScheduleNotification('Hi', 'Show')}
      >
        <Text style={{ alignText: 'center' }}>Schedule</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: 'red', height: 30, width: 120 }}
      >
        <Text style={{ alignText: 'center' }}>3rd</Text>
      </TouchableOpacity>
    </View>
  );
};
export default NotificationHandle;
