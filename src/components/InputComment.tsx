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
import {addComment} from '../common/boardApi';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  PostScreen: {postId: number; boardName: string};
};
type Props = NativeStackScreenProps<RootStackParamList>;

function InputComment(postId: any, onChange: any) {
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [content, setContent] = useState<string>();

  const addCommentFunc = async (
    postId: number,
    newComment: string,
    isAnonymous: boolean,
  ) => {
    const result = await addComment(postId, newComment, isAnonymous);
    if (result) {
      console.log('댓글 추가 성공');
    }
  };

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
        {content && (
          <Text>
            <Pressable
              style={{paddingVertical: 5}}
              onPress={ ()=>
                // addCommentFunc(postId.postId, content, isAnonymous);
                onChange
              
              }>
              <CommentSendIcon />
            </Pressable>
          </Text>
        )}
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
