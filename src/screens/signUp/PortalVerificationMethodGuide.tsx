import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, Image, Dimensions} from 'react-native';
import {fontMedium, fontRegular} from '../../common/font';

export const PortalVerificationMethodGuide = () => {
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View
        style={{
          backgroundColor: '#fff',
          paddingHorizontal: 25,
          paddingVertical: 30,
        }}>
        <Text style={[fontRegular, {fontSize: 13}]}>
          수정광산의 아이디는 학번(숫자)으로 이루어진 성신 G-mail 계정으로만
          등록 가능합니다.
          {`\n`}
          {`\n`}
          다만 기존에 생성한 성신 G-mail 계정이 학번이 아니거나, 기타 다른
          이유로 계정 생성이 어려우신 분들을 위해 포탈 시스템을 통해 별도로 개별
          인증을 진행하고 있습니다.
          {`\n`}
          {`\n`}
          번거로우시겠지만 이어지는 안내 내용을 참고하시어 정회원 인증을 진행해
          주시기 바랍니다.
          {`\n`}
          {`\n`}
          <Text style={{color: '#87919B'}}>
            * 성신 G-mail을 새로 발급 받아 인증 메일을 변경하지 않는 이상,
            앞으로도 현재 인증을 진행하는 메일 계정으로 정회원 인증이 진행됨을
            알려드립니다.
          </Text>
        </Text>
      </View>
      <View style={{backgroundColor: '#F5F5F5', height: 10}}></View>
      <View
        style={{
          backgroundColor: '#fff',
          paddingHorizontal: 25,
          paddingVertical: 30,
        }}>
        <View style={{flexDirection: 'row', marginBottom: 15}}>
          <Text style={[fontMedium, {fontSize: 15, marginRight: 7}]}>01</Text>
          <View>
            <Text style={[fontRegular, {fontSize: 15}]}>
              수정광산 계정으로 인증 메일을 보내주세요.
            </Text>
          </View>
        </View>
        <Text style={[fontRegular, {fontSize: 13}]}>
          아래 02의 내용을 준비하여 수정광산 계정으로 인증 메일을 보내주세요.
        </Text>
        <Text style={[fontRegular, {fontSize: 13, marginTop: 20}]}>
          인증 메일 제목: {`\n`}[정회원 인증] 본인 학번 / ex) [정회원 인증]
          20221234
        </Text>
        <Text style={[fontRegular, {fontSize: 13, marginTop: 20}]}>
          수정광산 계정: {`\n`}auth@crystalmine.kr
        </Text>
      </View>
      <View style={{backgroundColor: '#F5F5F5', height: 10}}></View>
      <View
        style={{
          backgroundColor: '#fff',
          paddingVertical: 30,
          paddingHorizontal: 25,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[fontMedium, {fontSize: 15, marginRight: 7}]}>02</Text>
          <View>
            <Text style={[fontRegular, {fontSize: 15, marginBottom: 15}]}>
              인증 시 필요한 내용은 다음과 같습니다.
            </Text>
          </View>
        </View>
        <View style={{alignSelf: 'center'}}>
        <Text
          style={[
            fontRegular,
            {fontSize: 13, marginBottom: 35, color: '#A155FF'},
          ]}>
          *성을 제외한 이름/ 생년월일은 가려서 제출해 주세요.{`\n`}*학번과
          학과로 확인을 진행하므로 꼭 보이게 캡쳐해 주세요.
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
        <Text style={[fontRegular, {fontSize: 13, marginBottom: 15}]}>
          {`b. [성신여대 포탈 시스템 - 통합정보시스템 - 학적관리 -\n     학적변동조회] 의 상단에 위치한 [학생기초정보] 부분 캡쳐`}
        </Text>
        <Image
          style={{width: 303, height: 55, marginBottom: 35}}
          source={{
            uri:
              'https://crystalmine-s3.s3.ap-northeast-2.amazonaws.com/guide/regular-member-verification-guide2.jpg',
          }}
        /></View>
      </View>
    </ScrollView>
  );
};
