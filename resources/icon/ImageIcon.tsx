import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const ImageIcon = (props: any) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M18 16V2c0-1.1-.9-2-2-2H2C.9 0 0 .9 0 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2ZM5.9 10.98 8 13.51l3.1-3.99c.2-.26.6-.26.8.01l3.51 4.68a.5.5 0 0 1-.4.8H3.02c-.42 0-.65-.48-.39-.81L5.12 11c.19-.26.57-.27.78-.02Z"
      fill="#6E7882"
    />
  </Svg>
);

export default ImageIcon;
