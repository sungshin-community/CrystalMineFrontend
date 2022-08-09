import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BoardDetailDto from '../../classes/BoardDetailDto';
import Response from '../../classes/Response';
import {PostContent} from '../../classes/Search';
import { getBoardInfo } from '../../common/boardApi';
import client from '../../common/client';
import {fontRegular} from '../../common/font';
import {getPostSearch} from '../../common/SearchApi';
import FloatingWriteButton from '../../components/FloatingWriteButton';
import PostSearchItem from '../../components/PostSearchItem';

function WikiList({boardId}: any) {
  const navigation = useNavigation();
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [isData, setIsData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getBoardDetail = async (
    boardId: number,
    page: number,
    sort: string,
  ) => {
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('sort', sort);
      const response = await client.get<Response<BoardDetailDto>>(
        `/boards/${boardId}/posts?${params}`,
      );
      return response.data.data;
    } catch (e: any) {
      console.log('WIkiList.tsx', e.response.data);
      return e.response.data;
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      let boardData = await getBoardDetail(boardId, 0, sortBy);
      if (boardData) {
        setIsData(boardData);
        setIsLoading(false);
      }
    };
    getData();
  }, [boardId, sortBy]);

  const moveToPost = (postId: number) => {
    navigation.navigate('PostScreen', {postId: postId});
  };

  if (isLoading) {
    return (
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}>
        <ActivityIndicator
          size="large"
          color={'#A055FF'}
          animating={isLoading}
          style={{zIndex: 100}}
        />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.noResult}>
        {isData.totalElements === 0 ? (
          <>
            <Text style={[fontRegular, styles.noResultText]}>
              아직 작성된 게시글이 없습니다.
            </Text>
            <Text style={[fontRegular, styles.noResultText]}>
              첫 글을 작성해주세요.
            </Text>
          </>
        ) : (
          <ScrollView style={{backgroundColor: '#fff', width: '100%'}}>
            <View style={{backgroundColor: '#fff'}}>
              <TouchableOpacity
                onPress={() => {
                  if (sortBy === 'createdAt') {
                    setSortBy('likeCount');
                  } else {
                    setSortBy('createdAt');
                  }
                }}
                style={{
                  marginLeft: 24,
                  marginBottom: 10,
                  marginTop: 16,
                  width: 66,
                  height: 24,
                  backgroundColor: '#f6f6f6',
                  borderRadius: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text>{sortBy === 'createdAt' ? '최신순' : '공감순'}</Text>
              </TouchableOpacity>
            </View>
            {isData.content.map((item: PostContent, index: number) => (
              <PostSearchItem moveToPost={moveToPost} key={index} post={item} />
              ))}
          </ScrollView>
        )}
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.touchableOpacityStyle}>
          <FloatingWriteButton
            onPress={() =>
              navigation.navigate('PostWriteScreen', {
                boardId: boardId,
              })
            }
          />
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  noResult: {
    width: '100%',
    flex: 1,
    backgroundColor: 'rgb(244, 244, 244)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#6E7882',
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
});

export default WikiList;
