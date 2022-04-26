import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, Pressable, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {fontBold, fontMedium, fontRegular} from '../../../common/font';

type RootStackParamList = {
  Announcement: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

function Announcement({navigation}: Props) {
  return (
    <SafeAreaView style={{backgroundColor: '#E5E5E5'}}>
      <View style={styles.container}>
        <Pressable
          hitSlop={{top: 16}}
          onPress={() => navigation.navigate('Announcement')}>
          <View style={styles.titleContainer}>
            <Text style={[fontRegular, styles.title]}>
              공지사항 게시글 제목 01
            </Text>
            <View style={styles.newIcon}>
              <Text style={[fontBold, {color: '#FF6060', fontSize: 13}]}>
                N
              </Text>
            </View>
          </View>
          <Text>
            위하여 들어 풀이 가슴에 날카로우나 약동하다. 우리는 이상을 스며들어
            내려온 교향악이다. 창공에 생생하며, 이상이 피가 가진 곳이
            아름다우냐? 생명을 날카로우나 놀이 인간에 지혜는 방지하는 역사를
            온갖 봄바람이다. 우리는 찾아다녀도, 않는 있는 없으면 봄바람이다.
            소담스러운 찾아다녀도, 보이는 따뜻한 미인을 청춘의 사막이다. 밝은
            그들은 길을 가진 맺어, 예가 모래뿐일 풀이 있다. 우리 그들의 그들을
            우리의 아니더면, 보라. 갑 방지하는 만물은 몸이 길을 곳이 우리
            쓸쓸하랴? 보는 하여도 청춘의 있을 예수는 설레는 앞이 듣는다.
          </Text>
          <Text
            style={[
              fontRegular,
              {color: '#ADB3BC', fontSize: 12, marginTop: 12},
            ]}>
            2001.01.01
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {paddingVertical: 16, backgroundColor: 'white', paddingHorizontal: 24},
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 16
  },
  newIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
  title: {
    fontSize: 15,
    color: '#222222',
  },
});

export default Announcement;
