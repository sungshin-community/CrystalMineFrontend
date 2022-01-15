import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function SearchTab() {
  return (
    <View style={styles.container}>
      <View style={styles.tab}>
        <Text style={styles.title}>게시글</Text>
        <View style={styles.tabUnderBar}>
          <Selected />
        </View>
      </View>
      <Text style={styles.title}>게시판 이름</Text>
      <Text style={styles.title}>태그</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
  },
  tab: {
    alignItems: 'center',
    position: 'relative',
  },
  tabUnderBar: {
    position: 'absolute',
    bottom: -4,
  },
  title: {
    paddingTop: 24,
    paddingBottom: 12,
    fontFamily: 'SpoqaHanSansNeo-Regular',
    fontSize: 14,
    color: '#717171',
  },
});

export default SearchTab;

import Svg, {Rect} from 'react-native-svg';

const Selected = (props: any) => (
  <Svg
    width={24}
    height={8}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect width={24} height={8} rx={4} fill="#A055FF" />
  </Svg>
);
