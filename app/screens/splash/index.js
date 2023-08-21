// @flow

import AsyncStorage from '@react-native-async-storage/async-storage';
import Lottie from 'lottie-react-native';
import React from 'react';
import { Image, View } from 'react-native';

import { DevHeight } from 'app/theme/devices';

export const Splash = ({ navigation }) => {
  const getToken = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem('user'));
      console.log('user', value);
      setTimeout(() => {
        if (value?.token) {
          navigation.navigate('home');
        } else {
          navigation.navigate('phoneAuth');
        }
      }, 5000);
    } catch (e) {
      // error reading value
    }
  };

  React.useEffect(() => {
    getToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1 }}>
      <Lottie
        autoPlay
        loop
        source={require('app/assets/animations/wave.json')}
      />
      <Image
        source={require('app/assets/images/longlogo.png')}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          alignSelf: 'center',
          position: 'absolute',
          resizeMode: 'contain',
          top: DevHeight / 3,
          width: '80%'
        }}
      />
    </View>
  );
};
