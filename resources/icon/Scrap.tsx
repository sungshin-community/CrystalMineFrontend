import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const Scrap = (props: any) => (
  <Svg
    width={14}
    height={18}
    viewBox="0 0 14 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M12 0H2C0.9 0 0.0100002 0.9 0.0100002 2L0 18L7 15L14 18V2C14 0.9 13.1 0 12 0Z"
      fill="#9DA4AB"
    />
  </Svg>
);

export default Scrap;

export const NoScrap = (props: any) => (
  <Svg
    width={14}
    height={18}
    viewBox="0 0 14 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M12 0H2C0.9 0 0.0100002 0.9 0.0100002 2L0 18L7 15L14 18V2C14 0.9 13.1 0 12 0ZM12 15L7 12.82L2 15V2H12V15Z"
      fill="#9DA4AB"
    />
  </Svg>
);
