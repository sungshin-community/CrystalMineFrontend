import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

const CommentSendIcon = (props: any) => (
  <Svg
    width={34}
    height={34}
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Circle cx={17} cy={17} r={17} fill="#A055FF" {...props} />
    <Path
      d="M9 17L10.41 18.41L16 12.83V25H18V12.83L23.58 18.42L25 17L17 9L9 17Z"
      fill="white"
    />
  </Svg>
);

export default CommentSendIcon;
