/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { Context as App } from 'app/common/context';
import { name as appName } from './app.json';
import NotificationHandle from 'app/notification/notificationAndroid';

AppRegistry.registerComponent(appName, () => NotificationHandle);
