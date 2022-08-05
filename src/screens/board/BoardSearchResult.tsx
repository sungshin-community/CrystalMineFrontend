import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
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
import { SearchBoard } from '../../classes/Search';
import { fontRegular } from '../../common/font';
import BoardList from '../../components/BoardList';

type RootStackParamList = {
  PostListScreen: { boardId: number };
};
type Props = NativeStackScreenProps<RootStackParamList>;

function BoardSearchResult({ data }: any) {
  const navigation = useNavigation()

  const moveToBoard = (boardId: number) => {
    navigation.navigate('PostListScreen', {boardId: boardId});
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {data ? data.totalElements === 0 ? (
        <SafeAreaView style={styles.noResult}>
          <Text style={[fontRegular, styles.noResultText]}>
            요청하신 검색어에 대한 검색 결과가 없습니다.
          </Text>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.result}>
          <BoardList moveToBoard={moveToBoard} search items={data.content} />
        </SafeAreaView>
      ) : null}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  result: {
    width: '100%',
    flex: 1,
    backgroundColor: 'rgb(255, 255, 255)',
    marginTop: 34,
    marginLeft: 22,
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
