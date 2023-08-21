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

const UpdateProfileScreen = ({ navigation }) => {
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
  const [birthdayDate, setBirthdayDate] = useState(null);

  const [mydate, setDate] = useState(new Date());
  const [displaymode, setMode] = useState('date');
  const [isDisplayDate, setShow] = useState(false);

  const [myBirthdaydate, setMyBirthdayDate] = useState(new Date());
  const [birthdayDisplaymode, setBirthdayDisplayMode] = useState('date');
  const [isBirthdayDisplayDate, setBirthdayShow] = useState(false);

  const emailInputRef = createRef();
  const passwordInputRef = createRef();
  const designationInputRef = createRef();
  const departmentInputRef = createRef();

  const usersCollection = firestore().collection('Users');

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Users')
      .doc(auth().currentUser?.uid)
      .onSnapshot(
        (snapshot) =>
          setUserName(snapshot.data()?.name) &
          setJoiningDate(snapshot.data()?.joiningDate) &
          setUserDepartment(snapshot.data()?.department) &
          setUserDesignation(snapshot.data()?.designation) &
          setUserEmail(snapshot.data()?.email) &
          setBirthdayDate(snapshot.data()?.birthdayDate)
      );
    return unsubscribe;
  }, []);

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

  const onChangeBirthdayDate = (e, selectedDate) => {
    var newStringDate = selectedDate?.toISOString().substring(0, 10);
    setBirthdayShow(false);
    selectedDate && setMyBirthdayDate(selectedDate);
    selectedDate && setBirthdayDate(newStringDate);
  };

  const showBirthdayMode = (currentMode) => {
    setBirthdayShow(true);
    setBirthdayDisplayMode(currentMode);
  };

  const displayBirthdayDatepicker = () => {
    showBirthdayMode('date');
  };

  const handleSubmitButton = () => {
    setErrortext('');
    setAnimating(true);
    firestore()
      .collection('Users')
      .doc(auth().currentUser?.uid)
      .update({
        designation: userDesignation ? userDesignation : '',
        department: userdepartment ? userdepartment : '',
        joiningDate: joiningDate ? joiningDate : '',
        birthdayDate: birthdayDate ? birthdayDate : ''
      })
      .then(() => {
        console.log('Succesfully Updated!') & navigation.goBack();
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        nestedScrollEnabled
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center'
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../assets/images/login.png')}
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
              marginBottom: 20
            }}
          >
            Update Profile
          </Text>
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.sectionStyle}>
            <Text style={styles.userName}> {userName}</Text>
          </View>
          <View style={styles.sectionStyle}>
            <Text style={styles.userName}> {userEmail}</Text>
          </View>
          <TouchableOpacity
            onPress={displayDatepicker}
            style={[styles.sectionStyle]}
          >
            <View
              style={[
                styles.inputStyle,
                { flexDirection: 'row', alignItems: 'center' }
              ]}
            >
              <Text style={{ color: '#8b9cb5' }}>Joined on </Text>
              {joiningDate && (
                <Text style={{ color: 'black' }}> {joiningDate}</Text>
              )}
            </View>
            {isDisplayDate && (
              <DateTimePicker
                testID='dateTimePicker'
                value={mydate}
                mode={displaymode}
                is24Hour={true}
                display='default'
                onChange={onChangeDate}
                maximumDate={new Date()}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={displayBirthdayDatepicker}
            style={[styles.sectionStyle]}
          >
            <View
              style={[
                styles.inputStyle,
                { flexDirection: 'row', alignItems: 'center' }
              ]}
            >
              <Text style={{ color: '#8b9cb5' }}>Birthday on </Text>
              {birthdayDate && (
                <Text style={{ color: 'black' }}> {birthdayDate}</Text>
              )}
            </View>
            {isBirthdayDisplayDate && (
              <DateTimePicker
                testID='dateTimePicker'
                value={myBirthdaydate}
                mode={birthdayDisplaymode}
                is24Hour={true}
                display='default'
                onChange={onChangeBirthdayDate}
                maximumDate={new Date()}
              />
            )}
          </TouchableOpacity>

          <View style={[styles.dropDownContainer]}>
            <DropDownPicker
              style={{
                backgroundColor: 'white',
                borderColor: '#b55ee0',
                borderRadius: 25
              }}
              placeholder={'Select designation'}
              labelStyle={{ color: 'black' }}
              placeholderStyle={{ color: '#8b9cb5' }}
              open={dropdownVisible}
              value={userDesignation}
              items={designationList}
              setOpen={setDropdownVisible}
              setValue={setUserDesignation}
              setItems={setDesignationList}
              listMode='SCROLLVIEW'
            />
          </View>
          <View style={styles.sectionStyle}>
            <TextInput
              style={styles.inputStyle}
              value={userdepartment}
              onChangeText={(userDepartment) =>
                setUserDepartment(userDepartment)
              }
              underlineColorAndroid='#f000'
              placeholder='Enter department'
              placeholderTextColor='#8b9cb5'
              ref={departmentInputRef}
              returnKeyType='next'
              onSubmitEditing={() =>
                departmentInputRef.current && departmentInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              flex: 1
            }}
          ></View>

          {errortext != '' ? (
            <Text style={styles.errorTextStyle}> {errortext} </Text>
          ) : null}

          <TouchableOpacity
            style={[{ flex: 1 }, animating && { opacity: 0.4 }]}
            activeOpacity={0.5}
            disabled={animating}
            onPress={handleSubmitButton}
          >
            <LinearGradient
              colors={['#764ebf', '#b55ee0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0.5 }}
              style={{
                borderWidth: 0,
                color: '#FFFFFF',
                height: 40,
                alignItems: 'center',
                borderRadius: 30,
                marginLeft: 35,
                marginRight: 35,
                marginTop: 20,
                marginBottom: 20
              }}
            >
              {animating && (
                <ActivityIndicator
                  animating={animating}
                  color='#FFFFFF'
                  size='large'
                  style={styles.activityIndicator}
                />
              )}
              {!animating && <Text style={styles.buttonTextStyle}>Update</Text>}
            </LinearGradient>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};
export default UpdateProfileScreen;

const styles = StyleSheet.create({
  sectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10
  },
  dropDownContainer: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#b55ee0',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#b55ee0',
    height: 50
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14
  },
  activityIndicator: {
    alignItems: 'center',
    height: 40
  },
  userName: {
    flex: 1,
    color: '#8b9cb5',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#b55ee0',
    height: 50,
    textAlignVertical: 'center'
  }
});
