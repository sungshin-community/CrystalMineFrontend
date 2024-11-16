import React, {useState, useRef, forwardRef, useImperativeHandle} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import PurplePostSend from '../../../resources/icon/PurplePostSend';
import PostSend from '../../../resources/icon/PostSend';
import {
  RectangleChecked,
  RectangleUnchecked,
} from '../../../resources/icon/CheckBox';
import {EmojiIcon, ClickedEmojiIcon} from '../../../resources/icon/EmojiIcon';

interface CommentInputBoxProps {
  onSubmit: (comment: string, isAnonymous: boolean) => void;
}

export interface CommentInputBoxRef {
  focusInput: () => void;
  clearInput: () => void;
}

const CommentInputBox = forwardRef(({onSubmit}: CommentInputBoxProps, ref) => {
  const [newComment, setNewComment] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
  const [emojiClicked, setEmojiClicked] = useState<boolean>(false);
  const commentInputRef = useRef<TextInput>(null);

  // ref에서 호출할 수 있는 메서드 정의
  useImperativeHandle(ref, () => ({
    focusInput: () => {
      commentInputRef.current?.focus();
    },
    clearInput: () => {
      setNewComment('');
    },
  }));

  const handleEmojiIconPress = () => {
    setEmojiClicked(!emojiClicked);
    if (!emojiClicked) {
      commentInputRef.current?.focus();
    }
  };

  const handleSubmit = () => {
    if (!newComment.trim()) {
      Toast.show('댓글을 입력해주세요.', Toast.SHORT);
      return;
    }
    onSubmit(newComment, isAnonymous);
    setNewComment('');
    setEmojiClicked(false);
    commentInputRef.current?.blur();
  };

  return (
    <View style={styles.container}>
      <View style={styles.anonymousToggleContainer}>
        <Text style={styles.anonymousText}>익명</Text>
        <Pressable
          hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
          onPress={() => setIsAnonymous(!isAnonymous)}>
          {isAnonymous ? <RectangleChecked /> : <RectangleUnchecked />}
        </Pressable>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          ref={commentInputRef}
          style={styles.input}
          placeholder="댓글을 입력해 주세요."
          placeholderTextColor="#87919B"
          multiline
          value={newComment}
          onChangeText={text => {
            setNewComment(text);
            if (text.length === 500) {
              Toast.show(
                '댓글 내용은 500글자까지만 입력 가능합니다.',
                Toast.SHORT,
              );
            }
          }}
          maxLength={500}
        />
        <Pressable style={styles.emojiIcon} onPress={handleEmojiIconPress}>
          {emojiClicked ? <ClickedEmojiIcon /> : <EmojiIcon />}
        </Pressable>
        <Pressable style={styles.submitIcon} onPress={handleSubmit}>
          {newComment.trim() ? <PurplePostSend /> : <PostSend />}
        </Pressable>
      </View>

      {emojiClicked && (
        <View style={styles.emojiPicker}>
          <View style={styles.emojiHeader}>
            <Text style={styles.emojiHeaderText}>수정광산 이모티콘</Text>
          </View>
          <View style={styles.emojiContent}>
            <Text>여기에 이모티콘</Text>
          </View>
          <View style={styles.emojiFooter}>
            <View style={styles.purchaseButton}>
              <Text style={styles.purchaseText}>이모티콘 구매하기</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    minHeight: 72,
    maxHeight: 172,
    backgroundColor: '#fff',
    borderTopColor: '#EFEFF3',
    borderTopWidth: 1,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  anonymousToggleContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  anonymousText: {
    fontSize: 14,
    marginRight: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginHorizontal: 15,
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    minHeight: 40,
    maxHeight: 230,
    color: '#222222',
  },
  emojiIcon: {
    marginLeft: 8,
  },
  submitIcon: {
    marginLeft: 8,
  },
  emojiPicker: {
    flexDirection: 'column',
    height: 291,
    borderTopWidth: 1,
    borderTopColor: '#EFEFF3',
    backgroundColor: '#fff',
  },
  emojiHeader: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  emojiHeaderText: {
    fontWeight: '400',
    fontSize: 12,
  },
  emojiContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  emojiFooter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  purchaseButton: {
    width: 134,
    height: 61,
    backgroundColor: '#A055FF',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  purchaseText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
});

export default CommentInputBox;
