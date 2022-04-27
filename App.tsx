import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import {StatusBar, Platform} from 'react-native';
import WaterMark from './src/components/WaterMark';
//screens
import SplashHome from './src/screens/SplashHome';
import TermAgree from './src/screens/signUp/TermAgree';
import SignInId from './src/screens/signIn/SignInId';
import SignInPassword from './src/screens/signIn/SignInPassword';
import ResetPasswordInputId from './src/screens/signIn/ResetPasswordInputId';
import ResetPasswordInputRegularMemberAuthNumber from './src/screens/signIn/ResetPasswordInputRegularMemberAuthNumber';
import ResetPasswordInputNewPassword from './src/screens/signIn/ResetPasswordInputNewPassword';
import ResetPasswordInputNewPasswordConfirm from './src/screens/signIn/ResetPasswordInputNewPasswordConfirm';

import SignUpId from './src/screens/signUp/SignUpId';
import SignUpPassword from './src/screens/signUp/SignUpPassword';
import SignUpPasswordConfirm from './src/screens/signUp/SignUpPasswordConfirm';
import SignUpNickname from './src/screens/signUp/SignUpNickname';
import MajorSelect from './src/screens/signUp/MajorSelect';
import SignUpComplete from './src/screens/signUp/SignUpComplete';
import RegularMemberAuthSelect from './src/screens/signUp/RegularMemberAuthSelect';
import DirectionAgree from './src/screens/signUp/DirectionAgree';
import RegularMemberAuth from './src/screens/signUp/RegularMemberAuth';
import BoardScreen from './src/screens/board/BoardScreen';
import PostScreen from './src/screens/post/PostScreen';

import GlobalNavbar from './src/components/GlobalNavbar';
import CreateBoard from './src/screens/board/CreateBoard';

import PostListScreen from './src/screens/post/PostListScreen';
import BoardSearch from './src/screens/board/BoardSearch';
import SearchResult from './src/screens/board/SearchResult';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MyPageFragment from './src/screens/fragments/MyPageFragment';
import CertifiedMember from './src/screens/mypage/regularMemberAuth/CertifiedMember';
import ExpiredMember from './src/screens/mypage/regularMemberAuth/ExpiredMember';
import UncertifiedMember from './src/screens/mypage/regularMemberAuth/UncertifiedMember';
import RegularMemberAuthMyPage from './src/screens/mypage/regularMemberAuth/RegularMemberAuthMyPage';
import ChangeNickname from './src/screens/mypage/ChangeNickname';
import ChangeMajor from './src/screens/mypage/ChangeMajor';
import ListScreen from './src/screens/mypage/informationUse/ListScreen';
import NoticeList from './src/screens/mypage/informationUse/NoticeList';
import Notice from './src/screens/mypage/informationUse/Notice';
import TermsOfService from './src/screens/mypage/informationUse/TermsOfService';
import OpenSourceLicense from './src/screens/mypage/informationUse/OpenSourceLicense'
import UsageRestrictions from './src/screens/mypage/informationUse/UsageRestrictions';
import RequestScreen from './src/screens/mypage/RequestScreen';
import RequestWriteScreen from './src/screens/mypage/RequestWriteScreen';
import RequestAnswer from './src/screens/mypage/RequestAnswer';

import BackButtonIcon from './resources/icon/BackButtonIcon';
import {CommonActions} from '@react-navigation/native';
import CloseButtonIcon from './resources/icon/CloseButtonIcon';

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
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                  headerRight: () => (
                    <CloseButtonIcon onPress={() => navigation.popToTop()} />
                  ),
                })}
              />
              <Stack.Screen
                name="SignUpId"
                component={SignUpId}
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                  headerRight: () => (
                    <CloseButtonIcon onPress={() => navigation.popToTop()} />
                  ),
                })}
              />
              <Stack.Screen
                name="SignUpPassword"
                component={SignUpPassword}
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                  headerRight: () => (
                    <CloseButtonIcon onPress={() => navigation.popToTop()} />
                  ),
                })}
              />
              <Stack.Screen
                name="SignUpPasswordConfirm"
                component={SignUpPasswordConfirm}
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                  headerRight: () => (
                    <CloseButtonIcon onPress={() => navigation.popToTop()} />
                  ),
                })}
              />
              <Stack.Screen
                name="SignUpNickname"
                component={SignUpNickname}
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                  headerRight: () => (
                    <CloseButtonIcon onPress={() => navigation.popToTop()} />
                  ),
                })}
              />
              <Stack.Screen
                name="MajorSelect"
                component={MajorSelect}
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                  headerRight: () => (
                    <CloseButtonIcon onPress={() => navigation.popToTop()} />
                  ),
                })}
              />
              <Stack.Screen
                name="SignUpComplete"
                component={SignUpComplete}
                options={{
                  title: '',
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="DirectionAgree"
                component={DirectionAgree}
                options={{
                  title: '',
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="RegularMemberAuthSelect"
                component={RegularMemberAuthSelect}
                options={{
                  title: '',
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="RegularMemberAuth"
                component={RegularMemberAuth}
                options={{
                  title: '',
                  animation: 'slide_from_right',
                }}
              />
              {/* [F-2 로그인] */}
              <Stack.Screen
                name="SignInId"
                component={SignInId}
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="SignInPassword"
                component={SignInPassword}
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="ResetPasswordInputId"
                component={ResetPasswordInputId}
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                  headerRight: () => (
                    <CloseButtonIcon onPress={() => navigation.popToTop()} />
                  ),
                })}
              />
              <Stack.Screen
                name="ResetPasswordInputRegularMemberAuthNumber"
                component={ResetPasswordInputRegularMemberAuthNumber}
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                  headerRight: () => (
                    <CloseButtonIcon onPress={() => navigation.popToTop()} />
                  ),
                })}
              />
              <Stack.Screen
                name="ResetPasswordInputNewPassword"
                component={ResetPasswordInputNewPassword}
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                  headerRight: () => (
                    <CloseButtonIcon onPress={() => navigation.popToTop()} />
                  ),
                })}
              />
              <Stack.Screen
                name="ResetPasswordInputNewPasswordConfirm"
                component={ResetPasswordInputNewPasswordConfirm}
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                  headerRight: () => (
                    <CloseButtonIcon onPress={() => navigation.popToTop()} />
                  ),
                })}
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
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                }}
              />
              <Stack.Screen
                name="CreateBoard"
                component={CreateBoard}
                options={{
                  title: '게시판 생성',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                }}
              />
              <Stack.Screen name="BoardSearch" component={BoardSearch} />
              <Stack.Screen name="SearchResult" component={SearchResult} />
              <Stack.Screen
                name="PostListScreen"
                component={PostListScreen}
                options={({navigation}) => ({
                  title: '고정 게시판',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                })}
              />
              {/* [F-5] 마이페이지 */}
              <Stack.Screen name="MyPageFragment" component={MyPageFragment} />
              {/* 마이페이지 - 정회원 인증 */}
              <Stack.Screen
                name="CertifiedMember"
                component={CertifiedMember}
                options={({navigation}) => ({
                  title: '정회원 인증',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="ExpiredMember"
                component={ExpiredMember}
                options={({navigation}) => ({
                  title: '정회원 인증',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="UncertifiedMember"
                component={UncertifiedMember}
                options={({navigation}) => ({
                  title: '정회원 인증',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="RegularMemberAuthMyPage"
                component={RegularMemberAuthMyPage}
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerRight: () => (
                    <CloseButtonIcon onPress={() => navigation.popToTop()} />
                  ),
                })}
              />

              {/* 마이페이지 - 비밀번호 재설정 */}

              {/* 마이페이지 - 프로필 이미지 변경
              마이페이지 - 닉네임 변경
              마이페이지 - 소속 학과 변경 */}
              <Stack.Screen
                name="ChangeNickname"
                component={ChangeNickname}
                options={({navigation}) => ({
                  title: '',
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="ChangeMajor"
                component={ChangeMajor}
                options={({navigation}) => ({
                  title: '',
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                })}
              />
              {/* 마이페이지 - 이용안내 */}
              <Stack.Screen
                name="ListScreen"
                component={ListScreen}
                options={({navigation}) => ({
                  title: '이용안내',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="NoticeList"
                component={NoticeList}
                options={({navigation}) => ({
                  title: '공지사항',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="Notice"
                component={Notice}
                options={({navigation}) => ({
                  title: '공지사항',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="TermsOfService"
                component={TermsOfService}
                options={({navigation}) => ({
                  title: '서비스 이용약관',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="OpenSourceLicense"
                component={OpenSourceLicense}
                options={({navigation}) => ({
                  title: '오픈소스 라이센스',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="UsageRestrictions"
                component={UsageRestrictions}
                options={({navigation}) => ({
                  title: '이용 제한 내역',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                })}
              />
              {/* 마이페이지 - 문의하기 */}
              <Stack.Screen
                name="RequestScreen"
                component={RequestScreen}
                options={({navigation}) => ({
                  title: '문의 하기',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="RequestWriteScreen"
                component={RequestWriteScreen}
                options={({navigation}) => ({
                  title: '문의 하기',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="RequestAnswer"
                component={RequestAnswer}
                options={{
                  title: '문의 내역',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
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
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                  headerRight: () => (
                    <CloseButtonIcon onPress={() => navigation.popToTop()} />
                  ),
                })}
              />
              <Stack.Screen
                name="SignUpId"
                component={SignUpId}
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                  headerRight: () => (
                    <CloseButtonIcon onPress={() => navigation.popToTop()} />
                  ),
                })}
              />
              <Stack.Screen
                name="SignUpPassword"
                component={SignUpPassword}
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                  headerRight: () => (
                    <CloseButtonIcon onPress={() => navigation.popToTop()} />
                  ),
                })}
              />
              <Stack.Screen
                name="SignUpPasswordConfirm"
                component={SignUpPasswordConfirm}
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                  headerRight: () => (
                    <CloseButtonIcon onPress={() => navigation.popToTop()} />
                  ),
                })}
              />
              <Stack.Screen
                name="SignUpNickname"
                component={SignUpNickname}
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                  headerRight: () => (
                    <CloseButtonIcon onPress={() => navigation.popToTop()} />
                  ),
                })}
              />
              <Stack.Screen
                name="MajorSelect"
                component={MajorSelect}
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                  headerRight: () => (
                    <CloseButtonIcon onPress={() => navigation.popToTop()} />
                  ),
                })}
              />
              <Stack.Screen
                name="SignUpComplete"
                component={SignUpComplete}
                options={{
                  title: '',
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="DirectionAgree"
                component={DirectionAgree}
                options={{
                  title: '',
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="RegularMemberAuthSelect"
                component={RegularMemberAuthSelect}
                options={{
                  title: '',
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="RegularMemberAuth"
                component={RegularMemberAuth}
                options={{
                  title: '',
                  animation: 'slide_from_right',
                }}
              />
              {/* [F-2 로그인] */}
              <Stack.Screen
                name="SignInId"
                component={SignInId}
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="SignInPassword"
                component={SignInPassword}
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="ResetPasswordInputId"
                component={ResetPasswordInputId}
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                  headerRight: () => (
                    <CloseButtonIcon onPress={() => navigation.popToTop()} />
                  ),
                })}
              />
              <Stack.Screen
                name="ResetPasswordInputRegularMemberAuthNumber"
                component={ResetPasswordInputRegularMemberAuthNumber}
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                  headerRight: () => (
                    <CloseButtonIcon onPress={() => navigation.popToTop()} />
                  ),
                })}
              />
              <Stack.Screen
                name="ResetPasswordInputNewPassword"
                component={ResetPasswordInputNewPassword}
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                  headerRight: () => (
                    <CloseButtonIcon onPress={() => navigation.popToTop()} />
                  ),
                })}
              />
              <Stack.Screen
                name="ResetPasswordInputNewPasswordConfirm"
                component={ResetPasswordInputNewPasswordConfirm}
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                  headerRight: () => (
                    <CloseButtonIcon onPress={() => navigation.popToTop()} />
                  ),
                })}
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
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                }}
              />
              <Stack.Screen
                name="CreateBoard"
                component={CreateBoard}
                options={{
                  title: '게시판 생성',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                }}
              />
              <Stack.Screen name="BoardSearch" component={BoardSearch} />
              <Stack.Screen name="SearchResult" component={SearchResult} />
              <Stack.Screen
                name="PostListScreen"
                component={PostListScreen}
                options={({navigation}) => ({
                  title: '고정 게시판',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="PostScreen"
                component={PostScreen}
                options={({navigation}) => ({
                  title: '네모 게시판',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                })}
              />
              {/* [F-5] 마이페이지 */}
              <Stack.Screen name="MyPageFragment" component={MyPageFragment} />
              {/* 마이페이지 - 정회원 인증 */}
              <Stack.Screen
                name="CertifiedMember"
                component={CertifiedMember}
                options={({navigation}) => ({
                  title: '정회원 인증',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="ExpiredMember"
                component={ExpiredMember}
                options={({navigation}) => ({
                  title: '정회원 인증',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="UncertifiedMember"
                component={UncertifiedMember}
                options={({navigation}) => ({
                  title: '정회원 인증',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="RegularMemberAuthMyPage"
                component={RegularMemberAuthMyPage}
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerRight: () => (
                    <CloseButtonIcon onPress={() => navigation.popToTop()} />
                  ),
                })}
              />
              {/* 마이페이지 - 비밀번호 재설정 */}

              {/* 마이페이지 - 프로필 이미지 변경
              마이페이지 - 닉네임 변경
              마이페이지 - 소속 학과 변경 */}
              <Stack.Screen
                name="ChangeNickname"
                component={ChangeNickname}
                options={({navigation}) => ({
                  title: '',
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="ChangeMajor"
                component={ChangeMajor}
                options={({navigation}) => ({
                  title: '',
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                })}
              />
              {/* 마이페이지 - 이용안내 */}
              <Stack.Screen
                name="ListScreen"
                component={ListScreen}
                options={({navigation}) => ({
                  title: '이용안내',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="NoticeList"
                component={NoticeList}
                options={({navigation}) => ({
                  title: '공지사항',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="Notice"
                component={Notice}
                options={({navigation}) => ({
                  title: '공지사항',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="TermsOfService"
                component={TermsOfService}
                options={({navigation}) => ({
                  title: '서비스 이용약관',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="OpenSourceLicense"
                component={OpenSourceLicense}
                options={({navigation}) => ({
                  title: '오픈소스 라이센스',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="UsageRestrictions"
                component={UsageRestrictions}
                options={({navigation}) => ({
                  title: '이용 제한 내역',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                })}
              />
              {/* 마이페이지 - 문의하기 */}
              <Stack.Screen
                name="RequestScreen"
                component={RequestScreen}
                options={({navigation}) => ({
                  title: '문의 하기',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="RequestWriteScreen"
                component={RequestWriteScreen}
                options={({navigation}) => ({
                  title: '문의 하기',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <BackButtonIcon
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="RequestAnswer"
                component={RequestAnswer}
                options={{
                  title: '문의 내역',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
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
