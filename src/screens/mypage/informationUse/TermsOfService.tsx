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
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {fontBold, fontMedium, fontRegular} from '../../../common/font';
import {
  FoldBlackButton,
  SpreadBlackButton,
} from '../../../../resources/icon/Button';
import {useState} from 'react';

type RootStackParamList = {
  Announcement: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

function TermsOfService({navigation}: Props) {
  const [isSpreadFirst, setIsSpreadFirst] = useState<boolean>(false);
  const [isSpreadSecond, setIsSpreadSecond] = useState<boolean>(false);
  return (
    <SafeAreaView style={{backgroundColor: '#E5E5E5'}}>
      <View style={styles.menuContainer}>
          <View style={styles.menu}>
            <Text style={[fontRegular, styles.menuText]}>
              수정광산 서비스 이용약관
            </Text>
              <View style={styles.menuIcon}>
            <Pressable hitSlop={{ top: 20, bottom: 20, left: 20, right: 20}} onPress={() => setIsSpreadFirst(!isSpreadFirst)}>
                {isSpreadFirst ? <FoldBlackButton /> : <SpreadBlackButton />}
            </Pressable>
              </View>
          </View>
          <Text
            style={[
              fontRegular,
              {color: '#ADB3BC', fontSize: 13, marginTop: 4},
            ]}>
            2001.01.01 동의
          </Text>
      </View>
      {isSpreadFirst && (
        <>
          <ScrollView
            style={{
              height: Dimensions.get('window').height / 3,
              backgroundColor: '#FBFBFB',
            }}>
            <Text style={{paddingHorizontal: 24, paddingVertical: 16}}>
              수정광산 개인정보 처리방침 수정광산은 개인정보보호법에 따라
              이용자의 개인정보 및 권익을 보호하고 개인정보와 관련된 이용자의
              고충을 원활하게 처리할 수 있도록 다음의 처리방침을 두고 있습니다.
              수정광산은 개인정보 처리방침을 개정하는 경우 서비스 내 알림 및
              푸시 알림을 통해 이를 공지할 것입니다. 01 개인정보의 처리 목적
              수정광산은 이용자의 개인정보를 다음의 목적을 위해 처리합니다.
              처리된 개인정보는 다음의 목적 이외의 용도로는 사용되지 않습니다.
              회원 가입 및 탈퇴 의사 확인 본인인증을 통한 중복 가입 확인
              성신여대 재학생 혹은 졸업생이 아닌 외부인의 수정광산 이용 방지
              회원 자격 유지 및 관리 불량 회원의 부정 이용 방지 문의 혹은
              이벤트, 게시 관련 요청 응대 및 처리 02 수집하는 개인정보의 항목 및
              보유 기간 수정광산은 법령에 따른 개인정보 보유 및 이용기간 또는
              정보 주체로부터 개인정보를 수집할 때 동의 받은 개인정보 보유 및
              이용기간 내에서 개인정보를 처리, 보유하며 이용자의 개인정보는
              원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체없이
              파기합니다.
            </Text>
          </ScrollView>
        </>
      )}
      <View style={styles.menuContainer}>
          <View style={styles.menu}>
            <Text style={[fontRegular, styles.menuText]}>
              개인정보 처리방침
            </Text>
              <View style={styles.menuIcon}>
            <Pressable hitSlop={{ top: 20, bottom: 20, left: 20, right: 20}} onPress={() => setIsSpreadSecond(!isSpreadSecond)}>
                {isSpreadSecond ? <FoldBlackButton /> : <SpreadBlackButton />}
            </Pressable>
              </View>
          </View>
          <Text
            style={[
              fontRegular,
              {color: '#ADB3BC', fontSize: 13, marginTop: 4},
            ]}>
            2001.01.01 동의
          </Text>
      </View>
      {isSpreadSecond && (
        <>
          <ScrollView
            style={{
              height: Dimensions.get('window').height / 3,
              backgroundColor: '#FBFBFB',
            }}>
            <Text style={{paddingHorizontal: 24, paddingVertical: 16}}>
              수정광산 개인정보 처리방침 수정광산은 개인정보보호법에 따라
              이용자의 개인정보 및 권익을 보호하고 개인정보와 관련된 이용자의
              고충을 원활하게 처리할 수 있도록 다음의 처리방침을 두고 있습니다.
              수정광산은 개인정보 처리방침을 개정하는 경우 서비스 내 알림 및
              푸시 알림을 통해 이를 공지할 것입니다. 01 개인정보의 처리 목적
              수정광산은 이용자의 개인정보를 다음의 목적을 위해 처리합니다.
              처리된 개인정보는 다음의 목적 이외의 용도로는 사용되지 않습니다.
              회원 가입 및 탈퇴 의사 확인 본인인증을 통한 중복 가입 확인
              성신여대 재학생 혹은 졸업생이 아닌 외부인의 수정광산 이용 방지
              회원 자격 유지 및 관리 불량 회원의 부정 이용 방지 문의 혹은
              이벤트, 게시 관련 요청 응대 및 처리 02 수집하는 개인정보의 항목 및
              보유 기간 수정광산은 법령에 따른 개인정보 보유 및 이용기간 또는
              정보 주체로부터 개인정보를 수집할 때 동의 받은 개인정보 보유 및
              이용기간 내에서 개인정보를 처리, 보유하며 이용자의 개인정보는
              원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체없이
              파기합니다.
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
    paddingLeft: 24,
  },
  menuIcon: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    paddingRight: 31,
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
