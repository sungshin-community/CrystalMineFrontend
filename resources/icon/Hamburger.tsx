import * as React from 'react';
import Svg, {Defs, G, Path, Rect, ClipPath} from 'react-native-svg';

const Hamburger = (props: any) => (
  <Svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <G clip-path="url(#clip0_65_525)">
      <Path
        d="M12 4L3 4"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12 8L3 8"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12 12L3 12"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_65_525">
        <Rect
          width="16"
          height="16"
          fill="white"
          transform="translate(0 16) rotate(-90)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);

export default Hamburger;
