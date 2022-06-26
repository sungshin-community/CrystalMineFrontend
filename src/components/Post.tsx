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
import { useNavigation } from '@react-navigation/native';
type RootStackParamList = {
  PostListScreen: {boardId: number};
};
type NaviProps = NativeStackScreenProps<RootStackParamList>;
interface Props {
  post: any;
  handlePostLike: any;
  handlePostScrap: any;
  handlePostDelete: any;
  boardId: number;
}

function Post(
  {post, handlePostLike, handlePostScrap, handlePostDelete, boardId}: Props
) {
  const navigation = useNavigation();
  
  const data: PostDto = post;
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const handleScrapComponent = (
    <View style={{marginRight: 16}}>
      <TouchableWithoutFeedback onPress={() => handlePostScrap(data.postId)}>
        {data?.isScraped ? <Scrap /> : <NoScrap />}
      </TouchableWithoutFeedback>
    </View>
  );
  const handlePostDeleteComponent = (
    <>
      {modalVisible && (
        <ModalBottom
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          modalText={`작성한 게시글을 삭제하시겠습니까?`}
          modalBody=""
          modalButtonText="삭제"
          modalButton
          modalButtonFunc={() => {
            if (handlePostDelete(data.postId)) {
              setModalVisible(false);
              Toast.show(
                '작성하신 게시글이 성공적으로 삭제되었습니다.',
                Toast.LONG,
              );
              navigation.navigate('PostListScreen', {boardId: boardId});
            }
          }}
          isSecondButton={true}
          modalSecondButtonText="취소"
          modalSecondButtonFunc={() => setModalVisible(false)}
        />
      )}
      <Pressable
        onPress={() => {
          setModalVisible(true);
          console.log(modalVisible);
        }}>
        <TrashIcon style={{marginRight: 12}} />
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
              handleScrapComponent={handleScrapComponent}
              handleDeleteComponent={handlePostDeleteComponent}
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
