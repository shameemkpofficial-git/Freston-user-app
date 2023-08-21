import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { IconPack } from 'app/components/iconPack';
import Fonts from 'app/theme/fonts';

export default function MobileInput(props) {
  const { phoneNumber, setPhoneNumber, setCountry, country } = props;
  const [countryModal, setCountryModal] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.countryPickerContainer}>
        <CountryPicker
          withAlphaFilter={true}
          withCallingCode={true}
          onSelect={(data) => {
            setCountry({
              callingCode: data.callingCode[0],
              cca2: data.cca2,
              details: data
            });
          }}
          withFlagButton={false}
          withFilter={true}
          countryCode={[country.cca2]}
          onClose={() => setCountryModal(false)}
          visible={countryModal}
        />
      </View>
      <TouchableOpacity
        style={styles.countryCodeBtn}
        onPress={() => {
          setCountryModal(true);
        }}
      >
        <Text style={styles.countryCodeTxt}>+ {country.callingCode}</Text>
        <Image
          source={require('app/assets/images/down.png')}
          style={styles.downIcon}
        />
      </TouchableOpacity>
      <View style={styles.mobAndClearBtnContainer}>
        <TextInput
          selectionColor={'grey'}
          onChangeText={setPhoneNumber}
          placeholder='Phone Number' //dummy@abc.com
          placeholderTextColor='#8b9cb5'
          autoCapitalize='none'
          keyboardType='number-pad'
          returnKeyType='next'
          underlineColorAndroid='#f000'
          blurOnSubmit={false}
          value={phoneNumber}
          style={styles.mobTxtInput}
          maxLength={10}
        />
        {phoneNumber && (
          <TouchableOpacity
            style={styles.clrBtnContainer}
            onPress={() => setPhoneNumber('')}
          >
            <IconPack
              pack='AntDesign'
              iconName='closecircle'
              iconSize={24}
              iconColor='#717F95'
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 10,
    backgroundColor: '#F0F0F0'
  },
  countryPickerContainer: {
    flexDirection: 'row',
    height: '100%'
  },
  countryCodeBtn: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  countryCodeTxt: {
    fontSize: 14,
    color: 'black',
    marginLeft: 2,
    fontFamily: Fonts.medium
  },
  downIcon: {
    height: 20,
    width: 20,
    marginLeft: 5
  },
  mobAndClearBtnContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center'
  },
  mobTxtInput: {
    color: 'black',
    flex: 0.85
  },
  clrBtnContainer: {
    height: '80%',
    justifyContent: 'center',
    flex: 0.15,
    alignItems: 'flex-end'
  }
});
