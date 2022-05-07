import React, {useEffect} from 'react';
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
import {getQuestionList} from '../../common/myPageApi';
import Question from '../../classes/Question';
import Markdown from 'react-native-markdown-display';
type RootStackParamList = {
  Announcement: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;
export function SpreadList({id, title, status, content}: any) {
  const [isSpread, setIsSpread] = useState<boolean>(false);
  return (
    <>
      <TouchableWithoutFeedback key={id} onPress={() => setIsSpread(!isSpread)}>
        <View style={styles.menuContainer}>
          <View style={styles.menu}>
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
                답변 대기
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
              height: Dimensions.get('window').height / 2,
              backgroundColor: '#FBFBFB',
              paddingHorizontal: 24,
              paddingVertical: 16,
            }}>
            <Markdown>{content}</Markdown>
          </ScrollView>
        </>
      )}
    </>
  );
}
function QuestionList({navigation}: Props) {
  const [data, setData] = useState<Question[]>();

  useEffect(() => {
    async function getList() {
      const list = await getQuestionList(0);
      setData(list);
      console.log(list);
    }
    getList();
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: '#E5E5E5'}}>
      {data?.map(item => (
        <SpreadList
          key={item.id}
          id={item.id}
          status={item.status}
          title={item.title}></SpreadList>
      ))}
    </SafeAreaView>
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
});

export default QuestionList;
