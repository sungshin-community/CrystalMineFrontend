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

class MajorRadio extends React.Component {
  state = {};

  render() {
    return (
      <ScrollView style={styles.container}>{this.renderCheckList()}</ScrollView>
    );
  }

  //!!!!!!!!!!!!!
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
    ];

    function setSelectedOption(checkListOption) {
      this.setState({
        checkListOption,
      });
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
            backgroundColor: 'white',
            paddingLeft: 20,
            borderTopWidth: 1,
            borderTopColor: '#cccccc',
            borderBottomWidth: 1,
            borderBottomColor: '#cccccc',
          }}>
          {options}
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <View style={{marginTop: 10, backgroundColor: 'white'}}>
          <Text style={{padding: 20, fontWeight: 'bold'}}>학과 선택</Text>

          <View
            style={{
              backgroundColor: '#F6F6F6',
              paddingTop: 5,
              paddingBottom: 5,
            }}>
            <Text
              style={{
                color: '#555555',
                paddingLeft: 20,
                marginBottom: 5,
                marginTop: 5,
                fontSize: 12,
              }}>
              {/* 학과 선택 */}
              {this.state.checkListOption || ''}
            </Text>
            <RadioButtons
              options={options}
              onSelection={setSelectedOption.bind(this)}
              selectedOption={this.state.checkListOption}
              renderOption={renderOption}
              renderContainer={renderContainer}
            />
          </View>
          {/* <Text
            style={{
              margin: 20,
            }}>
            Selected accent: {this.state.checkListOption || 'none'}
          </Text> */}
        </View>
      </View>
    );
  }
}

export default MajorRadio;
