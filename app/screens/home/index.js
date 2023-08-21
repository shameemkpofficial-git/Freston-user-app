/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Easing,
  Animated,
  Image,
  FlatList
} from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { optionStyle } from 'app/styles/OptionStyle';
import { black, secondaryColor, white } from 'app/theme/Colors';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { AppContext } from 'app/common/constants';
import LinearGradient from 'react-native-linear-gradient';
import AlertModal from 'app/components/AlertModel';

export const Home = ({ navigation }) => {
  const { userDetails, setUserDetails } = useContext(AppContext);
  const [userData, setuserData] = useState({});
  const [show, setShow] = useState(false);
  const [erroemsg, setErroemsg] = useState();

  const changeModel = (data) => {
    setShow(!show);
  };
  // useEffect(() => {
  //   const unsubscribe = firestore()
  //     .collection('Users')
  //     .doc(auth().currentUser?.uid)
  //     .onSnapshot(snapshot =>
  //       setUserDetails({
  //         name: snapshot.data()?.name,
  //         department: snapshot.data()?.department,
  //         designation: snapshot.data()?.designation,
  //         joiningDate: snapshot.data()?.joiningDate,
  //         mail: snapshot.data()?.email,
  //         birthdayDate: snapshot.data()?.birthdayDate,
  //       }),
  //     );
  //   return unsubscribe;
  // }, []);

  // React.useEffect(() => {
  //   getCalendarDate();
  // }, []);

  // const getCalendarDate = () => {
  //   fetch('https://www.gov.uk/bank-holidays.json')
  //     .then((response) => {
  //       console.log(response, 'vbgfdfdsfsdfsads');
  //       return response.json();
  //     })
  //     .then((responseJson) => {
  //       console.log(
  //         JSON.stringify(responseJson['england-and-wales']),
  //         'responseJson'
  //       );
  //       let befeDate = responseJson['england-and-wales'];
  //       // console.log(befeDate.events, 'hjghgfgtredtre');
  //       // setManualCalendar(befeDate.events);
  //     })
  //     .catch((error) => {
  //       console.log(error, 'errrrrrr');
  //     });
  // };
  const DATA = [
    {
      id: '1',
      title: 'Mail',
      bgColor: '#d5ebff',
      icon: require('app/assets/images/mail.png'),
      screen: 'Apply'
    },
    {
      id: '2',
      title: 'Bug Report',
      bgColor: '#d8fadf',
      icon: require('app/assets/images/bug.png'),
      screen: 'HomeScreen'
    },
    {
      id: '3',
      title: 'Calender',
      bgColor: '#e2d7fb',
      icon: require('app/assets/images/cal.png'),
      screen: 'calender'
    }
  ];
  const validateData = () => {
    const schema = {
      name: (value) => value !== '',
      email: (value) => value !== '',
      designation: (value) => value !== '',
      department: (value) => value !== '',
      joiningDate: (value) => value !== '',
      birthdayDate: (value) => value !== ''
    };
    const validate = (object, shema) =>
      Object.keys(shema)
        .filter((key) => !shema[key](object[key]))
        .map((key) => new Error(`${key}`));
    const errors = validate(userDetails, schema);
    if (errors.length > 0) {
      let errorItems = [];
      for (const { message } of errors) {
        errorItems.push(message);
      }
      setErroemsg(errorItems);
      changeModel();
    } else {
      // setUserDetails({
      //   name: userData?.name,
      //   email: userData?.email,
      //   department: userData?.department,
      //   designation: userData?.designation,
      //   joiningDate: userData?.joiningDate,
      // });
      navigation.navigate('Apply');
    }
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1, backgroundColor: white }}>
      <LinearGradient
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: 200,
          backgroundColor: black,
          marginVertical: 40,
          marginHorizontal: 30,
          borderRadius: 15
        }}
        colors={['black', '#232738']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginTop: 20
          }}
        >
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              color: '#fff',
              fontSize: 12
            }}
          >
            User ID Card
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProfileScreen');
            }}
          >
            <Image
              source={require('app/assets/images/id.png')}
              style={{ height: 30, width: 30 }}
              resizeMethod='resize'
            />
          </TouchableOpacity>
        </View>
        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            color: '#fff',
            fontSize: 22,
            marginLeft: 20,
            marginTop: 30
          }}
        >
          {userDetails.name?.toUpperCase()}
        </Text>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginTop: 30,
            height: 40
          }}
        >
          <View style={{ height: 40, width: '50%' }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 12
              }}
            >
              Department
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 15
              }}
            >
              {userDetails.department}
            </Text>
          </View>
          <View style={{ height: 40, width: '50%' }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 12
              }}
            >
              Mail-ID
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 9,
                marginTop: 5
              }}
            >
              {userDetails.mail}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <View style={{ alignSelf: 'center' }}>
        <FlatList
          //
          numColumns={3}
          data={DATA}
          key={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                item.screen === 'Apply'
                  ? validateData()
                  : navigation.navigate(item.screen)
              }
              style={{
                height: 100,
                width: 100,
                backgroundColor: item.bgColor,
                borderRadius: 10,
                justifyContent: 'space-evenly',
                alignItems: 'center',
                marginHorizontal: 10
              }}
            >
              <Image
                resizeMode='contain'
                source={item.icon}
                style={{
                  height: 30,
                  width: 35,
                  alignSelf: 'center'
                }}
              />
              <Text
                style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
        {show === true && (
          <AlertModal
            show={show}
            data={erroemsg}
            changeModel={changeModel}
            navigation={navigation}
          />
        )}
      </View>
    </View>
  );
};
