// @flow

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import AddIssuesScreen from 'app/screens/AddIssuesScreen.js';
import AddProjectScreen from 'app/screens/AddProject';
import LeaveForm from 'app/screens/Apply.js';
import ForgotPass from 'app/screens/ForgotPass';
import Profile from 'app/screens/ProfileScreen';
import ProjectDetailScreen from 'app/screens/ProjectDetailScreen.js';
import RegisterScreen from 'app/screens/RegisterScreen';
import UpdateProjectScreen from 'app/screens/UpdateProjectScreen';
import ArchieveScreen from 'app/screens/archieveScreen';
import { Calender } from 'app/screens/calender';
import { EmployeeLogin } from 'app/screens/employeeLogin';
import { Home } from 'app/screens/home';
import OptionsScreen from 'app/screens/options';
import { PhoneLogin } from 'app/screens/phoneLogin';
import { Splash } from 'app/screens/splash';
import UpdateProfileScreen from 'app/screens/updateProfileScreen';

import type { AppTypes, AuthTypes } from 'app/common/type';
import type { Node } from 'react';

// import IssueDetailScreen from '../screens/IssueDetailScreen.js.js';

const Stack = createStackNavigator();

const App = ({}: AppTypes): Node => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName='splash'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={Splash} name='splash' />
      <Stack.Screen component={EmployeeLogin} name='employeeLogin' />
      <Stack.Screen component={PhoneLogin} name='phoneAuth' />
      <Stack.Screen component={Home} name='home' />
      <Stack.Screen component={Calender} name='calender' />

      <Stack.Screen component={RegisterScreen} name='RegisterScreen' />
      <Stack.Screen component={ForgotPass} name='ForgotPass' />
      <Stack.Screen component={OptionsScreen} name='OptionsScreen' />
      <Stack.Screen component={LeaveForm} name='Apply' />
      <Stack.Screen component={AddProjectScreen} name='AddProjectScreen' />
      <Stack.Screen
        component={UpdateProjectScreen}
        name='UpdateProjectScreen'
      />
      <Stack.Screen component={ArchieveScreen} name='ArchieveProjectScreen' />
      <Stack.Screen component={Profile} name='ProfileScreen' />
      <Stack.Screen
        component={UpdateProfileScreen}
        name='UpdateProfileScreen'
      />
      <Stack.Screen
        component={ProjectDetailScreen}
        name='ProjectDetailScreen'
      />
      <Stack.Screen component={AddIssuesScreen} name='AddIssuesScreen' />
      {/* <Stack.Screen
            name='IssueDetailScreen'
            component={IssueDetailScreen}
            options={{
              headerShown: true,
              title: 'Issue',
              headerStyle: { backgroundColor: 'white' },
              headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }
            }}
          /> */}
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
