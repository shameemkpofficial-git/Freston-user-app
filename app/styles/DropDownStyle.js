import { StyleSheet, Platform, Dimensions } from 'react-native';
import { black, secondaryColor, white } from 'app/theme/Colors';

export const DropDownStyle = StyleSheet.create({
  DropDownContainer: {
    borderWidth: 0,
    width: 280,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  PlaceholderStyle: {
    fontSize: 18,
    fontWeight: '650',
    fontFamily: 'WorkSans-Italic-VariableFont_wght'
  },
  LabelStyle: {
    fontFamily: 'WorkSans-Italic-VariableFont_wght',
    fontSize: 18,
    fontWeight: '650',
    color: black,
    marginLeft: -5,
    marginBottom: 20
  },
  listItemContainer: { backgroundColor: secondaryColor },
  arrowIcon: { marginBottom: 30, marginRight: 0 },
  ListItemlabel: { marginBottom: 20, color: white }
});
