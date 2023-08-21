import React, { useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import OtpInput from 'app/screens/phoneLogin/otp-input';
import MainButton from 'app/components/main-button';
import Toast from 'react-native-simple-toast';
import { IconPack } from 'app/components/iconPack';
import Fonts from 'app/theme/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppContext from 'app/common/constants';

export const Otp = (props) => {
  const {
    confirm,
    navigation,
    setConfirm,
    loading,
    setLoading,
    signInWithPhoneNumber,
    setCountry,
    country,
    userToken,
    emplId
  } = props;

  const [code, setCode] = React.useState('');

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCountry(country);
  };

  const storeData = async () => {
    const user = { empId: emplId, token: userToken };
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      console.log('data stored', user);
      navigation.navigate('home');
    } catch (error) {
      console.log('error in storing data : ', error);
    }
  };

  const confirmCode = async (otp) => {
    try {
      setLoading(true);
      await confirm.confirm(otp);
      console.log(confirm.confirm(otp));
      Toast.show('Signed successfully');
      storeData();
    } catch (error) {
      console.log(error);
      setLoading(false);
      const { code } = error;
      if (code == 'auth/invalid-verification-code') {
        Toast.show('Invalid OTP');
        return;
      }
      if (code == 'auth/session-expired') {
        Toast.show('Otp Expired , Resend New Otp');
        return;
      }
      if (code == 'auth/too-many-requests') {
        Toast.show('You have exceeded OTP limit, try again later');
        return;
      }
      Toast.show('Something Wrong');
    }
  };
  return (
    <SafeAreaView style={styles.mainBody}>
      <TouchableOpacity
        style={styles.headerBackBtn}
        onPress={() => setConfirm(null)}
      >
        <IconPack
          pack='Ionicons'
          iconName='chevron-back-sharp'
          iconSize={30}
          iconColor='#0E5F9D'
        />
      </TouchableOpacity>
      <ScrollView
        keyboardShouldPersistTaps='handled'
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View>
          <KeyboardAvoidingView enabled>
            <View style={styles.subContainer}>
              <View style={styles.verifyPhoneContainer}>
                <Text style={styles.PhoneVerificTxt}>
                  Verify your Phone number
                </Text>
                <Text style={styles.otpEnterTxt}>Enter your OTP code here</Text>
              </View>
              <OtpInput setCode={setCode} confirmCode={confirmCode} />

              <View style={styles.resendCodeContainer}>
                <Text style={styles.codeRemember}>
                  Didn't you receive any code?
                </Text>
                <TouchableOpacity onPress={() => signInWithPhoneNumber()}>
                  <Text style={styles.codeResendTxt}>RESEND NEW CODE</Text>
                </TouchableOpacity>
              </View>
            </View>

            <MainButton
              name={'Continue'}
              onPress={() => confirmCode(code)}
              setLoading={setLoading}
              loading={loading}
            />
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignContent: 'center'
  },
  headerBackBtn: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  verifyPhoneContainer: {
    height: 80,
    width: 200,
    backgroundColor: '#fff',
    marginBottom: 20
  },
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  PhoneVerificTxt: {
    fontSize: 25,
    textAlign: 'center',
    color: 'black',
    fontFamily: Fonts.medium
  },
  otpEnterTxt: {
    fontSize: 14,
    textAlign: 'center',
    color: '#A9A9A9',
    fontFamily: Fonts.medium
  },
  resendCodeContainer: {
    height: 60,
    backgroundColor: '#fff',
    width: '80%',
    marginTop: 10
  },
  codeRemember: {
    fontSize: 14,
    textAlign: 'center',
    color: '#A9A9A9',
    fontFamily: Fonts.medium
  },
  codeResendTxt: {
    textAlign: 'center',
    color: '#e74d88',
    marginTop: 8,
    fontFamily: Fonts.medium
  },
  subContainer: { alignItems: 'center' }
});
