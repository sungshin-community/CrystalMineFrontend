import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const BoardGNB = (props: any) => (
  <Svg
  width={22}
  height={25}
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  {...props}
>
  <Path
    d="M18.48 0H3.52C1.575 0 0 1.598 0 3.571V21.43C0 23.402 1.575 25 3.52 25h14.96c1.945 0 3.52-1.598 3.52-3.571V3.57C22 1.598 20.425 0 18.48 0ZM4.84 18.862a.999.999 0 0 1-.99-1.005.999.999 0 0 1 .99-1.004c.546 0 .99.45.99 1.004a.999.999 0 0 1-.99 1.005Zm0-5.357a.999.999 0 0 1-.99-1.005.999.999 0 0 1 .99-1.005c.546 0 .99.451.99 1.005a.999.999 0 0 1-.99 1.005Zm0-5.358a.999.999 0 0 1-.99-1.004.999.999 0 0 1 .99-1.005c.546 0 .99.451.99 1.005a.999.999 0 0 1-.99 1.004ZM17.6 18.75H8.8a.89.89 0 0 1-.88-.893.89.89 0 0 1 .88-.893h8.8a.89.89 0 0 1 .88.893.89.89 0 0 1-.88.893Zm0-5.357H8.8a.89.89 0 0 1-.88-.893.89.89 0 0 1 .88-.893h8.8a.89.89 0 0 1 .88.893.89.89 0 0 1-.88.893Zm0-5.357H8.8a.89.89 0 0 1-.88-.893.89.89 0 0 1 .88-.893h8.8a.89.89 0 0 1 .88.893.89.89 0 0 1-.88.893Z"
    fill={props.color}
  />
</Svg>
);

export default BoardGNB;
