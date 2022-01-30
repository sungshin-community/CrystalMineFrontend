import * as React from 'react';
import Svg, {Circle} from 'react-native-svg';

const Dots = (props: any) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Circle
      cx="19"
      cy="12"
      r="2"
      transform="rotate(-180 19 12)"
      fill="#333D4B"
    />
    <Circle cx="5" cy="12" r="2" transform="rotate(-180 5 12)" fill="#333D4B" />
    <Circle
      cx="12"
      cy="12"
      r="2"
      transform="rotate(-180 12 12)"
      fill="#333D4B"
    />
  </Svg>
);

export default Dots;
