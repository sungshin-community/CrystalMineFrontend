import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const EmojiSound = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Path
      fill="#9DA4AB"
      d="M19.043 14.499a2.575 2.575 0 1 0 0-5.15 2.575 2.575 0 0 0 0 5.15Z"
    />
    <Path
      fill="#DBDCE0"
      d="m8.54 8.539.47-.692c.865 0 1.723-.201 2.498-.575l4.333-2.131v13.578l-4.333-2.131a5.682 5.682 0 0 0-2.498-.582l-.471-1.238v-6.23ZM5.227 21.002H7.01a.836.836 0 0 0 .837-.837v-5.473H4.391v5.473c0 .463.373.837.837.837Z"
    />
    <Path
      fill="#A055FF"
      d="M17.582 3.004c-1.17 0-2.125.948-2.125 2.125v13.6a2.125 2.125 0 0 0 4.25 0v-13.6a2.13 2.13 0 0 0-2.125-2.125ZM3.504 7.848H9.23V16H3.503c-.662 0-1.195-.519-1.195-1.155V9.01c0-.643.533-1.162 1.195-1.162Z"
    />
  </Svg>
);
export default EmojiSound;
