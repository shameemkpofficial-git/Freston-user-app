// @flow

import React, { createRef, useContext, useState } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { employeeIdLogin } from 'app/common/api';
import { AppContext, baseUrl } from 'app/common/constants';
import Header from 'app/components/Header';
import MainButton from 'app/components/main-button';
import { primaryColor, secondaryColor } from 'app/theme/Colors';

import type {
  LoginTypes,
  NavigationPropType,
  RoutePropType
} from 'app/common/type';
import type { Node } from 'react';

type PropsType = {| ...OwnPropsType |};
type OwnPropsType = {|
  navigation: NavigationPropType<'LoginScreen'>,
  route: RoutePropType<'LoginScreen'>
|};

import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const EmployeeLogin = ({ navigation }: PropsType): Node => {
  const [userEmployeeId, setUserEmployeeId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [loading, setLoading] = useState(false);

  const passwordInputRef = createRef();

  const storeData = async (response) => {
    const user = { empId: response?.empId, token: response?.token };
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      navigation.navigate('home');
    } catch (e) {
      // saving error
      setLoading(false);
      console.log('error', e);
    }
  };

  const handleSubmitPress = () => {
    if (!userEmployeeId) {
      alert('Please enter your employee id');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
    fetch(`${baseUrl}${employeeIdLogin}`, {
      body: JSON.stringify({
        confirmPassword: userPassword,
        empId: userEmployeeId
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response', response);
        if (response?.token) {
          console.log(response);
          storeData(response);
        } else {
          Alert.alert('Warning', 'Username / Password is incorrect');
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.mainBody}>
      <Header goBack headerText={'login Account'} />

      <ScrollView
        contentContainerStyle={{
          alignContent: 'center',
          flex: 1,
          justifyContent: 'center'
        }}
        keyboardShouldPersistTaps='handled'
      >
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('app/assets/images/frestonlogo.png')}
                style={{
                  height: 100,
                  margin: 10,
                  resizeMode: 'contain',
                  width: '50%'
                }}
              />
            </View>
            <View style={styles.sectionStyle}>
              <TextInput
                autoCapitalize='none'
                blurOnSubmit={false}
                keyboardType='email-address'
                onChangeText={(employeeId) => setUserEmployeeId(employeeId)}
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                placeholder='Enter Employee Id'
                placeholderTextColor='#8b9cb5'
                returnKeyType='next'
                selectionColor={'grey'}
                style={styles.inputStyle}
                underlineColorAndroid='#f000'
              />
            </View>
            <View style={styles.sectionStyle}>
              <TextInput
                blurOnSubmit={false}
                keyboardType='default'
                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                onSubmitEditing={Keyboard.dismiss}
                placeholder='Enter Password' // 12345
                placeholderTextColor='#8b9cb5'
                ref={passwordInputRef}
                returnKeyType='next'
                secureTextEntry
                selectionColor={'grey'}
                style={styles.inputStyle}
                underlineColorAndroid='#f000'
              />
            </View>
            {errorText != '' ? (
              <Text style={styles.errorTextStyle}> {errorText} </Text>
            ) : null}
            <MainButton
              loading={loading}
              name={'Login'}
              onPress={() => handleSubmitPress()}
            />
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: secondaryColor,
    borderColor: '#7DE24E',
    borderRadius: 30,
    borderWidth: 0,
    height: 40,
    marginBottom: 25,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 16,
    paddingVertical: 10,
    textAlign: 'center'
  },
  errorTextStyle: {
    color: secondaryColor,
    fontSize: 12,
    textAlign: 'center'
  },
  inputStyle: {
    borderColor: '#105492',
    borderRadius: 10,
    borderWidth: 1,
    color: 'black',
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15
  },
  mainBody: {
    alignContent: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center'
  },
  registerTextStyle: {
    alignSelf: 'center',
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center'
  },
  sectionStyle: {
    flexDirection: 'row',
    height: 40,
    margin: 10,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20
  }
});
