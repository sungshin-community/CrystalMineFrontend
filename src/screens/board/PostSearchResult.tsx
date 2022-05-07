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
import {ContentPreviewDto} from '../../classes/BoardDetailDto';
import {fontRegular} from '../../common/font';
import PostItem from '../../components/PostItem';

function PostSearchResult({data}) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.noResult}>
        {console.log('PostSearchResult data : ', data)}
        {typeof data === undefined ? (
          data?.totalElements === 0 ? (
            <Text style={[fontRegular, styles.noResultText]}>
              요청하신 검색어에 대한 검색 결과가 없습니다.
            </Text>
          ) : (
            <ScrollView>
              <PostItem post={data} />
            </ScrollView>
          )
        ) : (
          <Text style={[fontRegular, styles.noResultText]}>
            요청하신 검색어에 대한 검색 결과가 없습니다.
          </Text>
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
    alignItems: 'center',
  },
  noResultText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#6E7882',
  },
});

export default PostSearchResult;
