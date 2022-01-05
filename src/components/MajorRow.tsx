import React from 'react';
import styled from 'styled-components';

const TouchMajor = styled.Pressable`
  margin: 12px;
`;

const MajorOption = styled.Text`
  font-size: 17px;
  font-family: 'SpoqaHanSansNeo-Regular';
`;

export const MajorRow = ({major, selectMajor, style}: any) => {
  return (
    <TouchMajor
      hitSlop={12}
      key={major.id}
      value={major.value}
      onPress={() => selectMajor(major)}>
      <MajorOption style={style}>{major.name}</MajorOption>
    </TouchMajor>
  );
};
