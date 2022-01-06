import * as React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"

const QuestionMark = (props: any) => (
  <Svg
    width={14}
    height={14}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={7} cy={7} r={6.5} stroke="#A3A3A3" />
    <Path
      d="M6.079 8.69h1.243c-.33-2.497 1.826-1.694 1.826-4.081 0-1.32-1.001-2.068-2.299-2.123-1.089-.055-2.398.572-2.519 2.519h1.375c.055-.88.484-1.298 1.1-1.298.616 0 .88.44.88 1.012 0 1.43-1.969 1.1-1.606 3.971Zm-.187 2.464h1.606V9.592H5.892v1.562Z"
      fill="#A3A3A3"
    />
  </Svg>
)

export default QuestionMark;
