import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';
const BPostSend = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={13}
    fill="none"
    {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        d="M1.005 11 11.5 6.5 1.005 2 1 5.5l7.5 1-7.5 1 .005 3.5Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 .5h12v12H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default BPostSend;
