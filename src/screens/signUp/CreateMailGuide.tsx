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
          paddingVertical: 20,
        }}>
            <Text>수정광산의 아이디는 학번(숫자)으로 이루어진 성신 G-mail 계정으로만 등록 가능합니다. 
혹시 아래와 같이 아이디 등록이 어려우신 분들은 이어지는 안내 내용을 참고해 주시기 바랍니다. 
</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={[fontMedium, {fontSize: 15, marginRight: 7}]}>01</Text>
          <View>
            <Text style={[fontRegular, {fontSize: 15}]}>
            재학생인데, 성신 G-mail 계정이 없어요!
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
            재학생인데, 성신 G-mail 계정이 없어요!
            </Text>
           
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
