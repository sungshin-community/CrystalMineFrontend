import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import SphereReplyItem from '../../components/SphereReplyItem';
import SelectAnswer from '../../components/SelectAnswer';
import {
  getCuriousComment,
  getCuriousDetail,
} from '../../common/sphereCuriousApi';

const selectData = {
  content:
    '이 답변에 대해 정말 공감합니다! 추가적인 의견이 있습니다. 정말 힘이드는데요 지치지만 이겨내보자구요',
  authorDepartment: '컴퓨터공학부',
  authorJob: '학생',
  authorYear: 3,
  likeCount: 20,
  liked: true,
  nickname: '개발자_김',
  profileImageUrl: 'https://example.com/profile-image.jpg',
  ptCommentId: 12345,
};

interface SpherePostScreenProps {
  route: {
    params: {
      ptPostId: number;
      isQuestion: boolean;
    };
  };
}

export default function SpherePostScreen({route}: SpherePostScreenProps) {
  const {ptPostId, isQuestion} = route.params;
  const [postData, setPostData] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResponse = await getCuriousDetail(ptPostId);
        setPostData(postResponse);
        const commentResponse = await getCuriousComment(ptPostId);
        setComments(commentResponse);
        console.log('궁금해요 글 상세 조회 성공');
      } catch (error) {
        console.error('궁금해요 글 상세 조회 실패', error);
      }
    };

    fetchData();
  }, [ptPostId]);

  const {
    content,
    createdAt,
    department,
    images,
    likeCount,
    liked,
    nickname,
    profileImage,
    userJob,
    userYear,
    isSelected,
    point,
    title,
  } = postData;

  return (
    <ScrollView
      style={{
        backgroundColor: 'white',
      }}>
      <View
        style={{
          paddingTop: 20,
          paddingBottom: 25,
          borderColor: '#EFEFF3',
          borderBottomWidth: 1,
          borderTopWidth: 1,
          paddingHorizontal: 16,
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
                width: 36,
                height: 36,
                borderRadius: 18,
                marginRight: 12,
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
                    fontWeight: '400',
                  }}>
                  // 시간 계산 필요
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
                  style={{
                    fontSize: 12,
                    fontWeight: '700',
                    color: '#89919A',
                  }}>
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
              marginBottom: 10,
            }}>
            {title}
          </Text>
        )}

        <Text
          style={{
            fontSize: 14,
            fontWeight: '400',
            color: '#222222',
          }}>
          {content}
        </Text>
      </View>

      {isQuestion && (
        <SelectAnswer
          time="hi"
          replyCount={2}
          reply={selectData}
          canView={false}
        />
      )}

      <View style={{marginBottom: 35}}>
        {comments.map((item, index) => (
          <View
            key={index}
            style={[
              {padding: 16, borderBottomColor: '#EFEFF3', borderBottomWidth: 1},
              index === comments.length - 1 && {
                borderBottomWidth: 0,
              },
            ]}>
            <SphereReplyItem
              time={'1분전'}
              reply={item}
              isQuestion={isQuestion}
              replyCount={item.reComments.length}
            />
            {item.reComments && item.reComments.length > 0 && (
              <View style={{marginTop: 24}}>
                {item.reComments.map(
                  (
                    reComment: {
                      content: string;
                      authorDepartment: string;
                      authorJob: string;
                      authorYear: number;
                      emoticonUrl?: string | null;
                      likeCount: number;
                      liked: boolean;
                      nickname: string;
                      profileImageUrl: string;
                      ptCommentId: number;
                      selected?: boolean;
                    },
                    idx: number,
                  ) => (
                    <View
                      style={{
                        marginBottom:
                          idx === item.replyComments.length - 1 ? 0 : 20,
                      }}>
                      <SphereReplyItem
                        time={'1분전'}
                        reply={reComment}
                        isReply
                        isQuestion={isQuestion}
                      />
                    </View>
                  ),
                )}
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pointView: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: '#EFEFF3',
    borderRadius: 4,
    marginRight: 4,
  },
});

// 이미지가 있을 경우 디자인 확보 필요
// 입력창 연결
