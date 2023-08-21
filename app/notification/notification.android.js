import PushNotification from 'react-native-push-notification';

const showNotification = (title, message) => {
  alert('jump');
  PushNotification.localNotification({
    title: 'Freston User App',
    message: 'This is a testing notification for users',
    channelId: 'channel-id',
    channelName: 'My channel'
  });
};

const handleScheduleNotification = (title, message) => {
  // alert(new Date());
  PushNotification.localNotificationSchedule({
    title: 'Freston user App',
    message: 'This is Scheduled notification',
    channelId: 'channel-id',
    channelName: 'My channel',
    date: new Date(Date.now() + 5000)
  });
};

const handleCancelNotification = (title, message) => {
  PushNotification.cancelAllLocalNotifications();
};

export {
  showNotification,
  handleScheduleNotification,
  handleCancelNotification
};
