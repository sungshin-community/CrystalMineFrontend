import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import {fontRegular} from '../../common/font';

function TagSearchResult() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView>
        <Text style={[fontRegular, styles.text]}>
          현재 개발 중인 기능입니다.{'\n'}
          추후 기능 개발 후 사용하실 수 있습니다.
        </Text>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f6',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    lineHeight: 22.5,
    color: '#6E7882',
    textAlign: 'center',
    paddingBottom: 150,
  },
});

export default TagSearchResult;
