import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
} from 'react-native';
import CommentIcon from '../../resources/icon/CommentIcon';
import DevelopmentIcon from '../../resources/icon/DevelopmentIcon';
import UpIcon from '../../resources/icon/UpIcon';
import AlertIcon from '../../resources/icon/AlertIcon';
import HotIcon from '../../resources/icon/HotIcon';
import NoticeIcon from '../../resources/icon/NoticeIcon';
import AlertBox from '../components/AlertBox';
import Toast from 'react-native-toast-message';

const AlertTestScreen = () => {
    const showToast = () => {
        Toast.show({
        type: 'success',
        text1: 'Hello',
        text2: 'This is some something 👋'
        });
    }
  return (
    <SafeAreaView style={styles.alertScreenContainer}>
          <AlertBox
            icon={<DevelopmentIcon />}
            title="게시글 알림 기능은 아직 개발 중이에요!"
            message="게시글과 댓글에 관련한 알림은 아직 개발 중입니다."
            onPress={showToast}
          />

          <AlertBox
            icon={<CommentIcon />}
            title="게시글에 댓글이 달렸습니다."
            message={'<네모좋아하는 사람들> 게시글에 댓글이 달렸습니다: 떴다떴다 비행기 날아라 날아라'}
            date={'1분 전'}
            onPress={showToast}
          />

          <AlertBox
            icon={<UpIcon />}
            title="LV.3으로 등업하였습니다."
            date={'3분 전'}
            onPress={showToast}
          />

          <AlertBox
            icon={<AlertIcon />}
            title="댓글이 블라인드 처리되었습니다."
            message={'<네모좋아하는 사람들> 게시글에 댓글이 달렸습니다: 떴다떴다 비행기 날아라 날아라'}
            date={'12.02'}
            onPress={showToast}
          />

          <AlertBox
            icon={<HotIcon />}
            title="HOT 게시글로 선정되었습니다."
            message="(게시글 내용~)"
            date={'8/23 13:45'}
            onPress={showToast}
          />

          <AlertBox
            icon={<NoticeIcon />}
            title="새 공지사항이 등록 되었습니다."
            message="(공지사항 제목)"
            date={'8/23 13:45'}
            onPress={showToast}
          />
        </SafeAreaView>

  );
};

export default AlertTestScreen;

const styles = StyleSheet.create({
  alertScreenContainer: {
    flex:1,
    backgroundColor: 'white',
  },

});