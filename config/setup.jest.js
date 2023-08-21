// @flow

import * as ReactNative from 'react-native';

ReactNative.StatusBar.currentHeight = 42;
ReactNative.TextInput.displayName = 'TextInput';
ReactNative.TouchableHighlight.displayName = 'TouchableHighlight';
ReactNative.TouchableOpacity.displayName = 'TouchableOpacity';

jest.doMock('react-native', () =>
  Object.setPrototypeOf(
    {
      Alert: {
        alert: jest.fn(),
      },
      AppRegistry: {
        registerHeadlessTask: jest.fn(),
      },
      AppState: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
      BackHandler: {
        addEventListener: jest.fn(),
        exitApp: jest.fn(),
        removeEventListener: jest.fn(),
      },
      Dimensions: {
        // $FlowFixMe[method-unbinding]
        get: jest.fn(ReactNative.Dimensions.get),
      },
      Keyboard: {
        dismiss: jest.fn(),
      },
      LayoutAnimation: {
        ...ReactNative.LayoutAnimation,
        configureNext: jest.fn(),
      },
      Linking: {
        canOpenURL: jest.fn(),
        openSettings: jest.fn(),
        openURL: jest.fn(),
      },
      NativeModules: {
        ...ReactNative.NativeModules,
        RNCNetInfo: {
          addListener: jest.fn(),
          getCurrentConnectivity: jest.fn(),
          isConnectionMetered: jest.fn(),
          removeListeners: jest.fn(),
        },
        RNGestureHandlerModule: {},
      },
    },
    ReactNative,
  ),
);

global.mock = (mockFn: () => void) => mockFn;
global.setImmediate = process.nextTick;