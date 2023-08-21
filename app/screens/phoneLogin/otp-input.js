import React from 'react';
import { StyleSheet } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';

export default function OtpInput(props) {
  const { setCode, navigation, confirmCode } = props;
  return (
    <OTPInputView
      pinCount={6}
      style={styles.otpInputContainer}
      codeInputFieldStyle={styles.borderStyleBase}
      codeInputHighlightStyle={styles.underlineStyleHighLighted}
      onCodeFilled={(code) => {
        setCode(code);
        console.log(`Entered OTP is ${code}`);
        confirmCode(code);
      }}
    />
  );
}

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 45,
    height: 45,
    borderRadius: 35,
    backgroundColor: '#e74d88'
  },

  underlineStyleHighLighted: {
    borderColor: '#fff',
    backgroundColor: '#E8E8E8'
  },
  otpInputContainer: { width: '80%', height: 50 }
});
