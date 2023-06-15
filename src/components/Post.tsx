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
import PostUnlike from '../../resources/icon/PostUnlike';
import PostComment from '../../resources/icon/PostComment';
import ThreeDots from './ThreeDots';
import Scrap, {NoScrap} from '../../resources/icon/Scrap';
import PostItem from './PostItem';
import PostDto from '../classes/PostDto';
import SpinningThreeDots from './SpinningThreeDots';
import TrashIcon from '../../resources/icon/TrashIcon';
import {ModalBottom} from '../components/ModalBottom';
import {MessageModalBottom} from './SelectRowModalBottom';
import Toast from 'react-native-simple-toast';
import {useNavigation} from '@react-navigation/native';
import {SelectModalBottom} from '../components/SelectModalBottom';
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
import {postChatRoom} from '../common/messageApi';
interface Props {
  post: any;
  handlePostLike: any;
  handlePostScrap: any;
  handlePostDelete?: any;
  handlePostReport?: any;
  componentModalVisible?: boolean;
  setComponentModalVisible?: any;
}

function Post({
  post,
  handlePostLike,
  handlePostScrap,
  handlePostDelete,
  handlePostReport,
  setComponentModalVisible,
}: Props) {
  const navigation = useNavigation();
  const data: PostDto = post;
  const [isPhotoVisible, setIsPhotoVisible] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [reportModalVisible, setReportModalVisible] = useState<boolean>(false);
  const [muteModalVisible, setMuteModalVisible] = useState<boolean>(false);
  const [messageModalVisible, setMessageModalVisible] =
    useState<boolean>(false);
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

  const handlePostScrapComponent = (
    <View style={{marginRight: 16}}>
      <Pressable hitSlop={10} onPress={() => handlePostScrap(data.postId)}>
        {data?.isScraped ? <Scrap /> : <NoScrap />}
      </Pressable>
    </View>
  );

  const handlePostMessage = async (isAnonymous: boolean) => {
    let messageData = {
      partnerId: 15,
      postId: post.postId,
      isAnonymous: isAnonymous,
    };

    // const response = await postChatRoom(messageData);
    // if (response.data === 'OK') {
    navigation.navigate('MessageScreen', {roomId: 4});
    // navigation.navigate('MessageScreen', {roomId: response.data.roomId});
    // }
    setMessageModalVisible(false);
  };

  const handlePostDeleteComponent = (
    <>
      <ModalBottom
        modalVisible={deleteModalVisible}
        setModalVisible={setDeleteModalVisible}
        content={`작성한 게시글을 삭제하시겠습니까?`}
        purpleButtonText="삭제"
        purpleButtonFunc={() => {
          if (handlePostDelete(data.postId)) {
            setDeleteModalVisible(false);
            setTimeout(function () {
              Toast.show(
                '작성하신 게시글이 성공적으로 삭제되었습니다.',
                Toast.SHORT,
              );
            }, 100);
            // navigation.goBack();
            navigation.pop();
            navigation.pop();
            navigation.navigate('PostListScreen', {boardId: data.boardId});
            console.log('게시글 삭제 성공');
          }
        }}
        whiteButtonText="취소"
        whiteButtonFunc={() => setDeleteModalVisible(false)}
        setDim={false}
      />
      <Pressable
        onPress={() => {
          setDeleteModalVisible(true);
          setComponentModalVisible(deleteModalVisible);
        }}>
        <TrashIcon style={{marginRight: 12}} />
      </Pressable>
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
      <SelectModalBottom
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
            <Report style={{marginRight: 14}} />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              setReportModalVisible(true);
              setComponentModalVisible(reportModalVisible);
            }}>
            <NoReport style={{marginRight: 14}} />
          </Pressable>
        )}
        <Pressable
          onPress={() => {
            setMessageModalVisible(true);
            setComponentModalVisible(messageModalVisible);
          }}>
          <NoReport style={{marginRight: 14}} />
        </Pressable>
      </View>
    </>
  );
  return (
    <>
      <View style={styles.postContainer}>
        <View style={styles.postHeader}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{width: 24, height: 24, borderRadius: 12}}
              source={{uri: data?.profileImage}}
            />
            <View style={{justifyContent: 'center'}}>
              <Text
                style={[
                  fontMedium,
                  {fontSize: 16, paddingLeft: 8, fontWeight: `500`},
                ]}>
                {data?.displayName}
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
            <SpinningThreeDots
              isMine={data?.isAuthor}
              handleDefaultModeComponent={handlePostScrapComponent}
              handleOptionModeIsMineComponent={handlePostDeleteComponent}
              handleOptionModeIsNotMineComponent={handleOthersPostComponent}
            />
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
              {fontSize: 14, color: '#222222', lineHeight: 22.5},
            ]}>
            <Autolink text={data ? (data.content ? data.content : '') : ''} />
          </Text>
        </View>
        <Text
          style={[
            fontRegular,
            {color: '#949494', fontSize: 12, marginTop: 12},
          ]}>
          {data?.createdAt}
        </Text>
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
                      marginRight: 16,
                    }}
                    source={{uri: url}}
                  />
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
          <Pressable
            hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
            onPress={() => handlePostLike(data.postId)}>
            {data?.isLiked ? <PostLike /> : <PostUnlike />}
          </Pressable>
          <Text style={[fontRegular, styles.postLike]}>{data?.likeCount}</Text>
          <PostComment />
          <Text style={[fontRegular, styles.postComment]}>
            {data?.commentCount}
          </Text>
        </View>
      </View>
      {/* <View
        style={{borderWidth: 1, borderColor: '#F4F4F4', marginTop: 28}}></View> */}
    </>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    paddingHorizontal: 24,
    paddingTop: 18,
    marginBottom: 6,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postBody: {
    marginTop: 15,
  },
  postLike: {
    fontSize: 13,
    marginLeft: 5,
    marginRight: 11,
  },
  postComment: {
    fontSize: 13,
    marginLeft: 5,
    width: 35,
  },
});

export default Post;
