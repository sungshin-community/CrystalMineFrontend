import * as React from "react"
import Svg, { Path } from "react-native-svg"

const GrayFlag = (props: any) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M10.52 3.647 10.2 2H3v14h1.6v-5.765h4.48l.32 1.647H15V3.647h-4.48Z"
      fill="#D6D6D6"
    />
  </Svg>
)

export default GrayFlag;

export const BigGrayFlag = (props: any) => (
  <Svg
    width={16}
    height={19}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M10.027 2.235 9.6 0H0v19h2.133v-7.823h5.974l.426 2.235H16V2.235h-5.973Z"
      fill="#87919B"
    />
  </Svg>
)
