import React, {useState, useEffect} from 'react';
import {
  NativeModules,
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Switch,
  TouchableHighlight,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from 'react-native';
import RightArrow from '../../../resources/icon/Arrow';
import DefaultProfile from '../../../resources/icon/DefaultProfile';
import QuestionMark from '../../../resources/icon/QuestionMark';
import {setDefaultProfileImage, getUser, uploadProfileImage} from '../../common/myPageApi';
import {PurpleRoundButton} from '../../components/Button';
import User from '../../classes/User';
import {ModalBottom} from '../../components/ModalBottom';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {logout} from '../../common/authApi';
import PointIcon from '../../../resources/icon/PointIcon';
import ImagePicker, { launchImageLibrary } from 'react-native-image-picker';
import { useIsFocused } from "@react-navigation/native";
import ExclamationMark from '../../../resources/icon/ExclamationMark';
import Toast from 'react-native-simple-toast';
import { getHundredsDigit } from '../../common/util/statusUtil';
import Error from '../../components/Error';
import { fontRegular } from '../../common/font';
import WaterMark from '../../components/WaterMark';
import messaging from '@react-native-firebase/messaging';

const styles = StyleSheet.create({
  menu: {
    height: 45,
    flexDirection: 'row',
    paddingLeft: 33,
    paddingRight: 25,
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 13,
    fontFamily: 'SpoqaHanSansNeo-Regular',
    color: '#6E7882',
    marginLeft: 32,
    marginBottom: 11
  },
  menuText: {
    fontSize: 15,
    fontFamily: 'SpoqaHanSansNeo-Regular',
    color: '#222222'
  },
});

type RootStackParamList = {
  SplashHome: undefined;
  UncertifiedMember: undefined;
  CertifiedMember: undefined;
  InputPassword: {username: string};
  ChangeNickname: undefined,
  ChangeMajor: undefined,
  ExpiredMember: undefined;
  QuestionList: undefined;
  ListScreen: undefined;
  DirectionAgreeScreen: undefined;
  AlertSetting: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;

const MyPageFragment = ({navigation}: Props) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [allowAlert, setAllowAlert] = useState<boolean>(false);
  const [allowMessage, setAllowMessage] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [profileModalVisible, setProfileModalVisible] =
    useState<boolean>(false);
  const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [isInited, setIsInited] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const [errorStatus, setErrorStatus] = useState<number>();
  
  useEffect(() => {
    async function getUserInfo() {
      if (!isInited) {
        setIsLoading(true);
      }
      const userDto = await getUser();
      console.log(userDto.data)
      if (userDto.status === 401) {
        setTimeout(function () {
          Toast.show('토큰 정보가 만료되어 로그인 화면으로 이동합니다', Toast.SHORT);
        }, 100);
        logout();
        navigation.reset({routes: [{name: 'SplashHome'}]});
      }
      else if (getHundredsDigit(userDto.status) === 2) {
        setUser(userDto.data.data);
      }
      else {
        setErrorStatus(userDto.status);
        setIsError(true);
      }
      
      if (!isInited) {
        setIsLoading(false);
        setIsInited(true);
      }
    }
    if (isFocused) {
      getUserInfo();
    }
  }, [navigation, isFocused]);
  
  return (
    isError ? <Error status={errorStatus} code={'M001'} /> :
      <>
    <WaterMark/>
    <SafeAreaView style={{backgroundColor: '#F4F4F4'}}>
      <View style={{position: 'absolute', alignItems: 'center', justifyContent: 'center', left: 0, right: 0, top: 0, bottom: 0}}>
        <ActivityIndicator size="large" color={'#A055FF'} animating={isLoading} style={{zIndex: 100}} />
      </View>
      <ScrollView>
        <View>
          {!isInited ? skeletonComponent : <View
            style={{
              height: 160,
              flexDirection: 'row',
              backgroundColor: '#FFFFFF',
              paddingLeft: 35,
              paddingTop: 20,
            }}
          >
            {user?.profileImage ?
            <Image style={{width: 80, height: 80, borderRadius: 10}} source={{uri: user?.profileImage}} /> : <DefaultProfile />}
            <View style={{height: 80}}>
              <View style={{marginLeft: 18, marginRight: 24, borderBottomColor: '#EEEEEE', borderBottomWidth: 1, height: 80 }}>
                <Text style={{color: '#6E7882', fontSize: 13, fontFamily: 'SpoqaHanSansNeo-Regular'}}>
                  {user?.department}
                </Text>
                <Text style={{marginTop: 3, fontSize: 17, fontFamily: 'SpoqaHanSansNeo-Bold', marginBottom: Platform.OS === 'ios' ? 5 : 0}}>
                  {user?.nickname}
                </Text>
                <Text style={{marginBottom: 11, color: '#6E7882', fontSize: 15, fontFamily: 'SpoqaHanSansNeo-Regular'}}>
                  {user?.username}@sungshin.ac.kr
                </Text>
              </View>
              <View style={{marginLeft: 19, marginTop: 12, flexDirection: 'row', alignItems: 'center'}}>
                <PointIcon />
                <Text style={{marginLeft: 8, fontSize: 17, color: '#A055FF', fontFamily: 'SpoqaHanSansNeo-Bold'}}>{user?.point}</Text>
              </View>
            </View>
          </View>}
          {user && (user?.expireIn <= 0 || !user?.expireIn) && (user?.role !== '블랙리스트') &&
            <TouchableOpacity onPress={() => {if(!user.expireIn) navigation.navigate('UncertifiedMember');else if (user.expireIn <= 0) navigation.navigate('ExpiredMember');}}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 20,
                  marginHorizontal: 24,
                  paddingLeft: 18,
                  height: 70,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 20,
                  alignItems: 'center'
                }}
              >
                <ExclamationMark style={{ marginRight: 10 }} />
                <View>
                  <Text style={{ color: '#222222', fontSize: 15, fontFamily: 'SpoqaHanSansNeo-Regular' }}>정회원 인증이 필요해요!</Text>
                  <Text style={{ color: '#6E7882', fontSize: 13, fontFamily: 'SpoqaHanSansNeo-Regular' }}>정회원 인증하기</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    paddingRight: 16
                  }}
                >
                  <RightArrow />
                </View>
              </View>
            </TouchableOpacity>}
          <View
            style={{marginTop: 16, backgroundColor: '#FFFFFF', paddingBottom: 9, paddingTop: 28, borderBottomColor: '#EEEEEE', borderBottomWidth: 1}}>
            <Text style={styles.menuTitle}>보안 및 인증</Text>
            <TouchableHighlight
              underlayColor='#EEEEEE'
              onPress={() => {
                
                if (user) {
                    if (!user?.expireIn) {
                      navigation.navigate('UncertifiedMember');
                    } else if (user?.expireIn > 0) {
                      navigation.navigate('CertifiedMember');
                    } else {
                      navigation.navigate('ExpiredMember');
                    }
                }
              }}>
              <View style={styles.menu}>
                <Text style={styles.menuText}>
                  정회원 인증하기
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                  }}>
                  <Text style={{color: '#6E7882', fontSize: 15, fontFamily: 'SpoqaHanSansNeo-Regular', marginRight: 9}}>
                    {user?.authenticatedDate}
                  </Text>
                  <RightArrow />
                </View>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor='#EEEEEE' onPress={()=> navigation.navigate('InputPassword', {username: user?.username})}>
              <View style={styles.menu}>
                <Text style={styles.menuText}>
                  비밀번호 재설정
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'flex-end',
                  }}>
                  <RightArrow />
                </View>
              </View>
            </TouchableHighlight>
            {/* <View style={[styles.menu, {marginTop: 6}]}>
              <Text style={styles.menuTitle}>앱 설정</Text>
            </View>
            <View style={styles.menu}>
              <Text style={styles.menuText}>다크 모드</Text>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'flex-end',
                }}>
                <Switch
                  trackColor={{false: '#C4C4C4', true: '#A055FF'}}
                  thumbColor={'#FFFFFF'}
                  onValueChange={() => setIsDarkMode(!isDarkMode)}
                  value={isDarkMode}
                />
              </View>
            </View>
            <View style={styles.menu}>
              <Text style={styles.menuText}>쪽지 설정</Text>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'flex-end',
                }}>
                <Switch
                  trackColor={{false: '#C4C4C4', true: '#A055FF'}}
                  thumbColor={'#FFFFFF'}
                  onValueChange={() => setAllowMessage(!allowMessage)}
                  value={allowMessage}
                />
              </View>
            </View> */}
            </View>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                paddingBottom: 20,
                paddingTop: 27,
                borderBottomColor: '#EEEEEE',
                borderBottomWidth: 1,
              }}>
              <Text style={styles.menuTitle}>회원 정보 등록 및 수정</Text>
              <TouchableHighlight
                underlayColor="#EEEEEE"
                onPress={() => setProfileModalVisible(true)}>
                <View style={styles.menu}>
                  <Text style={styles.menuText}>프로필 이미지 변경</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}>
                    <RightArrow />
                  </View>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor="#EEEEEE"
                onPress={() => {
                  navigation.navigate('ChangeNickname');
                }}>
                <View style={styles.menu}>
                  <Text style={styles.menuText}>닉네임 변경</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      justifyContent: 'flex-end',
                    }}>
                    <RightArrow />
                  </View>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor="#EEEEEE"
                onPress={() => {
                  navigation.navigate('ChangeMajor');
                }}>
                <View style={styles.menu}>
                  <Text style={styles.menuText}>소속 학과 변경</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      justifyContent: 'flex-end',
                    }}>
                    <RightArrow />
                  </View>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor="#EEEEEE"
                onPress={() => {
                  navigation.navigate('ReplaceEmail');
                }}>
                <View style={styles.menu}>
                  <Text style={styles.menuText}>대체 이메일 관리</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      justifyContent: 'flex-end',
                    }}>
                    <RightArrow />
                  </View>
                </View>
              </TouchableHighlight>
            </View>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                paddingBottom: 20,
                paddingTop: 27,
              }}>
              <Text style={styles.menuTitle}>앱설정</Text>
              <TouchableHighlight
                underlayColor="#EEEEEE"
                onPress={async () => {
                  const enabled = await messaging().hasPermission();
                  if (enabled) {
                    navigation.navigate('AlertSetting');
                  } else {
                    setAlertModalVisible(true);
                  }
                }}>
                <View style={styles.menu}>
                  <Text style={styles.menuText}>푸시 알림 설정</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}>
                    <RightArrow />
                  </View>
                </View>
              </TouchableHighlight>
            </View>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                paddingBottom: 18,
                paddingTop: 20,
                marginTop: 16,
                borderBottomColor: '#F6F6F6',
                borderBottomWidth: 1,
              }}>
              <TouchableHighlight
                underlayColor="#EEEEEE"
                onPress={() => {
                  navigation.navigate('DirectionAgreeScreen');
                }}>
                <View style={styles.menu}>
                  <Text style={styles.menuText}>수정광산 이용 방향</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}>
                    <RightArrow />
                  </View>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor="#EEEEEE"
                onPress={() => {
                  navigation.navigate('ListScreen');
                }}>
                <View style={styles.menu}>
                  <Text style={styles.menuText}>이용안내</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}>
                    <RightArrow />
                  </View>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor="#EEEEEE"
                onPress={() => {
                  navigation.navigate('QuestionList');
                }}>
                <View style={styles.menu}>
                  <Text style={styles.menuText}>문의하기</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      justifyContent: 'flex-end',
                    }}>
                    <RightArrow />
                  </View>
                </View>
              </TouchableHighlight>
            </View>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                paddingBottom: 20,
                paddingTop: 10,
              }}>
              <TouchableHighlight
                underlayColor="#EEEEEE"
                onPress={() => setModalVisible(true)}>
                <View style={styles.menu}>
                  <Text style={styles.menuText}>로그아웃</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}></View>
                </View>
              </TouchableHighlight>
            </View>
            {/* <Text style={[fontRegular, {textAlign: 'center', color: '#D0D0D0', paddingVertical: 30}]}>
                Salty Lab | contact@crystalmine.kr
              </Text> */}
        </View>
        {/* <View style={{paddingVertical: 24, alignItems: 'center'}}>
          <PurpleRoundButton
            text="로그아웃"
            onClick={() => {
              setModalVisible(true);
            }}
          />
        </View> */}
          <ModalBottom
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            content="로그아웃 하시겠습니까?"
            purpleButtonText="확인"
            purpleButtonFunc={async () => {
              await logout();
              navigation.reset({routes: [{name: 'SplashHome'}]});
            }}
            whiteButtonText="취소"
            whiteButtonFunc={() => setModalVisible(false)}
          />
          <ModalBottom
            modalVisible={profileModalVisible}
            setModalVisible={setProfileModalVisible}
            title="프로필 사진 변경"
            purpleButtonText="앨범에서 이미지 선택"
            purpleButtonFunc={async () => {
              setProfileModalVisible(false);
              launchImageLibrary(
                {mediaType: 'photo', maxWidth: 512, maxHeight: 512},
                async res => {
                  if (res.didCancel) {
                    return;
                  }
                  let response = await uploadProfileImage(res.assets[0]);
                  if (response.code === 'UPDATE_PROFILE_IMAGE_SUCCESS') {
                    setUser(response.data);
                    setTimeout(function () {
                      Toast.show(
                        '프로필 이미지가 성공적으로 변경되었습니다.',
                        Toast.SHORT,
                      );
                    }, 100);
                  } else {
                    setTimeout(function () {
                      Toast.show(
                        '프로필 이미지 변경에 실패했습니다.',
                        Toast.SHORT,
                      );
                    }, 100);
                  }
                },
              );
            }}
            whiteButtonText="기본 이미지로 변경"
            whiteButtonFunc={async () => {
              let response = await setDefaultProfileImage();
              setUser(response.data.data);
              setProfileModalVisible(false);
              setTimeout(function () {
                Toast.show(
                  '프로필 이미지가 성공적으로 변경되었습니다.',
                  Toast.SHORT,
                );
              }, 100);
            }}
          />
          <ModalBottom
            modalVisible={alertModalVisible}
            setModalVisible={setAlertModalVisible}
            content={
              '알림 설정을 위해\n기기의 [설정] - [수정광산]에서\n알림을 허용해 주세요.'
            }
            purpleButtonText="확인"
            purpleButtonFunc={async () => {
              if (Platform.OS === 'ios') {
                Linking.openURL('App-Prefs:root');
              } else {
                if (NativeModules.OpenExternalURLModule) {
                  NativeModules.OpenExternalURLModule.linkAndroidSettings();
                }
              }
              setAlertModalVisible(false);
            }}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const skeletonComponent = (
  <View
    style={{
      height: 160,
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      paddingLeft: 35,
      paddingTop: 20,
    }}>
    <DefaultProfile />
    <View style={{height: 80}}>
      <View
        style={{
          marginLeft: 18,
          marginRight: 24,
          borderBottomColor: '#EEEEEE',
          borderBottomWidth: 1,
          height: 80,
        }}>
        <View
          style={{
            height: 15,
            width: 72,
            backgroundColor: '#E1E4EA',
            marginTop: 2,
          }}></View>
        <View
          style={{
            height: 20,
            width: 137,
            backgroundColor: '#E1E4EA',
            marginTop: 8,
          }}></View>
        <View
          style={{
            height: 15,
            width: 186,
            backgroundColor: '#E1E4EA',
            marginTop: 8,
          }}></View>
      </View>
      <View
        style={{
          marginLeft: 19,
          marginTop: 12,
          height: 20,
          width: 100,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#E1E4EA',
        }}></View>
    </View>
  </View>
);

export default MyPageFragment;
