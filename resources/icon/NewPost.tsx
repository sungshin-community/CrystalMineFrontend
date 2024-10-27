import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

function Icon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16">
      <Circle cx="8" cy="8" r="7" fill="#F3E9FF"></Circle>
      <Path
        fill="#A055FF"
        d="M5 10.833a.667.667 0 101.333 0V6.25h.013l1.93 3.377.837 1.383A1.017 1.017 0 0011 10.483V5.167a.667.667 0 00-1.333 0V9.75L6.895 5.004A1.017 1.017 0 005 5.517v5.316z"></Path>
    </Svg>
  );
}

export default Icon;
