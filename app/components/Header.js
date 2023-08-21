import React from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IconPack } from 'app/components/iconPack';
import Fonts from 'app/theme/fonts';

export default function Header({ onPress, goBack, headerText }) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        height: 60,
        flexDirection: 'row',
        alignItems: 'center'
      }}
    >
      {goBack && (
        <TouchableOpacity
          style={{
            width: 60,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => navigation.goBack()}
        >
          <IconPack
            pack='Ionicons'
            iconName='chevron-back-sharp'
            iconSize={30}
            iconColor='#0E5F9D'
          />
        </TouchableOpacity>
      )}

      {headerText && (
        <Text
          style={{
            fontFamily: Fonts.medium,
            fontSize: 14,
            color: '#0E5F9D'
          }}
        >
          {headerText}
        </Text>
      )}
    </View>
  );
}
