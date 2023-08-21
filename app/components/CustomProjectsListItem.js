import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ListItem, Text, Divider} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ModalActions from './ModalActions';

const CustomProjectsListItem = ({info, navigation, id, hide}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const IterateProjectFirstName = projName => {
    let name = projName;
    let nameLength = name.length;
    let makeNameShort = name?.slice(0, 1);
    return makeNameShort;
  };

  return (
    <>
      <TouchableOpacity
      // onPress={()=>setModalVisible(true)}
      onPress={()=>navigation.navigate('ProjectDetailScreen',{projectid:id})}
                  style={{
                    width: '95%',
                    height: 90,
                    flexDirection: 'row',
                    marginVertical: 5,
                    borderColor: '#bababa',
                    borderRadius: 10,
                    elevation: 5,
                    backgroundColor: '#fff',
                    padding: 10,
                  }}>
                    <MaterialIcons onPress={()=>navigation.navigate('UpdateProjectScreen',{itemId: id})} name='edit' size={20} style={{position:'absolute',right:0,margin:10}} />
                  <View style={{width: '22%'}}>
                    <View
                      style={{
                        height: 70,
                        width: 70,
                        backgroundColor: info.color1,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: info.color2,
                          fontWeight: 'bold',
                          fontSize: 30,
                          textTransform: 'capitalize',
                        }}>
                        {IterateProjectFirstName(info?.projectName)}
                      </Text>
                    </View>
                  </View>

                  <View style={{width: '78%', paddingHorizontal: 20}}>
                    <View>
                      <Text style={{fontWeight: 'bold', fontSize: 17 , textTransform: 'capitalize'}}>
                        {info?.projectName}
                      </Text>
                      <Text
                        style={{
                          fontWeight: '100',
                          color: 'grey',
                          fontSize: 12,
                        }}>
                        {info?.createdDateFormated} - {info?.createdUser?.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
      <ModalActions
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={navigation}
        id={id}
        hide={hide}
      />
    </>
  );
};

export default CustomProjectsListItem;

const styles = StyleSheet.create({
  left: {
    backgroundColor: '#533461',
    borderRadius: 8,
    padding: 10,
  },

  income: {
    backgroundColor: '#61ACB8',
    borderRadius: 8,
    padding: 10,
  },
  right: {
    fontWeight: 'bold',
    color: 'grey',
  },
  rightIncome: {
    fontWeight: 'bold',
    color: 'green',
  },
});
