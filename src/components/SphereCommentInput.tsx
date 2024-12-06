import React, {useState, useRef, forwardRef, useImperativeHandle} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Platform,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import PostSend from '../../resources/icon/PostSend';
import PurplePostSend from '../../resources/icon/PurplePostSend';
import {
  RectangleChecked,
  RectangleUnchecked,
} from '../../resources/icon/CheckBox';
import {ClickedEmojiIcon, EmojiIcon} from '../../resources/icon/EmojiIcon';
import {getMyEmoticons} from '../common/boardApi';
import EmojiPicker from './EmojiPicker';
import CloseIcon from '../../resources/icon/CloseIcon';

export interface SphereCommentInputRef {
  focusInput: () => void;
  clearInput: () => void;
}

interface SphereCommentInputProps {
  onSubmit: (
    comment: string,
    isAnonymous: boolean,
    emojiId: number | null,
  ) => void;
}

const SphereCommentInput = forwardRef(
  ({onSubmit}: SphereCommentInputProps, ref) => {
    const [newComment, setNewComment] = useState<string>('');
    const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
    const [emojiClicked, setEmojiClicked] = useState<boolean>(false);
    const [selectedEmoji, setSelectedEmoji] = useState<string>('');
    const [selectedEmojiId, setSelectedEmojiId] = useState<number | null>(null);
    const [showSelectedEmoji, setShowSelectedEmoji] = useState<boolean>(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [isPayed, setIsPayed] = useState<boolean>(false);
    const commentInputRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => ({
      focusInput: () => {
        commentInputRef.current?.focus();
      },
      clearInput: () => {
        setNewComment('');
      },
    }));

    const handleEmojiSelect = (emoji: {imageUrl: string; id: number}) => {
      setSelectedEmoji(emoji.imageUrl);
      setSelectedEmojiId(emoji.id);
      setShowSelectedEmoji(true);
    };

    const handleEmojiIconPress = async () => {
      try {
        setEmojiClicked(prev => {
          const nextClickedState = !prev;
          setShowEmojiPicker(nextClickedState);
          if (!nextClickedState) {
            commentInputRef.current?.focus();
          } else {
            commentInputRef.current?.blur();
          }
          return nextClickedState;
        });

        if (!emojiClicked) {
          const emoticons = await getMyEmoticons();
          if (emoticons?.status === 200) {
            if (emoticons?.data.length === 0) {
              setIsPayed(false);
            } else {
              setIsPayed(true);
            }
          }
        }
      } catch (error) {
        console.error('이모티콘 조회 실패', error);
      }
    };

    const handleSubmit = () => {
      if (!newComment.trim() && !selectedEmojiId) {
        Toast.show('내용을 입력하거나 이모티콘을 선택해주세요.', Toast.SHORT);
        return;
      }
      onSubmit(newComment, isAnonymous, selectedEmojiId);
      setNewComment('');
      setShowSelectedEmoji(false);
      setSelectedEmoji('');
      setSelectedEmojiId(null);
    };

    const handleEmojiClose = () => {
      setShowSelectedEmoji(false);
      setSelectedEmoji('');
      setSelectedEmojiId(null);
    };

    return (
      <>
        {showSelectedEmoji && selectedEmoji && (
          <View style={styles.selectedEmojiContainer}>
            <Image source={{uri: selectedEmoji}} style={styles.selectedEmoji} />
            <TouchableOpacity
              style={{position: 'absolute', top: 0, right: 0, margin: 16}}
              onPress={handleEmojiClose}>
              <CloseIcon />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.commentWriteWrapper}>
          <View
            style={{
              flexDirection: 'column',
            }}>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 5,
                backgroundColor: 'white',
                zIndex: 99999,
              }}>
              <View
                style={{
                  position: 'relative',
                  justifyContent: 'flex-end',
                  backgroundColor: '#fff',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginRight: 12,
                    marginLeft: 12,
                    marginVertical: 25,
                    backgroundColor: '#fff',
                  }}>
                  <Text
                    style={{
                      color: '#3A424E',
                      fontWeight: '500',
                      fontSize: 12,
                      marginRight: 5,
                    }}>
                    익명
                  </Text>
                  <Pressable
                    hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
                    onPress={() => setIsAnonymous(!isAnonymous)}>
                    {isAnonymous ? (
                      <RectangleChecked />
                    ) : (
                      <RectangleUnchecked />
                    )}
                  </Pressable>
                </View>
              </View>

              <View
                style={[
                  styles.inputBox,
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    position: 'relative',
                  },
                ]}>
                <TextInput
                  ref={commentInputRef}
                  placeholder="댓글을 입력해 주세요."
                  placeholderTextColor="#87919B"
                  multiline
                  value={newComment}
                  autoCorrect={false}
                  style={styles.input}
                  onChangeText={text => {
                    setNewComment(text);
                    if (text.length === 500) {
                      Toast.show(
                        '댓글 내용은 500글자까지만 입력 가능합니다.',
                        Toast.SHORT,
                      );
                    }
                  }}
                  onFocus={() => {
                    if (showEmojiPicker) {
                      setShowEmojiPicker(false);
                      setEmojiClicked(false);
                    }
                  }}
                  maxLength={500}
                />
                <View style={{marginBottom: 10}}>
                  <TouchableOpacity onPress={handleEmojiIconPress}>
                    {emojiClicked ? <ClickedEmojiIcon /> : <EmojiIcon />}
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  position: 'relative',
                  alignItems: 'flex-end',
                  marginBottom: 15,
                  marginRight: 12,
                  marginLeft: 12,
                }}>
                <Text>
                  <Pressable
                    style={{
                      paddingBottom: Platform.OS === 'ios' ? 3 : 5,
                      bottom: 0,
                    }}
                    onPress={handleSubmit}>
                    {newComment || showSelectedEmoji ? (
                      <PurplePostSend />
                    ) : (
                      <PostSend />
                    )}
                  </Pressable>
                </Text>
              </View>
            </View>
          </View>

          {showEmojiPicker && (
            <View style={styles.emojiPickerContainer}>
              <EmojiPicker
                visible={showEmojiPicker}
                onClose={() => setShowEmojiPicker(showEmojiPicker)}
                onEmojiSelect={handleEmojiSelect}
                isPayed={isPayed}
                setIsPayed={setIsPayed}
              />
            </View>
          )}
        </View>
      </>
    );
  },
);

const styles = StyleSheet.create({
  input: {
    fontSize: 14,
    width: Dimensions.get('window').width - 175,
    paddingTop: Platform.OS == 'ios' ? 13 : 10,
    lineHeight: 20,
    minHeight: 40,
    maxHeight: 230,
    color: '#222222',
    fontWeight: '400',
  },
  inputBox: {
    backgroundColor: '#F6F6F6',
    width: Dimensions.get('window').width - 125,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  selectedEmojiContainer: {
    left: 0,
    right: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(206, 207, 214, 0.4)',
    zIndex: 10000,
    padding: 10,
  },
  selectedEmoji: {
    width: 80,
    height: 80,
  },
  commentWriteWrapper: {
    borderTopWidth: 1,
    borderTopColor: '#EFEFF3',
    backgroundColor: 'white',
  },
  emojiPickerContainer: {
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

export default SphereCommentInput;
