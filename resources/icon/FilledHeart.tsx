import * as React from 'react';
import Svg, {SvgProps, Defs, G, Path, ClipPath} from 'react-native-svg';

const FilledHeart = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 16 16">
    <G clipPath="url(#clip0_1431_46585)">
      <Path
        fill="#FF6376"
        d="M10.999 2c-1.16 0-2.274.54-3 1.393a3.992 3.992 0 00-3-1.393 3.631 3.631 0 00-3.667 3.667c0 2.52 2.267 4.573 5.7 7.693l.294.265a1 1 0 001.343-.002l.296-.27c3.434-3.113 5.7-5.166 5.7-7.686A3.631 3.631 0 0011 2z"></Path>
    </G>
    <Defs>
      <ClipPath id="clip0_1431_46585">
        <Path fill="#fff" d="M0 0H16V16H0z"></Path>
      </ClipPath>
    </Defs>
  </Svg>
);

export default FilledHeart;
