import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import FloatingWriteButton from '../../components/FloatingWriteButton';
import PostItem from '../../components/PostItem';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { getBoardDetail } from '../../common/boardApi';
import BoardDetailDto, {ContentPreviewDto} from '../../classes/BoardDetailDto';

type RootStackParamList = {
  PostListScreen: {boardId: number};
};
type Props = NativeStackScreenProps<RootStackParamList>;

const PostListScreen = ({navigation, route}: Props) => {

  const [boardDetail, setBoardDetail] = useState<BoardDetailDto>();

  useEffect(() => {
    async function init() {
      const boardDetail = await getBoardDetail(route.params.boardId, 0);
      console.log(boardDetail.postResponseDto);
      setBoardDetail(boardDetail);
    }
    init();
  }, []);

  const SampleFunction = () => {
    Alert.alert('플로팅 버튼 눌림!');
  };

  return (
    <>
      <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <View>
          {boardDetail?.postResponseDto.content.map((post: ContentPreviewDto, index: number) => (
            <PostItem key={index} post={post} />
          ))}
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
