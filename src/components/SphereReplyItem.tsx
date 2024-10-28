import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import HeartIcon from '../../resources/icon/HeartIcon';
import ChatIcon from '../../resources/icon/ChatIcon';
import ThumbNone, {ThumbFill} from '../../resources/icon/ThumbIcon';
import SelectBottomSheet from './SelectBottomSheet';

interface SphereReplyItemProps {
  isQuestion?: boolean;
  isReply?: boolean;
  time: string;
  replyCount?: number;
  reply: {
    content: string;
    authorDepartment: string;
    authorJob: string;
    authorYear: number;
    emoticonUrl?: string | null; // 처리 수정
    likeCount: number;
    liked: boolean;
    nickname: string;
    profileImageUrl: string;
    ptCommentId: number;
    selected?: boolean;
  };
}

export default function SphereItem({
  isQuestion = false,
  isReply = false,
  time,
  replyCount,
  reply,
}: SphereReplyItemProps) {
  const {
    content,
    authorDepartment,
    authorJob,
    authorYear,
    emoticonUrl,
    likeCount,
    liked,
    nickname,
    profileImageUrl,
    ptCommentId,
    selected,
  } = reply;

  const [isLiked, setIsLiked] = useState(liked);
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);
  const [popVisible, setPopVisible] = useState(false);

  const handleLikePress = () => {
    setIsLiked(!isLiked);
    setCurrentLikeCount(isLiked ? currentLikeCount - 1 : currentLikeCount + 1);
  };

  const handleOpenPop = () => {
    setPopVisible(true);
  };

  const handleSelect = () => {
    setPopVisible(false);
  };

  return (
    <View style={[{flexDirection: 'row'}, {marginLeft: isReply ? 32 : 0}]}>
      <Image
        source={{uri: profileImageUrl}}
        style={[
          {borderRadius: 12, marginRight: 8},
          {width: isReply ? 20 : 24, height: isReply ? 20 : 24},
        ]}
        resizeMode="cover"
      />
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
                  color: nickname === '글쓴이' ? '#A055FF' : '#3A424E',
                }}>
                {nickname}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#B9BAC1',
                  fontWeight: '500',
                }}>
                // time 함수 필요
              </Text>
            </View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                color: '#89919A',
              }}>
              {authorDepartment} · {authorJob} · {authorYear}
              // 비공개 함수 처리
            </Text>
          </View>
          <Text>threedots</Text>
        </View>

        {emoticonUrl && (
          <Image
            source={{uri: emoticonUrl}}
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
          {content}
        </Text>

        <View style={{flexDirection: 'row', marginTop: 8}}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={handleLikePress}>
            <HeartIcon
              fill={isLiked ? '#FF6376' : 'white'}
              stroke={isLiked ? '#FF6376' : '#9DA4AB'}
            />
            <Text style={styles.footerText}>좋아요 {currentLikeCount}</Text>
          </TouchableOpacity>
          {!isReply && (
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <ChatIcon />
              <Text style={styles.footerText}>대댓글 {replyCount}</Text>
            </TouchableOpacity>
          )}
          {isQuestion && (
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={handleOpenPop}>
              {selected ? <ThumbFill /> : <ThumbNone />}
              <Text
                style={{
                  marginLeft: 4,
                  fontWeight: '500',
                  fontSize: 13,
                  color: '#A055FF',
                }}>
                {selected ? '채택된 답변' : '채택하기'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <SelectBottomSheet
        onSelect={handleSelect}
        sheetVisible={popVisible}
        setSheetVisible={setPopVisible}
        reply={{
          profileImageUrl: '',
          nickname: '기연',
          authorDepartment: '컴퓨터공학과',
          authorJob: '프로그래밍',
          authorYear: '1년차',
          content: '전 채택될겁니다.',
        }}
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

// threedots 연결
// 머지 후 토스트 연결
