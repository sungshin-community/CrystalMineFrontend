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
import {fontBold, fontMedium, fontRegular} from '../../../common/font';
import {
  FoldBlackButton,
  SpreadBlackButton,
} from '../../../../resources/icon/Button';
import {useState} from 'react';
import {getAgreementsWithDate} from '../../../common/myPageApi';
import {AgreementWithDate} from '../../../classes/Agreement';
type RootStackParamList = {
  Announcement: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

function TermsOfService({navigation}: Props) {
  const [isSpreadFirst, setIsSpreadFirst] = useState<boolean>(false);
  const [isSpreadSecond, setIsSpreadSecond] = useState<boolean>(false);
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
    <SafeAreaView style={{backgroundColor: '#E5E5E5'}}>
      <TouchableWithoutFeedback
        onPress={() => setIsSpreadFirst(!isSpreadFirst)}>
        <View style={styles.menuContainer}>
          <View style={styles.menu}>
            <Text style={[fontRegular, styles.menuText]}>
              {data ? data[0].title : ''}
            </Text>
            <View style={styles.menuIcon}>
              {isSpreadFirst ? <FoldBlackButton /> : <SpreadBlackButton />}
            </View>
          </View>
          <Text
            style={[
              fontRegular,
              {color: '#ADB3BC', fontSize: 13, marginTop: 4},
            ]}>
            {data ? data[0]?.agreementDate : ''} 동의
          </Text>
        </View>
      </TouchableWithoutFeedback>
      {isSpreadFirst && (
        <>
          <ScrollView
            style={{
              height: Dimensions.get('window').height / 2,
              backgroundColor: '#FBFBFB',
            }}>
            <Text style={{paddingHorizontal: 24, paddingVertical: 16}}>
              {data ? data[0]?.content : ''}
            </Text>
          </ScrollView>
        </>
      )}
      <TouchableWithoutFeedback
        onPress={() => setIsSpreadSecond(!isSpreadSecond)}>
        <View style={styles.menuContainer}>
          <View style={styles.menu}>
            <Text style={[fontRegular, styles.menuText]}>
              {data ? data[1].title : ''}
            </Text>
            <View style={styles.menuIcon}>
              {isSpreadSecond ? <FoldBlackButton /> : <SpreadBlackButton />}
            </View>
          </View>
          <Text
            style={[
              fontRegular,
              {color: '#ADB3BC', fontSize: 13, marginTop: 4},
            ]}>
            {data ? data[1]?.agreementDate : ''} 동의
          </Text>
        </View>
      </TouchableWithoutFeedback>
      {isSpreadSecond && (
        <>
          <ScrollView
            style={{
              height: Dimensions.get('window').height / 2,
              backgroundColor: '#FBFBFB',
            }}>
            <Text style={{paddingHorizontal: 24, paddingVertical: 16}}>
              {data ? data[1]?.content : ''}
            </Text>
          </ScrollView>
        </>
      )}
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
