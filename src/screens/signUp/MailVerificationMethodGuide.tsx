import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, Image, Dimensions} from 'react-native';
import {fontMedium, fontRegular} from '../../common/font';

export const MailVerificationMethodGuide = () => {
  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: '#fff',
          paddingHorizontal: 25,
          paddingVertical: 20,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[fontMedium, {fontSize: 15, marginRight: 7}]}>01</Text>
          <View>
            <Text style={[fontRegular, {fontSize: 15}]}>
              {`아래 02 의 내용을 준비하여 수정광산 계정으로\n메일을 보내주시기 바랍니다.`}
            </Text>
            <Text style={[fontRegular, {fontSize: 13, marginTop: 20}]}>
              <Text style={fontMedium}>수정광산 계정:</Text> contact@crystalmine.kr
            </Text>
          </View>
        </View>
      </View>
      <View style={{backgroundColor: '#F5F5F5', height: 10}}></View>
      <View
        style={{
          backgroundColor: '#fff',
          paddingHorizontal: 25,
          paddingVertical: 20,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[fontMedium, {fontSize: 15, marginRight: 7}]}>02</Text>
          <View>
            <Text style={[fontRegular, {fontSize: 15, marginBottom: 5}]}>
              인증 시 필요한 내용은 다음과 같습니다.
            </Text>
            <Text
              style={[
                fontRegular,
                {fontSize: 13, marginBottom: 35, color: '#A155FF'},
              ]}>
              *<Text style={{textDecorationLine: 'underline'}}>성을 제외한 이름</Text>/ 학번/ 생년월일은 가려서 제출
            </Text>
            <Text style={[fontRegular, {fontSize: 13, marginBottom: 15}]}>
              a. [성신여대 포탈 시스템]의 메인 화면 캡쳐
            </Text>
            <Image
              style={{width: 302, height: 135, marginBottom: 35}}
              source={{
                uri:
                  'https://crystalmine-s3.s3.ap-northeast-2.amazonaws.com/guide/regular-member-verification-guide1.jpg',
              }}
            />
            <Text style={[fontRegular, { fontSize: 13, marginBottom: 15}]}>
              {`b. [성신여대 포탈 시스템 - 통합정보시스템 - 학적관리 -\n     학적변동조회] 의 상단에 위치한 [학생기초정보] 부분 캡쳐`}
            </Text>
            <Image
              style={{width: 303, height: 55, marginBottom: 35}}
              source={{
                uri:
                  'https://crystalmine-s3.s3.ap-northeast-2.amazonaws.com/guide/regular-member-verification-guide2.jpg',
              }}
            />
            <Text style={[fontRegular, {fontSize: 13,marginBottom: 15}]}>
              {`c. 성신 G-mail 에 접속하여 우측 상단 프로필 클릭 시\n     나오는 부분을 계정 주소가 보이게 캡쳐`}
            </Text>
            <Image
              style={{width: 302, height: 244, marginBottom: 35}}
              source={{
                uri:
                  'https://crystalmine-s3.s3.ap-northeast-2.amazonaws.com/guide/regular-member-verification-guide3.jpg',
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
