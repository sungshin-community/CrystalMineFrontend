import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, Pressable, View, TouchableHighlight} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {fontMedium, fontRegular} from '../../../common/font';
import RightArrow from '../../../../resources/icon/Arrow';

type RootStackParamList = {
  RequestWriteScreen: undefined;
  NoticeList: undefined;
  TermsOfService: undefined;
  OpenSourceLicense: undefined;
  UsageRestrictions: undefined;
  QuitTermAgree: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

function ListScreen({navigation}: Props) {

  return (
    <SafeAreaView style={{ backgroundColor: '#EEEEEE' }}>
      <View style={styles.versionContainer}>
        <Text style={[fontRegular, styles.menuText]}>앱 버전</Text>
        <Text style={[fontRegular, { color: '#878787', fontSize: 12, marginTop: 5}]}>1.0.0</Text>
      </View>
        <View
          style={{
            borderBottomColor: '#F0F0F0',
            borderBottomWidth: 1,
          }}
        />
      <View style={styles.menuContainer}>
        <TouchableHighlight
          underlayColor='#EEEEEE'
          onPress={() => navigation.navigate('NoticeList')}>
          <View style={styles.menu}>
            <Text style={[fontMedium, styles.menuText]}>공지사항</Text>
            <View style={styles.menuIcon}>
              <RightArrow />
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor='#EEEEEE'
          onPress={() => navigation.navigate('TermsOfService')}>
          <View style={styles.menu}>
            <Text style={[fontMedium, styles.menuText]}>서비스 이용약관</Text>
            <View style={styles.menuIcon}>
              <RightArrow />
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor='#EEEEEE'
          onPress={() => navigation.navigate('OpenSourceLicense')}>
          <View style={styles.menu}>
            <Text style={[fontMedium, styles.menuText]}>오픈소스 라이센스</Text>
            <View style={styles.menuIcon}>
              <RightArrow />
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor='#EEEEEE'
          onPress={() => navigation.navigate('UsageRestrictions')}>
          <View style={styles.menu}>
            <Text style={[fontMedium, styles.menuText]}>이용 제한 내역</Text>
            <View style={styles.menuIcon}>
              <RightArrow />
            </View>
          </View>
        </TouchableHighlight>
         <View
          style={{
            borderBottomColor: '#F0F0F0',
            borderBottomWidth: 1,
          }}
        />
        <TouchableHighlight
          underlayColor='#EEEEEE'
          onPress={() => navigation.navigate('UsageRestrictions')}>
          <View style={styles.menu}>
            <Text style={[fontMedium, styles.menuText]}>실험실</Text>
            <View style={styles.menuIcon}>
              <RightArrow />
            </View>
          </View>
        </TouchableHighlight>
      </View>
      <View style={{ padding: 8 }}/>
      <View style={{ padding: 8 }}/>
      <View style={styles.menuContainer}>
        <TouchableHighlight
          underlayColor='#EEEEEE'
          onPress={() => navigation.navigate('QuitTermAgree')}>
          <View style={styles.menu}>
            <Text style={[fontMedium, styles.menuText]}>회원 탈퇴</Text>
            <View style={styles.menuIcon}>
              <RightArrow />
            </View>
          </View>
        </TouchableHighlight>
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
  menuContainer: {paddingVertical: 12, backgroundColor: 'white'},
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
