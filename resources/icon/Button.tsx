import * as React from "react"
import Svg, { Path } from "react-native-svg"

export function SpreadButton(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={8}
      fill="none"
      {...props}
    >
      <Path fill="#D6D6D6" d="M10.59.59L6 5.17 1.41.59 0 2l6 6 6-6L10.59.59z" />
    </Svg>
  )
}

export function FoldButton(props: any) {
  return (
    <Svg
      width={12}
      height={8}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.41 7.41L6 2.83l4.59 4.58L12 6 6 0 0 6l1.41 1.41z"
        fill="#D6D6D6"
        fillOpacity={0.87}
      />
    </Svg>
  )
}
