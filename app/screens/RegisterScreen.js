import React, { useState, createRef, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Button,
  Platform
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import DropDownPicker from 'react-native-dropdown-picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import { secondaryColor } from 'app/theme/Colors';

const RegisterScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userdepartment, setUserDepartment] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errortext, setErrortext] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [animating, setAnimating] = useState(false);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [userDesignation, setUserDesignation] = useState(null);
  const [designationList, setDesignationList] = useState([
    { label: 'Developer', value: 'Developer' },
    { label: 'Tester', value: 'Tester' },
    { label: 'Data', value: 'Tata' },
    { label: 'Hr', value: 'Hr' },
    { label: 'Designer', value: 'Designer' },
    { label: 'Admin', value: 'Admin' },
    { label: 'Accountant', value: 'Accountant' },
    { label: 'CEO', value: 'CEO' }
  ]);
  const [joiningDate, setJoiningDate] = useState(null);

  const [mydate, setDate] = useState(new Date());
  const [displaymode, setMode] = useState('date');
  const [isDisplayDate, setShow] = useState(false);

  const emailInputRef = createRef();
  const userNameRef = createRef();
  const passwordInputRef = createRef();
  const designationInputRef = createRef();
  const departmentInputRef = createRef();

  const usersCollection = firestore().collection('Users');

  useEffect(() => {
    if (dropdownVisible) {
      Keyboard.dismiss();
    }
  }, [dropdownVisible]);

  const onChangeDate = (e, selectedDate) => {
    var newStringDate = selectedDate?.toISOString().substring(0, 10);

    setShow(false);
    selectedDate && setDate(selectedDate);
    selectedDate && setJoiningDate(newStringDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const displayDatepicker = () => {
    showMode('date');
  };

  const handleSubmitButton = () => {
    setErrortext('');
    if (!userName) return alert('Please fill all the field');
    if (!userEmail) return alert('Please fill all the field');
    if (!userPassword) return alert('Please enter the field');

    if (userEmail.endsWith('@frestonanalytics.com')) {
      // true if the address ends with @frestonanalytics.com
      setAnimating(true);
      auth()
        .createUserWithEmailAndPassword(userEmail, userPassword)
        .then((user) => {
          console.log('Registration Successful. Please Login to proceed');
          console.log(user);
          if (user) {
            firestore()
              .collection('Users')
              .doc(user.user.uid)
              .set({
                name: userName,
                email: userEmail,
                designation: '',
                department: '',
                joiningDate: '',
                birthdayDate: ''
              })
              .then(() => {
                console.log('User added!');
              });
            auth()
              .currentUser.updateProfile({
                displayName: userName
              })
              .then(() => {
                setAnimating(false);
                navigation.replace('Main');
              })
              .catch((error) => {
                alert(error);
                console.error(error);
              });
          }
        })
        .catch((error) => {
          setAnimating(false);
          console.log(error);
          if (error.code === 'auth/email-already-in-use') {
            setErrortext('That email address is already in use!');
          } else {
            setErrortext(error.message);
          }
        });
    } else {
      alert('Please enter valid freston email address');
    }
  };

  return (
    <SafeAreaView style={styles.mainBody}>
      <ScrollView
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center'
        }}
      >
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('app/assets/images/login.png')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 10
                }}
              />
              <Text
                style={{
                  fontSize: 18,
                  textAlign: 'center',
                  color: 'black',
                  marginBottom: 20,
                  fontWeight: '800'
                }}
              >
                User Register
              </Text>
            </View>
            <View style={styles.sectionStyle}>
              <TextInput
                selectionColor={'grey'}
                style={styles.inputStyle}
                onChangeText={(username) => setUserName(username)}
                placeholder='Enter Name' //12345
                placeholderTextColor='#8b9cb5'
                keyboardType='default'
                ref={userNameRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                underlineColorAndroid='#f000'
                returnKeyType='next'
              />
            </View>
            <View style={styles.sectionStyle}>
              <TextInput
                selectionColor={'grey'}
                style={styles.inputStyle}
                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                placeholder='Enter Email' //dummy@abc.com
                placeholderTextColor='#8b9cb5'
                autoCapitalize='none'
                keyboardType='email-address'
                returnKeyType='next'
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid='#f000'
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.sectionStyle}>
              <TextInput
                selectionColor={'grey'}
                style={styles.inputStyle}
                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                placeholder='Enter Password' //12345
                placeholderTextColor='#8b9cb5'
                keyboardType='default'
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid='#f000'
                returnKeyType='next'
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <LinearGradient
              style={{
                height: 40,
                backgroundColor: 'black',
                marginVertical: 40,
                marginHorizontal: 30,
                borderRadius: 15
              }}
              colors={['#e74d88', '#b03761']}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
            >
              <TouchableOpacity onPress={handleSubmitButton}>
                {animating && (
                  <ActivityIndicator
                    animating={animating}
                    color='#FFFFFF'
                    size='large'
                    style={styles.activityIndicator}
                  />
                )}
                {!animating && (
                  <Text style={styles.buttonTextStyle}>REGISTER</Text>
                )}
              </TouchableOpacity>
            </LinearGradient>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  activityIndicator: {
    alignItems: 'center',
    height: 40
  },
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignContent: 'center'
  },
  sectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10
  },
  buttonStyle: {
    backgroundColor: secondaryColor,
    borderWidth: 0,
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
    textAlign: 'center'
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#105492'
  },
  registerTextStyle: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10
  },
  errorTextStyle: {
    color: secondaryColor,
    textAlign: 'center',
    fontSize: 12
  }
});
