import * as React from "react"
import Svg, { SvgProps, Circle, Rect, Path } from "react-native-svg"

const AlertBlindIcon = (props: SvgProps) => (
  <Svg
    width={36}
    height={36}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={18} cy={18} r={18} fill="#A055FF" />
    <Rect x={8} y={10} width={20} height={4} rx={2} fill="#fff" />
    <Rect x={10} y={11} width={16} height={12} rx={2} fill="#fff" />
    <Path fill="#fff" d="M17 22h2v3h-2z" />
    <Circle cx={18} cy={26} r={1} fill="#fff" stroke="#fff" strokeWidth={2} />
    <Path
      d="M13 14h10"
      stroke="#A055FF"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
)

export default AlertBlindIcon
