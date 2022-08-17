import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, Image, Dimensions} from 'react-native';
import {fontMedium, fontRegular} from '../../common/font';

export const CreateMailGuide = () => {
  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: '#fff',
          paddingHorizontal: 25,
          paddingVertical: 30,
        }}>
        <Text style={[fontRegular, {fontSize: 13, marginBottom: 20}]}>
          수정광산의 아이디는 학번(숫자)으로 이루어진 성신 G-mail 계정으로만
          등록 가능합니다. 혹시 아래와 같이 아이디 등록이 어려우신 분들은
          이어지는 안내 내용을 참고해 주시기 바랍니다.
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={[fontMedium, {fontSize: 13, marginRight: 7}]}>01</Text>
          <View>
            <Text style={[fontRegular, {fontSize: 13}]}>
              재학생인데, 성신 G-mail 계정이 없어요!
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[fontMedium, {fontSize: 13, marginRight: 7}]}>02</Text>
          <View>
            <Text style={[fontRegular, {fontSize: 13}]}>
              졸업생인데, 성신 G-mail 계정이 없어요!
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[fontMedium, {fontSize: 13, marginRight: 7}]}>03</Text>
          <View>
            <Text style={[fontRegular, {fontSize: 13}]}>
              성신 G-mail 계정이 있는데, 학번이 아니에요!
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
          <Text style={[fontMedium, {fontSize: 15, marginRight: 7}]}>01</Text>
          <View>
            <Text style={[fontRegular, {fontSize: 15, marginBottom: 5}]}>
              재학생인데, 성신 G-mail 계정이 없어요!
            </Text>
          </View>
        </View>
        <Text style={[fontRegular, {fontSize: 13, marginBottom: 20}]}>
          성신 G-mail 계정이 없으신 재학생분들은 학교 포탈 시스템에서 계정을
          먼저 생성하신 다음 수정광산에 가입하여 주시기 바랍니다. 성신 G-mail
          계정 생성 방법은 아래를 참고하여 주세요.
        </Text>
        <Text style={[fontRegular, {fontSize: 13, marginBottom: 20}]}>
          1) 학교 포탈에 접속합니다. http://portal.sungshin.ac.kr{`\n`}
          2) 포탈 페이지 하단에 [G메일신청] 버튼을 클릭합니다.{`\n`}
          3) 신청 내용을 확인하신 후 신청을 진행합니다.{`\n`}
          4) 신청 후 평균 7일 이내로 생성되며, 신청 결과는 포탈의 해당
          페이지에서 확인하실 수 있습니다.
        </Text>
        <Text
          style={[
            fontRegular,
            {fontSize: 13, marginBottom: 20, color: '#87919B'},
          ]}>
          * 학교 계정 생성 및 관리에 대한 문의는 수정광산에서 처리하는 부분이
          아니기 때문에 도와드릴 수 없음을 알려드리며, 관련 문의는 학교
          시스템실로 문의 부탁드립니다. (02-920-7520, 7514){`\n`}
          {`\n`} * 성신 G-mail 계정이 없으신 졸업생 분들은 아래 02번의 안내를
          따라주시기 바랍니다.
        </Text>
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
              졸업생인데, 성신 G-mail 계정이 없어요!
            </Text>
          </View>
        </View>
        <Text style={[fontRegular, {fontSize: 13, marginBottom: 20}]}>
          원래는 졸업생도 성신 G-mail 계정을 생성할 수 있으나, 현재 학교 내부
          사정으로 인해 졸업생의 성신 G-mail 생성이 불가능합니다. 따라서
          졸업생인데 성신 G-mail 계정이 없으신 수정님들은 아래의 안내를 따라
          먼저 가입하신 후, 개별적으로 인증하여 주시기 바랍니다.
        </Text>
        <Text style={[fontRegular, {fontSize: 13, marginBottom: 20}]}>
          1) 수정광산 가입 시, 본인의 학번을 아이디로 등록하여 가입 진행.{`\n`}
          2) 가입 후 정회원 인증 시, 별도로 안내되는 절차에 따라 인증 진행.
        </Text>
      </View>
      <View style={{backgroundColor: '#F5F5F5', height: 10}}></View>
      <View
        style={{
          backgroundColor: '#fff',
          paddingHorizontal: 25,
          paddingVertical: 20,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[fontMedium, {fontSize: 15, marginRight: 7}]}>03</Text>
          <View>
            <Text style={[fontRegular, {fontSize: 15, marginBottom: 5}]}>
              졸업생인데, 성신 G-mail 계정이 없어요!
            </Text>
          </View>
        </View>
        <Text style={[fontRegular, {fontSize: 13, marginBottom: 20}]}>
          성신 G-mail 계정이 있으나, 학번이 아니거나 계정에 숫자 외의 문자가
          포함되어 있으신 분들은 기존에 갖고 계신 성신 G-mail 로는 가입하실 수
          없습니다. 따라서 아래의 안내를 따라 먼저 가입하신 후, 개별적으로
          인증하여 주시기 바랍니다.
        </Text>
        <Text style={[fontRegular, {fontSize: 13, marginBottom: 20}]}>
          1) 수정광산 가입 시, 본인의 학번을 아이디로 등록하여 가입 진행.{`\n`}
          2) 가입 후 정회원 인증 시, 별도로 안내되는 절차에 따라 인증 진행.
        </Text>
      </View>
    </ScrollView>
  );
};
