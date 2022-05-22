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
import Home from '../../classes/Home';
import getHomeContents from '../../common/homeApi';
import {checkRegularMember} from '../../common/authApi';
import {ModalBottom} from '../../components/ModalBottom';
import {useIsFocused} from '@react-navigation/native';

type RootStackParamList = {
  PostListScreen: {boardId: number};
  MyPageFragment: undefined;
  PostScreen: undefined;
  RegularMemberAuthMyPage: undefined;
  TermsOfService: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;
const HomeFragment = ({navigation}: Props) => {
  const [homeContents, setHomeContents] = useState<Home>();
  const [isRegularMember, setIsRegularMember] = useState<boolean>(false);
  const [blindVisible, setBlindVisible] = useState<boolean[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const numOfBoardTitle = 19; // 고정 게시판 내용
  const isFocused = useIsFocused();

  useEffect(() => {
    async function getContents() {
      const list = await getHomeContents();
      if (list != null) {
        setHomeContents(list);
      }
    }
    if (isFocused) {
      getContents();
    }
    checkRegularMemberFunc();
  }, [isFocused]);

  const checkRegularMemberFunc = async () => {
    const result: boolean = await checkRegularMember();
    setIsRegularMember(result);
    console.log('정회원 인증 여부', result);
    if(homeContents?.blinds[0])
    console.log('s')
  };

  const blindVisibleList = homeContents?.blinds.map(index => true);
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View
        style={{
          backgroundColor: '#F6F6F6',
          paddingTop: 32,
          paddingBottom:
            homeContents &&
            (homeContents?.blinds[0] ||
              (homeContents?.expireIn <= 7 && homeContents?.expireIn > 0))
              ? 32
              : 0,
        }}>
        <Text
          style={{
            fontSize: 22,
            marginLeft: 40,
            marginBottom: 26,
          }}>
          <Text style={{fontWeight: 'bold', color: '#A055FF'}}>
            {homeContents?.nickname}
          </Text>
          {` 님, `}
          {homeContents && homeContents?.nickname.length > 8 ? (
            <Text>{`\n`}</Text>
          ) : (
            <></>
          )}
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
            {/* 인증 만료기간 알림 */}
            {homeContents?.expireIn &&
            homeContents?.expireIn > 0 &&
            homeContents?.expireIn <= 7 ? (
              <>
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate('RegularMemberAuthMyPage')
                  }>
                  <View style={styles.newsContainer}>
                    <View style={{flexDirection: 'row'}}>
                      <NewsExclamationMarkIcon />
                      <View>
                        <Text style={styles.newsTitle}>
                          인증 만료일이 {homeContents?.expireIn}일 남았어요!
                        </Text>
                        <Text style={styles.newsMore}>인증하러 가기</Text>
                      </View>
                    </View>
                    <View>
                      <RightArrowBold />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </>
            ) : (
              <></>
            )}
            {/* 인증 만료 알림 */}
            {!isRegularMember && homeContents?.expireIn === 0 ? (
              <>
                <View
                  style={{
                    borderBottomColor: '#F0F0F0',
                    borderBottomWidth: 1,
                  }}
                />
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate('RegularMemberAuthMyPage')
                  }>
                  <View style={styles.newsContainer}>
                    <View style={{flexDirection: 'row'}}>
                      <NewsExclamationMarkIcon />
                      <View>
                        <Text style={styles.newsTitle}>
                          정회원 인증이 필요해요.
                        </Text>
                        <Text style={styles.newsMore}>인증하러 가기</Text>
                      </View>
                    </View>
                    <View>
                      <RightArrowBold />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </>
            ) : (
              <></>
            )}
            {homeContents &&
            (homeContents?.blinds[0] ||
              (homeContents?.expireIn <= 7 && homeContents?.expireIn > 0)) ? (
              <View
                style={{
                  borderBottomColor: '#F0F0F0',
                  borderBottomWidth: 1,
                }}
              />
            ) : (
              <></>
            )}

            {/* 블라인드 알림 */}
            {homeContents &&
              homeContents.blinds.map((item, index) => (
                <View key={index}>
                  {blindVisibleList && blindVisibleList[index] && (
                    <TouchableWithoutFeedback
                      onPress={() => {
                        blindVisibleList[index] = false;
                        console.log(blindVisibleList);
                        setBlindVisible(blindVisibleList);
                        setModalVisible(!modalVisible);
                      }}>
                      <View style={styles.newsContainer}>
                        <View style={{flexDirection: 'row'}}>
                          <NewsExclamationMarkIcon />
                          <View>
                            {item.type === 1 && (
                              <Text style={styles.newsTitle}>
                                작성한 게시글이 블라인드 되었어요.
                              </Text>
                            )}
                            {item.type === 2 && (
                              <Text style={styles.newsTitle}>
                                작성한 댓글이 블라인드 되었어요.
                              </Text>
                            )}
                            {item.type === 3 && (
                              <Text style={styles.newsTitle}>
                                작성한 게시판이 블라인드 되었어요.
                              </Text>
                            )}
                            {item.type === 4 && (
                              <Text style={styles.newsTitle}>
                                고정한 게시판이 블라인드 되었어요.
                              </Text>
                            )}
                            <Text
                              numberOfLines={1}
                              ellipsizeMode="tail"
                              style={styles.newsMore}>
                              {item.content}
                            </Text>
                          </View>
                        </View>
                        <View>
                          <RightArrowBold />
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  )}
                </View>
              ))}
          </View>
          {modalVisible && (
            <ModalBottom
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              modalText={modalText}
              modalBody={modalBody}
              modalButtonText="서비스 이용 방향 보기"
              modalButton
              modalButtonFunc={() => {
                setModalVisible(!modalVisible);
                navigation.navigate('TermsOfService');
              }}
              isSecondButton={true}
              modalSecondButtonText="확인"
              modalSecondButtonFunc={() => setModalVisible(!modalVisible)}
            />
          )}
        </View>
      </View>
      <View
        style={{
          padding: 24,
        }}>
        <TouchableWithoutFeedback onPress={() => {}}>
          <View style={styles.rowContainer}>
            <Text style={styles.boardTitle}>고정 게시판</Text>
            <Text style={styles.more}>더보기</Text>
          </View>
        </TouchableWithoutFeedback>
        {/* 게시판 글 목록 */}
        {isRegularMember ? (
          homeContents?.pinBoardDtos.map((item, index) => (
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
        <TouchableWithoutFeedback onPress={() => {}}>
          <View style={styles.rowContainer}>
            <Text style={styles.boardTitle}>HOT 게시글</Text>
            <Text style={styles.more}>더보기</Text>
          </View>
        </TouchableWithoutFeedback>
        {isRegularMember ? (
          homeContents?.hotBoardDto.hotPostDtos.map((item, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.navigate('PostScreen')}>
              <View style={styles.hotPostContainer}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[
                    styles.postSummary,
                    {width: Dimensions.get('window').width - 150, color: '#000'},
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
    justifyContent: 'space-between'
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
