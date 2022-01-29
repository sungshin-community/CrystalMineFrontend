import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import styled from 'styled-components';
import ProfileImage from '../../resources/icon/ProfileImage';
import EmptyHeart from '../../resources/icon/EmptyHeart';
import EmptyComment from '../../resources/icon/EmptyComment';
import ThreeDots from './ThreeDots';
import Scrap, {NoScrap} from '../../resources/icon/Scrap';
function Post() {
  return (
    <>
      <View style={styles.postContainer}>
        <View style={styles.postHeader}>
          <View style={{flexDirection:'row'}}>
          <ProfileImage></ProfileImage>
          <Text style={{fontSize: 16, paddingLeft: 8, fontWeight: `500`}}>
            수정
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <NoScrap/>
            <ThreeDots icons={<NoScrap/>}/>
            </View>
        </View>
        <View style={styles.postBody}>
          <Text>
            위하여 들어 풀이 가슴에 날카로우나 약동하다. 우리는 이상을 스며들어
            내려온 교향악이다. 창공에 생생하며, 이상이 피가 가진 곳이
            아름다우냐? 생명을 날카로우나 놀이 인간에 지혜는 방지하는 역사를
            온갖 봄바람이다. 우리는 찾아다녀도, 않는 있는 없으면 봄바람이다.
            소담스러운 찾아다녀도, 보이는 따뜻한 미인을 청춘의 사막이다. 밝은
            그들은 길을 가진 맺어, 예가 모래뿐일 풀이 있다. 우리 그들의 그들을
            우리의 아니더면, 보라. 갑 방지하는 만물은 몸이 길을 곳이 우리
            쓸쓸하랴? 보는 하여도 청춘의 있을 예수는 설레는 앞이 듣는다.
          </Text>
        </View>
        <Text style={{color: '#949494', fontSize: 12, marginTop: 12}}>
          1분 전
        </Text>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 22}}>
          <EmptyHeart />
          <Text style={styles.postLike}>0000</Text>
          <EmptyComment />
          <Text style={styles.postComment}>0000</Text>
        </View>
      </View>
      <View
        style={{borderWidth: 1, borderColor: '#F4F4F4', marginTop: 28}}></View>
    </>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    paddingHorizontal: 24,
    paddingTop: 18,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  postBody: {
    marginTop: 8,
  },
  postLike: {
    fontSize: 13,
    marginLeft: 5,
    marginRight: 5,
    width: 35,
  },
  postComment: {
    fontSize: 13,
    marginLeft: 5,
    width: 35,
  },
});

export default Post;
