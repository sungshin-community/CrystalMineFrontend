import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const RightArrow = (props: any) => (
  <Svg
    width={8}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m1 15 6-7-6-7"
      stroke="#A3A3A3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default RightArrow;
