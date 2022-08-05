import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import {PostContent} from '../../classes/Search';
import {fontRegular} from '../../common/font';
import PostSearchItem from '../../components/PostSearchItem';

function PostSearchResult({data}: any) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.noResult}>
        {data ? (
          data.totalElements === 0 ? (
            <Text style={[fontRegular, styles.noResultText]}>
              요청하신 검색어에 대한 검색 결과가 없습니다.
            </Text>
          ) : (
            <ScrollView style={{ backgroundColor: '#fff'}}>
              {data.content.map((item: PostContent, index: number) => (
                <PostSearchItem key={index} post={item} />
              ))}
            </ScrollView>
          )
        ) : null}
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
    alignItems: 'center',
  },
  noResultText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#6E7882',
  },
});

export default PostSearchResult;
