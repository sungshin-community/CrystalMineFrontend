import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const PostImage = (props: any) => (
  <Svg
    width={12}
    height={12}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M12 10.667V1.333C12 .6 11.4 0 10.667 0H1.333C.6 0 0 .6 0 1.333v9.334C0 11.4.6 12 1.333 12h9.334C11.4 12 12 11.4 12 10.667ZM3.933 7.32l1.4 1.687L7.4 6.347a.335.335 0 0 1 .533.006l2.34 3.12a.333.333 0 0 1-.266.534H2.013a.332.332 0 0 1-.26-.54l1.66-2.134a.329.329 0 0 1 .52-.013Z"
      fill="#6E7882"
    />
  </Svg>
);

export default PostImage;
