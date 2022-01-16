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
};

type Props = NativeStackScreenProps<RootStackParamList>;
const HomeFragment = ({navigation}: Props) => {
  const [nickname, setNickname] = useState<string>('익명');
  const [homeContents, setHomeContents] = useState<Home[]>([]);
  useEffect(() => {
    async function getNickname() {
      const nickname = await AsyncStorage.getItem('nickname');
      if (nickname != null) {
        setNickname(nickname);
      }
    }
    getNickname();
  }, []);

  useEffect(() => {
    async function getContents() {
      const list = await getHomeContents();
      if (list != null) {
        setHomeContents(list);
      }
    }
    getContents();
  }, []);

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View>
        <View
          style={{
            backgroundColor: '#F7F7F7',
            marginHorizontal: 12,
            borderRadius: 20,
            marginTop: 12,
          }}>
          <View
            style={{
              borderRadius: 20,
              marginLeft: 32,
              marginTop: 32,
              marginBottom: 32,
            }}>
            <Text style={{fontSize: 22}}>
              <Text style={{fontWeight: 'bold'}}>{nickname}</Text>
              {` 님, 안녕하세요!`}
            </Text>
          </View>
          <View style={styles.newsContainer}>
            <NewsCheckIcon />
            <View style={{paddingRight: 90}}>
              <Text style={styles.newsTitle}>인증 만료일이 3일 남았어요.</Text>
              <Text style={styles.newsMore}>인증하러 가기</Text>
            </View>
            <RightArrowBold />
          </View>
        </View>
        <View
          style={{
            marginLeft: (Dimensions.get('window').width / 25) * 2,
            marginTop: 44,
            marginBottom: 8,
          }}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('PostListScreen')}>
            <View style={styles.rowContainer}>
              <Text style={styles.boardTitle}>고정 게시판</Text>
              <RightArrowBold />
            </View>
          </TouchableWithoutFeedback>
          {/* 게시판 글 목록 */}

          <FlatList
            data={homeContents}
            renderItem={({item, index}) => (
              <View style={styles.postSummaryContainer}>
                <Text style={styles.postSummary}>
                  {item.pinBoardDto[index].boardName}
                </Text>
                <Text style={styles.postTitleSummary}>
                  {item.pinBoardDto[index].postContent}
                </Text>
                <Text style={styles.postNewLabel}>N</Text>
              </View>
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
            <RightArrowBold />
          </View>
          {/* 게시판 글 목록 */}
          <View style={styles.postSummaryContainer}>
            <Text style={styles.postSummary}>dddd</Text>
            <EmptyHeart />
            <Text style={styles.HOTpostLike}>000</Text>
            <EmptyComment />
            <Text style={styles.HOTpostComment}>000</Text>
          </View>
          <View style={styles.postSummaryContainer}>
            <Text style={styles.postSummary}>
              게시판에 공백 포함 23자 본문을 노출합니다...
            </Text>
            <EmptyHeart />
            <Text style={styles.HOTpostLike}>000</Text>
            <EmptyComment />
            <Text style={styles.HOTpostComment}>000</Text>
          </View>
          <View style={styles.postSummaryContainer}>
            <Text style={styles.postSummary}>
              게시판에 공백 포함 23자 본문을 노출합니다...
            </Text>
            <EmptyHeart />
            <Text style={styles.HOTpostLike}>000</Text>
            <EmptyComment />
            <Text style={styles.HOTpostComment}>000</Text>
          </View>
          <View style={styles.postSummaryContainer}>
            <Text style={styles.postSummary}>
              게시판에 공백 포함 23자 본문을 노출합니다...
            </Text>
            <EmptyHeart />
            <Text style={styles.HOTpostLike}>000</Text>
            <EmptyComment />
            <Text style={styles.HOTpostComment}>000</Text>
          </View>
          <View style={styles.postSummaryContainer}>
            <Text style={styles.postSummary}>
              게시판에 공백 포함 23자 본문을 노출합니다...
            </Text>
            <EmptyHeart />
            <Text style={styles.HOTpostLike}>000</Text>
            <EmptyComment />
            <Text style={styles.HOTpostComment}>000</Text>
          </View>
          {/* 게시판 글 목록 */}
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeFragment;

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  boardTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 24,
    marginRight: 235,
  },
  postSummaryContainer: {
    marginBottom: 15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  postSummary: {
    fontSize: 13,
    marginRight: 16,
  },
  postTitleSummary: {
    color: '#C4C4C4',
    fontSize: 13,
  },
  postNewLabel: {
    color: '#FF6060',
    marginLeft: 8,
    fontSize: 12,
    fontWeight: 'bold',
  },
  HOTpostLike: {
    fontSize: 9,
    marginLeft: 5,
    marginRight: 5,
  },
  HOTpostComment: {
    fontSize: 9,
    marginLeft: 5,
  },
  newsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 32,
    paddingBottom: 30,
  },
  newsTitle: {
    fontSize: 13,
    marginLeft: 10,
  },
  newsMore: {
    color: '#707A82',
    fontSize: 9,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 4,
  },
});
