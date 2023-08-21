import React from 'react';
import { ActivityIndicator } from 'react-native';
import { white } from 'app/theme/Colors';

const Spinner = () => {
  return <ActivityIndicator size='small' color={white} />;
};
export default Spinner;
