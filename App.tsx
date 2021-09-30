import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import {StatusBar} from 'react-native';

//screens
import Home from './src/screens/Home';
import TermAgree from './src/screens/signUp/TermAgree';
import SignIn from './src/screens/signIn/SignIn';

import SignUpID from './src/screens/signUp/SignUpID';
import SignUpPassword from './src/screens/signUp/SignUpPassword';
import SignUpPasswordConfirm from './src/screens/signUp/SignUpPasswordConfirm';
import SignUpNickname from './src/screens/signUp/SignUpNickname';
import MajorSelect from './src/screens/signUp/MajorSelect';
import SignUpComplete from './src/screens/signUp/SignUpComplete';
import RegularMemberAuthSelect from './src/screens/signUp/RegularMemberAuthSelect';
import RegularMemberAuth from './src/screens/signUp/RegularMemberAuth';

const Stack = createNativeStackNavigator();

const App = () => {
  StatusBar.setBackgroundColor('white');
  // StatusBar.setTranslucent(true);
  StatusBar.setBarStyle('dark-content');

  // useEffect(() => {
  //   SplashScreen.hide();
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShadowVisible: false}}>
        {/* [F-1] */}
        <Stack.Screen name="Home" component={Home} options={{title: ''}} />
        <Stack.Screen
          name="TermAgree"
          component={TermAgree}
          options={{title: ''}}
        />
        <Stack.Screen name="SignIn" component={SignIn} options={{title: ''}} />
        {/* [F-2-1] 회원가입 */}
        <Stack.Screen
          name="SignUpID"
          component={SignUpID}
          options={{title: ''}}
        />
        <Stack.Screen
          name="SignUpPassword"
          component={SignUpPassword}
          options={{title: ''}}
        />
        <Stack.Screen
          name="SignUpPasswordConfirm"
          component={SignUpPasswordConfirm}
          options={{title: ''}}
        />
        <Stack.Screen
          name="SignUpNickname"
          component={SignUpNickname}
          options={{title: ''}}
        />
        <Stack.Screen
          name="MajorSelect"
          component={MajorSelect}
          options={{title: ''}}
        />
        <Stack.Screen
          name="SignUpComplete"
          component={SignUpComplete}
          options={{title: ''}}
        />
        <Stack.Screen
          name="RegularMemberAuthSelect"
          component={RegularMemberAuthSelect}
          options={{title: ''}}
        />
        <Stack.Screen
          name="RegularMemberAuth"
          component={RegularMemberAuth}
          options={{title: ''}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
