import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import Checked from '../../resources/icon/Checked';

const TouchMajor = styled.Pressable`
  margin: 12px;
`;

const MajorOption = styled.Text`
  font-size: 17px;
  font-family: 'SpoqaHanSansNeo-Regular';
  direction: ltr;
`;

interface Props {
  major: Major;
  selectMajor: any;
  style: any;
  selected: boolean;
}

interface Major {
  id: number;
  isActive: boolean;
  name: string;
}

export const MajorRow = (props: Props) => {
  const {major, selectMajor, style, selected} = props;
  return (
    <TouchMajor
      hitSlop={12}
      key={major.id}
      value={major.name}
      onPress={() => selectMajor(major)}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <MajorOption style={style}>{major.name}</MajorOption>
        <View>{selected ? <Checked /> : null}</View>
      </View>
    </TouchMajor>
  );
};
