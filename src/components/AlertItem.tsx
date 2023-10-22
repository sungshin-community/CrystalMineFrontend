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
import {Alert} from '../classes/AlertDto';
import React, {useState} from 'react';
import {
  Dimensions,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {fontBold, fontMedium, fontRegular} from '../common/font';
import {ModalBottom} from './ModalBottom';
import AlertNoticeIcon from '../../resources/icon/AlertNoticeIcon';

interface AlertProps {
  data: Alert;
  blindModalVisible: boolean;
  setBlindModalVisible: any;
}

const AlertItem = ({
  data,
  blindModalVisible,
  setBlindModalVisible,
}: AlertProps) => {
  const [modalBody, setModalBody] = useState<JSX.Element>();
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingHorizontal: 24,
          paddingVertical: 16,
          backgroundColor: data.isRead ? '#FFFFFF' : '#F6F2FF',
        }}
        onPress={async () => {
          // 정회원 관련 알림은 읽음 처리 안 해야 함
          if (
            data.type !== 'BEFORE_EXPIRE' &&
            data.type !== 'EXPIRE' &&
            data.type !== 'NOT_AUTHENTICATED'
          ) {
            await readNotification(data.id);
          }
          if (data.type === 'WELCOME') {
            navigation.navigate('MyPage');
          } else if (data.type === 'NOTICE') {
            navigation.navigate('Notice', {noticeId: data.postId});
          } else if (data.type === 'STUDENT_COUNCIL') {
            navigation.navigate('PostScreen', {postId: data.postId});
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
                  <Text style={[fontRegular, {width: 143}]}>
                    {data.blind?.reason}
                  </Text>
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
                    style={[
                      fontRegular,
                      {
                        width: Dimensions.get('window').width - 183,
                      },
                    ]}>
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
              setBlindModalVisible(true);
            } else if (data.type === 'BOARD_BLIND' && !data.blind)
              setTimeout(function () {
                Toast.show('삭제된 게시판입니다.', Toast.SHORT);
              }, 100);
            else if (data.type === 'PIN_BOARD_BLIND' && !data.blind)
              setTimeout(function () {
                Toast.show('삭제된 게시판입니다.', Toast.SHORT);
              }, 100);
            else if (data.type === 'POST_BLIND' && !data.blind)
              setTimeout(function () {
                Toast.show('삭제된 게시글입니다.', Toast.SHORT);
              }, 100);
            else if (data.type === 'COMMENT_BLIND' && !data.blind)
              setTimeout(function () {
                Toast.show('삭제된 댓글입니다.', Toast.SHORT);
              }, 100);
            else
              setTimeout(function () {
                Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
              }, 100);
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
                    style={[
                      fontRegular,
                      {width: Dimensions.get('window').width - 178},
                    ]}>
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
              setBlindModalVisible(true);
            } else if (data.type === 'DELETE_BOARD_BLIND' && !data.deleteBlind)
              setTimeout(function () {
                Toast.show('삭제된 게시판입니다.', Toast.SHORT);
              }, 100);
            else if (data.type === 'DELETE_POST_BLIND' && !data.deleteBlind)
              setTimeout(function () {
                Toast.show('삭제된 게시글입니다.', Toast.SHORT);
              }, 100);
            else if (data.type === 'DELETE_COMMENT_BLIND' && !data.deleteBlind)
              setTimeout(function () {
                Toast.show('삭제된 댓글입니다.', Toast.SHORT);
              }, 100);
            else
              setTimeout(function () {
                Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
              }, 100);
          } else if (
            data.type === 'HOT_POST' ||
            data.type === 'COMMENT' ||
            data.type === 'RECOMMENT'
          ) {
            navigation.navigate('PostScreen', {postId: data.postId});
          }
        }}>
        {data.type === 'WELCOME' && <CheckMark />}
        {(data.type === 'NOTICE' || data.type === 'STUDENT_COUNCIL') && (
          <AlertNoticeIcon />
        )}
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
          <Text
            ellipsizeMode={'tail'}
            numberOfLines={1}
            style={[
              {
                fontSize: 16,
                marginBottom: 5,
                width: Dimensions.get('window').width - 100,
              },
              fontMedium,
            ]}>
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
          <Text
            style={[
              fontRegular,
              {color: '#A3A3A3', fontSize: 12, marginTop: 5},
            ]}>
            {data.createdAt}
          </Text>
        </View>
      </TouchableOpacity>

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
