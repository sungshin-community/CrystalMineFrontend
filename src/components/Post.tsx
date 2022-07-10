import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
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
import Toast from 'react-native-simple-toast';
import {useNavigation} from '@react-navigation/native';
import {SelectModalBottom} from '../components/SelectModalBottom';
import NoReport, {Report} from '../../resources/icon/Report';
type RootStackParamList = {
  PostListScreen: {boardId: number};
};
type NaviProps = NativeStackScreenProps<RootStackParamList>;
interface Props {
  post: any;
  handlePostLike: any;
  handlePostScrap: any;
  handlePostDelete?: any;
  handlePostReport?: any;
  boardId: number;
}

function Post({
  post,
  handlePostLike,
  handlePostScrap,
  handlePostDelete,
  handlePostReport,
  boardId,
}: Props) {
  const navigation = useNavigation();

  const data: PostDto = post;
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [reportCheckModalVisible, setReportCheckModalVisible] = useState<boolean>(false);
  const [reportModalVisible, setReportModalVisible] = useState<boolean>(false);
  const handlePostScrapComponent = (
    <View style={{marginRight: 16}}>
      <TouchableWithoutFeedback onPress={() => handlePostScrap(data.postId)}>
        {data?.isScraped ? <Scrap /> : <NoScrap />}
      </TouchableWithoutFeedback>
    </View>
  );
  const handlePostDeleteComponent = (
    <>
      {deleteModalVisible && (
        <ModalBottom
          modalVisible={deleteModalVisible}
          setModalVisible={setDeleteModalVisible}
          modalText={`작성한 게시글을 삭제하시겠습니까?`}
          modalBody=""
          modalButtonText="삭제"
          modalButton
          modalButtonFunc={() => {
            if (handlePostDelete(data.postId)) {
              setDeleteModalVisible(false);
              Toast.show(
                '작성하신 게시글이 성공적으로 삭제되었습니다.',
                Toast.LONG,
              );
              navigation.navigate('PostListScreen', {boardId: boardId});
            }
          }}
          isSecondButton={true}
          modalSecondButtonText="취소"
          modalSecondButtonFunc={() => setDeleteModalVisible(false)}
        />
      )}
      <Pressable
        onPress={() => {
          setDeleteModalVisible(true);
          console.log(deleteModalVisible);
        }}>
        <TrashIcon style={{marginRight: 12}} />
      </Pressable>
    </>
  );

  const handlePostReportComponent = (
    <>
      {reportCheckModalVisible && (
        <ModalBottom
          modalVisible={reportCheckModalVisible}
          setModalVisible={setReportCheckModalVisible}
          modalText={`게시글 신고`}
          modalBody={`- 신고 후에는 내용을 수정할 수 없습니다.\n - 무분별한 신고를 방지하기 위해 신고 1회당 50포인트가 차감됩니다.`}
          modalButtonText="확인"
          modalButton
          modalButtonFunc={() => {
            setReportModalVisible(true);
            setReportCheckModalVisible(false);
          }}
        />
      )}
      {reportModalVisible && (
        <SelectModalBottom
          modalVisible={reportModalVisible}
          setModalVisible={setReportModalVisible}
          modalText={`게시글 신고`}
          modalButtonText="신고하기"
          modalButton
          modalButtonFunc={() => {
            const result = handlePostReport(data.postId , 0);
            if (result) {
              console.log(result);
              setReportModalVisible(false);
              Toast.show(result, Toast.LONG);
            }
          }}
          isSecondButton={true}
          modalSecondButtonText="취소"
          modalSecondButtonFunc={() => setReportModalVisible(false)}
        />
      )}
      <Pressable
        onPress={() => {
          setReportCheckModalVisible(true);
        }}>
        {data?.isReported ? <Report style={{marginRight: 14}} /> : <NoReport style={{marginRight: 14}} />}
      </Pressable>
    </>
  );

  return (
    <>
      <View style={styles.postContainer}>
        <View style={styles.postHeader}>
          <View style={{flexDirection: 'row'}}>
            <ProfileImage></ProfileImage>
            <View style={{justifyContent: 'center'}}>
              <Text style={{fontSize: 16, paddingLeft: 8, fontWeight: `500`}}>
                {data?.displayName}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <SpinningThreeDots
              isScrap={true}
              isMine={data?.isAuthor}
              handleScrapComponent={handlePostScrapComponent}
              handleDeleteComponent={handlePostDeleteComponent}
              handleReportComponent={handlePostReportComponent}
            />
          </View>
        </View>
        <View style={styles.postBody}>
          <Text>{data?.content}</Text>
        </View>
        <Text style={{color: '#949494', fontSize: 12, marginTop: 12}}>
          {data?.createdAt}
        </Text>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 22}}>
          <Pressable
            hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
            onPress={() => handlePostLike(data.postId)}>
            {data?.isLiked ? <PostLike /> : <PostUnlike />}
          </Pressable>
          <Text style={styles.postLike}>{data?.likeCount}</Text>
          <PostComment />
          <Text style={styles.postComment}>{data?.commentCount}</Text>
        </View>
      </View>
      <View
        style={{borderWidth: 1, borderColor: '#F4F4F4', marginTop: 28}}></View>
    </>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    paddingHorizontal: 24,
    paddingTop: 18,
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
    marginRight: 5,
    width: 35,
  },
  postComment: {
    fontSize: 13,
    marginLeft: 5,
    width: 35,
  },
});

export default Post;
