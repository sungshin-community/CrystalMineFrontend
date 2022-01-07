import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

const LoginCheckBoxOn = (props: any) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect x={4} y={4} width={16} height={16} rx={3} fill="#A055FF" />
    <Path
      d="m7.556 11.619 3.555 3.048 5.333-5.334"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default LoginCheckBoxOn
