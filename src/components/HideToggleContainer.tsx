import React, {useState} from 'react';
import {TouchableOpacity, Text, View, TouchableWithoutFeedback} from 'react-native';
import {BigFoldButton, BigSpreadButton, GreyBigFoldButton, GreyBigSpreadButton} from '../../resources/icon/Button';
import PlusIcon from '../../resources/icon/PlusIcon';

interface Props {
  boardCategory: string;
  component: JSX.Element;
  defaultFolded?: boolean;
}

export function BoardListContainer({boardCategory, component}: Props) {
  const [isSpread, setIsSpread] = useState<boolean>(true);
  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingLeft: 25,
          // paddingVertical: 24,
          height: 60,
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          marginTop: 10,
          borderBottomLeftRadius: !isSpread ? 16 : 0,
          borderBottomRightRadius: !isSpread ? 16 : 0,
        }}
        onPress={() => setIsSpread(!isSpread)}>
        <Text
          style={{
            fontSize: 17,
            fontFamily: 'SpoqaHanSansNeo',
            lineHeight: 20,
            flex: 1,
            fontWeight: 'bold',
            color: '#222222'
          }}>
          {boardCategory}
        </Text>
        {isSpread ? (
          <BigFoldButton style={{marginRight: 30}} />
        ) : (
          <BigSpreadButton style={{marginRight: 30}} />
        )}
      </TouchableOpacity>
      {isSpread && (
        <>
          <View
            style={{
              height: 17,
              backgroundColor: '#F6F6F6',
              // backgroundColor: '#FF0000',
              borderTopRightRadius: 16,
              borderTopLeftRadius: 16,
            }}
          />
          <View style={{flexBasis: 'auto'}}>{component}</View>
          <View
            style={{
              height: 17,
              backgroundColor: '#F6F6F6',
              // backgroundColor: '#FF0000',
              borderBottomRightRadius: 16,
              borderBottomLeftRadius: 16,
            }}
          />
        </>
      )}
    </>
  );
}

export function CustomBoardListContainer({boardCategory, component}: Props) {
  const [isSpread, setIsSpread] = useState<boolean>(true);
  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingLeft: 25,
          // paddingVertical: 24,
          height: 60,
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          marginTop: 10,
          borderBottomLeftRadius: !isSpread ? 16 : 0,
          borderBottomRightRadius: !isSpread ? 16 : 0,
        }}
        onPress={() => setIsSpread(!isSpread)}>
        <Text
          style={{
            fontSize: 17,
            fontFamily: 'SpoqaHanSansNeo',
            lineHeight: 20,
            flex: 1,
            fontWeight: 'bold',
            color: '#222222'
          }}>
          {boardCategory}
        </Text>
        {isSpread ? (
          <BigFoldButton style={{marginRight: 30}} />
        ) : (
          <BigSpreadButton style={{marginRight: 30}} />
        )}
      </TouchableOpacity>
      {isSpread && (
        <>
          <TouchableWithoutFeedback onPress={() => console.log('눌림')}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                height: 44,
                borderRadius: 10,
                borderColor: '#E2E4E8',
                borderWidth: 1,
                marginBottom: 16
              }}>
              <PlusIcon style={{marginLeft: 18, marginRight: 12 }} />
              <Text
                style={{
                  color: '#6E7882',
                  fontSize: 15,
                  fontFamily: 'SpoqaHanSansNeo-Regular',
                }}>
                새 게시판 만들기
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <View
            style={{
              height: 17,
              backgroundColor: '#F6F6F6',
              // backgroundColor: '#FF0000',
              borderTopRightRadius: 16,
              borderTopLeftRadius: 16,
            }}
          />
          <View style={{flexBasis: 'auto'}}>{component}</View>
          <View
            style={{
              height: 17,
              backgroundColor: '#F6F6F6',
              // backgroundColor: '#FF0000',
              borderBottomRightRadius: 16,
              borderBottomLeftRadius: 16,
            }}
          />
        </>
      )}
    </>
  );
}


export function OfficialBoardListContainer({boardCategory, component, defaultFolded}: Props) {
  console.log(boardCategory, "defaultFolded는", defaultFolded);
  const [isSpread, setIsSpread] = useState<boolean>(defaultFolded ? false : true);
  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingLeft: 25,
          // paddingVertical: 24,
          height: 32,
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          marginTop: 10,
          borderBottomLeftRadius: !isSpread ? 16 : 0,
          borderBottomRightRadius: !isSpread ? 16 : 0,
        }}
        onPress={() => setIsSpread(!isSpread)}>
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'SpoqaHanSansNeo-Medium',
            lineHeight: 20,
            flex: 1,
            fontWeight: '500',
            color: '#6E7882'
          }}>
          {boardCategory}
        </Text>
        {isSpread ? (
          <GreyBigFoldButton style={{marginRight: 30}} />
        ) : (
          <GreyBigSpreadButton style={{marginRight: 30}} />
        )}
      </TouchableOpacity>
      {isSpread && (
        <>
          <View
            style={{
              height: 17,
              backgroundColor: '#F6F6F6',
              // backgroundColor: '#FF0000',
              borderTopRightRadius: 16,
              borderTopLeftRadius: 16,
            }}
          />
          <View style={{flexBasis: 'auto'}}>{component}</View>
          <View
            style={{
              height: 17,
              backgroundColor: '#F6F6F6',
              // backgroundColor: '#FF0000',
              borderBottomRightRadius: 16,
              borderBottomLeftRadius: 16,
            }}
          />
        </>
      )}
    </>
  );
}
