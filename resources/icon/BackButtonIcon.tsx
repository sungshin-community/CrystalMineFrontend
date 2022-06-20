import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function BackButtonIcon(props: any) {
  return (
    <Svg
      hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
      width={10}
      height={16}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path d="M9 15 2 8l7-7" stroke="#333D4B" strokeWidth={2} />
    </Svg>
  );
}

export default BackButtonIcon;
