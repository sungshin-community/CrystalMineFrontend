import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const CancelButton = (props: any) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"
      fill="#222222"
    />
  </Svg>
);

export const WhiteCancelButton = (props: any) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path d="m1 1 15.72 16M17 1 1.28 17" stroke="#fff" strokeWidth={2} />
  </Svg>
);

export default CancelButton;
