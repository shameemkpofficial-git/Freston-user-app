import { StyleSheet, Platform, Dimensions } from 'react-native';
import { white, Grape, transparentOpacity } from 'app/theme/Colors';

export const ModelStyle = StyleSheet.create({
  categoryModel: {
    height: 20,
    backgroundColor: white,
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
    marginTop: 110,
    marginLeft: 70,
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  },
  categoryList: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'oldlace',
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 6,
    textAlign: 'center'
  },
  categoryText: { fontSize: 12, fontWeight: '500', color: Grape },
  container: {
    flex: 1,
    backgroundColor: transparentOpacity,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    backgroundColor: white,
    borderRadius: 21,
    overflow: 'hidden',
    width: '90%',
    margin: 20
  },
  modalBody: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    // alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 30
  },
  message: {
    paddingVertical: 5,
    fontWeight: '500',
    color: '#bd3c6a',
    paddingLeft: 15,
    textTransform: 'capitalize'
  },
  msgContainer: { width: '95%', alignItems: 'center' },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'red'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#105493'
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: -10,
    marginLeft: -2
  }
});
