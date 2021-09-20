import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

export function RoundUnchecked(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={12} cy={12} r={11} fill="#D6D6D6" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.59 7.5L10 14.09l-3.59-3.58L5 11.92l5 5 8-8-1.41-1.42z"
        fill="#fff"
      />
    </Svg>
  )
}

export function RoundChecked(props: any) {
    return (
      <Svg
        width={24}
        height={24}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <Circle cx={12} cy={12} r={11} fill="#A055FF" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.59 7.5L10 14.09l-3.59-3.58L5 11.92l5 5 8-8-1.41-1.42z"
          fill="#fff"
        />
      </Svg>
    )
  }
  

export function Unchecked(props: any) {
    return (
      <Svg
        width={18}
        height={14}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6 11.2L1.8 7 .4 8.4 6 14 18 2 16.6.6 6 11.2z"
          fill="#D6D6D6"
          fillOpacity={0.87}
        />
      </Svg>
    )
  }

  export function Checked(props: any) {
    return (
      <Svg
        width={18}
        height={14}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6 11.2L1.8 7 .4 8.4 6 14 18 2 16.6.6 6 11.2z"
          fill="#6E7882"
        />
      </Svg>
    )
  }

