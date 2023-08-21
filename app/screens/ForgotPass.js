//@flow
import React, { useState, createRef, useContext, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type { Node } from 'react';
import type {
  NavigationPropType,
  RoutePropType,
  LoginTypes
} from 'app/common/type';
import { ROUTE_NAMES } from 'app/common/routeNames';
import { AppContext } from 'app/common/constants';
type PropsType = {| ...OwnPropsType |};
type OwnPropsType = {|
  navigation: NavigationPropType<'LoginScreen'>,
  route: RoutePropType<'LoginScreen'>
|};

import auth from '@react-native-firebase/auth';
import { primaryColor, secondaryColor } from 'app/theme/Colors';
import { firebase } from '@react-native-firebase/firestore';

const ForgotPass = ({ navigation }: PropsType): Node => {
  const [userEmail, setUserEmail] = useState(null);
  const [userPassword, setUserPassword] = useState('');
  const [errortext, setErrortext] = useState('');
  const [animating, setAnimating] = useState(false);

  const passwordInputRef = createRef();

  useEffect(() => {
    if (animating) {
      firebase
        .auth()
        .sendPasswordResetEmail(userEmail)
        .then(() => {
          alert('Please check your email (spam folder) for reset link');
          navigation.navigate('LoginScreen');
        })
        .catch((error) => alert(error));
      setAnimating(false);
    }
  }, [animating]);

  const handleSendPasswordResetEmail = () => {
    if (!userEmail) return alert('Please enter your email');
    if (userEmail.endsWith('@frestonanalytics.com')) {
      // true if the address ends with @frestonanalytics.com
      setAnimating(true);
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
                source={require('app/assets/images/frestonlogo.png')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 10
                }}
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

            {/* <LinearGradient
              style={{
                height: 40,
                backgroundColor: 'black',
                marginVertical: 40,
                marginHorizontal: 30,
                borderRadius: 15,
              }}
              colors={['#e74d88', '#b03761']}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}>
              <TouchableOpacity onPress={handleSendPasswordResetEmail}>
                {animating && (
                  <ActivityIndicator
                    animating={animating}
                    color="#FFFFFF"
                    size="large"
                    style={styles.activityIndicator}
                  />
                )}
                {!animating && (
                  <Text style={styles.buttonTextStyle}>Send Reset Password</Text>
                )}
              </TouchableOpacity>
            </LinearGradient> */}

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
              <TouchableOpacity onPress={handleSendPasswordResetEmail}>
                {animating && (
                  <ActivityIndicator
                    animating={animating}
                    color='#FFFFFF'
                    size='large'
                    style={styles.activityIndicator}
                  />
                )}
                {!animating && (
                  <Text style={styles.buttonTextStyle}>Send Reset Email</Text>
                )}
              </TouchableOpacity>
            </LinearGradient>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ForgotPass;

const styles = StyleSheet.create({
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
  },
  activityIndicator: {
    alignItems: 'center',
    height: 40
  }
});
