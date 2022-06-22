import * as React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

const Siren = (props: any) => (
  <Svg
    width="18"
    height="21"
    viewBox="0 0 18 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M3 12C3 8.68629 5.68629 6 9 6C12.3137 6 15 8.68629 15 12V17H3V12Z"
      stroke="#333D4B"
      stroke-width="2"
    />
    <Rect
      x="1"
      y="17"
      width="16"
      height="3"
      stroke="#333D4B"
      stroke-width="2"
    />
    <Rect x="8" width="2" height="3" fill="#333D4B" />
    <Rect
      x="15"
      y="2"
      width="2"
      height="3"
      transform="rotate(44.4105 15 2)"
      fill="#333D4B"
    />
    <Rect
      width="2"
      height="3"
      transform="matrix(-0.714345 0.699794 0.699794 0.714345 3 2)"
      fill="#333D4B"
    />
  </Svg>
);

export default Siren;
