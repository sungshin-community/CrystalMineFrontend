import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const Scrap = (props: any) => (
  <Svg
    width="14"
    height="18"
    viewBox="0 0 14 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M12 0H2C0.9 0 0.0100002 0.9 0.0100002 2L0 18L7 15L14 18V2C14 0.9 13.1 0 12 0Z"
      fill="#A055FF"
    />
  </Svg>
);

export default Scrap;

export const NoScrap = (props: any) => (
  <Svg
    width="14"
    height="18"
    viewBox="0 0 14 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M0.76 2.00047V2C0.76 1.30931 1.3191 0.75 2 0.75H12C12.6858 0.75 13.25 1.31421 13.25 2V16.8626L7.29544 14.3106L7 14.184L6.70456 14.3106L0.750711 16.8623L0.76 2.00047Z"
      stroke="#9DA4AB"
      stroke-width="1.5"
    />
  </Svg>
);
