import React from 'react';
import Svg, {Path} from 'react-native-svg';

const ReplyIcon = (props: any) => {
  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M10 6.66699L13.3333 10.0003L10 13.3337"
        stroke="#9DA4AB"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M2.66602 2.66699V7.33366C2.66602 8.0409 2.94697 8.71918 3.44706 9.21928C3.94716 9.71937 4.62544 10.0003 5.33268 10.0003H13.3327"
        stroke="#9DA4AB"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default ReplyIcon;
