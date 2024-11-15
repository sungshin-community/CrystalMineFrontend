import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import HeartIcon from '../../resources/icon/HeartIcon';
import ChatIcon from '../../resources/icon/ChatIcon';
import ThumbNone, {ThumbFill} from '../../resources/icon/ThumbIcon';
import SelectBottomSheet from './SelectBottomSheet';
import SpinningThreeDots from './SpinningThreeDots';
import {BigPostComment} from '../../resources/icon/PostComment';
import {BlackMessageIcon} from '../../resources/icon/Message';

interface SphereReplyItemProps {
  handleClick?: () => void;
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
    isOfReader?: boolean;
    displayName?: string;
  };
}

export default function SphereItem({
  isQuestion = false,
  isReply = false,
  time,
  replyCount,
  reply,
  handleClick,
}: SphereReplyItemProps) {
  const {
    content,
    displayName,
    authorDepartment,
    authorJob,
    authorYear,
    emoticonUrl,
    likeCount,
    liked,
    nickname,
    isOfReader,
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

  const handleCommentReportComponent = (
    <>
      <View
        style={{
          position: 'absolute',
          top: -20,
          right: 0,
          flexDirection: 'column',
          alignItems: 'center',
          width: 150,
          height: 120,
          zIndex: 150,
        }}>
        <View
          style={{
            paddingHorizontal: 12,
            paddingVertical: 8,
            backgroundColor: '#FFFFFF',
            borderColor: '#EFEFF3',
            borderWidth: 1,
            borderRadius: 8,
            //iOS
            shadowColor: '#A6AAAE',
            shadowOffset: {width: 0, height: 4},
            shadowOpacity: 0.4,
            shadowRadius: 18,
            // Android
            elevation: 18,
            width: 130,
            height: '100%',
          }}>
          <TouchableOpacity
            onPress={() => {
              console.log('신고하기');
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                zIndex: 999,
              }}>
              <BigPostComment style={{marginRight: 8}} />
              <Text
                style={{
                  paddingVertical: 8,
                  fontSize: 14,
                  color: '#3A424E',
                }}>
                대댓글 달기
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('안되는 기능')}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                zIndex: 120,
              }}>
              <BlackMessageIcon style={{marginRight: 8}} />
              <Text style={{paddingVertical: 8, fontSize: 14}}>쪽지하기</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

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
                {displayName || nickname}
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
          <SpinningThreeDots
            isMine={isOfReader}
            handleOptionModeIsMineComponent={handleCommentReportComponent}
            handleDefaultModeComponent={<></>}
            isGrey={true}
            boardId={3}
          />
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
              onPress={handleClick}
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
