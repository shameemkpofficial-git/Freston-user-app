import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomIssueListItem from '../components/CustomIssueListItem';
import auth from '@react-native-firebase/auth';
import { Text } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Feather from 'react-native-vector-icons/dist/Feather';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import Foundation from 'react-native-vector-icons/dist/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { colorComb } from 'app/common/constants';

import LinearGradient from 'react-native-linear-gradient';

import { AppContext } from 'app/common/constants';
const ProjectDetailScreen = ({ navigation, route }) => {
  const [transactions, setTransactions] = useState([]);
  const [Projects, setProjects] = useState([]);
  const [filter, setFilter] = useState([]);
  const [shortName, setShortName] = useState('AS');
  const [selectedtab, setSelectedTab] = useState('IP');
  const [loading, setLoading] = useState(false);
  // const [refreshing, setRefreshing] = React.useState(false);

  const projectId = route?.params?.projectid;
  const { userDetails, setUserDetails } = useContext(AppContext);
  console.log('proid', projectId);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setLoading(true);
    wait(2000).then(() => setLoading(false));
  }, []);

  useEffect(() => {
    const unsubscribe =
      selectedtab === 'IP'
        ? firestore()
            .collection('Task')
            .where('completed', '==', false)
            .where('projectid', '==', projectId)
            .onSnapshot((snapshot) => {
              setProjects(
                snapshot.docs.map((doc) => ({
                  id: doc.id,
                  data: doc.data()
                }))
              );
            })
        : firestore()
            .collection('Task')
            .where('completed', '==', true)
            .onSnapshot((snapshot) => {
              setProjects(
                snapshot.docs.map((doc) => ({
                  id: doc.id,
                  data: doc.data()
                }))
              );
            });
    return unsubscribe;
  }, [selectedtab]);

  useEffect(() => {
    if (Projects) {
      let projCopy = Projects;
      projCopy?.map((proj) => {
        var createdDate = FormatDate(proj?.data?.createdDate?.toDate());

        const color = colorComb[Math.floor(Math?.random() * colorComb?.length)];
        proj.data['color1'] = color.color1;
        proj.data['color2'] = color.color2;
        proj.data['createdDateFormated'] = createdDate;
      });
      setFilter(projCopy);
    }
  }, [Projects]);

  useEffect(() => {
    if (loading) setLoading(false);
  }, [filter]);

  useEffect(() => {
    let name = auth().currentUser.displayName;
    let nameLength = name.length;
    let makeNameShort = name?.slice(0, 1);
    setShortName(makeNameShort);
  }, []);

  function FormatDate(date) {
    //convert time stamp to 22 November 2022 format
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, toMonthName(month), year].join(' ');
  }

  function toMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString('en-US', {
      month: 'long'
    });
  }

  const onPressTab = (tabName) => {
    setLoading(true);
    setSelectedTab(tabName);
  };

  return (
    <>
      <SafeAreaView
        style={{
          backgroundColor: '#fff',
          flex: 1,
          paddingHorizontal: 20,
          alignItems: 'center',
          paddingVertical: 5
        }}
      >
        <View
          style={{
            width: '100%',
            height: 50,
            flexDirection: 'row',
            marginVertical: 20,
            borderColor: '#bababa',
            borderRadius: 10,
            elevation: 5,
            backgroundColor: '#fff'
          }}
        >
          <TouchableOpacity
            onPress={() => onPressTab('IP')}
            style={{
              width: '50%',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <LinearGradient
              colors={
                selectedtab === 'IP' ? ['#764ebf', '#b55ee0'] : ['#fff', '#fff']
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0.5 }}
              style={{
                height: '80%',
                width: '90%',
                backgroundColor: 'yellow',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text
                style={{
                  fontWeight: '700',
                  color: selectedtab === 'IP' ? 'white' : 'black'
                }}
              >
                In Progress
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onPressTab('C')}
            style={{
              width: '50%',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <LinearGradient
              colors={
                selectedtab === 'C' ? ['#764ebf', '#b55ee0'] : ['#fff', '#fff']
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0.5 }}
              style={{
                height: '80%',
                width: '90%',
                backgroundColor: 'yellow',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text
                style={{
                  fontWeight: '700',
                  color: selectedtab === 'C' ? 'white' : 'black'
                }}
              >
                Completed
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* starting of proj list */}
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }
          style={{ width: '100%' }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ height: '100%', width: '100%', alignItems: 'center' }}>
            {!loading &&
              filter?.map((info, index) => {
                return filter?.length > 0 ? (
                  <CustomIssueListItem
                    key={index}
                    info={info.data}
                    navigation={navigation}
                    id={info.id}
                  />
                ) : (
                  <Text>No Data</Text>
                );
              })}
          </View>
        </ScrollView>
      </SafeAreaView>
      <View style={styles.addButton}>
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() =>
            navigation.navigate('AddIssuesScreen', { projectId: projectId })
          }
          activeOpacity={0.5}
        >
          <AntDesign name='plus' size={24} color='white' />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ProjectDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    flex: 1
  },
  containerNull: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center'
  },
  plusButton: {
    backgroundColor: '#535F93',
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24
  },
  fullName: {
    flexDirection: 'row',
    margin: 15,
    height: 80,
    alignItems: 'center'
  }
});
