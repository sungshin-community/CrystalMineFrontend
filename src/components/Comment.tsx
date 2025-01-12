import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import PostLike from '../../resources/icon/PostLike';
import PostUnlike from '../../resources/icon/PostUnlike';
import {PostComment, BigPostComment} from '../../resources/icon/PostComment';
import CommentDto, {RecommentDto} from '../classes/CommentDto';
import SpinningThreeDots from './SpinningThreeDots';
import {TrashIcon, BlackTrashIcon} from '../../resources/icon/TrashIcon';
import {ModalBottom} from '../components/ModalBottom';
import {MessageModalBottom} from './SelectRowModalBottom';
import Toast from 'react-native-simple-toast';
import NoReport, {BlackReport, Report} from '../../resources/icon/Report';
import {fontMedium, fontRegular} from '../common/font';
import Autolink from 'react-native-autolink';
import {SmallOrangeFlag} from '../../resources/icon/SmallOrangeFlag';
import {SmallPurpleFlag} from '../../resources/icon/SmallPurpleFlag';
import {BlackMessageIcon, MessageIcon} from '../../resources/icon/Message';
import {getMessageContent, postChatRoom} from '../common/messageApi';
import {ReportModalBottom} from './ReportModalBottom';
import HeartIcon from '../../resources/icon/HeartIcon';
import ChatIcon from '../../resources/icon/ChatIcon';

interface Props {
  navigation: any;
  comment?: any;
  setParentId?: any;
  handleCommentLike?: any;
  isRecomment: boolean;
  setIsRecomment?: any;
  handleCommentDelete: (id: number) => void;
  handleCommentReport?: any;
  handleFocus: () => void;
  componentModalVisible?: boolean;
  setComponentModalVisible?: any;
}
const Comment = ({
  navigation,
  comment,
  setParentId,
  handleCommentLike,
  isRecomment,
  setIsRecomment,
  handleCommentDelete,
  handleCommentReport,
  handleFocus,
  componentModalVisible,
  setComponentModalVisible,
}: Props) => {
  const [isRecommentState, setIsRecommentState] = useState<boolean>(false);
  const data: CommentDto = comment;
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [reportModalVisible, setReportModalVisible] = useState<boolean>(false);
  const [messageModalVisible, setMessageModalVisible] =
    useState<boolean>(false);
  const [blockModalVisible, setBlockModalVisible] = useState<boolean>(false);
  const [chatResponse, setChatResponse] = useState<any>({});
  const [dotsModalVisible, setDotsModalVisible] = useState<boolean>(false);
  const [localLikeCount, setLocalLikeCount] = useState(data?.likeCount || 0);
  const [localIsLiked, setLocalIsLiked] = useState(data?.isLiked || false);

  useEffect(() => {
    if (!isRecomment) setIsRecommentState(false);
  }, [isRecomment]);

  useEffect(() => {
    setLocalLikeCount(data?.likeCount || 0);
    setLocalIsLiked(data?.isLiked || false);
  }, [data?.likeCount, data?.isLiked]);

  const blockedCheck = async (isAnonymous: boolean) => {
    let messageData = {
      partnerId: data.accountId,
      postId: data.postId,
      isAnonymous: isAnonymous,
    };
    console.log('messageData', messageData);

    const response = await postChatRoom(messageData);
    console.log('response', response);
    setChatResponse(response);
    const block = await getMessageContent(response.data.roomId, 0);
    console.log('block', block);

    if (!block.data.isBlocked) {
      setMessageModalVisible(true);
    } else {
      setBlockModalVisible(true);
      console.log('block', block.data.isBlocked);
    }
  };

  const handlePostMessage = async () => {
    if (chatResponse.code === 'CREATE_CHAT_ROOM_SUCCESS') {
      navigation.navigate('MessageScreen', {roomId: chatResponse.data.roomId});
    } else {
      setTimeout(function () {
        Toast.show(
          '쪽지방을 만들던 중 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.',
          Toast.SHORT,
        );
      }, 100);
    }
    setMessageModalVisible(false);
  };

  const handleRecomment = (id: number) => {
    handleFocus();
    setParentId(id);
    setIsRecomment(true);
    setIsRecommentState(true);
    setDotsModalVisible(false);
    setComponentModalVisible(false);
  };

  const handleLocalCommentLike = async () => {
    // 즉시 UI 업데이트
    setLocalIsLiked(!localIsLiked);
    setLocalLikeCount(localIsLiked ? localLikeCount - 1 : localLikeCount + 1);

    // API 호출
    await handleCommentLike(data.id);
  };

  /* Comment : 내 댓글 */
  const handleCommentDeleteComponent = (
    <>
      <ModalBottom
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={`작성한 댓글을 삭제하시겠습니까?`}
        content={`• 삭제 후에는 되돌릴 수 없습니다.`}
        isContentCenter={false}
        purpleButtonText="삭제"
        purpleButtonFunc={() => {
          handleCommentDelete(data.id);
          setModalVisible(false);
          setComponentModalVisible(false);
          setDotsModalVisible(false);
        }}
        // whiteButtonText="취소"
        // whiteButtonFunc={() => {
        //   setModalVisible(false);
        //   setComponentModalVisible(false);
        // }}
        setDim={false}
      />

      <View
        style={{
          position: 'absolute',
          top: -20,
          right: 10,
          flexDirection: 'column',
          alignItems: 'center',
          width: 150,
          zIndex: 150,
        }}>
        <Pressable
          onPress={() => {
            setComponentModalVisible(modalVisible);
          }}>
          <View
            style={{
              paddingHorizontal: 12,
              paddingVertical: 10,
              backgroundColor: '#ffffff',
              borderRadius: 8,
              //iOS
              shadowColor: '#A6AAAE',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.4,
              shadowRadius: 10,
              // Android
              elevation: 10,
              width: 150,
              height: '100%',
            }}>
            <TouchableOpacity
              onPress={() => {
                handleRecomment(data.id);
                setDotsModalVisible(false);
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
                  style={{paddingVertical: 8, fontSize: 14, color: '#3A424E'}}>
                  대댓글 달기
                </Text>
              </View>
            </TouchableOpacity>
            <Pressable
              onPress={() => {
                setModalVisible(true);
                setComponentModalVisible(modalVisible);
                setDotsModalVisible(false);
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  zIndex: 120,
                }}>
                <BlackTrashIcon style={{marginRight: 8}} />
                <Text style={{paddingVertical: 8, fontSize: 14}}>삭제하기</Text>
              </View>
            </Pressable>
          </View>
        </Pressable>
      </View>
    </>
  );
  /* Comment : 상대방 댓글 */
  const handleCommentReportComponent = (
    <>
      <ReportModalBottom
        modalVisible={reportModalVisible}
        setModalVisible={setReportModalVisible}
        title="해당 댓글을 신고하시겠어요?"
        purpleButtonText="네, 신고할게요."
        reportId={data?.id}
        reportFunc={handleCommentReport}
        whiteButtonText="아니요."
        whiteButtonFunc={() => setReportModalVisible(false)}
        setDim={false}
        modalType="댓글"
      />
      <MessageModalBottom
        modalVisible={messageModalVisible}
        setModalVisible={setMessageModalVisible}
        purpleButtonText="확인"
        purpleButtonFunc={handlePostMessage}
        setDim={false}
        anonymous={data.isAnonymous}
      />
      <ModalBottom
        modalVisible={blockModalVisible}
        setModalVisible={setBlockModalVisible}
        title="쪽지를 보낼 수 없는 상대입니다."
      />
      {data?.isReported ? (
        <Pressable
          onPress={() => {
            Toast.show('이미 신고한 댓글입니다.', Toast.SHORT);
          }}>
          <Report style={{marginRight: 14}} />
        </Pressable>
      ) : (
        <View
          style={{
            position: 'absolute',
            top: -20,
            right: 10,
            flexDirection: 'column',
            alignItems: 'center',
            width: 150,
            height: 120,
            zIndex: 150,
          }}>
          <Pressable
            onPress={() => {
              setComponentModalVisible(modalVisible);
            }}>
            <View
              style={{
                paddingHorizontal: 12,
                paddingVertical: 10,
                backgroundColor: '#ffffff',
                borderRadius: 8,
                //iOS
                shadowColor: '#A6AAAE',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.4,
                shadowRadius: 10,
                // Android
                elevation: 10,
                width: 150,
                height: '100%',
              }}>
              <TouchableOpacity onPress={() => handleRecomment(data.id)}>
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
              <TouchableOpacity onPress={() => blockedCheck(data.isAnonymous)}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    zIndex: 120,
                  }}>
                  <BlackMessageIcon style={{marginRight: 8}} />
                  <Text style={{paddingVertical: 8, fontSize: 14}}>
                    쪽지하기
                  </Text>
                </View>
              </TouchableOpacity>
              <MessageModalBottom
                modalVisible={messageModalVisible}
                setModalVisible={setMessageModalVisible}
                purpleButtonText="확인"
                purpleButtonFunc={handlePostMessage}
                setDim={false}
                anonymous={data?.isAnonymous}
              />
              <TouchableOpacity onPress={() => setReportModalVisible(true)}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    zIndex: 120,
                  }}>
                  <BlackReport style={{marginRight: 8}} />
                  <Text style={{paddingVertical: 8, fontSize: 14}}>
                    신고하기
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </Pressable>
        </View>
        /* <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Pressable
            onPress={() => {
              setReportModalVisible(true);
              setComponentModalVisible(reportModalVisible);
            }}>
            <NoReport style={{marginRight: 14}} />
          </Pressable>

          <Pressable
            onPress={() => {
              blockedCheck(data.isAnonymous);
            }}>
            <MessageIcon style={{marginRight: 14, marginTop: 4}} />
          </Pressable>
        </View> */
      )}
    </>
  );

  return (
    <>
      <View
        style={{
          paddingHorizontal: 16,
          overflow: 'visible',
          borderBottomColor: '#efeff3',
          borderBottomWidth: 1,
          backgroundColor: isRecommentState
            ? '#F3E7FF'
            : data?.isOfReader
            ? '#fff'
            : '#FFF',
        }}>
        <View
          style={{
            position: 'relative',
            overflow: 'visible',
            flexDirection: 'row',
            marginTop: 16,
            marginBottom: 10,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: 24, height: 24, borderRadius: 12}}
              source={{uri: data?.profileImage}}
            />
            <View style={{flexDirection: 'column'}}>
              <Text
                style={[
                  fontMedium,
                  {
                    fontSize: 14,
                    fontWeight: '600',
                    fontFamily: 'Pretendard-SemiBold',
                    paddingLeft: 10,
                    color: data?.isOfPostAuthor ? '#A055FF' : '#000',
                    paddingBottom: 2,
                  },
                ]}>
                {data?.displayName}
              </Text>
              <Text
                style={[
                  fontRegular,
                  {
                    color: '#9DA4AB',
                    fontSize: 12,
                    fontWeight: '500',
                    paddingLeft: 10,
                  },
                ]}>
                {data?.createdAt}
              </Text>
            </View>
            {data.isAnonymous ? (
              <></>
            ) : data.isOfBoardOwner ? (
              data.boardType === 'PUBLIC' ? (
                <SmallOrangeFlag style={{marginLeft: 5}} />
              ) : (
                <SmallPurpleFlag style={{marginLeft: 5}} />
              )
            ) : (
              <></>
            )}
          </View>
          {data.isDeleted ? (
            data.isOfReader ? (
              <></>
            ) : (
              <SpinningThreeDots
                isMine={data.isOfReader}
                handleOptionModeIsNotMineComponent={
                  handleCommentReportComponent
                }
                isGrey={true}
              />
            )
          ) : data.isBlind ? (
            <></>
          ) : (
            <SpinningThreeDots
              isMine={data.isOfReader}
              handleOptionModeIsMineComponent={handleCommentDeleteComponent}
              handleOptionModeIsNotMineComponent={handleCommentReportComponent}
              isGrey={true}
            />
          )}
        </View>
        {data?.emoticonUrl && data.isDeleted === false ? (
          <Image
            source={{uri: data?.emoticonUrl}}
            style={{width: 100, height: 100, marginLeft: 34}}
          />
        ) : null}
        <Text
          style={[
            {
              color: data.isDeleted || data.isBlind ? '#6E7882' : '#222222',
              fontSize: 14,
              marginLeft: 34,
              zIndex: 98,
            },
            fontRegular,
          ]}>
          <Autolink text={data ? (data.content ? data.content : '') : ''} />
        </Text>

        {data.isDeleted || data.isBlind ? (
          <></>
        ) : (
          <>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginLeft: 34,
                justifyContent: 'flex-start',
                zIndex: 99,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Pressable hitSlop={20} onPress={handleLocalCommentLike}>
                  {localIsLiked ? (
                    <HeartIcon fill="#FF6376" stroke="#FF6376" />
                  ) : (
                    <HeartIcon fill="white" stroke="#9DA4AB" />
                  )}
                </Pressable>
                <Text
                  style={[
                    fontRegular,
                    {color: '#9DA4AB', marginRight: 1, marginLeft: 5},
                  ]}>
                  좋아요
                </Text>
                <Text style={[fontRegular, styles.postLike]}>
                  {localLikeCount}개
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Pressable
                  hitSlop={{top: 15, left: 10, bottom: 15, right: 30}}
                  onPress={() => handleRecomment(data.id)}>
                  <ChatIcon />
                </Pressable>
                <Text
                  style={[
                    fontRegular,
                    {
                      color: '#9DA4AB',
                      marginRight: 1,
                      marginLeft: 5,
                    },
                  ]}>
                  대댓글
                </Text>
                <Text style={[fontRegular, styles.postLike]}>
                  {data?.recomments.length}개
                </Text>
              </View>
            </View>
          </>
        )}
        <View style={{marginBottom: 15}} />
      </View>
    </>
  );
};
export default Comment;
const styles = StyleSheet.create({
  postLike: {
    fontSize: 13,
    color: '#9DA4AB',
    marginLeft: 5,
    marginRight: 11,
  },
  postComment: {
    fontSize: 13,
    marginLeft: 5,
    width: 35,
  },
});

interface RecommentProps {
  navigation: any;
  recomment?: any;
  handleCommentLike?: any;
  handleCommentDelete: any;
  handleCommentReport?: any;
  componentModalVisible?: boolean;
  setComponentModalVisible?: any;
}

export const Recomment = ({
  navigation,
  recomment,
  handleCommentLike,
  handleCommentDelete,
  handleCommentReport,
  setComponentModalVisible,
}: RecommentProps) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [reportModalVisible, setReportModalVisible] = useState<boolean>(false);
  const [messageModalVisible, setMessageModalVisible] =
    useState<boolean>(false);
  const [blockModalVisible, setBlockModalVisible] = useState<boolean>(false);
  const [chatResponse, setChatResponse] = useState<any>({});
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const data: RecommentDto = recomment;
  const [localLikeCount, setLocalLikeCount] = useState(data?.likeCount || 0);
  const [localIsLiked, setLocalIsLiked] = useState(data?.isLiked || false);

  useEffect(() => {
    setLocalLikeCount(data?.likeCount || 0);
    setLocalIsLiked(data?.isLiked || false);
  }, [data?.likeCount, data?.isLiked]);

  const blockedCheck = async (isAnonymous: boolean) => {
    let messageData = {
      partnerId: data.accountId,
      postId: data.postId,
      isAnonymous: isAnonymous,
    };
    const response = await postChatRoom(messageData);
    setChatResponse(response);
    const block = await getMessageContent(response.data.roomId, 0);

    if (!block.data.isBlocked) {
      setMessageModalVisible(true);
    } else {
      setBlockModalVisible(true);
      console.log('block', block.data.isBlocked);
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000); // Hide after 3 seconds
  };

  const handlePostMessage = async () => {
    if (chatResponse.code === 'CREATE_CHAT_ROOM_SUCCESS') {
      navigation.navigate('MessageScreen', {roomId: chatResponse.data.roomId});
    } else {
      setTimeout(function () {
        Toast.show(
          '쪽지방을 만들던 중 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.',
          Toast.SHORT,
        );
      }, 100);
    }
    setMessageModalVisible(false);
  };

  const handleLocalCommentLike = async () => {
    // 즉시 UI 업데이트
    setLocalIsLiked(!localIsLiked);
    setLocalLikeCount(localIsLiked ? localLikeCount - 1 : localLikeCount + 1);

    // API 호출
    await handleCommentLike(data.id);
  };

  /* Recomment : 내 댓글 */
  const handleCommentDeleteComponent = (
    <>
      <ModalBottom
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={`작성한 댓글을 삭제하시겠습니까?`}
        content={`• 삭제 후에는 되돌릴 수 없습니다.`}
        isContentCenter={false}
        purpleButtonText="삭제"
        purpleButtonFunc={() => {
          handleCommentDelete(data.id);
          setModalVisible(false);
          setTimeout(function () {
            Toast.show(
              '작성하신 댓글이 성공적으로 삭제되었습니다.',
              Toast.SHORT,
            );
          }, 100);
        }}
        // whiteButtonText="취소"
        // whiteButtonFunc={() => setModalVisible(false)}
        setDim={false}
      />

      <View
        style={{
          position: 'absolute',
          top: -20,
          right: 10,
          flexDirection: 'column',
          alignItems: 'center',
          width: 150,
          zIndex: 150,
        }}>
        <Pressable
          onPress={() => {
            setComponentModalVisible(modalVisible);
          }}>
          <View
            style={{
              paddingHorizontal: 12,
              paddingVertical: 10,
              backgroundColor: '#ffffff',
              borderRadius: 8,
              //iOS
              shadowColor: '#A6AAAE',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.4,
              shadowRadius: 10,
              // Android
              elevation: 10,
              width: 150,
              height: '100%',
            }}>
            <Pressable
              onPress={() => {
                setModalVisible(true);
                setComponentModalVisible(modalVisible);
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  zIndex: 120,
                }}>
                <BlackTrashIcon style={{marginRight: 8}} />
                <Text style={{paddingVertical: 6, fontSize: 14}}>삭제하기</Text>
              </View>
            </Pressable>
          </View>
        </Pressable>
      </View>
    </>
  );

  /* Recomment : 상대방 댓글 */
  const handleCommentReportComponent = (
    <>
      <ReportModalBottom
        modalVisible={reportModalVisible}
        setModalVisible={setReportModalVisible}
        title="해당 댓글을 신고하시겠어요?"
        purpleButtonText="네, 신고할게요."
        reportId={data?.id}
        reportFunc={handleCommentReport}
        whiteButtonText="아니요."
        whiteButtonFunc={() => setReportModalVisible(false)}
        setDim={false}
        modalType="댓글"
      />
      <MessageModalBottom
        modalVisible={messageModalVisible}
        setModalVisible={setMessageModalVisible}
        purpleButtonText="확인"
        purpleButtonFunc={handlePostMessage}
        setDim={false}
        anonymous={data.isAnonymous}
      />
      <ModalBottom
        modalVisible={blockModalVisible}
        setModalVisible={setBlockModalVisible}
        title="쪽지를 보낼 수 없는 상대입니다."
      />
      {data?.isReported ? (
        <Pressable
          onPress={() => {
            Toast.show('이미 신고한 댓글입니다.', Toast.SHORT);
          }}>
          <Report style={{marginRight: 14}} />
        </Pressable>
      ) : (
        <View
          style={{
            position: 'absolute',
            top: -20,
            right: 10,
            flexDirection: 'column',
            alignItems: 'center',
            width: 150,
            zIndex: 150,
          }}>
          <Pressable
            onPress={() => {
              setComponentModalVisible(modalVisible);
            }}>
            <View
              style={{
                paddingHorizontal: 12,
                paddingVertical: 10,
                backgroundColor: '#ffffff',
                borderRadius: 8,
                //iOS
                shadowColor: '#A6AAAE',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.4,
                shadowRadius: 10,
                // Android
                elevation: 10,
                width: 150,
                height: '100%',
              }}>
              <TouchableOpacity onPress={() => blockedCheck(data.isAnonymous)}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    zIndex: 120,
                  }}>
                  <BlackMessageIcon style={{marginRight: 8}} />
                  <Text style={{paddingVertical: 8, fontSize: 14}}>
                    쪽지하기
                  </Text>
                </View>
              </TouchableOpacity>
              <MessageModalBottom
                modalVisible={messageModalVisible}
                setModalVisible={setMessageModalVisible}
                purpleButtonText="확인"
                purpleButtonFunc={handlePostMessage}
                setDim={false}
                anonymous={data?.isAnonymous}
              />
              <TouchableOpacity onPress={() => setReportModalVisible(true)}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    zIndex: 120,
                  }}>
                  <BlackReport style={{marginRight: 8}} />
                  <Text style={{paddingVertical: 8, fontSize: 14}}>
                    신고하기
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </Pressable>
        </View>
      )}
    </>
  );
  return (
    <>
      <View
        style={{
          paddingHorizontal: 16,
          paddingLeft: 48,
          backgroundColor: data.isOfReader ? '#fff' : '#FFF',
          paddingBottom: 12,
          borderBottomColor: '#F0F0F0',
          borderBottomWidth: 1,
          zIndex: 1,
          overflow: 'visible',
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 16,
            justifyContent: 'space-between',
            overflow: 'visible',
          }}>
          <View style={{flexDirection: 'row'}}>
            {/* <Reply style={{marginRight: 8}} /> */}
            <Image
              style={{width: 24, height: 24, borderRadius: 12}}
              source={{uri: data?.profileImage}}
            />
            <View style={{flexDirection: 'column'}}>
              <Text
                style={[
                  fontMedium,
                  {
                    fontSize: 14,
                    fontFamily: 'Pretendard-SemiBold',
                    fontWeight: '600',
                    paddingLeft: 10,
                    color: data?.isOfPostAuthor ? '#A055FF' : '#000',
                  },
                ]}>
                {data.displayName}
              </Text>
              <Text
                style={[
                  {
                    color: '#9DA4AB',
                    fontSize: 12,
                    paddingLeft: 10,
                    fontWeight: '500',
                  },
                  fontRegular,
                ]}>
                {data?.createdAt}
              </Text>
            </View>
            {data.isAnonymous ? (
              <></>
            ) : data.isOfBoardOwner ? (
              data.boardType === 'PUBLIC' ? (
                <SmallOrangeFlag style={{marginLeft: 5}} />
              ) : (
                <SmallPurpleFlag style={{marginLeft: 5}} />
              )
            ) : (
              <></>
            )}
          </View>
          {data.isDeleted ? (
            data.isOfReader ? (
              <></>
            ) : (
              <SpinningThreeDots
                isMine={data.isOfReader}
                handleOptionModeIsNotMineComponent={
                  handleCommentReportComponent
                }
                isGrey={true}
              />
            )
          ) : data.isBlind ? (
            <></>
          ) : (
            <SpinningThreeDots
              isMine={data.isOfReader}
              handleOptionModeIsMineComponent={handleCommentDeleteComponent}
              handleOptionModeIsNotMineComponent={handleCommentReportComponent}
              isGrey={true}
            />
          )}
        </View>
        <View style={{marginLeft: 34}}>
          {data?.emoticonUrl && data.isDeleted === false ? (
            <Image
              source={{uri: data?.emoticonUrl}}
              style={{width: 100, height: 100}}
            />
          ) : null}
          <Text
            style={[
              {
                color: data.isDeleted || data.isBlind ? '#6E7882' : '#222222',
                fontSize: 14,
              },
              fontRegular,
            ]}>
            <Autolink text={data ? (data.content ? data.content : '') : ''} />
          </Text>

          {data.isDeleted || data.isBlind ? (
            <></>
          ) : (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Pressable hitSlop={20} onPress={handleLocalCommentLike}>
                    {localIsLiked ? (
                      <HeartIcon fill="#FF6376" stroke="#FF6376" />
                    ) : (
                      <HeartIcon fill="white" stroke="#9DA4AB" />
                    )}
                  </Pressable>
                  <Text
                    style={[
                      fontRegular,
                      {color: '#9DA4AB', marginRight: 1, marginLeft: 5},
                    ]}>
                    좋아요
                  </Text>
                  <Text style={[fontRegular, styles.postLike]}>
                    {localLikeCount}개
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    </>
  );
};

export const Reply = (props: any) => (
  <Svg
    width="11"
    height="13"
    viewBox="0 0 11 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M11 8.41177L6.6 13L5.55867 11.9141L8.19133 9.17647H0V0H1.46667V7.64706H8.19133L5.55867 4.90941L6.6 3.82353L11 8.41177Z"
      fill="#6E7882"
    />
  </Svg>
);
