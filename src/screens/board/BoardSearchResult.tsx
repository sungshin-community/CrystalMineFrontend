import React from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SearchBoard} from '../../classes/Search';
import {fontRegular} from '../../common/font';

function BoardSearchResult({data}: any) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.noResult}>
        {console.log('BoardSearchResult data : ', data)}
        {data?.totalElements === 0 ? (
          <Text style={[fontRegular, styles.noResultText]}>
            요청하신 검색어에 대한 검색 결과가 없습니다.
          </Text>
        ) : (
          <ScrollView>
            <Text>하는 중 ...</Text>
          </ScrollView>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  noResult: {
    width: '100%',
    flex: 1,
    backgroundColor: 'rgb(244, 244, 244)',
    justifyContent: 'center',
  },
  noResultText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
    color: '#6E7882',
  },
});

export default BoardSearchResult;
