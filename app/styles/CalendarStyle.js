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
import Fonts from '../theme/fonts';
export const CalendarStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#ffffff',
    padding: 16
  },
  item: {
    backgroundColor: '#f3f3fe',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 5,
    elevation: 2
  },
  eventTitle: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 50
  },
  flatListContainer: {
    marginTop: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  lofftyStyle: {
    width: 100
  },
  noEventTitle: { fontFamily: Fonts.medium }
});
