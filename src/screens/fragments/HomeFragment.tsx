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
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {PurpleRoundButton} from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NewsExclamationMarkIcon from '../../../resources/icon/NewsExclamationMarkIcon';
import EmptyComment from '../../../resources/icon/EmptyComment';
import EmptyHeart from '../../../resources/icon/EmptyHeart';
import RightArrowBold from '../../../resources/icon/RightArrowBold';
import Home from '../../classes/Home';
import getHomeContents from '../../common/homeApi';

type RootStackParamList = {
  PostListScreen: {boardId: number};
  MyPageFragment: undefined;
  PostScreen: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;
const HomeFragment = ({navigation}: Props) => {
  const [homeContents, setHomeContents] = useState<Home>();

  const numOfBoardTitle = 19; // 고정 게시판 내용

  useEffect(() => {
    async function getContents() {
      const list = await getHomeContents();
      if (list != null) {
        setHomeContents(list);
      }
    }
    getContents();
    console.log(homeContents)
  }, []);

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
            marginBottom: 26,
          }}>
          <Text style={{fontWeight: 'bold', color: '#A055FF'}}>
            {homeContents?.nickname}
          </Text>
          {` 님, 안녕하세요!`}
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
            {homeContents?.expiredAt !== 0 ? (
              <>
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate('MyPageFragment')}>
                  <View style={styles.newsContainer}>
                    <View style={{flexDirection: 'row'}}>
                      <NewsExclamationMarkIcon />
                      <View>
                        <Text style={styles.newsTitle}>
                          인증 만료일이 {homeContents?.expiredAt}일 남았어요.
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
            {homeContents?.expiredAt === 0 ? (
              <>
                <View
                  style={{
                    borderBottomColor: '#F0F0F0',
                    borderBottomWidth: 1,
                  }}
                />
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate('MyPageFragment')}>
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

            {/* 블라인드 알림 */}
            <View
              style={{
                borderBottomColor: '#F0F0F0',
                borderBottomWidth: 1,
              }}
            />
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('MyPageFragment')}>
              <View style={styles.newsContainer}>
                <View style={{flexDirection: 'row'}}>
                  <NewsExclamationMarkIcon />
                  <View>
                    <Text style={styles.newsTitle}>
                      작성한 글이 블라인드 되었어요.
                    </Text>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.newsMore}>
                      글미리보기글미리보기글미리보기글미리보기글미리보기글미리보기글미리보기
                    </Text>
                  </View>
                </View>
                <View>
                  <RightArrowBold />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
      <View
        style={{
          padding: 24,
        }}>
        <TouchableWithoutFeedback
          onPress={() => {}}>
          <View style={styles.rowContainer}>
            <Text style={styles.boardTitle}>고정 게시판</Text>
            <Text style={styles.more}>더보기</Text>
          </View>
        </TouchableWithoutFeedback>
        {/* 게시판 글 목록 */}
        {homeContents?.pinBoardDtos.length !== 0 ? (
          <FlatList
            data={homeContents?.pinBoardDtos}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('PostListScreen', {boardId: item.boardId})}>
                <View style={styles.postSummaryContainer}>
                  <Text style={styles.postSummary}>
                    {item.boardName.slice(0, numOfBoardTitle)}
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.postTitleSummary}>
                    {/* {item.postContent.slice(0, 60 - numOfBoardTitle)} */}
                  </Text>
                  {item.todayNewPost ? (
                    <Text style={styles.postNewLabel}>N</Text>
                  ) : (
                    <></>
                  )}
                </View>
              </TouchableOpacity>
            )}
          />
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
        <TouchableWithoutFeedback
          onPress={() => {}}>
          <View style={styles.rowContainer}>
            <Text style={styles.boardTitle}>HOT 게시판</Text>
            <Text style={styles.more}>더보기</Text>
          </View>
        </TouchableWithoutFeedback>
        {/* {homeContents?.hotBoardDtos.length !== 0 ? ( */}
        <FlatList
          data={homeContents?.hotBoardDtos}
          renderItem={({item}) => (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('PostScreen')}>
              <View style={styles.postSummaryContainer}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[
                    styles.postSummary,
                    {width: Dimensions.get('window').width - 150},
                  ]}>
                  {/* {item.postContent.slice(0, 30)} */}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <EmptyHeart />
                  <Text style={styles.HOTpostLike}>{item.likeCount}</Text>
                  <EmptyComment />
                  <Text style={styles.HOTpostComment}>{item.commentCount}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        />
        {/* ) : ( */}
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
        {/* )} */}
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
  postSummaryContainer: {
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postSummary: {
    fontSize: 13,
    marginRight: 16,
  },
  postTitleSummary: {
    color: '#6E7882',
    fontSize: 13,
    marginRight: 12,
  },
  postNewLabel: {
    color: '#FF6060',
    fontSize: 12,
    fontWeight: 'bold',
    width: 10,
  },
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
