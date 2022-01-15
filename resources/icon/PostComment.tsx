import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const PostComment = (props: any) => (
  <Svg
    width={12}
    height={12}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M10.8 0H1.2C.54 0 0 .54 0 1.2V12l2.4-2.4h8.4c.66 0 1.2-.54 1.2-1.2V1.2c0-.66-.54-1.2-1.2-1.2Z"
      fill="#6E7882"
    />
  </Svg>
);

export default PostComment;
