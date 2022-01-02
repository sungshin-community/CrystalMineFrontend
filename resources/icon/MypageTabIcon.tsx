import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const MyPageGNB = (props: any) => (
  <Svg
    width={23}
    height={23}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M11.181 11.635c3.003 0 5.435-2.474 5.435-5.527 0-3.054-2.432-5.527-5.435-5.527-3.002 0-5.434 2.473-5.434 5.527 0 3.053 2.432 5.527 5.434 5.527Zm0 2.763c-3.627 0-10.87 1.852-10.87 5.527v1.382c0 .76.612 1.381 1.36 1.381h19.021c.747 0 1.359-.621 1.359-1.381v-1.382c0-3.675-7.242-5.527-10.87-5.527Z"
      fill={props.color}
    />
  </Svg>
);

export default MyPageGNB;
