import * as React from "react"
import Svg, {SvgProps, Path} from 'react-native-svg';

const DownTriangle = (props: SvgProps) => (
  <Svg
    width="8"
    height="5"
    viewBox="0 0 8 5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path d="M0.25 0.5L4 4.25L7.75 0.5H0.25Z" fill="#6E7882" />
  </Svg>

)

export default DownTriangle;
