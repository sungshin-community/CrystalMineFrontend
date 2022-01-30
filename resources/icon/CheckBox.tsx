import * as React from 'react';
import Svg, {Circle, Path, Rect} from 'react-native-svg';

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
      width={18}
      height={14}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 11.2L1.8 7 .4 8.4 6 14 18 2 16.6.6 6 11.2z"
        fill="#D6D6D6"
        fillOpacity={0.87}
      />
    </Svg>
  );
}

export function Checked(props: any) {
  return (
    <Svg
      width={18}
      height={14}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 11.2L1.8 7 .4 8.4 6 14 18 2 16.6.6 6 11.2z"
        fill="#6E7882"
      />
    </Svg>
  );
}
export function RectangleUnchecked(props: any) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect x={0.5} y={0.5} width={17} height={17} rx={4.5} stroke="#A055FF" />
    </Svg>
  );
}

export function RectangleChecked(props: any) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5 0C2.23858 0 0 2.23858 0 5V13C0 15.7614 2.23858 18 5 18H13C15.7614 18 18 15.7614 18 13V5C18 2.23858 15.7614 0 13 0H5ZM13.2641 7.2075C13.5996 6.84072 13.5742 6.27144 13.2074 5.93597C12.8406 5.6005 12.2714 5.62588 11.9359 5.99266L8.20976 10.0666L6.06412 7.72066C5.72865 7.35388 5.15937 7.3285 4.79259 7.66397C4.42581 7.99944 4.40043 8.56872 4.73589 8.9355L7.54565 12.0075C7.71615 12.1939 7.95714 12.3001 8.20976 12.3001C8.46238 12.3001 8.70337 12.1939 8.87387 12.0075L13.2641 7.2075Z"
        fill="#A055FF"
      />
    </Svg>
  );
}
