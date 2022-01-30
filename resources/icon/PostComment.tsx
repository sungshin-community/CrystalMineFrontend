import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const PostComment = (props: any) => (
  <Svg
    width={13}
    height={13}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M11.467.667h-9.6c-.66 0-1.2.54-1.2 1.2v10.8l2.4-2.4h8.4c.66 0 1.2-.54 1.2-1.2v-7.2c0-.66-.54-1.2-1.2-1.2Zm0 8.4h-8.4l-1.2 1.2v-8.4h9.6v7.2Z"
      fill="#6E7882"
    />
  </Svg>
);

export default PostComment;
