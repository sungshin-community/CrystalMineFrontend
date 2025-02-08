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
export default RightArrow;
