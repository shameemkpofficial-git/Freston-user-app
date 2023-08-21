import React, {useEffect, useLayoutEffect, useState} from 'react'
import {ScrollView, StyleSheet, View,TouchableOpacity} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import CustomProjectsListItem from '../components/CustomProjectsListItem';
import auth from '@react-native-firebase/auth';
import {Text} from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import Feather from 'react-native-vector-icons/dist/Feather'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import Foundation from 'react-native-vector-icons/dist/Foundation'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'

const ArchieveScreen = ({navigation}) => {
  
  const [transactions, setTransactions] = useState([])
  const [Projects,setProjects] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Archieve Screen',
    })
  }, [])

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Projects')
      .where("hide", '==', true)
      .where("email","==",auth().currentUser.email)
      .onSnapshot((snapshot) =>{
        setProjects(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )}
      )
    return unsubscribe
  }, [])

  return (
    <>
      {Projects?.length > 0 ? (
        <SafeAreaView style={styles.container}>
          <ScrollView >
            {Projects?.map((info) => (
              <View key={info.id}>
                <CustomProjectsListItem
                  info={info.data}
                  navigation={navigation}
                  id={info.id}
                  hide={false}
                />
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      ) : (
        <View style={styles.containerNull}>
          <FontAwesome5 name='list-alt' size={24} color='#EF8A76' />
          <Text h4 style={{color: '#4A2D5D'}}>
            No Hidden Projects
          </Text>
        </View>
      )}
    </>
  )
}

export default ArchieveScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    flex:1
  },
  containerNull: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
