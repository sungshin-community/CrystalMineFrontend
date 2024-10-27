import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import SphereReplyItem from '../../components/SphereReplyItem';
import SelectAnswer from '../../components/SelectAnswer';

const data = {
  post: {
    content:
      '닛고웡에 애아솨더리에 닉말암구칠고 언저제서는 탄움고 갤지킨커 교브히쒸. 에히다 개서슴흘홋을 저고게를을 딘듸가 조흔, 가원이다. 니지킨커 교브히쒸. 에히다 개서슴흘홋을 저고게닛고웡에 애아솨더리에 닉말암구칠고 언저제서는 탄움고 갤지킨커 교브히쒸. 에히다 개서슴흘홋을 저고게를을 딘듸가 조흔, 가원이다. 니지킨커 교브히쒸. 에히다 개서슴흘홋을 저고게닛고웡에 애아솨더리에 닉말암구칠고 언저제서는 탄움고 갤지킨커 교브히쒸. 에히다 개서슴흘홋을 저고게를을 딘듸가 조흔, 가원이다. 니지킨커 교브히쒸. 에히다 개서슴흘홋을 저고게 안녕하세요 안녕하세요 안녕하세요',
    createdAt: '1분전',
    department: '산업디자인과',
    likeCount: 1,
    liked: true,
    nickname: '익명',
    profileImage:
      '/Users/pang-kiyeon/Documents/CrystalMineFrontend/resources/images/GrayPeople.png',
    ptCommentCount: 3,
    ptPostId: 1,
    userJob: '디자인',
    userYear: 1,
    isSelected: true,
    point: 1000,
    title: '제목입니다.',
    thumbnail: null,
    isQuestion: true,
  },
};

const replyData = [
  {
    content: '이것은 첫 번째 댓글입니다!',
    authorDepartment: '컴퓨터공학과',
    authorJob: '학생',
    authorYear: 2,
    likeCount: 5,
    liked: true,
    nickname: '댓글 작성자1',
    profileImageUrl: 'https://example.com/profile1.png',
    ptCommentId: 101,
    selected: false,
    replyComments: [
      {
        content: '첫 번째 댓글의 대댓글입니다.',
        authorDepartment: '컴퓨터공학과',
        authorJob: '조교',
        authorYear: 1,
        likeCount: 2,
        liked: false,
        nickname: '대댓글 작성자1',
        profileImageUrl: 'https://example.com/profile_reply1.png',
        ptCommentId: 201,
        selected: false,
      },
      {
        content: '또 다른 대댓글입니다.',
        authorDepartment: '정보통신학과',
        authorJob: '연구원',
        authorYear: 3,
        emoticonUrl: 'https://example.com/emoticon2_reply.png',
        likeCount: 1,
        liked: true,
        nickname: '대댓글 작성자2',
        profileImageUrl: 'https://example.com/profile_reply2.png',
        ptCommentId: 202,
        selected: true,
      },
    ],
  },
  {
    content: '두 번째 댓글 예시입니다.',
    authorDepartment: '정보통신학과',
    authorJob: '학생',
    authorYear: 3,
    likeCount: 8,
    liked: false,
    nickname: '댓글 작성자2',
    profileImageUrl: 'https://example.com/profile2.png',
    ptCommentId: 102,
    selected: true,
    replyComments: [],
  },
  {
    content: '마지막으로 세 번째 댓글입니다.',
    authorDepartment: '소프트웨어학과',
    authorJob: '연구원',
    authorYear: 1,
    emoticonUrl: 'https://example.com/emoticon3.png',
    likeCount: 12,
    liked: true,
    nickname: '댓글 작성자3',
    profileImageUrl: 'https://example.com/profile3.png',
    ptCommentId: 103,
    selected: false,
    replyComments: [
      {
        content: '세 번째 댓글의 대댓글입니다.',
        authorDepartment: '소프트웨어학과',
        authorJob: '학생',
        authorYear: 2,
        likeCount: 3,
        liked: false,
        nickname: '대댓글 작성자3',
        profileImageUrl: 'https://example.com/profile_reply3.png',
        ptCommentId: 203,
        selected: false,
      },
    ],
  },
];

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
      isQuestion: boolean;
    };
  };
}

export default function SpherePostScreen({route}: SpherePostScreenProps) {
  const {isQuestion} = route.params;
  // api 수정 필요
  // navigation 수정 필요
  const {post} = data;
  const {
    content,
    createdAt,
    department,
    likeCount,
    liked,
    nickname,
    profileImage,
    ptCommentCount,
    userJob,
    userYear,
    isSelected,
    point,
    title,
    thumbnail,
  } = post;

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
        {replyData.map((item, index) => (
          <View
            key={index}
            style={[
              {padding: 16, borderBottomColor: '#EFEFF3', borderBottomWidth: 1},
              index === replyData.length - 1 && {
                borderBottomWidth: 0,
              },
            ]}>
            <SphereReplyItem
              time={'1분전'}
              reply={item}
              isQuestion={isQuestion}
              replyCount={item.replyComments.length}
            />
            {item.replyComments && item.replyComments.length > 0 && (
              <View style={{marginTop: 24}}>
                {item.replyComments.map((replyComment, idx) => (
                  <View
                    style={{
                      marginBottom:
                        idx === item.replyComments.length - 1 ? 0 : 20,
                    }}>
                    <SphereReplyItem
                      time={'1분전'}
                      reply={replyComment}
                      isReply
                      isQuestion={isQuestion}
                    />
                  </View>
                ))}
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
