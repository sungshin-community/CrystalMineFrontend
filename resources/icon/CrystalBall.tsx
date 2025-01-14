import * as React from 'react';
import Svg, {
  SvgProps,
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

const CrystalBall = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}>
    <Path
      fill="#FFDF64"
      d="M20.51 24h-9.02c-.504 0-.966.285-1.192.737l-1.333 2.667a1.333 1.333 0 0 0 1.192 1.93h11.686a1.333 1.333 0 0 0 1.192-1.93l-1.333-2.667A1.333 1.333 0 0 0 20.509 24Z"
    />
    <Path
      fill="#FFC701"
      d="M22.921 28H9.08a.667.667 0 0 0 0 1.333H22.92a.667.667 0 1 0 0-1.333Z"
    />
    <Path
      fill="#A055FF"
      fillRule="evenodd"
      d="M20.477 24c.453 0 .902-.11 1.283-.354a10.658 10.658 0 0 0 4.906-8.98C26.666 8.777 21.891 4 16 4S5.333 8.776 5.333 14.667c0 3.769 1.955 7.082 4.906 8.979.381.245.83.354 1.283.354h8.955Z"
      clipRule="evenodd"
    />
    <Circle
      cx={16.922}
      cy={13.181}
      r={7.274}
      fill="url(#a)"
      opacity={0.4}
      transform="rotate(23.66 16.922 13.181)"
    />
    <Path
      fill="#E5D2FC"
      fillRule="evenodd"
      d="M8.667 4.001c.304 1.565 1.052 2.801 2 3.303-.948.502-1.696 1.738-2 3.303-.304-1.565-1.053-2.8-2-3.303.947-.502 1.696-1.738 2-3.303ZM12.281 9.332c.448 1.882 1.551 3.368 2.948 3.972-1.397.604-2.5 2.09-2.948 3.972-.448-1.882-1.551-3.368-2.948-3.972 1.397-.604 2.5-2.09 2.948-3.972Z"
      clipRule="evenodd"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={16.922}
        x2={16.922}
        y1={5.908}
        y2={20.455}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#fff" />
        <Stop offset={1} stopColor="#fff" stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default CrystalBall;
