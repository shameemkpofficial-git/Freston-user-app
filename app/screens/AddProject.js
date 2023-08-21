import {StatusBar, TouchableHighlight} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, View, KeyboardAvoidingView, TextInput} from 'react-native';
import {Text, Button} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const AddProjectScreen = ({navigation}) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [hide, setHide] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add Project',
    });
  }, [navigation]);
  const [projectName, setProjectName] = useState('');

  const createProject = () => {
    if (projectName && auth()) {
      setSubmitLoading(true);
      firestore()
        .collection('Projects')
        .add({
          email: auth().currentUser.email,
          createdUser: auth().currentUser?.displayName,
          createdUserId: auth().currentUser?.uid,
          projectName: projectName,
          hide: hide,
        })
        .then(() => clearInputFields())
        .catch(error => alert(error.message));
    } else {
      alert('All fields are mandatory');
      setSubmitLoading(false);
    }
  };

  const clearInputFields = () => {
    alert('Created Successfully');
    navigation.navigate('HomeScreen');
    setSubmitLoading(false);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Project Name"
          placeholderTextColor={'white'}
          value={projectName}
          onChangeText={text => setProjectName(text)}
        />

        <Button
          containerStyle={styles.button}
          title="Add"
          onPress={createProject}
          loading={submitLoading}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddProjectScreen;

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
    height: 250,
    borderRadius: 15,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    borderColor: 'white',
    borderBottomWidth: 1,
    marginBottom: 20,
    color: 'white',
  },
  button: {
    width: 100,
    marginTop: 10,
    backgroundColor: 'green',
  },
});
