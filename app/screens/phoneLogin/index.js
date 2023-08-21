import React, { useState } from 'react';
import Toast from 'react-native-simple-toast';

import { useBackButton } from 'app/hooks/useBackButton';

import { Mobile } from 'app/screens/phoneLogin/mobile';
import { Otp } from 'app/screens/phoneLogin/otp';

import auth from '@react-native-firebase/auth';

export const PhoneLogin = ({ navigation }) => {
  useBackButton();
  const [confirm, setConfirm] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState('8086451830');
  const [emplId, setEmplId] = useState('');
  const [userToken, setUserToken] = useState('');

  const [country, setCountry] = React.useState({
    callingCode: '91',
    cca2: 'IN',
    details: {
      callingCode: ['91'],
      cca2: 'IN',
      currency: ['INR'],
      flag: 'flag-in',
      name: 'India',
      region: 'Asia',
      subregion: 'Southern Asia'
    }
  });

  const signInWithPhoneNumber = async () => {
    Toast.show(' Otp Sent');
    const { callingCode } = country;
    const confirmation = await auth().signInWithPhoneNumber(
      '+' + callingCode + phoneNumber
    );
    console.log('+' + callingCode + phoneNumber);
    setConfirm(confirmation);
    setLoading(false);
  };

  const verify = () => {
    if (phoneNumber.length !== 10) {
      Toast.show('Enter correct phone number');
      return;
    }

    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      mobile: '+' + country.callingCode + phoneNumber
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch('http://134.209.152.225:4000/api/user/mobile-login', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        var response = JSON.parse(result);
        setUserToken(response.token);
        setEmplId(response.empId);

        if (!response.status) {
          setLoading(false);
          alert('User is not found');
          return;
        }
        signInWithPhoneNumber();
      })
      .catch((error) => console.log('error', error));
  };

  if (!confirm) {
    return (
      <Mobile
        verify={verify}
        navigation={navigation}
        confirm={confirm}
        setConfirm={setConfirm}
        loading={loading}
        setLoading={setLoading}
        signInWithPhoneNumber={signInWithPhoneNumber}
        country={country}
        setCountry={setCountry}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />
    );
  }

  return (
    <Otp
      confirm={confirm}
      navigation={navigation}
      setConfirm={setConfirm}
      loading={loading}
      setLoading={setLoading}
      phoneNumber={phoneNumber}
      setPhoneNumber={setPhoneNumber}
      signInWithPhoneNumber={signInWithPhoneNumber}
      country={country}
      setCountry={setCountry}
      userToken={userToken}
      emplId={emplId}
    />
  );
};
