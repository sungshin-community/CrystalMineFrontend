import * as React from 'react';
import Svg, {SvgProps, Path, Circle} from 'react-native-svg';

const NewsCheckIcon = (props: any) => (
  <Svg
    width={30}
    height={30}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Circle cx={15} cy={15} r={15} fill="#FFA767" />
    <Path
      d="M7.5 15.7L12 20.8333L22.5 9.16666"
      stroke="white"
      stroke-width={3}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default NewsCheckIcon;
