import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function DropDown() {
  return (
    <Svg
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.41075 6.92243C6.73617 7.24786 7.26383 7.24786 7.58925 6.92243L13.0059 1.50575C13.3313 1.18034 13.3313 0.652671 13.0059 0.327254C12.6805 0.00183725 12.1528 0.00183725 11.8274 0.327254L7 5.15466L2.17259 0.327254C1.84715 0.00183725 1.31952 0.00183725 0.994075 0.327254C0.668642 0.652671 0.668642 1.18034 0.994075 1.50575L6.41075 6.92243Z"
        fill="#9DA4AB"
      />
    </Svg>
  );
}

export default DropDown;
