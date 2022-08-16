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
import AlertItem from '../../components/AlertItem';
import { AlertWorkIcon } from '../../../resources/icon/AlertItemIcon';

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



// type RootStackParamList = {
//   MyPage: undefined;
//   CertifiedMember: undefined;
//   ExpiredMember: undefined;
//   UncertifiedMember: undefined;
// };
// type Props = NativeStackScreenProps<RootStackParamList>;

