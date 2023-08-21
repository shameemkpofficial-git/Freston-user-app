import { BackHandler, View, Alert } from 'react-native';
import { useEffect } from 'react';

const backAction = () => {
  Alert.alert('Hold on!', 'Are you sure you want to go back?', [
    {
      text: 'Cancel',
      onPress: () => null,
      style: 'cancel'
    },
    { text: 'YES', onPress: () => BackHandler.exitApp() }
  ]);
  return true;
};

export const useBackButton = () => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, [backAction]);
};
