import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  Pressable,
} from 'react-native';
import FloatingWriteButton from '../../components/FloatingWriteButton';
import PostItem from '../../components/PostItem';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getBoardDetail} from '../../common/boardApi';
import BoardDetailDto, {ContentPreviewDto} from '../../classes/BoardDetailDto';
import {useIsFocused} from '@react-navigation/native';

type RootStackParamList = {
  PostScreen: {postId: number; boardName: string};
};
type Props = NativeStackScreenProps<RootStackParamList>;

const PostListScreen = ({navigation, route}: Props) => {
  const [boardDetail, setBoardDetail] = useState<BoardDetailDto>();
  const [boardName, setBoardName] = useState<string>('');
  const isFocused = useIsFocused();

  useEffect(() => {
    async function init() {
      const boardDetail = await getBoardDetail(route.params.boardId, 0);
      setBoardDetail(boardDetail);
      if (boardDetail) setBoardName(boardDetail?.name);
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
      <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <View>
          {boardDetail?.postResponseDto.content.map(
            (post: ContentPreviewDto, index: number) => (
              <Pressable
                key={index}
                onPress={() =>
                  navigation.navigate('PostScreen', {
                    postId: boardDetail?.postResponseDto.content[index].postId,
                    boardName: boardDetail?.name,
                  })
                }>
                <PostItem post={post} />
              </Pressable>
            ),
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={SampleFunction}
        style={styles.touchableOpacityStyle}>
        <FloatingWriteButton style={styles.floatingButtonStyle} />
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
