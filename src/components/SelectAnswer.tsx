import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PurpleWarning from '../../resources/icon/PurpleWarning';
import GraduationCap from '../../resources/icon/GraduationCap';
import HeartIcon from '../../resources/icon/HeartIcon';
import ChatIcon from '../../resources/icon/ChatIcon';
import CloseIcon from '../../resources/icon/CloseIcon';
import {pantheonComment} from '../classes/Pantheon';

interface SelectAnswerProps {
  reply: pantheonComment;
  handlePurchase: (commentId: number) => void;
}

export default function SelectAnswer({
  reply,
  handlePurchase,
}: SelectAnswerProps) {
  const [showBox, setShowBox] = useState(false);
  const [canView, setCanView] = useState(false);

  const handleOpen = () => {
    setShowBox(true);
  };

  const handleClose = () => {
    setShowBox(false);
  };

  useEffect(() => {
    if (reply.isOfPtPostAuthor || reply.canReadSelectedComment) {
      setCanView(true);
    }
  }, [reply]);

  return (
    <View style={styles.selectBox}>
      <View style={styles.titleBox}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <GraduationCap />
          <Text style={styles.title}>채택 답변</Text>
          <Text style={styles.subTitle}>글쓴이가 채택한 답변이에요.</Text>
        </View>
        <TouchableOpacity onPress={handleOpen}>
          <PurpleWarning />
        </TouchableOpacity>
      </View>
      {showBox && (
        <View style={styles.bubbleContainer}>
          <View style={styles.triangle} />
          <View style={{paddingVertical: 20, marginRight: 23, flex: 1}}>
            <Text
              style={{
                fontSize: 12,
                color: '#222222',
                fontWeight: '400',
              }}>
              글쓴이에게 답변을 채택받으면, 포인트를 받을 수 있어요! 글쓰기 및
              답변하기를 통해 포인트를 모아 타 수정이들의 답변을 살펴보세요.{' '}
              {'\n'}
              {'\n'}
              단,{' '}
              <Text
                style={{
                  color: '#A055FF',
                  fontWeight: '600',
                }}>
                채택 후에는 답변의 삭제가 불가능
              </Text>
              합니다.
            </Text>
          </View>
          <TouchableOpacity onPress={handleClose} style={{paddingTop: 12}}>
            <CloseIcon />
          </TouchableOpacity>
        </View>
      )}
      <View>
        {!canView && (
          <View style={styles.viewBox}>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 14,
                color: '#3A424E',
                marginBottom: 4,
              }}>
              채택 답변 열람하기
            </Text>
            <Text
              style={{
                fontWeight: '400',
                fontSize: 12,
                color: '#3A424E',
                marginBottom: 16,
              }}>
              답변을 열람하기 위해서는
              <Text style={{fontWeight: '600', color: '#A055FF'}}> 500p</Text>가
              필요해요!
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#A055FF',
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 4,
              }}
              onPress={() => handlePurchase(reply.ptCommentId)}>
              <Text style={{color: 'white', fontWeight: '600', fontSize: 12}}>
                포인트 사용하기
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{padding: 16}}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{uri: reply.profileImageUrl}}
              style={{borderRadius: 12, marginRight: 8, width: 24, height: 24}}
              resizeMode="cover"
            />
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
                    color: '#3A424E',
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
          </View>
          {typeof reply.emoticonUrl === 'string' && (
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
              marginTop: 10,
            }}>
            {reply.content}
          </Text>

          <View style={{flexDirection: 'row', marginTop: 16}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <HeartIcon
                fill={reply.isLiked ? '#FF6376' : 'white'}
                stroke={reply.isLiked ? '#FF6376' : '#9DA4AB'}
              />
              <Text style={styles.footerText}>좋아요 {reply.likeCount}</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <ChatIcon />
              <Text style={styles.footerText}>
                대댓글 {reply.reComments ? reply.reComments.length : 0}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  selectBox: {
    marginBottom: 6,
    marginTop: 22,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A055FF',
  },
  titleBox: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#E5D2FC',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A055FF',
    marginLeft: 2,
  },
  subTitle: {
    fontSize: 12,
    color: '#89919A',
    fontWeight: '500',
    marginLeft: 8,
  },
  footerText: {
    marginLeft: 4,
    fontWeight: '500',
    fontSize: 13,
    color: '#9DA4AB',
    marginRight: 12,
  },
  bubbleContainer: {
    position: 'absolute',
    zIndex: 99,
    right: 8,
    top: 42,
    width: '94%',
    backgroundColor: '#F6F2FF',
    borderColor: '#F0E4FF',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 20,
    paddingRight: 13,
    flexDirection: 'row',
  },
  triangle: {
    position: 'absolute',
    top: -9,
    right: 1,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#F6F2FF',
  },
  viewBox: {
    position: 'absolute',
    zIndex: 50,
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
});
