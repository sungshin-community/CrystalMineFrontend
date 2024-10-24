import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';

const Scrap = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="#9DA4AB"
    {...props}>
    <G clipPath="url(#a)">
      <Path
        stroke="#9DA4AB"
        strokeWidth={1.5}
        d="M5.76 5c0-.69.56-1.25 1.24-1.25h10c.686 0 1.25.564 1.25 1.25v14.863l-5.955-2.552-.295-.127-.295.127-5.954 2.551L5.76 5Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#9DA4AB" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default Scrap;

export const NoScrap = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <G clipPath="url(#a)">
      <Path
        stroke="#9DA4AB"
        strokeWidth={1.5}
        d="M5.76 5c0-.69.56-1.25 1.24-1.25h10c.686 0 1.25.564 1.25 1.25v14.863l-5.955-2.552-.295-.127-.295.127-5.954 2.551L5.76 5Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#ffffff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
