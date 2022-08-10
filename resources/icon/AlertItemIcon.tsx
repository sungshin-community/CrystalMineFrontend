import Svg, {SvgProps, Circle, Path} from 'react-native-svg';
import React from 'react';

export const AlertWorkIcon = (props: SvgProps) => (
  <Svg
    width={36}
    height={36}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Circle cx={18} cy={18} r={18} fill="#878787" />
    <Path
      d="m27.808 24.417-8.341-8.342c.825-2.108.366-4.583-1.375-6.325-1.834-1.833-4.584-2.2-6.784-1.192L15.25 12.5l-2.75 2.75-4.033-3.942c-1.1 2.2-.642 4.95 1.191 6.784 1.742 1.741 4.217 2.2 6.325 1.375l8.342 8.341a.886.886 0 0 0 1.283 0l2.109-2.108c.458-.367.458-1.008.091-1.283Z"
      fill="#fff"
    />
  </Svg>
);

export const AlertCheckIcon = (props: SvgProps) => (
  <Svg
    width={36}
    height={36}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Circle cx={18} cy={18} r={18} fill="#FFA767" />
    <Path
      d="M9 18.84 14.4 25 27 11"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
