import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, Pressable, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {fontBold, fontMedium, fontRegular} from '../../../common/font';

type RootStackParamList = {
  Announcement: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

function AnnouncementList({navigation}: Props) {
  return (
    <SafeAreaView style={{backgroundColor: '#E5E5E5'}}>
      <View style={styles.menuContainer}>
        <Pressable hitSlop={{top: 16}} onPress={() => navigation.navigate('Announcement')}>
          <View style={styles.menu}>
            <Text style={[fontRegular, styles.menuText]}>
              공지사항 게시글 제목 01
            </Text>
            <View style={styles.menuIcon}>
              <Text style={[fontBold, {color:'#FF6060', fontSize: 13}]}>N</Text>
            </View>
          </View>
          <Text
            style={[
              fontRegular,
              {color: '#ADB3BC', fontSize: 12, marginTop: 8},
            ]}>
            2001.01.01
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          borderBottomColor: '#F0F0F0',
          borderBottomWidth: 1,
        }}
      />
      <View style={styles.menuContainer}>
        <Pressable hitSlop={{top: 16}} onPress={() => navigation.navigate('Announcement')}>
          <View style={styles.menu}>
            <Text style={[fontRegular, styles.menuText]}>
              공지사항 게시글 제목 01
            </Text>
            <View style={styles.menuIcon}>
              <Text style={[fontBold, {color:'#FF6060', fontSize: 13}]}>N</Text>
            </View>
          </View>
          <Text
            style={[
              fontRegular,
              {color: '#ADB3BC', fontSize: 12, marginTop: 8},
            ]}>
            2001.01.01
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  menuContainer: {paddingVertical: 16, backgroundColor: 'white',  paddingLeft: 24,},
  menuIcon: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    paddingRight: 31,
  },
  menu: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  menuText: {
    fontSize: 15,
    color: '#222222'
  },
});

export default AnnouncementList;
