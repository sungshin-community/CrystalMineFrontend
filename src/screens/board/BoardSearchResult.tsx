import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GrayFlag from '../../../resources/icon/GrayFlag';
import OrangeFlag from '../../../resources/icon/OrangeFlag';
import {GrayPin, OrangePin, PurplePin} from '../../../resources/icon/Pin';
import Board from '../../classes/Board';
import {getBoardInfo, toggleBoardPin} from '../../common/boardApi';
import {fontRegular} from '../../common/font';
import {getBoardSearch} from '../../common/SearchApi';

function BoardSearchResult({searchWord}: any) {
  const navigation = useNavigation();
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [boardInfo, setBoardInfo] = useState<Board>();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const boardResult = await getBoardSearch(searchWord, 0, 'pinCount');
        if (boardResult) {
          setData(boardResult);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('특정 게시판 내 검색 실패', error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const boardResult = await getBoardSearch(searchWord, 0, 'pinCount');
        if (boardResult) {
          setData(boardResult);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('특정 게시판 내 검색 실패', error);
      }
    };
    getData();
  }, [boardInfo]);

  const moveToBoard = (boardId: number) => {
    navigation.navigate('PostListScreen', {boardId: boardId});
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
      {data.totalElements === 0 ? (
        <SafeAreaView style={styles.noResult}>
          <Text style={[fontRegular, styles.noResultText]}>
            요청하신 검색어에 대한 검색 결과가 없습니다.
          </Text>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.result}>
          {data.content.map((item: any, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() => moveToBoard(item.id)}
              style={{
                paddingVertical: 9,
                backgroundColor: '#fff',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Pressable
                  onPress={async () => {
                    await toggleBoardPin(item.id);
                    const boardUpdate = await getBoardInfo(item.id);
                    setBoardInfo(boardUpdate);
                  }}>
                  {!item.isPinned ? (
                    item.isOwner ? (
                      <GrayFlag style={{marginLeft: 23}} />
                    ) : (
                      <GrayPin style={{marginLeft: 20}} />
                    )
                  ) : item.isOfficial ? (
                    <PurplePin style={{marginLeft: 20}} />
                  ) : item.isOwner ? (
                    <OrangeFlag style={{marginLeft: 23}} />
                  ) : (
                    <OrangePin style={{marginLeft: 20}} />
                  )}
                </Pressable>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#000000',
                    marginLeft: 15,
                    fontFamily: 'SpoqaHanSansNeo-Regular',
                  }}>
                  {item.name}
                </Text>
              </View>
              <View>
                <Text
                  style={[
                    fontRegular,
                    {
                      color: '#BDBDBD',
                      marginLeft: 60,
                      fontSize: 13,
                      marginTop: 6,
                      paddingRight: 20,
                    },
                  ]}>
                  {item.introduction}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </SafeAreaView>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  result: {
    width: '100%',
    flex: 1,
    backgroundColor: 'rgb(255, 255, 255)',
    marginTop: 34,
    marginLeft: 22,
  },
  noResult: {
    width: '100%',
    flex: 1,
    backgroundColor: 'rgb(244, 244, 244)',
    justifyContent: 'center',
  },
  noResultText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
    color: '#6E7882',
  },
});

export default BoardSearchResult;
