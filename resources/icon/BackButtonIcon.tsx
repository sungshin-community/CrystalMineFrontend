import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function BackButtonIcon(props: any) {
  return (
    <Svg
      width={11}
      height={18}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 2.115L8.907 0 0 9l8.907 9L11 15.885 4.201 9 11 2.115z"
        fill="#000"
        fillOpacity={0.87}
      />
    </Svg>
  );
}

export default BackButtonIcon;
