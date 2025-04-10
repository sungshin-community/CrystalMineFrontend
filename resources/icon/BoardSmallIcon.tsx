import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SmallBoard = (props: any) => (
  <Svg
    width={14}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M11.76 0H2.24C1.002 0 0 1.023 0 2.286v11.428C0 14.977 1.002 16 2.24 16h9.52c1.238 0 2.24-1.023 2.24-2.286V2.286C14 1.023 12.998 0 11.76 0ZM3.08 12.071a.637.637 0 0 1-.63-.642c0-.355.283-.643.63-.643.347 0 .63.288.63.643a.637.637 0 0 1-.63.642Zm0-3.428A.637.637 0 0 1 2.45 8c0-.354.283-.643.63-.643.347 0 .63.289.63.643a.637.637 0 0 1-.63.643Zm0-3.429a.637.637 0 0 1-.63-.643c0-.354.283-.642.63-.642.347 0 .63.288.63.642a.637.637 0 0 1-.63.643ZM11.2 12H5.6a.567.567 0 0 1-.56-.571c0-.315.252-.572.56-.572h5.6c.308 0 .56.257.56.572a.567.567 0 0 1-.56.571Zm0-3.429H5.6A.567.567 0 0 1 5.04 8c0-.314.252-.571.56-.571h5.6c.308 0 .56.257.56.571a.567.567 0 0 1-.56.571Zm0-3.428H5.6a.567.567 0 0 1-.56-.572c0-.314.252-.571.56-.571h5.6c.308 0 .56.257.56.571a.567.567 0 0 1-.56.572Z"
      fill="#87919B"
    />
  </Svg>
)

export default SmallBoard;
