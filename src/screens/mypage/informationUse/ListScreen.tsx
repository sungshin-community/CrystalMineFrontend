import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, Pressable, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {fontMedium, fontRegular} from '../../../common/font';
import RightArrow from '../../../../resources/icon/Arrow';

type RootStackParamList = {
  RequestWriteScreen: undefined;
  AnnouncementList: undefined;
  TermsOfService: undefined;
  UsageRestrictions: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

function ListScreen({navigation}: Props) {

  return (
    <SafeAreaView style={{ backgroundColor: '#EEEEEE' }}>
      <View style={styles.versionContainer}>
        <Text style={[fontRegular, styles.menuText]}>앱 버전</Text>
        <Text style={[fontRegular, { color: '#878787', fontSize: 12, marginTop: 5}]}>1.2.0</Text>
      </View>
        <View
          style={{
            borderBottomColor: '#F0F0F0',
            borderBottomWidth: 1,
          }}
        />
      <View style={styles.menuContainer}>
        <Pressable hitSlop={{top: 16}}
         onPress={() => navigation.navigate('AnnouncementList')}>
          <View style={styles.menu}>
            <Text style={[fontMedium, styles.menuText]}>공지사항</Text>
            <View style={styles.menuIcon}>
              <RightArrow />
            </View>
          </View>
        </Pressable>
        <Pressable
          hitSlop={{bottom: 16}}
          onPress={() => navigation.navigate('TermsOfService')}>
          <View style={styles.menu}>
            <Text style={[fontMedium, styles.menuText]}>서비스 이용약관</Text>
            <View style={styles.menuIcon}>
              <RightArrow />
            </View>
          </View>
        </Pressable>
        <Pressable
          hitSlop={{bottom: 16}}
          onPress={() => navigation.navigate('RequestWriteScreen')}>
          <View style={styles.menu}>
            <Text style={[fontMedium, styles.menuText]}>오픈소스 라이센스</Text>
            <View style={styles.menuIcon}>
              <RightArrow />
            </View>
          </View>
        </Pressable>
      </View>
      <View style={{ padding: 8 }}/>
      <View style={styles.menuContainer}>
        <Pressable hitSlop={{ top: 16 }}
          onPress={() => navigation.navigate('UsageRestrictions')}>
          <View style={styles.menu}>
            <Text style={[fontMedium, styles.menuText]}>이용 제한 내역</Text>
            <View style={styles.menuIcon}>
              <RightArrow />
            </View>
          </View>
        </Pressable>
        <Pressable
          hitSlop={{bottom: 16}}
          onPress={() => navigation.navigate('RequestWriteScreen')}>
          <View style={styles.menu}>
            <Text style={[fontMedium, styles.menuText]}>회원 탈퇴</Text>
            <View style={styles.menuIcon}>
              <RightArrow />
            </View>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  versionContainer: {
    paddingVertical: 22,
    backgroundColor: 'white',
    paddingLeft: 32,
  },
  menuContainer: {paddingVertical: 16, backgroundColor: 'white'},
  menuIcon: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    paddingRight: 31,
  },
  menu: {
    flexDirection: 'row',
    paddingVertical: 11,
    paddingLeft: 32,
    alignItems: 'center',
  },
  menuText: {
    fontSize: 15,
  },
});

export default ListScreen;
