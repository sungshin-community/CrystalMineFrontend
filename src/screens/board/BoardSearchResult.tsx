import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import {SearchBoardDto} from '../../classes/SearchDto';
import {fontRegular} from '../../common/font';
import SearchResultBoardItem from '../../components/SearchResultBoardItem';

interface Props {
  data: SearchBoardDto;
}

function BoardSearchResult({data}: Props) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.noResult}>
        {data.totalElements === 0 ? (
          <Text style={[fontRegular, styles.noResultText]}>
            요청하신 검색어에 대한 검색 결과가 없습니다.
          </Text>
        ) : (
          data.content.map(
            (item: {
              id: number;
              name: string;
              introduction: string;
              isOwner: boolean;
              isPinned: boolean;
            }) => {
              <SearchResultBoardItem item={item} />;
            },
          )
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
    paddingBottom: 100,
  },
});

export default BoardSearchResult;
