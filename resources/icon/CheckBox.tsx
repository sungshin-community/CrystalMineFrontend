import * as React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

export function RoundUnchecked(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx={12} cy={12} r={11} fill="#D6D6D6" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.59 7.5L10 14.09l-3.59-3.58L5 11.92l5 5 8-8-1.41-1.42z"
        fill="#fff"
      />
    </Svg>
  );
}

export function RoundChecked(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx={12} cy={12} r={11} fill="#A055FF" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.59 7.5L10 14.09l-3.59-3.58L5 11.92l5 5 8-8-1.41-1.42z"
        fill="#fff"
      />
    </Svg>
  );
}

export function Unchecked(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2Z"
        fill="#D6D6D6"
        fillOpacity={0.87}
      />
    </Svg>
  );
}

export function Checked(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.9999 16.2001L4.7999 12.0001L3.3999 13.4001L8.9999 19.0001L20.9999 7.0001L19.5999 5.6001L8.9999 16.2001Z"
        fill="#A055FF"
      />
    </Svg>
  );
}
export function RectangleUnchecked(props: any) {
  return (
    <Svg
      width={18}
      height={18}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect x={0.5} y={0.5} width={17} height={17} rx={4.5} stroke="#A055FF" />
    </Svg>
  );
}

export function RectangleChecked(props: any) {
  return (
    <Svg
      width={18}
      height={18}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 0a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5H5Zm8.264 7.207a.9.9 0 1 0-1.328-1.214L8.21 10.067 6.064 7.72a.9.9 0 0 0-1.328 1.214l2.81 3.072a.9.9 0 0 0 1.328 0l4.39-4.8Z"
        fill="#A055FF"
      />
    </Svg>
  );
}
