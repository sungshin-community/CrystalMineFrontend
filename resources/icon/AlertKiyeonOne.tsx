import * as React from 'react';
import Svg, {
  SvgProps,
  G,
  Circle,
  Rect,
  Path,
  Defs,
  ClipPath,
} from 'react-native-svg';

const CustomIcon = (props: SvgProps) => (
  <Svg
    width={36}
    height={36}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <G clipPath="url(#clip0_1431_50069)">
      <Circle cx={18} cy={18} r={18} fill="#A055FF" />
      <Rect x={8} y={10} width={20} height={4} rx={2} fill="white" />
      <Rect x={10} y={11} width={16} height={12} rx={2} fill="white" />
      <Rect x={17} y={22} width={2} height={3} fill="white" />
      <Circle
        cx={18}
        cy={26}
        r={1}
        fill="white"
        stroke="white"
        strokeWidth={2}
      />
      <Path
        d="M13 14H23"
        stroke="#A055FF"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_1431_50069">
        <Rect width={36} height={36} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default CustomIcon;
