import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import SphereReplyItem from '../../components/SphereReplyItem';
import SelectAnswer from '../../components/SelectAnswer';
import {
  deleltePantheonLike,
  getPantheonCuriousComment,
  getPantheonCuriousDetail,
  getPantheonFreeComment,
  getPantheonFreeDetail,
  postPantheonComment,
  postPantheonLike,
  postPantheonScrap,
  deletePantheonScrap,
  postCommentAdopt,
  postPantheonReComment,
  postPurchaseAdopt,
  deleltePantheonCommentLike,
  postPantheonCommentLike,
} from '../../common/pantheonApi';
import AdMob from '../../components/AdMob';
import PostFooter from '../../components/PostFooter';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CommentInputBox, {CommentInputBoxRef} from './imshi';
import {pantheonComment, pantheonDetail} from '../../classes/Pantheon';

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
      isFree: boolean;
    };
  };
}

export default function SpherePostScreen({route}: SpherePostScreenProps) {
  const navigation = useNavigation<NativeStackScreenProps<any>['navigation']>();
  const {ptPostId, isQuestion, isFree} = route.params;
  const [postData, setPostData] = useState<any>({});
  const [questioning, setQuestioning] = useState(isQuestion);

  const [comments, setComments] = useState<pantheonComment[]>([]);
  const commentInputRef = useRef<CommentInputBoxRef>(null);
  const [paraentId, setParentId] = useState<number>(0);
  const [isRecomment, setIsRecomment] = useState<boolean>(false);

  const handleFocus = () => {
    commentInputRef.current?.focusInput();
  };

  const fetchDetailData = async () => {
    try {
      let data: pantheonDetail | any = {};
      if (isQuestion) {
        data = await getPantheonCuriousDetail(ptPostId);
      } else if (isFree) {
        data = await getPantheonFreeDetail(ptPostId);
      } else {
        data = await getPantheonCuriousDetail(ptPostId);
        if (!data) {
          data = await getPantheonFreeDetail(ptPostId);
        }
      }
      setPostData(data);
      console.log('글 상세 조회 성공', questioning);
    } catch (error) {
      console.error('글 상세 조회 실패', error);
    }
  };

  const fetchCommentData = async () => {
    try {
      let data = [];
      if (isQuestion) {
        data = await getPantheonCuriousComment(ptPostId);
        console.log('data', data);
      } else if (isFree) {
        data = await getPantheonFreeComment(ptPostId);
      } else {
        data = await getPantheonFreeComment(ptPostId);
        if (!data) {
          data = await getPantheonCuriousComment(ptPostId);
        }
      }
      setComments(data);
      console.log('글 상세 조회 성공');
    } catch (error) {
      console.error('글 상세 조회 실패', error);
    }
  };

  useEffect(() => {
    fetchDetailData();
    fetchCommentData();
  }, [ptPostId]);

  const {
    content,
    createdAt,
    department,
    images,
    likeCount,
    isLiked,
    isReported,
    isScraped,
    nickname,
    thumbnails,
    profileImage,
    userJob,
    userYear,
    isSelected,
    point,
    title,
  } = postData;

  const imgUrlCoverting = (arr: string[]) => {
    const array = arr.map(url => {
      return {url: url};
    });
    return array;
  };

  const handlePostScrap = async (postId: number) => {
    try {
      if (postData?.isScraped) {
        await deletePantheonScrap(postId);
      } else {
        await postPantheonScrap(postId);
      }
      await fetchDetailData();
      console.log('스크랩 상태 변경 성공');
    } catch (error) {
      console.error('스크랩 상태 변경 실패:', error);
    }
  };

  const handlePostLike = async (postId: number) => {
    try {
      if (postData?.isLiked) {
        await deleltePantheonLike(postId);
      } else {
        await postPantheonLike(postId);
      }
      await fetchDetailData();
      console.log('좋아요 상태 변경 성공');
    } catch (error) {
      console.error('좋아요 상태 변경 실패:', error);
    }
  };

  /*
  const handlePostReport = async (reasonId: number, detail?: string) => {
    try {
      await postPantheonReport(ptPostId, reasonId, detail);
      await fetchDetailData();
      console.log('게시글 신고 성공');
    } catch (error) {
      console.error('게시글 신고 실패:', error);
    }
  };*/

  const handlePostComment = async (
    content: string,
    isAnonymous: boolean,
    //emoticonId: number,
  ) => {
    try {
      await postPantheonComment(content, isAnonymous, ptPostId, 1);
      await fetchCommentData();
      console.log('댓글 생성 성공');
    } catch (error) {
      console.error('댓글 생성 실패:', error);
    }
  };

  const handlePostReComment = async (
    content: string,
    isAnonymous: boolean,
    //emoticonId: number,
  ) => {
    try {
      await postPantheonReComment(paraentId, content, isAnonymous, ptPostId, 1);
      await fetchCommentData();
      console.log('대댓글 생성 성공');
    } catch (error) {
      console.error('대댓글 생성 실패:', error);
    }
  };

  const postComment = async (content: string, isAnonymous: boolean) => {
    if (isRecomment) {
      console.log('대댓글 생성');
      handlePostReComment(content, isAnonymous);
    } else {
      console.log('댓글 생성');
      handlePostComment(content, isAnonymous);
    }
    setIsRecomment(false);
  };

  const handleCommentClick = (ptCommentId: number) => {
    handleFocus();
    setParentId(ptCommentId);
    setIsRecomment(true);
    console.log(ptCommentId);
  };

  const handlePurchaseAdopt = async (ptCommentId: number) => {
    try {
      await postPurchaseAdopt(ptCommentId);
      console.log('구매 성공');
    } catch (error) {
      console.error('구매 실패:', error);
    }
  };

  const handleAdoptComment = async (ptCommentId: number) => {
    try {
      await postCommentAdopt(ptCommentId, ptPostId);
      console.log('채택 성공');
      await fetchDetailData();
      await fetchCommentData();
    } catch (error) {
      console.error('채택 실패:', error);
    }
  };

  const handleCommentLike = async (isLiked: boolean, commentId: number) => {
    try {
      if (isLiked) {
        await deleltePantheonCommentLike(commentId);
        console.log('좋아요 취소 성공');
      } else {
        await postPantheonCommentLike(commentId);
        console.log('좋아요 누르기 성공');
      }
      await fetchCommentData();
    } catch (error) {
      console.error('좋아요 상태 변경 실패:', error);
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
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
                    createdAt
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#89919A',
                  }}>
                  {department} · {userJob} ·{' '}
                  {userYear === 0 ? '신입' : `${userYear}년`}
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

          {typeof title === 'string' && (
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

          {thumbnails && thumbnails.length !== 0 && (
            <View style={{flexDirection: 'row', marginTop: 16}}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}>
                {thumbnails.map((url: any, index: React.Key) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      navigation.navigate('ImageViewerScreen', {
                        imageUrls: imgUrlCoverting(postData.images),
                        index: index,
                      })
                    }>
                    <Image
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: 10,
                        marginRight: 16,
                      }}
                      source={{uri: url}}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
        <PostFooter
          isLiked={isLiked}
          likeCount={likeCount}
          commentCount={0}
          isReported={isReported}
          ptPostId={0}
          isScraped={isScraped}
          handlePostLike={() => handlePostLike(ptPostId)}
          handlePostComment={handleFocus}
          handlePostReport={() => console.log('신고하기')}
          handlePostScrap={() => handlePostScrap(ptPostId)}
        />
        <AdMob />

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
                {
                  padding: 16,
                  borderBottomColor: '#EFEFF3',
                  borderBottomWidth: 1,
                },
                index === comments.length - 1 && {
                  borderBottomWidth: 0,
                },
              ]}>
              <SphereReplyItem
                reply={item}
                isQuestion={isQuestion}
                handleReplyClick={() => handleCommentClick(item.ptCommentId)}
                handleLikePress={handleCommentLike}
                postIsSelected={isSelected}
                handleAdoptComment={handleAdoptComment}
              />
              {item.reComments && item.reComments.length > 0 && (
                <View style={{marginTop: 24}}>
                  {item.reComments.map(
                    (reComment: pantheonComment, idx: number) => (
                      <View>
                        <SphereReplyItem
                          reply={reComment}
                          isReply
                          isQuestion={isQuestion}
                          postIsSelected={isSelected}
                          handleLikePress={handleCommentLike}
                          handleAdoptComment={handleAdoptComment}
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
      <CommentInputBox ref={commentInputRef} onSubmit={postComment} />
    </KeyboardAvoidingView>
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
