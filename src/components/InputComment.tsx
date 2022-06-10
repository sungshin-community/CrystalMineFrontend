import {
  RectangleUnchecked,
  RectangleChecked,
} from '../../resources/icon/CheckBox';
import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Dimensions,
  Platform,
  Pressable,
} from 'react-native';
import CommentSendIcon from '../../resources/icon/CommentSendIcon';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useCallback} from 'react';

interface Props {
  postId?: any;
  onClick?: any;
}
function InputComment({postId, onClick}: Props) {
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [content, setContent] = useState<string>();

  const onSubmit = useCallback(
    () => {
      onClick(postId, content, isAnonymous);
      setContent('');
    },
    [onClick, content],
  );
  return (
    <View style={{flexDirection: 'row', paddingVertical: 5, paddingBottom: 30}}>
      <View
        style={{
          flexDirection: 'row',
          width: 83,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{marginRight: 5}}>익명</Text>
        <Pressable
          hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
          onPress={() => setIsAnonymous(!isAnonymous)}>
          {isAnonymous ? <RectangleChecked /> : <RectangleUnchecked />}
        </Pressable>
      </View>
      <View
        style={[
          styles.inputBox,
          {flexDirection: 'row', justifyContent: 'space-between'},
        ]}>
        <TextInput
          placeholder="댓글을 입력해 주세요."
          placeholderTextColor="#87919B"
          multiline={true}
          onChangeText={value => {
            setContent(value);
          }}
          style={[styles.input, {textAlignVertical: 'center'}]}></TextInput>
        <Text>
          {content && (
            <Pressable
              style={{paddingVertical: 5}}
              onPress={() => {
                onSubmit();
              }}>
              <CommentSendIcon />
            </Pressable>
          )}
        </Text>
      </View>
    </View>
  );
}

export default InputComment;

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: '#F2F2F2',
    width: Dimensions.get('window').width - 90,
    borderRadius: 25,
    paddingLeft: 14,
    paddingRight: 5,
  },
  input: {
    fontSize: 13,
    width: Dimensions.get('window').width - 150,
    paddingTop: Platform.OS === 'ios' ? 14 : 10,
  },
});
