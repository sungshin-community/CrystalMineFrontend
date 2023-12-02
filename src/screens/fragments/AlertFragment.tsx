import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from 'react-native';

import {useIsFocused} from '@react-navigation/native';
import {getAlerts} from '../../common/alertApi';
import {Alert} from '../../classes/AlertDto';
import AlertItem from '../../components/AlertItem';
import WaterMark from '../../components/WaterMark';

const AlertFragment = () => {
  const [alerts, setAlerts] = useState<Alert[]>();
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const [blindModalVisible, setBlindModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      const result = await getAlerts();
      if (result) setAlerts(result);
      setIsLoading(false);
    };
    if (isFocused) init();
  }, [isFocused, blindModalVisible]);

  const handleRefresh = async () => {
    const result = await getAlerts();
    setAlerts(result);
  };

  return (
    <>
      <WaterMark />
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
    </>
  );
};

export default AlertFragment;
