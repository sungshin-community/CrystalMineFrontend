import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Switch,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import RightArrow from '../../../resources/icon/Arrow';
import DefaultProfile from '../../../resources/icon/DefaultProfile';
import QuestionMark from '../../../resources/icon/QuestionMark';
import {getUser} from '../../common/myPageApi';
import {PurpleRoundButton} from '../../components/Button';
import User from '../../classes/User';
import {ModalBottom} from '../../components/ModalBottom';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {logout} from '../../common/authApi';
import PointIcon from '../../../resources/icon/PointIcon';

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
  ChangeNickname: undefined,
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
  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function getUserInfo() {
      const userDto = await getUser();
      setUser(userDto);
    }
    getUserInfo();
  }, []);

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
            <DefaultProfile />
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
                <Text style={{marginLeft: 8, fontSize: 17, color: '#A055FF', fontFamily: 'SpoqaHanSansNeo-Bold'}}>161</Text>
              </View>
            </View>
          </View>
          <View
            style={{marginTop: 16, backgroundColor: '#FFFFFF', paddingBottom: 9, paddingTop: 28, borderBottomColor: '#EEEEEE', borderBottomWidth: 1}}>
            <Text style={styles.menuTitle}>보안 및 인증</Text>
            <TouchableHighlight underlayColor="#ffffff" onPress={() => navigation.navigate('CertifiedMember')}>
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
                    2022.01.26
                  </Text>
                  <RightArrow />
                </View>
              </View>
            </TouchableHighlight>
            <TouchableHighlight>
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
            <TouchableHighlight onPress={() => {}}>
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
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {navigation.navigate('ChangeNickname')}}>
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
            </TouchableHighlight>
            <TouchableHighlight>
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
            </TouchableHighlight>
          </View>
          <View
            style={{backgroundColor: '#FFFFFF', paddingBottom: 18, paddingTop: 20, marginTop: 16, borderBottomColor: '#F6F6F6', borderBottomWidth: 1}}>
            <TouchableHighlight onPress={() => {}}>
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
            </TouchableHighlight>
            <TouchableHighlight>
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
            </TouchableHighlight>
          </View>
          <View
            style={{backgroundColor: '#FFFFFF', paddingBottom: 20, paddingTop: 10, marginBottom: 16}}>
            <TouchableHighlight onPress={() => setModalVisible(true)}>
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
            </TouchableHighlight>
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
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyPageFragment;
