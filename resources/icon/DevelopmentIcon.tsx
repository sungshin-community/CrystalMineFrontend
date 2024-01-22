import * as React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"
const DevelopmentIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <Circle cx={18} cy={18} r={18} fill="#DBDCE0" />
    <Path
      fill="#fff"
      d="m26.754 24.325-7.744-7.79c.766-1.97.34-4.281-1.276-5.908-1.567-1.576-3.854-1.992-5.8-1.314-.246.086-.303.396-.12.581l2.756 2.773a.75.75 0 0 1 0 1.057l-1.501 1.51a.75.75 0 0 1-1.058.007l-2.844-2.796c-.182-.179-.485-.127-.575.111-.743 1.964-.26 4.279 1.313 5.862 1.617 1.627 3.914 2.055 5.872 1.284l7.744 7.791a.82.82 0 0 0 1.191 0l1.957-1.969c.426-.343.426-.942.085-1.199Z"
    />
  </Svg>
)
export default DevelopmentIcon