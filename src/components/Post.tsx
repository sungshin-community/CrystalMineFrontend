import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import styled from 'styled-components';
import ProfileImage from '../../resources/icon/ProfileImage';
import EmptyHeart from '../../resources/icon/EmptyHeart';
import EmptyComment from '../../resources/icon/EmptyComment';
import PostLike from '../../resources/icon/PostLike';
import HeartIcon from '../../resources/icon/HeartIcon';
import ChatIcon from '../../resources/icon/ChatIcon';
import PostUnlike from '../../resources/icon/PostUnlike';
import {PostComment} from '../../resources/icon/PostComment';
import ThreeDots from './ThreeDots';
import Scrap, {NoScrap} from '../../resources/icon/Scrap';
import PostItem from './PostItem';
import PostDto from '../classes/PostDto';
import SpinningThreeDots from './SpinningThreeDots';
import {TrashIcon} from '../../resources/icon/TrashIcon';
import {ModalBottom} from '../components/ModalBottom';
import {MessageModalBottom} from './SelectRowModalBottom';
import Toast from 'react-native-simple-toast';
import {useNavigation} from '@react-navigation/native';
import {ReportModalBottom} from '../components/ReportModalBottom';
import NoReport, {Report} from '../../resources/icon/Report';
import ImageViewer from 'react-native-image-zoom-viewer';
import {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {fontMedium, fontRegular} from '../common/font';
import {SmallOrangeFlag} from '../../resources/icon/SmallOrangeFlag';
import Autolink from 'react-native-autolink';
import {SmallPurpleFlag} from '../../resources/icon/SmallPurpleFlag';
import Markdown from 'react-native-markdown-display';
import UserMuteIcon from '../../resources/icon/UserMuteIcon';
import {setUserMute} from '../common/boardApi';
import {getHundredsDigit} from '../common/util/statusUtil';
import {logout} from '../common/authApi';
import {getMessageContent, postChatRoom} from '../common/messageApi';
import {MessageIcon, BlackMessageIcon} from '../../resources/icon/Message';
import CustomToast from './CustomToast';
import {FooterHeart} from '../../resources/icon/HeartIcon';
import {FooterChat} from '../../resources/icon/ChatIcon';
import {FooterScrap} from '../../resources/icon/Scrap';
import {FooterReport} from '../../resources/icon/Report';
import {FooterMessage} from '../../resources/icon/Message';
import BlockIcon from '../../resources/icon/BlockIcon';
import {postBlockMine} from '../common/boardApi';

interface Props {
  navigation: any;
  post: any;
  handlePostLike: any;
  handlePostScrap: any;
  handlePostDelete?: any;
  handlePostReport?: any;
  componentModalVisible?: boolean;
  setComponentModalVisible?: any;
}

function Post({
  navigation,
  post,
  handlePostLike,
  handlePostScrap,
  handlePostDelete,
  handlePostReport,
  setComponentModalVisible,
}: Props) {
  const data: PostDto = post;
  const [isPhotoVisible, setIsPhotoVisible] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [reportModalVisible, setReportModalVisible] = useState<boolean>(false);
  const [muteModalVisible, setMuteModalVisible] = useState<boolean>(false);
  const [messageModalVisible, setMessageModalVisible] =
    useState<boolean>(false);
  const [blockModalVisible, setBlockModalVisible] = useState<boolean>(false);
  const [chatResponse, setChatResponse] = useState<any>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000); // Hide after 3 seconds
  };

  const closePhotoModal = () => {
    if (isPhotoVisible) {
      setIsPhotoVisible(false);
    }
  };
  const imgUrlCoverting = (arr: string[]) => {
    const array = arr.map(url => {
      return {url: url};
    });
    return array;
  };

  /* const handlePostScrapComponent = (
    <View style={{marginRight: 16}}>
      <Pressable hitSlop={10} onPress={() => handlePostScrap(data.postId)}>
        {data?.isScraped ? <Scrap /> : <NoScrap />}
      </Pressable>
    </View>
  ); */

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

  const handlePostDeleteComponent = (
    <>
      <ModalBottom
        modalVisible={deleteModalVisible}
        setModalVisible={setDeleteModalVisible}
        title={`작성한 게시글을 삭제하시겠어요?`}
        content={`• 삭제 후에는 되돌릴 수 없습니다.`}
        setDim={false}
        isDelete
        isContentCenter={false}
        purpleButtonText="삭제할게요."
        purpleButtonFunc={() => {
          if (handlePostDelete(data.postId)) {
            setDeleteModalVisible(false);
            showToast('작성하신 게시글이 삭제되었습니다.');
            /* setTimeout(function () {
              Toast.show(
                '작성하신 게시글이 성공적으로 삭제되었습니다.',
                Toast.SHORT,
              );
            }, 100); */
            // navigation.goBack();
            navigation.pop();
            navigation.pop();
            navigation.navigate('PostListScreen', {boardId: data.boardId});
            console.log('게시글 삭제 성공');
          }
        }}
        /* whiteButtonText="취소"
        whiteButtonFunc={() => setDeleteModalVisible(false)}
        setDim={false} */
      />
      {data?.isAuthor && (
        <Pressable
          onPress={() => {
            setDeleteModalVisible(true);
            setComponentModalVisible(deleteModalVisible);
          }}>
          <TrashIcon style={{marginLeft: 16}} />
        </Pressable>
      )}
    </>
  );
  const handleOthersPostComponent = (
    <>
      <ModalBottom
        modalVisible={muteModalVisible}
        setModalVisible={setMuteModalVisible}
        content={`해당 이용자를 피드에서 숨기시겠습니까? \n해당 이용자가 작성한 모든 글이 숨김 처리 되며, \n이 기능은 취소할 수 없습니다.`}
        purpleButtonText="해당 이용자의 게시글 숨기기"
        purpleButtonFunc={async () => {
          const result = await setUserMute(data.postId);
          if (result.status === 401) {
            setTimeout(function () {
              Toast.show(
                '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
                Toast.SHORT,
              );
            }, 100);
            logout();
            navigation.reset({routes: [{name: 'SplashHome'}]});
          } else if (getHundredsDigit(result.status) === 2) {
            setTimeout(function () {
              Toast.show(
                '해당 이용자의 게시글이 모두 숨김처리 됐습니다.',
                Toast.SHORT,
              );
            }, 100);
            setMuteModalVisible(false);
            navigation.pop();
          } else if (result.data.code === 'USER_BLOCK_FAIL_ADMIN') {
            setTimeout(function () {
              Toast.show('관리자의 게시글은 숨길 수 없습니다.', Toast.SHORT);
            }, 100);
            setMuteModalVisible(false);
          } else if (result.data.code === 'BLOCK_DUPLICATION') {
            setTimeout(function () {
              Toast.show('이미 숨김처리 된 게시글입니다. ', Toast.SHORT);
            }, 100);
            setMuteModalVisible(false);
          } else {
            setTimeout(function () {
              Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
            }, 100);
            setMuteModalVisible(false);
          }
        }}
        whiteButtonText="취소"
        whiteButtonFunc={() => setMuteModalVisible(false)}
        setDim={false}
      />
      <ReportModalBottom
        modalVisible={reportModalVisible}
        setModalVisible={setReportModalVisible}
        title={`게시글 신고`}
        purpleButtonText="신고하기"
        reportId={data?.postId}
        reportFunc={handlePostReport}
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
        anonymous={data?.isAnonymous}
      />
      <ModalBottom
        modalVisible={blockModalVisible}
        setModalVisible={setBlockModalVisible}
        title="쪽지를 보낼 수 없는 상대입니다."
      />
      <View style={{flexDirection: 'row'}}>
        <Pressable
          onPress={() => {
            setMuteModalVisible(true);
          }}>
          <UserMuteIcon style={{marginRight: 14}} />
        </Pressable>
        {data?.isReported ? (
          <Pressable
            onPress={() => {
              Toast.show('이미 신고한 게시글입니다.', Toast.SHORT);
            }}>
            <FooterReport fill="#9DA4AB" />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              setReportModalVisible(true);
              setComponentModalVisible(reportModalVisible);
            }}>
            <FooterReport />
          </Pressable>
        )}
        <Pressable
          onPress={() => {
            blockedCheck(data.isAnonymous);
          }}>
          <MessageIcon style={{marginRight: 14, marginTop: 5, marginLeft: 3}} />
        </Pressable>
      </View>
    </>
  );
  console.log(post);

  const handlePostBlock = async () => {
    setBlockModalVisible(false);
    try {
      await postBlockMine(data.postId);
      showToast('글쓴이가 차단되었습니다.');
      navigation.pop();
      navigation.navigate('PostListScreen', {boardId: data.boardId});
    } catch (error) {
      console.error('차단 실패:', error);
      showToast('차단에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <View style={styles.postContainer}>
        <View style={styles.postHeader}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{width: 36, height: 36, borderRadius: 12}}
              source={{uri: data?.profileImage}}
            />
            <View style={{flexDirection: 'column'}}>
              <Text
                style={[
                  fontMedium,
                  {fontSize: 14, paddingLeft: 12, fontWeight: '600'},
                ]}>
                {data?.displayName}
              </Text>
              <Text
                style={[
                  fontRegular,
                  {
                    color: '#9DA4AB',
                    fontSize: 12,
                    paddingLeft: 12,
                    fontWeight: '500',
                  },
                ]}>
                {data?.createdAt}
              </Text>
            </View>
            {!data?.isAnonymous &&
              data?.isOwner &&
              (data.boardType === 'PUBLIC' ? (
                <SmallOrangeFlag style={{marginLeft: 5}} />
              ) : (
                <SmallPurpleFlag style={{marginLeft: 5}} />
              ))}
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <SpinningThreeDots
              boardId={data?.boardId}
              isMine={data?.isAuthor}
              handleDefaultModeComponent={handlePostScrapComponent}
              handleOptionModeIsMineComponent={handlePostDeleteComponent}
              handleOptionModeIsNotMineComponent={handleOthersPostComponent}
            /> */}
          </View>
        </View>
        {data?.hasTitle && (
          <Text style={[fontMedium, {fontSize: 17, marginTop: 12}]}>
            {data?.title}
          </Text>
        )}
        <View style={styles.postBody}>
          <Text
            style={[
              fontRegular,
              {
                fontSize: 14,
                fontWeight: '500',
                color: '#222222',
                lineHeight: 22.5,
              },
            ]}>
            <Autolink text={data ? (data.content ? data.content : '') : ''} />
          </Text>
        </View>
        {data?.thumbnails.length !== 0 && (
          <View style={{flexDirection: 'row', marginTop: 16}}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}>
              {data?.thumbnails.map((url, index) => (
                <Pressable
                  key={index}
                  onPress={() =>
                    navigation.navigate('ImageViewerScreen', {
                      imageUrls: imgUrlCoverting(data.images),
                      index: index,
                    })
                  }>
                  <Image
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 10,
                      marginRight: 8,
                    }}
                    source={{uri: url}}
                  />
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
      {data?.boardId !== 93 && data?.boardId !== 94 && data?.boardId !== 95 && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 15,
            height: 44,
            borderTopWidth: 1,
            borderTopColor: '#EFEFF3',
            //backgroundColor: '#EFEFF3',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 20,
            }}>
            <Pressable
              hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
              onPress={() => handlePostLike(data.postId)}>
              {data?.isLiked ? (
                <FooterHeart fill="#FF6376" stroke="#FF6376" />
              ) : (
                <FooterHeart fill="white" stroke="#9DA4AB" />
              )}
            </Pressable>
            <Text style={[fontRegular, {color: '#9DA4AB', marginLeft: 6}]}>
              좋아요
            </Text>
            <Text style={[fontRegular, styles.postLike]}>
              {data?.likeCount}
            </Text>
            <FooterChat />
            <Text
              style={[
                fontRegular,
                {
                  color: '#9DA4AB',
                  marginLeft: 6,
                },
              ]}>
              댓글
            </Text>
            <Text style={[fontRegular, styles.postComment]}>
              {data?.commentCount}
            </Text>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 16,
              }}>
              {data?.isAuthor ? (
                handlePostDeleteComponent
              ) : (
                <>
                  <Pressable
                    style={{marginRight: 16}}
                    onPress={() => {
                      setBlockModalVisible(true);
                    }}>
                    <BlockIcon />
                  </Pressable>
                  <ModalBottom
                    modalVisible={blockModalVisible}
                    setModalVisible={setBlockModalVisible}
                    title="해당 게시글의 글쓴이를 차단하시겠어요?"
                    content={` •  차단 이후, 해당 글쓴이의 게시글은 더이상 목록에서\n     노출되지 않습니다.`}
                    purpleButtonText="차단할게요."
                    setDim={false}
                    isBlock
                    purpleButtonFunc={handlePostBlock}
                  />
                  {data?.isReported ? (
                    <Pressable
                      onPress={() => showToast('이미 신고한 게시글입니다.')}>
                      <FooterReport fill="#9DA4AB" style={{marginRight: 16}} />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => {
                        setReportModalVisible(true);
                        setComponentModalVisible(reportModalVisible);
                      }}>
                      <FooterReport style={{marginRight: 16}} />
                    </Pressable>
                  )}
                  <ReportModalBottom
                    modalVisible={reportModalVisible}
                    setModalVisible={setReportModalVisible}
                    title="해당 게시글을 신고하시겠어요?"
                    purpleButtonText="네, 신고할게요."
                    reportId={data?.postId}
                    reportFunc={handlePostReport}
                    whiteButtonText="아니요."
                    whiteButtonFunc={() => setReportModalVisible(false)}
                    setDim={false}
                    modalType="게시글"
                  />
                  <Pressable
                    onPress={() => {
                      blockedCheck(data.isAnonymous);
                    }}>
                    <FooterMessage
                      style={{
                        marginHorizontal: 16,
                      }}
                    />
                  </Pressable>
                  <MessageModalBottom
                    modalVisible={messageModalVisible}
                    setModalVisible={setMessageModalVisible}
                    purpleButtonText="확인"
                    purpleButtonFunc={handlePostMessage}
                    setDim={false}
                    anonymous={data?.isAnonymous}
                  />
                  <Pressable
                    hitSlop={10}
                    onPress={() => handlePostScrap(data.postId)}>
                    {data?.isScraped ? (
                      <FooterScrap
                        style={{marginRight: 16}}
                        fill="#A055FF"
                        stroke="#A055FF"
                      />
                    ) : (
                      <FooterScrap
                        style={{
                          marginRight: 16,
                        }}
                      />
                    )}
                  </Pressable>
                </>
              )}
            </View>
            <CustomToast
              visible={toastVisible}
              message={toastMessage}
              onClose={() => setToastVisible(false)}
            />
          </View>
        </View>
      )}

      {/* <View
        style={{borderWidth: 1, borderColor: '#F4F4F4', marginTop: 28}}></View> */}
    </>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postBody: {
    marginTop: 16,
  },
  postLike: {
    marginLeft: 4,
    fontSize: 14,
    marginRight: 16,
    color: '#9DA4AB',
  },
  postComment: {
    fontSize: 14,
    marginLeft: 4,
    width: 35,
    color: '#9DA4AB',
  },
});

export default Post;
