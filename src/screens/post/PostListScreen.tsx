import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  Pressable,
  Text,
  SafeAreaView
} from 'react-native';
import FloatingWriteButton from '../../components/FloatingWriteButton';
import PostItem from '../../components/PostItem';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getBoardDetail, getBoardInfo} from '../../common/boardApi';
import BoardDetailDto, {ContentPreviewDto} from '../../classes/BoardDetailDto';
import {useIsFocused} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import { getPosts } from '../../common/boardApi';
import NoCommentSuryong from '../../../resources/icon/custom/NoCommentSuryong';

type RootStackParamList = {
  PostScreen: {boardId: number; postId: number};
  PostWriteScreen: {boardId: number};
};
type Props = NativeStackScreenProps<RootStackParamList>;

const PostListScreen = ({navigation, route}: Props) => {
  const [boardDetail, setBoardDetail] = useState<BoardDetailDto>();
  const [boardName, setBoardName] = useState<string>('');

  const isFocused = useIsFocused();

  useEffect(() => {
    async function init() {
      const boardDetail = await getBoardDetail(route.params.boardId, 0);
      const boardInfo = await getBoardInfo(route.params.boardId);
      setBoardDetail(boardDetail);
      setBoardName(boardInfo.name);
    }
    if (isFocused) init();
  }, [isFocused]);

  const SampleFunction = () => {
    Alert.alert('플로팅 버튼 눌림!');
  };

  useEffect(() => {
    navigation.setOptions({
      title: boardName,
      headerTitleAlign: 'center',
      headerTintColor: '#000000',
      headerTitleStyle: {
        fontSize: 19,
        fontFamily: 'SpoqaHanSansNeo-Medium',
      },
    });
  }, [navigation, boardName]);

  return (
    <>
      {boardDetail?.content.length === 0 ? (
        <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#6E7882',
            fontSize: 15,
            fontFamily: 'SpoqaHanSansNeo-Regular',
            textAlign: 'center',
            lineHeight: 22.5,
            marginTop: 20
          }}>
          아직 작성된 게시글이 없습니다.{"\n"}
          첫 글을 작성해주세요.
        </Text>
      </View>
    </SafeAreaView>
      ) : (
        <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
          <View>
            {boardDetail?.content.map(
              (post: ContentPreviewDto, index: number) => (
                <Pressable
                  key={index}
                  onPress={async () => {
                    const result = await getPosts(
                      boardDetail?.content[index].postId,
                    );
                    if (result === 'NOT_FOUND')
                      Toast.show('삭제된 게시글입니다.', Toast.LONG);
                    else
                      navigation.navigate('PostScreen', {
                        boardId: route.params.boardId,
                        postId: boardDetail?.content[index].postId,
                      });
                  }}>
                  <PostItem post={post} />
                </Pressable>
              ),
            )}
          </View>
        </ScrollView>
      )}

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={SampleFunction}
        style={styles.touchableOpacityStyle}>
        <FloatingWriteButton onPress={() => navigation.navigate('PostWriteScreen', {boardId: route.params.boardId})} style={styles.floatingButtonStyle} />
      </TouchableOpacity>
    </>
  );
};
export default PostListScreen;

const styles = StyleSheet.create({
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  floatingButtonStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
