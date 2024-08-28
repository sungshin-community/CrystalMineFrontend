import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Pressable, Image} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import PostLike from '../../resources/icon/PostLike';
import PostUnlike from '../../resources/icon/PostUnlike';
import PostComment from '../../resources/icon/PostComment';
import CommentDto, {RecommentDto} from '../classes/CommentDto';
import SpinningThreeDots from './SpinningThreeDots';
import TrashIcon from '../../resources/icon/TrashIcon';
import {ModalBottom} from '../components/ModalBottom';
import {SelectModalBottom} from './SelectModalBottom';
import {MessageModalBottom} from './SelectRowModalBottom';
import Toast from 'react-native-simple-toast';
import NoReport, {Report} from '../../resources/icon/Report';
import {fontMedium, fontRegular} from '../common/font';
import Autolink from 'react-native-autolink';
import {SmallOrangeFlag} from '../../resources/icon/SmallOrangeFlag';
import {SmallPurpleFlag} from '../../resources/icon/SmallPurpleFlag';
import MessageIcon from '../../resources/icon/Message';
import {getMessageContent, postChatRoom} from '../common/messageApi';

interface Props {
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
  useEffect(() => {
    if (!isRecomment) setIsRecommentState(false);
  }, [isRecomment]);

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

  const handleCommentDeleteComponent = (
    <>
      <ModalBottom
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        content={`작성한 댓글을 삭제하시겠습니까?`}
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
        whiteButtonText="취소"
        whiteButtonFunc={() => setModalVisible(false)}
        setDim={false}
      />
      <Pressable
        onPress={() => {
          setModalVisible(true);
          setComponentModalVisible(modalVisible);
        }}>
        <TrashIcon style={{marginRight: 12}} />
      </Pressable>
    </>
  );
  const handleCommentReportComponent = (
    <>
      <SelectModalBottom
        modalVisible={reportModalVisible}
        setModalVisible={setReportModalVisible}
        title={`댓글 신고`}
        purpleButtonText="신고하기"
        reportId={data.id}
        reportFunc={handleCommentReport}
        whiteButtonText="취소"
        whiteButtonFunc={() => setReportModalVisible(false)}
        setDim={false}
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Pressable
            onPress={() => {
              setReportModalVisible(true);
              setComponentModalVisible(reportModalVisible);
            }}>
            <NoReport style={{marginRight: 14}} />
          </Pressable>
          {/* 여기 */}
          <Pressable
            onPress={() => {
              blockedCheck(data.isAnonymous);
            }}>
            <MessageIcon style={{marginRight: 14, marginTop: 4}} />
          </Pressable>
        </View>
      )}
    </>
  );

  return (
    <>
      <View
        style={{
          paddingHorizontal: 24,
          backgroundColor: isRecommentState
            ? '#F3E7FF'
            : data?.isOfReader
            ? '#fff'
            : '#FFF',
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 15,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{width: 24, height: 24, borderRadius: 12}}
              source={{uri: data?.profileImage}}
            />
            <View style={{flexDirection: 'column'}}>
              <Text
                style={[
                  fontMedium,
                  {
                    fontSize: 15,
                    paddingLeft: 8,
                    color: data?.isOfPostAuthor ? '#A055FF' : '#000',
                  },
                ]}>
                {data?.displayName}
              </Text>
              <Text
                style={[
                  fontRegular,
                  {color: '#9DA4AB', fontSize: 12, paddingLeft: 10},
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
              />
            )
          ) : data.isBlind ? (
            <></>
          ) : (
            <SpinningThreeDots
              isMine={data.isOfReader}
              handleOptionModeIsMineComponent={handleCommentDeleteComponent}
              handleOptionModeIsNotMineComponent={handleCommentReportComponent}
            />
          )}
        </View>
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
                marginTop: 15,
                justifyContent: 'flex-start',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Pressable
                  hitSlop={20}
                  onPress={() => {
                    handleCommentLike(data.id);
                  }}>
                  {data.isLiked ? <PostLike /> : <PostUnlike />}
                </Pressable>
                <Text
                  style={[
                    fontRegular,
                    {color: '#9DA4AB', marginRight: 1, marginLeft: 5},
                  ]}>
                  좋아요
                </Text>
                <Text style={[fontRegular, styles.postLike]}>
                  {data?.likeCount}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Pressable
                  hitSlop={{top: 15, left: 10, bottom: 15, right: 30}}
                  onPress={() => {
                    handleFocus();
                    setParentId(data.id);
                    setIsRecomment(!isRecomment);
                    setIsRecommentState(!isRecommentState);
                  }}>
                  <PostComment />
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

  const data: RecommentDto = recomment;
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

  const handleCommentDeleteComponent = (
    <>
      {modalVisible && (
        <ModalBottom
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          content={`작성한 댓글을 삭제하시겠습니까?`}
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
          whiteButtonText="취소"
          whiteButtonFunc={() => setModalVisible(false)}
          setDim={false}
        />
      )}
      <Pressable
        onPress={() => {
          setModalVisible(true);
          setComponentModalVisible(modalVisible);
        }}>
        <TrashIcon style={{marginRight: 12}} />
      </Pressable>
    </>
  );
  const handleCommentReportComponent = (
    <>
      <SelectModalBottom
        modalVisible={reportModalVisible}
        setModalVisible={setReportModalVisible}
        title={`댓글 신고`}
        purpleButtonText="신고하기"
        reportId={data.id}
        reportFunc={handleCommentReport}
        whiteButtonText="취소"
        whiteButtonFunc={() => setReportModalVisible(false)}
        setDim={false}
      />
      <MessageModalBottom
        modalVisible={messageModalVisible}
        setModalVisible={setMessageModalVisible}
        purpleButtonText="확인"
        purpleButtonFunc={handlePostMessage}
        anonymous={data.isAnonymous}
        setDim={false}
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
        </View>
      )}
    </>
  );
  return (
    <>
      <View
        style={{
          paddingHorizontal: 24,
          backgroundColor: data.isOfReader ? '#F8F8F8' : '#FFF',
          paddingBottom: 12,
          borderTopColor: '#F0F0F0',
          borderTopWidth: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 15,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Reply style={{marginRight: 8}} />
            <Image
              style={{width: 24, height: 24, borderRadius: 12}}
              source={{uri: data?.profileImage}}
            />
            <Text
              style={[
                fontMedium,
                {
                  fontSize: 15,
                  paddingLeft: 8,
                  color: data?.isOfPostAuthor ? '#A055FF' : '#000',
                },
              ]}>
              {data.displayName}
            </Text>
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
              />
            )
          ) : data.isBlind ? (
            <></>
          ) : (
            <SpinningThreeDots
              isMine={data.isOfReader}
              handleOptionModeIsMineComponent={handleCommentDeleteComponent}
              handleOptionModeIsNotMineComponent={handleCommentReportComponent}
            />
          )}
        </View>
        <View style={{marginLeft: 20}}>
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
                  marginTop: 15,
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Pressable
                    hitSlop={20}
                    onPress={() => handleCommentLike(data.id)}>
                    {data.isLiked ? <PostLike /> : <PostUnlike />}
                  </Pressable>
                  <Text style={[fontRegular, styles.postLike]}>
                    {data?.likeCount}
                  </Text>
                </View>
                <View>
                  <Text style={[fontRegular, {color: '#949494', fontSize: 13}]}>
                    {data?.createdAt}
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
