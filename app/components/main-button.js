import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Fonts from 'app/theme/fonts';

import { DevWidth } from 'app/theme/devices';

export default function MainButton({ onPress, name, loading, setLoading }) {
  return (
    <TouchableOpacity
      disabled={loading ? true : false}
      style={styles.touchableStyle}
      onPress={onPress}
    >
      <LinearGradient
        style={styles.mainBtnGradient}
        colors={['#e74d88', '#b03761']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        {loading ? (
          <ActivityIndicator color={'#fff'} size={'small'} />
        ) : (
          <Text style={styles.buttonTextStyle}>{name}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  buttonTextStyle: {
    color: '#fff',
    // paddingVertical: 8,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: Fonts.medium
  },
  touchableStyle: {
    // marginHorizontal: 100,
    marginTop: 40,
    alignSelf: 'center'
  },
  mainBtnGradient: {
    height: 40,
    width: DevWidth - 50,
    backgroundColor: 'black',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: Fonts.medium
  }
});
