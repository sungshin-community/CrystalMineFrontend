import * as React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"

const PointIcon = (props: any) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={12} cy={12} r={12} fill="#A055FF" />
    <Path
      d="M7.878 5.42h4.13c.692 0 1.338.068 1.939.204.6.125 1.122.34 1.564.646.442.306.787.714 1.037 1.224.26.499.39 1.122.39 1.87 0 .714-.13 1.337-.39 1.87-.25.521-.595.952-1.037 1.292-.431.34-.941.595-1.53.765a7.3 7.3 0 0 1-1.904.238h-1.683V18H7.878V5.42Zm4.029 6.12c1.71 0 2.567-.725 2.567-2.176 0-.748-.221-1.258-.663-1.53-.442-.283-1.105-.425-1.99-.425h-1.427v4.131h1.513Z"
      fill="#fff"
    />
  </Svg>
)

export default PointIcon;
