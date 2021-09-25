import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {RadioButtons} from 'react-native-radio-buttons';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
});

export default class MajorRadio extends React.Component {
  state = {};

  render() {
    return (
      <ScrollView style={styles.container}>{this.renderCheckList()}</ScrollView>
    );
  }

  renderCheckList() {
    const options = [
      '해당 없음',
      '국어국문학과',
      '영어영문학과',
      '독일어문ㆍ문화학과',
      '프랑스어문ㆍ문학과',
      '일본어문ㆍ문학과',
      '중국어문ㆍ문학과',
      '사학과',
      '정치외교학과',
      '심리학과',
      '지리학과',
      '경제학과',
      '경영학과',
      '경영학부',
      '미디어커뮤니케이션학과',
      '사회복지학과',
      '법학부',
      '수학과',
      '통계학과',
      'IT학부',
      '화학과',
      '생명과학·화학부',
      '수리통계데이터사이언스학부',
      '화학·에너지융합학부',
      '청정융합에너지공학과',
      '바이오생명공학과',
      '바이오식품공학과',
      '융합보안공학과',
      '컴퓨터공학과',
      '정보시스템공학과',
      '서비스디자인공학과',
      'AI융합학부',
      '간호학과',
      '스포츠레저학과',
      '운동재활복지학과',
      '글로벌의과학과',
      '식품영양학과',
      '바이오신약의과학부',
      '바이오헬스융합학부',
      '스포츠과학부',
      '글로벌비즈니스학과',
      '의류산업학과',
      '뷰티산업학과',
      '소비자생활문화산업학과',
      '교육학과',
      '사회교육과',
      '윤리교육과',
      '한문교육과',
      '유아교육과',
      '동양화과',
      '서양화과',
      '조소과',
      '공예과',
      '산업디자인과',
      '성악과',
      '기악과',
      '작곡과',
      '문화예술경영학과',
      '미디어영상연기학과',
      '현대실용음악학과',
      '무용예술학과',
    ];

    function setSelectedOption(checkListOption) {
      this.setState({checkListOption});
    }

    function renderOption(option, selected, onSelect, index) {
      const textStyle = {
        paddingTop: 12,
        paddingBottom: 12,
        color: selected ? '#A055FF' : 'black',
        flex: 1,
        fontSize: 17,
      };
      const baseStyle = {
        flexDirection: 'row',
      };
      var style;
      var checkMark;

      if (index > 0) {
        style = [
          baseStyle,
          {
            borderTopColor: '#F6F6F6',
            borderTopWidth: 1,
          },
        ];
      } else {
        style = baseStyle;
      }

      if (selected) {
        checkMark = (
          <Text
            style={{
              flex: 0.1,
              color: '#A055FF',
              fontWeight: 'bold',
              paddingTop: 8,
              fontSize: 20,
              alignSelf: 'center',
            }}>
            ✓
          </Text>
        );
      }

      return (
        <TouchableWithoutFeedback onPress={onSelect} key={index}>
          <View style={style}>
            <Text style={textStyle}>{option}</Text>
            {checkMark}
          </View>
        </TouchableWithoutFeedback>
      );
    }

    function renderContainer(options) {
      return (
        <View
          style={{
            paddingLeft: 24,
            borderTopWidth: 1,
            borderTopColor: '#F6F6F6',
            borderBottomWidth: 1,
            borderBottomColor: '#F6F6F6',
          }}>
          {options}
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <View
          style={{
            paddingTop: 5,
            paddingBottom: 5,
          }}>
          <RadioButtons
            options={options}
            onSelection={setSelectedOption.bind(this)}
            selectedOption={this.state.checkListOption}
            renderOption={renderOption}
            renderContainer={renderContainer}
          />
        </View>
      </View>
    );
  }
}
