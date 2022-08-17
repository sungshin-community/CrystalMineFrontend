import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const DownloadIcon = (props: any) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M16 9v7H2V9H0v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9h-2Zm-6 .67 2.59-2.58L14 8.5l-5 5-5-5 1.41-1.41L8 9.67V0h2v9.67Z"
      fill="#fff"
    />
  </Svg>
)

export default DownloadIcon;
