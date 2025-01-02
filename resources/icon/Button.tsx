import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export function SpreadButton(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={8}
      fill="none"
      {...props}>
      <Path fill="#6E7882" d="M10.59.59L6 5.17 1.41.59 0 2l6 6 6-6L10.59.59z" />
    </Svg>
  );
}

export function FoldButton(props: any) {
  return (
    <Svg
      width={12}
      height={8}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.41 7.41L6 2.83l4.59 4.58L12 6 6 0 0 6l1.41 1.41z"
        fill="#6E7882"
        fillOpacity={0.87}
      />
    </Svg>
  );
}
export function SpreadBlackButton(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={8}
      fill="none"
      {...props}>
      <Path fill="#333D4B" d="M10.59.59L6 5.17 1.41.59 0 2l6 6 6-6L10.59.59z" />
    </Svg>
  );
}

export function FoldBlackButton(props: any) {
  return (
    <Svg
      width={12}
      height={8}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.41 7.41L6 2.83l4.59 4.58L12 6 6 0 0 6l1.41 1.41z"
        fill="#333D4B"
        fillOpacity={0.87}
      />
    </Svg>
  );
}

export const BigFoldButton = (props: any) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M15.836 12.5 10.21 6.875 4.586 12.5"
      stroke="#6E7882"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const BigSpreadButton = (props: any) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="m15.836 7.5-5.625 5.625L4.586 7.5"
      stroke="#3A424E"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const GreyBigSpreadButton = (props: any) => (
  <Svg
    width={16}
    height={10}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path d="m1 9 7-7 7 7" stroke="#6E7882" strokeWidth={2} />
  </Svg>
);

export const GreyBigFoldButton = (props: any) => (
  <Svg
    width={16}
    height={10}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path d="M15 1 8 8 1 1" stroke="#6E7882" strokeWidth={2} />
  </Svg>
);

export const BoardFoldButton = (props: any) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M15.836 12.5 10.21 6.875 4.586 12.5"
      stroke="#6E7882"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const BoardSpeardButton = (props: any) => (
  <Svg
    width={16}
    height={10}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path d="m1 9 7-7 7 7" stroke="#6E7882" strokeWidth={2} />
  </Svg>
);
