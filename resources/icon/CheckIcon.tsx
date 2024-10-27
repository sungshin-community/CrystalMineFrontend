import React from 'react';
import Svg, {Path} from 'react-native-svg';

const CheckIcon = (props: any) => {
  return (
    <Svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M3 8.71053L6.51389 12.5L14 4.5"
        stroke="#A055FF"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default CheckIcon;
