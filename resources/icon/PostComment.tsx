import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const BigPostComment = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}>
    <Path
      stroke="#3A424E"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3.75 4.5h12.5a.5.5 0 0 1 .5.5v7.4a.5.5 0 0 1-.5.5h-5.723a2 2 0 0 0-1.432.604L7 15.655V14.9a2 2 0 0 0-2-2H3.75a.5.5 0 0 1-.5-.5V5a.5.5 0 0 1 .5-.5Zm2.606 11.816Z"
    />
  </Svg>
);

export const PostComment = (props: any) => (
  <Svg
    width={13}
    height={13}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M11.467.667h-9.6c-.66 0-1.2.54-1.2 1.2v10.8l2.4-2.4h8.4c.66 0 1.2-.54 1.2-1.2v-7.2c0-.66-.54-1.2-1.2-1.2Zm0 8.4h-8.4l-1.2 1.2v-8.4h9.6v7.2Z"
      fill="#9DA4AB"
    />
  </Svg>
);
