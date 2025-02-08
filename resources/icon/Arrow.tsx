import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const RightArrow = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}>
    <Path
      stroke="#6E7882"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m6 3.333 4.5 4.5-4.5 4.5"
    />
  </Svg>
);

export const UpArrow = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}>
    <Path
      stroke="#A055FF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.333}
      d="m5.834 14 8.167-8.167L22.167 14M14.001 5.833v16.334"
    />
  </Svg>
);

export default RightArrow;
