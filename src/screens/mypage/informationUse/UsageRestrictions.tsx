import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, Pressable, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {fontBold, fontMedium, fontRegular} from '../../../common/font';

type RootStackParamList = {
  Announcement: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

function UsageRestrictions({navigation}: Props) {
  return (
    <SafeAreaView style={{backgroundColor: '#E5E5E5'}}>
      <View style={styles.menuContainer}>
          <View style={[styles.menu]}>
            <Text style={[fontRegular, styles.boardName]}>
               ㅇㅇ게시판
            </Text>
            <View style={styles.menuIcon}>
              <Text  style={[
              fontRegular,
              styles.blindDate,
            ]}>2021.12.27</Text>
            </View>
          </View>
          <View style={[styles.menu, {marginTop: 5}]}>
            <Text style={[fontBold, styles.blindTitle]}>
               댓글 블라인드
            </Text>
            <View style={styles.menuIcon}>
              <Text  style={[
              fontRegular,
              styles.points,
            ]}>-300 points</Text>
            </View>
          </View>
          <Text
            style={[
              fontRegular,
              styles.blindReason
            ]}>
            블라인드 사유 : 애교어 사용
          </Text>
      </View>
      <View
        style={{
          borderBottomColor: '#F0F0F0',
          borderBottomWidth: 1,
        }}
      />
            <View style={styles.menuContainer}>
          <View style={[styles.menu]}>
            <Text style={[fontRegular, styles.boardName]}>
               ㅇㅇ게시판
            </Text>
            <View style={styles.menuIcon}>
              <Text  style={[
              fontRegular,
              styles.blindDate,
            ]}>2021.12.27</Text>
            </View>
          </View>
          <View style={[styles.menu, {marginTop: 5}]}>
            <Text style={[fontBold, styles.blindTitle]}>
               댓글 블라인드
            </Text>
            <View style={styles.menuIcon}>
              <Text  style={[
              fontRegular,
              styles.points,
            ]}>-300 points</Text>
            </View>
          </View>
          <Text
            style={[
              fontRegular,
              styles.blindReason
            ]}>
            블라인드 사유 : 애교어 사용
          </Text>
      </View>
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  menuContainer: {paddingVertical: 24, backgroundColor: 'white', paddingHorizontal: 32},
  menuIcon: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  menu: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  boardName: {
    fontSize: 13,
    color: '#222222'
  },
  blindDate: {
    color: '#6E7882', fontSize: 12
  },
  blindTitle: {
    color: '#222222', fontSize: 15
  }, 
  points: {
    color: '#A055FF', fontSize: 13
  },
  blindReason: {
color: '#6E7882', fontSize: 13, marginTop: 12,
  }
});

export default UsageRestrictions;
