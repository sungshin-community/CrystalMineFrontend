import React, {useEffect} from 'react';
import Svg, {Path} from 'react-native-svg';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {fontBold, fontMedium, fontRegular} from '../../common/font';
import {
  FoldBlackButton,
  SpreadBlackButton,
} from '../../../resources/icon/Button';
import {useState} from 'react';
import {getQuestionList, getQuestion} from '../../common/myPageApi';
import QuestionListDto, {QuestionDto} from '../../classes/mypage/Question';
import Markdown from 'react-native-markdown-display';
import FloatingWriteButton from '../../components/FloatingWriteButton';
import {useIsFocused} from '@react-navigation/native';
import {
  RectangleChecked,
  RectangleUnchecked,
} from '../../../resources/icon/CheckBox';
type RootStackParamList = {
  QuestionWriteScreen: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

export function SpreadList({id, title, status, removeState}: any) {
  const [isSpread, setIsSpread] = useState<boolean>(false);
  const [data, setData] = useState<QuestionDto>();

  const getQuestionFunc = async (id: number) => {
    const result: QuestionDto = await getQuestion(id);
    setData(result);
  };

  return (
    <>
      <TouchableWithoutFeedback
        key={id}
        onPress={() => {
          setIsSpread(!isSpread);
          getQuestionFunc(id);
        }}>
        <View style={styles.menuContainer}>
          <View style={styles.menu}>
            {removeState && <RectangleUnchecked style={{marginRight: 12}} />}
            <View
              style={[
                styles.status,
                {backgroundColor: status ? '#F1E7FF' : '#F6F6F6'},
              ]}>
              <Text
                style={{
                  color: status ? '#A055FF' : '#6E7882',
                  fontSize: 13,
                  textAlign: 'center',
                }}>
                {status ? '답변 완료' : '답변 대기'}
              </Text>
            </View>
            <Text style={[fontMedium, styles.menuText]}>{title}</Text>
            <View style={styles.menuIcon}>
              {isSpread ? <FoldBlackButton /> : <SpreadBlackButton />}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {isSpread && (
        <>
          <ScrollView
            style={{
              height: 'auto',
              backgroundColor: '#FBFBFB',
              paddingHorizontal: 24,
              paddingVertical: 16,
            }}>
            <Text style={[fontBold, {fontSize: 15}]}>{data?.title}</Text>

            <Markdown>{data?.content}</Markdown>
            <Text style={styles.date}>{data?.createdAt}</Text>
            {data?.answer && (
              <>
                <View
                  style={{
                    borderBottomColor: '#F6F6F6',
                    borderBottomWidth: 1,
                    marginVertical: 16,
                  }}
                />
                <View style={{flexDirection: 'row'}}>
                  <Arrow />
                  <Text style={[fontMedium, {fontSize: 15, marginLeft: 12}]}>
                    운영진
                  </Text>
                </View>
                <Text style={{marginTop: 8, marginLeft: 30, marginBottom: 10}}>
                  {data?.answer.content}
                </Text>
                <Text style={[styles.date, {marginLeft: 30}]}>
                  {data?.answer.createdAt}
                </Text>
              </>
            )}
          </ScrollView>
        </>
      )}
    </>
  );
}
function QuestionList({navigation, route}: Props) {
  const [data, setData] = useState<QuestionListDto[]>();
  const isFocused = useIsFocused();
  const [letRemove, setLetRemove] = useState(false);

  useEffect(() => {
    async function getList() {
      const list = await getQuestionList(0);
      setData(list);
    }
    if (isFocused) {
      getList();
    }
  }, [isFocused]);

  return (
    <>
      <ScrollView style={{backgroundColor: '#E5E5E5'}}>
        {letRemove && (
          <View style={{backgroundColor: '#fff', paddingLeft: 24}}>
            <RectangleUnchecked />
          </View>
        )}
        {data?.map(item => (
          <SpreadList
            key={item.id}
            id={item.id}
            status={item.status}
            title={item.title}
            removeState={letRemove}></SpreadList>
        ))}
      </ScrollView>

      <FloatingWriteButton
        onPress={() => navigation.navigate('QuestionWriteScreen')}
      />
    </>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    paddingVertical: 15,
    backgroundColor: 'white',
    paddingHorizontal: 24,
  },
  menuIcon: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  menu: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  menuText: {
    fontSize: 15,
    color: '#222222',
  },
  status: {
    width: 67,
    height: 24,
    borderRadius: 20,
    justifyContent: 'center',
    marginRight: 12,
  },
  date: {
    fontSize: 13,
    color: '#ADB3BC',
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default QuestionList;

const Arrow = (props: any) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M14.25 11.25L9.75 15.75L8.685 14.685L11.3775 12H3V3H4.5V10.5H11.3775L8.685 7.815L9.75 6.75L14.25 11.25Z"
      fill="black"
    />
  </Svg>
);
