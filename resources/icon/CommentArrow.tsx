import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const CommentArrow = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}>
    <Path
      stroke="#9DA4AB"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="m10 6.668 3.333 3.333L10 13.335"
    />
    <Path
      stroke="#9DA4AB"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M2.664 2.668v4.667A2.667 2.667 0 0 0 5.331 10h8"
    />
  </Svg>
);
export default CommentArrow;
