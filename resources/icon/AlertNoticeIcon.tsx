import * as React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"

const AlertNoticeIcon = (props: SvgProps) => (
  <Svg
    width={36}
    height={36}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={18} cy={18} r={18} fill="#9BE478" />
    <Path d="M11 13.875v8.25h5.333L23 29V7l-6.667 6.875H11Z" fill="#fff" />
  </Svg>
)

export default AlertNoticeIcon
