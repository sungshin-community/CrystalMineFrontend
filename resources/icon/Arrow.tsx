import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const RightArrow = (props: any) => (
  <Svg
    width={8}
    height={12}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path d="M.75.75 6 6 .75 11.25" stroke="#333D4B" strokeWidth={2} />
  </Svg>
);

export default RightArrow;
