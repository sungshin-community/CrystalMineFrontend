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
import {getHundredsDigit} from '../../common/util/statusUtil';

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
    verification: true,
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
      } else if (getHundredsDigit(response.status) === 2) {
        setSettings(response.data);
        setIsLoading(false);
      } else {
        setIsError(true);
      }
    }

    // if (isFocused) {
    //   getSettings();
    // }
  }, [isFocused]);

  const getKeyByValue = (obj: UserAlertSetting, value: boolean) => {
    let count: number = 0;
    Object.keys(obj).forEach(key => {
      if (key !== 'allSetting' && obj[key] === value) {
        count++;
      }
    });
    return count;
  };

  const onPress = (value: string) => {
    console.log('clicked!');
    // changeAlertSettings(value, !settings[value]);
    setSettings(prevState => {
      let obj = Object.assign({}, prevState);
      obj[value] = !settings[value];
      obj.allSetting = getKeyByValue(obj, false) > 0 ? false : true;
      return obj;
    });
  };

  const onAllPress = () => {
    // changeAlertSettings('allSetting', !settings.allSetting);
    if (settings.allSetting) {
      setSettings({
        allSetting: false,
        comment: false,
        hotBoard: false,
        notice: false,
        verification: false,
      });
    } else {
      setSettings({
        allSetting: true,
        comment: true,
        hotBoard: true,
        notice: true,
        verification: true,
      });
    }
  };

  return (
    <View style={{flex: 1}}>
      <WaterMark />
      {/* <View
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
      </View> */}

      <View
        style={[
          styles.menuContainer,
          {
            borderBottomWidth: 16,
          },
        ]}>
        <View style={styles.menu}>
          <Text style={styles.menuText}>모든 푸시 알림</Text>
          <Pressable style={styles.toggleButton} onPress={onAllPress}>
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
          <Text style={styles.menuText}>새 공지사항 업로드 알림</Text>
          <Pressable
            style={styles.toggleButton}
            onPress={() => onPress('notice')}>
            {settings.notice ? <AlertOnIcon /> : <AlertOffIcon />}
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
