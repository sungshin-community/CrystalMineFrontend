import * as React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"
const UpIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <Circle cx={18} cy={18} r={18} fill="#67E499" />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.25}
      d="m11 18 7-7 7 7M18 11v14"
    />
  </Svg>
)
export default UpIcon
