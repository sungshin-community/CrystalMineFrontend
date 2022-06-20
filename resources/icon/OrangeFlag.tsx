import * as React from "react"
import Svg, { Path } from "react-native-svg"

const OrangeFlag = (props: any) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M10.52 3.647 10.2 2H3v14h1.6v-5.765h4.48l.32 1.647H15V3.647h-4.48Z"
      fill="#FFA767"
    />
  </Svg>
)

export default OrangeFlag;