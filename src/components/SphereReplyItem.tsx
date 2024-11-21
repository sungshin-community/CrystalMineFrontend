import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import HeartIcon from '../../resources/icon/HeartIcon';
import ChatIcon from '../../resources/icon/ChatIcon';
import ThumbNone, {ThumbFill} from '../../resources/icon/ThumbIcon';
import SelectBottomSheet from './SelectBottomSheet';
import SpinningThreeDots from './SpinningThreeDots';
import {pantheonComment} from '../classes/Pantheon';

interface SphereReplyItemProps {
  reply: pantheonComment;
  handleLikePress: (isLiked: boolean, ptCommentId: number) => void;
  isQuestion?: boolean;
  isReply?: boolean;
  postIsSelected?: boolean;
  handleReplyClick?: () => void;
  handleAdoptComment?: (ptCommentId: number, comment: pantheonComment) => void;
}

export default function SphereItem({
  reply,
  handleLikePress,
  isQuestion = false,
  isReply = false,
  postIsSelected = false,
  handleReplyClick,
  handleAdoptComment,
}: SphereReplyItemProps) {
  const [popVisible, setPopVisible] = useState(false);
  const [popComment, setPopComment] = useState<pantheonComment | undefined>(
    undefined,
  );

  const handleOpenPop = () => {
    setPopVisible(true);
    setPopComment(reply);
  };

  const handleSelect = () => {
    setPopVisible(false);
    handleAdoptComment && handleAdoptComment(reply.ptCommentId, reply);
  };

  return (
    <View style={[{flexDirection: 'row'}, {marginLeft: isReply ? 32 : 0}]}>
      {reply.profileImageUrl && (
        <Image
          source={{uri: reply.profileImageUrl}}
          style={[
            {borderRadius: 12, marginRight: 8},
            {width: isReply ? 20 : 24, height: isReply ? 20 : 24},
          ]}
          resizeMode="cover"
        />
      )}
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 2,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  marginRight: 6,
                  fontWeight: '600',
                  color: reply.displayName.includes('글쓴이')
                    ? '#A055FF'
                    : '#3A424E',
                }}>
                {reply.displayName}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#B9BAC1',
                  fontWeight: '500',
                }}>
                {reply.createdAt}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                color: '#89919A',
              }}>
              {reply.isBlind
                ? '비공개'
                : `${reply.authorDepartment} · ${reply.authorJob} · ${
                    reply.authorYear === 0 ? '신입' : `${reply.authorYear}년`
                  }`}
            </Text>
          </View>
          <SpinningThreeDots
            isMine={reply.isOfReader}
            handleOptionModeIsMineComponent={<></>}
            handleDefaultModeComponent={<></>}
            isGrey={true}
            boardId={3}
          />
        </View>

        {reply.emoticonUrl && (
          <Image
            source={{uri: reply.emoticonUrl}}
            style={{
              marginTop: 10,
              width: 100,
              height: 100,
            }}
            resizeMode="cover"
          />
        )}

        <Text
          style={{
            fontSize: 14,
            fontWeight: '400',
            color: '#222222',
            marginTop: 8,
          }}>
          {reply.content}
        </Text>

        <View style={{flexDirection: 'row', marginTop: 8}}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => handleLikePress(reply.isLiked, reply.ptCommentId)}>
            <HeartIcon
              fill={reply.isLiked ? '#FF6376' : 'white'}
              stroke={reply.isLiked ? '#FF6376' : '#9DA4AB'}
            />
            <Text style={styles.footerText}>좋아요 {reply.likeCount}</Text>
          </TouchableOpacity>
          {!isReply && reply.reComments && (
            <TouchableOpacity
              onPress={handleReplyClick}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <ChatIcon />
              <Text style={styles.footerText}>
                대댓글 {reply.reComments.length}
              </Text>
            </TouchableOpacity>
          )}
          {isQuestion && !postIsSelected && (
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={handleOpenPop}>
              <ThumbNone />
              <Text
                style={{
                  marginLeft: 4,
                  fontWeight: '500',
                  fontSize: 13,
                  color: '#A055FF',
                }}>
                채택하기
              </Text>
            </TouchableOpacity>
          )}

          {isQuestion && reply.isSelected && (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <ThumbFill />
              <Text
                style={{
                  marginLeft: 4,
                  fontWeight: '500',
                  fontSize: 13,
                  color: '#A055FF',
                }}>
                채택된 답변
              </Text>
            </View>
          )}
        </View>
      </View>
      <SelectBottomSheet
        onSelect={handleSelect}
        sheetVisible={popVisible}
        setSheetVisible={setPopVisible}
        reply={popComment as pantheonComment}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  footerText: {
    marginLeft: 4,
    fontWeight: '500',
    fontSize: 13,
    color: '#9DA4AB',
    marginRight: 12,
  },
});
