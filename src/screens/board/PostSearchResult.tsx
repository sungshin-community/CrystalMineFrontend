import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import {PostContentDto, SearchPostDto} from '../../classes/SearchDto';
import {fontRegular} from '../../common/font';
import SearchResultPostItem from '../../components/SearchResultPostItem';

interface Props {
  data: SearchPostDto | undefined;
}

function PostSearchResult({data}: Props) {
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
              {data?.content.map((post: PostContentDto) => (
                <SearchResultPostItem content={post} />
              ))}
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
    paddingBottom: 100,
  },
});

export default PostSearchResult;
