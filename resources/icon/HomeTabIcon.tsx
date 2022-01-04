import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const HomeTabIcon = (props: any) => (
  <Svg
    width={30}
    height={30}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M15 .333C6.9.333.333 6.9.333 15 .333 23.1 6.9 29.667 15 29.667c8.101 0 14.667-6.566 14.667-14.667C29.667 6.9 23.1.333 15 .333Zm9.592 14.154-3.535-3.537v6.817H19.77v-6.72l-6.43 6.427-.909-.91 6.335-6.335h-6.641V8.943h6.922L15.42 5.316l.91-.91 3.44 3.44V4.484h1.286v3.46l2.53-2.53.909.91-2.622 2.621h3.55v1.286h-3.271l3.346 3.347-.907.909Z"
      fill={props.color}
    />
  </Svg>
);

export default HomeTabIcon;
