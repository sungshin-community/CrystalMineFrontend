import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  Text,
  Pressable,
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  TextInput,
  StyleSheet,
  TouchableHighlightBase,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import MyPostItem from '../../../components/MyPostItem';
import {deleteMyPosts, toggleBoardPin} from '../../../common/boardApi';
import {MyPostContentDto} from '../../../classes/board/MyPostDto';
import SpinningThreeDots from '../../../components/SpinningThreeDots';
import SearchIcon from '../../../../resources/icon/SearchIcon';
import NewIcon from '../../../../resources/icon/NewIcon';
import {TrashIcon} from '../../../../resources/icon/TrashIcon';
import CancelButton from '../../../../resources/icon/Cancel';
import {ModalBottom} from '../../../components/ModalBottom';
import {
  RectangleChecked,
  RectangleUnchecked,
} from '../../../../resources/icon/CheckBox';
import Toast from 'react-native-simple-toast';
import SortIcon from '../../../../resources/icon/SortIcon';
import {searchBoards, searchPosts} from '../../../common/SearchApi';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  DarkPin,
  GrayPin,
  OrangePin,
  PurplePin,
} from '../../../../resources/icon/Pin';
import OrangeFlag from '../../../../resources/icon/OrangeFlag';
import {SearchBoard} from '../../../classes/Search';
import {fontRegular} from '../../../common/font';
import Board from '../../../classes/Board';
import GrayFlag from '../../../../resources/icon/GrayFlag';
import {logout} from '../../../common/authApi';
import {getHundredsDigit} from '../../../common/util/statusUtil';
import WaterMark from '../../../components/WaterMark';
import InputDeleteButton from './InputDeleteButton';

type RootStackParamList = {
  PostScreen: {postId: number};
  BoardSearch: {boardName: string};
  TotalSearchResult: {searchWord: string};
  PostSearchResult: {searchWord: string};
  PostListScreen: {boardId: number};
};
type Props = NativeStackScreenProps<RootStackParamList, 'TotalSearchResult'>;

export default function BoardSearchResult({route, navigation}: Props) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [boardList, setBoardList] = useState<Board[]>([]);
  const [sortBy, setSortBy] = useState<string>('pinCount');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false);
  const {searchWord} = route.params || {searchWord: ''};
  const [searchText, setSearchText] = useState<string>(searchWord);

  const moveToBoard = (board: Board) => {
    navigation.navigate('PostListScreen', {boardId: board.id});
  };
  /* 새 게시판 NewIcon 표시 */
  const isNewItem = (timestamp: string | number): boolean => {
    const itemDate = new Date(timestamp);
    const now = new Date();
    const oneWeekInMs = 90 * 24 * 60 * 60 * 1000;

    return now.getTime() - itemDate.getTime() <= oneWeekInMs;
  };

  useEffect(() => {
    async function init() {
      setIsLoading(true);
      const response = await searchBoards(searchWord, 0, sortBy);
      setCurrentPage(0);
      setBoardList(response.data.content);
      setIsLoading(false);
    }
    init();
  }, [sortBy, searchWord]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: (): React.ReactNode => (
        <View style={styles.container}>
          <TextInput
            autoFocus={true}
            style={styles.input}
            placeholder="검색"
            placeholderTextColor="#89919A"
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
            onSubmitEditing={e => handleSearch(e.nativeEvent.text)}
            keyboardType="default"
            enablesReturnKeyAutomatically
            defaultValue={searchText}
            onChangeText={setSearchText}
          />
          <View style={styles.icon}>
            <SearchIcon />
          </View>
          <View style={styles.delete}>
            <InputDeleteButton onPress={() => setSearchText('')} />
          </View>
        </View>
      ),
      headerRight: (): React.ReactNode => (
        <View style={{marginLeft: 16}}>
          <TouchableHighlight
            style={{
              width: 35,
              borderRadius: 20,
              alignItems: 'center',
              height: 40,
              justifyContent: 'center',
            }}
            underlayColor="#EEEEEE"
            onPress={() => {
              navigation.goBack();
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Pretendard-Medium',
                color: '#3a424e',
                // backgroundColor: 'red',
              }}>
              취소
            </Text>
          </TouchableHighlight>
        </View>
      ),
      headerBackVisible: false, // Back 버튼 숨김
    });
  }, [searchText, navigation]);

  const handleSearch = async (text: string) => {
    if (text.trim().length > 0) {
      navigation.navigate('BoardSearchResult', {searchWord: text}); // Navigate with search text
    } else {
      Toast.show('공백은 검색이 불가능합니다.', Toast.SHORT);
    }
  };

  const handleRefresh = async () => {
    const response = await searchBoards(searchWord, 0, sortBy);
    const postList = response.data.content;
    setCurrentPage(0);
    setBoardList(postList);
    console.log('response', response);
  };

  const fetchNextPage = async () => {
    setIsNextPageLoading(true);
    const response = await searchBoards(searchWord, currentPage + 1, sortBy);
    let thisPagePostList: Board[] = response.data.content;
    setBoardList(boardList.concat(thisPagePostList));
    if (thisPagePostList.length > 0) {
      setCurrentPage(currentPage + 1);
    }
    setIsNextPageLoading(false);
  };

  return (
    <SafeAreaView style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <WaterMark />
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
      {boardList && boardList.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F6F6F6',
          }}>
          <Text
            style={{
              color: '#6E7882',
              fontSize: 15,
              fontFamily: 'Pretendard-Regular',
              textAlign: 'center',
              lineHeight: 22.5,
              marginTop: 20,
            }}>
            {isLoading ? '' : '요청하신 검색어에 대한 결과가 없습니다.'}
          </Text>
        </View>
      ) : (
        <View style={{flex: 1}}>
          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 16,
              height: 46,
            }}>
            <TouchableOpacity
              onPress={() => {
                if (sortBy === 'createdAt') {
                  setSortBy('pinCount');
                } else if (sortBy === 'pinCount') {
                  setSortBy('dictionary');
                } else {
                  setSortBy('createdAt');
                }
              }}
              style={{
                marginLeft: 24,
                width: 83,
                height: 24,
                backgroundColor: '#f6f6f6',
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={[fontRegular, {marginRight: 5}]}>
                {sortBy === 'createdAt'
                  ? '최신순'
                  : sortBy === 'pinCount'
                  ? '고정순'
                  : '이름순'}
              </Text>
              <SortIcon />
            </TouchableOpacity>
          </View> */}
          {/* <View style={styles.horizontalLine} /> */}
          <FlatList
            showsVerticalScrollIndicator={false}
            data={boardList}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => moveToBoard(item)}
                style={{
                  flexDirection: 'row',
                  height: 61,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                }}>
                <Pressable
                  onPress={async () => {
                    if (item.id === 1) return;
                    const response = await toggleBoardPin(item.id);
                    if (response.status === 401) {
                      setTimeout(function () {
                        Toast.show(
                          '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
                          Toast.SHORT,
                        );
                      }, 100);
                      logout();
                      navigation.reset({routes: [{name: 'SplashHome'}]});
                    } else if (getHundredsDigit(response.status) === 2) {
                      handleRefresh();
                    } else {
                      setTimeout(function () {
                        Toast.show(
                          '알 수 없는 오류가 발생하였습니다.',
                          Toast.SHORT,
                        );
                      }, 100);
                    }
                  }}
                  style={{
                    //height: 61,
                    //justifyContent: 'center',
                    marginLeft: 16,
                    //width: 44,
                    //backgroundColor: 'blue',
                  }}>
                  {/* {!item.isPinned ? (
                    item.isOwner ? (
                      <GrayFlag style={{marginLeft: 13}} />
                    ) : (
                      <GrayPin style={{marginLeft: 10}} />
                    )
                  ) : item.type === 'PUBLIC' ? (
                    item.isOwner ? (
                      <OrangeFlag style={{marginLeft: 13}} />
                    ) : (
                      <OrangePin style={{marginLeft: 10}} />
                    )
                  ) : (
                    <PurplePin style={{marginLeft: 10}} />
                  )} */}
                </Pressable>
                <View style={{flex: 1}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'Pretendard-Medium',
                        color: '#3A424E',
                        fontWeight: '500',
                      }}>
                      {item.name}
                    </Text>
                    {item.todayNewPost && <NewIcon />}
                  </View>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      fontSize: 12,
                      color: '#89919A',
                      fontWeight: '400',
                      marginTop: 2,
                    }}>
                    {item.introduction}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => (
              <View style={{height: 1, backgroundColor: '#F6F6F6'}}></View>
            )}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                colors={['#A055FF']} // for android
                tintColor={'#A055FF'} // for ios
              />
            }
            onEndReached={() => fetchNextPage()}
            onEndReachedThreshold={0.6}
          />
          <View>
            {isNextPageLoading && (
              <ActivityIndicator
                size="large"
                color={'#A055FF'}
                animating={isNextPageLoading}
                style={{zIndex: 100}}
              />
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  horizontalLine: {
    height: 1,
    width: '100%',
    backgroundColor: '#EFEFF3',
  },
  input: {
    backgroundColor: '#F6F6F6',
    width: Dimensions.get('window').width - 75,
    alignItems: 'center',
    alignContent: 'center',
    height: 35,
    borderRadius: 8,
    paddingLeft: 40,
    paddingVertical: 8,
    fontFamily: 'Pretendard-Regular',
    fontWeight: 'normal',
    fontSize: 16,
    color: '#222222',
  },
  icon: {
    position: 'absolute',
    top: 6,
    left: 12,
  },
  delete: {
    position: 'absolute',
    top: 8,
    right: 12,
  },
});
