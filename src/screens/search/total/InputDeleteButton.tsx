import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const InputDeleteButton = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={21}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      fillOpacity={0.2}
      d="M15.896 16.393a8.336 8.336 0 0 0 0-11.786 8.336 8.336 0 0 0-11.785 0 8.336 8.336 0 0 0 0 11.786 8.336 8.336 0 0 0 11.785 0Zm-9.428-3.536L8.825 10.5 6.468 8.143l1.179-1.178 2.357 2.357 2.357-2.357 1.178 1.178-2.357 2.357 2.357 2.357-1.178 1.179-2.357-2.357-2.357 2.357-1.179-1.179Z"
    />
  </Svg>
)
export default InputDeleteButton
