import { StyleSheet, Platform, Dimensions } from 'react-native';
import { white, Grape, primaryColor } from 'app/theme/Colors';

export const LeaveFormStyle = StyleSheet.create({
  dropDownContainerStyle: {
    borderWidth: 0,
    width: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  ContainerStyle: {
    borderWidth: 0,
    width: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  button: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: 150,
    borderRadius: 10,
    padding: 5,
    // position: 'absolute',
    // top: 600,
    height: 50
  },
  buttonClose: {
    backgroundColor: primaryColor
  },
  confirmText: {
    color: white,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  imgIcon: {
    height: 30,
    width: 30,
    alignSelf: 'center',
    marginTop: 10
  }
});
