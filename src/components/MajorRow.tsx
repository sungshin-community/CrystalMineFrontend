import React, {useState} from 'react';
import {Text} from 'react-native';
import styled from 'styled-components';

const TouchMajor = styled.Pressable`
  margin: 12px;
`;

const MajorOption = styled.Text`
  font-size: 17px;
`;

export const MajorRow = ({major, selectMajor, style}: any) => {
  // const [selected, isSelected] = useState<boolean>(false);

  // const makeCheck = () => {
  //   isSelected(true);
  // };

  return (
    <TouchMajor
      hitSlop={12}
      key={major.id}
      value={major.value}
      onPress={() => selectMajor(major)}
      // onPressOut={makeCheck}
    >
      <MajorOption style={style}>{major.name}</MajorOption>
    </TouchMajor>
  );
};
