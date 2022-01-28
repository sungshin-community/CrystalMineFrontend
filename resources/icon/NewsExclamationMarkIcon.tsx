import * as React from 'react';
import Svg, {SvgProps, Path, Circle} from 'react-native-svg';

const NewsExclamationMarkIcon = (props: any) => (
  <Svg
    width={36}
    height={36}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Circle cx={18} cy={18} r={18} fill="#FFA767" />
    <Path
      d="M18 27C19.1046 27 20 26.1046 20 25C20 23.8954 19.1046 23 18 23C16.8954 23 16 23.8954 16 25C16 26.1046 16.8954 27 18 27Z"
      fill="white"
    />
    <Path d="M16 9H20V21H16V9Z" fill="white" />
  </Svg>
);

export default NewsExclamationMarkIcon;
