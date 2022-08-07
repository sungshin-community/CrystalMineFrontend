import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const SortIcon = (props: any) => (
  <Svg
    width={12}
    height={14}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M9 10.758V5.5H7.5v5.258H5.25l3 2.992 3-2.992H9ZM3.75.25l-3 2.993H3V8.5h1.5V3.242h2.25L3.75.25Z"
      fill="#6E7882"
    />
  </Svg>
);

export default SortIcon;