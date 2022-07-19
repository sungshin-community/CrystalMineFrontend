import * as React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"

const CheckMark = (props: SvgProps) => (
  <Svg
    width={36}
    height={36}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={18} cy={18} r={18} fill="#9BE478" />
    <Path
      d="M10 18.72 14.8 24 26 12"
      stroke="#fff"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default CheckMark
