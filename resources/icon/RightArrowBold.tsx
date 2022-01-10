import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const RightArrowBold = (props: any) => (
  <Svg
    width={9}
    height={16}
    viewBox="0 0 9 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path d="M1 1.5L7.5 8L1 14.5" stroke="#333D4B" stroke-width={2} />
  </Svg>
);

export default RightArrowBold;
