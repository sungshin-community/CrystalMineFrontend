import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const MessageTabIcon = (props: any) => (
  <Svg
    width={26}
    height={21}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M23.058.502H2.768A2.542 2.542 0 0 0 .232 3.035v15.2a2.542 2.542 0 0 0 2.536 2.532h20.29a2.542 2.542 0 0 0 2.536-2.533V3.035A2.542 2.542 0 0 0 23.058.502Zm-.508 5.383-8.293 5.18c-.824.52-1.864.52-2.688 0l-8.294-5.18a1.083 1.083 0 0 1-.507-.912c0-.849.926-1.355 1.648-.912l8.497 5.307 8.496-5.307c.723-.443 1.649.063 1.649.912 0 .367-.19.71-.508.912Z"
      fill={props.color}
    />
  </Svg>
);

export default MessageTabIcon;
