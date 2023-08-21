import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ListItem, Text, Divider} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ModalActions from './ModalActions';

const CustomIssueListItem = ({info, navigation, id, hide}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const IterateProjectFirstName = projName => {
    let name = projName;
    let nameLength = name.length;
    let makeNameShort = name?.slice(0, 1);
    return makeNameShort;
  };

  console.log('Tasks',info)

  return (
    <>
      <TouchableOpacity
        // onPress={()=>setModalVisible(true)}
          onPress={()=>navigation.navigate('IssueDetailScreen',{taskname: info?.taskname})}
        style={{
          width: '95%',
          height: 150,
          flexDirection: 'row',
          marginVertical: 5,
          borderColor: '#bababa',
          borderRadius: 10,
          elevation: 5,
          backgroundColor: '#fff',
          padding: 10,
        }}>
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
              {IterateProjectFirstName(info?.taskname)}
            </Text>
          </View>
        </View>

        <View style={{width: '78%', paddingLeft: 20}}>
          <View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 17,
                  textTransform: 'capitalize',
                }}>
                {info?.taskname}
              </Text>
              {/* <View style={{ backgroundColor:'green',marginVertical:3,paddingVertical:3,paddingHorizontal:8,borderRadius:10,alignItems:'center'}}><Text style={{fontSize:10,color:'#FFF'}}>In progress</Text></View> */}
            </View>
            <Text
              style={{
                fontWeight: '100',
                color: 'grey',
                fontSize: 12,
              }}>
              {info?.createdDateFormated} -{' '}
              {info?.createdUserName?.toUpperCase()}
            </Text>

            <Text
              style={{
                fontWeight: '100',
                color: 'grey',
                fontSize: 12,
              }}>
              Assigned to {info?.assignedUserName?.toUpperCase()}
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontWeight: '100',
                  color: '#737322',
                  fontSize: 12,
                  backgroundColor: '#fafa00',
                  width: 70,
                  height: 18,
                  textAlign: 'center',
                  borderRadius: 25,
                  marginVertical: 10,
                }}>
                Bug
              </Text>
              {/* <Text
                        style={{
                          fontWeight: '100',
                          color: 'white',
                          fontSize: 12,
                          backgroundColor:'#fa8866',
                          width:70,
                          height:18,
                          textAlign:'center',
                          borderRadius:25,
                          marginVertical:10,
                        }}>
                       Doing
                      </Text> */}
            </View>
            <Text style={{fontSize: 11, color: 'green', fontWeight: 'bold'}}>
              In Progress
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

export default CustomIssueListItem;

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
