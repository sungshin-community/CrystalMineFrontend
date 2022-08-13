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
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableHighlight,
} from 'react-native';
import FloatingWriteButton from '../../components/FloatingWriteButton';
import PostItem from '../../components/PostItem';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  getBoardDetail,
  getBoardInfo,
  getHotBoardPosts,
  reportBoard,
  toggleBoardPin,
} from '../../common/boardApi';
import BoardDetailDto, {ContentPreviewDto} from '../../classes/BoardDetailDto';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {getPosts} from '../../common/boardApi';
import NoCommentSuryong from '../../../resources/icon/custom/NoCommentSuryong';
import SpinningThreeDots from '../../components/SpinningThreeDots';
import {BigGrayFlag} from '../../../resources/icon/GrayFlag';
import {fontMedium, fontRegular} from '../../common/font';
import Board from '../../classes/Board';
import {BigOrangeFlag} from '../../../resources/icon/OrangeFlag';
import {
  BigDarkPin,
  BigGrayPin,
  BigOrangePin,
  BigPurplePin,
} from '../../../resources/icon/Pin';
import SearchIcon from '../../../resources/icon/SearchIcon';
import NoReport, {Report} from '../../../resources/icon/Report';
import SettingIcon from '../../../resources/icon/SettingIcon';
import {ModalBottom} from '../../components/ModalBottom';
import {SelectModalBottom} from '../../components/SelectModalBottom';
import SortIcon from '../../../resources/icon/SortIcon';
type RootStackParamList = {
  PostScreen: {postId: number};
  PostWriteScreen: {boardId: number};
  UpdateBoard: {boardId: number};
  BoardSearch: {boardName: string; boardId: number};
  PostSearch: {boardId: number, boardName: string};
};
type Props = NativeStackScreenProps<RootStackParamList>;

const PostListScreen = ({navigation, route}: Props) => {
  const [boardDetail, setBoardDetail] = useState<ContentPreviewDto[]>([]);
  const [boardInfo, setBoardInfo] = useState<Board>();
  const isFocused = useIsFocused();
  const [reportCheckModalVisible, setReportCheckModalVisible] = useState<
    boolean
  >(false);
  const [reportModalVisible, setReportModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('createdAt');
  useEffect(() => {
    async function init() {
      setIsLoading(true);
      if (route.params.boardId === 2) {
        const hotBoardData = await getHotBoardPosts(0);
        setBoardDetail(hotBoardData);
      } else {
        const boardDetail = await getBoardDetail(
          route.params.boardId,
          0,
          sortBy,
        );
        if (boardDetail.code === 'BOARD_ALREADY_BLIND') {
          Toast.show('시스템에 의해 블라인드된 게시판입니다.', Toast.SHORT);
          navigation.goBack();
        } else if (
          boardDetail.code === 'BOARD_NOT_FOUND' ||
          boardDetail.code === 'BOARD_ALREADY_DELETED'
        ) {
          Toast.show('삭제된 게시판입니다.', Toast.SHORT);
          navigation.goBack();
        } else setBoardDetail(boardDetail);
      }
      const boardInfo = await getBoardInfo(route.params.boardId);
      setBoardInfo(boardInfo);
      setIsLoading(false);
    }
    if (isFocused) init();
  }, [isFocused, sortBy]);

  const handleRefresh = async () => {
    if (route.params.boardId === 2) {
      const postList = await getHotBoardPosts(0);
      setCurrentPage(0);
      setHotBoardPosts(postList);
    } else {
      const postList = await getBoardDetail(route.params.boardId, 0, sortBy);
      setCurrentPage(0);
      setBoardDetail(postList);
    }
  };

  const fetchNextPage = async () => {
    if (route.params.boardId === 2) {
      let thisPagePostList: ContentPreviewDto[] = await getHotBoardPosts(
        currentPage + 1,
      );
      if (thisPagePostList.length > 0) {
        setCurrentPage(currentPage + 1);
      }
    } else {
      let thisPagePostList: ContentPreviewDto[] = await getBoardDetail(
        route.params.boardId,
        currentPage + 1,
        sortBy,
      );
      setBoardDetail(boardDetail.concat(thisPagePostList));
      if (thisPagePostList.length > 0) {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const HeaderIcon = () => {
    return (
      <>
        {boardInfo?.id === 1 ? (
          <BigDarkPin />
        ) : (
          <Pressable
            onPress={async () => {
              const result = await toggleBoardPin(route.params.boardId);
              const boardInfo = await getBoardInfo(route.params.boardId);
              setBoardInfo(boardInfo);
            }}>
            {boardInfo?.isOwner ? (
              boardInfo?.isPinned ? (
                <BigOrangeFlag />
              ) : (
                <BigGrayFlag />
              )
            ) : boardInfo?.isPinned ? (
              boardInfo?.type === 'PUBLIC' ||
              boardInfo?.type === 'DEPARTMENT' ? (
                <BigOrangePin />
              ) : (
                <BigPurplePin />
              )
            ) : (
              <BigGrayPin />
            )}
          </Pressable>
        )}
        <Text
          style={[
            fontMedium,
            {
              marginLeft: 8,
              fontSize: boardInfo && boardInfo.name.length <= 10 ? 19 : 17,
              maxWidth: 180,
            },
          ]}
          numberOfLines={1}
          ellipsizeMode="tail">
          {boardInfo ? boardInfo?.name : ''}
        </Text>
      </>
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderIcon />,
      headerRight: () => (
        <>
          {boardInfo?.type !== 'OFFICIAL' ? (
            <SpinningThreeDots
              handleDefaultModeComponent={handleBoardSearchComponent}
              isMine={boardInfo?.isOwner}
              handleOptionModeIsMineComponent={handleBoardSettingComponent}
              handleOptionModeIsNotMineComponent={handleBoardReportComponent}
            />
          ) : (
            handleBoardSearchComponent
          )}
        </>
      ),
      headerTitleAlign: 'center',
    });
  }, [navigation, boardInfo, reportCheckModalVisible, reportModalVisible]);

  const toBoardSearch = () => {
    // navigation.navigate('BoardSearch', {
    //   boardName: boardInfo.name,
    //   boardId: boardInfo.id,
    // });
    navigation.navigate('PostSearch', {boardId: boardInfo?.id, boardName: boardInfo?.name});
  };
  const handleBoardSearchComponent = (
    <TouchableHighlight
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      underlayColor="#EEEEEE"
      onPress={toBoardSearch}>
      <SearchIcon />
    </TouchableHighlight>
  );
  const handleBoardSettingComponent = (
    <TouchableHighlight
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      underlayColor="#EEEEEE"
      onPress={() =>
        navigation.navigate('UpdateBoard', {boardId: route.params.boardId})
      }>
      <SettingIcon />
    </TouchableHighlight>
  );
  const handleBoardReportComponent = (
    <>
      {boardInfo?.isReported ? (
        <TouchableHighlight
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          underlayColor="#EEEEEE"
          onPress={() => {
            Toast.show('이미 신고한 게시판입니다.', Toast.SHORT);
          }}>
          <Report />
        </TouchableHighlight>
      ) : (
        <TouchableHighlight
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          underlayColor="#EEEEEE"
          onPress={() => {
            setReportCheckModalVisible(true);
            console.log(reportCheckModalVisible);
          }}>
          <NoReport />
        </TouchableHighlight>
      )}
    </>
  );
  return (
    <>
      {reportCheckModalVisible && (
        <ModalBottom
          modalVisible={reportCheckModalVisible}
          setModalVisible={setReportCheckModalVisible}
          title={`게시판 신고`}
          content={`•  신고 후에는 내용을 수정할 수 없습니다.\n•  무분별한 신고를 방지하기 위해 신고 1회당 50포인트가 차감됩니다.`}
          isContentCenter={false}
          purpleButtonText="확인"
          purpleButtonFunc={() => {
            setReportCheckModalVisible(false);
            setReportModalVisible(true);
          }}
        />
      )}
      {reportModalVisible && (
        <SelectModalBottom
          modalVisible={reportModalVisible}
          setModalVisible={setReportModalVisible}
          title={`게시판 신고`}
          purpleButtonText="신고하기"
          reportId={boardInfo?.id}
          reportFunc={reportBoard}
          whiteButtonText="취소"
          whiteButtonFunc={() => setReportModalVisible(false)}
        />
      )}
      <View style={{flex: 1}}>
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
        {boardDetail.length !== 0 && route.params.boardId !== 2 && (
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
                width: 83,
                height: 24,
                backgroundColor: '#f6f6f6',
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{marginRight: 5}}>
                {sortBy === 'createdAt' ? '최신순' : '공감순'}
              </Text>
              <SortIcon />
            </TouchableOpacity>
          </View>
        )}
        {boardDetail.length === 0 ? (
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
                  marginTop: 20,
                }}>
                {isLoading
                  ? ''
                  : route.params.boardId === 2
                  ? '공감을 10개 이상 받은 게시글이 없습니다.'
                  : '아직 작성된 게시글이 없습니다.\n첫 글을 작성해주세요.'}
              </Text>
            </View>
          </SafeAreaView>
        ) : (
          <FlatList
            style={{flex: 1, backgroundColor: '#FFFFFF'}}
            data={boardDetail}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={async () => {
                  navigation.navigate('PostScreen', {
                    postId: item.postId,
                  });
                }}>
                <PostItem post={item} />
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
            onEndReached={fetchNextPage}
            onEndReachedThreshold={0.8}
          />
        )}
        {boardInfo?.id !== 2 && (
          <FloatingWriteButton
            onPress={() =>
              navigation.navigate('PostWriteScreen', {
                boardId: route.params.boardId,
              })
            }
          />
        )}
      </View>
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
