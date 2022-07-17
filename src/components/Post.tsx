import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
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

interface Props {
  post: any;
  handlePostLike: any;
  handlePostScrap: any;
  handlePostDelete?: any;
  handlePostReport?: any;
}

function Post({
  post,
  handlePostLike,
  handlePostScrap,
  handlePostDelete,
  handlePostReport,
}: Props) {
  const navigation = useNavigation();

  const data: PostDto = post;
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [reportCheckModalVisible, setReportCheckModalVisible] = useState<
    boolean
  >(false);
  const [reportModalVisible, setReportModalVisible] = useState<boolean>(false);

  const handlePostScrapComponent = (
    <View style={{marginRight: 16}}>
      <Pressable hitSlop={10} onPress={() => handlePostScrap(data.postId)}>
        {data?.isScraped ? <Scrap /> : <NoScrap />}
      </Pressable>
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
              navigation.goBack();
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
            setReportCheckModalVisible(false);
            setReportModalVisible(true);
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
          modalButtonFunc={async () => {
            const result = await handlePostReport(data.postId, 1, '');
            if (result.code === 'CREATE_POST_REPORT_SUCCESS') {
              console.log('게시글 신고 성공');
              Toast.show(
                '신고하신 내용이 정상적으로 접수되었습니다.',
                Toast.LONG,
              );
            } else if (result.code === 'POST_REPORT_FAIL_POINT_NOT_ENOUGH') {
              console.log('보유 포인트 부족');
              Toast.show(
                '보유 포인트가 부족하여 신고가 불가능합니다.',
                Toast.LONG,
              );
            } else Toast.show(result.detail, Toast.LONG);
            setReportModalVisible(false);
          }}
          isSecondButton={true}
          modalSecondButtonText="취소"
          modalSecondButtonFunc={() => setReportModalVisible(false)}
        />
      )}
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
            setReportCheckModalVisible(true);
          }}>
          <NoReport style={{marginRight: 14}} />
        </Pressable>
      )}
    </>
  );

  return (
    <>
      <View style={styles.postContainer}>
        <View style={styles.postHeader}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: 24, height: 24, borderRadius: 12}}
              source={{uri: data?.profileImage}}
            />

            <View style={{justifyContent: 'center'}}>
              <Text style={{fontSize: 16, paddingLeft: 8, fontWeight: `500`}}>
                {data?.displayName}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <SpinningThreeDots
              isMine={data?.isAuthor}
              handleDefaultModeComponent={handlePostScrapComponent}
              handleOptionModeIsMineComponent={handlePostDeleteComponent}
              handleOptionModeIsNotMineComponent={handlePostReportComponent}
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
