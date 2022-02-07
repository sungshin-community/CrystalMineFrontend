import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const PhotoIcon = (props: any) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M9 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
      fill="#D1d1d1"
    />
    <Path
      d="M15 3h-2.377l-.93-1.012A1.493 1.493 0 0 0 10.59 1.5H7.41c-.42 0-.825.18-1.11.488L5.378 3H3c-.825 0-1.5.675-1.5 1.5v9c0 .825.675 1.5 1.5 1.5h12c.825 0 1.5-.675 1.5-1.5v-9c0-.825-.675-1.5-1.5-1.5Zm-6 9.75c-2.07 0-3.75-1.68-3.75-3.75 0-2.07 1.68-3.75 3.75-3.75 2.07 0 3.75 1.68 3.75 3.75 0 2.07-1.68 3.75-3.75 3.75Z"
      fill="#D1d1d1"
    />
  </Svg>
);

export default PhotoIcon;
