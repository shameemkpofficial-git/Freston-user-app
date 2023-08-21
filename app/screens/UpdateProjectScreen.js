import {ActivityIndicator, StatusBar} from 'react-native';

import React, {useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, View, KeyboardAvoidingView, TextInput,TouchableOpacity} from 'react-native';
import {Text, Button} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';

const UpdateProjectScreen = ({route, navigation}) => {
  const {itemId} = route?.params;
  const [submitLoading, setSubmitLoading] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [animating, setAnimating] = useState(false);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [projectStatus, setProjectStatus] = useState(null);
  const [statusList, setStatusList] = useState([
    {label: 'Completed', value: true},
    {label: 'Not Completed', value: false},
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Update Project',
    });
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Projects')
      .doc(itemId)
      .onSnapshot(snapshot => {
        setProjectName(snapshot.data()?.projectName) &
        setProjectStatus(snapshot.data()?.hide)
      });
    return unsubscribe;
  }, []);

  const updateProject = () => {
    setAnimating(true)
    if (projectName) {
      setSubmitLoading(true);
      firestore()
        .collection('Projects')
        .doc(itemId)
        .update({
          projectName: projectName,
          hide: projectStatus
        })
        .then(() => clearInputFields())
        .catch(error => alert(error.message));
    } else {
      setAnimating(false)
      setSubmitLoading(false);
      alert('All fields are mandatory');
    }
  };

  const clearInputFields = () => {
    alert('Updated Successfully');
    setProjectName('');
    navigation.goBack();
    setSubmitLoading(false);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.inputContainer}>
        {/* <TextInput
          style={styles.input}
          placeholder="Edit Project Name"
          value={projectName}
          defaultValue={transactions.projectName}
          onChangeText={text => setProjectName(text)}
        /> */}

          <View style={styles.sectionStyle}>
              <TextInput
                selectionColor={'grey'}
                style={styles.inputStyle}
                onChangeText={text => setProjectName(text)}
                placeholder="Enter Project Name" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
                defaultValue={projectName}
              />
            </View>

            <View style={[styles.dropDownContainer]}>
            <DropDownPicker
              style={styles.inputStyle}
              placeholder={'Select Status'}
              labelStyle={{color: 'black'}}
              placeholderStyle={{color: '#8b9cb5'}}
              open={dropdownVisible}
              value={projectStatus}
              items={statusList}
              setOpen={setDropdownVisible}
              setValue={setProjectStatus}
              setItems={setStatusList}
              listMode="SCROLLVIEW"
            />
          </View>

          <TouchableOpacity
            style={[{flex:1}, animating && {opacity: 0.4}]}
            activeOpacity={0.5}
            disabled={animating}
            onPress={updateProject}>
                  <LinearGradient
              colors={
               ['#764ebf', '#b55ee0'] 
              }
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0.5}}
              style={{
                borderWidth: 0,
                color: '#FFFFFF',
                height: 40,
                alignItems: 'center',
                borderRadius: 30,
                marginLeft: 35,
                marginRight: 35,
                marginTop: 20,
                marginBottom: 20,
                justifyContent:'center'
              }}>
            {animating && (
              <ActivityIndicator
                animating={animating}
                color="#FFFFFF"
                size="large"
                style={styles.activityIndicator}
              />

            )}
            {!animating && <Text style={styles.buttonTextStyle}>Update</Text>}
            </LinearGradient>
          </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default UpdateProjectScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  inputContainer: {
    width: 300,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  button: {
    width: 300,
    marginTop: 10,
  },
  sectionStyle: {
    flexDirection: 'row',
    height: 50,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#105492',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 40,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  dropDownContainer: {
    flexDirection: 'row',
    height: 40,
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
});
