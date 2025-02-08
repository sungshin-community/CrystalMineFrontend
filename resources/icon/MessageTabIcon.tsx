import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import tinycolor from 'tinycolor2'; // 색상 조정 라이브러리

const MessageTabIcon = (props: any) => {
  const darkenColor = (color: string, amount: number) => {
    return tinycolor(color).darken(amount).toString();
  };

  let fillColor = props.color;
  let darkFillColor;

  if (fillColor === '#DBDCE0') {
    darkFillColor = '#DBDCE0';
    fillColor = '#E2E4E8';
  } else if (fillColor === '#A055FF') {
    darkFillColor = '#A055FF';
    fillColor = '#C39BFA';
  } else {
    darkFillColor = tinycolor(fillColor).darken(7).toString();
  }

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      fill="none"
      viewBox="0 0 25 24"
      {...props}>
      <Path
        fill={darkFillColor}
        d="M24.998 21.579V10.2a3.947 3.947 0 00-3.947-3.947H9.23a3.968 3.968 0 00-3.968 3.968V17.355a2.646 2.646 0 002.645 2.646h10.868l4.186 2.69a1.323 1.323 0 002.038-1.112z"></Path>
      <Path
        fill={fillColor}
        d="M17.084 0H3.968A3.968 3.968 0 000 3.968v12.44a1.323 1.323 0 002.065 1.095l3.198-2.169V10.221a3.968 3.968 0 013.968-3.968h11.821V3.968A3.968 3.968 0 0017.084 0z"></Path>
    </Svg>
  );
};

export default MessageTabIcon;
