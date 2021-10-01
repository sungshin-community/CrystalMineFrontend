import React from 'react';
import styled from 'styled-components';

const TouchMajor = styled.TouchableOpacity`
  margin: 12px;
`;

const MajorOption = styled.Text`
  font-size: 17px;
`;

export const Major = ({major, selectMajor, style}: any) => {
  return (
    <TouchMajor
      id={major.id}
      value={major.value}
      onPress={() => selectMajor(major.name)}>
      <MajorOption style={style}>{major.name}</MajorOption>
    </TouchMajor>
  );
};
