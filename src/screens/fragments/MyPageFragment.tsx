import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import RightArrow from '../../../resources/icon/Arrow';
import DefaultProfile from '../../../resources/icon/DefaultProfile';
import QuestionMark from '../../../resources/icon/QuestionMark';

const MyPageFragment = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <View style={{height: 136, flexDirection: 'row', backgroundColor: '#FFFFFF', paddingLeft: 24, paddingTop: 16}}>
            <DefaultProfile />
            <View style={{flex: 1}}>
              <View style={{flexDirection: 'row', paddingLeft: 24, alignItems: 'center'}}>
                <Text style={{fontSize: 18, fontWeight: '800'}}>네모 좋아 제일 좋아</Text>
                <View style={{flexDirection: 'row', flex: 1, paddingRight: 32, justifyContent: 'flex-end'}}><RightArrow /></View>
              </View>
              <Text style={{marginLeft: 24, marginTop: 6, color: '#767676'}}>산업디자인과</Text>
              <View style={{flexDirection: 'row', paddingLeft: 24, paddingTop: 24,  alignItems: 'center'}}>
                <View style={{backgroundColor: '#A055FF', width: 16, height: 16, borderRadius: 8}}></View>
                <Text style={{color: '#A055FF', fontWeight: '700', fontSize: 15, marginLeft: 4}}>LV.2</Text>
                <View style={{ width: 44, height: 16, marginLeft: 8, backgroundColor: '#F4F4F4', borderRadius: 16, flexDirection: 'row', justifyContent: 'center'}}>
                  <Text style={{fontSize: 12, fontWeight: '700', color: '#A055FF'}}>161p</Text>
                </View>
                <View style={{flexDirection: 'row', flex: 1, paddingRight: 32, justifyContent: 'flex-end'}}><QuestionMark /></View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyPageFragment;
