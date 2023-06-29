import * as React from 'react';
import Svg, {Defs, G, Path, Rect, ClipPath} from 'react-native-svg';

const Hamburger = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}>
    <G
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      clipPath="url(#a)">
      <Path d="M12 4H3M12 8H3M12 12H3" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 16V0h16v16z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default Hamburger;
