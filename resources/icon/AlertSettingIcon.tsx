import * as React from "react"
import Svg, { SvgProps, Circle, Path, Rect } from "react-native-svg"

export const AlertOnIcon = (props: SvgProps) => (
    <Svg
    width={40}
    height={22}
    viewBox="0 0 40 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect x="1.3" y="1.3" width="37.4" height="19.4" rx="9.7" fill="#A055FF" stroke="#A055FF" stroke-width="2.6"/>
    <Rect x="21" y="4" width="14" height="14" rx="7" fill="white"/>

  </Svg>
)
export const AlertOffIcon = (props: SvgProps) => (
    <Svg
    width={40}
    height={22}
    viewBox="0 0 40 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect x="1.3" y="1.3" width="37.4" height="19.4" rx="9.7" fill="#DBDCE0" stroke="#DBDCE0" stroke-width="2.6"/>
    <Rect x="4" y="4" width="14" height="14" rx="7" fill="white"/>

  </Svg>
)

