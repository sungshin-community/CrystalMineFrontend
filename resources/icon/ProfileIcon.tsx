import * as React from 'react';
import Svg, {SvgProps, Rect, Path, G, Defs, ClipPath} from 'react-native-svg';
const ProfileIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={164}
    height={176}
    fill="none"
    {...props}>
    <Rect width={164} height={176} fill="#F7F7F9" rx={10} />
    <Rect width={44} height={44} x={60} y={16} fill="#DBDCE0" rx={22} />
    <Path
      fill="#fff"
      d="M82 27.785A5.107 5.107 0 1 1 82.002 38a5.107 5.107 0 0 1 0-10.214Zm0 12.768c5.644 0 10.215 2.286 10.215 5.107v2.554H71.787V45.66c0-2.821 4.57-5.107 10.214-5.107Z"
    />
    <Rect width={20} height={20} x={94} y={16} fill="#F6F7F8" rx={10} />
    <G clipPath="url(#a)">
      <Path
        stroke="#89919A"
        strokeWidth={1.2}
        d="M108.114 26c0-.123-.006-.24-.017-.363l1.021-.752a.527.527 0 0 0 .142-.693l-1.025-1.723a.55.55 0 0 0-.686-.224l-1.179.486a4.186 4.186 0 0 0-.642-.363l-.159-1.232a.545.545 0 0 0-.543-.47h-2.046a.547.547 0 0 0-.549.47l-.159 1.232a4.186 4.186 0 0 0-.642.363l-1.179-.486a.549.549 0 0 0-.685.224l-1.026 1.728a.528.528 0 0 0 .142.694l1.02.752a3.831 3.831 0 0 0 0 .72l-1.02.752a.527.527 0 0 0-.142.693l1.026 1.723c.137.234.433.33.685.224l1.179-.486c.203.139.417.262.642.363l.159 1.232c.033.267.269.47.543.47h2.046c.274 0 .51-.203.543-.47l.159-1.232c.225-.101.439-.224.642-.363l1.179.486a.55.55 0 0 0 .686-.224l1.026-1.723a.528.528 0 0 0-.143-.693l-1.02-.752c.016-.123.022-.24.022-.363Zm-4.092 1.867c-1.059 0-1.92-.838-1.92-1.867 0-1.03.861-1.867 1.92-1.867s1.92.838 1.92 1.867c0 1.03-.861 1.867-1.92 1.867Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M96 18h16v16H96z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default ProfileIcon;
