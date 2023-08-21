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

export const ApplyStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20
  },
  button: {
    height: 50,
    paddingHorizontal: 8,
    backgroundColor: primaryColor,
    alignSelf: 'center',
    textAlign: 'center'
  },
  selected: {
    backgroundColor: secondaryColor,
    borderWidth: 0
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: white,
    textAlign: 'center',
    marginTop: 10
  },
  selectedLabel: {
    color: 'white'
  },
  label: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 24
  },
  mainContainer: {
    marginHorizontal: 20,
    backgroundColor: white,
    marginTop: 10,
    borderColor: grey,
    borderRadius: 10
  },
  cardView: {
    height: 65,
    backgroundColor: white,
    flexDirection: 'row',
    borderRadius: 10
  },
  cardMenu: {
    height: 50,
    width: 50,
    backgroundColor: lighrBlue,
    marginTop: 10,
    marginLeft: 5,
    borderRadius: 5
  },
  iconStyle: {
    marginLeft: 7.5,
    marginTop: 7.5
  },
  selectContainer: {
    height: 40,
    backgroundColor: white
    // width: 150,
  },
  typeStyle: {
    fontSize: 15,
    marginLeft: 5,
    marginTop: 10,
    color: grey,
    fontFamily: 'GrotleyItalic-7BD9D'
  },
  selectStyle: {
    // width: 100,
    fontSize: 18,
    fontWeight: '650',
    color: black,
    marginLeft: 5,
    marginTop: 10,
    fontFamily: 'WorkSans-Italic-VariableFont_wght'
    // marginRight: 30,
  },
  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.25,
    opacity: 0.5,
    paddingVertical: 5
  },
  textContainer: {
    flexDirection: 'column',
    paddingHorizontal: 10
  },
  textAreaContainer: {
    borderColor: grey,
    borderWidth: 1,
    padding: 5
  },
  textArea: {
    height: 75,
    justifyContent: 'flex-start',
    color: black
  },
  datePicker: {
    width: 330,
    position: 'absolute',
    bottom: 15,
    left: 5,
    opacity: 0
  },
  input: {
    margin: 12,
    padding: 10
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: -10,
    marginLeft: -2
  },
  textStyle_toDate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
    marginLeft: -2
  },
  scrollContainer: { marginBottom: 20, flex: 0.9 }
});
