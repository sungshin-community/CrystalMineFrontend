import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Pressable,
  FlatList,
  RefreshControl,
} from 'react-native';
import NoCommentSuryong from '../../../resources/icon/custom/NoCommentSuryong';
import NewsExclamationMarkIcon from '../../../resources/icon/NewsExclamationMarkIcon';
import {fontBold, fontMedium, fontRegular} from '../../common/font';
import {PlatformOS} from '../../components/PlatformOS';
import {useIsFocused} from '@react-navigation/native';
import Svg, {SvgProps, Circle, Path} from 'react-native-svg';
import {useEffect} from 'react';
import {getAlerts} from '../../common/alertApi';
import {useState} from 'react';
import AlertDto, {Alert} from '../../classes/AlertDto';
import {ModalBottom} from '../../components/ModalBottom';

const AlertFragment = () => {
  const [alerts, setAlerts] = useState<Alert[]>();
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const isFocused = useIsFocused();
  const [blindModalVisible, setBlindModalVisible] = useState<boolean>(false);
  const [noticeModalVisible, setNoticeModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      const result = await getAlerts();
      if (result) setAlerts(result);
      setIsLoading(false);
    };
    if (isFocused) init();
  }, [isFocused, blindModalVisible, noticeModalVisible]);

  const handleRefresh = async () => {
    const result = await getAlerts();
    setCurrentPage(0);
    setAlerts(result);
  };

  const fetchNextPage = async () => {
    setIsNextPageLoading(true);
    let thisPagePostList: Alert[] = await getAlerts(currentPage + 1);
    setAlerts(alerts.concat(thisPagePostList));
    if (thisPagePostList.length > 0) {
      setCurrentPage(currentPage + 1);
    }
    setIsNextPageLoading(false);
  };

  const noticeBody = (
    <View>
      <View style={{alignItems: 'center', marginBottom: 25}}>
        <NoCommentSuryong />
      </View>
      <View>
        <Text>
          {`게시글과 댓글에 관련한 알림은 아직 개발 중입니다.\n추후 기능 개발 후 사용하실 수 있습니다.`}
        </Text>
      </View>
    </View>
  );
  return (
    <>
      {blindModalVisible ? (
        <View
          style={{
            position: 'absolute',
            flex: 1,
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 100,
            elevation: 1,
          }}
        />
      ) : null}
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}>
        <ActivityIndicator
          size="large"
          color={'#A055FF'}
          animating={isLoading}
          style={{zIndex: 100}}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 24,
          paddingVertical: 16,
          backgroundColor: '#F5F5F5',
        }}>
        <AlertWorkIcon />
        <Pressable
          style={{marginLeft: 16}}
          onPress={() => setNoticeModalVisible(true)}>
          <Text style={[{fontSize: 16, marginBottom: 5}, fontMedium]}>
            게시글 알림 기능은{' '}
            <Text style={{color: '#A055FF'}}>아직 개발 중</Text>이에요!
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
            게시글과 댓글에 관련한 알림은 아직 개발 중입니다.
          </Text>
        </Pressable>
      </View>

      {alerts?.length === 0 ? (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#6E7882',
                fontSize: 15,
                fontFamily: 'SpoqaHanSansNeo-Regular',
                textAlign: 'center',
                lineHeight: 22.5,
                marginTop: 20,
              }}></Text>
          </View>
        </SafeAreaView>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{flex: 1, backgroundColor: '#FFFFFF'}}
          data={alerts}
          renderItem={({item}) => (
            <AlertItem
              data={item}
              blindModalVisible={blindModalVisible}
              setBlindModalVisible={setBlindModalVisible}
            />
          )}
          ItemSeparatorComponent={() => (
            <View style={{height: 1, backgroundColor: '#F6F6F6'}}></View>
          )}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={['#A055FF']} // for android
              tintColor={'#A055FF'} // for ios
            />
          }
          // onEndReached={fetchNextPage}
          // onEndReachedThreshold={0.8}
        />
      )}
      {noticeBody && noticeModalVisible && (
        <ModalBottom
          modalVisible={noticeModalVisible}
          setModalVisible={setNoticeModalVisible}
          title="게시글 알림 개발 지연 안내"
          content={noticeBody}
          isContentCenter={false}
          purpleButtonText="확인"
          purpleButtonFunc={() => {
            setNoticeModalVisible(!noticeModalVisible);
          }}
        />
      )}
    </>
  );
};

export default AlertFragment;

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  AlertCheckIcon,
  AlertWorkIcon,
} from '../../../resources/icon/AlertItemIcon';
import CheckMark from '../../../resources/icon/CheckMark';
import {useNavigation} from '@react-navigation/native';
import AlertBlindIcon from '../../../resources/icon/AlertBlindIcon';
import AlertCommentIcon from '../../../resources/icon/AlertCommentIcon';
import AlertHotPostIcon from '../../../resources/icon/AlertHotPostIcon';
import {readNotification} from '../../common/homeApi';
import Toast from 'react-native-simple-toast';

interface AlertProps {
  data: Alert;
  blindModalVisible: boolean;
  setBlindModalVisible: any;
}

// type RootStackParamList = {
//   MyPage: undefined;
//   CertifiedMember: undefined;
//   ExpiredMember: undefined;
//   UncertifiedMember: undefined;
// };
// type Props = NativeStackScreenProps<RootStackParamList>;

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
