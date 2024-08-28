import * as React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

const NoReport = (props: any) => (
  <Svg
    width={18}
    height={21}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M3 12a6 6 0 1 1 12 0v5H3v-5ZM1 18a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-1Z"
      stroke="#9DA4AB"
      strokeWidth={2}
    />
    <Path
      fill="#9DA4AB"
      d="M8 0h2v3H8zM15 2l1.429 1.4-2.1 2.143-1.428-1.4zM3 2 1.571 3.4l2.1 2.143 1.428-1.4z"
    />
  </Svg>
);

export default NoReport;

export const Report = (props: any) => (
  <Svg
    width={18}
    height={21}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M3 12a6 6 0 1 1 12 0v5H3v-5ZM1 17h16v3H1z"
      stroke="#9DA4AB"
      strokeWidth={2}
    />
    <Path
      fill="#9DA4AB"
      d="M8 0h2v3H8zM15 2l1.429 1.4-2.1 2.143-1.428-1.4zM3 2 1.571 3.4l2.1 2.143 1.428-1.4z"
    />
  </Svg>
);
