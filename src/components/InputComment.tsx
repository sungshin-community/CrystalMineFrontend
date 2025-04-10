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
import Toast from 'react-native-simple-toast';

interface Props {
  postId?: any;
  parentId?: number;
  onClickAddComment?: any;
  isRecomment?: boolean;
  onClickAddRecomment: any;
  content: string;
  setContent: any;
}
function InputComment({
  postId,
  parentId,
  onClickAddComment,
  isRecomment,
  onClickAddRecomment,
  content,
  setContent,
}: Props) {
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
  const onSubmit = useCallback(() => {
    console.log('익명여부', isAnonymous);
    if (isRecomment)
      onClickAddRecomment(postId, parentId, content, isAnonymous);
    else onClickAddComment(postId, content, isAnonymous);
  }, [onClickAddComment, content]);

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 5,
        paddingBottom: Platform.OS === 'ios' ? 40 : 10,
      }}>
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
            if (value.length === 500)
              Toast.show(
                '댓글 내용은 500글자까지만 입력 가능합니다.',
                Toast.SHORT,
              );
          }}
          value={content}
          autoCorrect={false}
          style={[styles.input]}
          maxLength={500}
        />
        <View style={{flexDirection: 'column', justifyContent: 'flex-end'}}>
          <Text>
            {content && (
              <Pressable
                style={{
                  paddingBottom: Platform.OS === 'ios' ? 3 : 5,
                  bottom: 0,
                }}
                onPress={() => {
                  onSubmit();
                }}></Pressable>
            )}
          </Text>
        </View>
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
    paddingVertical: 5,
    paddingTop: Platform.OS == 'ios' ? 13 : 0,
    minHeight: 44,
    maxHeight: 230,
    color: '#222222',
    lineHeight: 22.5,
  },
});
