import * as React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"

const ExclamationMark = (props: any) => (
  <Svg
    width={36}
    height={36}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={18} cy={18} r={18} fill="#FFA767" />
    <Path d="M18 27a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM16 9h4v12h-4V9Z" fill="#fff" />
  </Svg>
)

export default ExclamationMark;
