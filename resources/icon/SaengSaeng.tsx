import * as React from 'react';
import Svg, {Path, Rect, Circle} from 'react-native-svg';

const SaengSaeng = (props: any) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect x="3.5" y="4" width="17" height="18" rx="1.5" fill="#EAECF0" />
    <Circle cx="6" cy="6" r="1" fill="#CECFD6" />
    <Circle cx="9" cy="6" r="1" fill="#CECFD6" />
    <Circle cx="12" cy="6" r="1" fill="#CECFD6" />
    <Circle cx="15" cy="6" r="1" fill="#CECFD6" />
    <Circle cx="18" cy="6" r="1" fill="#CECFD6" />
    <Rect x="8.5" y="2" width="1" height="4" rx="0.5" fill="#6E7882" />
    <Rect x="5.5" y="2" width="1" height="4" rx="0.5" fill="#6E7882" />
    <Rect
      opacity="0.7"
      x="20.5"
      y="9"
      width="1"
      height="17"
      transform="rotate(90 20.5 9)"
      fill="#9DA3AB"
    />
    <Rect
      opacity="0.7"
      x="20.5"
      y="12"
      width="1"
      height="17"
      transform="rotate(90 20.5 12)"
      fill="#9DA3AB"
    />
    <Rect
      opacity="0.7"
      x="20.5"
      y="15"
      width="1"
      height="17"
      transform="rotate(90 20.5 15)"
      fill="#9DA3AB"
    />
    <Rect
      opacity="0.7"
      x="20.5"
      y="18"
      width="1"
      height="17"
      transform="rotate(90 20.5 18)"
      fill="#9DA3AB"
    />
    <Rect x="11.5" y="2" width="1" height="4" rx="0.5" fill="#6E7882" />
    <Rect x="14.5" y="2" width="1" height="4" rx="0.5" fill="#6E7882" />
    <Rect x="17.5" y="2" width="1" height="4" rx="0.5" fill="#6E7882" />
    <Rect
      x="7.5"
      y="19"
      width="1"
      height="10"
      transform="rotate(-180 7.5 19)"
      fill="#A055FF"
    />
  </Svg>
);

export default SaengSaeng;
