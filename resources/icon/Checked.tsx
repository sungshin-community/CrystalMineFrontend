import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const Checked = (props: any) => (
  <Svg
    width={18}
    height={14}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 11.2 1.8 7 .4 8.4 6 14 18 2 16.6.6 6 11.2Z"
      fill="#A055FF"
    />
  </Svg>
);

export default Checked;
