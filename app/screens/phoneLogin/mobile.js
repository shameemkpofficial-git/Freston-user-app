import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity
} from 'react-native';
import React from 'react';
import Toast from 'react-native-simple-toast';
import MobileInput from 'app/screens/phoneLogin/mobile-input';
import MainButton from 'app/components/main-button';
import Fonts from 'app/theme/fonts';

export const Mobile = (props) => {
  const {
    confirm,
    setConfirm,
    loading,
    setLoading,
    signInWithPhoneNumber,
    setCountry,
    country,
    phoneNumber,
    setPhoneNumber,
    navigation,
    verify
  } = props;

  return (
    <SafeAreaView style={styles.mainBody}>
      <ScrollView
        keyboardShouldPersistTaps='always'
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View>
          <KeyboardAvoidingView enabled>
            <View style={styles.frestonlogoContainer}>
              <Image
                source={require('app/assets/images/frestonlogo.png')}
                // eslint-disable-next-line react-native/no-inline-styles
                style={styles.frestonLogo}
              />
            </View>
            <MobileInput
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              setCountry={setCountry}
              country={country}
            />
            <MainButton
              name={'Continue'}
              loading={loading}
              setLoading={setLoading}
              onPress={() => verify()}
            />
            <TouchableOpacity
              style={styles.employeeLoginBtnContainer}
              onPress={() => navigation.navigate('employeeLogin')}
            >
              <Text style={styles.employeeLoginText}>
                Login with Employee ID
              </Text>
            </TouchableOpacity>
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
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  frestonlogoContainer: {
    alignItems: 'center'
  },
  frestonLogo: {
    width: '50%',
    height: 100,
    resizeMode: 'contain',
    margin: 10
  },
  employeeLoginText: {
    textAlign: 'center',
    color: '#0E5F9D',
    fontFamily: Fonts.medium,
    fontSize: 13
  },
  employeeLoginBtnContainer: {
    marginTop: 15
  },
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  }
});
