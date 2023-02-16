import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DeleteIcon from '../../../resources/icon/DeleteIcon';
import {
  PurpleRoundButton,
  DisabledPurpleRoundButton,
} from '../../components/Button';
import {getUserEmail} from '../../common/authApi';

export default function ReplaceEmail(navigation) {
  const [check, setCheck] = useState(false);
  const [del, setDel] = useState(false);
  // const [firstmail, setFirstmail] = useState('');
  // const [secondmail, setSecondmail] = useState(null);
  const firstmail = '0000000@sungshin.ac.kr';
  const secondmail = 'crystal124@naver.com';
  // const secondmail = null;

  // useEffect(() => {
  //   async function getEmail() {
  //     const result = await getUserEmail();
  //     // setFirstmail(result.firstEmail);
  //     // setSecondmail(result.secondEmail);
  //   }
  //   getEmail();
  // }, []);
  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <View style={styles.title}>
          <Text style={styles.purple}>현재 등록된 이메일</Text>
          {del ? (
            <TouchableOpacity onPress={() => setDel(false)}>
              <View style={styles.delview}>
                <Text style={styles.del}>삭제</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setDel(true)}>
              <DeleteIcon />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.email}>
          {/* 대체 이메일(대표, 삭제가능) */}
          {secondmail == null ? (
            <></>
          ) : (
            <View style={styles.repline}>
              {del ? (
                <View>
                  <BouncyCheckbox
                    size={16}
                    iconStyle={{borderRadius: 3}}
                    innerIconStyle={{borderRadius: 3}}
                    fillColor="#CECFD6"
                    unfillColor="#FFFFFF"
                    onPress={() => setCheck(!check)}
                  />
                </View>
              ) : null}
              <Text>{secondmail}</Text>
              <View style={styles.repview}>
                <Text style={styles.rep}>대표</Text>
              </View>
            </View>
          )}
          {/* 성신 이메일 */}
          <View style={{flexDirection: 'row'}}>
            {del ? (
              <BouncyCheckbox
                size={16}
                iconStyle={{borderRadius: 3}}
                innerIconStyle={{borderRadius: 3}}
                fillColor="#CECFD6"
                unfillColor="#FFFFFF"
                disabled={true}
              />
            ) : null}
            <Text
              style={
                secondmail == null ? {color: '#3A424E'} : {color: '#CECFD6'}
              }>
              {firstmail}
            </Text>
            {secondmail == null ? (
              <View style={styles.repview}>
                <Text style={styles.rep}>대표</Text>
              </View>
            ) : null}
          </View>
        </View>
        <View style={styles.guide}>
          <Text style={styles.purple}>대체 이메일 등록 이용 안내</Text>
          <Text style={styles.guidetxt}>
            대체 이메일이 등록되어 있을 경우,{'\n'}
            수정 광산의 공식 메일이 대체 이메일로 전송됩니다.{'\n'}
            {'\n'}
            반드시 성신 지메일을 이용할 수 없는 경우에만{'\n'}
            대체 이메일을 등록해주세요.
          </Text>
        </View>
      </View>
      <View style={styles.btn}>
        {secondmail == null ? (
          <PurpleRoundButton
            onClick={() => {
              navigation.navigate('#');
            }}
            text="대체 이메일 등록하기"
          />
        ) : (
          <DisabledPurpleRoundButton text="대체 이메일 등록하기" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  wrap: {
    flex: 1,
    width: '100%',
    padding: 24,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  delbtn: {
    fontSize: 12,
  },
  email: {
    borderWidth: 1.5,
    borderColor: '#CECFD6',
    borderRadius: 10,
    marginBottom: 70,
    padding: 20,
  },
  repline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  repview: {
    backgroundColor: '#F3E9FF',
    borderRadius: 4,
    marginLeft: 10,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  rep: {
    color: '#A055FF',
    fontSize: 12,
  },
  delview: {
    backgroundColor: '#A055FF',
    borderRadius: 4,
    marginBottom: -6,
  },
  del: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: '#FFFFFF',
    fontSize: 12,
  },
  guide: {bottom: 34},
  guidetxt: {
    color: '#89919A',
    fontSize: 14,
    marginTop: 15,
    fontFamily: 'SpoqaHanSansNeo-Regular',
    lineHeight: 18,
  },
  purple: {
    fontSize: 16,
    color: '#A055FF',
    fontFamily: 'SpoqaHanSansNeo-Regular',
  },
  btn: {
    bottom: 34,
  },
});
