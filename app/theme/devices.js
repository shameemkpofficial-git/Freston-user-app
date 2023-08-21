import React from 'react';
import {View, Text, Dimensions, Platform, StatusBar} from 'react-native';
export const DevHeight = Dimensions.get('window').height;
export const DevWidth = Dimensions.get('window').width;
export const StbrHeight = StatusBar.currentHeight;
