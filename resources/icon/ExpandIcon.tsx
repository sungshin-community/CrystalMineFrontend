import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const ExpandIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}>
    <Path
      fill="#3A424E"
      fillRule="evenodd"
      d="M0 1v5a1 1 0 0 0 2 0V3.414l3.793 3.793a1 1 0 0 0 1.414-1.414L3.414 2H6a1 1 0 0 0 0-2H1a1 1 0 0 0-1 1Zm10 15h5a1 1 0 0 0 1-1v-5a1 1 0 1 0-2 0v2.586l-3.793-3.793a1 1 0 0 0-1.414 1.414L12.586 14H10a1 1 0 1 0 0 2Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default ExpandIcon;
