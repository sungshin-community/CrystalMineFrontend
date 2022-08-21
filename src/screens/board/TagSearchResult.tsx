import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import NotFoundSuryong from '../../../resources/icon/custom/NotFoundSuryong';
import {fontRegular} from '../../common/font';

function TagSearchResult() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Image
        style={{
          width: 150,
          height: 150,
        }}
        source={require('../../../resources/images/NoComment.png')}
        />
      <Text style={[fontRegular, styles.text]}>
        현재 개발 중인 기능입니다.{'\n'}
        추후 기능 개발 후 사용하실 수 있습니다.
      </Text>
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
    marginTop: 20,
    paddingBottom: '30%',
  },
});

export default TagSearchResult;
