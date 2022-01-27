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
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {PurpleRoundButton} from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NewsCheckIcon from '../../../resources/icon/NewsCheckIcon';
import EmptyComment from '../../../resources/icon/EmptyComment';
import EmptyHeart from '../../../resources/icon/EmptyHeart';
import RightArrowBold from '../../../resources/icon/RightArrowBold';
import Home from '../../classes/Home';
import getHomeContents from '../../common/homeApi';

type RootStackParamList = {
  PostListScreen: undefined;
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
  });

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
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('MyPageFragment')}>
            <View style={styles.newsContainer}>
              <NewsCheckIcon />
              <View style={{paddingRight: 90}}>
                <Text style={styles.newsTitle}>
                  인증 만료일이 {homeContents?.expiredAt}일 남았어요.
                </Text>
                <Text style={styles.newsMore}>인증하러 가기</Text>
              </View>
              <RightArrowBold />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{borderColor: '#F6F6F6', borderWidth: 1}}></View>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('MyPageFragment')}>
          <View style={styles.newsContainer}>
            <NewsCheckIcon />
            <View style={{paddingRight: 90}}>
              <Text style={styles.newsTitle}>
                인증 만료일이 {homeContents?.expiredAt}일 남았어요.
              </Text>
              <Text style={styles.newsMore}>인증하러 가기</Text>
            </View>
            <RightArrowBold />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View
        style={{
          padding: 24,
        }}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('PostListScreen')}>
          <View style={styles.rowContainer}>
            <Text style={styles.boardTitle}>고정 게시판</Text>
            <Text style={styles.more}>더보기</Text>
          </View>
        </TouchableWithoutFeedback>
        {/* 게시판 글 목록 */}

        <FlatList
          data={homeContents?.pinBoardDtos}
          renderItem={({item}) => (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('PostScreen')}>
              <View style={styles.postSummaryContainer}>
                <Text style={styles.postSummary}>
                  {item.boardName.slice(0, numOfBoardTitle)}
                </Text>
                <Text style={styles.postTitleSummary}>
                  {item.postContent.slice(0, 43 - numOfBoardTitle)}
                </Text>
                {item.todayNewPost ? (
                  <Text style={styles.postNewLabel}>N</Text>
                ) : (
                  <></>
                )}
              </View>
            </TouchableWithoutFeedback>
          )}
        />

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
          <Text style={styles.boardTitle}>HOT 게시판</Text>
          <Text style={styles.more}>더보기</Text>
        </View>

        <FlatList
          data={homeContents?.hotBoardDtos}
          renderItem={({item}) => (
            <View
              style={[
                styles.postSummaryContainer,
                {justifyContent: 'flex-end'},
              ]}>
              <Text style={styles.postSummary}>
                {item.postContent.slice(0, 33)}
              </Text>
              <EmptyHeart />
              <Text style={styles.HOTpostLike}>{item.likeCount}</Text>
              <EmptyComment />
              <Text style={styles.HOTpostComment}>{item.commentCount}</Text>
            </View>
          )}
        />
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
    flex: 1,
    flexDirection: 'row',
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    marginHorizontal: 24,
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
  },
});
