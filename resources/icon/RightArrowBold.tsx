import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const RightArrowBold = (props: any) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path d="M9 5L16 12L9 19" stroke="#333D4B" stroke-width={2} />
  </Svg>
);

export default RightArrowBold;
