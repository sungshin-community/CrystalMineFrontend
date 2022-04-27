import React from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SearchBoard} from '../../classes/Search';

interface Props {
  data: SearchBoard[];
}

function BoardSearchResult({data}: Props) {
  // totalElements가 0이면 검색 결과가 없는 것
  // data 받아와야 하는데 ... ... ...
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView>
        <Text>BoardSearchResult</Text>
        {/* <FlatList data={data} renderItem={} /> */}
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
});

export default BoardSearchResult;
