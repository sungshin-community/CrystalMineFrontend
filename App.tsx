import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import {StatusBar, Platform, Pressable, Text} from 'react-native';
import WaterMark from './src/components/WaterMark';
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
import PostScreen from './src/screens/post/PostScreen';

import GlobalNavbar from './src/components/GlobalNavbar';
import CreateBoard from './src/screens/board/CreateBoard';

import PostListScreen from './src/screens/post/PostListScreen';
import BoardSearch from './src/screens/board/BoardSearch';
import SearchResult from './src/screens/board/SearchResult';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeScreenNavigationContainer} from 'react-native-screens';

import MyPageFragment from './src/screens/fragments/MyPageFragment';
import RequestScreen from './src/screens/mypage/RequestScreen';
const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor('white');
    // StatusBar.setTranslucent(true);
    StatusBar.setBarStyle('dark-content');
  }

  useEffect(() => {
    async function checkLoginState() {
      const accessToken: string | null = await AsyncStorage.getItem(
        'accessToken',
      );
      if (accessToken == null || accessToken === '') {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
      setIsLoaded(true);
      SplashScreen.hide();
    }
    checkLoginState();
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     SplashScreen.hide();
  //   }, 1);
  // }, []);

  return (
    <>
      {isLoaded && (
        <NavigationContainer>
          {!isLoggedIn ? (
            <Stack.Navigator
              screenOptions={{
                headerShadowVisible: false,
                headerBackVisible: false,
              }}
              initialRouteName="SplashHome">
              <Stack.Screen
                name="SplashHome"
                component={SplashHome}
                options={{title: ''}}
              />
              {/* [F-1 회원가입] */}
              <Stack.Screen
                name="TermAgree"
                component={TermAgree}
                options={{
                  title: '',
                  headerTintColor: '#000000',
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="SignUpId"
                component={SignUpId}
                options={{title: '', headerTintColor: '#000000'}}
              />
              <Stack.Screen
                name="SignUpPassword"
                component={SignUpPassword}
                options={{
                  title: '',
                  headerTintColor: '#000000',
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="SignUpPasswordConfirm"
                component={SignUpPasswordConfirm}
                options={{
                  title: '',
                  headerTintColor: '#000000',
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="SignUpNickname"
                component={SignUpNickname}
                options={{
                  title: '',
                  headerTintColor: '#000000',
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="MajorSelect"
                component={MajorSelect}
                options={{
                  title: '',
                  headerTintColor: '#000000',
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="SignUpComplete"
                component={SignUpComplete}
                options={{
                  title: '',
                  headerTintColor: '#000000',
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="RegularMemberAuthSelect"
                component={RegularMemberAuthSelect}
                options={{
                  title: '',
                  headerTintColor: '#000000',
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="RegularMemberAuth"
                component={RegularMemberAuth}
                options={{
                  title: '',
                  headerTintColor: '#000000',
                  animation: 'slide_from_right',
                }}
              />
              {/* [F-2 로그인] */}
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
                }}
              />
              <Stack.Screen
                name="CreateBoard"
                component={CreateBoard}
                options={{
                  title: '게시판 생성',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                }}
              />
              <Stack.Screen
                name="BoardSearch"
                component={BoardSearch}
                options={{}}
              />
              <Stack.Screen
                name="SearchResult"
                component={SearchResult}
                options={{}}
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
              {/* [F-5] 마이페이지 */}
              <Stack.Screen name="MyPageFragment" component={MyPageFragment} />
              <Stack.Screen
                name="RequestScreen"
                component={RequestScreen}
                options={{
                  title: '문의하기',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                }}
              />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator
              screenOptions={{
                headerShadowVisible: false,
                headerBackVisible: false,
              }}
              initialRouteName="GlobalNavbar">
              <Stack.Screen
                name="SplashHome"
                component={SplashHome}
                options={{title: ''}}
              />
              {/* [F-1 회원가입] */}
              <Stack.Screen
                name="TermAgree"
                component={TermAgree}
                options={{
                  title: '',
                  headerTintColor: '#000000',
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="SignUpId"
                component={SignUpId}
                options={{
                  title: '',
                  headerTintColor: '#000000',
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="SignUpPassword"
                component={SignUpPassword}
                options={{
                  title: '',
                  headerTintColor: '#000000',
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="SignUpPasswordConfirm"
                component={SignUpPasswordConfirm}
                options={{
                  title: '',
                  headerTintColor: '#000000',
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="SignUpNickname"
                component={SignUpNickname}
                options={{
                  title: '',
                  headerTintColor: '#000000',
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="MajorSelect"
                component={MajorSelect}
                options={{
                  title: '',
                  headerTintColor: '#000000',
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="SignUpComplete"
                component={SignUpComplete}
                options={{
                  title: '',
                  headerTintColor: '#000000',
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="RegularMemberAuthSelect"
                component={RegularMemberAuthSelect}
                options={{
                  title: '',
                  headerTintColor: '#000000',
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="RegularMemberAuth"
                component={RegularMemberAuth}
                options={{
                  title: '',
                  headerTintColor: '#000000',
                  animation: 'slide_from_right',
                }}
              />
              {/* [F-2 로그인] */}
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
                }}
              />
              <Stack.Screen
                name="CreateBoard"
                component={CreateBoard}
                options={{
                  title: '게시판 생성',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                }}
              />
              <Stack.Screen
                name="BoardSearch"
                component={BoardSearch}
                options={{}}
              />
              <Stack.Screen
                name="SearchResult"
                component={SearchResult}
                options={{}}
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
              <Stack.Screen
                name="PostScreen"
                component={PostScreen}
                options={{
                  title: '네모 게시판',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                }}
              />
              {/* [F-5] 마이페이지 */}
              <Stack.Screen name="MyPageFragment" component={MyPageFragment} />
              <Stack.Screen
                name="RequestScreen"
                component={RequestScreen}
                options={{
                  title: '문의하기',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                }}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      )}
      <WaterMark />
    </>
  );
};
export default App;
