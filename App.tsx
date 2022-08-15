import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Pressable, TouchableHighlight} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {StatusBar, Platform} from 'react-native';
import WaterMark from './src/components/WaterMark';
// screens
// signIn
import SplashHome from './src/screens/SplashHome';
import TermAgree from './src/screens/signUp/TermAgree';
import SignInId from './src/screens/signIn/SignInId';
import SignInPassword from './src/screens/signIn/SignInPassword';
import ResetPasswordInputId from './src/screens/signIn/ResetPasswordInputId';
import ResetPasswordInputRegularMemberAuthNumber from './src/screens/signIn/ResetPasswordInputRegularMemberAuthNumber';
import ResetPasswordInputNewPassword from './src/screens/signIn/ResetPasswordInputNewPassword';
import ResetPasswordInputNewPasswordConfirm from './src/screens/signIn/ResetPasswordInputNewPasswordConfirm';
// signUp
import SignUpId from './src/screens/signUp/SignUpId';
import { MailVerificationMethodGuide } from './src/screens/signUp/MailVerificationMethodGuide';
import SignUpPassword from './src/screens/signUp/SignUpPassword';
import SignUpPasswordConfirm from './src/screens/signUp/SignUpPasswordConfirm';
import SignUpNickname from './src/screens/signUp/SignUpNickname';
import MajorSelect from './src/screens/signUp/MajorSelect';
import SignUpComplete from './src/screens/signUp/SignUpComplete';
import RegularMemberAuthSelect from './src/screens/signUp/RegularMemberAuthSelect';
import DirectionAgree from './src/screens/signUp/DirectionAgree';
import RegularMemberAuth from './src/screens/signUp/RegularMemberAuth';
import PostScreen from './src/screens/post/PostScreen';

import GlobalNavbar from './src/components/GlobalNavbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
// search
import TotalSearch from './src/screens/search/total/TotalSearch';
import TotalSearchResult from './src/screens/search/total/TotalSearchResult';
// board
import TermAgreeCreateBoard from './src/screens/board/createBoard/DirectionAgree';
import CreateBoard from './src/screens/board/createBoard/CreateBoard';
import UpdateBoard from './src/screens/board/createBoard/UpdateBoard';
// post
import PostListScreen from './src/screens/post/PostListScreen';
import MyPostList from './src/screens/board/MyPostList';
import PostWriteScreen from './src/screens/post/PostWriteScreen';
// myPage
import MyPageFragment from './src/screens/fragments/MyPageFragment';
import DirectionAgreeMyPage from './src/screens/mypage/regularMemberAuth/DirectionAgreeMyPage';
import CertifiedMember from './src/screens/mypage/regularMemberAuth/CertifiedMember';
import ExpiredMember from './src/screens/mypage/regularMemberAuth/ExpiredMember';
import UncertifiedMember from './src/screens/mypage/regularMemberAuth/UncertifiedMember';
import RegularMemberAuthMyPage from './src/screens/mypage/regularMemberAuth/RegularMemberAuthMyPage';
import InputPassword from './src/screens/mypage/changePassword/InputPassword';
import InputNewPassword from './src/screens/mypage/changePassword/InputNewPassword';
import InputNewPasswordConfirm from './src/screens/mypage/changePassword/InputNewPasswordConfirm';
import ChangeNickname from './src/screens/mypage/ChangeNickname';
import ChangeMajor from './src/screens/mypage/ChangeMajor';
import {DirectionAgreeScreen} from './src/screens/mypage/DirectionAgreeScreen';
import ListScreen from './src/screens/mypage/informationUse/ListScreen';
import NoticeList from './src/screens/mypage/informationUse/NoticeList';
import Notice from './src/screens/mypage/informationUse/Notice';
import TermsOfService from './src/screens/mypage/informationUse/TermsOfService';
import OpenSourceLicense from './src/screens/mypage/informationUse/OpenSourceLicense';
import UsageRestrictions from './src/screens/mypage/informationUse/UsageRestrictions';
import QuestionList from './src/screens/mypage/QuestionList';
import QuestionWriteScreen from './src/screens/mypage/QuestionWriteScreen';
import InformationUse from './src/screens/mypage/blindMemberAccess/InformationUse';

import BackButtonIcon from './resources/icon/BackButtonIcon';
import {CommonActions} from '@react-navigation/native';
import CloseButtonIcon from './resources/icon/CloseButtonIcon';
import QuitTermAgree from './src/screens/mypage/informationUse/quitMembership/QuitTermAgree';
import QuitPassword from './src/screens/mypage/informationUse/quitMembership/QuitPassword';
import QuitComplete from './src/screens/mypage/informationUse/quitMembership/QuitComplete';
import ScrapedPostList from './src/screens/board/ScrapedPostList';
import MyCommentList from './src/screens/board/MyCommentList';
import WikiTab from './src/screens/board/WikiTab';
import PostSearch from './src/screens/search/PostSearch';
import PostSearchResult from './src/screens/search/PostSearchResult';
import MyPostSearch from './src/screens/search/MyPostSearch';
import MyPostSearchResult from './src/screens/search/MyPostSearchResult';
import MyCommentSearch from './src/screens/search/MyCommentSearch';
import MyCommentSearchResult from './src/screens/search/MyCommentSearchResult';
import ScrapedPostSearch from './src/screens/search/ScrapedPostSearch';
import ScrapedPostSearchResult from './src/screens/search/ScrapedPostSearchResult';
import WikiSearchResult from './src/screens/search/WikiSearchResult';
import ImageViewerScreen from './src/screens/post/ImageViewerScreen';

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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.popToTop()}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.popToTop()}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="MailVerificationMethodGuide"
                component={MailVerificationMethodGuide}
                options={({navigation}) => ({
                  title: '메일 인증 방법 안내',
                  animation: 'slide_from_right',
                  headerTitleAlign: 'center',
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.goBack()}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.popToTop()}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.popToTop()}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.popToTop()}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.popToTop()}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
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
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.reset({routes: [{name: 'GlobalNavbar'}]})}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
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
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.reset({routes: [{name: 'GlobalNavbar'}]})}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              {/* [F-2 로그인] */}
              <Stack.Screen
                name="SignInId"
                component={SignInId}
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.popToTop()}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.navigate('SplashHome')
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.popToTop()}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.popToTop()}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.popToTop()}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              {/* GNB */}
              <Stack.Screen
                name="GlobalNavbar"
                component={GlobalNavbar}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="TotalSearch"
                component={TotalSearch}
                options={({navigation}) => ({
                  title: ''
                })}
              />
              <Stack.Screen
                name="TotalSearchResult"
                component={TotalSearchResult}
                options={({navigation}) => ({
                  title: ''
                })}
              />
              <Stack.Screen
                name="PostSearch"
                component={PostSearch}
                options={({navigation}) => ({
                  title: ''
                })}
              />
              <Stack.Screen
                name="PostSearchResult"
                component={PostSearchResult}
                options={({navigation}) => ({
                  title: ''
                })}
              />
              <Stack.Screen
                name="MyPostSearch"
                component={MyPostSearch}
                options={({navigation}) => ({
                  title: ''
                })}
              />
              <Stack.Screen
                name="MyPostSearchResult"
                component={MyPostSearchResult}
                options={({navigation}) => ({
                  title: ''
                })}
              />
              <Stack.Screen
                name="MyCommentSearch"
                component={MyCommentSearch}
                options={({navigation}) => ({
                  title: ''
                })}
              />
              <Stack.Screen
                name="MyCommentSearchResult"
                component={MyCommentSearchResult}
                options={({navigation}) => ({
                  title: ''
                })}
              />
              <Stack.Screen
                name="ScrapedPostSearch"
                component={ScrapedPostSearch}
                options={({navigation}) => ({
                  title: ''
                })}
              />
              <Stack.Screen
                name="ScrapedPostSearchResult"
                component={ScrapedPostSearchResult}
                options={({navigation}) => ({
                  title: ''
                })}
              />
              <Stack.Screen
                name="WikiSearchResult"
                component={WikiSearchResult}
                options={({navigation}) => ({
                  title: ''
                })}
              />
              {/* [F-7] 게시판 */}
              <Stack.Screen
                name="TermAgreeCreateBoard"
                component={TermAgreeCreateBoard}
                options={({navigation}) => ({
                  title: '',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.popToTop()}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="CreateBoard"
                component={CreateBoard}
                options={({navigation}) => ({
                  title: '게시판 생성',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="UpdateBoard"
                component={UpdateBoard}
                options={({navigation}) => ({
                  title: '게시판 수정',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="WikiTab"
                component={WikiTab}
                options={({navigation}) => ({
                  title: '성신위키',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="PostListScreen"
                component={PostListScreen}
                options={({navigation}) => ({
                  title: '',
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="PostWriteScreen"
                component={PostWriteScreen}
                options={({navigation}) => ({
                  title: '게시글 작성',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                })}
              />
              <Stack.Screen
                name="MyPostList"
                component={MyPostList}
                options={({navigation}) => ({
                  title: '내가 작성한 글',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="ScrapedPostList"
                component={ScrapedPostList}
                options={({navigation}) => ({
                  title: '내가 스크랩한 글',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="MyCommentList"
                component={MyCommentList}
                options={({navigation}) => ({
                  title: '내가 작성한 댓글',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="PostScreen"
                component={PostScreen}
                options={({navigation}) => ({
                  title: '',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="ImageViewerScreen"
                component={ImageViewerScreen}
                options={{
                  headerShown: false,
                  animation: 'fade'
                }}
              />
              {/* [F-5] 마이페이지 */}
              <Stack.Screen name="MyPageFragment" component={MyPageFragment} />
              {/* 마이페이지 - 정회원 인증 */}
              <Stack.Screen
                name="DirectionAgreeMyPage"
                component={DirectionAgreeMyPage}
                options={({navigation}) => ({
                  title: '',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.navigate('MyPage')}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              {/* 마이페이지 - 비밀번호 재설정 */}
              <Stack.Screen
                name="InputPassword"
                component={InputPassword}
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.popToTop()}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="InputNewPassword"
                component={InputNewPassword}
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.popToTop()}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="InputNewPasswordConfirm"
                component={InputNewPasswordConfirm}
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.popToTop()}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              {/* 마이페이지 - 프로필 이미지 변경 */}
              {/* 마이페이지 - 닉네임 변경 */}
              <Stack.Screen
                name="ChangeNickname"
                component={ChangeNickname}
                options={({navigation}) => ({
                  title: '',
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              {/* 마이페이지 - 소속 학과 변경 */}
              <Stack.Screen
                name="ChangeMajor"
                component={ChangeMajor}
                options={({navigation}) => ({
                  title: '',
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="DirectionAgreeScreen"
                component={DirectionAgreeScreen}
                options={({navigation}) => ({
                  title: '수정광산 이용 방향',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="QuitTermAgree"
                component={QuitTermAgree}
                options={({navigation}) => ({
                  title: '',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="QuitPassword"
                component={QuitPassword}
                options={({navigation}) => ({
                  title: '',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="QuitComplete"
                component={QuitComplete}
                options={() => ({
                  title: '',
                })}
              />
              {/* 마이페이지 - 문의하기 */}
              <Stack.Screen
                name="QuestionList"
                component={QuestionList}
                options={({navigation}) => ({
                  title: '문의하기',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="QuestionWriteScreen"
                component={QuestionWriteScreen}
                options={({navigation}) => ({
                  title: '문의하기',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.popToTop()}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.popToTop()}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="MailVerificationMethodGuide"
                component={MailVerificationMethodGuide}
                options={({navigation}) => ({
                  title: '메일 인증 방법 안내',
                  animation: 'slide_from_right',
                  headerTitleAlign: 'center',
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.goBack()}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.popToTop()}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.popToTop()}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.popToTop()}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.popToTop()}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
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
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.reset({routes: [{name: 'GlobalNavbar'}]})}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
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
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.reset({routes: [{name: 'GlobalNavbar'}]})}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              {/* [F-2 로그인] */}
              <Stack.Screen
                name="SignInId"
                component={SignInId}
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.navigate('GlobalNavbar')}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.navigate('SplashHome')
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.navigate('GlobalNavbar')}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.navigate('GlobalNavbar')}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.navigate('GlobalNavbar')}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              {/* GNB */}
              <Stack.Screen
                name="GlobalNavbar"
                component={GlobalNavbar}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="TotalSearch"
                component={TotalSearch}
                options={({navigation}) => ({
                  title: ''
                })}
              />
              <Stack.Screen
                name="TotalSearchResult"
                component={TotalSearchResult}
                options={({navigation}) => ({
                  title: ''
                })}
              />
              <Stack.Screen
                name="PostSearch"
                component={PostSearch}
                options={({navigation}) => ({
                  title: ''
                })}
              />
              <Stack.Screen
                name="PostSearchResult"
                component={PostSearchResult}
                options={({navigation}) => ({
                  title: ''
                })}
              />
              <Stack.Screen
                name="MyPostSearch"
                component={MyPostSearch}
                options={({navigation}) => ({
                  title: ''
                })}
              />
              <Stack.Screen
                name="MyPostSearchResult"
                component={MyPostSearchResult}
                options={({navigation}) => ({
                  title: ''
                })}
              />
              <Stack.Screen
                name="MyCommentSearch"
                component={MyCommentSearch}
                options={({navigation}) => ({
                  title: ''
                })}
              />
              <Stack.Screen
                name="MyCommentSearchResult"
                component={MyCommentSearchResult}
                options={({navigation}) => ({
                  title: ''
                })}
              />
              <Stack.Screen
                name="ScrapedPostSearch"
                component={ScrapedPostSearch}
                options={({navigation}) => ({
                  title: ''
                })}
              />
              <Stack.Screen
                name="ScrapedPostSearchResult"
                component={ScrapedPostSearchResult}
                options={({navigation}) => ({
                  title: ''
                })}
              />
              <Stack.Screen
                name="WikiSearchResult"
                component={WikiSearchResult}
                options={({navigation}) => ({
                  title: ''
                })}
              />
              {/* [F-7] 게시판 */}
              <Stack.Screen
                name="TermAgreeCreateBoard"
                component={TermAgreeCreateBoard}
                options={({navigation}) => ({
                  title: '',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.navigate('GlobalNavbar')}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="CreateBoard"
                component={CreateBoard}
                options={({navigation}) => ({
                  title: '게시판 생성',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="UpdateBoard"
                component={UpdateBoard}
                options={({navigation}) => ({
                  title: '게시판 수정',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="WikiTab"
                component={WikiTab}
                options={({navigation}) => ({
                  title: '성신위키',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="PostListScreen"
                component={PostListScreen}
                options={({navigation}) => ({
                  title: '',
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="PostWriteScreen"
                component={PostWriteScreen}
                options={({navigation}) => ({
                  title: '게시글 작성',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                })}
              />
              <Stack.Screen
                name="MyPostList"
                component={MyPostList}
                options={({navigation}) => ({
                  title: '내가 작성한 글',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="ScrapedPostList"
                component={ScrapedPostList}
                options={({navigation}) => ({
                  title: '내가 스크랩한 글',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="MyCommentList"
                component={MyCommentList}
                options={({navigation}) => ({
                  title: '내가 작성한 댓글',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="PostScreen"
                component={PostScreen}
                options={({navigation}) => ({
                  title: '',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="ImageViewerScreen"
                component={ImageViewerScreen}
                options={{
                  headerShown: false,
                  animation: 'fade'
                }}
              />
              {/* [F-5] 마이페이지 */}
              <Stack.Screen name="MyPageFragment" component={MyPageFragment} />
              {/* 마이페이지 - 정회원 인증 */}
              <Stack.Screen
                name="DirectionAgreeMyPage"
                component={DirectionAgreeMyPage}
                options={({navigation}) => ({
                  title: '',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.navigate('MyPage')}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              {/* 이용제한 사용자가 볼 수정광산 이용안내 */}
              <Stack.Screen
                name="InformationUse"
                component={InformationUse}
                options={({navigation}) => ({
                  title: '수정광산 이용안내',
                  headerTitleAlign: 'center',
                  animation: 'slide_from_right',
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.navigate('GlobalNavbar')}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              {/* 마이페이지 - 비밀번호 재설정 */}
              <Stack.Screen
                name="InputPassword"
                component={InputPassword}
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.navigate('GlobalNavbar')}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="InputNewPassword"
                component={InputNewPassword}
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.navigate('GlobalNavbar')}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="InputNewPasswordConfirm"
                component={InputNewPasswordConfirm}
                options={({navigation}) => ({
                  title: '',
                  animation: 'slide_from_right',
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                  headerRight: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => navigation.navigate('GlobalNavbar')}>
                      <CloseButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              {/* 마이페이지 - 프로필 이미지 변경 */}
              {/* 마이페이지 - 닉네임 변경 */}
              <Stack.Screen
                name="ChangeNickname"
                component={ChangeNickname}
                options={({navigation}) => ({
                  title: '',
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              {/* 마이페이지 - 소속 학과 변경 */}
              <Stack.Screen
                name="ChangeMajor"
                component={ChangeMajor}
                options={({navigation}) => ({
                  title: '',
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="DirectionAgreeScreen"
                component={DirectionAgreeScreen}
                options={({navigation}) => ({
                  title: '수정광산 이용 방향',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
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
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="QuitTermAgree"
                component={QuitTermAgree}
                options={({navigation}) => ({
                  title: '',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="QuitPassword"
                component={QuitPassword}
                options={({navigation}) => ({
                  title: '',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="QuitComplete"
                component={QuitComplete}
                options={() => ({
                  title: '',
                })}
              />
              {/* 마이페이지 - 문의하기 */}
              <Stack.Screen
                name="QuestionList"
                component={QuestionList}
                options={({navigation}) => ({
                  title: '문의하기',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
              />
              <Stack.Screen
                name="QuestionWriteScreen"
                component={QuestionWriteScreen}
                options={({navigation}) => ({
                  title: '문의하기',
                  headerTitleAlign: 'center',
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: 19,
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                  },
                  headerLeft: () => (
                    <TouchableHighlight
                      underlayColor="#EEEEEE"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.dispatch(CommonActions.goBack())
                      }>
                      <BackButtonIcon />
                    </TouchableHighlight>
                  ),
                })}
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
