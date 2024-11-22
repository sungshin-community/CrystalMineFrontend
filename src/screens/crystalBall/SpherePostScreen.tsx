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
  getPantheonReviewDetail,
  getPantheonReviewComment,
} from '../../common/pantheonApi';
import AdMob from '../../components/AdMob';
import PostFooter from '../../components/PostFooter';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CommentInputBox, {CommentInputBoxRef} from './imshi';
import {pantheonComment, pantheonDetail} from '../../classes/Pantheon';
import CustomToast from '../../components/CustomToast';

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
  const {ptPostId, isQuestion, isFree, isReview} = route.params;
  const [postData, setPostData] = useState<pantheonDetail | undefined>(
    undefined,
  );
  const [comments, setComments] = useState<pantheonComment[]>([]);
  const commentInputRef = useRef<CommentInputBoxRef>(null);
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [paraentId, setParentId] = useState<number>(0);
  const [isRecomment, setIsRecomment] = useState<boolean>(false);
  const [selectComment, setSelectComment] = useState<
    pantheonComment | undefined
  >(undefined);

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
      } else if (isReview) {
        data = await getPantheonReviewDetail(ptPostId);
      }
      setPostData(data);
      console.log('글 상세 데이터: ', data);
      console.log('글 상세 조회 성공');
    } catch (error) {
      console.error('글 상세 조회 실패', error);
    }
  };

  const fetchCommentData = async () => {
    try {
      let data = [];
      if (isQuestion) {
        data = await getPantheonCuriousComment(ptPostId);
      } else if (isFree) {
        data = await getPantheonFreeComment(ptPostId);
      } else if (isReview) {
        data = await getPantheonReviewComment(ptPostId);
      }
      const selectedData = data.find(
        (comment: pantheonComment) => comment.isSelected === true,
      );
      setComments(data);
      setSelectComment(selectedData || null);
      console.log('댓글 조회 성공');
    } catch (error) {
      console.error('댓글 조회 실패', error);
    }
  };

  useEffect(() => {
    fetchDetailData();
    fetchCommentData();
  }, [ptPostId]);

  const imgUrlCoverting = (arr: string[]) => {
    const array = arr.map(url => {
      return {url: url};
    });
    return array;
  };

  const handlePostScrap = async () => {
    try {
      if (postData?.isScraped) {
        await deletePantheonScrap(ptPostId);
      } else {
        await postPantheonScrap(ptPostId);
      }
      await fetchDetailData();
      console.log('스크랩 상태 변경 성공');
    } catch (error) {
      console.error('스크랩 상태 변경 실패:', error);
    }
  };

  const handlePostLike = async () => {
    try {
      if (postData?.isLiked) {
        await deleltePantheonLike(ptPostId);
      } else {
        await postPantheonLike(ptPostId);
      }
      await fetchDetailData();
      console.log('좋아요 상태 변경 성공');
    } catch (error) {
      console.error('좋아요 상태 변경 실패:', error);
    }
  };

  const handlePostComment = async (
    content: string,
    isAnonymous: boolean,
    emoticonId?: number,
  ) => {
    try {
      await postPantheonComment(content, isAnonymous, ptPostId, emoticonId);
      await fetchCommentData();
      console.log('댓글 생성 성공');
    } catch (error) {
      console.error('댓글 생성 실패:', error);
    }
  };

  const handlePostReComment = async (
    content: string,
    isAnonymous: boolean,
    emoticonId?: number,
  ) => {
    try {
      await postPantheonReComment(
        paraentId,
        content,
        isAnonymous,
        ptPostId,
        emoticonId,
      );
      await fetchCommentData();
      console.log('대댓글 생성 성공');
    } catch (error) {
      console.error('대댓글 생성 실패:', error);
    }
  };

  const postComment = async (content: string, isAnonymous: boolean) => {
    if (isRecomment) {
      handlePostReComment(content, isAnonymous);
      console.log('대댓글 생성');
    } else {
      handlePostComment(content, isAnonymous);
      console.log('댓글 생성');
    }
    setIsRecomment(false);
  };

  const handleCommentClick = (ptCommentId: number) => {
    handleFocus();
    setParentId(ptCommentId);
    setIsRecomment(true);
  };

  const handlePurchaseAdopt = async (ptCommentId: number) => {
    try {
      const response = await postPurchaseAdopt(ptCommentId);
      if (response?.status === 201) {
        await fetchDetailData();
        console.log('구매 성공');
      }
      if (response?.status === 400) {
        showToast('본인의 댓글의 조회 권한은 구매할 수 없습니다.');
        return;
      }
      if (response?.status === 403) {
        // TODO: 구매 실패 시 포인트 화면으로 이동
        return;
      }
    } catch (error) {
      console.error('구매 실패:', error);
    }
  };

  const handleAdoptComment = async (
    ptCommentId: number,
    selectReply: pantheonComment,
  ) => {
    try {
      await postCommentAdopt(ptCommentId, ptPostId);
      setSelectComment(selectReply);
      showToast('답변을 채택하였습니다.');
      await fetchDetailData();
      await fetchCommentData();
      console.log('채택 성공');
    } catch (error) {
      console.error('채택 실패:', error);
    }
  };

  const handleCommentLike = async (isLiked: boolean, commentId: number) => {
    try {
      if (isLiked) {
        await deleltePantheonCommentLike(commentId);
      } else {
        await postPantheonCommentLike(commentId);
      }
      await fetchCommentData();
      console.log('좋아요 상태 변경 성공');
    } catch (error) {
      console.error('좋아요 상태 변경 실패:', error);
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
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
                source={{uri: postData?.profileImage}}
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
                    {postData?.displayName}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#B9BAC1',
                      fontWeight: '400',
                    }}>
                    {postData?.createdAt}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#89919A',
                  }}>
                  {postData?.isBlind
                    ? '비공개'
                    : `${postData?.department} · ${postData?.userJob} · ${
                        postData?.userYear === 0
                          ? '신입'
                          : `${postData?.userYear}년`
                      }`}
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
                    {postData?.point}P
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
                      backgroundColor: postData?.isSelected
                        ? '#F3E9FF'
                        : '#EFEFF3',
                    },
                  ]}>
                  <Text
                    style={[
                      {fontSize: 12, fontWeight: '700'},
                      {
                        color: postData?.isSelected ? '#A055FF' : '#89919A',
                      },
                    ]}>
                    {postData?.isSelected ? '채택완료' : '답변대기'}
                  </Text>
                </View>
              </View>
            )}
          </View>

          {typeof postData?.title === 'string' && (
            <Text
              style={{
                color: '#222222',
                fontSize: 16,
                fontWeight: '600',
                marginBottom: 10,
              }}>
              {postData?.title}
            </Text>
          )}

          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: '#222222',
            }}>
            {postData?.content}
          </Text>

          {postData?.thumbnails.length !== 0 && (
            <View style={{flexDirection: 'row', marginTop: 16}}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}>
                {postData?.thumbnails.map((url: any, index: React.Key) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      navigation.navigate('ImageViewerScreen', {
                        imageUrls: imgUrlCoverting(postData?.images),
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

        {postData && (
          <PostFooter
            isLiked={postData.isLiked}
            likeCount={postData.likeCount}
            commentCount={0} // commentCount 임시 설정
            isReported={postData.isReported}
            ptPostId={ptPostId}
            isScraped={postData.isScraped}
            handlePostLike={handlePostLike}
            handlePostComment={handleFocus}
            handlePostReport={console.log('신고 로직 수정')} //신고 로직 수정
            handlePostScrap={handlePostScrap}
          />
        )}
        <AdMob />

        {isQuestion && selectComment && (
          <SelectAnswer
            reply={selectComment}
            handlePurchase={handlePurchaseAdopt}
          />
        )}

        <View style={{marginBottom: 35}}>
          {postData &&
            comments.map((item, index) => (
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
                {item.isSelected ? (
                  item.canReadSelectedComment && (
                    <SphereReplyItem
                      reply={item}
                      isQuestion={isQuestion}
                      handleReplyClick={() =>
                        handleCommentClick(item.ptCommentId)
                      }
                      handleLikePress={handleCommentLike}
                      postIsSelected={postData.isSelected}
                      handleAdoptComment={handleAdoptComment}
                    />
                  )
                ) : (
                  <SphereReplyItem
                    reply={item}
                    isQuestion={isQuestion}
                    handleReplyClick={() =>
                      handleCommentClick(item.ptCommentId)
                    }
                    handleLikePress={handleCommentLike}
                    postIsSelected={postData.isSelected}
                    handleAdoptComment={handleAdoptComment}
                  />
                )}
                {item.reComments && item.reComments.length > 0 && (
                  <View style={{marginTop: 24}}>
                    {item.reComments.map(
                      (reComment: pantheonComment, idx: number) => (
                        <View>
                          {reComment.isSelected ? (
                            reComment.canReadSelectedComment && (
                              <SphereReplyItem
                                reply={reComment}
                                isReply
                                isQuestion={isQuestion}
                                handleLikePress={handleCommentLike}
                                postIsSelected={postData.isSelected}
                                handleAdoptComment={handleAdoptComment}
                              />
                            )
                          ) : (
                            <SphereReplyItem
                              reply={reComment}
                              isReply
                              isQuestion={isQuestion}
                              handleLikePress={handleCommentLike}
                              postIsSelected={postData.isSelected}
                              handleAdoptComment={handleAdoptComment}
                            />
                          )}
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
      <CustomToast
        visible={toastVisible}
        message={toastMessage}
        onClose={() => setToastVisible(false)}
      />
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
