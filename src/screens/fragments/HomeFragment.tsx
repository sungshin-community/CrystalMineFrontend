import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {fontBold} from '../../common/font';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {PurpleRoundButton} from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NewsExclamationMarkIcon from '../../../resources/icon/NewsExclamationMarkIcon';
import EmptyComment from '../../../resources/icon/EmptyComment';
import EmptyHeart from '../../../resources/icon/EmptyHeart';
import RightArrowBold from '../../../resources/icon/RightArrowBold';
import {PinBoardDto, HotBoardDto, HomeNotification} from '../../classes/Home';
import {
  getHotBoardContents,
  getNotification,
  getPinBoardContents,
  getUnreadNotification,
} from '../../common/homeApi';
import {ModalBottom} from '../../components/ModalBottom';
import {useIsFocused} from '@react-navigation/native';
import User from '../../classes/User';
import {getUser} from '../../common/myPageApi';
import CheckMark from '../../../resources/icon/CheckMark';
import Toast from 'react-native-simple-toast';

type RootStackParamList = {
  PostListScreen: {boardId: number};
  MyPageFragment: undefined;
  PostScreen: undefined;
  RegularMemberAuthMyPage: undefined;
  TermsOfService: undefined;
  Board: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;
const HomeFragment = ({navigation}: Props) => {
  const [pinBoardContents, setPinBoardContents] = useState<PinBoardDto[]>();
  const [hotBoardContents, setHotBoardContents] = useState<HotBoardDto>();
  const [blindVisible, setBlindVisible] = useState<boolean[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [noti, setNoti] = useState<HomeNotification[]>([]);
  const numOfBoardTitle = 19; // 고정 게시판 내용
  const isFocused = useIsFocused();

  useEffect(() => {
    async function getContents() {
      const pinBoardData = await getPinBoardContents();
      const hotBoardData = await getHotBoardContents();
      const notification = await getUnreadNotification();

      if (pinBoardData != null && hotBoardData != null) {
        setPinBoardContents(pinBoardData);
        setHotBoardContents(hotBoardData);
      }
      setNoti(notification);
    }
    if (isFocused) {
      getContents();
    }
  }, [isFocused]);
  useEffect(() => {
    async function getUserInfo() {
      const userDto = await getUser();
      setUser(userDto);
    }
    if (isFocused) {
      getUserInfo();
    }
  }, [isFocused]);

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View
        style={{
          backgroundColor: '#F6F6F6',
          paddingVertical: 32,
        }}>
        <Text
          style={{
            fontSize: 22,
            marginLeft: 40,
            marginBottom: noti.length !== 0 ? 26 : 0,
          }}>
          <Text style={{fontWeight: 'bold', color: '#A055FF'}}>
            {user?.nickname}
          </Text>
          {` 님, `}
          {user && user?.nickname.length > 8 ? <Text>{`\n`}</Text> : <></>}
          {`안녕하세요!`}
        </Text>

        <View
          style={{
            borderRadius: 20,
          }}>
          <View
            style={{
              borderRadius: 20,
              marginHorizontal: 24,
              paddingHorizontal: 18,
              backgroundColor: '#fff',
            }}>
            <FlatList
              data={noti}
              renderItem={({item}) => (
                <>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      if (
                        item.type === 1 ||
                        item.type === 2 ||
                        item.type === 3
                      ) {
                        navigation.navigate('RegularMemberAuthMyPage');
                      } else if (
                        item.type === 4 ||
                        item.type === 5 ||
                        item.type === 6
                      ) {
                        setModalVisible(true);
                      }
                    }}>
                    <View style={styles.newsContainer}>
                      <View style={{flexDirection: 'row'}}>
                        {item.type === 0 && <CheckMark />}
                        {item.type !== 0 && <NewsExclamationMarkIcon />}
                        <View>
                          <Text style={styles.newsTitle}>{item.title}</Text>
                          <Text style={styles.newsMore}>{item.content}</Text>
                        </View>
                      </View>
                      <View>
                        <RightArrowBold />
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </>
              )}
              ItemSeparatorComponent={() => (
                <View style={{height: 1, backgroundColor: '#F6F6F6'}}></View>
              )}
            />
          </View>

          {modalVisible && (
            <ModalBottom
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              title={modalText}
              content={modalBody}
              purpleButtonText="서비스 이용 방향 보기"
              purpleButtonFunc={() => {
                setModalVisible(!modalVisible);
                navigation.navigate('TermsOfService');
              }}
              whiteButtonText="확인"
              whiteButtonFunc={() => setModalVisible(!modalVisible)}
            />
          )}
        </View>
      </View>
      <View
        style={{
          padding: 24,
        }}>
        <View style={styles.rowContainer}>
          <Text style={styles.boardTitle}>고정 게시판</Text>
          <TouchableWithoutFeedback
            onPress={() => {
              {
                user?.isAuthenticated
                  ? navigation.navigate('Board')
                  : Toast.show('접근 권한이 없습니다.', Toast.LONG);
              }
            }}>
            <Text style={styles.more}>더보기</Text>
          </TouchableWithoutFeedback>
        </View>
        {/* 게시판 글 목록 */}
        {user?.isAuthenticated ? (
          pinBoardContents?.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate('PostListScreen', {boardId: item.boardId})
              }>
              <View style={styles.pinBoardContainer}>
                <View style={styles.postTitleSummaryContainer}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.postTitleSummary}>
                    {item.boardName.slice(0, numOfBoardTitle)}
                  </Text>
                </View>
                <View style={styles.postSummaryContainer}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.postSummary}>
                    {item.recentPostContent}
                  </Text>
                </View>
                <View style={styles.postNewLabelContainer}>
                  {item.todayNewPost ? (
                    <Text style={styles.postNewLabel}>N</Text>
                  ) : (
                    <></>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View
            style={{
              backgroundColor: '#F7F7F7',
              paddingVertical: 27,
              borderRadius: 20,
            }}>
            <Text style={{textAlign: 'center', fontSize: 15, color: '#6E7882'}}>
              정회원 인증 후 확인하실 수 있습니다.
            </Text>
          </View>
        )}

        {/* 게시판 글 목록 */}
        <View
          style={{
            borderBottomColor: '#F0F0F0',
            borderBottomWidth: 1,
            marginBottom: 24,
            marginTop: 24,
          }}
        />
        <View style={styles.rowContainer}>
          <Text style={styles.boardTitle}>HOT 게시글</Text>
          <TouchableWithoutFeedback
            onPress={() => {
              {
                user?.isAuthenticated
                  ? navigation.navigate('PostListScreen', {boardId: 1})
                  : Toast.show('접근 권한이 없습니다.', Toast.LONG);
              }
            }}>
            <Text style={styles.more}>더보기</Text>
          </TouchableWithoutFeedback>
        </View>
        {user?.isAuthenticated ? (
          hotBoardContents?.hotPosts.map((item, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.navigate('PostScreen')}>
              <View style={styles.hotPostContainer}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[
                    styles.postSummary,
                    {
                      width: Dimensions.get('window').width - 150,
                      color: '#000',
                    },
                  ]}>
                  {item.postContent.slice(0, 30)}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <EmptyHeart />
                  <Text style={styles.HOTpostLike}>{item.likeCount}</Text>
                  <EmptyComment />
                  <Text style={styles.HOTpostComment}>{item.commentCount}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))
        ) : (
          <View
            style={{
              backgroundColor: '#F7F7F7',
              paddingVertical: 27,
              borderRadius: 20,
            }}>
            <Text style={{textAlign: 'center', fontSize: 15, color: '#6E7882'}}>
              정회원 인증 후 확인하실 수 있습니다.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default HomeFragment;

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boardTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 16,
  },
  more: {
    fontSize: 13,
    color: '#A055FF',
    textDecorationLine: 'underline',
  },
  pinBoardContainer: {
    marginVertical: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  hotPostContainer: {
    marginVertical: 8,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  postTitleSummary: {
    fontSize: 13,
    marginRight: 16,
    maxWidth: 180,
  },
  postSummary: {
    color: '#6E7882',
    fontSize: 13,
  },
  postNewLabel: {
    color: '#FF6060',
    fontSize: 12,
    fontWeight: 'bold',
    width: 10,
    marginLeft: 12,
  },
  postTitleSummaryContainer: {},
  postSummaryContainer: {
    alignItems: 'stretch',
    flex: 1,
  },
  postNewLabelContainer: {},
  HOTpostLike: {
    fontSize: 9,
    marginLeft: 5,
    marginRight: 5,
    width: 22,
  },
  HOTpostComment: {
    fontSize: 9,
    marginLeft: 5,
    width: 22,
  },
  newsContainer: {
    flexWrap: 'wrap',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    backgroundColor: '#FFF',
  },
  newsTitle: {
    fontSize: 15,
    marginLeft: 10,
  },
  newsMore: {
    color: '#707A82',
    fontSize: 13,
    marginLeft: 10,
    marginTop: 4,
    width: Dimensions.get('window').width - 160,
  },
});

const modalBody = (
  <>
    <View style={{marginBottom: 15}}>
      <Text style={{fontSize: 13}}>
        안녕하세요. (사용자 닉네임)님. {`\n`}
        해당 계정은 수정광산 서비스 운영정책 위반으로 서비스의 이용이
        제한되었음을 알려드립니다. 운영정책 위반에 대한 상세 내용은 하단을 참고
        부탁드리며, 이후 해당 계정에 대한 로그인과 모든 서비스 이용이
        불가능합니다. {`\n`}
        근데 이거 아직 내용 안나와서 내용 수정해야합니다.
      </Text>
    </View>
    <View style={{flexDirection: 'row'}}>
      <Text style={[fontBold, {width: 88}]}>블라인드 계정</Text>
      <Text>00000000@sungshin.ac.kr</Text>
    </View>
    <View style={{flexDirection: 'row'}}>
      <Text style={[fontBold, {width: 88}]}>블라인드 날짜</Text>
      <Text>0000.00.00</Text>
    </View>
  </>
);
const modalText = (
  <>
    <View style={{marginBottom: 15}}>
      <Text style={[fontBold, {fontSize: 17}]}>블라인드 안내</Text>
    </View>
  </>
);
