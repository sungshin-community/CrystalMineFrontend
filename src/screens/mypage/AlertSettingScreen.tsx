import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from 'react-native';

import {
  AlertOffIcon,
  AlertOnIcon,
} from '../../../resources/icon/AlertSettingIcon';
import WaterMark from '../../components/WaterMark';

import {UserAlertSetting} from '../../classes/User';
import {logout} from '../../common/authApi';
import {changeAlertSettings, getAlertSettings} from '../../common/myPageApi';
import {useIsFocused} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  unsubscribeTopic,
  unsubscribeChTopic,
  topicTokenLogic,
} from '../../common/util/pushRegisterUtil';

type RootStackParamList = {};
type ScreenProps = NativeStackScreenProps<RootStackParamList>;

export default function AlertSettingScreen({navigation}: ScreenProps) {
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const [settings, setSettings] = useState<UserAlertSetting>({
    allSetting: true,
    comment: true,
    hotBoard: true,
    notice: true,
    chNotice: true,
    verification: true,
    chat: true,
  });

  useEffect(() => {
    async function getSettings() {
      setIsLoading(true);
      const response = await getAlertSettings();
      if (response.status === 401) {
        setTimeout(function () {
          Toast.show(
            '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
            Toast.SHORT,
          );
        }, 100);
        logout();
        navigation.reset({routes: [{name: 'SplashHome'}]});
      } else if (response.status === 'OK') {
        // console.log('data!!!!!!!!!!!!!!!!', response.data); TODO: 새로 들어온 속성 여기서 확인
        setSettings(response.data);
        setIsLoading(false);
      } else {
        setIsError(true);
      }
    }

    if (isFocused) {
      getSettings();
    }
  }, [isFocused]);

  const onPress = async (value: string) => {
    console.log('clicked!');
    if (value === 'notice' && settings.notice) {
      unsubscribeTopic();
    } else if (value === 'notice' && !settings.notice) {
      topicTokenLogic(2);
    } else if (value === 'chNotice' && settings.chNotice) {
      unsubscribeChTopic();
    } else if (value === 'chNotice' && !settings.chNotice) {
      topicTokenLogic(1);
    }
    const changedStat = await changeAlertSettings(value, !settings[value]);

    if (changedStat.status === 'OK') {
      setSettings(changedStat.data);
    } else {
      setTimeout(function () {
        Toast.show('알림 설정 중 오류가 발생했습니다.', Toast.SHORT);
      }, 100);
    }
  };

  return (
    <View style={{flex: 1}}>
      <WaterMark />
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}>
        <ActivityIndicator
          size="large"
          color={'#A055FF'}
          animating={isLoading}
          style={{zIndex: 100}}
        />
      </View>

      <View
        style={[
          styles.menuContainer,
          {
            borderBottomWidth: 16,
          },
        ]}>
        <View style={styles.menu}>
          <Text style={styles.menuText}>모든 푸시 알림</Text>
          <Pressable
            style={styles.toggleButton}
            onPress={() => onPress('allSetting')}>
            {settings.allSetting ? <AlertOnIcon /> : <AlertOffIcon />}
          </Pressable>
        </View>
      </View>
      <View
        style={[
          styles.menuContainer,
          {
            borderBottomWidth: 1,
          },
        ]}>
        <Text style={styles.menuTitle}>활동 알림</Text>
        <View style={styles.menu}>
          <Text style={styles.menuText}>댓글 알림</Text>
          <Pressable
            style={styles.toggleButton}
            onPress={() => onPress('comment')}>
            {settings.comment ? <AlertOnIcon /> : <AlertOffIcon />}
          </Pressable>
        </View>
        <View style={styles.menu}>
          <Text style={styles.menuText}>HOT 게시판 전송 알림</Text>
          <Pressable
            style={styles.toggleButton}
            onPress={() => onPress('hotBoard')}>
            {settings.hotBoard ? <AlertOnIcon /> : <AlertOffIcon />}
          </Pressable>
        </View>
        <View style={styles.menu}>
          <Text style={styles.menuText}>쪽지 알림</Text>
          <Pressable
            style={styles.toggleButton}
            onPress={() => onPress('chat')}>
            {settings.chat ? <AlertOnIcon /> : <AlertOffIcon />}
          </Pressable>
        </View>
      </View>
      <View style={styles.menuContainer}>
        <Text style={styles.menuTitle}>공식 알림</Text>
        <View style={styles.menu}>
          <Text style={styles.menuText}>인증일 알림</Text>
          <Pressable
            style={styles.toggleButton}
            onPress={() => onPress('verification')}>
            {settings.verification ? <AlertOnIcon /> : <AlertOffIcon />}
          </Pressable>
        </View>
        <View style={styles.menu}>
          <Text style={styles.menuText}>수정광산 공지사항 알림</Text>
          <Pressable
            style={styles.toggleButton}
            onPress={() => onPress('notice')}>
            {settings.notice ? <AlertOnIcon /> : <AlertOffIcon />}
          </Pressable>
        </View>
        <View style={styles.menu}>
          <Text style={styles.menuText}>총학생회 긴급 공지사항 알림</Text>
          <Pressable
            style={styles.toggleButton}
            onPress={() => onPress('chNotice')}>
            {settings.chNotice ? <AlertOnIcon /> : <AlertOffIcon />}
          </Pressable>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    height: 40,
    paddingHorizontal: 24,
  },
  menuTitle: {
    flexDirection: 'row',
    alignItems: 'center',

    height: 28,
    fontSize: 12,
    paddingHorizontal: 24,
    color: '#9DA3AB',
    fontFamily: 'SpoqaHanSansNeo-Regular',
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222222',
    fontFamily: 'SpoqaHanSansNeo-Regular',
  },
  menuContainer: {
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#EEEEEE',
  },
  toggleButton: {
    width: 68,
    height: 38,
    marginRight: -14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
