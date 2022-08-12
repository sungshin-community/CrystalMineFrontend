import * as React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"

const AlertCommentIcon = (props: SvgProps) => (
  <Svg
    width={36}
    height={36}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={18} cy={18} r={18} fill="#A055FF" />
    <Path
      d="M24.4 10H11.6a1.607 1.607 0 0 0-1.6 1.6V26l3.2-3.2h11.2a1.607 1.607 0 0 0 1.6-1.6v-9.6a1.607 1.607 0 0 0-1.6-1.6Z"
      fill="#fff"
    />
    <Path
      d="M14 14h8m-8 4h8"
      stroke="#A055FF"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
)

export default AlertCommentIcon
