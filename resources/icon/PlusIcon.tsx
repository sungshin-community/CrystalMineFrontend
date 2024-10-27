import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const PlusIcon = (props: any) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M9 1.5C4.86 1.5 1.5 4.86 1.5 9c0 4.14 3.36 7.5 7.5 7.5 4.14 0 7.5-3.36 7.5-7.5 0-4.14-3.36-7.5-7.5-7.5Zm3.75 8.25h-3v3h-1.5v-3h-3v-1.5h3v-3h1.5v3h3v1.5Z"
      fill="#DBDCE0"
    />
  </Svg>
);

export default PlusIcon;
