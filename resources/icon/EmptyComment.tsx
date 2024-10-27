import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const EmptyComment = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 16 16">
    <Path
      stroke="#9DA3AB"
      strokeWidth="1.3"
      d="M3 3h10a1 1 0 011 1v5.92a1 1 0 01-1 1H8.422a1 1 0 00-.716.302l-2.191 2.25a.3.3 0 01-.515-.21V11.92a1 1 0 00-1-1H3a1 1 0 01-1-1V4a1 1 0 011-1z"></Path>
  </Svg>
);

export default EmptyComment;
