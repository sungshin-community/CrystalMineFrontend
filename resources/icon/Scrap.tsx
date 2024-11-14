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
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={18}
    fill="none"
    {...props}>
    <Path
      stroke="#9DA4AB"
      strokeWidth={1.5}
      d="M.76 2C.76 1.31 1.32.75 2 .75h10c.686 0 1.25.564 1.25 1.25v14.863L7.295 14.31 7 14.184l-.295.127L.75 16.862.76 2Z"
    />
  </Svg>
);
