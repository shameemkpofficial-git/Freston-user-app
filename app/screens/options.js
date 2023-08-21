import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { optionStyle } from '../styles/OptionStyle';
import { secondaryColor } from 'app/theme/Colors';

const OptionsScreen = ({ navigation }) => {
  return (
    <View style={optionStyle.container}>
      <TouchableOpacity
        style={optionStyle.mailBtn}
        onPress={() => navigation.navigate('Apply')}
      >
        <Text style={optionStyle.mailTxt}>Mail</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[optionStyle.mailBtn, { backgroundColor: secondaryColor }]}
        onPress={() => navigation.navigate('HomeScreen')}
      >
        <Text style={optionStyle.mailTxt}>Slack</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OptionsScreen;
