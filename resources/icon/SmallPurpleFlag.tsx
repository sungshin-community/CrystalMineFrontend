import Svg, { SvgProps, Path } from "react-native-svg"
import * as React from "react"

export const SmallPurpleFlag = (props: SvgProps) => (
  <Svg
    width={10}
    height={12}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M6.267 1.412 6 0H0v12h1.333V7.059h3.734l.266 1.412H10V1.41H6.267Z"
      fill="#A055FF"
    />
  </Svg>
)
