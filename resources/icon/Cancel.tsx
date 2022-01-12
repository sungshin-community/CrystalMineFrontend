import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const CancelButton = (props: any) => (
  <Svg
    width={12}
    height={12}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path d="M11 1 1 11M1 1l10 10" stroke="#AAA" strokeLinecap="round" />
  </Svg>
);

export default CancelButton;
