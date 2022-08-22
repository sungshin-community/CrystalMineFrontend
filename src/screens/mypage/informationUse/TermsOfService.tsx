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
  TouchableWithoutFeedback
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {fontBold, fontMedium, fontRegular} from '../../../common/font';
import {
  FoldBlackButton,
  SpreadBlackButton,
} from '../../../../resources/icon/Button';
import {useState} from 'react';
import {getAgreementsWithDate} from '../../../common/myPageApi';
import { AgreementWithDate } from '../../../classes/Agreement';
import Markdown from 'react-native-markdown-display';
type RootStackParamList = {
  Announcement: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;
export function SpreadList({ id, title, agreementDate, content}: any) {
  const [isSpread, setIsSpread] = useState<boolean>(false);
  return (
    <>
      <Pressable
        key={id}
        onPress={() => setIsSpread(!isSpread)}
        hitSlop={20}>
        <View style={styles.menuContainer}>
          <View style={styles.menu}>
            <Text style={[fontMedium, styles.menuText]}>
              {title}
            </Text>
            <View style={styles.menuIcon}>
              {isSpread ? <FoldBlackButton /> : <SpreadBlackButton />}
            </View>
          </View>
          <Text
            style={[
              fontRegular,
              {color: '#ADB3BC', fontSize: 13, marginTop: 4},
            ]}>
            {agreementDate} 동의
          </Text>
        </View>
      </Pressable>
      {isSpread && (
        <>
          <ScrollView
            style={{
              height: Dimensions.get('window').height / 2,
              backgroundColor: '#FBFBFB',paddingHorizontal: 24,
            }}>
            <View style={{ paddingTop: 15, paddingBottom: 15}}>
              <Markdown>
              {content}
              </Markdown>
            </View>
          </ScrollView>
        </>
      )}
      </>
   )
}
function TermsOfService({navigation}: Props) {
  const [data, setData] = useState<AgreementWithDate[]>();

  useEffect(() => {
    async function getList() {
      const list = await getAgreementsWithDate();
      setData(list);
      console.log(list);
    }
    getList();
  }, []);


  return (
    <SafeAreaView style={{ backgroundColor: '#E5E5E5' }}>
      {data?.map((item, index) => (<SpreadList key={index} id={index} title={item.title} agreementDate={item.agreementDate} content={item.content}  ></SpreadList>))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    paddingVertical: 16,
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
});

export default TermsOfService;
