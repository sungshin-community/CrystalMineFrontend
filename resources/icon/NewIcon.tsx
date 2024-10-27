import * as React from 'react';
import Svg, {SvgProps, Circle, Path} from 'react-native-svg';
const NewIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}>
    <Circle cx={8} cy={8} r={7} fill="#F3E9FF" />
    <Path
      fill="#A055FF"
      d="M5 10.833a.667.667 0 1 0 1.333 0V6.25h.013l1.93 3.377.837 1.383A1.017 1.017 0 0 0 11 10.483V5.167a.667.667 0 0 0-1.333 0V9.75L6.895 5.004A1.017 1.017 0 0 0 5 5.517v5.316Z"
    />
  </Svg>
);
export default NewIcon;
