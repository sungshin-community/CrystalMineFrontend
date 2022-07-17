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
} from 'react-native';
import FloatingWriteButton from '../../components/FloatingWriteButton';
import PostItem from '../../components/PostItem';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  getBoardDetail,
  getBoardInfo,
  reportBoard,
  toggleBoardPin,
} from '../../common/boardApi';
import BoardDetailDto, {ContentPreviewDto} from '../../classes/BoardDetailDto';
import {useIsFocused} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {getPosts} from '../../common/boardApi';
import NoCommentSuryong from '../../../resources/icon/custom/NoCommentSuryong';
import SpinningThreeDots from '../../components/SpinningThreeDots';
import {BigGrayFlag} from '../../../resources/icon/GrayFlag';
import {fontRegular} from '../../common/font';
import Board from '../../classes/Board';
import {BigOrangeFlag} from '../../../resources/icon/OrangeFlag';
import {
  BigGrayPin,
  BigOrangePin,
  BigPurplePin,
} from '../../../resources/icon/Pin';
import SearchIcon from '../../../resources/icon/SearchIcon';
import NoReport, {Report} from '../../../resources/icon/Report';
import SettingIcon from '../../../resources/icon/SettingIcon';
import {ModalBottom} from '../../components/ModalBottom';
import {SelectModalBottom} from '../../components/SelectModalBottom';
type RootStackParamList = {
  PostScreen: {boardId: number; postId: number};
  UpdateBoard: {boardId: number};
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
      const boardDetail = await getBoardDetail(route.params.boardId, 0, sortBy);
      const boardInfo = await getBoardInfo(route.params.boardId);
      setBoardDetail(boardDetail);
      setBoardInfo(boardInfo);
      setIsLoading(false);
    }
    if (isFocused) init();
  }, [isFocused, sortBy]);

  const handleRefresh = async () => {
    const postList = await getBoardDetail(route.params.boardId, 0, sortBy);
    setCurrentPage(0);
    setBoardDetail(postList);
  };

  const fetchNextPage = async () => {
    let thisPagePostList: ContentPreviewDto[] = await getBoardDetail(
      route.params.boardId,
      currentPage + 1,
      sortBy,
    );
    setBoardDetail(boardDetail.concat(thisPagePostList));
    if (thisPagePostList.length > 0) {
      setCurrentPage(currentPage + 1);
    }
  };
  const SampleFunction = () => {
    Alert.alert('플로팅 버튼 눌림!');
  };
  const HeaderIcon = () => {
    return (
      <>
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
            boardInfo?.type === 1 || boardInfo?.type === 2 ? (
              <BigPurplePin />
            ) : (
              <BigOrangePin />
            )
          ) : (
            <BigGrayPin />
          )}
        </Pressable>
        <Text style={[fontRegular, {marginLeft: 8, fontSize: 15}]}>
          {boardInfo?.name}
        </Text>
      </>
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderIcon />,
      headerRight: () => (
        <SpinningThreeDots
          handleDefaultModeComponent={handleBoardSearchComponent}
          isMine={boardInfo?.isOwner}
          handleOptionModeIsMineComponent={handleBoardSettingComponent}
          handleOptionModeIsNotMineComponent={handleBoardReportComponent}
        />
      ),
      headerTitleAlign: 'center',
    });
  }, [navigation, boardInfo, reportCheckModalVisible, reportModalVisible]);

  const handleBoardSearchComponent = (
    <View style={{marginRight: 4}}>
      <Pressable hitSlop={5} onPress={() => console.log('search icon click')}>
        <SearchIcon />
      </Pressable>
    </View>
  );
  const handleBoardSettingComponent = (
    <View style={{marginRight: 10}}>
      <Pressable
        hitSlop={5}
        onPress={() =>
          navigation.navigate('UpdateBoard', {boardId: route.params.boardId})
        }>
        <SettingIcon />
      </Pressable>
    </View>
  );
  const handleBoardReportComponent = (
    <>
      {boardInfo?.isReported ? (
        <Pressable
          hitSlop={5}
          onPress={() => {
            Toast.show('이미 신고한 게시판입니다.', Toast.SHORT);
          }}>
          <Report style={{marginRight: 10}} />
        </Pressable>
      ) : (
        <Pressable
          hitSlop={5}
          onPress={() => {
            setReportCheckModalVisible(true);
          }}>
          <NoReport style={{marginRight: 10}} />
        </Pressable>
      )}
    </>
  );
  {
    reportCheckModalVisible && (
      <ModalBottom
        modalVisible={reportCheckModalVisible}
        setModalVisible={setReportCheckModalVisible}
        modalText={`게시판 신고`}
        modalBody={`- 신고 후에는 내용을 수정할 수 없습니다.\n - 무분별한 신고를 방지하기 위해 신고 1회당 50포인트가 차감됩니다.`}
        modalButtonText="확인"
        modalButton
        modalButtonFunc={() => {
          setReportCheckModalVisible(false);
          setReportModalVisible(true);
        }}
      />
    );
  }
  {
    reportModalVisible && (
      <SelectModalBottom
        modalVisible={reportModalVisible}
        setModalVisible={setReportModalVisible}
        modalText={`게시판 신고`}
        modalButtonText="신고하기"
        modalButton
        modalButtonFunc={async () => {
          const result = await reportBoard(boardInfo.id, 1, '');
          if (result.code === 'CREATE_BOARD_REPORT_SUCCESS') {
            console.log('게시판 신고 성공');
            Toast.show(
              '신고하신 내용이 정상적으로 접수되었습니다.',
              Toast.LONG,
            );
          } else if (result.code === 'BOARD_REPORT_FAIL_POINT_NOT_ENOUGH') {
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
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
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
       <TouchableOpacity
        onPress={() => {
          if (sortBy === 'createdAt') {
            setSortBy('likeCount');
          } else {
            setSortBy('createdAt');
          }
        }}
        style={{marginLeft: 24, width: 66, height: 24, backgroundColor: '#f6f6f6', borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Text>
          {sortBy === 'createdAt' ? "최신순" : "공감순"}
        </Text>
        </TouchableOpacity>
      {boardDetail?.length === 0 ? (
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
              아직 작성된 게시글이 없습니다.{'\n'}첫 글을 작성해주세요.
            </Text>
          </View>
        </SafeAreaView>
      ) : (
        <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
          <FlatList
            style={{marginTop: 10}}
            data={boardDetail}
            renderItem={({item, index}) => (
              <Pressable
                onPress={async () => {
                  const result = await getPosts(boardDetail[index].postId);
                  if (result === 'NOT_FOUND')
                    Toast.show('삭제된 게시글입니다.', Toast.LONG);
                  else
                    navigation.navigate('PostScreen', {
                      boardId: route.params.boardId,
                      postId: boardDetail[index].postId,
                    });
                }}>
                <PostItem post={item} />
              </Pressable>
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
        </ScrollView>
      )}
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={SampleFunction}
        style={styles.touchableOpacityStyle}>
        <FloatingWriteButton style={styles.floatingButtonStyle} />
      </TouchableOpacity>
    </View>
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
