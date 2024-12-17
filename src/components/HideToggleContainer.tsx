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
import Board from '../classes/Board';
import {
  getOfficialBoardList,
  getDepartmentBoardList,
  getCustomBoardList,
} from '../common/boardApi';

interface Props {
  boardCategory: string;
  component: JSX.Element;
  defaultFolded?: boolean;
  moveToCreateBoard?: any;
  pinBoard?: Board[];
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

/* 공식 게시판 */
export function BoardListContainer({
  boardCategory,
  component,
  pinBoard,
}: Props) {
  const [isSpread, setIsSpread] = useState<boolean>(true);
  const [allBoards, setAllBoards] = useState<Board[]>([]);
  const [officialBoards, setOfficialBoards] = useState<Board[]>([]);

  useEffect(() => {
    /* const pinnedAllBoards = async () => {
      const boardList = await getCustomBoardList();
      //console.log('getCustomBoardList 전체:', boardList);
      const boardsData = boardList.data.data;

      if (Array.isArray(boardsData)) {
        const boardNames = boardsData.map(
          (board: {name: string}) => board.name,
        );
        console.log('getCustomBoardList전체 게시판 명:', boardNames);
        const boardNamesString = boardNames.join(', ');
        const truncatedBoardNamesString =
          boardNamesString.length > 30
            ? boardNamesString.slice(0, 30) + '...'
            : boardNamesString;
        setAllBoards(truncatedBoardNamesString);
      } else {
        console.log('boardsData가 배열이 아님:', boardsData);
      }
    }; */
    const pinnedOfficialBoards = async () => {
      const boardList = await getOfficialBoardList();
      const boardsData = boardList.data.data;
      console.log('공식 게시판:', boardsData);

      if (Array.isArray(boardsData)) {
        const boardNames = boardsData.map(
          (board: {name: string}) => board.name,
        );
        //console.log('getOfficialBoardList공식 게시판 명:', boardNames);
        const boardNamesString = boardNames.join(', ');
        const truncatedBoardNamesString =
          boardNamesString.length > 30
            ? boardNamesString.slice(0, 30) + '...'
            : boardNamesString;
        setOfficialBoards(truncatedBoardNamesString);
        console.log(officialBoards);
      } else {
        console.log('boardsData가 배열이 아님:', boardsData);
      }
    };
    //pinnedAllBoards();
    pinnedOfficialBoards();
  }, []);

  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingLeft: 15,
          // paddingVertical: 24,
          height: 55,
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          paddingTop: 10,
          paddingBottom: 5,
          borderBottomLeftRadius: !isSpread ? 16 : 0,
          borderBottomRightRadius: !isSpread ? 16 : 0,
        }}
        onPress={() => setIsSpread(!isSpread)}>
        <Text
          style={[
            fontBold,
            {
              fontSize: 16,
              fontFamily: 'SpoqaHanSansNeo-Regular',
              lineHeight: 20,
              flex: 1,
              fontWeight: 'bold',
              color: '#222222',
            },
          ]}>
          {boardCategory}
        </Text>
        {isSpread ? (
          <></>
        ) : (
          <Text
            style={{
              fontSize: 12,
              color: '#6E7882',
              fontFamily: 'SpoqaHanSansNeo-Regular',
              fontWeight: '500',
              marginLeft: 5,
            }}>
            {officialBoards}
          </Text>
        )}
        {isSpread ? (
          <View style={{marginRight: 15}}>
            <BigFoldButton />
          </View>
        ) : (
          <View style={{marginRight: 15}}>
            <BigSpreadButton />
          </View>
        )}
      </TouchableOpacity>
      {isSpread && (
        <>
          {/* <View
            style={{
              height: 17,
              backgroundColor: '#F6F6F6',
              // backgroundColor: '#FF0000',
              borderTopRightRadius: 16,
              borderTopLeftRadius: 16,
            }}
          /> */}
          <View style={{flexBasis: 'auto'}}>{component}</View>
          {/* <View
            style={{
              height: 17,
              backgroundColor: '#F6F6F6',
              // backgroundColor: '#FF0000',
              borderBottomRightRadius: 16,
              borderBottomLeftRadius: 16,
            }}
          /> */}
        </>
      )}
    </>
  );
}

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Markdown from 'react-native-markdown-display';
import {fontBold, fontRegular} from '../common/font';

/* 전체 게시판 */
export function CustomBoardListContainer({
  boardCategory,
  component,
  moveToCreateBoard,
}: Props) {
  const [isSpread, setIsSpread] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [majorBoards, setMajorBoards] = useState<Board[]>([]);

  useEffect(() => {
    const pinnedMajorBoards = async () => {
      const boardList = await getCustomBoardList();
      //console.log('전체 게시판:', boardList.data);
      const boardsData = boardList.data.data;

      if (Array.isArray(boardsData)) {
        const boardNames = boardsData.map(
          (board: {name: string}) => board.name,
        );
        //console.log('getCustomBoardList 게시판 명:', boardNames);
        const boardNamesString = boardNames.join(', ');
        const truncatedBoardNamesString =
          boardNamesString.length > 30
            ? boardNamesString.slice(0, 33) + '...'
            : boardNamesString;

        setMajorBoards(truncatedBoardNamesString);
      } else {
        console.log('boardsData가 배열이 아님:', boardsData);
      }
    };
    pinnedMajorBoards();
  }, []);

  const handleExpand = ({expand}) => {
    setIsExpanded(expand);
  };
  const toggleSpread = () => {
    setIsSpread(prev => !prev);
    if (isSpread) {
      setIsExpanded(false);
    }
  };
  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingLeft: 15,
          // paddingVertical: 24,
          height: 55,
          alignItems: 'center',
          backgroundColor: '#ffffff',
          paddingTop: 10,
          paddingBottom: 5,
          borderBottomLeftRadius: !isSpread ? 16 : 0,
          borderBottomRightRadius: !isSpread ? 16 : 0,
        }}
        onPress={toggleSpread}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'SpoqaHanSansNeo-Regular',
            lineHeight: 20,
            flex: 1,
            fontWeight: 'bold',
            color: '#222222',
          }}>
          {boardCategory}
        </Text>
        {isSpread ? (
          <></>
        ) : (
          <Text
            style={{
              fontSize: 12,
              color: '#6E7882',
              fontFamily: 'SpoqaHanSansNeo-Regular',
              fontWeight: '500',
              marginLeft: 5,
            }}>
            {majorBoards}
          </Text>
        )}
        {isSpread ? (
          <BigFoldButton style={{marginRight: 15}} />
        ) : (
          <BigSpreadButton style={{marginRight: 15}} />
        )}
      </TouchableOpacity>
      {isSpread && (
        <>
          {/* <View
            style={{
              height: 17,
              backgroundColor: '#F6F6F6',
              // backgroundColor: '#FF0000',
              borderTopRightRadius: 16,
              borderTopLeftRadius: 16,
            }}
          /> */}
          <View style={{flexBasis: 'auto'}}>
            {React.cloneElement(component, {
              isExpanded,
              onUpdate: handleExpand,
            })}
          </View>
          {/* <View
            style={{
              height: 17,
              backgroundColor: '#F6F6F6',
              // backgroundColor: '#FF0000',
              borderBottomRightRadius: 16,
              borderBottomLeftRadius: 16,
            }}
          /> */}
        </>
      )}
    </>
  );
}
/* 학과 게시판 */
export function OfficialBoardListContainer({
  boardCategory,
  component,
  defaultFolded,
}: Props) {
  const [isSpread, setIsSpread] = useState<boolean>(
    defaultFolded ? false : true,
  );
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [majorBoards, setMajorBoards] = useState<Board[]>([]);

  useEffect(() => {
    const pinnedMajorBoards = async () => {
      const boardList = await getDepartmentBoardList();
      //console.log('학과 게시판:', boardList);
      const boardsData = boardList.data.data;

      if (Array.isArray(boardsData)) {
        const boardNames = boardsData.map(
          (board: {name: string}) => board.name,
        );
        //console.log('getDepartmentBoardList 게시판 명:', boardNames);
        const boardNamesString = boardNames.join(', ');
        const truncatedBoardNamesString =
          boardNamesString.length > 30
            ? boardNamesString.slice(0, 30) + '...'
            : boardNamesString;
        setMajorBoards(truncatedBoardNamesString);
      } else {
        console.log('boardsData가 배열이 아님:', boardsData);
      }
    };
    pinnedMajorBoards();
  }, []);
  const handleExpand = ({expand}) => {
    setIsExpanded(expand);
  };
  const toggleSpread = () => {
    if (isSpread) {
      setIsExpanded(false);
    }
    setIsSpread(!isSpread);
  };
  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingLeft: 15,
          // paddingVertical: 24,
          height: 55,
          alignItems: 'center',
          backgroundColor: '#ffffff',
          paddingTop: 10,
          paddingBottom: 5,
          borderBottomLeftRadius: !isSpread ? 16 : 0,
          borderBottomRightRadius: !isSpread ? 16 : 0,
        }}
        onPress={() => setIsSpread(!isSpread)}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'SpoqaHanSansNeo-Regular',
            lineHeight: 20,
            flex: 1,
            fontWeight: 'bold',
            color: '#222222',
          }}>
          {boardCategory}
        </Text>
        {isSpread ? (
          <></>
        ) : (
          <Text
            style={{
              fontSize: 12,
              color: '#6E7882',
              fontFamily: 'SpoqaHanSansNeo-Regular',
              fontWeight: '500',
              marginLeft: 5,
            }}>
            {majorBoards}
          </Text>
        )}
        {isSpread ? (
          <GreyBigFoldButton style={{marginRight: 15}} />
        ) : (
          <GreyBigSpreadButton style={{marginRight: 15}} />
        )}
      </TouchableOpacity>
      {isSpread && (
        <>
          {/* <View
            style={{
              height: 17,
              backgroundColor: '#F6F6F6',
              // backgroundColor: '#FF0000',
              borderTopRightRadius: 16,
              borderTopLeftRadius: 16,
            }}
          /> */}
          <View style={{flexBasis: 'auto'}}>
            {React.cloneElement(component, {
              isExpanded,
              onUpdate: handleExpand,
            })}
          </View>
          {/* <View
            style={{
              height: 17,
              backgroundColor: '#F6F6F6',
              // backgroundColor: '#FF0000',
              borderBottomRightRadius: 16,
              borderBottomLeftRadius: 16,
            }}
          /> */}
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
              <Checked style={{marginRight: 16}} />
            ) : (
              <Unchecked style={{marginRight: 16}} />
            )}
          </View>
          <View style={{height: 24, justifyContent: 'center'}}>
            <SmallText
              ellipsizeMode={'tail'}
              numberOfLines={1}
              style={{width: Dimensions.get('window').width - 150}}>
              {title}
            </SmallText>
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
          <View style={{paddingTop: 15, paddingBottom: 15}}>
            {/* <Text style={fontRegular}> */}
            <Markdown>{content}</Markdown>
            {/* </Text> */}
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
              <Checked style={{marginRight: 16}} />
            ) : (
              <Unchecked style={{marginRight: 16}} />
            )}
          </View>
          <View style={{height: 24, justifyContent: 'center'}}>
            <SmallText
              ellipsizeMode={'tail'}
              numberOfLines={1}
              style={{width: 252}}>
              {title}
            </SmallText>
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
          <View style={{paddingTop: 15, paddingBottom: 15}}>
            <Markdown>{content}</Markdown>
          </View>
        </ScrollView>
      )}
    </>
  );
}
