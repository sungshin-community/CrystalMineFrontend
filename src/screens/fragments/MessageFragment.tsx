import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useIsFocused} from '@react-navigation/native';
import * as StompJs from '@stomp/stompjs';
import Toast from 'react-native-simple-toast';
import MessageItem from '../../components/MessageItem';
import {getChatRoom, getSocketToken} from '../../common/messageApi';
import {getAuthentication} from '../../common/homeApi';
import {MessageRoom} from '../../classes/MessageDto';
import {fontBold, fontMedium, fontRegular} from '../../common/font';
import {logout} from '../../common/authApi';
import AdMob from '../../components/AdMob';
import FixChat from '../../../resources/icon/FixChat';
type RootStackParamList = {
  MessageScreen: {roomId: number};
  SplashHome: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

const MessageFragment = ({navigation}: Props) => {
  const isFocused = useIsFocused();
  const messageClient = useRef<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [messageList, setMessageList] = useState<MessageRoom[]>([]);
  const [activeTab, setActiveTab] = useState<'my' | 'all'>('my');
  const [accountId, setAccountId] = useState<number | null>(null);
  const [inputText, setInputText] = useState('');
  useEffect(() => {
    async function init() {
      try {
        const authResponse = await getAuthentication();
        if (authResponse.status === 401) {
          Toast.show(
            '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
            Toast.SHORT,
          );
          logout();
          navigation.reset({routes: [{name: 'SplashHome'}]});
          return;
        } else if (authResponse.status === 200) {
          setAccountId(authResponse.data.data.id);
        } else {
          console.error('Failed to get authentication');
          return;
        }

        const socketResponse = await getSocketToken();
        if (socketResponse.status === 'OK') {
          const socketToken = socketResponse.data.socketToken;

          console.log('Connecting to WebSocket...');
          let wsUrl = encodeURI(
            'ws://15.165.252.35:8787/ws?roomId=0&accessToken=Bearer ' +
              socketToken,
          );

          messageClient.current = new StompJs.Client({
            brokerURL: wsUrl,
            debug: str => console.log('STOMP: ' + str),
            onConnect: () => {
              console.log('WebSocket connected successfully');
              subscribe();
            },
            onStompError: frame => {
              console.log('Broker reported error: ' + frame.headers['message']);
              console.log('Additional details: ' + frame.body);
            },
          });

          messageClient.current.activate();
        } else {
          console.error('Failed to get socket token');
        }

        const messageData = await getChatRoom(0, 'createdAt');
        if (messageData.status === 'OK') {
          setMessageList(messageData.data.content);
        } else {
          console.error('Failed to fetch chat rooms');
        }
      } catch (error) {
        console.error('Error during initialization:', error);
      } finally {
        setLoading(false);
      }
    }

    if (isFocused) {
      init();
    }

    return () => {

      if (messageClient.current && messageClient.current.active) {
        messageClient.current.deactivate();
      }

    };
  }, [isFocused, navigation]);

  const subscribe = () => {
    if (accountId === null) {
      console.error('Account ID is not available');
      return;
    }

    try {
      messageClient.current.subscribe(`/sub/list/${accountId}`, (body: any) => {
        updateList(JSON.parse(body.body));
      });
    } catch (error) {
      console.error('Error in subscribe:', error);
    }
  };

  const updateList = (data: MessageRoom) => {
    setMessageList(prevList => {
      const updatedList = prevList.map(item =>
        item.roomId === data.roomId ? data : item,
      );
      if (!updatedList.some(item => item.roomId === data.roomId)) {
        updatedList.unshift(data);
      }
      return updatedList;
    });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'my' && styles.activeTab]}
        onPress={() => setActiveTab('my')}>
        <Text
          style={[styles.tabText, activeTab === 'my' && styles.activeTabText]}>
          나의 대화
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'all' && styles.activeTab]}
        onPress={() => setActiveTab('all')}>
        <Text
          style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
          모든 대화
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator size="large" color="#A055FF" style={styles.loader} />
      );
    }

    if (activeTab === 'my') {
      return (
        <FlatList
          data={messageList}
          renderItem={({item}) => (
            <MessageItem
              message={item}
              edit={false}
              navigation={navigation}
              isCheckedAll={false}
              onPressCheck={() => {}}
            />
          )}
          keyExtractor={item => item.roomId.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      );
    }

    return (
      <View style={styles.developingContainer}>
        <FixChat />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <AdMob />
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#A055FF',
  },
  tabText: {
    ...fontMedium,
    fontSize: 16,
    color: '#6E7882',
  },
  activeTabText: {
    ...fontBold,
    color: '#000000',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#F6F6F6',
  },
  developingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  developingText: {
    ...fontRegular,
    fontSize: 16,
    color: '#6E7882',
  },
});

export default MessageFragment;
