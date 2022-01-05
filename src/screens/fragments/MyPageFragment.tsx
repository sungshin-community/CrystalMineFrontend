import React, {useState} from 'react';
import {SafeAreaView, ScrollView, Text, View, Switch, TouchableHighlight, StyleSheet} from 'react-native';
import RightArrow from '../../../resources/icon/Arrow';
import DefaultProfile from '../../../resources/icon/DefaultProfile';
import QuestionMark from '../../../resources/icon/QuestionMark';
import { PurpleRoundButton } from '../../components/Button';

const styles = StyleSheet.create({
  menu: {
    height: 49,
    flexDirection: 'row',
    paddingHorizontal: 32,
    alignItems: 'center'
  },
  menuTitle: {
    fontSize: 13,
    fontWeight: '400',
    color: '#878787'
  },
  menuText: {
    fontSize: 15,
    fontWeight: '400'
  }

});

const MyPageFragment = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [allowAlert, setAllowAlert] = useState<boolean>(false);
  const [allowMessage, setAllowMessage] = useState<boolean>(false);
  return (
    <SafeAreaView style={{backgroundColor: '#F4F4F4'}}>
      <ScrollView>
        <View>
          <View style={{height: 136, flexDirection: 'row', backgroundColor: '#FFFFFF', paddingLeft: 24, paddingTop: 16}}>
            <DefaultProfile />
            <View style={{flex: 1}}>
              <View style={{flexDirection: 'row', paddingLeft: 24, alignItems: 'center'}}>
                <Text style={{fontSize: 18, fontWeight: '800'}}>초롱춘식</Text>
                <View style={{flexDirection: 'row', flex: 1, paddingRight: 32, justifyContent: 'flex-end'}}><RightArrow /></View>
              </View>
              <Text style={{marginLeft: 24, marginTop: 6, color: '#767676'}}>컴퓨터공학과</Text>
              <View style={{flexDirection: 'row', paddingLeft: 24, paddingTop: 24,  alignItems: 'center'}}>
                <View style={{backgroundColor: '#A055FF', width: 16, height: 16, borderRadius: 8}}></View>
                <Text style={{color: '#A055FF', fontWeight: '700', fontSize: 15, marginLeft: 4}}>LV.2</Text>
                <View style={{ width: 44, height: 16, marginLeft: 8, backgroundColor: '#F4F4F4', borderRadius: 16, flexDirection: 'row', justifyContent: 'center'}}>
                  <Text style={{fontSize: 12, fontWeight: '700', color: '#A055FF'}}>161p</Text>
                </View>
                <View style={{flexDirection: 'row', flex: 1, paddingRight: 32, justifyContent: 'flex-end'}}><QuestionMark /></View>
              </View>
            </View>
          </View>
          <View style={{marginTop: 16, backgroundColor: '#FFFFFF', height: 353}}>
            <View style={styles.menu}>
              <Text style={styles.menuTitle}>보안 및 인증</Text>
            </View>
            <TouchableHighlight>
              <View style={styles.menu}>
                <Text style={{fontSize: 15, fontWeight: '400'}}>정회원 인증하기</Text>
                <View style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
                  <Text style={{color: '#A3A3A3', fontSize: 12}}>20161259@sungshin.ac.kr</Text>
                </View>
              </View>
            </TouchableHighlight>
            <TouchableHighlight>
              <View style={styles.menu}>
                <Text style={{fontSize: 15, fontWeight: '400'}}>비밀번호 재설정</Text>
                <View style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
                  <RightArrow />
                </View>
              </View>
            </TouchableHighlight>
            <View style={[styles.menu, {marginTop: 6}]}>
              <Text style={styles.menuTitle}>앱 설정</Text>
            </View>
            <View style={styles.menu}>
              <Text style={{fontSize: 15, fontWeight: '400'}}>다크 모드</Text>
              <View style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
                <Switch trackColor={{false: '#C4C4C4', true: '#A055FF'}} thumbColor={'#FFFFFF'} onValueChange={() => setIsDarkMode(!isDarkMode)} value={isDarkMode} />
              </View>
            </View>
            <View style={styles.menu}>
              <Text style={styles.menuText}>알림 설정</Text>
              <View style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
              <Switch trackColor={{false: '#C4C4C4', true: '#A055FF'}} thumbColor={'#FFFFFF'} onValueChange={() => setAllowAlert(!allowAlert)} value={allowAlert} />
              </View>
            </View>
            <View style={styles.menu}>
              <Text style={styles.menuText}>쪽지 설정</Text>
              <View style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
              <Switch trackColor={{false: '#C4C4C4', true: '#A055FF'}} thumbColor={'#FFFFFF'} onValueChange={() => setAllowMessage(!allowMessage)} value={allowMessage} />
              </View>
            </View>
            
          </View>
          <TouchableHighlight>
            <View style={{marginTop: 16, backgroundColor: '#FFFFFF'}}>
              <View style={[styles.menu, {height: 51}]}>
                <Text style={styles.menuText}>이용 안내</Text>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight>
            <View style={{marginTop: 16, backgroundColor: '#FFFFFF'}}>
              <View style={[styles.menu, {height: 51}]}>
                <Text style={styles.menuText}>문의하기</Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>
        <View style={{paddingVertical: 24, alignItems: 'center'}}>
          <PurpleRoundButton text='로그아웃' />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyPageFragment;
