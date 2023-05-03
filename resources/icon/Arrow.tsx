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

)

export default RightArrow;
