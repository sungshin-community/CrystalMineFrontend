import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const RightArrow = (props: any) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path d="M6.75 3.75 12 9l-5.25 5.25" stroke="#333D4B" strokeWidth={2} />
  </Svg>
);

export default RightArrow;
