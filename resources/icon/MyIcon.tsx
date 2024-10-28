import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

const MyIcon = (props: any) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}>
      <Circle cx="12" cy="12" r="12" fill="#E5D2FC"></Circle>
      <Path
        fill="#A055FF"
        d="M12 6.429a2.786 2.786 0 110 5.57 2.786 2.786 0 010-5.57zm0 6.964c3.078 0 5.572 1.246 5.572 2.786v1.392H6.429V16.18c0-1.54 2.493-2.786 5.571-2.786z"></Path>
    </Svg>
  );
};

export default MyIcon;
