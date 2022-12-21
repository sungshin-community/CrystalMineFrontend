import React from 'react'
import {
    Text,
    View,
    StyleSheet,
  } from 'react-native';

import {AlertOffIcon, AlertOnIcon} from '../../../resources/icon/AlertSettingIcon';

export default function AlertSettingScreen() {
  return (
    <View>
        <View
            style={{backgroundColor: '#FFFFFF', paddingBottom: 20, paddingTop: 27, borderBottomColor: '#EEEEEE', borderBottomWidth: 16}}>
              <View style={styles.menu}>
                <Text style={styles.menuText}>
                  모든 푸시 알림
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                  }}>
                </View>
                <AlertOffIcon/>
              </View>
          </View>
          <View
            style={{backgroundColor: '#FFFFFF', paddingBottom: 20, paddingTop: 27, borderBottomColor: '#EEEEEE', borderBottomWidth: 1}}>
            <Text style={styles.menuTitle}>활동 알림</Text>
              <View style={styles.menu}>
                <Text style={styles.menuText}>
                  댓글 알림
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                  }}>
                </View>
                <AlertOffIcon/>
              </View>
              <View style={styles.menu}>
                <Text style={styles.menuText}>
                  HOT 게시판 전송 알림
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'flex-end',
                  }}>
                </View>
                <AlertOnIcon/>
              </View>
          </View>
          <View
            style={{backgroundColor: '#FFFFFF', paddingBottom: 20, paddingTop: 27}}>
            <Text style={styles.menuTitle}>공식 알림</Text>
              <View style={styles.menu}>
                <Text style={styles.menuText}>
                  인증일 알림
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'flex-end',
                  }}>
                </View>
                <AlertOffIcon/>
              </View>
              <View style={styles.menu}>
                <Text style={styles.menuText}>
                  새 공지사항 업로드 알림
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'flex-end',
                  }}>
                </View>
                <AlertOffIcon/>
              </View>
          </View>
    </View>
  )
}
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