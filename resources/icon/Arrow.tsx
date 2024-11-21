import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const RightArrow = (props: any) => (
  <Svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M6 3.33334L10.5 7.83334L6 12.3333"
      stroke="#6E7882"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export const LeftArrow = (props: any) => (
  <Svg
    width="7"
    height="12"
    viewBox="0 0 7 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M1 1.33334L5.5 5.83334L1 10.3333"
      stroke="#6E7882"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export const UpArrow = (props: any) => (
  <Svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M5.83398 13.9999L14.0007 5.83325L22.1673 13.9999"
      stroke="#A055FF"
      stroke-width="2.33333"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M14.001 5.83325V22.1666"
      stroke="#A055FF"
      stroke-width="2.33333"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default RightArrow;
