import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import HeartIcon from '../../resources/icon/HeartIcon';
import ChatIcon from '../../resources/icon/ChatIcon';
import ReplyIcon from '../../resources/icon/ReplyIcon';
import ReplySheet from './ReplySheet';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

interface SphereItemProps {
  isQuestion?: boolean;
  time: string;
  post: {
    content: string;
    department: string;
    likeCount: number;
    liked: boolean;
    nickname: string;
    profileImage: string;
    ptCommentCount: number;
    ptPostId: number;
    thumbnail: string | null; //처리 수정
    title: string | null; //처리 수정
    userJob: string;
    userYear: number;
    isSelected?: boolean;
    point?: number;
  };
}

export default function SphereItem({
  isQuestion = false,
  post,
  time,
}: SphereItemProps) {
  const {
    content,
    department,
    likeCount,
    liked,
    nickname,
    profileImage,
    ptCommentCount,
    ptPostId,
    thumbnail,
    title,
    userJob,
    point,
    isSelected,
    userYear,
  } = post;

  // 수정 필요
  const navigation = useNavigation<NativeStackScreenProps<any>['navigation']>();
  const [replyVisible, setReplyVisible] = useState(false);

  return (
    <View style={{paddingHorizontal: 16}}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SpherePostScreen', {isQuestion}); // router 로직 수정 필요
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Image
              source={{uri: profileImage}}
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                marginRight: 10,
              }}
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
                  {nickname}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#B9BAC1',
                    fontWeight: '500',
                  }}>
                  // time 계산
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '500',
                  color: '#89919A',
                }}>
                {department} · {userJob} · {userYear}
              </Text>
            </View>
          </View>
          {isQuestion && (
            <View style={{flexDirection: 'row'}}>
              <View style={styles.pointView}>
                <Text
                  style={{fontSize: 12, fontWeight: '700', color: '#89919A'}}>
                  {point}P
                </Text>
              </View>
              <View
                style={[
                  {
                    paddingVertical: 6,
                    paddingHorizontal: 8,
                    borderRadius: 4,
                  },
                  {
                    backgroundColor: isSelected ? '#F3E9FF' : '#EFEFF3',
                  },
                ]}>
                <Text
                  style={[
                    {fontSize: 12, fontWeight: '700'},
                    {
                      color: isSelected ? '#A055FF' : '#89919A',
                    },
                  ]}>
                  {isSelected ? '채택완료' : '답변대기'}
                </Text>
              </View>
            </View>
          )}
        </View>

        {title && (
          <Text
            style={{
              color: '#222222',
              fontSize: 16,
              fontWeight: '600',
            }}
            numberOfLines={1}
            ellipsizeMode="tail">
            {title}
          </Text>
        )}

        <Text
          style={{
            fontSize: 14,
            fontWeight: '400',
            color: '#222222',
          }}>
          {content.length > 100 ? ( // 글자 수 확인
            <>
              {content.slice(0, 94)}...
              <Text style={{color: '#9DA4AB'}}> 더보기</Text>
            </>
          ) : (
            content
          )}
        </Text>

        {thumbnail && (
          <Image
            source={{uri: thumbnail}}
            style={{
              marginTop: 12,
              height: 160,
              borderRadius: 8,
            }}
            resizeMode="cover"
          />
        )}
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 12}}>
          <HeartIcon
            fill={liked ? '#FF6376' : 'white'}
            stroke={liked ? '#FF6376' : '#9DA4AB'}
          />
          <Text style={styles.footerText}>좋아요 {likeCount}</Text>
          <ChatIcon />
          <Text style={styles.footerText}>댓글달기 {ptCommentCount}</Text>
        </View>
      </TouchableOpacity>
      {ptCommentCount > 0 && (
        <TouchableOpacity
          style={{
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}
          onPress={() => setReplyVisible(true)}>
          <ReplyIcon />
          <View style={styles.commentBox}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 12,
                  color: '#3A424E',
                  marginRight: 8,
                }}>
                props 설정
              </Text>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 12,
                  color: '#3A424E',
                }}
                numberOfLines={1}
                ellipsizeMode="tail">
                props 설정
              </Text>
            </View>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 12,
                color: '#9DA4AB',
                textDecorationLine: 'underline', // 수정 필요
              }}>
              댓글 {ptCommentCount - 1}개 +
            </Text>
          </View>
        </TouchableOpacity>
      )}
      <ReplySheet visible={replyVisible} setVisible={setReplyVisible} />
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
  pointView: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: '#EFEFF3',
    borderRadius: 4,
    marginRight: 4,
  },
  commentBox: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F6F6F6',
    marginLeft: 12,
    flex: 1,
    justifyContent: 'space-between',
  },
});
