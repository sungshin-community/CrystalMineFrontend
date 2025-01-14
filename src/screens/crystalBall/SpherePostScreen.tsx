import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  NativeModules,
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
  postPantheonReport,
  postPantheonCommentReport,
} from '../../common/pantheonApi';
import AdMob from '../../components/AdMob';
import PostFooter from '../../components/PostFooter';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {pantheonComment, pantheonDetail} from '../../classes/Pantheon';
import CustomToast from '../../components/CustomToast';
import ReviewJobDetail from '../../components/ReviewJobDetail';
import SphereCommentInput, {
  SphereCommentInputRef,
} from '../../components/SphereCommentInput';
import {getUser} from '../../common/myPageApi';

interface SpherePostScreenProps {
  route: {
    params: {
      ptPostId: number;
      isQuestion: boolean;
      isFree: boolean;
      isReview: boolean;
    };
  };
}

type RootStackParamList = {
  PointScreen: {
    username: string;
    points: number;
  };
  ImageViewerScreen: {
    imageUrls: {url: string}[];
    index: number;
  };
};

export default function SpherePostScreen({route}: SpherePostScreenProps) {
  const navigation =
    useNavigation<NativeStackScreenProps<RootStackParamList>['navigation']>();
  const {ptPostId, isQuestion, isFree, isReview} = route.params;
  const [postData, setPostData] = useState<pantheonDetail | undefined>(
    undefined,
  );
  const [comments, setComments] = useState<pantheonComment[]>([]);
  const commentInputRef = useRef<SphereCommentInputRef>(null);
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [paraentId, setParentId] = useState<number | null>(null);
  const [isRecomment, setIsRecomment] = useState<boolean>(false);
  const [selectComment, setSelectComment] = useState<
    pantheonComment | undefined
  >(undefined);
  const [focusCommentId, setFocusCommentId] = useState<number | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const {StatusBarManager} = NativeModules;
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useEffect(() => {
    Platform.OS == 'ios'
      ? StatusBarManager.getHeight(
          (statusBarFrameData: {height: React.SetStateAction<number>}) => {
            setStatusBarHeight(statusBarFrameData.height);
          },
        )
      : null;
  }, []);

  const handleFocus = () => {
    setFocusCommentId(null);
    setParentId(null);
    setIsRecomment(false);
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
    } finally {
      setIsInitialLoading(false);
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
    emoticonId: number | null,
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
    emoticonId: number | null,
  ) => {
    try {
      if (paraentId !== null) {
        await postPantheonReComment(
          paraentId,
          content,
          isAnonymous,
          ptPostId,
          emoticonId,
        );
      }
      await fetchCommentData();
      console.log('대댓글 생성 성공');
    } catch (error) {
      console.error('대댓글 생성 실패:', error);
    }
  };

  const postComment = async (
    content: string,
    isAnonymous: boolean,
    emojiId: number | null,
  ) => {
    if (isRecomment) {
      handlePostReComment(content, isAnonymous, emojiId);
      console.log('대댓글 생성');
    } else {
      handlePostComment(content, isAnonymous, emojiId);
      console.log('댓글 생성');
    }
    setIsRecomment(false);
    setParentId(null);
  };

  const scrollViewRef = useRef<ScrollView>(null);

  const handleCommentClick = (ptCommentId: number) => {
    setFocusCommentId(ptCommentId);
    commentInputRef.current?.focusInput();
    setParentId(ptCommentId);
    setIsRecomment(true);
    const targetComment = comments.find(
      comment => comment.ptCommentId === ptCommentId,
    );
    if (targetComment && scrollViewRef.current) {
      const index = comments.indexOf(targetComment);
      scrollViewRef.current.scrollTo({
        y: index * 300,
        animated: true,
      });
    }
  };

  const handlePurchaseAdopt = async (ptCommentId: number) => {
    try {
      const response = await postPurchaseAdopt(ptCommentId);
      if (response?.status === 201) {
        await fetchCommentData();
        console.log('구매 성공');
      }
      if (response?.status === 400) {
        showToast('본인의 댓글의 조회 권한은 구매할 수 없습니다.');
        return;
      }
      if (response?.status === 403) {
        const user = await getUser();
        navigation.navigate('PointScreen', {
          username: user?.data.data.username,
          points: user?.data.data.point,
        });
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

  const handlePostReport = async (
    id: number,
    reasonId: number,
    detail?: string,
  ) => {
    try {
      await postPantheonReport(id, reasonId, detail);
      await fetchDetailData();
      console.log('게시글 신고 성공');
    } catch (error) {
      console.error('게시글 신고 실패:', error);
    }
  };

  const handleReplyReport = async (
    id: number,
    reasonId: number,
    detail?: string,
  ) => {
    try {
      await postPantheonCommentReport(id, reasonId, detail);
      await fetchCommentData();
      console.log('댓글 신고 성공');
    } catch (error) {
      console.error('댓글 신고 실패:', error);
    }
  };

  const Skeleton = () => (
    <View
      style={{
        paddingTop: 20,
        paddingBottom: 25,
        paddingHorizontal: 16,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 16,
        }}>
        <View style={{flexDirection: 'row'}}>
          {/* 프로필 이미지 스켈레톤 */}
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: '#E0E0E0',
              marginRight: 12,
            }}
          />
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 2,
              }}>
              <View
                style={{
                  width: 40,
                  height: 14,
                  backgroundColor: '#E0E0E0',
                  marginRight: 6,
                  borderRadius: 4,
                }}
              />
              <View
                style={{
                  width: 60,
                  height: 12,
                  backgroundColor: '#E0E0E0',
                  borderRadius: 4,
                }}
              />
            </View>
            <View
              style={{
                width: 100,
                height: 12,
                backgroundColor: '#E0E0E0',
                borderRadius: 4,
              }}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          width: '80%',
          height: 16,
          backgroundColor: '#E0E0E0',
          borderRadius: 4,
          marginBottom: 10,
        }}
      />
      <View
        style={{
          width: '100%',
          height: 14,
          backgroundColor: '#E0E0E0',
          borderRadius: 4,
          marginBottom: 8,
        }}
      />
      <View
        style={{
          width: '95%',
          height: 14,
          backgroundColor: '#E0E0E0',
          borderRadius: 4,
          marginBottom: 8,
        }}
      />
      <View
        style={{
          width: '90%',
          height: 14,
          backgroundColor: '#E0E0E0',
          borderRadius: 4,
          marginBottom: 16,
        }}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={
        Platform.OS === 'ios' ? statusBarHeight + 30 : statusBarHeight + 78
      }>
      <ScrollView
        ref={scrollViewRef}
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
          {isInitialLoading ? (
            <Skeleton />
          ) : (
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
                      {isReview ? postData?.nickname : postData?.displayName}
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
          )}

          {isReview && postData && (
            <ReviewJobDetail
              job={postData.job}
              category={postData.category}
              size={postData.scale}
              year={postData.year}
            />
          )}

          {typeof postData?.title === 'string' && postData?.title !== '' && (
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
                {postData?.thumbnails.map((url: any, index: number) => (
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
            commentCount={postData.ptCommentCount}
            isReported={postData.isReported}
            ptPostId={ptPostId}
            isOwner={postData.isOwner}
            isScraped={postData.isScraped}
            handlePostLike={handlePostLike}
            handlePostComment={handleFocus}
            handlePostReport={handlePostReport}
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

        <View>
          {postData &&
            comments.map((item, index) => (
              <View
                style={[
                  {
                    borderBottomColor: '#EFEFF3',
                    borderBottomWidth: 1,
                  },
                  index === comments.length - 1 && {
                    borderBottomWidth: 0,
                  },
                  item.isSelected &&
                    !item.canReadSelectedComment && {
                      padding: 0,
                      borderBottomWidth: 0,
                    },
                ]}>
                <View
                  key={item.ptCommentId}
                  style={[
                    item.ptCommentId === focusCommentId && {
                      backgroundColor: '#f6f6f6',
                    },
                    {padding: 16},
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
                        isOwner={postData.isOwner}
                        handleReplyReport={handleReplyReport}
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
                      isOwner={postData.isOwner}
                      handleReplyReport={handleReplyReport}
                    />
                  )}
                </View>
                {item.reComments && item.reComments.length > 0 && (
                  <View style={{marginTop: 10}}>
                    {item.reComments.map(
                      (reComment: pantheonComment, idx: number) => (
                        <View
                          style={[
                            {
                              marginBottom: 20,
                              paddingHorizontal: 16,
                            },
                            idx === item.reComments.length - 1 && {
                              marginBottom: 26,
                            },
                          ]}>
                          {reComment.isSelected ? (
                            reComment.canReadSelectedComment && (
                              <SphereReplyItem
                                reply={reComment}
                                isReply
                                isQuestion={isQuestion}
                                handleLikePress={handleCommentLike}
                                postIsSelected={postData.isSelected}
                                handleAdoptComment={handleAdoptComment}
                                isOwner={postData.isOwner}
                                handleReplyReport={handleReplyReport}
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
                              isOwner={postData.isOwner}
                              handleReplyReport={handleReplyReport}
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
      <SphereCommentInput ref={commentInputRef} onSubmit={postComment} />
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
