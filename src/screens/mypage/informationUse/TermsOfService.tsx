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

//Test
const string = `안녕하세요.  
수정광산 서비스를 이용해 주셔서 감사합니다.

수정광산은 성신여대 학우들만의 전용 소통 공간을 제공함에 있어, 서비스와 이용자 간의 권리와 의무 및 책임사항 등을 아래와 같이 규정하오니 수정광산을 이용하기 전 아래 준비한 약관을 읽어주시면 감사하겠습니다. 

**01 이용자 라이선스**
본 약관에 동의 시 수정광산과 이용자 간에 법적 계약이 체결되어 이용자에게 소프트웨어 최종 이용자 라이선스를 부여합니다. 
해당 라이선스는 수정광산 소프트웨어 이용을 허가하는 비독점, 비양도성, 무상의 라이선스입니다. 

**02 계정**
수정광산은 성신여자대학교 재학생과 졸업생들을
위한 학우 전용 커뮤니티로써,  학교에서 제공되는
G-mail 계정을 기반으로 수정광산 계정을 생성하실 수 있습니다.

학교에서 제공되는 G-mail 생성 방법은 아래 참조를 참고하여 주시기 바랍니다. 

성신 포탈 접속이 가능하신 분이라면 재학생과 졸업생 모두 학교 G-mail 계정 생성이 가능하니  학교 
G-mail 계정이 없으신 분들은 먼저 생성하신 후 회원가입을 진행하여 주시기 바랍니다. 
학교 G-mail 계정 하나 당 하나의 수정광산 계정만 생성이 가능합니다.

학교 G-mail 계정을 통해 가입을 신청한 본인만 서비스를 이용할 수 있으며, 다른 사람에게 이용을 허가하거나 양도할 수 없습니다. 

수정광산은 부정사용 방지 및 본인 확인을 위해 가입한 이메일을 통해 주기적으로 인증을 요청합니다.
이용자는 가입 후에도 계정과 관련된 개인정보(프로필 사진, 닉네임, 학과)를 수정할 수 있습니다.

※ 참조
1. 성신포탈 하단에 [G메일신청](https://portal.sungshin.ac.kr/portal/ssu/RelatedSite/site02.page) 클릭.
2. 정보 확인 후 신청.
3. 기타 자세한 절차는 학교 문의.


09 서비스 이용 계약 해지(탈퇴)
이용자는 수정광산 서비스 이용을 더 이상 원치 않을 시 언제든지 서비스 내부의 메뉴를 이용하여 이용계약을 해지(탈퇴)할 수 있습니다.
수정광산은 이용자의 부정이용 방지를 위해 탈퇴한 이용자의 데이터를 30일 동안 보관합니다.
따라서 이용자는 이용계약 해지 후 30일동안 재가입을 할 수 없습니다.
개인정보 보호 관련 기타 자세한 사항은 [수정광산 개인정보 처리방침]을 참고 부탁드립니다.`;

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
            <Text style={[fontMedium, styles.menuText]}>
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
              backgroundColor: '#FBFBFB',paddingHorizontal: 24, paddingVertical: 16
            }}>
              
              <Markdown>
              {/* {data ? data[0]?.content : ''} */}
              {string}
              </Markdown>
          </ScrollView>
        </>
      )}
      <TouchableWithoutFeedback
        onPress={() => setIsSpreadSecond(!isSpreadSecond)}>
        <View style={styles.menuContainer}>
          <View style={styles.menu}>
            <Text style={[fontMedium, styles.menuText]}>
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
