import React from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Feather from 'react-native-vector-icons/dist/Feather';

import firestore from '@react-native-firebase/firestore';

const ModalActions = ({
  modalVisible,
  setModalVisible,
  navigation,
  id,
  hide = true,
}) => {
  const deleteUser = () => {
    firestore()
      .collection('Projects')
      .doc(id)
      .delete()
      .then(() => alert('Deleted Successfully'))
      .catch(error => alert(error.message));
  };

  const hideProject = () => {
    firestore()
      .collection('Projects')
      .doc(id)
      .update({hide: hide})
      .then(() => {
        setModalVisible(false);
      })
      .catch(error => alert(error.message));
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.closeIcon}>
              <Pressable
                style={[styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <FontAwesome5 name="times-circle" size={24} color="black" />
              </Pressable>
            </View>
            <View style={styles.handleIcons}>
              <TouchableOpacity activeOpacity={0.5} style={styles.pencil}>
                <EvilIcons
                  name="pencil"
                  size={40}
                  color="#61ACB8"
                  onPress={() =>
                    navigation.navigate('UpdateProjectScreen', {
                      itemId: id,
                    }) & setModalVisible(!modalVisible)
                  }
                />
                <Text>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5} style={styles.trash}>
                {hide ? (
                  <>
                    <AntDesign
                      name="checkcircle"
                      onPress={() => hideProject()}
                      size={32}
                      color="red"
                    />
                    <Text>Complete</Text>
                  </>
                ) : (
                  <>
                    <Feather
                      name="rotate-ccw"
                      onPress={() => hideProject()}
                      size={32}
                      color="green"
                    />
                    <Text>Activate</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalActions;

const styles = StyleSheet.create({
  pencil: {
    backgroundColor: 'aliceblue',
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
  },
  trash: {
    backgroundColor: 'aliceblue',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  handleIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
