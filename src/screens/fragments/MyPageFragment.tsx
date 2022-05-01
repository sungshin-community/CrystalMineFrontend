import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Switch,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
} from 'react-native';
import RightArrow from '../../../resources/icon/Arrow';
import DefaultProfile from '../../../resources/icon/DefaultProfile';
import QuestionMark from '../../../resources/icon/QuestionMark';
import {getUser, uploadProfileImage} from '../../common/myPageApi';
import {PurpleRoundButton} from '../../components/Button';
import User from '../../classes/User';
import {ModalBottom} from '../../components/ModalBottom';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {logout} from '../../common/authApi';
import PointIcon from '../../../resources/icon/PointIcon';
import ImagePicker, { launchImageLibrary } from 'react-native-image-picker';
import { useIsFocused } from "@react-navigation/native";
import ExclamationMark from '../../../resources/icon/ExclamationMark';

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
  InpuPassword: undefined;
  ChangeNickname: undefined,
  ChangeMajor: undefined,
  ExpiredMember: undefined;
  RequestScreen: undefined;
  ListScreen: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;

const MyPageFragment = ({navigation}: Props) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [allowAlert, setAllowAlert] = useState<boolean>(false);
  const [allowMessage, setAllowMessage] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [profileModalVisible, setProfileModalVisible] = useState<boolean>(false);
  const [user, setUser] = useState<User>();

  const isFocused = useIsFocused();

  useEffect(() => {
    async function getUserInfo() {
      const userDto = await getUser();
      setUser(userDto);
    }
    if (isFocused) {
      getUserInfo();
    }
  }, [navigation, isFocused]);

  return (
    <SafeAreaView style={{backgroundColor: '#F4F4F4'}}>
      <ScrollView>
        <View>
          <View
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
                <Text style={{marginTop: 3, fontSize: 17, fontFamily: 'SpoqaHanSansNeo-Bold'}}>
                  {user?.nickname}
                </Text>
                <Text style={{marginBottom: 11, color: '#6E7882', fontSize: 15, fontFamily: 'SpoqaHanSansNeo-Regular'}}>
                  {`${user?.username}@sungshin.ac.kr`}
                </Text>
              </View>
              <View style={{marginLeft: 19, marginTop: 12, flexDirection: 'row', alignItems: 'center'}}>
                <PointIcon />
                <Text style={{marginLeft: 8, fontSize: 17, color: '#A055FF', fontFamily: 'SpoqaHanSansNeo-Bold'}}>{user?.point}</Text>
              </View>
            </View>
          </View>
          {user?.expireIn && user?.expireIn <= 0 && <View 
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
            <ExclamationMark style={{marginRight: 10}} />
            <View>
              <Text style={{color: '#222222', fontSize: 15, fontFamily: 'SpoqaHanSansNeo-Regular'}}>정회원 인증이 필요해요!</Text>
              <Text style={{color: '#6E7882', fontSize: 13, fontFamily: 'SpoqaHanSansNeo-Regular'}}>정회원 인증하기</Text>
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
          </View>}
          <View
            style={{marginTop: 16, backgroundColor: '#FFFFFF', paddingBottom: 9, paddingTop: 28, borderBottomColor: '#EEEEEE', borderBottomWidth: 1}}>
            <Text style={styles.menuTitle}>보안 및 인증</Text>
            <TouchableWithoutFeedback
              onPress={() => {
                if (user) {
                  if (user.isAuthenticated === true) {
                    if (user?.expireIn === 0) {
                      navigation.navigate('ExpiredMember');
                    } else if (user?.expireIn > 0) {
                      navigation.navigate('CertifiedMember');
                    } else {
                      navigation.navigate('UncertifiedMember');
                    }
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
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={()=> navigation.navigate('InpuPassword')}>
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
            </TouchableWithoutFeedback>
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
              <Text style={styles.menuText}>알림 설정</Text>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'flex-end',
                }}>
                <Switch
                  trackColor={{false: '#C4C4C4', true: '#A055FF'}}
                  thumbColor={'#FFFFFF'}
                  onValueChange={() => setAllowAlert(!allowAlert)}
                  value={allowAlert}
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
            style={{backgroundColor: '#FFFFFF', paddingBottom: 20, paddingTop: 27}}>
            <Text style={styles.menuTitle}>회원 정보 등록 및 수정</Text>
            <TouchableWithoutFeedback onPress={() => setProfileModalVisible(true)}>
              <View style={styles.menu}>
                <Text style={styles.menuText}>
                  프로필 이미지 변경
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                  }}>
                  <RightArrow />
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => {navigation.navigate('ChangeNickname')}}>
              <View style={styles.menu}>
                <Text style={styles.menuText}>
                  닉네임 변경
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
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => {navigation.navigate('ChangeMajor')}}>
              <View style={styles.menu}>
                <Text style={styles.menuText}>
                  소속 학과 변경
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
            </TouchableWithoutFeedback>
          </View>
          <View
            style={{backgroundColor: '#FFFFFF', paddingBottom: 18, paddingTop: 20, marginTop: 16, borderBottomColor: '#F6F6F6', borderBottomWidth: 1}}>
            <TouchableWithoutFeedback onPress={() => {navigation.navigate('ListScreen')}}>
              <View style={styles.menu}>
                <Text style={styles.menuText}>
                  이용안내
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                  }}>
                  <RightArrow />
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View style={styles.menu}>
                <Text style={styles.menuText}>
                  문의하기
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
            </TouchableWithoutFeedback>
          </View>
          <View
            style={{backgroundColor: '#FFFFFF', paddingBottom: 20, paddingTop: 10, marginBottom: 16}}>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
              <View style={styles.menu}>
                <Text style={styles.menuText}>
                  로그아웃
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                  }}>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
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
          modalText="로그아웃 하시겠습니까?"
          modalBody=""
          modalButtonText="확인"
          modalButton
          modalButtonFunc={async () => {
            await logout();
            navigation.reset({routes: [{name: 'SplashHome'}]});
          }}
          isSecondButton={true}
          modalSecondButtonText="취소"
          modalSecondButtonFunc={() => setModalVisible(false)}
        />
        <ModalBottom
          modalVisible={profileModalVisible}
          setModalVisible={setProfileModalVisible}
          modalText="프로필 사진 변경"
          modalBody=""
          modalButtonText="앨범에서 이미지 선택"
          modalButton
          modalButtonFunc={async () => {
            launchImageLibrary(
              {mediaType: 'photo', maxWidth: 512, maxHeight: 512},
              res => {
                if (res.didCancel) {
                  return;
                }
                console.log('image', res);
                let result = uploadProfileImage(res.assets[0]);
              },
            );
          }}
          isSecondButton={true}
          modalSecondButtonText="기본 이미지로 변경"
          modalSecondButtonFunc={() => setProfileModalVisible(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyPageFragment;
