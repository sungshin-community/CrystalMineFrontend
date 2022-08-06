import React from 'react';
import {SafeAreaView, Text, View, ScrollView, Dimensions} from 'react-native';
import NoCommentSuryong from '../../../resources/icon/custom/NoCommentSuryong';
import NewsExclamationMarkIcon from '../../../resources/icon/NewsExclamationMarkIcon';
import {fontMedium, fontRegular} from '../../common/font';
import {PlatformOS} from '../../components/PlatformOS';

const AlertFragment = () => {
  const [alerts, setAlerts] = useState<Alert[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true)
      const result = await getAlerts(0);
      if (result) setAlerts(result);
      setIsLoading(false)
    }
    init();
  },[])
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
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
      
      {alerts?.length === 0 ?
       <SafeAreaView style={{flex: 1}}>
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
                {isLoading
                  ? ''
                  : ''}
              </Text>
            </View>
        </SafeAreaView> :
      alerts?.map((item) => {
        <AlertItem data={item} />
      })
        }
    </ScrollView>
  );
};

export default AlertFragment;

interface Props {
  data: Alert;
}
const AlertItem = ({ data }: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: data.isRead ? '#F6F2FF' : '#fff',
      }}>
      <NewsExclamationMarkIcon />
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
          {data.content}
        </Text>
        <Text style={{color: '#A3A3A3', fontSize: 12, marginTop: 5}}>
          {data.createdAt}
        </Text>
      </View>
    </View>
  );
};

import Svg, {SvgProps, Circle, Path} from 'react-native-svg';
import { useEffect } from 'react';
import { getAlerts } from '../../common/alertApi';
import { useState } from 'react';
import AlertDto, { Alert } from '../../classes/AlertDto';

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
