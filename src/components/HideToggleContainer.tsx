import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  Pressable,
} from 'react-native';
import {
  FoldButton,
  SpreadButton,
  BigFoldButton,
  BigSpreadButton,
  GreyBigFoldButton,
  GreyBigSpreadButton,
} from '../../resources/icon/Button';
import {Checked, Unchecked} from '../../resources/icon/CheckBox';
import PlusIcon from '../../resources/icon/PlusIcon';
import {SmallText} from '../components/Top';

interface Props {
  boardCategory: string;
  component: JSX.Element;
  defaultFolded?: boolean;
  moveToCreateBoard?: any;
}
interface AgreementProps {
  id: number;
  checked: boolean;
  title: string;
  content: string | string[];
  onChange: (key: number) => void;
}

interface DirectionProps {
  id: number;
  checked: boolean;
  title: string;
  content: string[];
  onChange: (key: number) => void;
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
          style={[
            fontBold, {
            fontSize: 17,
            fontFamily: 'SpoqaHanSansNeo-Regular',
            lineHeight: 20,
            flex: 1,
            fontWeight: 'bold',
            color: '#222222',
          }]}>
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

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Markdown from 'react-native-markdown-display';
import { fontBold, fontRegular } from '../common/font';
export function CustomBoardListContainer({
  boardCategory,
  component,
  moveToCreateBoard,
}: Props) {
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
            fontFamily: 'SpoqaHanSansNeo-Regular',
            lineHeight: 20,
            flex: 1,
            fontWeight: 'bold',
            color: '#222222',
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
          <TouchableHighlight
            underlayColor='#EEEEEE'
            onPress={() => moveToCreateBoard()}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              height: 44,
              borderRadius: 10,
              borderColor: '#E2E4E8',
              borderWidth: 1,
              marginBottom: 16,
            }}>
            <>
              <PlusIcon style={{marginLeft: 18, marginRight: 12}} />
              <Text
                style={{
                  color: '#6E7882',
                  fontSize: 15,
                  fontFamily: 'SpoqaHanSansNeo-Regular',
                }}>
                새 게시판 만들기
              </Text>
            </>
          </TouchableHighlight>
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

export function OfficialBoardListContainer({
  boardCategory,
  component,
  defaultFolded,
}: Props) {
  const [isSpread, setIsSpread] = useState<boolean>(
    defaultFolded ? false : true,
  );
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
            color: '#6E7882',
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

export function AgreementContainer({
  id,
  checked,
  title,
  content,
  onChange,
}: AgreementProps) {
  const [isSpread, setIsSpread] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <>
      <View
        style={{
          marginTop: 14,
          marginBottom: 5,
          marginLeft: 25,
          marginRight: 40,
          flexDirection: 'row',
          alignItems: 'center',
          height: 24,
      }}>
        <TouchableOpacity 
          style={{flexDirection: 'row'}}
          onPress={(e: any) => {
            onChange(id);
            setIsChecked(!isChecked);
        }}>
          <View
            style={{
              height: 24,
              alignItems: 'center',
              flexDirection: 'row',
              paddingLeft: 13,
          }}>
            {isChecked ? (
              <Checked
                style={{marginRight: 16}}
              />
            ) : (
              <Unchecked
                style={{marginRight: 16}}
              />
            )}
          </View>
          <View style={{height: 24, justifyContent: 'center'}}>
            <SmallText ellipsizeMode={'tail'} numberOfLines={1} style={{width: Dimensions.get('window').width - 150}} >{title}</SmallText>
          </View>
        </TouchableOpacity>
        <Pressable
          hitSlop={30}
          onPress={() => setIsSpread(!isSpread)}
          style={{
            flex: 1,
            flexDirection: 'row-reverse',
            alignItems: 'center',
            height: 24,
            width: 40,
            marginLeft: 5,
          }}>
          {isSpread ? <FoldButton /> : <SpreadButton />}
        </Pressable>
      </View>
      {isSpread && (
        <ScrollView
          style={{
            maxHeight: Dimensions.get('window').height / 5,
            height: 'auto',
            marginLeft: 40,
            marginRight: 40,
            backgroundColor: '#F6F6F6',
            paddingHorizontal: 24,
          }}
          nestedScrollEnabled={true}>
          <View style={{ paddingTop: 15, paddingBottom: 15 }}>
            <Text style={fontRegular}>
            <Markdown>
              {content}
              </Markdown>
            </Text>
          </View>
        </ScrollView>
      )}
    </>
  );
}

export function DirectionContainer({
  id,
  checked,
  title,
  content,
  onChange,
}: DirectionProps) {
  const [isSpread, setIsSpread] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(checked);
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);
  return (
    <>
      <View
        style={{
          marginTop: 14,
          marginBottom: 5,
          marginLeft: 25,
          marginRight: 40,
          flexDirection: 'row',
          alignItems: 'center',
          height: 24,
      }}>
        <TouchableOpacity 
          style={{flexDirection: 'row'}}
          onPress={(e: any) => {
            onChange(id);
            setIsChecked(!isChecked);
        }}>
          <View
            style={{
              height: 24,
              alignItems: 'center',
              flexDirection: 'row',
              paddingLeft: 13,
          }}>
            {isChecked ? (
              <Checked
                style={{marginRight: 16}}
              />
            ) : (
              <Unchecked
                style={{marginRight: 16}}
              />
            )}
          </View>
          <View style={{height: 24, justifyContent: 'center'}}>
            <SmallText ellipsizeMode={'tail'} numberOfLines={1} style={{width: 252}} >{title}</SmallText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsSpread(!isSpread)}
          style={{
            flex: 1,
            flexDirection: 'row-reverse',
            alignItems: 'center',
            height: 24,
            width: 40,
            marginLeft: 5,
          }}>
          {isSpread ? <FoldButton /> : <SpreadButton />}
        </TouchableOpacity>
      </View>
      {isSpread && (
        <ScrollView
          style={{
            maxHeight: Dimensions.get('window').height / 5,
            height: 'auto',
            marginLeft: 40,
            marginRight: 40,
            backgroundColor: '#F6F6F6',
            paddingHorizontal: 24,
          }}
          nestedScrollEnabled={true}>
          <View style={{ paddingTop: 15, paddingBottom: 15}}>
            <Markdown>
              {content}
            </Markdown>
          </View>
        </ScrollView>
      )}
    </>
  );
}
