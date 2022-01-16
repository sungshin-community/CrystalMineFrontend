import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import {StatusBar, Platform} from 'react-native';

//screens
import SplashHome from './src/screens/SplashHome';
import TermAgree from './src/screens/signUp/TermAgree';
import SignInId from './src/screens/signIn/SignInId';
import SignInPassword from './src/screens/signIn/SignInPassword';

import SignUpId from './src/screens/signUp/SignUpId';
import SignUpPassword from './src/screens/signUp/SignUpPassword';
import SignUpPasswordConfirm from './src/screens/signUp/SignUpPasswordConfirm';
import SignUpNickname from './src/screens/signUp/SignUpNickname';
import MajorSelect from './src/screens/signUp/MajorSelect';
import SignUpComplete from './src/screens/signUp/SignUpComplete';
import RegularMemberAuthSelect from './src/screens/signUp/RegularMemberAuthSelect';
import RegularMemberAuth from './src/screens/signUp/RegularMemberAuth';
import BoardScreen from './src/screens/board/BoardScreen';

// import Home from './src/screens/GNB/Home';
import GlobalNavbar from './src/components/GlobalNavbar';
import CreateBoard from './src/screens/board/CreateBoard';

import PostListScreen from './src/screens/post/PostListScreen';
import BoardSearch from './src/screens/board/BoardSearch';
import SearchResult from './src/screens/board/SearchResult';
const Stack = createNativeStackNavigator();

const App = () => {
  {
    Platform.OS === 'android' && StatusBar.setBackgroundColor('white');
    // StatusBar.setTranslucent(true);
    StatusBar.setBarStyle('dark-content');
  }

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     SplashScreen.hide();
  //   }, 1);
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShadowVisible: false}}>
        {/* [F-1] */}
        <Stack.Screen
          name="SplashHome"
          component={SplashHome}
          options={{title: ''}}
        />
        <Stack.Screen
          name="TermAgree"
          component={TermAgree}
          options={{
            title: '',
            headerTintColor: '#000000',
          }}
        />
        <Stack.Screen
          name="SignInId"
          component={SignInId}
          options={{
            title: '',
            headerTintColor: '#000000',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="SignInPassword"
          component={SignInPassword}
          options={{
            title: '',
            headerTintColor: '#000000',
            animation: 'slide_from_right',
          }}
        />
        {/* [F-2-1] 회원가입 */}
        <Stack.Screen
          name="SignUpId"
          component={SignUpId}
          options={{title: '', headerTintColor: '#000000'}}
        />
        <Stack.Screen
          name="SignUpPassword"
          component={SignUpPassword}
          options={{title: '', headerTintColor: '#000000'}}
        />
        <Stack.Screen
          name="SignUpPasswordConfirm"
          component={SignUpPasswordConfirm}
          options={{title: '', headerTintColor: '#000000'}}
        />
        <Stack.Screen
          name="SignUpNickname"
          component={SignUpNickname}
          options={{title: '', headerTintColor: '#000000'}}
        />
        <Stack.Screen
          name="MajorSelect"
          component={MajorSelect}
          options={{title: '', headerTintColor: '#000000'}}
        />
        <Stack.Screen
          name="SignUpComplete"
          component={SignUpComplete}
          options={{
            title: '',
            headerTintColor: '#000000',
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="RegularMemberAuthSelect"
          component={RegularMemberAuthSelect}
          options={{
            title: '',
            headerTintColor: '#000000',
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="RegularMemberAuth"
          component={RegularMemberAuth}
          options={{
            title: '',
            headerTintColor: '#000000',
            headerBackVisible: false,
          }}
        />
        {/* GNB */}
        <Stack.Screen
          name="GlobalNavbar"
          component={GlobalNavbar}
          options={{headerShown: false}}
        />
        {/* [F-7] 게시판 */}
        <Stack.Screen
          name="BoardScreen"
          component={BoardScreen}
          options={{
            title: '게시판',
            headerTintColor: '#000000',
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="CreateBoard"
          component={CreateBoard}
          options={{
            title: '게시판 생성',
            headerTitleAlign: 'center',
            headerTintColor: '#000000',
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="BoardSearch"
          component={BoardSearch}
          options={{title: '게시판 검색', headerShown: false}}
        />
        <Stack.Screen
          name="SearchResult"
          component={SearchResult}
          options={{title: '전체 검색 결과'}}
        />
        <Stack.Screen
          name="PostListScreen"
          component={PostListScreen}
          options={{
            title: '고정 게시판',
            headerTitleAlign: 'center',
            headerTintColor: '#000000',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
