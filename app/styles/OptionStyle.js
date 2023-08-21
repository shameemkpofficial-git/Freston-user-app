import { StyleSheet, Platform, Dimensions } from 'react-native';
import {
  white,
  grey,
  blue,
  black,
  primaryColor,
  secondaryColor,
  lighrBlue
} from 'app/theme/Colors';

export const optionStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'center'
  },
  mailBtn: {
    height: 50,
    width: 120,
    backgroundColor: primaryColor,
    alignSelf: 'center',
    marginTop: 10
  },
  mailTxt: {
    fontSize: 20,
    color: white,
    textAlign: 'center',
    marginTop: 10
  }
});
