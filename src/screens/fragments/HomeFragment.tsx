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
  TouchableHighlight,
} from 'react-native';
import {fontBold, fontMedium, fontRegular} from '../../common/font';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {PurpleRoundButton} from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NewsExclamationMarkIcon from '../../../resources/icon/NewsExclamationMarkIcon';
import EmptyComment from '../../../resources/icon/EmptyComment';
import EmptyHeart from '../../../resources/icon/EmptyHeart';
import RightArrowBold from '../../../resources/icon/RightArrowBold';
import {PinBoardDto, HotBoardDto, HomeNotification} from '../../classes/Home';
import {
  getAuthentication,
  getHotBoardContents,
  getNotification,
  getPinBoardContents,
  getUnreadNotification,
} from '../../common/homeApi';
import {ModalBottom} from '../../components/ModalBottom';
import {useIsFocused} from '@react-navigation/native';
import CheckMark from '../../../resources/icon/CheckMark';
import Toast from 'react-native-simple-toast';
import {Authentication} from '../../classes/Authentication';
import {NoticeDto} from '../../classes/mypage/NoticeDto';
import { PlatformOS } from '../../components/PlatformOS';

type RootStackParamList = {
  PostListScreen: {boardId: number};
  MyPageFragment: undefined;
  PostScreen: undefined;
  RegularMemberAuthMyPage: undefined;
  TermsOfService: undefined;
  Board: undefined;
  InformationUse: undefined;
  DirectionAgreeScreen: undefined;
};
type notiItemDto = {
  notiItem: HomeNotification;
};
type Props = NativeStackScreenProps<RootStackParamList>;
const HomeFragment = ({navigation}: Props) => {
  const [pinBoardContents, setPinBoardContents] = useState<PinBoardDto[]>();
  const [hotBoardContents, setHotBoardContents] = useState<HotBoardDto>();
  const [blacklistblindModalVisible, setBlacklistblindModalVisible] = useState<
    boolean
  >();
  const [blindModalVisible, setBlindModalVisible] = useState<boolean>(false);
  const [modalBody, setModalBody] = useState<JSX.Element>();
  const [user, setUser] = useState<Authentication>();
  const [noti, setNoti] = useState<HomeNotification[]>([]);
  const numOfBoardTitle = 19; // 고정 게시판 내용
  const isFocused = useIsFocused();

  const blacklistModalContent = (
    <>
      {user?.blacklist && (
        <>
          <Text style={[fontRegular, {fontSize: 13}]}>
            안녕하세요. {user?.nickname}님. {`\n`}
            해당 계정은 수정광산 서비스 운영정책 위반으로 서비스의 이용이
            제한되었음을 알려드립니다. 운영정책 위반에 대한 상세 내용은 하단을
            참고 부탁드리며, 이후 해당 계정에 대한 로그인과 모든 서비스 이용이
            불가능합니다. {`\n`}
            이용 제한 처리일로 부터 7일 후, 서비스에서 자동으로 로그아웃 되며
            학교 G-mail 계정으로도 관련 내용을 보내드리고 있으니 확인 바랍니다.
            {`\n`}
            {`\n`}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={[fontBold, {width: 88, marginRight: 7}]}>
              이용 제한 계정
            </Text>
            <Text>{user?.blacklist.username}@sungshin.ac.kr</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[fontBold, {width: 88, marginRight: 7}]}>
              이용 제한 날짜
            </Text>
            <Text>{user?.blacklist.createdAt}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[fontBold, {width: 88, marginRight: 7}]}>
              이용 제한 사유
            </Text>
            <Text>{user?.blacklist.reason}</Text>
          </View>
        </>
      )}
    </>
  );
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
      const userDto = await getAuthentication();
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
            {noti.map((item, index) =>
              <TouchableHighlight
                key={index}
                style={{borderTopWidth: index === 0 ? 0 : 1, borderTopColor: '#F6F6F6'}}
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
                    item.type === 6 ||
                    item.type === 7
                  ) {
                    setBlindModalVisible(true);
                    const itemContent = (
                      <View>
                        <Text style={[fontRegular, {marginBottom: 15, width: Dimensions.get('window').width - 100}]}>
                          {item.type === 4
                            ? '생성한 게시판이'
                            : item.type === 5
                            ? '고정한 게시판이'
                            : item.type === 6
                            ? '작성한 게시글이'
                            : item.type === 7
                            ? '작성한 댓글이'
                            : ''}{' '}
                          15회 이상 신고되어, {item.sender}에 의해 블라인드 되었습니다. 사유는 다음과 같습니다.
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={[fontBold, {width: 88, marginRight: 7}]}>
                            블라인드 사유
                          </Text>
                          <Text style={{width: 148}}>{item.reason}과도한 비난</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={[fontBold, {width: 88, marginRight: 7}]}>
                              {item.type === 4
                            ? '게시판 이름'
                            : item.type === 5
                            ? '게시판 이름'
                            : item.type === 6
                            ? '작성 내용'
                            : item.type === 7
                            ? '작성 내용:'
                            : ''}
                          </Text>
                          <Text style={{ width: Dimensions.get('window').width - 178}}>{item.content}</Text>
                        </View>
                  
                      </View>
                    );
                    setModalBody(itemContent);
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
              </TouchableHighlight>)
            }
            
            {blindModalVisible && (
              <ModalBottom
                modalVisible={blindModalVisible}
                setModalVisible={setBlindModalVisible}
                title="블라인드 안내"
                content={modalBody}
                isContentCenter={false}
                purpleButtonText="수정광산 이용 방향 보기"
                purpleButtonFunc={() => {
                  setBlindModalVisible(!blindModalVisible);
                  navigation.navigate('DirectionAgreeScreen');
                }}
                whiteButtonText="확인"
                whiteButtonFunc={() => setBlindModalVisible(!blindModalVisible)}
              />
            )}
          </View>
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
                  // ? navigation.navigate('InformationUse')
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
      {user?.blacklist && setBlacklistblindModalVisible(true)}
      {blacklistblindModalVisible && (
        <ModalBottom
          modalVisible={blacklistblindModalVisible}
          setModalVisible={setBlacklistblindModalVisible}
          title={'서비스 이용 제한 안내'}
          content={blacklistModalContent}
          isContentCenter={false}
          purpleButtonText="서비스 이용 방향 보기"
          purpleButtonFunc={() => {
            setBlacklistblindModalVisible(!blacklistblindModalVisible);
            navigation.navigate('InformationUse');
          }}
          whiteButtonText="확인"
          whiteButtonFunc={() =>
            // TODO: 앱 종료
            setBlacklistblindModalVisible(!blacklistblindModalVisible)
          }
        />
      )}
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
