import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  AlertCheckIcon,
  AlertWorkIcon,
} from '../../resources/icon/AlertItemIcon';
import CheckMark from '../../resources/icon/CheckMark';
import {useNavigation} from '@react-navigation/native';
import AlertBlindIcon from '../../resources/icon/AlertBlindIcon';
import AlertCommentIcon from '../../resources/icon/AlertCommentIcon';
import AlertHotPostIcon from '../../resources/icon/AlertHotPostIcon';
import {readNotification} from '../common/homeApi';
import Toast from 'react-native-simple-toast';
import { Alert } from '../classes/AlertDto';
import React, { useState } from 'react';
import { Dimensions, Pressable, Text, View } from 'react-native';
import { fontBold, fontMedium, fontRegular } from '../common/font';
import { ModalBottom } from './ModalBottom';

interface AlertProps {
  data: Alert;
  blindModalVisible: boolean;
  setBlindModalVisible: any;
}

const AlertItem = (
  {data, blindModalVisible, setBlindModalVisible}: AlertProps,
) => {
  const [modalBody, setModalBody] = useState<JSX.Element>();
  const navigation = useNavigation();

  return (
    <>
      <Pressable
        style={{
          flexDirection: 'row',
          paddingHorizontal: 24,
          paddingVertical: 16,
          backgroundColor: data.isRead ? '#F6F2FF' : '#fff',
        }}
        onPress={async () => {
          if (data.type === 'WELCOME') {
            const result = await readNotification(data.id);
            console.log('알람 확인 후 마이페이지로 이동');
            navigation.navigate('MyPage');
          } else if (
            data.type === 'BEFORE_EXPIRE' ||
            data.type === 'EXPIRE' ||
            data.type === 'NOT_AUTHENTICATED'
          ) {
            if (data.type === 'BEFORE_EXPIRE')
              navigation.navigate('CertifiedMember');
            else if (data.type === 'EXPIRE')
              navigation.navigate('ExpiredMember');
            else if (data.type === 'NOT_AUTHENTICATED')
              navigation.navigate('UncertifiedMember');
            // const result = await readNotification(data.id);
            // 알람 확인 못 해야함.
          } else if (data.type === 'COMMENT') {

          } else if (
            data.type === 'BOARD_BLIND' ||
            data.type === 'PIN_BOARD_BLIND' ||
            data.type === 'POST_BLIND' ||
            data.type === 'COMMENT_BLIND'
          ) {
            const itemContent = (
              <View>
                <Text
                  style={[
                    fontRegular,
                    {
                      marginBottom: 15,
                      width: Dimensions.get('window').width - 100,
                    },
                  ]}>
                  {data.blind?.message}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[fontBold, {width: 93, marginRight: 7}]}>
                    블라인드 사유
                  </Text>
                  <Text style={{width: 143}}>{data.blind?.reason}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[fontBold, {width: 93, marginRight: 7}]}>
                    {data.type === 'BOARD_BLIND'
                      ? '게시판 이름'
                      : data.type === 'PIN_BOARD_BLIND'
                      ? '게시판 이름'
                      : data.type === 'POST_BLIND'
                      ? '작성 내용'
                      : data.type === 'COMMENT_BLIND'
                      ? '작성 내용:'
                      : ''}
                  </Text>
                  <Text
                    style={{
                      width: Dimensions.get('window').width - 183,
                    }}>
                    {data.blind?.content}
                  </Text>
                </View>
              </View>
            );
            if (
              (data.type === 'BOARD_BLIND' ||
                data.type === 'PIN_BOARD_BLIND' ||
                data.type === 'POST_BLIND' ||
                data.type === 'COMMENT_BLIND') &&
              data.blind
            ) {
              setModalBody(itemContent);
              const result = await readNotification(data.id);
              console.log('블라인드 알림 확인');
              setBlindModalVisible(true);
            } else if (data.type === 'BOARD_BLIND' && !data.blind)
              Toast.show('삭제된 게시판입니다.', Toast.SHORT);
            else if (data.type === 'PIN_BOARD_BLIND' && !data.blind)
              Toast.show('삭제된 게시판입니다.', Toast.SHORT);
            else if (data.type === 'POST_BLIND' && !data.blind)
              Toast.show('삭제된 게시글입니다.', Toast.SHORT);
            else if (data.type === 'COMMENT_BLIND' && !data.blind)
              Toast.show('삭제된 댓글입니다.', Toast.SHORT);
            else Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
          } else if (
            data.type === 'DELETE_BOARD_BLIND' ||
            data.type === 'DELETE_POST_BLIND' ||
            data.type === 'DELETE_COMMENT_BLIND'
          ) {
            const itemContent = (
              <View>
                <Text
                  style={[
                    fontRegular,
                    {
                      marginBottom: 15,
                      width: Dimensions.get('window').width - 100,
                    },
                  ]}>
                  {data.deleteBlind?.message}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[fontBold, {width: 88, marginRight: 7}]}>
                    {data.type === 'DELETE_BOARD_BLIND'
                      ? '게시판 이름'
                      : data.type === 'DELETE_POST_BLIND'
                      ? '작성 내용'
                      : data.type === 'DELETE_COMMENT_BLIND'
                      ? '작성 내용'
                      : ''}
                  </Text>
                  <Text
                    ellipsizeMode={'tail'}
                    numberOfLines={3}
                    style={{width: Dimensions.get('window').width - 178}}>
                    {data.deleteBlind?.content}
                  </Text>
                </View>
              </View>
            );
            if (
              (data.type === 'DELETE_BOARD_BLIND' ||
                data.type === 'DELETE_POST_BLIND' ||
                data.type === 'DELETE_COMMENT_BLIND') &&
              data.deleteBlind
            ) {
              setModalBody(itemContent);
              const result = await readNotification(data.id);
              console.log('블라인드 알림 확인');
              setBlindModalVisible(true);
            } else if (data.type === 'DELETE_BOARD_BLIND' && !data.deleteBlind)
              Toast.show('삭제된 게시판입니다.', Toast.SHORT);
            else if (data.type === 'DELETE_POST_BLIND' && !data.deleteBlind)
              Toast.show('삭제된 게시글입니다.', Toast.SHORT);
            else if (data.type === 'DELETE_COMMENT_BLIND' && !data.deleteBlind)
              Toast.show('삭제된 댓글입니다.', Toast.SHORT);
            else Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
          }
        }}>
        {data.type === 'WELCOME' && <CheckMark />}
        {(data.type === 'BEFORE_EXPIRE' ||
          data.type === 'EXPIRE' ||
          data.type === 'NOT_AUTHENTICATED') && <AlertCheckIcon />}
        {(data.type === 'BOARD_BLIND' ||
          data.type === 'PIN_BOARD_BLIND' ||
          data.type === 'POST_BLIND' ||
          data.type === 'COMMENT_BLIND') && <AlertBlindIcon />}
        {(data.type === 'DELETE_BOARD_BLIND' ||
          data.type === 'DELETE_POST_BLIND' ||
          data.type === 'DELETE_COMMENT_BLIND') && <AlertBlindIcon />}
        {data.type === 'COMMENT' && <AlertCommentIcon />}
        {data.type === 'RECOMMENT' && <AlertCommentIcon />}
        {data.type === 'HOT_POST' && <AlertHotPostIcon />}
        <View style={{marginLeft: 16}}>
          <Text style={[{fontSize: 16, marginBottom: 5}, fontMedium]}>
            {data.title}
          </Text>
          <Text
            ellipsizeMode={'tail'}
            numberOfLines={2}
            style={[
              {
                fontSize: 14,
                color: '#878787',
                width: Dimensions.get('window').width - 100,
              },
              fontRegular,
            ]}>
            {data.content
              ? data.content
              : data.blind?.content
              ? data.blind?.content
              : data.deleteBlind?.content}
          </Text>
          <Text style={{color: '#A3A3A3', fontSize: 12, marginTop: 5}}>
            {data.createdAt}
          </Text>
        </View>
      </Pressable>

      {modalBody && blindModalVisible && (
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
          whiteButtonFunc={() => {
            setBlindModalVisible(!blindModalVisible);
          }}
          setDim={false}
        />
      )}
    </>
  );
};

export default AlertItem;
