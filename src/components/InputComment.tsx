import {
  RectangleUnchecked,
  RectangleChecked,
} from '../../resources/icon/CheckBox';
import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Dimensions,
  Platform,
} from 'react-native';
import CommentSendIcon from '../../resources/icon/CommentSendIcon';
function InputComment() {
  return (
    <View style={{flexDirection: 'row', paddingVertical: 5}}>
      <View
        style={{
          paddingHorizontal: 12,
          flexDirection: 'row',
          paddingVertical: 17,
        }}>
        <Text style={{marginRight: 5, marginLeft: 12}}>익명</Text>
        <RectangleUnchecked />
      </View>
      <View
        style={[
          styles.inputBox,
          {flexDirection: 'row', justifyContent: 'space-between'},
        ]}>
        <TextInput
          style={{fontSize: 13}}
          placeholder="댓글을 입력해 주세요."
          placeholderTextColor='#87919B'></TextInput>
        <CommentSendIcon />
      </View>
    </View>
  );
}

export default InputComment;

const styles = StyleSheet.create({
  inputBox: {
    marginBottom: 34,
    backgroundColor: '#F2F2F2',
    paddingVertical: 10,
    width: Dimensions.get('window').width - 90,
    borderRadius: 25,
    paddingLeft: 14,
    paddingRight: 5,
  },
});
