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

export const BigFoldButton = (props: any) => (
  <Svg
    width={16}
    height={9}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M15.691 8.693a1.04 1.04 0 0 0 0-1.478L8.75.307a1.055 1.055 0 0 0-1.488 0L.31 7.215a1.04 1.04 0 0 0 0 1.478 1.055 1.055 0 0 0 1.487 0L8 2.53l6.204 6.164a1.055 1.055 0 0 0 1.487 0Z"
      fill="#000"
    />
  </Svg>
);

export const BigSpreadButton = (props: any) => (
  <Svg
    width={19}
    height={11}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M1.014.674a1.145 1.145 0 0 0 0 1.642l7.81 7.677c.463.454 1.21.454 1.674 0l7.822-7.677a1.145 1.145 0 0 0 0-1.642 1.198 1.198 0 0 0-1.674 0l-6.98 6.85L2.688.673a1.198 1.198 0 0 0-1.673 0Z"
      fill="#000"
    />
  </Svg>
);

export const GreyBigFoldButton = (props: any) => (
  <Svg
    width={16}
    height={10}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path d="m1 9 7-7 7 7" stroke="#6E7882" strokeWidth={2} />
  </Svg>
);

export const GreyBigSpreadButton = (props: any) => (
  <Svg
    width={16}
    height={10}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path d="M15 1 8 8 1 1" stroke="#6E7882" strokeWidth={2} />
  </Svg>
);