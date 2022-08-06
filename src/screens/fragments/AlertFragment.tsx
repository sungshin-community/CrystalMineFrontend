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

const AlertFragment = () => {
  const [alerts, setAlerts] = useState<Alert[]>();
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      const result = await getAlerts(0);
      if (result) setAlerts(result);
      setIsLoading(false);
    };
    if (isFocused) init();
  }, [isFocused]);

  const handleRefresh = async () => {
    const result = await getAlerts(0);
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

  return (
    <>
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
        <View style={{marginLeft: 16}}>
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
        </View>
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
              }}>
            </Text>
          </View>
        </SafeAreaView>
      ) : (
        <FlatList
          style={{flex: 1, backgroundColor: '#FFFFFF'}}
          data={alerts}
          renderItem={({item}) => <AlertItem data={item} />}
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
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.8}
        />
      )}
    </>
  );
};

export default AlertFragment;

import {NativeStackScreenProps} from '@react-navigation/native-stack';

interface AlertProps {
  data: Alert;
}
type RootStackParamList = {
  PostListScreen: {boardId: number};
  MyPage: undefined;
  PostScreen: {postId: number};
  RegularMemberAuthMyPage: undefined;
  TermsOfService: undefined;
  Board: undefined;
  InformationUse: undefined;
  DirectionAgreeScreen: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

const AlertItem = ({data}: AlertProps, {navigation}: Props) => {
  const [blindModalVisible, setBlindModalVisible] = useState<boolean>(false);
  const [modalBody, setModalBody] = useState<JSX.Element>();
  return (
    <>
      <Pressable
        style={{
          flexDirection: 'row',
          paddingHorizontal: 24,
          paddingVertical: 16,
          backgroundColor: data.isRead ? '#F6F2FF' : '#fff',
        }}
        onPress={() => {
          async () => {
            if (data.type === 'WELCOME') {
              // const result = await readNotification(data.id);
              console.log('알람 확인 후 마이페이지로 이동');
              navigation.navigate('MyPage');
            } else if (
              data.type === 'BEFORE_EXPIRE' ||
              data.type === 'EXPIRE' ||
              data.type === 'NOT_AUTHENTICATED'
            ) {
              // const result = await readNotification(item.id);
              console.log('알람 확인 후 정회원인증으로 이동');
              navigation.navigate('RegularMemberAuthMyPage');
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
                    <Text style={[fontBold, {width: 88, marginRight: 7}]}>
                      블라인드 사유
                    </Text>
                    <Text style={{width: 148}}>{data.blind?.reason}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={[fontBold, {width: 88, marginRight: 7}]}>
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
                        width: Dimensions.get('window').width - 178,
                      }}>
                      {data.blind?.content}
                    </Text>
                  </View>
                </View>
              );
              setModalBody(itemContent);
              // const result = await readNotification(item.id);
              console.log('블라인드 알림 확인');
              setBlindModalVisible(true);
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
              setModalBody(itemContent);
              // const result = await readNotification(item.id);
              console.log('블라인드 알림 확인');
              setBlindModalVisible(true);
            }
          };
        }}>
        <AlertCheckIcon />
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
          whiteButtonFunc={() => {
            setBlindModalVisible(!blindModalVisible);
          }}
        />
      )}
    </>
  );
};

import Svg, {SvgProps, Circle, Path} from 'react-native-svg';
import {useEffect} from 'react';
import {getAlerts} from '../../common/alertApi';
import {useState} from 'react';
import AlertDto, {Alert} from '../../classes/AlertDto';
import {ModalBottom} from '../../components/ModalBottom';

export const AlertWorkIcon = (props: SvgProps) => (
  <Svg
    width={36}
    height={36}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Circle cx={18} cy={18} r={18} fill="#878787" />
    <Path
      d="m27.808 24.417-8.341-8.342c.825-2.108.366-4.583-1.375-6.325-1.834-1.833-4.584-2.2-6.784-1.192L15.25 12.5l-2.75 2.75-4.033-3.942c-1.1 2.2-.642 4.95 1.191 6.784 1.742 1.741 4.217 2.2 6.325 1.375l8.342 8.341a.886.886 0 0 0 1.283 0l2.109-2.108c.458-.367.458-1.008.091-1.283Z"
      fill="#fff"
    />
  </Svg>
);

const AlertCheckIcon = (props: SvgProps) => (
  <Svg
    width={36}
    height={36}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Circle cx={18} cy={18} r={18} fill="#FFA767" />
    <Path
      d="M9 18.84 14.4 25 27 11"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
